# Pokemon Explorer Backend

Express.js API server that acts as a proxy to PokéAPI.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run in development mode (with auto-reload):
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

- `GET /ping` - Health check endpoint
- `GET /api/pokemon` - Get list of first 20 Pokémon (name + image)
- `GET /api/pokemon/:name` - Get detailed information for a specific Pokémon

## Configuration

- Default port: `3001` (can be overridden with `PORT` environment variable)
- CORS enabled for all origins

