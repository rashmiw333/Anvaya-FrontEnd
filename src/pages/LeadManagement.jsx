import { useState } from "react";
import { useParams} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import LeadDetails from "../components/LeadDetails";
import CommentSection from "../components/CommentSection";
import EditLeadForm from "../components/EditLeadForm";

import useFetch from "../hooks/useFetch";

function LeadManagement() {

  const { id } = useParams();

  const [editing, setEditing] = useState(false);

  // Get Lead
  const {
    data: lead,
    loading: leadLoading,
    error: leadError
  } = useFetch(
    `http://localhost:3000/api/leads/${id}`
  );

  // Get Sales Agents
  const {
    data: agents,
    loading: agentsLoading
  } = useFetch(
    "http://localhost:3000/api/agents"
  );

  if (leadLoading || agentsLoading) {
    return <h4 className="p-4">Loading...</h4>;
  }

  if (leadError) {
    return (
      <h4 className="p-4">
        Error: {leadError}
      </h4>
    );
  }

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="main-content">

        <h1 className="mb-4">
          Lead Management
        </h1>

        {!editing ? (

          <LeadDetails
            lead={lead}
            onEdit={() => setEditing(true)}
          />

        ) : (

          <EditLeadForm
            lead={lead}
            agents={agents}
            onClose={() => setEditing(false)}
          />

        )}

        <CommentSection
          leadId={id}
        />

      </main>

    </div>
  );
}

export default LeadManagement;