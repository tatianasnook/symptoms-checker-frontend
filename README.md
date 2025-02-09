# SymptoScan Frontend

#### By Tatiana Snook

## Technologies Used:
* React + TypeScript – UI development and type safety
* Axios – API calls to the backend
* Google Maps API – Displaying healthcare facilities on a map
* Vite – Fast development and build tooling
* CSS – Styling

## Description
This is the frontend for SymptoScan, a medical symptom analysis application. It allows users to:
* Check symptoms and receive possible conditions
* Get detailed condition descriptions
* Find nearby healthcare facilities using Google Maps
* View and manage search history

## Setup/Installation Requirements
1. Clone the repository
   
    git clone https://github.com/yourusername/symptoscan-frontend.git
    cd symptoscan-frontend
2. Install dependencies
   
    npm install
3. Set up environment variables
   
   Create a .env file in the root directory and add the following:
    
    VITE_BACKEND_URL=https://symptoscan.onrender.com
    
    VITE_GOOGLE_API_KEY=your_google_maps_api_key
4. Run the development server
   
    npm run dev
    
    The app will start on http://localhost:5173

## Deployment

Render Deployment

To deploy on Render:

1. Create a new Static Site
2. Connect the GitHub repository
3. Set environment variables in Render Dashboard
4. Deploy

## Known Issues

* No known issues at this time.
* Feel free to adjust it further based on your preferences.