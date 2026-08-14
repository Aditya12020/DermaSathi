import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span>Derma</span>Sathi
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button className="login-btn">Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">

        <div className="hero-content">
          <p className="tagline">AI-POWERED SKIN ANALYSIS</p>

          <h1>
            Understand Your Skin
            <br />
            <span>With AI</span>
          </h1>

          <p className="description">
            Upload a skin image and get an AI-powered preliminary
            analysis with personalized skincare recommendations.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              document.getElementById("upload").scrollIntoView()
            }
          >
            Analyze Your Skin
          </button>
        </div>

        <div className="hero-card">
          <div className="scan-circle">
            <span>AI</span>
          </div>

          <h3>AI Skin Analysis</h3>
          <p>Fast & easy preliminary screening</p>
        </div>

      </section>

      {/* Upload Section */}
      <section className="upload-section" id="upload">

        <p className="tagline">SKIN ANALYSIS</p>

        <h2>Upload Your Skin Image</h2>

        <p className="section-description">
          Upload a clear image of the affected skin area.
        </p>

        <div className="upload-box">

          {preview ? (
            <div className="preview-container">
              <img src={preview} alt="Skin preview" />

              <p>{image?.name}</p>

              <button className="primary-btn">
                Analyze Image
              </button>
            </div>
          ) : (
            <>
              <div className="upload-icon">↑</div>

              <h3>Drag & Drop your image here</h3>

              <p>or</p>

              <label className="upload-btn">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  hidden
                />
              </label>

              <small>
                Supported formats: JPG, JPEG, PNG
              </small>
            </>
          )}

        </div>

      </section>

      {/* Features */}
      <section className="features" id="features">

        <p className="tagline">WHY DERMAI?</p>

        <h2>Everything You Need</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">AI</div>
            <h3>AI Classification</h3>
            <p>
              Analyze images and identify possible skin conditions
              with confidence scores.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✦</div>
            <h3>Smart Recommendations</h3>
            <p>
              Get personalized skincare product recommendations
              based on the analysis.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">↗</div>
            <h3>Health Tracking</h3>
            <p>
              Keep track of your previous predictions and compare
              your skin condition over time.
            </p>
          </div>

        </div>

      </section>

      {/* Disclaimer */}
      <section className="disclaimer">
        <strong>Medical Disclaimer</strong>
        <p>
          DermAI provides preliminary AI-based screening and is not
          a replacement for professional medical advice or diagnosis.
          Please consult a qualified dermatologist for medical concerns.
        </p>
      </section>

      {/* Footer */}
      <footer>
        <h3>DermAI</h3>
        <p>AI-Powered Skin Care & Disease Detection System</p>
        <p>© 2026 Team Ephemeral</p>
      </footer>

    </div>
  );
}

export default App;
