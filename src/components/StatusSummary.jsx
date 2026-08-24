function StatusSummary({ leads }) {
  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const qualifiedLeads = leads.filter(
    (lead) => lead.status === "Qualified"
  ).length;

   const proposalSentLeads = leads.filter(
    (lead) => lead.status === "Proposal Sent"
  ).length;

   const closedLeads = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  return (
    <div className="card shadow-sm">
      <div className="card-body">

        <h5>Lead Status</h5>

        <p>New: {newLeads} Leads</p>

        <p>Contacted: {contactedLeads} Leads</p>

        <p>Qualified: {qualifiedLeads} Leads</p>

        <p>Proposal Sent: {proposalSentLeads} Leads</p>

        <p>Closed: {closedLeads} Leads</p>

      </div>
    </div>
  );
}

export default StatusSummary;