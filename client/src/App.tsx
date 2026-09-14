import AppNavbar from "./AppNavbar.tsx";
import Landing from "./Landing.tsx";
import Login from "./Login.tsx";
import Signup from "./Signup.tsx";
import Dashboard from "./Dashboard.tsx";

import { Route, Routes } from "react-router";

function App() {
  return (
    <div>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
