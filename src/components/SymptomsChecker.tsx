import axios from 'axios';
import { useState, useEffect } from 'react';

const SymptomsChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [conditions, setConditions] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [conditionDetails, setConditionDetails] = useState<string | null>(null);
  const [history, setHistory] = useState<{ _id: string; text: string }[]>([]);

  const checkSymptoms = async () => {
    try {
        const response = await axios.post("http://localhost:4000/api/check-symptoms", {
            symptoms,
        });
        setConditions(response.data.conditions);
        await saveSearchHistory(symptoms);
    } catch (error) {
        console.error("Error fetching conditions:", error);
    }
};

  const getConditionInfo = async () => {
      try {
          const response = await axios.post("http://localhost:4000/api/get-condition-info", {
              condition: selectedCondition,
          });
          setConditionDetails(response.data.details);
      } catch (error) {
          console.error("Error fetching condition details:", error);
      }
  };

  const saveSearchHistory = async (text: string) => {
    try {
      await axios.post('http://localhost:4000/saveRecord', { text });
      fetchHistory(); // Refresh search history after saving new entry
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getRecords');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching search history:', error);
      }
    };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Symptom Checker</h2>

      <div>
        <input
          type="text"
          placeholder="Enter your symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <button onClick={checkSymptoms}>Check Conditions</button>
      </div>

      {conditions && (
        <div>
          <h2>Possible Conditions:</h2>
          <p>{conditions}</p>

          <input
            type="text"
            placeholder="Enter condition name to learn more"
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
          />
          <button onClick={getConditionInfo}>Get Condition Details</button>
        </div>
      )}

      {conditionDetails && (
        <div>
          <h2>Condition Details:</h2>
          <p>{conditionDetails}</p>
        </div>
      )}

      <div>
        <h2>Search History</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((record) => (
              <li key={record._id}>{record.text}</li>
            ))}
          </ul>
        ) : (
          <p>No search history available.</p>
        )}
      </div>
    </div>
  )
}

export default SymptomsChecker
