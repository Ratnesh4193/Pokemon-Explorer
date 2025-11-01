import { useState, useEffect } from 'react'

interface Pokemon {
  name: string
  image: string | null
}

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPokemon = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/pokemon')
      if (!response.ok) {
        throw new Error('Failed to fetch Pokémon')
      }
      const data = await response.json()
      console.log('Pokémon data:', data)
      setPokemonList(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Error fetching Pokémon:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Auto-fetch on mount
    fetchPokemon()
  }, [])

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon)
  }

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#f5f5f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Pokemon Explorer</h1>

      {error && (
        <div style={{ textAlign: 'center', color: 'red', marginBottom: '1rem' }}>
          Error: {error}
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>Loading...</div>
      )}

      {!selectedPokemon && pokemonList.length > 0 && (
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            Found {pokemonList.length} Pokémon
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.5rem',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            {pokemonList.map((pokemon) => (
              <div
                key={pokemon.name}
                onClick={() => handlePokemonClick(pokemon)}
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {pokemon.image && (
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'contain',
                      marginBottom: '0.5rem',
                    }}
                  />
                )}
                <h3 style={{ textTransform: 'capitalize', fontSize: '1.1rem' }}>
                  {pokemon.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {pokemonList.length === 0 && !loading && !error && (
        <div style={{ textAlign: 'center' }}>
          <p>No Pokémon loaded. Click the button to fetch them.</p>
          <button
            onClick={fetchPokemon}
            disabled={loading}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Loading...' : 'Fetch Pokémon'}
          </button>
        </div>
      )}
    </div>
  )
}

export default App

