interface ConditionsListProps {
  conditions: string | null;
  onSelectCondition: (condition: string) => void;
  onGetConditionInfo: () => void;
}

const ConditionsList = ({ conditions, onSelectCondition, onGetConditionInfo }: ConditionsListProps) => {
  return (
    <div>
      <h2>Learn more about condition</h2>

      {/* Show conditions if available */}
      {conditions && conditions.trim() !== "" ? (
        <p>
          {conditions.split(/(?=\d+\.\s)/).map((condition, index) => (
            <span key={index}>{condition.trim()}<br /></span>
          ))}
        </p>
      ) : (
        // Only show "No conditions found" if conditions were searched but nothing was returned
        conditions !== null && <p>No conditions found.</p>
      )}

      <input
        type="text"
        placeholder="Enter condition name to learn more"
        onChange={(e) => onSelectCondition(e.target.value)}
      />

      <button onClick={onGetConditionInfo}>Get Condition Details</button>
    </div>
  );
};

export default ConditionsList;
