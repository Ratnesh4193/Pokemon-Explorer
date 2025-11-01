export interface Pokemon {
  name: string
  image: string | null
}

export interface PokemonDetail {
  name: string
  image: string | null
  types: string[]
  height: number
  weight: number
  abilities: string[]
}

export interface PokemonListResponse {
  results: Pokemon[]
  hasMore: boolean
  offset: number
  limit: number
}

