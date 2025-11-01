import { useState, useEffect, useRef } from 'react'
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
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const availableTypes = getAllUniqueTypes(pokemonList)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (availableTypes.length === 0) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto mb-6" ref={dropdownRef}>
      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Filter by Type</h3>
          <div className="flex items-center gap-2">
            {selectedTypes.length > 0 && (
              <button
                onClick={onClearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Clear ({selectedTypes.length})
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium flex items-center gap-2"
            >
              <span>Select Types</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Selected types display */}
        {selectedTypes.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {selectedTypes.map((type) => (
                <span
                  key={type}
                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize text-white ${getTypeColor(type)} flex items-center gap-1`}
                >
                  {type}
                  <button
                    onClick={() => onTypeToggle(type)}
                    className="ml-1 hover:bg-black/20 rounded-full p-0.5 transition-colors"
                    aria-label={`Remove ${type} filter`}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Dropdown menu */}
        {isOpen && (
          <div className="mt-3 border-t border-gray-200 pt-3">
            <div className="max-h-64 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {availableTypes.map((type) => {
                  const isSelected = selectedTypes.includes(type)
                  return (
                    <button
                      key={type}
                      onClick={() => onTypeToggle(type)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 text-left flex items-center gap-2 ${
                        isSelected
                          ? `${getTypeColor(type)} text-white shadow-md`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <span>{type}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
