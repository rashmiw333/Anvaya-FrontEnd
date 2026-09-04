import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddSalesAgent() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const response = await fetch(
        "https://anvaya-backend-omega.vercel.app/api/agents",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create sales agent");
      }

      toast.success("Sales agent created successfully");

      navigate("/sales-agents");

    } catch (error) {

      console.log(
        "Failed to create sales agent:",
        error
      );

      toast.error("Failed to create sales agent");

    }
  }

  return (
    <div className="container mt-4">

      <h1 className="mb-4">
        Add New Sales Agent
      </h1>

      <div className="card p-4">

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Agent Name
            </label>

            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Create Agent
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddSalesAgent;