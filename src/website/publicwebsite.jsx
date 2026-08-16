import Icon from "../components/Icon";

function PublicWebsite({
  darkMode,
  toggleTheme,
  setAuthMode,
  setShowLogin,
  scrollToSection,
  clinicalImage,
  toast,
}) {
  return (
    <div
      className={`website ${darkMode ? "dark-theme" : ""
        }`}
    >

      <header className="site-header">

        <div className="site-nav">

          <button
            className="site-logo"
            onClick={() =>
              scrollToSection("technology")
            }
            aria-label="DermaSathi home"
          >

            <div className="brand-mark">
              <Icon>medical_services</Icon>
            </div>

            <strong>
              DermaSathi
            </strong>

          </button>

          <nav>

            <a href="#technology">
              Technology
            </a>

            <a href="#clinical">
              Clinical approach
            </a>

            <a href="#about">
              About
            </a>

          </nav>

          <div className="site-actions">

            <button
              className="theme-btn"
              onClick={toggleTheme}
            >
              {darkMode ? "☀" : "☾"}
            </button>

            <button
              className="login-outline"
              onClick={() => {
                setAuthMode("login");
                setShowLogin(true);
              }}
            >
              Patient Login
            </button>

            <button
              className="signup-nav-btn"
              onClick={() => {
                setAuthMode("signup");
                setShowLogin(true);
              }}
            >
              Sign Up
            </button>

          </div>

        </div>

      </header>

      <main>

        <section
          className="hero-clinical"
          id="technology"
        >

          <div className="hero-copy">

            <div className="eyebrow">
              <Icon>verified</Icon>
              CLINICAL-GRADE AI · PATIENT-FIRST
            </div>

            <h1>
              Every scan should bring you{" "}
              <span>
                closer to clarity.
              </span>
            </h1>

            <p>
              DermaSathi uses AI-assisted visual analysis to help
              you understand visible skin concerns before your
              next clinical conversation.
            </p>

            <div className="hero-actions">

              <button
                className="primary-btn"
                onClick={() => {
                  setAuthMode("login");
                  setShowLogin(true);
                }}
              >
                Start a skin scan
                <Icon>arrow_forward</Icon>
              </button>

              <a
                className="secondary-link"
                href="#clinical"
              >
                Explore the approach
                <Icon>expand_more</Icon>
              </a>

            </div>

            <div className="hero-trust">

              <span>
                <Icon>verified_user</Icon>
                Privacy-aware
              </span>

              <span>
                <Icon>science</Icon>
                AI-assisted
              </span>

              <span>
                <Icon>medical_services</Icon>
                Not a diagnosis
              </span>

            </div>

          </div>

          <div className="hero-media">

            <img
              src={clinicalImage}
              alt="Clinical AI dermatology visualization"
            />

            <div className="image-caption">

              <div className="live-dot" />

              <div>
                <strong>
                  AI skin mapping
                </strong>

                <small>
                  Visual patterns translated into an easy-to-read
                  preliminary report.
                </small>
              </div>

              <span className="confidence-chip">
                ACTIVE
              </span>

            </div>

            <div className="scan-line" />

          </div>

        </section>

        <section
          className="clinical-strip"
          id="clinical"
        >

          <div>
            <span>01</span>
            <strong>Capture</strong>
            <p>
              Upload a clear image of the affected area.
            </p>
          </div>

          <div>
            <span>02</span>
            <strong>Analyze</strong>
            <p>
              AI evaluates visible visual patterns.
            </p>
          </div>

          <div>
            <span>03</span>
            <strong>Understand</strong>
            <p>
              Review a preliminary, structured report.
            </p>
          </div>

          <div>
            <span>04</span>
            <strong>Discuss</strong>
            <p>
              Use the result to support a clinical conversation.
            </p>
          </div>

        </section>

        <section
          className="feature-section"
          id="about"
        >

          <div className="section-heading">

            <div className="eyebrow">
              BUILT FOR CLARITY
            </div>

            <h2>
              A calmer way to understand skin concerns.
            </h2>

            <p>
              Designed around the clinical workflow rather than
              generic AI dashboards.
            </p>

          </div>

          <div className="feature-grid-modern">

            <div className="modern-card">

              <div className="card-icon">
                <Icon>biotech</Icon>
              </div>

              <h3>
                Visual AI screening
              </h3>

              <p>
                Structured analysis of visible patterns with
                confidence indicators.
              </p>

            </div>

            <div className="modern-card">

              <div className="card-icon">
                <Icon>history</Icon>
              </div>

              <h3>
                Longitudinal tracking
              </h3>

              <p>
                Keep previous results together so changes are
                easier to notice.
              </p>

            </div>

            <div className="modern-card">

              <div className="card-icon">
                <Icon>recommend</Icon>
              </div>

              <h3>
                Actionable guidance
              </h3>

              <p>
                Clear next steps that encourage safe, informed
                clinical follow-up.
              </p>

            </div>

          </div>

        </section>

        <section className="disclaimer-modern">

          <Icon>info</Icon>

          <div>

            <strong>
              Medical disclaimer
            </strong>

            <p>
              DermaSathi is a preliminary AI screening experience.
              It is not a substitute for professional medical advice,
              diagnosis or treatment.
            </p>

          </div>

        </section>

      </main>

      <footer className="site-footer">

        <div>

          <strong>
            DermaSathi
          </strong>

          <p>
            Clinical AI · Patient-first skin intelligence
          </p>

        </div>

        <span>
          © 2026 Team Ephemeral
        </span>

      </footer>

      {toast && <div className="toast">{toast}</div>}

    </div>
  );
}

export default PublicWebsite;