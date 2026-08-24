import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar p-3">
      <h3 className="mb-4">Anvaya CRM</h3>

      <div className="nav flex-column">

        <NavLink to="/leads" className="nav-link">
          Leads
        </NavLink>

        <a href="/" className="nav-link">
          Sales Agents
        </a>

        <a href="/" className="nav-link">
          Reports
        </a>

        <a href="/" className="nav-link">
          Settings
        </a>

      </div>
    </div>
  );
}

export default Sidebar;