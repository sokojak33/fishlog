import "./Dashboard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import AddCatchModal from "./components/AddCatchModal";
import type { FishCatch, NewFishCatch } from "./types/fishCatch";

function Dashboard() {
  const [catches, setCatches] = useState<FishCatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCatchForm, setShowCatchForm] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);

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

  const addCatch = async (newCatch: NewFishCatch): Promise<boolean> => {
    setAddError(null);

    try {
      const response = await fetch("/api/catches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCatch),
      });

      if (!response.ok) {
        throw new Error();
      }

      const createdCatch: FishCatch = await response.json();

      setCatches((currentCatches) => [...currentCatches, createdCatch]);

      return true;
    } catch {
      setAddError("Unable to add catch. Please try again.");
      return false;
    }
  };

  const renderRecentCatches = () => {
    if (loading) {
      return <li>Loading catches...</li>;
    }

    if (loadError) {
      return <li>{loadError}</li>;
    }

    return catches.map((fish) => <li key={fish.id}>{fish.species}</li>);
  };

  const renderCatchStats = () => {
    if (loading) {
      return <li>Loading stats...</li>;
    }

    if (loadError) {
      return <li>{loadError}</li>;
    }

    return catches.map((fish) => (
      <li key={fish.id}>
        {fish.length}", {fish.location}, {fish.date}
      </li>
    ));
  };

  const closeCatchForm = () => {
    setShowCatchForm(false);
  };

  return (
    <div className="dash-page">
      <h1>Welcome back, you</h1>
      <Button
        onClick={() => {
          setAddError(null);
          setShowCatchForm(true);
        }}
      >
        Log Catch
      </Button>
      <AddCatchModal
        show={showCatchForm}
        onClose={closeCatchForm}
        onAddCatch={addCatch}
        addError={addError}
      />

      <section className="dash-cards">
        <Card>
          <h2>Recent catches</h2>
          <ul>{renderRecentCatches()}</ul>
        </Card>
        <Card>
          <h2>Stats</h2>
          <ul>{renderCatchStats()}</ul>
        </Card>
      </section>
    </div>
  );
}

export default Dashboard;
