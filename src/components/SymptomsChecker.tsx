import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';

interface SearchRecord {
  _id: string;
  symptoms: string;
  conditions: string;
  date: string;
}

const backendURL = "https://symptoscan-backend.onrender.com";

const SymptomsChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [conditions, setConditions] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [conditionDetails, setConditionDetails] = useState<string | null>(null);
  const [history, setHistory] = useState<SearchRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const checkSymptoms = async () => {
    try {
        const response = await axios.post(`${backendURL}/api/check-symptoms`, {
            symptoms,
        });
        setConditions(response.data.conditions);
        await saveSearchHistory(symptoms, response.data.conditions);
    } catch (error) {
        console.error("Error fetching conditions:", error);
    }
};

  const getConditionInfo = async () => {
      try {
          const response = await axios.post(`${backendURL}/api/get-condition-info`, {
              condition: selectedCondition,
          });
          setConditionDetails(response.data.details);
      } catch (error) {
          console.error("Error fetching condition details:", error);
      }
  };

  const saveSearchHistory = async (symptoms: string, conditions: string) => {
    try {
      const date = new Date().toISOString().split('T')[0];
      await axios.post(`${backendURL}/saveRecord`, { symptoms, conditions, date });
      fetchHistory(); // Refresh search history after saving new entry
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const fetchHistory = async () => {
      try {
        const response = await axios.get(`${backendURL}/getRecords`);
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching search history:', error);
      }
    };

  useEffect(() => {
    fetchHistory();
  }, []);

  const deleteRecord = async (id: string) => {
    try {
        await axios.delete(`${backendURL}/deleteRecord/${id}`);
        setHistory(history.filter(record => record._id !== id)); // Remove deleted record from UI
    } catch (error) {
        console.error('Error deleting record:', error);
    }
  };

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
          <p>
            {conditions.split(/(?=\d+\.\s)/).map((condition, index) => (
              <span key={index}>
                {condition.trim()}
                <br />
              </span>
            ))}
          </p>

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
          <p>
            {conditionDetails.split(/(Causes:|Symptoms:|Treatments:|Prevention methods:)/).map((part, index) => (
            <React.Fragment key={index}>
              {index % 2 === 0 ? part.trim() : <><br /><strong>{part}</strong><br /></>}
            </React.Fragment>
            ))}
          </p>
        </div>
      )}

      <button onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "Hide Previous Searches" : "Previous Search"}
      </button>

      {showHistory && (
        <div>
          <h2>Search History</h2>
          <button onClick={fetchHistory}>Previous Search</button>
          {history.length > 0 ? (
            <ul>
              {history.map((record) => (
                <li key={record._id}>
                  <strong>Symptoms:</strong> {record.symptoms} <br />
                  <strong>Conditions:</strong> {record.conditions} <br />
                  <strong>Date:</strong> {record.date} <br />
                  <button onClick={() => deleteRecord(record._id)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No search history available.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default SymptomsChecker
