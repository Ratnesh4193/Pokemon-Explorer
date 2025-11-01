import { PokemonDetail as PokemonDetailType } from '../types/pokemon.types'

interface PokemonDetailProps {
  pokemon: PokemonDetailType | null
  isLoading: boolean
  error: string | null
  onBack: () => void
}

export const PokemonDetail = ({ pokemon, isLoading, error, onBack }: PokemonDetailProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 font-medium"
      >
        ← Back to List
      </button>

      {error && (
        <div className="text-red-600 dark:text-red-400 mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-center">
          <strong>Error:</strong> {error}
        </div>
      )}

      {isLoading && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto mb-6"></div>
            <div className="w-48 h-48 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-6"></div>
            <div className="space-y-4 mt-6">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      )}

      {pokemon && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">
          <h2 className="text-4xl font-bold capitalize mb-6 text-center text-gray-800 dark:text-gray-100">
            {pokemon.name}
          </h2>
          {pokemon.image && (
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-48 h-48 object-contain mx-auto mb-6"
            />
          )}
          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-2">
              <strong className="text-gray-700 dark:text-gray-300 min-w-[100px]">Types:</strong>
              <div className="flex gap-2 flex-wrap">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-gray-700 dark:text-gray-300 min-w-[100px]">Height:</strong>
              <span className="text-gray-600 dark:text-gray-400">{(pokemon.height / 10).toFixed(1)}m</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-gray-700 dark:text-gray-300 min-w-[100px]">Weight:</strong>
              <span className="text-gray-600 dark:text-gray-400">{(pokemon.weight / 10).toFixed(1)}kg</span>
            </div>
            <div className="flex items-start gap-2">
              <strong className="text-gray-700 dark:text-gray-300 min-w-[100px]">Abilities:</strong>
              <div className="flex gap-2 flex-wrap">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium capitalize"
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
  )
}

