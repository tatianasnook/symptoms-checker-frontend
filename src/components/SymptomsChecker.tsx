import { useState, useEffect } from 'react';
import { checkSymptoms, getConditionInfo, fetchHistory, saveSearchHistory, deleteRecord } from '../api/symptomsService';
import SymptomsInput from './SymptomsInput';
import ConditionsList from './ConditionsList';
import ConditionDetails from './ConditionDetails';
import SearchHistory from './SearchHistory';
import { SearchRecord } from "../types";

const SymptomsChecker = () => {
  const [conditions, setConditions] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [conditionDetails, setConditionDetails] = useState<string | null>(null);
  const [history, setHistory] = useState<SearchRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchHistory().then(setHistory).catch((error) => console.error("Failed to fetch history: ", error));
  }, []);

  const handleCheckSymptoms = async (symptoms: string) => {
    try {
      const fetchedConditions = await checkSymptoms(symptoms);
      setConditions(fetchedConditions);
      await saveSearchHistory(symptoms, fetchedConditions);
      fetchHistory().then(setHistory);
    } catch (error) {
      console.error("Error checking symptoms:", error);
    }
  };

  const handleGetConditionInfo = async () => {
    try {
      const details = await getConditionInfo(selectedCondition);
      setConditionDetails(details);
    } catch (error) {
      console.error("Error getting condition details:", error);
    }
  };

  const handleDeleteRecord = async (id: string) => {
    try {
      await deleteRecord(id);
      setHistory(history.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Symptoms Checker</h2>
      <SymptomsInput onCheckSymptoms={handleCheckSymptoms} />

      <ConditionsList 
        conditions={conditions} 
        selectedCondition={selectedCondition} 
        onSelectCondition={setSelectedCondition} 
        onGetConditionInfo={handleGetConditionInfo} 
      />

      <ConditionDetails details={conditionDetails} />
      
      <div style={{paddingTop: "40px"}}>
        <button onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? "Hide Previous Searches" : "Previous Search History"}
        </button>
      
        {showHistory && <SearchHistory history={history} onDeleteRecord={handleDeleteRecord} onRefreshHistory={() => fetchHistory().then(setHistory)} />}
      </div>
      
    </div>
  );
};

export default SymptomsChecker;
