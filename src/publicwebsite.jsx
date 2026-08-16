import { useEffect, useState } from "react";
import Icon from "./components/Icon";
import skin1 from "./assets/skin1.jpg";
import skin2 from "./assets/skin2.jpg";
import skin3 from "./assets/skin3.jpg";
import skin4 from "./assets/skin4.jpg";
const clinicalImages = [
  skin1,
  skin2,
  skin3,
  skin4,
];

const clinicalInfo = [
  {
    title: "AI skin mapping",
    description:
      "Visible skin patterns are organized into an easy-to-read preliminary report.",
  },
  {
    title: "Acne pattern analysis",
    description:
      "AI-assisted visual analysis helps identify visible acne-related skin patterns.",
  },
  {
    title: "Pigmentation assessment",
    description:
      "Visible pigmentation patterns are highlighted to make skin changes easier to understand.",
  },
  {
    title: "Skin texture analysis",
    description:
      "Visible texture characteristics are reviewed to support a clearer clinical conversation.",
  },
];

function PublicWebsite({
  darkMode,
  toggleTheme,
  setAuthMode,
  setShowLogin,
  scrollToSection,
  clinicalImage,
  toast,
}) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        return (prev + 1) % clinicalImages.length;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentInfo = clinicalInfo[currentImage];

  return (
    <div className={`website ${darkMode ? "dark-theme" : ""}`}>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="site-header">

        <div className="site-nav">

          <button
            className="site-logo"
            onClick={() => scrollToSection("technology")}
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
              aria-label="Toggle theme"
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

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main>

        {/* ===================================================
            HERO
        =================================================== */}

        <section
          className="hero-clinical"
          id="technology"
        >

          {/* LEFT CONTENT */}

          <div className="hero-copy">

            <div className="eyebrow">

              <Icon>
                verified
              </Icon>

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

                <Icon>
                  arrow_forward
                </Icon>

              </button>

              <a
                className="secondary-link"
                href="#clinical"
              >

                Explore the approach

                <Icon>
                  expand_more
                </Icon>

              </a>

            </div>

            <div className="hero-trust">

              <span>

                <Icon>
                  verified_user
                </Icon>

                Privacy-aware

              </span>

              <span>

                <Icon>
                  science
                </Icon>

                AI-assisted

              </span>

              <span>

                <Icon>
                  medical_services
                </Icon>

                Not a diagnosis

              </span>

            </div>

          </div>

          {/* =================================================
              HERO IMAGE / CONTINUOUS SLIDER
          ================================================= */}

          <div className="hero-media">

            <img
              key={currentImage}
              src={clinicalImages[currentImage] || clinicalImage}
              alt="Clinical AI dermatology visualization"
            />

            {/* Image overlay */}

            <div className="image-caption">

              <div className="live-dot" />

              <div>

                <strong>
                  {currentInfo.title}
                </strong>

                <small>
                  {currentInfo.description}
                </small>

              </div>

              <span className="confidence-chip">
                ACTIVE
              </span>

            </div>

            {/* Scanning line */}

            <div className="scan-line" />

            {/* Image indicators */}

            <div className="image-indicators">

              {clinicalImages.map((_, index) => (

                <button
                  key={index}
                  className={
                    `image-dot ${currentImage === index
                      ? "active"
                      : ""
                    }`
                  }
                  onClick={() => setCurrentImage(index)}
                  aria-label={`Show clinical image ${index + 1}`}
                />

              ))}

            </div>

          </div>

        </section>

        {/* ===================================================
            CLINICAL APPROACH
        =================================================== */}

        <section
          className="clinical-strip"
          id="clinical"
        >

          <div>

            <span>
              01
            </span>

            <strong>
              Capture
            </strong>

            <p>
              Upload a clear image of the affected area.
            </p>

          </div>

          <div>

            <span>
              02
            </span>

            <strong>
              Analyze
            </strong>

            <p>
              AI evaluates visible visual patterns.
            </p>

          </div>

          <div>

            <span>
              03
            </span>

            <strong>
              Understand
            </strong>

            <p>
              Review a preliminary, structured report.
            </p>

          </div>

          <div>

            <span>
              04
            </span>

            <strong>
              Discuss
            </strong>

            <p>
              Use the result to support a clinical conversation.
            </p>

          </div>

        </section>

        {/* ===================================================
            ABOUT / FEATURES
        =================================================== */}

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

                <Icon>
                  biotech
                </Icon>

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

                <Icon>
                  history
                </Icon>

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

                <Icon>
                  recommend
                </Icon>

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

        {/* ===================================================
            DERMATOLOGY INFORMATION
        =================================================== */}

        <section className="derma-info-section">

          <div className="section-heading">

            <div className="eyebrow">
              SKIN INTELLIGENCE
            </div>

            <h2>
              Understand what your skin may be showing.
            </h2>

            <p>
              DermaSathi focuses on visible patterns to help
              patients prepare for more informed clinical
              conversations.
            </p>

          </div>

          <div className="derma-info-grid">

            <div className="derma-info-card">

              <div className="derma-info-icon">

                <Icon>
                  face
                </Icon>

              </div>

              <h3>
                Acne & Breakouts
              </h3>

              <p>
                Acne can appear as pimples, blackheads,
                whiteheads or inflamed areas. Consistent
                observation can help track visible changes.
              </p>

            </div>

            <div className="derma-info-card">

              <div className="derma-info-icon">

                <Icon>
                  palette
                </Icon>

              </div>

              <h3>
                Pigmentation
              </h3>

              <p>
                Changes in skin tone or darker patches can
                have different causes. Visual tracking can
                make changes easier to notice over time.
              </p>

            </div>

            <div className="derma-info-card">

              <div className="derma-info-icon">

                <Icon>
                  water_drop
                </Icon>

              </div>

              <h3>
                Skin Texture
              </h3>

              <p>
                Dryness, roughness and visible texture changes
                may vary with environment and skincare habits.
              </p>

            </div>

            <div className="derma-info-card">

              <div className="derma-info-icon">

                <Icon>
                  visibility
                </Icon>

              </div>

              <h3>
                Regular Monitoring
              </h3>

              <p>
                Comparing images over time can help identify
                visible changes that may be worth discussing
                with a healthcare professional.
              </p>

            </div>

          </div>

        </section>

        {/* ===================================================
            DISCLAIMER
        =================================================== */}

        <section className="disclaimer-modern">

          <Icon>
            info
          </Icon>

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

      {/* =====================================================
          FOOTER
      ===================================================== */}

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

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

    </div>
  );
}

export default PublicWebsite;