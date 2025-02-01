import { useState } from 'react';

interface SymptomsInputProps {
  onCheckSymptoms: (symptoms: string) => void;
}

const SymptomsInput = ({ onCheckSymptoms }: SymptomsInputProps) => {
  const [symptoms, setSymptoms] = useState("");

  return (
    <div>
      <h3>Enter a list of your symptoms to check for possible conditions:</h3>
      <input
        type="text"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <button onClick={() => onCheckSymptoms(symptoms)} className='blue-btn'>
        Analyze Symptoms
      </button>
    </div>
  );
};

export default SymptomsInput;
