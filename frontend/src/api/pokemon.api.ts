import { PokemonDetail, PokemonListResponse } from '../types/pokemon.types'

export const pokemonApi = {
  async getPokemonList(limit: number, offset: number): Promise<PokemonListResponse> {
    const response = await fetch(`/api/pokemon?limit=${limit}&offset=${offset}`)
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon')
    }
    return response.json()
  },

  async getPokemonByName(name: string): Promise<PokemonDetail> {
    const response = await fetch(`/api/pokemon/${name}`)
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon details')
    }
    return response.json()
  },
}

