import { Pokemon } from '../types/pokemon.types'
import { getTypeColor } from '../utils/pokemon.utils'

interface PokemonCardProps {
  pokemon: Pokemon
  onClick: (pokemon: Pokemon) => void
}

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  return (
    <div
      onClick={() => onClick(pokemon)}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 cursor-pointer shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900/70 hover:-translate-y-1 transition-all duration-200 text-center border border-gray-200 dark:border-gray-700"
    >
      {pokemon.image && (
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-32 h-32 object-contain mx-auto mb-3"
        />
      )}
      <h3 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-100 mb-2">
        {pokemon.name}
      </h3>
      {pokemon.types && pokemon.types.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(type)} text-white`}
            >
              {type}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

