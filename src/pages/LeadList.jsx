import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useFetch from "../hooks/useFetch";

function LeadList() {

  const navigate = useNavigate();

  const {
    data: leads,
    loading,
    error
  } = useFetch("http://localhost:3000/api/leads");

  const [status, setStatus] = useState("");
  const [salesAgent, setSalesAgent] = useState("");
  const [sortBy, setSortBy] = useState("");

  if (loading) {
    return <h4 className="p-4">Loading leads...</h4>;
  }

  if (error) {
    return <h4 className="p-4">Error: {error}</h4>;
  }

  // Filter leads
  let filteredLeads = leads.filter((lead) => {

    const statusMatch =
      status === "" || lead.status === status;

    const agentMatch =
      salesAgent === "" ||
      lead.salesAgent?.name === salesAgent;

    return statusMatch && agentMatch;
  });

  // Sort leads
  if (sortBy === "priority") {

    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3
    };

    filteredLeads.sort(
      (a, b) =>
        priorityOrder[a.priority] -
        priorityOrder[b.priority]
    );
  }

  if (sortBy === "timeToClose") {

    filteredLeads.sort(
      (a, b) =>
        a.timeToClose - b.timeToClose
    );
  }

  return (
    <div className="dashboard-layout">

      {/*Sidebar  */}
      <Sidebar isLead={true} />

      <main className="main-content">

        <h1 className="mb-4">
          Lead List
        </h1>

        {/* Lead Overview */}
        <div className="card shadow-sm mb-4">

          <div className="card-body">

            <h3 className="mb-4">
              Lead Overview
            </h3>

            {filteredLeads.map((lead) => (

              <div
                key={lead._id}
                className="border-bottom py-3"
              >
                <strong>
                  {lead.name}
                </strong>
                {" - "}
                {lead.status}
                {" - "}
                {lead.salesAgent?.name || "Unassigned"}
              </div>

            ))}

          </div>

        </div>


        {/* Filters */}
        <div className="card shadow-sm mb-4">

          <div className="card-body">

            <h5 className="mb-3">
              Filters
            </h5>

            <div className="row">

              {/* Status */}
              <div className="col-md-4">

                <label className="form-label">
                  Status
                </label>

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >

                  <option value="">
                    All Statuses
                  </option>

                  <option value="New">
                    New
                  </option>

                  <option value="Contacted">
                    Contacted
                  </option>

                  <option value="Qualified">
                    Qualified
                  </option>

                  <option value="Proposal Sent">
                    Proposal Sent
                  </option>

                  <option value="Closed">
                    Closed
                  </option>

                </select>

              </div>


              {/* Sales Agent */}
              <div className="col-md-4">

                <label className="form-label">
                  Sales Agent
                </label>

                <select
                  className="form-select"
                  value={salesAgent}
                  onChange={(e) =>
                    setSalesAgent(e.target.value)
                  }
                >

                  <option value="">
                    All Sales Agents
                  </option>

                  {[...new Set(
                    leads
                      .filter((lead) => lead.salesAgent)
                      .map((lead) => lead.salesAgent.name)
                  )].map((agent) => (

                    <option
                      key={agent}
                      value={agent}
                    >
                      {agent}
                    </option>

                  ))}

                </select>

              </div>


              {/* Sort */}
              <div className="col-md-4">

                <label className="form-label">
                  Sort By
                </label>

                <select
                  className="form-select"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                >

                  <option value="">
                    Default
                  </option>

                  <option value="priority">
                    Priority
                  </option>

                  <option value="timeToClose">
                    Time to Close
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>


        {/* Add New Lead */}
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-lead")}
        >
          Add New Lead
        </button>

      </main>

    </div>
  );
}

export default LeadList;