import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/ping', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Get list of Pokémon
app.get('/api/pokemon', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
    const pokemonList = response.data.results;

    // Fetch detailed info for each Pokémon to get images
    const pokemonPromises = pokemonList.map(async (pokemon: any) => {
      const detailResponse = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        image: detailResponse.data.sprites.front_default || null,
      };
    });

    const pokemonWithImages = await Promise.all(pokemonPromises);
    res.json(pokemonWithImages);
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    res.status(500).json({ error: 'Failed to fetch Pokémon list' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

