import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";

function LeadForm() {

  const navigate = useNavigate();

  const {
    data: agents,
    loading
  } = useFetch(
    "https://anvaya-backend-omega.vercel.app/api/agents"
  );

  const [name, setName] = useState("");
  const [source, setSource] = useState("Website");
  const [salesAgent, setSalesAgent] = useState("");
  const [status, setStatus] = useState("New");
  const [priority, setPriority] = useState("Medium");
  const [timeToClose, setTimeToClose] = useState("");
  const [tags, setTags] = useState([]);

  const availableTags = [
    "High Value",
    "Follow-up",
    "Enterprise",
    "Hot Lead"
  ];

  function handleTagChange(tag) {

    if (tags.includes(tag)) {

      setTags(
        tags.filter((item) => item !== tag)
      );

    } else {

      setTags([...tags, tag]);

    }
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const response = await fetch(
        "https://anvaya-backend-omega.vercel.app/api/leads",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            source,
            salesAgent,
            status,
            priority,
            timeToClose: Number(timeToClose),
            tags
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create lead");
      }

      toast.success("Lead created successfully");

      navigate("/leads");

    } catch (error) {

      console.log(
        "Failed to create lead",
        error
      );

      toast.error("Failed to create lead.");

    }
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  return (
    <div className="card shadow-sm">

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          {/* Lead Name */}
          <div className="mb-3">

            <label className="form-label">
              Lead Name
            </label>

            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) =>
              setName(e.target.value)
              }
              required
            />

          </div>


          {/* Lead Source */}
          <div className="mb-3">

            <label className="form-label">
              Lead Source
            </label>

            <select
              className="form-select"
              value={source}
              onChange={(e) =>
                setSource(e.target.value)
              }
            >

              <option value="Website">
                Website
              </option>

              <option value="Referral">
                Referral
              </option>

              <option value="Cold Call">
                Cold Call
              </option>

              <option value="Advertisement">
                Advertisement
              </option>

            </select>

          </div>


          {/* Sales Agent */}
          <div className="mb-3">

            <label className="form-label">
              Assigned Sales Agent
            </label>

            <select
              className="form-select"
              value={salesAgent}
              onChange={(e) =>
                setSalesAgent(e.target.value)
              }
              required
            >

              <option value="">
                Select Sales Agent
              </option>

              {agents.map((agent) => (

                <option
                  key={agent._id}
                  value={agent._id}
                >
                  {agent.name}
                </option>

              ))}

            </select>

          </div>


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

              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">
                Proposal Sent
              </option>
              <option value="Closed">Closed</option>

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

              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>

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
              required
            />

          </div>


          {/* Tags */}
          <div className="mb-4">

            <label className="form-label">
              Tags
            </label>

            <div>

              {availableTags.map((tag) => (

                <div
                  className="form-check"
                  key={tag}
                >

                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={tags.includes(tag)}
                    onChange={() =>
                      handleTagChange(tag)
                    }
                  />

                  <label className="form-check-label">
                    {tag}
                  </label>

                </div>

              ))}

            </div>

          </div>


          {/* Buttons */}
          <button
            type="submit"
            className="btn btn-primary me-2"
          >
            Create Lead
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/leads")}
          >
            Cancel
          </button>

        </form>

      </div>

    </div>
  );
}

export default LeadForm;