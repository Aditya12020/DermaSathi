import Icon from "../components/Icon";

function Dashboard({
  name,
  newScan,
  lastAnalysis,
  analysisCount,
  skinType,
  skinConcern,
  age,
  setPage,
}) {
  return (
    <section className="portal-content">

      <div className="page-heading">

        <div>

          <div className="eyebrow">
            <Icon>verified</Icon>
            CLINICAL OVERVIEW
          </div>

          <h1>
            Hello, <span>{name}</span>
          </h1>

          <p>
            Here is your latest skin analysis overview.
          </p>

        </div>

        <button
          className="primary-btn"
          onClick={newScan}
        >
          <Icon>biotech</Icon>
          New skin scan
        </button>

      </div>

      <div className="status-banner">

        <div className="status-icon">
          <Icon>health_and_safety</Icon>
        </div>

        <div>
          <strong>Your profile is ready</strong>

          <p>
            Complete your first skin scan to start building
            your personal history.
          </p>
        </div>

        <span className="status-pill">
          READY
        </span>

      </div>

      <div className="metric-grid">

        <div className="metric-card">
          <span>LAST ANALYSIS</span>

          <strong>
            {lastAnalysis
              ? lastAnalysis.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
              : "Not yet scanned"}
          </strong>

          <small>
            {lastAnalysis
              ? "Latest completed scan"
              : "Start your first analysis"}
          </small>
        </div>

        <div className="metric-card">
          <span>ANALYSIS COUNT</span>

          <strong>
            {analysisCount}
          </strong>

          <small>
            Clinical records
          </small>
        </div>

        <div className="metric-card">
          <span>PROFILE STATUS</span>

          <strong>
            Complete
          </strong>

          <small>
            {skinType || skinConcern || age
              ? "Personal details saved"
              : "Profile can be updated"}
          </small>
        </div>

      </div>

      <div className="dashboard-grid">

        <div className="scan-promo">

          <div>

            <div className="eyebrow">
              AI-POWERED SCREENING
            </div>

            <h2>
              Understand your skin with a clearer clinical picture.
            </h2>

            <p>
              Upload a clear image of the affected area and receive
              a preliminary AI-assisted assessment.
            </p>

            <button
              className="primary-btn"
              onClick={newScan}
            >
              Start analysis
              <Icon>arrow_forward</Icon>
            </button>

          </div>

          <div className="scan-visual">
            <div className="radar">
              <span>AI</span>
            </div>
          </div>

        </div>

        <div className="recent-card">

          <div className="card-title">

            <h3>
              Recent activity
            </h3>

            <span>
              {analysisCount} records
            </span>

          </div>

          {analysisCount === 0 ? (
            <div className="empty-state">

              <Icon>history</Icon>

              <strong>
                No analyses yet
              </strong>

              <p>
                Your completed scans will appear here.
              </p>

            </div>
          ) : (
            <div className="activity-item">

              <Icon>check_circle</Icon>

              <div>

                <strong>
                  Skin analysis completed
                </strong>

                <p>
                  {lastAnalysis?.toLocaleString()}
                </p>

                <button
                  className="text-btn"
                  onClick={() => setPage("report")}
                >
                  View report
                  <Icon>arrow_forward</Icon>
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}

export default Dashboard;