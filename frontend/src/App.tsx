import { useState, useMemo } from 'react'
import { usePokemon } from './hooks/usePokemon'
import { usePokemonDetail } from './hooks/usePokemonDetail'
import { filterPokemonByName } from './utils/pokemon.utils'
import { SearchBar } from './components/SearchBar'
import { PokemonList } from './components/PokemonList'
import { PokemonDetail } from './components/PokemonDetail'
import { LoadMoreButton } from './components/LoadMoreButton'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const { pokemonList, loading, loadingMore, error, hasMore, loadMore, refetch } = usePokemon()
  const {
    selectedPokemon,
    pokemonDetail,
    loading: detailLoading,
    error: detailError,
    fetchPokemonDetail,
    clearSelection,
  } = usePokemonDetail()

  // Filter Pokémon based on search query
  const filteredPokemon = useMemo(
    () => filterPokemonByName(pokemonList, searchQuery),
    [pokemonList, searchQuery]
  )

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-center text-4xl font-bold mb-8 text-gray-800">Pokemon Explorer</h1>

      {error && (
        <div className="text-center text-red-600 mb-4 p-4 bg-red-50 rounded-lg border border-red-200 max-w-2xl mx-auto">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!selectedPokemon && (
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredPokemon.length}
          totalCount={pokemonList.length}
        />
      )}

      {!selectedPokemon && (
        <>
          {filteredPokemon.length > 0 && (
            <h2 className="text-center text-2xl font-semibold mb-6 text-gray-700">
              {searchQuery
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

          {!searchQuery && (
            <LoadMoreButton
              onLoadMore={loadMore}
              isLoading={loadingMore}
              hasMore={hasMore}
              showNoMore={pokemonList.length > 0}
            />
          )}

          {!loading && filteredPokemon.length === 0 && pokemonList.length > 0 && (
            <div className="text-center">
              <p className="text-gray-600 mb-4">No Pokémon found matching "{searchQuery}"</p>
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
