
import { useState } from "react";
import { SearchRecord } from "../types/types";

interface SearchHistoryProps {
  history: SearchRecord[];
  onDeleteRecord: (id: string) => void;
  onRefreshHistory: () => void;
}

const SearchHistory = ({ history, onDeleteRecord, onRefreshHistory }: SearchHistoryProps) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="search-history">
      <button className="search-btn" onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "Hide Previous Searches" : "Previous Search History"}
      </button>

      {showHistory && (
        <div>
          <h3>Search History</h3>
          <button className="search-btn" onClick={onRefreshHistory}>Refresh History</button>
          {history.length > 0 ? (
            <ul>
              {history.map((record) => (
                <li key={record._id}>
                  <strong>Symptoms:</strong> {record.symptoms} <br />
                  <strong>Conditions:</strong> {record.conditions} <br />
                  <strong>Date:</strong> {record.date} <br />
                  <button className="delete-btn" onClick={() => onDeleteRecord(record._id)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No search history available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;
