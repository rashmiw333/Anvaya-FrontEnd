import { Pie, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import Sidebar from "../components/Sidebar";
import useFetch from "../hooks/useFetch";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Reports() {

  // Closed leads
  const {
    data: closedData,
    loading: closedLoading,
    error: closedError
  } = useFetch(
    "https://anvaya-backend-omega.vercel.app/api/report/closed"
  );

  // Pipeline leads
  const {
    data: pipelineData,
    loading: pipelineLoading,
    error: pipelineError
  } = useFetch(
    "https://anvaya-backend-omega.vercel.app/api/report/pipeline"
  );

  // Closed by sales agent
  const {
    data: agentData,
    loading: agentLoading,
    error: agentError
  } = useFetch(
    "https://anvaya-backend-omega.vercel.app/api/report/closed-by-agent"
  );

  // Status distribution
  const {
    data: statusData,
    loading: statusLoading,
    error: statusError
  } = useFetch(
    "https://anvaya-backend-omega.vercel.app/api/report/status-distribution"
  );

  if (
    closedLoading ||
    pipelineLoading ||
    agentLoading ||
    statusLoading
  ) {
    return <h4 className="p-4">Loading reports...</h4>;
  }

  if (
    closedError ||
    pipelineError ||
    agentError ||
    statusError
  ) {
    return <h4 className="p-4">Error loading reports.</h4>;
  }

  // Closed vs Pipeline Pie Chart
  const closedPipelineData = {
    labels: ["Closed Leads", "Pipeline Leads"],
    datasets: [
      {
        data: [
          closedData.totalClosedLeads,
          pipelineData.totalLeadsInPipeline
        ]
      }
    ]
  };

  // Leads Closed by Sales Agent
  const agentChartData = {
    labels: Object.keys(agentData),
    datasets: [
      {
        label: "Closed Leads",
        data: Object.values(agentData)
      }
    ]
  };

  // Lead Status Distribution
  const statusChartData = {
    labels: Object.keys(statusData),
    datasets: [
      {
        data: Object.values(statusData)
      }
    ]
  };

  return (
    <div className="dashboard-layout">

      <Sidebar isLead={true}/>

      <main className="main-content">

        <h1 className="mb-4">
          Anvaya CRM Reports
        </h1>

        {/* Closed vs Pipeline */}

        <div className="card p-4 mb-4">

          <h3 className="mb-4">
            Total Leads Closed and in Pipeline
          </h3>

          <div style={{ maxWidth: "450px" }}>
            <Pie data={closedPipelineData} />
          </div>

        </div>


        {/* Leads Closed by Sales Agent */}

        <div className="card p-4 mb-4">

          <h3 className="mb-4">
            Leads Closed by Sales Agent
          </h3>

          <Bar data={agentChartData} />

        </div>


        {/* Lead Status Distribution */}

        <div className="card p-4">

          <h3 className="mb-4">
            Lead Status Distribution
          </h3>

          <div style={{ maxWidth: "450px" }}>
            <Pie data={statusChartData} />
          </div>

        </div>

      </main>

    </div>
  );
}

export default Reports;