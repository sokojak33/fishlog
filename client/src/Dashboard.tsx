import "./Dashboard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Dashboard() {
  const tempCatches = [
    {
      id: 1,
      species: "Largemouth Bass",
      location: "Pewaukee Lake",
      date: "Aug 8",
      length: 18.5,
    },
    {
      id: 2,
      species: "Northern Pike",
      location: "Lake Country",
      date: "Aug 3",
      length: 21,
    },
  ];

  return (
    <div className="dash-page">
      <h1>Welcome back, you</h1>
      <Button onClick={() => console.log("Open log catch form")}>
        Log Catch
      </Button>
      <section className="dash-cards">
        <Card>
          <h2>Recent catches</h2>
          <ul>
            {tempCatches.map((fish) => (
              <li key={fish.id}>{fish.species}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2>Stats</h2>
          <ul>
            {tempCatches.map((fish) => (
              <li key={fish.id}>
                {fish.length}", {fish.location}, {fish.date}
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}

export default Dashboard;
