import "./Dashboard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import AddFishModal from "./components/AddCatchModal";
import type { FishCatch } from "./types/fishCatch";

function Dashboard() {
  const [catches, setCatches] = useState<FishCatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCatchForm, setShowCatchForm] = useState(false);

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
        setError("Unable to load catches");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderRecentCatches = () => {
    if (loading) {
      return <li>Loading catches...</li>;
    }

    if (error) {
      return <li>{error}</li>;
    }

    return catches.map((fish) => <li key={fish.id}>{fish.species}</li>);
  };

  const addCatch = () => {
    console.log("add catch here");
  };

  const renderCatchStats = () => {
    if (loading) {
      return <li>Loading stats...</li>;
    }

    if (error) {
      return <li>{error}</li>;
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
      <Button onClick={() => setShowCatchForm(true)}>Log Catch</Button>

      <AddFishModal
        show={showCatchForm}
        onClose={closeCatchForm}
        onAddCatch={addCatch}
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
