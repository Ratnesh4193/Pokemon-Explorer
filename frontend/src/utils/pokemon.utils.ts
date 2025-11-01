import { Pokemon } from '../types/pokemon.types'

export const filterPokemonByName = (pokemonList: Pokemon[], searchQuery: string): Pokemon[] => {
  if (!searchQuery.trim()) {
    return pokemonList
  }
  const query = searchQuery.toLowerCase().trim()
  return pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(query))
}

export const filterPokemonByTypes = (pokemonList: Pokemon[], selectedTypes: string[]): Pokemon[] => {
  if (selectedTypes.length === 0) {
    return pokemonList
  }
  return pokemonList.filter((pokemon) => {
    if (!pokemon.types || pokemon.types.length === 0) {
      return false
    }
    // Check if Pokemon has at least one of the selected types
    return selectedTypes.some((selectedType) => pokemon.types?.includes(selectedType))
  })
}

export const getAllUniqueTypes = (pokemonList: Pokemon[]): string[] => {
  const typeSet = new Set<string>()
  pokemonList.forEach((pokemon) => {
    pokemon.types?.forEach((type) => typeSet.add(type))
  })
  return Array.from(typeSet).sort()
}

export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-400 dark:bg-gray-600',
    fire: 'bg-red-500 dark:bg-red-600',
    water: 'bg-blue-500 dark:bg-blue-600',
    electric: 'bg-yellow-400 dark:bg-yellow-500',
    grass: 'bg-green-500 dark:bg-green-600',
    ice: 'bg-cyan-400 dark:bg-cyan-500',
    fighting: 'bg-red-700 dark:bg-red-800',
    poison: 'bg-purple-500 dark:bg-purple-600',
    ground: 'bg-amber-600 dark:bg-amber-700',
    flying: 'bg-indigo-400 dark:bg-indigo-500',
    psychic: 'bg-pink-500 dark:bg-pink-600',
    bug: 'bg-lime-500 dark:bg-lime-600',
    rock: 'bg-stone-600 dark:bg-stone-700',
    ghost: 'bg-violet-500 dark:bg-violet-600',
    dragon: 'bg-indigo-700 dark:bg-indigo-800',
    dark: 'bg-gray-700 dark:bg-gray-800',
    steel: 'bg-gray-500 dark:bg-gray-600',
    fairy: 'bg-pink-300 dark:bg-pink-400',
  }
  return typeColors[type.toLowerCase()] || 'bg-gray-400 dark:bg-gray-600'
}
