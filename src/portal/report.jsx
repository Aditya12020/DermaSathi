import Icon from "../components/Icon";

function Report({
  preview,
  lastAnalysis,
  newScan,
}) {
  return (
    <section className="portal-content">

      <div className="page-heading">

        <div>

          <div className="eyebrow">
            <Icon>description</Icon>
            ANALYSIS COMPLETE
          </div>

          <h1>
            Clinical Skin Analysis
          </h1>

          <p>
            Preliminary AI-assisted findings based on the uploaded image.
          </p>

        </div>

        <button
          className="secondary-btn"
          onClick={newScan}
        >
          <Icon>refresh</Icon>
          New scan
        </button>

      </div>

      <div className="report-grid">

        <div className="report-image clinical-card">

          {preview ? (
            <img
              src={preview}
              alt="Analyzed skin"
            />
          ) : (
            <div className="report-placeholder">
              <Icon>image</Icon>
            </div>
          )}

          <div className="report-image-footer">

            <span>
              Uploaded image
            </span>

            <span>
              {lastAnalysis
                ? "Just now"
                : "No scan yet"}
            </span>

          </div>

        </div>

        <div className="result-card clinical-card">

          <span className="result-label">
            PRELIMINARY CLASSIFICATION
          </span>

          <h2>
            Acne / Inflammatory lesion
          </h2>

          <div className="confidence">

            <div>

              <span>
                AI confidence
              </span>

              <strong>
                82%
              </strong>

            </div>

            <div className="progress">
              <i />
            </div>

          </div>

          <div className="result-warning">

            <Icon>info</Icon>

            <p>
              This is a preliminary screening result, not a diagnosis.
            </p>

          </div>

          <button
            className="primary-btn wide"
            onClick={newScan}
          >
            Run another scan
            <Icon>refresh</Icon>
          </button>

        </div>

      </div>

      <div className="report-sections">

        <div className="report-box">

          <h3>
            What this may indicate
          </h3>

          <p>
            The visual pattern may be consistent with acne-related
            inflammation. Clinical examination is required to confirm
            the cause.
          </p>

        </div>

        <div className="report-box">

          <h3>
            Recommended next steps
          </h3>

          <ul>

            <li>
              Keep the area clean and avoid picking or squeezing.
            </li>

            <li>
              Track changes with consistent photographs.
            </li>

            <li>
              Consult a qualified dermatologist if symptoms persist
              or worsen.
            </li>

          </ul>

        </div>

      </div>

    </section>
  );
}

export default Report;