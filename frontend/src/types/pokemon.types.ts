export interface Pokemon {
  name: string
  image: string | null
  types?: string[]
}

export interface EvolutionChain {
  name: string
  image: string | null
}

export interface Move {
  name: string
  level?: number
}

export interface Ability {
  name: string
  isHidden?: boolean
}

export interface PokemonDetail {
  name: string
  image: string | null
  types: string[]
  height: number
  weight: number
  abilities: Ability[]
  moves: Move[]
  evolutionChain: EvolutionChain[]
}

export interface PokemonListResponse {
  results: Pokemon[]
  hasMore: boolean
  offset: number
  limit: number
}

