import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LeadList from "./pages/LeadList";
import LeadManagement from "./pages/LeadManagement";
import SalesAgentManagement from "./pages/SalesAgentManagement";
import AddLead from "./pages/AddLead";
import AddSalesAgent from "./pages/AddSalesAgent";
import Reports from "./pages/Reports";
import LeadStatusView from "./pages/LeadStatusView";
import SalesAgentView from "./pages/SalesAgentView";

export default function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/leads" element={<LeadList />} />
      <Route path="/leads/:id" element={<LeadManagement />} />
      <Route path="/add-lead" element={<AddLead />} />
      <Route path="/sales-agents" element={<SalesAgentManagement />}/>
      <Route path="/add-agent"element={<AddSalesAgent />}/>
      <Route path="/reports" element={<Reports />} />
      <Route path="/lead-status" element={<LeadStatusView />}/>
      <Route path="/sales-agent-view" element={<SalesAgentView />}/>
    </Routes>
  </Router> 
  );
}
