import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import useFetch from "../hooks/useFetch";

function SalesAgentManagement() {

  const navigate = useNavigate();

  const {
    data: agents,
    loading,
    error
  } = useFetch(
    "http://localhost:3000/api/agents"
  );

  if (loading) {
    return <h4 className="p-4">Loading...</h4>;
  }

  if (error) {
    return (
      <h4 className="p-4">
        Error: {error}
      </h4>
    );
  }

  return (
    <div className="dashboard-layout">

      <Sidebar isSalesAgent={true} />

      <main className="main-content">

        <h1 className="mb-4">
          Sales Agent Management
        </h1>

        <div className="card p-4">

          <h3 className="mb-4">
            Sales Agent List
          </h3>

          {agents.map((agent) => (

            <div
              key={agent._id}
              className="border-bottom py-3"
            >

              <h5 className="mb-1">
                Agent: {agent.name}
              </h5>

              <p className="mb-0">
                {agent.email}
              </p>

            </div>

          ))}

        </div>

          <button
            className="btn btn-primary mt-4"
            onClick={() => navigate("/add-agent")}
          >
            Add New Agent
          </button>

      </main>

    </div>
  );
}

export default SalesAgentManagement;