interface ConditionInputProps {
  onSelectCondition: (condition: string) => void;
  onGetConditionInfo: () => void;
}

const ConditionInput = ({ onSelectCondition, onGetConditionInfo }: ConditionInputProps) => {
  return (
    <div className="condition-input">
      <h3>Learn more about a condition:</h3>
      <input
        type="text"
        onChange={(e) => onSelectCondition(e.target.value)}
      />
      <button onClick={onGetConditionInfo} className="blue-btn">
        Get Condition Details
        </button>
    </div>
  );
};

export default ConditionInput;
