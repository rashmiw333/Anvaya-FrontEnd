import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LeadList from "./pages/LeadList";

export default function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/leads" element={<LeadList />} />
    </Routes>
  </Router> 
  );
}
