function QuickFilters({ selectedStatus, onStatusChange }) {
    const statuses = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed"
  ];
  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">

        <h5 className="mb-3">
          Quick Filters
        </h5>

             {statuses.map((status) => (

          <button
            key={status}
            className={
              selectedStatus === status
                ? "btn btn-primary me-2"
                : "btn btn-outline-primary me-2"
            }
            onClick={() => onStatusChange(status)}
          >
            {status}
          </button>

        ))}

      </div>
    </div>
  );
}

export default QuickFilters;