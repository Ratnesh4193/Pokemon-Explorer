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
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const pokemonList = response.data.results;
    const hasMore = response.data.next !== null;

    // Fetch detailed info for each Pokémon to get images
    const pokemonPromises = pokemonList.map(async (pokemon: any) => {
      const detailResponse = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        image: detailResponse.data.sprites.front_default || null,
      };
    });

    const pokemonWithImages = await Promise.all(pokemonPromises);
    res.json({
      results: pokemonWithImages,
      hasMore,
      offset,
      limit,
    });
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    res.status(500).json({ error: 'Failed to fetch Pokémon list' });
  }
});

// Get detailed Pokémon information by name
app.get('/api/pokemon/:name', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    
    const pokemonData = {
      name: response.data.name,
      image: response.data.sprites.front_default || null,
      types: response.data.types.map((t: any) => t.type.name),
      height: response.data.height,
      weight: response.data.weight,
      abilities: response.data.abilities.map((a: any) => a.ability.name),
    };

    res.json(pokemonData);
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Pokémon not found' });
    } else {
      console.error('Error fetching Pokémon details:', error);
      res.status(500).json({ error: 'Failed to fetch Pokémon details' });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

