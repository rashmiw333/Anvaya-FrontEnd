import Sidebar from "../components/Sidebar";
import LeadForm from "../components/LeadForm";

function AddLead() {

  return (
    <div className="dashboard-layout">

      <Sidebar isLead={true} />

      <main className="main-content">

        <h1 className="mb-4">
          Add New Lead
        </h1>

        <LeadForm />

      </main>

    </div>
  );
}

export default AddLead;