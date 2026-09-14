import "./Dashboard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

type FishCatch = {
  id: number;
  species: string;
  location: string;
  date: string;
  length: number;
};

function Dashboard() {
  const [catches, setCatches] = useState<FishCatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="dash-page">
      <h1>Welcome back, you</h1>
      <Button onClick={() => console.log("Open log catch form")}>
        Log Catch
      </Button>
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
