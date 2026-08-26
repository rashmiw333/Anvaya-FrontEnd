import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LeadList from "./pages/LeadList";
import LeadManagement from "./pages/LeadManagement";
import AddLead from "./pages/AddLead";

export default function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/leads" element={<LeadList />} />
      <Route path="/leads/:id" element={<LeadManagement />} />
      <Route path="/add-lead" element={<AddLead />} />
    </Routes>
  </Router> 
  );
}
