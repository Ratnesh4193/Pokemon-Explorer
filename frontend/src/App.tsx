import { useState, useEffect } from 'react'

interface Pokemon {
  name: string
  image: string | null
}

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
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

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Pokemon Explorer</h1>
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

      {error && (
        <div style={{ marginTop: '1rem', color: 'red' }}>Error: {error}</div>
      )}

      {loading && <div style={{ marginTop: '1rem' }}>Loading...</div>}

      {pokemonList.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Found {pokemonList.length} Pokémon</h2>
          <pre style={{ textAlign: 'left', marginTop: '1rem' }}>
            {JSON.stringify(pokemonList, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default App

