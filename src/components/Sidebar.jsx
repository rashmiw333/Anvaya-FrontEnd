import { NavLink } from "react-router-dom";

function Sidebar({ isLead,isSalesAgent}) {
  return (
    <div className="sidebar p-3">
      <h3 className="mb-4">Anvaya CRM</h3>

      <div className="nav flex-column">

         {(isLead || isSalesAgent)? (
        <NavLink to="/" className="nav-link">
          ← Back to Dashboard
        </NavLink>
      ) : (
        <>
          <NavLink to="/leads" className="nav-link">
            Leads
          </NavLink>

          <NavLink to="/sales-agents" className="nav-link">
            Sales Agents
          </NavLink>

          <NavLink to="/reports" className="nav-link">
            Reports
          </NavLink>

           <NavLink to="/lead-status" className="nav-link">
             Lead Status View
           </NavLink>

            <NavLink to="/sales-agent-view" className="nav-link">Sales Agent View</NavLink>


          <NavLink to="/settings" className="nav-link">
            Settings
          </NavLink>
        </>
      )}


      </div>
    </div>
  );
}

export default Sidebar;