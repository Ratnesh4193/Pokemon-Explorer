import axios from 'axios';
import { config } from '../config/app.config';
import {
  Pokemon,
  PokemonDetail,
  PokemonListResponse,
  PokeApiPokemon,
  PokeApiPokemonDetail,
} from '../types/pokemon.types';

class PokemonService {
  private baseUrl = config.pokeApiBaseUrl;

  async getPokemonList(limit: number, offset: number): Promise<PokemonListResponse> {
    const response = await axios.get(`${this.baseUrl}/pokemon`, {
      params: { limit, offset },
    });

    const pokemonList: PokeApiPokemon[] = response.data.results;
    const hasMore = response.data.next !== null;

    // Fetch detailed info for each Pokémon to get images
    const pokemonPromises = pokemonList.map(async (pokemon: PokeApiPokemon) => {
      const detailResponse = await axios.get<PokeApiPokemonDetail>(pokemon.url);
      return {
        name: pokemon.name,
        image: detailResponse.data.sprites.front_default || null,
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

  async getPokemonByName(name: string): Promise<PokemonDetail> {
    const response = await axios.get<PokeApiPokemonDetail>(
      `${this.baseUrl}/pokemon/${name.toLowerCase()}`
    );

    return {
      name: response.data.name,
      image: response.data.sprites.front_default || null,
      types: response.data.types.map((t) => t.type.name),
      height: response.data.height,
      weight: response.data.weight,
      abilities: response.data.abilities.map((a) => a.ability.name),
    };
  }
}

export const pokemonService = new PokemonService();

