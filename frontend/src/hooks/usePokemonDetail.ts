import { useState } from 'react'
import { Pokemon, PokemonDetail } from '../types/pokemon.types'
import { pokemonApi } from '../api/pokemon.api'

export const usePokemonDetail = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPokemonDetail = async (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon)
    setLoading(true)
    setError(null)
    setPokemonDetail(null)

    try {
      const data = await pokemonApi.getPokemonByName(pokemon.name)
      setPokemonDetail(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Error fetching Pokémon details:', err)
    } finally {
      setLoading(false)
    }
  }

  const clearSelection = () => {
    setSelectedPokemon(null)
    setPokemonDetail(null)
    setError(null)
  }

  return {
    selectedPokemon,
    pokemonDetail,
    loading,
    error,
    fetchPokemonDetail,
    clearSelection,
  }
}

