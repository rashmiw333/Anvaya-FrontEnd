function LeadDetails({ lead, onEdit }) {

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body">

        <h3 className="mb-4">
          Lead Details
        </h3>

        <p>
          <strong>Lead Name:</strong>{" "}
          {lead.name}
        </p>

        <p>
          <strong>Sales Agent:</strong>{" "}
          {lead.salesAgent?.name || "Not Assigned"}
        </p>

        <p>
          <strong>Source:</strong>{" "}
          {lead.source}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {lead.status}
        </p>

        <p>
          <strong>Time to Close:</strong>{" "}
          {lead.timeToClose} days
        </p>

        <p>
          <strong>Priority:</strong>{" "}
          {lead.priority}
        </p>

        <div className="mb-3">

          <strong>Tags:</strong>

          <div className="mt-2">

            {lead.tags?.map((tag) => (
              <span
                key={tag}
                className="badge bg-secondary me-2"
              >
                {tag}
              </span>
            ))}

          </div>

        </div>

        <button
          className="btn btn-outline-primary"
          onClick={onEdit}
        >
          Edit Lead
        </button>

      </div>

    </div>
  );
}

export default LeadDetails;