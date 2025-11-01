import { PokemonDetail as PokemonDetailType } from '../types/pokemon.types'

interface PokemonDetailProps {
  pokemon: PokemonDetailType | null
  isLoading: boolean
  error: string | null
  onBack: () => void
}

export const PokemonDetail = ({ pokemon, isLoading, error, onBack }: PokemonDetailProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        ← Back to List
      </button>

      {error && (
        <div className="text-red-600 mb-4 p-4 bg-red-50 rounded-lg border border-red-200 text-center">
          <strong>Error:</strong> {error}
        </div>
      )}

      {isLoading && (
        <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-6"></div>
            <div className="w-48 h-48 bg-gray-300 rounded mx-auto mb-6"></div>
            <div className="space-y-4 mt-6">
              <div className="h-6 bg-gray-300 rounded w-full"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      )}

      {pokemon && (
        <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
          <h2 className="text-4xl font-bold capitalize mb-6 text-center text-gray-800">
            {pokemon.name}
          </h2>
          {pokemon.image && (
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-48 h-48 object-contain mx-auto mb-6"
            />
          )}
          <div className="space-y-6 mt-6">
            <div className="flex items-center gap-2">
              <strong className="text-gray-700 min-w-[100px]">Types:</strong>
              <div className="flex gap-2 flex-wrap">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-gray-700 min-w-[100px]">Height:</strong>
              <span className="text-gray-600">{(pokemon.height / 10).toFixed(1)}m</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-gray-700 min-w-[100px]">Weight:</strong>
              <span className="text-gray-600">{(pokemon.weight / 10).toFixed(1)}kg</span>
            </div>
            <div>
              <strong className="text-gray-700 block mb-2">Abilities:</strong>
              <div className="flex gap-2 flex-wrap">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.name}
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      ability.isHidden
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {ability.name}
                    {ability.isHidden && (
                      <span className="ml-1 text-xs">(Hidden)</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Evolution Chain */}
            {pokemon.evolutionChain && pokemon.evolutionChain.length > 1 && (
              <div>
                <strong className="text-gray-700 block mb-3 text-lg">
                  Evolution Chain:
                </strong>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {pokemon.evolutionChain.map((evolution, index) => (
                    <div key={evolution.name} className="flex items-center">
                      <div
                        className={`text-center p-3 rounded-lg ${
                          evolution.name.toLowerCase() === pokemon.name.toLowerCase()
                            ? 'bg-blue-100 border-2 border-blue-500'
                            : 'bg-gray-100'
                        }`}
                      >
                        {evolution.image ? (
                          <img
                            src={evolution.image}
                            alt={evolution.name}
                            className="w-24 h-24 object-contain mx-auto mb-2"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gray-300 rounded mx-auto mb-2 flex items-center justify-center">
                            <span className="text-xs text-gray-500">No image</span>
                          </div>
                        )}
                        <p className="text-sm font-semibold capitalize text-gray-800">
                          {evolution.name}
                        </p>
                      </div>
                      {index < pokemon.evolutionChain.length - 1 && (
                        <div className="text-2xl text-gray-400 mx-2">→</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Moves */}
            {pokemon.moves && pokemon.moves.length > 0 && (
              <div>
                <strong className="text-gray-700 block mb-3 text-lg">
                  Moves:
                </strong>
                <div className="max-h-96 overflow-y-auto bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {pokemon.moves.map((move, index) => (
                      <div
                        key={`${move.name}-${index}`}
                        className="flex items-center justify-between p-2 bg-white rounded border border-gray-200"
                      >
                        <span className="text-sm font-medium capitalize text-gray-800">
                          {move.name.replace(/-/g, ' ')}
                        </span>
                        {move.level !== undefined && (
                          <span className="text-xs text-gray-500 ml-2">
                            Lv.{move.level}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Showing {pokemon.moves.length} move{pokemon.moves.length !== 1 ? 's' : ''}
                  {pokemon.moves[0]?.level !== undefined && ' (Level-up moves)'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
