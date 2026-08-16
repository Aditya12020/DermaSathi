import Icon from "../components/Icon";

function Resources({
  guides,
  selectedGuide,
  setSelectedGuide,
}) {
  return (
    <section className="portal-content">

      <div className="page-heading">

        <div>

          <div className="eyebrow">
            <Icon>menu_book</Icon>
            PATIENT EDUCATION
          </div>

          <h1>
            Skin health resources
          </h1>

          <p>
            Simple guidance to help you understand your skin.
          </p>

        </div>

      </div>

      <div className="resource-grid">

        {Object.entries(guides).map(
          ([title, text], index) => {

            const icons = [
              "health_and_safety",
              "photo_camera",
              "water_drop",
            ];

            return (
              <div
                className="resource-card clinical-card"
                key={title}
              >

                <div className="resource-icon">
                  <Icon>
                    {icons[index]}
                  </Icon>
                </div>

                <h3>
                  {title}
                </h3>

                <p>
                  {text}
                </p>

                <button
                  className="text-btn"
                  onClick={() =>
                    setSelectedGuide({
                      title,
                      text,
                    })
                  }
                >
                  Read guide

                  <Icon>
                    arrow_forward
                  </Icon>
                </button>

              </div>
            );
          }
        )}

      </div>

      {selectedGuide && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setSelectedGuide(null)
          }
        >

          <div
            className="guide-modal clinical-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedGuide(null)
              }
              aria-label="Close guide"
            >
              <Icon>close</Icon>
            </button>

            <div className="eyebrow">
              <Icon>menu_book</Icon>
              PATIENT GUIDE
            </div>

            <h2>
              {selectedGuide.title}
            </h2>

            <p>
              {selectedGuide.text}
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                setSelectedGuide(null)
              }
            >
              Done
            </button>

          </div>

        </div>
      )}

    </section>
  );
}

export default Resources;