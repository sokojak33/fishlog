import './Landing.css'
import { useNavigate } from "react-router";

function Landing() {

  const navigate = useNavigate();

  return (
    <main className="landing-page">
      <section className="landing-content">
        <h1>FishLog</h1>

        <p>Track your catches, fishing notes, and favorite locations in one place.</p>

      </section>
      <section className="landing-features">
        <article>
          <h2>Log Catches</h2>
          <p>Save species, location, date, lure, and notes from each trip.</p>
        </article>

        <article>
          <h2>Review Patterns</h2>
          <p>Look back at what worked based on location and conditions.</p>
        </article>

        <article>
          <h2>Build a Fishing History</h2>
          <p>Keep a growing record of your fishing trips over time.</p>
        </article>
      </section>

      <div className="landing-auth">
        <button onClick={() => navigate("/signup")}>Create Account</button>
        <button onClick={() => navigate("/login")}>Log In</button>
      </div>
    </main>
  );
}

export default Landing;