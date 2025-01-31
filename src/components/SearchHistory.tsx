import { SearchRecord } from "../types/types";

interface SearchHistoryProps {
  history: SearchRecord[];
  onDeleteRecord: (id: string) => void;
  onRefreshHistory: () => void;
}

const SearchHistory = ({ history, onDeleteRecord, onRefreshHistory }: SearchHistoryProps) => {
  return (
    <div>
      <h2>Search History</h2>
      <button onClick={onRefreshHistory}>Refresh History</button>
      {history.length > 0 ? (
        <ul>
          {history.map((record) => (
            <li key={record._id}>
              <strong>Symptoms:</strong> {record.symptoms} <br />
              <strong>Conditions:</strong> {record.conditions} <br />
              <strong>Date:</strong> {record.date} <br />
              <button onClick={() => onDeleteRecord(record._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search history available.</p>
      )}
    </div>
  );
};

export default SearchHistory;
