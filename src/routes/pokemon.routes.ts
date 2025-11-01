import { Router } from 'express';
import { getPokemonList, getPokemonByName } from '../controllers/pokemon.controller';

const router = Router();

router.get('/', getPokemonList);
router.get('/:name', getPokemonByName);

export default router;

