import { useState, useEffect, useRef } from 'react'
import { Pokemon, PokemonListResponse } from '../types/pokemon.types'
import { pokemonApi } from '../api/pokemon.api'

const DEFAULT_LIMIT = 20
const MAX_API_CALLS = 5

export const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [currentOffset, setCurrentOffset] = useState(0)
  const apiCallCountRef = useRef(0)

  const fetchPokemon = async (offset = 0, append = false) => {
    if (append) {
      setLoadingMore(true)
    } else {
      setLoading(true)
      setError(null)
      apiCallCountRef.current = 0 // Reset counter on fresh fetch
    }

    try {
      const data: PokemonListResponse = await pokemonApi.getPokemonList(DEFAULT_LIMIT, offset)
      apiCallCountRef.current++

      if (append) {
        setPokemonList((prev) => [...prev, ...data.results])
      } else {
        setPokemonList(data.results)
      }
      setHasMore(data.hasMore)
      setCurrentOffset(offset + data.results.length)
      
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Error fetching Pokémon:', err)
      throw err
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const loadMore = async () => {
    if (!loadingMore && hasMore && apiCallCountRef.current < MAX_API_CALLS) {
      await fetchPokemon(currentOffset, true)
    }
  }

  const resetApiCallCount = () => {
    apiCallCountRef.current = 0
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
    resetApiCallCount,
    canLoadMore: hasMore && apiCallCountRef.current < MAX_API_CALLS,
    apiCallCount: apiCallCountRef.current,
  }
}

