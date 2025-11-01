import { useState, useEffect, useMemo } from 'react'

interface Pokemon {
  name: string
  image: string | null
}

interface PokemonDetail {
  name: string
  image: string | null
  types: string[]
  height: number
  weight: number
  abilities: string[]
}

interface PokemonResponse {
  results: Pokemon[]
  hasMore: boolean
  offset: number
  limit: number
}

// Loading skeleton component
const PokemonSkeleton = () => (
  <div className="bg-white rounded-lg p-4 shadow-md animate-pulse">
    <div className="w-32 h-32 bg-gray-300 rounded mx-auto mb-3"></div>
    <div className="h-6 bg-gray-300 rounded w-24 mx-auto"></div>
  </div>
)

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detailError, setDetailError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [hasMore, setHasMore] = useState(false)
  const [currentOffset, setCurrentOffset] = useState(0)
  const limit = 20

  const fetchPokemon = async (offset = 0, append = false) => {
    if (append) {
      setLoadingMore(true)
    } else {
      setLoading(true)
      setError(null)
    }
    
    try {
      const response = await fetch(`/api/pokemon?limit=${limit}&offset=${offset}`)
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon')
      }
      const data: PokemonResponse = await response.json()
      
      if (append) {
        setPokemonList(prev => [...prev, ...data.results])
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
    // Auto-fetch on mount
    fetchPokemon()
  }, [])

  // Filter Pokémon based on search query
  const filteredPokemon = useMemo(() => {
    if (!searchQuery.trim()) {
      return pokemonList
    }
    const query = searchQuery.toLowerCase().trim()
    return pokemonList.filter(pokemon => 
      pokemon.name.toLowerCase().includes(query)
    )
  }, [pokemonList, searchQuery])

  const handlePokemonClick = async (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon)
    setDetailLoading(true)
    setDetailError(null)
    setPokemonDetail(null)
    
    try {
      const response = await fetch(`/api/pokemon/${pokemon.name}`)
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon details')
      }
      const data = await response.json()
      setPokemonDetail(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setDetailError(errorMessage)
      console.error('Error fetching Pokémon details:', err)
    } finally {
      setDetailLoading(false)
    }
  }

  const handleBackClick = () => {
    setSelectedPokemon(null)
    setPokemonDetail(null)
    setDetailError(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-center text-4xl font-bold mb-8 text-gray-800">Pokemon Explorer</h1>

      {error && (
        <div className="text-center text-red-600 mb-4 p-4 bg-red-50 rounded-lg border border-red-200 max-w-2xl mx-auto">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!selectedPokemon && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Pokémon by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-gray-600">
              Showing {filteredPokemon.length} of {pokemonList.length} Pokémon
            </p>
          )}
        </div>
      )}

      {loading && (
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {Array.from({ length: 20 }).map((_, i) => (
              <PokemonSkeleton key={i} />
            ))}
          </div>
        </div>
      )}

      {!selectedPokemon && !loading && filteredPokemon.length > 0 && (
        <div>
          <h2 className="text-center text-2xl font-semibold mb-6 text-gray-700">
            {searchQuery ? `Found ${filteredPokemon.length} Pokémon` : `Found ${pokemonList.length} Pokémon`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto mb-8">
            {filteredPokemon.map((pokemon) => (
              <div
                key={pokemon.name}
                onClick={() => handlePokemonClick(pokemon)}
                className="bg-white rounded-lg p-4 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-center"
              >
                {pokemon.image && (
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-32 h-32 object-contain mx-auto mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold capitalize text-gray-800">
                  {pokemon.name}
                </h3>
              </div>
            ))}
          </div>

          {loadingMore && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <PokemonSkeleton key={`loading-${i}`} />
              ))}
            </div>
          )}

          {!searchQuery && hasMore && (
            <div className="text-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingMore ? 'Loading...' : 'Load More Pokémon'}
              </button>
            </div>
          )}

          {!searchQuery && !hasMore && pokemonList.length > 0 && (
            <div className="text-center text-gray-600">
              <p>No more Pokémon to load</p>
            </div>
          )}
        </div>
      )}

      {!selectedPokemon && !loading && filteredPokemon.length === 0 && pokemonList.length > 0 && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">No Pokémon found matching "{searchQuery}"</p>
        </div>
      )}

      {selectedPokemon && (
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleBackClick}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            ← Back to List
          </button>

          {detailError && (
            <div className="text-red-600 mb-4 p-4 bg-red-50 rounded-lg border border-red-200 text-center">
              <strong>Error:</strong> {detailError}
            </div>
          )}

          {detailLoading && (
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-6"></div>
                <div className="w-48 h-48 bg-gray-300 rounded mx-auto mb-6"></div>
                <div className="space-y-4 mt-6">
                  <div className="h-6 bg-gray-300 rounded w-full"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          )}

          {pokemonDetail && (
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-4xl font-bold capitalize mb-6 text-center text-gray-800">
                {pokemonDetail.name}
              </h2>
              {pokemonDetail.image && (
                <img
                  src={pokemonDetail.image}
                  alt={pokemonDetail.name}
                  className="w-48 h-48 object-contain mx-auto mb-6"
                />
              )}
              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-2">
                  <strong className="text-gray-700 min-w-[100px]">Types:</strong>
                  <div className="flex gap-2 flex-wrap">
                    {pokemonDetail.types.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <strong className="text-gray-700 min-w-[100px]">Height:</strong>
                  <span className="text-gray-600">{(pokemonDetail.height / 10).toFixed(1)}m</span>
                </div>
                <div className="flex items-center gap-2">
                  <strong className="text-gray-700 min-w-[100px]">Weight:</strong>
                  <span className="text-gray-600">{(pokemonDetail.weight / 10).toFixed(1)}kg</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="text-gray-700 min-w-[100px]">Abilities:</strong>
                  <div className="flex gap-2 flex-wrap">
                    {pokemonDetail.abilities.map((ability) => (
                      <span
                        key={ability}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium capitalize"
                      >
                        {ability}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {pokemonList.length === 0 && !loading && !error && !selectedPokemon && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">No Pokémon loaded. Click the button to fetch them.</p>
          <button
            onClick={() => fetchPokemon()}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Fetch Pokémon'}
          </button>
        </div>
      )}
    </div>
  )
}

export default App
