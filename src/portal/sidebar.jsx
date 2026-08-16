import Icon from "../components/Icon";

function Sidebar({
  darkMode,
  toggleTheme,
  newScan,
  nav,
  page,
  setPage,
  logout,
}) {
  return (
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
            className={page === key ? "active" : ""}
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
            {darkMode ? "light_mode" : "dark_mode"}
          </Icon>

          {darkMode ? "Light mode" : "Dark mode"}
        </button>

        <button onClick={logout}>
          <Icon>logout</Icon>
          Sign out
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;