export interface Pokemon {
  name: string;
  image: string | null;
  types?: string[];
}

export interface PokemonDetail {
  name: string;
  image: string | null;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
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
  }>;
}

