import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import healthRoutes from './routes/health.routes';
import pokemonRoutes from './routes/pokemon.routes';

// In CommonJS, __dirname and __filename exist automatically.
// So we don’t need import.meta.url logic.

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/ping', healthRoutes);
app.use('/api/pokemon', pokemonRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
