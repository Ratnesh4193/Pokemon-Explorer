import { Request, Response } from 'express';
import { pokemonService } from '../services/pokemon.service';
import { config } from '../config/app.config';

export const getPokemonList = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || config.defaultLimit;
    const offset = parseInt(req.query.offset as string) || 0;

    const result = await pokemonService.getPokemonList(limit, offset);
    res.json(result);
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    res.status(500).json({ error: 'Failed to fetch Pokémon list' });
  }
};

export const getPokemonByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.params;
    const pokemonData = await pokemonService.getPokemonByName(name);
    res.json(pokemonData);
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Pokémon not found' });
    } else {
      console.error('Error fetching Pokémon details:', error);
      res.status(500).json({ error: 'Failed to fetch Pokémon details' });
    }
  }
};

