import axios from 'axios';
import { config } from '../config/app.config';
import {
  Pokemon,
  PokemonDetail,
  PokemonListResponse,
  PokeApiPokemon,
  PokeApiPokemonDetail,
  PokeApiSpecies,
  PokeApiEvolutionChain,
  EvolutionChain,
  Move,
  Ability,
} from '../types/pokemon.types';

class PokemonService {
  private baseUrl = config.pokeApiBaseUrl;

  async getPokemonList(limit: number, offset: number): Promise<PokemonListResponse> {
    const response = await axios.get(`${this.baseUrl}/pokemon`, {
      params: { limit, offset },
    });

    const pokemonList: PokeApiPokemon[] = response.data.results;
    const hasMore = response.data.next !== null;

    // Fetch detailed info for each Pokémon to get images and types
    const pokemonPromises = pokemonList.map(async (pokemon: PokeApiPokemon) => {
      const detailResponse = await axios.get<PokeApiPokemonDetail>(pokemon.url);
      return {
        name: pokemon.name,
        image: detailResponse.data.sprites.front_default || null,
        types: detailResponse.data.types.map((t) => t.type.name),
      } as Pokemon;
    });

    const pokemonWithImages = await Promise.all(pokemonPromises);

    return {
      results: pokemonWithImages,
      hasMore,
      offset,
      limit,
    };
  }

  private async getEvolutionChain(speciesUrl: string): Promise<EvolutionChain[]> {
    try {
      // Get species data to get evolution chain URL
      const speciesResponse = await axios.get<PokeApiSpecies>(speciesUrl);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

      // Get evolution chain
      const evolutionResponse = await axios.get<PokeApiEvolutionChain>(evolutionChainUrl);

      const chain: EvolutionChain[] = [];

      // Recursive function to traverse evolution chain
      const traverseChain = async (chainLink: PokeApiEvolutionChainLink) => {
        const pokemonName = chainLink.species.name;
        try {
          // Get Pokemon data for image
          const pokemonResponse = await axios.get<PokeApiPokemonDetail>(
            `${this.baseUrl}/pokemon/${pokemonName}`
          );
          chain.push({
            name: pokemonName,
            image: pokemonResponse.data.sprites.front_default || null,
          });
        } catch (error) {
          // If we can't fetch the Pokemon, still add the name
          chain.push({
            name: pokemonName,
            image: null,
          });
        }

        // Recursively process evolutions
        for (const evolution of chainLink.evolves_to) {
          await traverseChain(evolution);
        }
      };

      await traverseChain(evolutionResponse.data.chain);
      return chain;
    } catch (error) {
      console.error('Error fetching evolution chain:', error);
      return [];
    }
  }

  async getPokemonByName(name: string): Promise<PokemonDetail> {
    const response = await axios.get<PokeApiPokemonDetail>(
      `${this.baseUrl}/pokemon/${name.toLowerCase()}`
    );

    // Extract moves (level-up moves only, sorted by level)
    const levelUpMoves = response.data.moves
      .filter((moveData) =>
        moveData.version_group_details.some(
          (detail) => detail.move_learn_method.name === 'level-up'
        )
      )
      .map((moveData) => {
        const levelUpDetail = moveData.version_group_details.find(
          (detail) => detail.move_learn_method.name === 'level-up'
        );
        return {
          name: moveData.move.name,
          level: levelUpDetail?.level_learned_at || 0,
        };
      })
      .sort((a, b) => (a.level || 0) - (b.level || 0));

    // Get all moves (including TMs, HMs, etc.) for display
    const allMoves: Move[] = response.data.moves.map((moveData) => ({
      name: moveData.move.name,
    }));

    // Get evolution chain
    const evolutionChain = await this.getEvolutionChain(response.data.species.url);

    return {
      name: response.data.name,
      image: response.data.sprites.front_default || null,
      types: response.data.types.map((t) => t.type.name),
      height: response.data.height,
      weight: response.data.weight,
      abilities: response.data.abilities.map((a) => ({
        name: a.ability.name,
        isHidden: a.is_hidden,
      })),
      moves: levelUpMoves.length > 0 ? levelUpMoves : allMoves.slice(0, 20), // Show level-up moves if available, otherwise show first 20
      evolutionChain,
    };
  }
}

export const pokemonService = new PokemonService();

