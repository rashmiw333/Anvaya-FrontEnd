import { useState } from "react";
import Sidebar from "../components/Sidebar";
import useFetch from "../hooks/useFetch";

function SalesAgentView() {

  const {
    data: leads,
    loading,
    error
  } = useFetch("https://anvaya-backend-omega.vercel.app/api/leads");

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  if (loading) {
    return <h4 className="p-4">Loading...</h4>;
  }

  if (error) {
    return <h4 className="p-4">Error: {error}</h4>;
  }

  // Get statuses
  const statuses = [
    ...new Set(leads.map((lead) => lead.status))
  ];

  // Filter
  let filteredLeads = leads.filter((lead) => {

    const statusMatch =
      statusFilter === "" ||
      lead.status === statusFilter;

    const priorityMatch =
      priorityFilter === "" ||
      lead.priority === priorityFilter;

    return statusMatch && priorityMatch;
  });

  // Sort
  if (sortOrder === "low") {
    filteredLeads.sort(
      (a, b) => a.timeToClose - b.timeToClose
    );
  }

  if (sortOrder === "high") {
    filteredLeads.sort(
      (a, b) => b.timeToClose - a.timeToClose
    );
  }

  // Group by Sales Agent
  const groupedLeads = {};

  filteredLeads.forEach((lead) => {

    const agentName =
      lead.salesAgent?.name || "Unknown";

    if (!groupedLeads[agentName]) {
      groupedLeads[agentName] = [];
    }

    groupedLeads[agentName].push(lead);
  });

  return (
    <div className="dashboard-layout">

      <Sidebar isLead={true} />

      <main className="main-content">

        <h1 className="mb-4">
          Leads by Sales Agent
        </h1>

        {/* Filters */}

        <div className="row mb-4">

          <div className="col-md-4">

            <label className="form-label">
              Status
            </label>

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="">
                All Statuses
              </option>

              {statuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}

            </select>

          </div>

          <div className="col-md-4">

            <label className="form-label">
              Priority
            </label>

            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >

              <option value="">
                All Priorities
              </option>

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>

          </div>

          <div className="col-md-4">

            <label className="form-label">
              Sort by Time to Close
            </label>

            <select
              className="form-select"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value)
              }
            >

              <option value="">
                Default
              </option>

              <option value="low">
                Lowest First
              </option>

              <option value="high">
                Highest First
              </option>

            </select>

          </div>

        </div>

        {/* Agent Groups */}

        {Object.keys(groupedLeads).map((agent) => (

          <div className="card mb-4" key={agent}>

            <div className="card-header">

              <h4 className="mb-0">
                Sales Agent: {agent}
              </h4>

            </div>

            <div className="card-body">

              {groupedLeads[agent].map((lead) => (

                <div
                  key={lead._id}
                  className="border-bottom py-3"
                >

                  <h5>{lead.name}</h5>

                  <p className="mb-1">
                    Status: {lead.status}
                  </p>

                  <p className="mb-1">
                    Priority: {lead.priority}
                  </p>

                  <p className="mb-0">
                    Time to Close: {lead.timeToClose} days
                  </p>

                </div>

              ))}

            </div>

          </div>

        ))}

      </main>

    </div>
  );
}

export default SalesAgentView;