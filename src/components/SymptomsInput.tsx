import { useState } from 'react';

interface SymptomsInputProps {
  onCheckSymptoms: (symptoms: string) => void;
}

const SymptomsInput = ({ onCheckSymptoms }: SymptomsInputProps) => {
  const [symptoms, setSymptoms] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <button onClick={() => onCheckSymptoms(symptoms)}>Check Symptoms</button>
    </div>
  );
};

export default SymptomsInput;
