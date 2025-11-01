# Pokemon Explorer

A full-stack web application for exploring Pokémon data from the PokéAPI. Built with React, TypeScript, Express.js, and Tailwind CSS.

## 🎯 Features

- Browse a list of 20 Pokémon with images
- View detailed information for each Pokémon (types, height, weight, abilities)
- Clean, responsive UI with smooth transitions
- Real-time data fetching from PokéAPI

## 🏗️ Architecture

The project is split into two main parts:

- **Backend** (`/backend`): Express.js API server that acts as a proxy to PokéAPI
- **Frontend** (`/frontend`): React + TypeScript application built with Vite

### Tech Stack

**Backend:**
- Node.js + Express.js
- TypeScript
- Axios (for API calls)
- CORS enabled

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

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The backend server will run on `http://localhost:3001`

4. (Optional) Build for production:
   ```bash
   npm run build
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## 🚀 Running the Application

1. **Start the backend server** (in `backend/` directory):
   ```bash
   npm run dev
   ```

2. **Start the frontend server** (in `frontend/` directory, in a new terminal):
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

4. The app will automatically fetch and display the first 20 Pokémon

5. Click on any Pokémon card to view detailed information

6. Use the "Back to List" button to return to the list view

## 📡 API Endpoints

### Backend API

- `GET /ping` - Health check endpoint
- `GET /api/pokemon` - Get list of first 20 Pokémon (name + image)
- `GET /api/pokemon/:name` - Get detailed information for a specific Pokémon

### Example Responses

**GET /api/pokemon:**
```json
[
  {
    "name": "bulbasaur",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  },
  ...
]
```

**GET /api/pokemon/bulbasaur:**
```json
{
  "name": "bulbasaur",
  "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  "types": ["grass", "poison"],
  "height": 7,
  "weight": 69,
  "abilities": ["overgrow", "chlorophyll"]
}
```

## 🧪 Testing

### Integration Testing (Phase 9)

To validate the end-to-end integration:

1. Ensure both backend and frontend servers are running
2. Open the app in your browser (`http://localhost:3000`)
3. Verify the following:
   - ✅ List view loads and displays 20 Pokémon with images
   - ✅ Clicking a Pokémon card navigates to detail view
   - ✅ Detail view shows all information (types, height, weight, abilities)
   - ✅ "Back to List" button returns to list view
   - ✅ No console errors in browser DevTools
   - ✅ No CORS errors
   - ✅ All images load correctly
   - ✅ Loading states display correctly
   - ✅ Error handling works (test by stopping backend server)

## 📁 Project Structure

```
pokemon-explorer/
├── backend/
│   ├── src/
│   │   └── index.ts          # Express server and API routes
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── App.tsx           # Main React component
│   │   ├── main.tsx          # React entry point
│   │   └── index.css         # Global styles with Tailwind
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── .gitignore
└── README.md
```

## 🔧 Configuration

### Backend Port

Default port is `3001`. Override with `PORT` environment variable:
```bash
PORT=4000 npm run dev
```

### Frontend Port

Default port is `3000`. Configure in `vite.config.ts` if needed.

### API Proxy

The frontend uses Vite's proxy to forward `/api` requests to the backend. Configure in `frontend/vite.config.ts`.

## 🐛 Troubleshooting

### Backend issues
- Ensure Node.js is installed: `node --version`
- Check if port 3001 is available
- Verify all dependencies are installed: `npm install`

### Frontend issues
- Ensure backend is running before starting frontend
- Check browser console for errors
- Verify CORS is enabled in backend
- Clear browser cache if needed

### CORS errors
- Ensure backend CORS middleware is configured (already set up)
- Check that backend is running on the correct port

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

