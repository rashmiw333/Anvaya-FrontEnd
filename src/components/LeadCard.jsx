import { useNavigate } from "react-router-dom";

function LeadCard({ lead }) {
    const navigate = useNavigate();
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">

        <h5 className="card-title">
          {lead.name}
        </h5>

        <p className="mb-2">
          <strong>Status:</strong> {lead.status}
        </p>

        <p className="mb-2">
          <strong>Source:</strong> {lead.source}
        </p>

        <p className="mb-2">
          <strong>Priority:</strong> {lead.priority}
        </p>

        <p className="mb-2">
          <strong>Time to Close:</strong> {lead.timeToClose} days
        </p>

        <div>
          {lead.tags?.map((tag) => (
            <span
              key={tag}
              className="badge bg-secondary me-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
         className="btn btn-primary mt-2"
         onClick={()=>navigate(`/leads/${lead._id}`)}>
            View Details
        </button>

      </div>
    </div>
  );
}

export default LeadCard;