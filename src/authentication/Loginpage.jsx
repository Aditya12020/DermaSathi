import Icon from "../components/Icon";

function LoginPage({
  darkMode,
  toggleTheme,
  authMode,
  setAuthMode,
  name,
  setName,
  authEmail,
  setAuthEmail,
  authPassword,
  setAuthPassword,
  confirmPassword,
  setConfirmPassword,
  handleLogin,
  handleSignup,
  goHome,
  toast,
}) {
  return (
    <div className={`login-page ${darkMode ? "dark-theme" : ""}`}>
      <div className="clinical-grid" />

      <button className="floating-theme" onClick={toggleTheme}>
        {darkMode ? "☀ Light" : "☾ Dark"}
      </button>

      <div className="login-layout">

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

export default LoginPage;