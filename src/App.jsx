import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  // Dark / Light Mode
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (name.trim() !== "") {
      setIsLoggedIn(true);
      setShowLogin(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName("");
  };

  /* =========================
     LOGIN PAGE
  ========================= */

  if (showLogin && !isLoggedIn) {
    return (
      <div className={darkMode ? "login-page dark-theme" : "login-page"}>

        <div className="login-card">

          {/* Theme Button */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <h1>
            <span>Derma</span>Sathi
          </h1>

          <h2>Welcome Back</h2>

          <p>Login to access your dashboard</p>

          <form onSubmit={handleLogin}>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Enter your email"
              required
            />

            <input
              type="password"
              placeholder="Enter your password"
              required
            />

            <button
              type="submit"
              className="primary-btn"
            >
              Login
            </button>

          </form>

          <button
            className="back-btn"
            onClick={() => setShowLogin(false)}
          >
            ← Back to Home
          </button>

        </div>
      </div>
    );
  }

  /* =========================
     DASHBOARD
  ========================= */

  if (isLoggedIn) {
    return (
      <div className={darkMode ? "dashboard dark-theme" : "dashboard"}>

        {/* Sidebar */}
        <aside className="sidebar">

          <div className="sidebar-logo">
            <span>Derma</span>Sathi
          </div>

          <div className="sidebar-menu">

            <button>
              🏠 Dashboard
            </button>

            <button>
              👤 My Details
            </button>

            <button>
              📊 Health Tracking
            </button>

            <button>
              ⚙ Settings
            </button>

          </div>

          {/* Sidebar Bottom */}
          <div className="sidebar-bottom">

            <button
              className="theme-toggle sidebar-theme"
              onClick={toggleTheme}
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </div>

        </aside>

        {/* Dashboard Content */}
        <main className="dashboard-content">

          <p className="tagline">
            DERMASATHI DASHBOARD
          </p>

          <h1>
            Welcome, <span>{name}!</span>
          </h1>

          <p className="dashboard-description">
            Welcome to your DermaSathi dashboard. You can analyze
            your skin, track your previous results and manage your
            profile from here.
          </p>

          <div className="dashboard-cards">

            <div className="dashboard-card">

              <div className="feature-icon">
                AI
              </div>

              <h3>
                Analyze Your Skin
              </h3>

              <p>
                Upload a skin image and get an AI-powered
                preliminary analysis.
              </p>

              <button className="primary-btn">
                Start Analysis
              </button>

            </div>

            <div className="dashboard-card">

              <div className="feature-icon">
                ↗
              </div>

              <h3>
                Health Tracking
              </h3>

              <p>
                View your previous skin analysis and track
                changes over time.
              </p>

              <button className="secondary-btn">
                View History
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  /* =========================
     HOME PAGE
  ========================= */

  return (
    <div className={darkMode ? "app dark-theme" : "app"}>

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo">
          <span>Derma</span>Sathi
        </div>

        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#features">
            Features
          </a>

          <a href="#about">
            About
          </a>

          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* Login */}
          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">

        <div className="hero-content">

          <p className="tagline">
            AI-POWERED SKIN ANALYSIS
          </p>

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
              document
                .getElementById("upload")
                .scrollIntoView()
            }
          >
            Analyze Your Skin
          </button>

        </div>

        <div className="hero-card">

          <div className="scan-circle">
            <span>AI</span>
          </div>

          <h3>
            AI Skin Analysis
          </h3>

          <p>
            Fast & easy preliminary screening
          </p>

        </div>

      </section>

      {/* Upload Section */}
      <section
        className="upload-section"
        id="upload"
      >

        <p className="tagline">
          SKIN ANALYSIS
        </p>

        <h2>
          Upload Your Skin Image
        </h2>

        <p className="section-description">
          Upload a clear image of the affected skin area.
        </p>

        <div className="upload-box">

          {preview ? (
            <div className="preview-container">

              <img
                src={preview}
                alt="Skin preview"
              />

              <p>
                {image?.name}
              </p>

              <button className="primary-btn">
                Analyze Image
              </button>

            </div>
          ) : (
            <>
              <div className="upload-icon">
                ↑
              </div>

              <h3>
                Drag & Drop your image here
              </h3>

              <p>
                or
              </p>

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
      <section
        className="features"
        id="features"
      >

        <p className="tagline">
          WHY DermaSathi?
        </p>

        <h2>
          Everything You Need
        </h2>

        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              AI
            </div>

            <h3>
              AI Classification
            </h3>

            <p>
              Analyze images and identify possible skin
              conditions with confidence scores.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              ✦
            </div>

            <h3>
              Smart Recommendations
            </h3>

            <p>
              Get personalized skincare product
              recommendations based on the analysis.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              ↗
            </div>

            <h3>
              Health Tracking
            </h3>

            <p>
              Keep track of your previous predictions and
              compare your skin condition over time.
            </p>

          </div>

        </div>

      </section>

      {/* Disclaimer */}
      <section className="disclaimer">

        <strong>
          Medical Disclaimer
        </strong>

        <p>
          DermaSathi provides preliminary AI-based screening
          and is not a replacement for professional medical
          advice or diagnosis. Please consult a qualified
          dermatologist for medical concerns.
        </p>

      </section>

      {/* Footer */}
      <footer>

        <h3>
          DermaSathi
        </h3>

        <p>
          AI-Powered Skin Care & Disease Detection System
        </p>

        <p>
          © 2026 Team Ephemeral
        </p>

      </footer>

    </div>
  );
}

export default App;