# Pokemon Explorer

A full-stack web application for exploring Pokémon data from the PokéAPI. Built with React, TypeScript, Express.js, and Tailwind CSS.

## 🎯 Features

- Browse a list of 20 Pokémon with images
- View detailed information for each Pokémon (types, height, weight, abilities)
- Clean, responsive UI with smooth transitions
- Real-time data fetching from PokéAPI

## 🏗️ Architecture

The project follows a modern monorepo structure:

- **Backend** (root-level `src/`): Express.js API server that acts as a proxy to PokéAPI
- **Frontend** (`/frontend`): React + TypeScript application built with Vite
- **Deployment**: Configured with Vercel (`vercel.json`) for seamless deployments

### Project Structure

```
Pokemon-Explorer/
├── src/                    # Backend source code (Express.js API)
│   └── index.ts           # Main server file
├── frontend/              # React frontend application
│   ├── src/
│   ├── public/
│   └── vite.config.ts
├── package.json           # Root-level dependencies (backend)
├── tsconfig.json          # TypeScript configuration
├── vercel.json            # Vercel deployment configuration
└── README.md
```

### Tech Stack

**Backend:**
- Node.js + Express.js
- TypeScript
- Axios (for API calls)
- CORS enabled
- Runs on port 5001

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS

## 📦 Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Backend Setup

1. Install dependencies in the root directory:
   ```bash
   npm install
   ```

2. Start the backend development server:
   ```bash
   npm run dev
   ```
   
   The backend server will start on **port 5001**.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   
   The frontend will start on **port 3000** (default). Configure in `vite.config.ts` if needed.

## 🚀 Running the Application

1. **Start Backend** (from root):
   ```bash
   npm run dev
   ```

2. **Start Frontend** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## 🌐 API Endpoints

### Backend (Port 5001)

- `GET /api/pokemon` - Fetches a list of Pokémon
- `GET /api/pokemon/:name` - Fetches details for a specific Pokémon

### API Proxy

The frontend uses Vite's proxy to forward `/api` requests to the backend. Configure in `frontend/vite.config.ts`.

## 📁 Recent Structure Changes

The project was recently restructured for better organization and deployment:

- ✅ Backend code moved from `/backend` to root-level `src/` directory
- ✅ `package.json` and dependencies moved to root level
- ✅ Backend port changed from **3001** to **5001**
- ✅ Added `vercel.json` for deployment configuration
- ✅ Simplified project structure for monorepo approach

## 🚢 Deployment

The application is configured for deployment on Vercel:

- Backend is deployed as serverless functions
- Frontend is built and served as static files
- Configuration is managed through `vercel.json`

## 🐛 Troubleshooting

### Backend issues

- Ensure Node.js is installed: `node --version`
- Check if port 5001 is available
- Verify all dependencies are installed: `npm install` (in root)

### Frontend issues

- Ensure backend is running before starting frontend
- Check browser console for errors
- Verify CORS is enabled in backend
- Clear browser cache if needed

### CORS errors

- Ensure backend CORS middleware is configured (already set up)
- Check that backend is running on port 5001
- Verify proxy configuration in `frontend/vite.config.ts`

## 📝 Development Notes

- The backend fetches detailed data for each Pokémon in the list to get images (this could be optimized)
- Error handling is implemented for network failures and invalid Pokémon names
- Loading states are shown during data fetching
- The UI is responsive and works on different screen sizes

## 🎨 UI Features

- Grid layout for Pokémon list with hover effects
- Responsive design (mobile-friendly)
- Loading spinners during data fetch
- Error messages for failed requests
- Smooth transitions and animations
- Color-coded badges for types and abilities

## 📄 License

ISC

## 👤 Author

Built as a full-stack development project demonstrating:

- Frontend-backend integration
- API proxying and data transformation
- Modern React patterns with TypeScript
- Responsive UI design
- Monorepo structure and deployment configuration
