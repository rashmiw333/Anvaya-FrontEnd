import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import StatusSummary from "../components/StatusSummary";
import LeadCard from "../components/LeadCard";
import QuickFilters from "../components/QuickFilters";
import useFetch from "../hooks/useFetch";


function Dashboard() {

const navigate = useNavigate();

const [selectedStatus, setSelectedStatus] = useState("");

  const {
    data: leads,
    loading,
    error
  } = useFetch("https://anvaya-backend-omega.vercel.app/api/leads");

  if (loading) {
    return <h4 className="p-4">Loading dashboard...</h4>;
  }

  if (error) {
    return <h4 className="p-4">Error: {error}</h4>;
  }

  const filteredLeads = selectedStatus
  ? leads.filter((lead) => lead.status === selectedStatus)
  : leads;
 

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">

        <h1 className="text-center mb-4">
          Anvaya CRM Dashboard
        </h1>

        {/* Leads */}
        <div className="row g-4 mb-4">
          {filteredLeads.slice(0, 3).map((lead) => (
            <div
              className="col-md-4"
              key={lead._id}
            >
              <LeadCard lead={lead} />
            </div>
          ))}
        </div>

        {/* Lead Status */}
        <StatusSummary leads={leads} />

        {/* Quick Filters */}
        <QuickFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus} />

        {/* Add Lead */}
        <div className="text-center mt-4">
          <button className="btn btn-primary"
          onClick={() => navigate("/add-lead")}
          >
            Add New Lead
          </button>
        </div>

      </main>

    </div>
  );
}

export default Dashboard;