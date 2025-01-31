interface ConditionInputProps {
  onSelectCondition: (condition: string) => void;
  onGetConditionInfo: () => void;
}

const ConditionInput = ({ onSelectCondition, onGetConditionInfo }: ConditionInputProps) => {
  return (
    <div style={{paddingTop: "60px"}}>
      <h2>Learn more about a condition</h2>
      <input
        type="text"
        placeholder="Enter condition name to learn more"
        onChange={(e) => onSelectCondition(e.target.value)}
      />
      <button onClick={onGetConditionInfo}>Get Condition Details</button>
    </div>
  );
};

export default ConditionInput;
