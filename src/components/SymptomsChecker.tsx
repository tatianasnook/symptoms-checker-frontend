import axios from 'axios';
import { useState } from 'react';

const SymptomsChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [conditions, setConditions] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [conditionDetails, setConditionDetails] = useState<string | null>(null);

  const checkSymptoms = async () => {
    try {
        const response = await axios.post("http://localhost:4000/api/check-symptoms", {
            symptoms,
        });
        setConditions(response.data.conditions);
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Symptom Checker</h1>

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
    </div>
  )
}

export default SymptomsChecker
