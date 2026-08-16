import Icon from "../components/Icon";

function Onboarding({
  darkMode,
  toggleTheme,
  name,
  skinConcern,
  setSkinConcern,
  skinType,
  setSkinType,
  age,
  setAge,
  saveProfile,
  setShowGetStarted,
  notify,
  toast,
}) {
  return (
    <div
      className={`onboarding-page ${darkMode ? "dark-theme" : ""
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

export default Onboarding;