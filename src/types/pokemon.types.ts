export interface Pokemon {
  name: string;
  image: string | null;
  types?: string[];
}

export interface EvolutionChain {
  name: string;
  image: string | null;
}

export interface Move {
  name: string;
  level?: number;
}

export interface Ability {
  name: string;
  isHidden?: boolean;
}

export interface PokemonDetail {
  name: string;
  image: string | null;
  types: string[];
  height: number;
  weight: number;
  abilities: Ability[];
  moves: Move[];
  evolutionChain: EvolutionChain[];
}

export interface PokemonListResponse {
  results: Pokemon[];
  hasMore: boolean;
  offset: number;
  limit: number;
}

export interface PokeApiPokemon {
  name: string;
  url: string;
}

export interface PokeApiPokemonDetail {
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
      };
    }>;
  }>;
  species: {
    url: string;
  };
}

export interface PokeApiSpecies {
  evolution_chain: {
    url: string;
  };
}

export interface PokeApiEvolutionChainLink {
  species: {
    name: string;
  };
  evolves_to: PokeApiEvolutionChainLink[];
}

export interface PokeApiEvolutionChain {
  chain: PokeApiEvolutionChainLink;
}

