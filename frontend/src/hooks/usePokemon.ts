import { useState, useEffect } from 'react'
import { Pokemon, PokemonListResponse } from '../types/pokemon.types'
import { pokemonApi } from '../api/pokemon.api'

const DEFAULT_LIMIT = 20

export const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [currentOffset, setCurrentOffset] = useState(0)

  const fetchPokemon = async (offset = 0, append = false) => {
    if (append) {
      setLoadingMore(true)
    } else {
      setLoading(true)
      setError(null)
    }

    try {
      const data: PokemonListResponse = await pokemonApi.getPokemonList(DEFAULT_LIMIT, offset)

      if (append) {
        setPokemonList((prev) => [...prev, ...data.results])
      } else {
        setPokemonList(data.results)
      }
      setHasMore(data.hasMore)
      setCurrentOffset(offset + data.results.length)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Error fetching Pokémon:', err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      fetchPokemon(currentOffset, true)
    }
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

  return {
    pokemonList,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refetch: () => fetchPokemon(),
  }
}

