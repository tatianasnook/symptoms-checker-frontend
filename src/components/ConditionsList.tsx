interface ConditionsListProps {
  conditions: string | null;
}

const ConditionsList = ({ conditions }: ConditionsListProps) => {
  // Function to clean up the API response
  const cleanConditions = (conditions: string | null) => {
    if (!conditions) return null;

    // Remove common introductory phrases from OpenAI responses
    const cleaned = conditions.replace(/^(Certainly! Here are some possible conditions based on the symptoms provided:|Sure!|Here are some possible conditions that could cause|Here is a list of possible conditions based on the symptoms of).*?:\s*/i, "");

    return cleaned.trim();
  };

  const formattedConditions = cleanConditions(conditions);

  return (
    <div className="conditions-list">
      {/* Show the heading only if formattedConditions is not empty */}
      {formattedConditions && formattedConditions !== "" && (
        <h4>Here is a list of possible conditions based on your symptoms:</h4>
      )}

      {formattedConditions && formattedConditions !== "" ? (
        <p>
          {formattedConditions.split(/(?=\d+\.\s)/).map((condition, index) => (
            <span key={index}>{condition.trim()}<br /></span>
          ))}
        </p>
      ) : (
        conditions !== null && <p>No conditions found.</p>
      )}
    </div>
  );
};

export default ConditionsList;
