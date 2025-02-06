import iconPulse from './assets/icons8-pulse.png';
import './App.css'
import HealthcareLocator from './components/HealthcareLocator'
import SymptomsChecker from './components/SymptomsChecker'
import SearchHistory from './components/SearchHistory';
import { useState, useEffect } from 'react';
import { fetchHistory, deleteRecord } from './api/symptomsService';
import { SearchRecord } from "./types/types";

function App() {
  const [history, setHistory] = useState<SearchRecord[]>([]);

  useEffect(() => {
    fetchHistory().then(setHistory).catch((error) => console.error("Failed to fetch history: ", error));
  }, []);

  const handleDeleteRecord = async (id: string) => {
    try {
      await deleteRecord(id);
      setHistory(history.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div>
      <header>
        <img src={iconPulse} alt="Pulse Icon"/>
        <h1>SymptoScan</h1>
      </header>
      
      <SymptomsChecker />
      <HealthcareLocator />
      <SearchHistory 
        history={history}
        onDeleteRecord={handleDeleteRecord}
        onRefreshHistory={() => fetchHistory().then(setHistory)}
      />

      <footer>
        <p>
          <strong>Disclaimer:</strong> This SymptoScan app is intended for informational purposes only and should not be considered as medical advice. It is not a substitute for professional healthcare consultation, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this app.
        </p>
        <p>&copy; 2025 Tatiana Snook. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
