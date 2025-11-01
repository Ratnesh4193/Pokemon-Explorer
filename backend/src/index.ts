import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes';
import pokemonRoutes from './routes/pokemon.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/ping', healthRoutes);
app.use('/api/pokemon', pokemonRoutes);