import Icon from "../components/Icon";

function PortalHeader({
  page,
  name,
  darkMode,
  sidebarOpen,
  setSidebarOpen,
  showNotifications,
  setShowNotifications,
  showSettings,
  setShowSettings,
  toggleTheme,
  logout,
  setPage,
}) {
  return (
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
          onClick={() => setPage("dashboard")}
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
  );
}

export default PortalHeader;