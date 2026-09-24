import { useEffect, useState } from "react";
import type { FishCatch } from "./types/fishCatch";
import "./CatchHistory.css";

function CatchHistory() {
  const [catches, setCatches] = useState<FishCatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/catches")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load catches");
        }

        return response.json();
      })
      .then((data) => {
        setCatches(data);
      })
      .catch(() => {
        setLoadError("Unable to load catches");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="catch-history-page">
        <h1>Your Catch History</h1>
        <div className="catch-history-state catch-history-state-loading">
          <p>Loading catches...</p>
        </div>
      </div>
    );
  }
  if (loadError) {
    return (
      <div className="catch-history-page">
        <h1>Your Catch History</h1>
        <div className="catch-history-state catch-history-state-error">
          <p>{loadError}</p>
        </div>
      </div>
    );
  }
  if (catches.length === 0) {
    return (
      <div className="catch-history-page">
        <h1>Your Catch History</h1>
        <div className="catch-history-state">
          <p>No catches logged yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="catch-history-page">
      <h1>Your Catch History</h1>

      <div className="catch-history-table-wrapper">
        <table className="catch-history-table">
          <thead>
            <tr>
              <th scope="col">Species</th>
              <th scope="col">Size</th>
              <th scope="col">Location</th>
              <th scope="col">Catch Date</th>
            </tr>
          </thead>
          <tbody>
            {catches.map((fish) => (
              <tr key={fish.id}>
                <td>{fish.species}</td>
                <td>{fish.length}</td>
                <td>{fish.location}</td>
                <td>{fish.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CatchHistory;
