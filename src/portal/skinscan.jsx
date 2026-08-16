import Icon from "../components/Icon";

function SkinScan({
  preview,
  analyzing,
  handleImage,
  changeImage,
  startAnalysis,
}) {
  return (
    <section className="portal-content">

      <div className="page-heading">

        <div>

          <div className="eyebrow">
            <Icon>biotech</Icon>
            CLINICAL AI
          </div>

          <h1>
            AI Skin Scan
          </h1>

          <p>
            Upload one clear image for preliminary screening.
          </p>

        </div>

      </div>

      <div className="scan-layout">

        <div className="upload-panel clinical-card">

          <div
            className={`drop-zone ${preview ? "has-image" : ""
              }`}
          >

            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Selected skin"
                />

                <div className="image-overlay">

                  <span>
                    <Icon>check_circle</Icon>
                    Image ready
                  </span>

                  <button
                    className="secondary-btn"
                    onClick={changeImage}
                  >
                    Change image
                  </button>

                </div>
              </>
            ) : (
              <>
                <div className="upload-symbol">
                  <Icon>cloud_upload</Icon>
                </div>

                <h2>
                  Upload skin image
                </h2>

                <p>
                  Use a clear, well-lit image of the affected area.
                </p>

                <label className="primary-btn upload-label">
                  Choose image
                  <Icon>upload</Icon>

                  <input
                    id="dashboard-upload"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImage}
                  />
                </label>

                <small>
                  JPG, JPEG or PNG · Max recommended size 10 MB
                </small>
              </>
            )}

          </div>

        </div>

        <div className="scan-info">

          <div className="info-card">

            <Icon>photo_camera</Icon>

            <div>
              <strong>Image quality</strong>

              <p>
                Keep the area in focus with natural or even lighting.
              </p>
            </div>

          </div>

          <div className="info-card">

            <Icon>visibility</Icon>

            <div>
              <strong>One affected area</strong>

              <p>
                Avoid filters, heavy makeup and obstructed skin.
              </p>
            </div>

          </div>

          <div className="info-card">

            <Icon>lock</Icon>

            <div>
              <strong>Privacy reminder</strong>

              <p>
                Do not include names, documents or other identifying
                information in the image.
              </p>
            </div>

          </div>

          <button
            className="primary-btn wide"
            disabled={!preview || analyzing}
            onClick={startAnalysis}
          >
            {analyzing ? "Analyzing…" : "Analyze image"}

            <Icon>
              arrow_forward
            </Icon>
          </button>

        </div>

      </div>

      <p className="medical-note">

        <Icon>info</Icon>

        DermaSathi provides preliminary AI-based screening and does
        not replace professional medical diagnosis.

      </p>

    </section>
  );
}

export default SkinScan;