import "./Dashboard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Dashboard() {
  return (
    <div className="dash-page">
      <h1>Welcome back, you</h1>
      <Button>Log Catch</Button>
      <section className="dash-cards">
        <Card>
          <h2>Recent catches</h2>
          <ul>
            <li>Fish numba 1</li>
            <li></li>
            <li></li>
          </ul>
        </Card>
        <Card>
          <h2>Stats</h2>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </Card>
      </section>
    </div>
  );
}

export default Dashboard;
