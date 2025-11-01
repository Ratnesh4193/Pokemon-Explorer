# Pokemon Explorer
A full-stack web application for exploring Pokémon data from the PokéAPI. Built with React, TypeScript, Express.js, and Tailwind CSS.

## 🚀 Live Demo
**Check out the live application:** [https://pokemon-explorer-xazr.onrender.com/](https://pokemon-explorer-xazr.onrender.com/)

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
