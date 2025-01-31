import React from 'react';

interface ConditionDetailsProps {
  details: string | null;
}

const ConditionDetails = ({ details }: ConditionDetailsProps) => {
  return details ? (
    <div>
      <h3>Condition Details:</h3>
      <p>
        {details.split(/(Causes:|Symptoms:|Treatments:|Prevention methods:)/).map((part, index) => (
          <React.Fragment key={index}>
            {index % 2 === 0 ? part.trim() : <><br /><strong>{part}</strong><br /></>}
          </React.Fragment>
        ))}
      </p>
    </div>
  ) : null;
};

export default ConditionDetails;
