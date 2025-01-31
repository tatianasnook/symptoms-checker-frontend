import { useState } from 'react';

interface SymptomsInputProps {
  onCheckSymptoms: (symptoms: string) => void;
}

const SymptomsInput = ({ onCheckSymptoms }: SymptomsInputProps) => {
  const [symptoms, setSymptoms] = useState("");

  return (
    <div>
      <h2>Enter your symptoms to check for possible conditions</h2>
      <input
        type="text"
        placeholder="Enter your symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <button onClick={() => onCheckSymptoms(symptoms)}>Analyze Symptoms</button>
    </div>
  );
};

export default SymptomsInput;
