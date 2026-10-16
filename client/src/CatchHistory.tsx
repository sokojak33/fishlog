import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import type { FishCatch } from "./types/fishCatch";
import "./CatchHistory.css";

function CatchHistory() {
  const [catches, setCatches] = useState<FishCatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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

  const deleteCatch = async (id: number): Promise<void> => {
    setDeleteError(null);

    try {
      const response = await fetch(`/api/catches/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete catch");
      }

      setCatches((currentCatches) =>
        currentCatches.filter((fishCatch) => fishCatch.id !== id),
      );
    } catch {
      setDeleteError("Unable to delete catch. Please try again.");
    }
  };

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

      {deleteError && (
        <div className="catch-history-state catch-history-state-error catch-history-delete-error">
          <p>{deleteError}</p>
        </div>
      )}
      <div className="catch-history-table-wrapper">
        <table className="catch-history-table">
          <thead>
            <tr>
              <th scope="col">Species</th>
              <th scope="col">Size</th>
              <th scope="col">Location</th>
              <th scope="col">Catch Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {catches.map((fish) => (
              <tr key={fish.id}>
                <td>{fish.species}</td>
                <td>{fish.length}</td>
                <td>{fish.location}</td>
                <td>{fish.date}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete?")) {
                        deleteCatch(fish.id);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CatchHistory;
