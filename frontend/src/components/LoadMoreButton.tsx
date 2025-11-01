interface LoadMoreButtonProps {
  onLoadMore: () => void
  isLoading: boolean
  hasMore: boolean
  showNoMore?: boolean
}

export const LoadMoreButton = ({ onLoadMore, isLoading, hasMore, showNoMore }: LoadMoreButtonProps) => {
  if (!hasMore && showNoMore) {
    return (
      <div className="text-center text-gray-600">
        <p>No more Pokémon to load</p>
      </div>
    )
  }

  if (!hasMore) {
    return null
  }

  return (
    <div className="text-center">
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Loading...' : 'Load More Pokémon'}
      </button>
    </div>
  )
}

