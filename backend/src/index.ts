import express from 'express';
import cors from 'cors';
import { config } from './config/app.config';
import healthRoutes from './routes/health.routes';
import pokemonRoutes from './routes/pokemon.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/ping', healthRoutes);
app.use('/api/pokemon', pokemonRoutes);

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
});
