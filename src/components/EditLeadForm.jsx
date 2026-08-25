import { useState } from "react";
import { toast } from "react-toastify";

function EditLeadForm({ lead, agents, onClose }) {

  const [status, setStatus] = useState(
    lead.status
  );

  const [salesAgent, setSalesAgent] = useState(
    lead.salesAgent?._id || lead.salesAgent
  );

  const [priority, setPriority] = useState(
    lead.priority
  );

  const [timeToClose, setTimeToClose] = useState(
    lead.timeToClose
  );

  async function handleUpdate(e) {

    e.preventDefault();

    try {

      const response = await fetch(
        `http://localhost:3000/api/leads/${lead._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            status,
            salesAgent,
            priority,
            timeToClose
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update lead");
      }

      toast.success("Lead updated successfully");

      onClose();


    } catch (error) {

      console.log(
        "Failed to update lead",
        error
      );

      toast.error("Failed to update lead.");

    }
  }

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body">

        <h3 className="mb-4">
          Edit Lead
        </h3>

        {/* Status */}

        <div className="mb-3">

          <label className="form-label">
            Lead Status
          </label>

          <select
            className="form-select"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Proposal Sent</option>
            <option>Closed</option>

          </select>

        </div>

        {/* Sales Agent */}

        <div className="mb-3">

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
              Select Sales Agent
            </option>

            {agents?.map((agent) => (

              <option
                key={agent._id}
                value={agent._id}
              >
                {agent.name}
              </option>

            ))}

          </select>

        </div>

        {/* Priority */}

        <div className="mb-3">

          <label className="form-label">
            Priority
          </label>

          <select
            className="form-select"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >

            <option>High</option>
            <option>Medium</option>
            <option>Low</option>

          </select>

        </div>

        {/* Time to Close */}

        <div className="mb-3">

          <label className="form-label">
            Time to Close
          </label>

          <input
            type="number"
            className="form-control"
            value={timeToClose}
            onChange={(e) =>
              setTimeToClose(e.target.value)
            }
          />

        </div>

        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={handleUpdate}
        >
          Save Changes
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
        >
          Cancel
        </button>

      </div>

    </div>
  );
}

export default EditLeadForm;