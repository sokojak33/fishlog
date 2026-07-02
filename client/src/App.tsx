import './App.css'



function App() {
  const catchEntry = {
    species: "Smallmouth Bass",
    location: "Round Lake",
    date: "June 21, 2026",
    lure: "Ned rig",
    notes: "Fish were chasing but not committing."
  };

  return (
    <main className="App">
      <section className="hero">
        <h1>FishLog</h1>
        <p>Welcome to FishLog, the place where you can track your fishing adventures! Here you can log your trips, record your catches, and share your experiences with the fishing community. To start, log in or create an account.</p>

        <div className="auth">
          <button>Log In</button>
          <button>Create Account</button>
        </div>

        <div className="actions">
          <button>Add Trip</button>
          <button>View Logbook</button>
        </div>


      </section>
            <section className="features">
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

      <section>
        <h1> Recent logs:</h1>
        <article>
          <h2>{catchEntry.species}</h2>
          <p>{catchEntry.location}</p>
          <p>{catchEntry.date}</p>
          <p>{catchEntry.lure}</p>
          <p>{catchEntry.notes}</p>
        </article>
      </section>
    </main>
  );
}

export default App;