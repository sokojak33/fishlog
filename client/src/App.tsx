import './App.css'



function App() {
  return (
    <main className="App">
      <section className="hero">
        <h1>FishLog</h1>
        <p>Welcome to FishLog, the place where you can track your fishing adventures! Here you can log your trips, record your catches, and share your experiences with the fishing community. To start, log in or create an account.</p>
        <button>Log In</button>
        <button>Create Account</button>

        <div className="actions">
          <button>Add Trip</button>
          <button>View Logbook</button>
        </div>
      </section>
    </main>
  );
}

export default App;