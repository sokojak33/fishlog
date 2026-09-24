import { useEffect, useState } from "react";
import type { FishCatch } from "./types/fishCatch";

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
      <div>
        <h1>Your Catch History</h1>
        <p>Loading catches...</p>
      </div>
    );
  }
  if (loadError) {
    return (
      <div>
        <h1>Your Catch History</h1>
        <p>{loadError}</p>
      </div>
    );
  }
  if (catches.length === 0) {
    return (
      <div>
        <h1>Your Catch History</h1>
        <p>No catches logged yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Catch History</h1>

      <table>
        <thead>
          <tr>
            <th>Species</th>
            <th>Size</th>
            <th>Location</th>
            <th>Catch Date</th>
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
  );
}

export default CatchHistory;
