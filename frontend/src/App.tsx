import { useState, useMemo, useEffect, useRef } from 'react'
import { usePokemon } from './hooks/usePokemon'
import { usePokemonDetail } from './hooks/usePokemonDetail'
import { filterPokemonByName, filterPokemonByTypes } from './utils/pokemon.utils'
import { SearchBar } from './components/SearchBar'
import { FilterBar } from './components/FilterBar'
import { PokemonList } from './components/PokemonList'
import { PokemonDetail } from './components/PokemonDetail'
import { LoadMoreButton } from './components/LoadMoreButton'

const MIN_VISIBLE_RESULTS = 20

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const prevSearchQueryRef = useRef('')
  const prevSelectedTypesRef = useRef<string[]>([])
  const { pokemonList, loading, loadingMore, error, hasMore, loadMore, refetch, resetApiCallCount, canLoadMore } = usePokemon()
  const {
    selectedPokemon,
    pokemonDetail,
    loading: detailLoading,
    error: detailError,
    fetchPokemonDetail,
    clearSelection,
  } = usePokemonDetail()

  // Filter Pokémon based on search query and selected types
  const filteredPokemon = useMemo(() => {
    let filtered = pokemonList
    // Apply type filters first
    filtered = filterPokemonByTypes(filtered, selectedTypes)
    // Then apply search filter
    filtered = filterPokemonByName(filtered, searchQuery)
    return filtered
  }, [pokemonList, searchQuery, selectedTypes])

  // Reset API call count when search query or type filters change (new user action)
  useEffect(() => {
    const searchChanged = searchQuery !== prevSearchQueryRef.current
    const typesChanged = JSON.stringify(selectedTypes) !== JSON.stringify(prevSelectedTypesRef.current)
    
    if (searchChanged || typesChanged) {
      resetApiCallCount()
      prevSearchQueryRef.current = searchQuery
      prevSelectedTypesRef.current = selectedTypes
    }
  }, [searchQuery, selectedTypes, resetApiCallCount])

  // Auto-load more if filtered results are too few
  useEffect(() => {
    const shouldAutoLoad = 
      !loading && 
      !loadingMore && 
      (searchQuery.trim() || selectedTypes.length > 0) && // Has active filters
      filteredPokemon.length < MIN_VISIBLE_RESULTS && // Less than 20 visible
      hasMore && // More available
      canLoadMore // Haven't exceeded API call limit

    if (shouldAutoLoad) {
      loadMore()
    }
  }, [filteredPokemon.length, searchQuery, selectedTypes, hasMore, canLoadMore, loading, loadingMore, loadMore])

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleClearFilters = () => {
    setSelectedTypes([])
    setSearchQuery('')
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
        <>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            resultCount={filteredPokemon.length}
            totalCount={pokemonList.length}
          />
          {pokemonList.length > 0 && (
            <FilterBar
              pokemonList={pokemonList}
              selectedTypes={selectedTypes}
              onTypeToggle={handleTypeToggle}
              onClearFilters={handleClearFilters}
            />
          )}
        </>
      )}

      {!selectedPokemon && (
        <>
          {filteredPokemon.length > 0 && (
            <h2 className="text-center text-2xl font-semibold mb-6 text-gray-700">
              {searchQuery || selectedTypes.length > 0
                ? `Found ${filteredPokemon.length} Pokémon`
                : `Found ${pokemonList.length} Pokémon`}
            </h2>
          )}

          <PokemonList
            pokemon={filteredPokemon}
            isLoading={loading}
            isLoadingMore={loadingMore}
            onPokemonClick={fetchPokemonDetail}
          />

          {!searchQuery && selectedTypes.length === 0 && (
            <LoadMoreButton
              onLoadMore={loadMore}
              isLoading={loadingMore}
              hasMore={canLoadMore}
              showNoMore={pokemonList.length > 0}
            />
          )}

          {/* Show auto-loading status for filtered results */}
          {(searchQuery || selectedTypes.length > 0) && loadingMore && filteredPokemon.length < MIN_VISIBLE_RESULTS && (
            <div className="text-center text-gray-600 mb-4">
              <p>Loading more Pokémon to find matches...</p>
            </div>
          )}

          {!loading && filteredPokemon.length === 0 && pokemonList.length > 0 && (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                {searchQuery || selectedTypes.length > 0
                  ? `No Pokémon found matching your filters${searchQuery ? ` "${searchQuery}"` : ''}${selectedTypes.length > 0 ? ` and type${selectedTypes.length > 1 ? 's' : ''}: ${selectedTypes.join(', ')}` : ''}`
                  : 'No Pokémon found'}
              </p>
              {(searchQuery || selectedTypes.length > 0) && (
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </>
      )}

      {selectedPokemon && (
        <PokemonDetail
          pokemon={pokemonDetail}
          isLoading={detailLoading}
          error={detailError}
          onBack={clearSelection}
        />
      )}

      {pokemonList.length === 0 && !loading && !error && !selectedPokemon && (
        <div className="text-center">
          <p className="text-gray-600 mb-4">No Pokémon loaded. Click the button to fetch them.</p>
          <button
            onClick={refetch}
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
