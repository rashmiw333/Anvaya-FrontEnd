function QuickFilters() {
  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">

        <h5 className="mb-3">
          Quick Filters
        </h5>

        <button className="btn btn-outline-primary me-2">
          New
        </button>

        <button className="btn btn-outline-primary me-2">
          Contacted
        </button>

        <button className="btn btn-outline-primary me-2">
          Qualified
        </button>

        <button className="btn btn-outline-primary me-2">
          Proposal Sent
        </button>

        <button className="btn btn-outline-primary">
          Closed
        </button>

      </div>
    </div>
  );
}

export default QuickFilters;