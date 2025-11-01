interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  resultCount?: number
  totalCount?: number
}

export const SearchBar = ({ searchQuery, onSearchChange, resultCount, totalCount }: SearchBarProps) => {
  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-900 placeholder-gray-500"
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
      {searchQuery && resultCount !== undefined && totalCount !== undefined && (
        <p className="mt-2 text-sm text-gray-600">
          Showing {resultCount} of {totalCount} Pokémon
        </p>
      )}
    </div>
  )
}

