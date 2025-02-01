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
    </div>
  )
}

export default App
