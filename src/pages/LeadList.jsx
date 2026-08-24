import LeadCard from "../components/LeadCard";
import useFetch from "../hooks/useFetch";

function LeadList() {
  const {
    data: leads,
    loading,
    error
  } = useFetch("http://localhost:3000/api/leads");

  if (loading) {
    return <h4>Loading leads...</h4>;
  }

  if (error) {
    return <h4>Error: {error}</h4>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Leads</h2>

        <button className="btn btn-primary">
          Add New Lead
        </button>
      </div>

      <div className="row g-4">
        {leads.map((lead) => (
          <div
            className="col-md-6 col-lg-4"
            key={lead._id}
          >
            <LeadCard lead={lead} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeadList;