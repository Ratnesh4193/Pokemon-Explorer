import { Pokemon } from '../types/pokemon.types'
import { getAllUniqueTypes, getTypeColor } from '../utils/pokemon.utils'

interface FilterBarProps {
  pokemonList: Pokemon[]
  selectedTypes: string[]
  onTypeToggle: (type: string) => void
  onClearFilters: () => void
}

export const FilterBar = ({
  pokemonList,
  selectedTypes,
  onTypeToggle,
  onClearFilters,
}: FilterBarProps) => {
  const availableTypes = getAllUniqueTypes(pokemonList)

  if (availableTypes.length === 0) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Filter by Type</h3>
          {selectedTypes.length > 0 && (
            <button
              onClick={onClearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Clear Filters ({selectedTypes.length})
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {availableTypes.map((type) => {
            const isSelected = selectedTypes.includes(type)
            return (
              <button
                key={type}
                onClick={() => onTypeToggle(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                  isSelected
                    ? `${getTypeColor(type)} text-white shadow-md transform scale-105`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {type}
                {isSelected && (
                  <span className="ml-2 text-xs">✓</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

