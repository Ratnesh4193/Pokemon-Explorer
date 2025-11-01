import { Pokemon } from '../types/pokemon.types'

export const filterPokemonByName = (pokemonList: Pokemon[], searchQuery: string): Pokemon[] => {
  if (!searchQuery.trim()) {
    return pokemonList
  }
  const query = searchQuery.toLowerCase().trim()
  return pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(query))
}

