import { Pokemon } from '../types/pokemon.types'
import { PokemonCard } from './PokemonCard'
import { PokemonSkeleton } from './PokemonSkeleton'

interface PokemonListProps {
  pokemon: Pokemon[]
  isLoading?: boolean
  isLoadingMore?: boolean
  onPokemonClick: (pokemon: Pokemon) => void
}

export const PokemonList = ({
  pokemon,
  isLoading = false,
  isLoadingMore = false,
  onPokemonClick,
}: PokemonListProps) => {
  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {Array.from({ length: 20 }).map((_, i) => (
            <PokemonSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (pokemon.length === 0) {
    return null
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto mb-8">
        {pokemon.map((pokemonItem) => (
          <PokemonCard
            key={pokemonItem.name}
            pokemon={pokemonItem}
            onClick={onPokemonClick}
          />
        ))}
      </div>

      {isLoadingMore && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <PokemonSkeleton key={`loading-${i}`} />
          ))}
        </div>
      )}
    </div>
  )
}

