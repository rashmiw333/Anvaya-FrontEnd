import { useState } from "react";
import Sidebar from "../components/Sidebar";
import useFetch from "../hooks/useFetch";

function LeadStatusView() {

  const {
    data: leads,
    loading,
    error
  } = useFetch("http://localhost:3000/api/leads");

  const [agentFilter, setAgentFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  if (loading) {
    return <h4 className="p-4">Loading...</h4>;
  }

  if (error) {
    return <h4 className="p-4">Error: {error}</h4>;
  }

  // Get agents
  const agents = [
    ...new Set(
      leads.map((lead) => lead.salesAgent?.name).filter(Boolean)
    )
  ];

  // Filter leads
  let filteredLeads = leads.filter((lead) => {

    const agentMatch =
      agentFilter === "" ||
      lead.salesAgent?.name === agentFilter;

    const priorityMatch =
      priorityFilter === "" ||
      lead.priority === priorityFilter;

    return agentMatch && priorityMatch;
  });

  // Sort by time to close
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

  // Group leads by status
  const groupedLeads = {};

  filteredLeads.forEach((lead) => {

    if (!groupedLeads[lead.status]) {
      groupedLeads[lead.status] = [];
    }

    groupedLeads[lead.status].push(lead);
  });

  return (
    <div className="dashboard-layout">

      <Sidebar isLead={true}/>

      <main className="main-content">

        <h1 className="mb-4">
          Leads by Status
        </h1>

        {/* Filters */}

        <div className="row mb-4">

          <div className="col-md-4">

            <label className="form-label">
              Sales Agent
            </label>

            <select
              className="form-select"
              value={agentFilter}
              onChange={(e) =>
                setAgentFilter(e.target.value)
              }
            >
              <option value="">All Agents</option>

              {agents.map((agent) => (
                <option key={agent} value={agent}>
                  {agent}
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

              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>

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

        {/* Lead Groups */}

        {Object.keys(groupedLeads).map((status) => (

          <div className="card mb-4" key={status}>

            <div className="card-header">
              <h4 className="mb-0">
                Status: {status}
              </h4>
            </div>

            <div className="card-body">

              {groupedLeads[status].map((lead) => (

                <div
                  key={lead._id}
                  className="border-bottom py-3"
                >

                  <h5>{lead.name}</h5>

                  <p className="mb-1">
                    Sales Agent:{" "}
                    {lead.salesAgent?.name || "Unknown"}
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

export default LeadStatusView;