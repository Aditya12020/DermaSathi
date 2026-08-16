import { useEffect, useState } from "react";
import "./App.css";

const clinicalImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAJn7_qWXWuEZQywU7t8Bx0wmFcqdplsenjoc6HXppfkac0sn0zd3rHWhW7CkZn_EU5i2VZpfRGszM_mDGoFq3vkkxdllamDdPC8Ei0falg2UDCP6OjSP5EeH1MUNwkCDPG-QC_UzRQ5J6YQ2d9QBhJ6E3vnUHW64sn1CzT3R5DmvJIbbn65XjS9QQMA_NKnCqFi29RJAJXN8SaHfGhxniekkNbWN3DXsKnWajOhtPizeacpxLBuJC6";

function Icon({ children }) {
  return <span className="material-icon">{children}</span>;
}

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* login signup */

  const [showLogin, setShowLogin] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [name, setName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [skinConcern, setSkinConcern] = useState("");
  const [skinType, setSkinType] = useState("");
  const [age, setAge] = useState("");
  const [page, setPage] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);


  const [analyzing, setAnalyzing] = useState(false);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [lastAnalysis, setLastAnalysis] = useState(null);
  const [toast, setToast] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);

  /*to load saved session */

  useEffect(() => {
    const savedSession = localStorage.getItem("dermasathi_session");

    if (savedSession) {
      try {
        const user = JSON.parse(savedSession);

        setIsLoggedIn(true);
        setName(user.name || "");
        setAuthEmail(user.email || "");

        setSkinConcern(user.skinConcern || "");
        setSkinType(user.skinType || "");
        setAge(user.age || "");

        /*
          Existing logged-in user directly dashboard par jayega.
          Onboarding dobara nahi dikhega.
        */
        setShowLogin(false);
        setShowGetStarted(false);
      } catch (error) {
        localStorage.removeItem("dermasathi_session");
      }
    }

    const savedTheme = localStorage.getItem("dermasathi_theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);


  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const notify = (message) => {
    setToast(message);
  };


  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;

      localStorage.setItem(
        "dermasathi_theme",
        next ? "dark" : "light"
      );

      return next;
    });
  };

  /* IMAGE HANDLING */

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify("Please select an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      notify("Image is larger than 10 MB.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));

    notify("Image uploaded successfully.");
  };

  const changeImage = () => {
    document.getElementById("dashboard-upload")?.click();
  };


  const startAnalysis = () => {
    if (!preview) {
      notify("Please upload an image first.");
      setPage("scan");
      return;
    }

    setAnalyzing(true);
    setPage("scan");

    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisCount((count) => count + 1);
      setLastAnalysis(new Date());
      setPage("report");

      notify("Analysis completed.");
    }, 2200);
  };

  const newScan = () => {
    setPage("scan");
    setAnalyzing(false);
  };


  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem("dermasathi_users")) || [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem(
      "dermasathi_users",
      JSON.stringify(users)
    );
  };

  const saveSession = (user) => {
    localStorage.setItem(
      "dermasathi_session",
      JSON.stringify(user)
    );
  };

  /*LOGIN */

  const handleLogin = (e) => {
    e.preventDefault();

    const email = authEmail.trim().toLowerCase();
    const password = authPassword;

    if (!email || !password) {
      notify("Please enter email and password.");
      return;
    }

    const users = getUsers();

    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === email &&
        user.password === password
    );

    if (!existingUser) {
      notify("Invalid email or password.");
      return;
    }

    /*
      Existing user:
      Direct dashboard.
      Profile details dobara nahi maange jayenge.
    */

    setIsLoggedIn(true);
    setShowLogin(false);
    setShowGetStarted(false);

    setName(existingUser.name);
    setAuthEmail(existingUser.email);

    setSkinConcern(existingUser.skinConcern || "");
    setSkinType(existingUser.skinType || "");
    setAge(existingUser.age || "");

    setPage("dashboard");
    setSidebarOpen(true);

    saveSession(existingUser);

    setAuthPassword("");
    setConfirmPassword("");

    notify(`Welcome back, ${existingUser.name}!`);
  };

  /*SIGNUP */

  const handleSignup = (e) => {
    e.preventDefault();

    const fullName = name.trim();
    const email = authEmail.trim().toLowerCase();
    const password = authPassword;

    if (!fullName) {
      notify("Please enter your full name.");
      return;
    }

    if (!email) {
      notify("Please enter your email.");
      return;
    }

    if (password.length < 6) {
      notify("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      notify("Passwords do not match.");
      return;
    }

    const users = getUsers();

    const userExists = users.some(
      (user) => user.email.toLowerCase() === email
    );

    if (userExists) {
      notify("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: fullName,
      email,
      password,
      skinConcern: "",
      skinType: "",
      age: "",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    saveUsers(users);
    saveSession(newUser);

    setIsLoggedIn(true);
    setShowLogin(false);

    /*
      Signup ke baad first time profile details.
    */
    setShowGetStarted(true);

    setPage("dashboard");

    setAuthPassword("");
    setConfirmPassword("");

    notify("Account created successfully.");
  };

  /*LOGOUT*/

  const logout = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    /*
      Sirf session remove hoga.
      Account localStorage mein safe rahega.
    */

    localStorage.removeItem("dermasathi_session");

    setIsLoggedIn(false);
    setShowLogin(false);
    setShowGetStarted(false);

    setName("");
    setAuthEmail("");
    setAuthPassword("");
    setConfirmPassword("");

    setImage(null);
    setPreview(null);

    setSkinConcern("");
    setSkinType("");
    setAge("");

    setPage("dashboard");
    setAnalysisCount(0);
    setLastAnalysis(null);

    setShowNotifications(false);
    setShowSettings(false);

    notify("Signed out successfully.");
  };

  /* =========================
     BACK TO HOME
  ========================== */

  const goHome = () => {
    setShowLogin(false);
    setAuthMode("login");

    setAuthEmail("");
    setAuthPassword("");
    setConfirmPassword("");
  };

  /* to save entered profile details*/

  const saveProfile = () => {
    const session = localStorage.getItem("dermasathi_session");

    if (!session) {
      setShowGetStarted(false);
      return;
    }

    try {
      const currentUser = JSON.parse(session);

      const updatedUser = {
        ...currentUser,
        name,
        skinConcern,
        skinType,
        age,
      };

      const users = getUsers();

      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );

      saveUsers(updatedUsers);
      saveSession(updatedUser);

      setShowGetStarted(false);

      notify("Profile details saved.");
    } catch {
      setShowGetStarted(false);
    }
  };

  /*navigation ke liye */

  const scrollToSection = (id) => {
    setShowLogin(false);

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const nav = [
    ["dashboard", "Dashboard", "dashboard"],
    ["scan", "AI Skin Scan", "biotech"],
    ["report", "Reports", "description"],
    ["resources", "Resources", "menu_book"],
  ];

  const guides = {
    "When to see a dermatologist":
      "Persistent, painful, rapidly changing, bleeding or worsening skin concerns should be evaluated by a qualified dermatologist.",

    "How to take better skin photos":
      "Use even natural lighting, keep the camera steady, avoid filters and photograph only the affected area.",

    "Daily skin basics":
      "Keep your routine simple: gentle cleansing, appropriate moisturization and daily sun protection are good general starting points.",
  };

  /*LOGIN / SIGNUP PAGE*/

  if (showLogin && !isLoggedIn) {
    return (
      <div className={`login-page ${darkMode ? "dark-theme" : ""}`}>
        <div className="clinical-grid" />

        <button className="floating-theme" onClick={toggleTheme}>
          {darkMode ? "☀ Light" : "☾ Dark"}
        </button>

        <div className="login-layout">

          {/* LEFT SIDE */}

          <div className="login-visual">

            <div className="eyebrow">
              <Icon>verified</Icon>
              CLINICAL AI PLATFORM
            </div>

            <h1>
              Intelligent skin analysis, designed around{" "}
              <span>clinical clarity.</span>
            </h1>

            <p>
              DermaSathi combines visual AI with a patient-first
              interface to make preliminary skin screening easier
              to understand.
            </p>

            <div className="trust-row">

              <div>
                <Icon>shield</Icon>
                <span>Privacy focused</span>
              </div>

              <div>
                <Icon>biotech</Icon>
                <span>AI-assisted</span>
              </div>

              <div>
                <Icon>health_and_safety</Icon>
                <span>Patient first</span>
              </div>

            </div>
          </div>

          {/* AUTH CARD */}

          <div className="login-card clinical-card">

            <div className="brand-lockup">

              <div className="brand-mark">
                <Icon>medical_services</Icon>
              </div>

              <div>
                <strong>DermaSathi</strong>
                <small>Patient Portal</small>
              </div>

            </div>

            {/* AUTH TABS */}

            <div className="auth-tabs">

              <button
                type="button"
                className={
                  authMode === "login"
                    ? "auth-tab active"
                    : "auth-tab"
                }
                onClick={() => {
                  setAuthMode("login");
                  setAuthPassword("");
                  setConfirmPassword("");
                }}
              >
                Login
              </button>

              <button
                type="button"
                className={
                  authMode === "signup"
                    ? "auth-tab active"
                    : "auth-tab"
                }
                onClick={() => {
                  setAuthMode("signup");
                  setAuthPassword("");
                  setConfirmPassword("");
                }}
              >
                Sign Up
              </button>

            </div>

            {/* LOGIN */}

            {authMode === "login" ? (
              <>
                <h2>Welcome back</h2>

                <p className="muted">
                  Sign in to continue to your clinical workspace.
                </p>

                <form onSubmit={handleLogin}>

                  <label>
                    Email

                    <input
                      type="email"
                      value={authEmail}
                      onChange={(e) =>
                        setAuthEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />

                  </label>

                  <label>
                    Password

                    <input
                      type="password"
                      value={authPassword}
                      onChange={(e) =>
                        setAuthPassword(e.target.value)
                      }
                      placeholder="••••••••"
                      autoComplete="current-password"
                      required
                    />

                  </label>

                  <button
                    className="primary-btn wide auth-submit"
                    type="submit"
                  >
                    Login
                    <Icon>arrow_forward</Icon>
                  </button>

                </form>

                <p className="auth-switch">
                  Don't have an account?

                  <button
                    type="button"
                    onClick={() => setAuthMode("signup")}
                  >
                    Create account
                  </button>
                </p>
              </>
            ) : (
              /* SIGNUP */

              <>
                <h2>Create your account</h2>

                <p className="muted">
                  Create an account to save your skin analysis
                  history and profile.
                </p>

                <form onSubmit={handleSignup}>

                  <label>
                    Full name

                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                    />

                  </label>

                  <label>
                    Email

                    <input
                      type="email"
                      value={authEmail}
                      onChange={(e) =>
                        setAuthEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />

                  </label>

                  <label>
                    Password

                    <input
                      type="password"
                      value={authPassword}
                      onChange={(e) =>
                        setAuthPassword(e.target.value)
                      }
                      placeholder="Minimum 6 characters"
                      autoComplete="new-password"
                      minLength={6}
                      required
                    />

                  </label>

                  <label>
                    Confirm password

                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      required
                    />

                  </label>

                  <button
                    className="primary-btn wide auth-submit"
                    type="submit"
                  >
                    Create account
                    <Icon>arrow_forward</Icon>
                  </button>

                </form>

                <p className="auth-switch">
                  Already have an account?

                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                  >
                    Login
                  </button>
                </p>
              </>
            )}

            <button
              className="text-btn back-home-btn"
              onClick={goHome}
            >
              ← Back to website
            </button>

            <small className="medical-note">
              Preliminary screening only. Not a medical diagnosis.
            </small>

          </div>
        </div>

        {toast && <div className="toast">{toast}</div>}
      </div>
    );
  }

  

  if (isLoggedIn && showGetStarted) {
    return (
      <div
        className={`onboarding-page ${
          darkMode ? "dark-theme" : ""
        }`}
      >
        <div className="clinical-grid" />

        <button
          className="floating-theme"
          onClick={toggleTheme}
        >
          {darkMode ? "☀ Light" : "☾ Dark"}
        </button>

        <div className="onboarding-card clinical-card">

          <div className="brand-mark large">
            <Icon>medical_services</Icon>
          </div>

          <div className="eyebrow centered">
            PERSONALIZED PATIENT PROFILE
          </div>

          <h1>
            Welcome, <span>{name}</span>
          </h1>

          <p className="muted">
            A few details help us personalize your DermaSathi
            experience.
          </p>

          <div className="form-grid">

            <label>
              Main skin concern

              <select
                value={skinConcern}
                onChange={(e) =>
                  setSkinConcern(e.target.value)
                }
              >
                <option value="">
                  Select your concern
                </option>
                <option>Acne / Pimples</option>
                <option>Pigmentation / Dark Spots</option>
                <option>Dryness</option>
                <option>Rash / Irritation</option>
                <option>Redness</option>
                <option>Other</option>
                <option>No specific concern</option>
              </select>
            </label>

            <label>
              Skin type

              <select
                value={skinType}
                onChange={(e) =>
                  setSkinType(e.target.value)
                }
              >
                <option value="">
                  Select your skin type
                </option>
                <option>Oily</option>
                <option>Dry</option>
                <option>Combination</option>
                <option>Normal</option>
                <option>Sensitive</option>
                <option>I don't know</option>
              </select>
            </label>

            <label>
              Age group

              <select
                value={age}
                onChange={(e) =>
                  setAge(e.target.value)
                }
              >
                <option value="">
                  Select your age group
                </option>
                <option>Under 18</option>
                <option>18 – 25</option>
                <option>26 – 35</option>
                <option>36 – 45</option>
                <option>46 – 60</option>
                <option>60+</option>
              </select>
            </label>

          </div>

          <div className="onboarding-actions">

            <button
              className="text-btn"
              onClick={() => {
                setShowGetStarted(false);

                notify(
                  "You can complete your profile later."
                );
              }}
            >
              Skip for now
            </button>

            <button
              className="primary-btn"
              onClick={saveProfile}
            >
              Save & Open Portal
              <Icon>arrow_forward</Icon>
            </button>

          </div>
        </div>

        {toast && <div className="toast">{toast}</div>}
      </div>
    );
  }

  /*PATIENT PORtal */

  if (isLoggedIn) {
    return (
      <div
        className={`portal ${
          darkMode ? "dark-theme" : ""
        }`}
      >

        {sidebarOpen && (
          <aside className="portal-sidebar">

            <div className="portal-brand">

              <div className="brand-mark">
                <Icon>medical_services</Icon>
              </div>

              <div>
                <strong>DermaSathi</strong>
                <small>Patient Portal</small>
              </div>

            </div>

            <div className="portal-label">
              CLINICAL AI ANALYSIS
            </div>

            <button
              className="new-scan-btn"
              onClick={newScan}
            >
              <Icon>add</Icon>
              Start New Scan
            </button>

            <nav className="side-nav">

              {nav.map(([key, label, icon]) => (
                <button
                  key={key}
                  className={
                    page === key ? "active" : ""
                  }
                  onClick={() => setPage(key)}
                >
                  <Icon>{icon}</Icon>
                  {label}
                </button>
              ))}

            </nav>

            <div className="side-bottom">

              <button onClick={toggleTheme}>
                <Icon>
                  {darkMode
                    ? "light_mode"
                    : "dark_mode"}
                </Icon>

                {darkMode
                  ? "Light mode"
                  : "Dark mode"}
              </button>

              <button onClick={logout}>
                <Icon>logout</Icon>
                Sign out
              </button>

            </div>

          </aside>
        )}

        <main
          className={`portal-main ${
            sidebarOpen ? "" : "expanded"
          }`}
        >

          <header className="portal-header">

            <button
              className="mobile-menu"
              onClick={() =>
                setSidebarOpen(!sidebarOpen)
              }
              aria-label="Toggle sidebar"
            >
              <Icon>menu</Icon>
            </button>

            <div>
              <strong>
                {page === "dashboard"
                  ? "Patient Dashboard"
                  : page === "scan"
                    ? "AI Skin Scan"
                    : page === "report"
                      ? "Clinical Report"
                      : "Resources"}
              </strong>

              <small>
                Secure clinical workspace
              </small>
            </div>

            <div className="header-actions">

              <button
                onClick={() => {
                  setShowNotifications((v) => !v);
                  setShowSettings(false);
                }}
                aria-label="Notifications"
              >
                <Icon>notifications</Icon>
              </button>

              <button
                onClick={() => {
                  setShowSettings((v) => !v);
                  setShowNotifications(false);
                }}
                aria-label="Settings"
              >
                <Icon>settings</Icon>
              </button>

              <div
                className="avatar"
                title={name}
                onClick={() =>
                  setPage("dashboard")
                }
              >
                {name.charAt(0).toUpperCase()}
              </div>

              {showNotifications && (
                <div className="header-popover">
                  <strong>Notifications</strong>
                  <p>No new notifications.</p>
                </div>
              )}

              {showSettings && (
                <div className="header-popover">
                  <strong>Quick settings</strong>

                  <button onClick={toggleTheme}>
                    {darkMode
                      ? "Switch to light mode"
                      : "Switch to dark mode"}
                  </button>

                  <button onClick={logout}>
                    Sign out
                  </button>
                </div>
              )}

            </div>

          </header>

          {/* DASHBOARD */}

          {page === "dashboard" && (
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
                    Here is your latest skin analysis
                    overview.
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
                  <strong>
                    Your profile is ready
                  </strong>

                  <p>
                    Complete your first skin scan to
                    start building your personal
                    history.
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
                      ? lastAnalysis.toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
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
                    {skinType ||
                    skinConcern ||
                    age
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
                      Understand your skin with a
                      clearer clinical picture.
                    </h2>

                    <p>
                      Upload a clear image of the
                      affected area and receive a
                      preliminary AI-assisted
                      assessment.
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
                        Your completed scans will
                        appear here.
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
                          onClick={() =>
                            setPage("report")
                          }
                        >
                          View report
                          <Icon>
                            arrow_forward
                          </Icon>
                        </button>

                      </div>

                    </div>
                  )}

                </div>

              </div>

            </section>
          )}

          {/* SCAN */}

          {page === "scan" && (
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
                    Upload one clear image for
                    preliminary screening.
                  </p>

                </div>

              </div>

              <div className="scan-layout">

                <div className="upload-panel clinical-card">

                  <div
                    className={`drop-zone ${
                      preview ? "has-image" : ""
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
                            <Icon>
                              check_circle
                            </Icon>
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
                          <Icon>
                            cloud_upload
                          </Icon>
                        </div>

                        <h2>
                          Upload skin image
                        </h2>

                        <p>
                          Use a clear, well-lit image
                          of the affected area.
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
                          JPG, JPEG or PNG · Max
                          recommended size 10 MB
                        </small>
                      </>
                    )}

                  </div>

                </div>

                <div className="scan-info">

                  <div className="info-card">

                    <Icon>photo_camera</Icon>

                    <div>

                      <strong>
                        Image quality
                      </strong>

                      <p>
                        Keep the area in focus with
                        natural or even lighting.
                      </p>

                    </div>

                  </div>

                  <div className="info-card">

                    <Icon>visibility</Icon>

                    <div>

                      <strong>
                        One affected area
                      </strong>

                      <p>
                        Avoid filters, heavy makeup
                        and obstructed skin.
                      </p>

                    </div>

                  </div>

                  <div className="info-card">

                    <Icon>lock</Icon>

                    <div>

                      <strong>
                        Privacy reminder
                      </strong>

                      <p>
                        Do not include names,
                        documents or other identifying
                        information in the image.
                      </p>

                    </div>

                  </div>

                  <button
                    className="primary-btn wide"
                    disabled={!preview || analyzing}
                    onClick={startAnalysis}
                  >
                    {analyzing
                      ? "Analyzing…"
                      : "Analyze image"}

                    <Icon>
                      arrow_forward
                    </Icon>
                  </button>

                </div>

              </div>

              <p className="medical-note">

                <Icon>info</Icon>

                DermaSathi provides preliminary
                AI-based screening and does not
                replace professional medical diagnosis.

              </p>

            </section>
          )}

          {/* REPORT */}

          {page === "report" && (
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
                    Preliminary AI-assisted findings
                    based on the uploaded image.
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
                      This is a preliminary
                      screening result, not a
                      diagnosis.
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
                    The visual pattern may be
                    consistent with acne-related
                    inflammation. Clinical
                    examination is required to
                    confirm the cause.
                  </p>

                </div>

                <div className="report-box">

                  <h3>
                    Recommended next steps
                  </h3>

                  <ul>
                    <li>
                      Keep the area clean and avoid
                      picking or squeezing.
                    </li>

                    <li>
                      Track changes with consistent
                      photographs.
                    </li>

                    <li>
                      Consult a qualified
                      dermatologist if symptoms
                      persist or worsen.
                    </li>
                  </ul>

                </div>

              </div>

            </section>
          )}

          {/* RESOURCES */}

          {page === "resources" && (
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
                    Simple guidance to help you
                    understand your skin.
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
          )}

        </main>

        {toast && <div className="toast">{toast}</div>}

      </div>
    );
  }

  /* =========================================================
     PUBLIC WEBSITE
  ========================================================== */

  return (
    <div
      className={`website ${
        darkMode ? "dark-theme" : ""
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
              DermaSathi uses AI-assisted visual
              analysis to help you understand
              visible skin concerns before your
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
                  Visual patterns translated into
                  an easy-to-read preliminary report.
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
              Upload a clear image of the
              affected area.
            </p>
          </div>

          <div>
            <span>02</span>
            <strong>Analyze</strong>
            <p>
              AI evaluates visible visual
              patterns.
            </p>
          </div>

          <div>
            <span>03</span>
            <strong>Understand</strong>
            <p>
              Review a preliminary, structured
              report.
            </p>
          </div>

          <div>
            <span>04</span>
            <strong>Discuss</strong>
            <p>
              Use the result to support a
              clinical conversation.
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
              A calmer way to understand skin
              concerns.
            </h2>

            <p>
              Designed around the clinical
              workflow rather than generic AI
              dashboards.
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
                Structured analysis of visible
                patterns with confidence
                indicators.
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
                Keep previous results together
                so changes are easier to notice.
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
                Clear next steps that encourage
                safe, informed clinical follow-up.
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
              DermaSathi is a preliminary AI
              screening experience. It is not a
              substitute for professional medical
              advice, diagnosis or treatment.
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
            Clinical AI · Patient-first skin
            intelligence
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

export default App;