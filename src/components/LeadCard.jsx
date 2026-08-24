function LeadCard({ lead }) {
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

      </div>
    </div>
  );
}

export default LeadCard;