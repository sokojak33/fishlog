import { Routes, Route } from "react-router";

import PublicLayout from "./components/PublicLayout";
import AppLayout from "./components/AppLayout";

import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
