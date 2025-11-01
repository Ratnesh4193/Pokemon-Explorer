import { Pokemon } from '../types/pokemon.types'

interface PokemonCardProps {
  pokemon: Pokemon
  onClick: (pokemon: Pokemon) => void
}

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  return (
    <div
      onClick={() => onClick(pokemon)}
      className="bg-white rounded-lg p-4 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-center"
    >
      {pokemon.image && (
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-32 h-32 object-contain mx-auto mb-3"
        />
      )}
      <h3 className="text-lg font-semibold capitalize text-gray-800">{pokemon.name}</h3>
    </div>
  )
}

