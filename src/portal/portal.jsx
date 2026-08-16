import Sidebar from "./Sidebar";
import PortalHeader from "./PortalHeader";
import Dashboard from "./Dashboard";
import SkinScan from "./SkinScan";
import Report from "./Report";
import Resources from "./Resources";

function Portal({
  darkMode,
  toggleTheme,
  sidebarOpen,
  setSidebarOpen,

  page,
  setPage,

  nav,

  name,

  showNotifications,
  setShowNotifications,

  showSettings,
  setShowSettings,

  logout,
  newScan,

  lastAnalysis,
  analysisCount,

  skinType,
  skinConcern,
  age,

  preview,
  analyzing,
  handleImage,
  changeImage,
  startAnalysis,

  guides,
  selectedGuide,
  setSelectedGuide,

  toast,
}) {
  return (
    <div
      className={`portal ${
        darkMode ? "dark-theme" : ""
      }`}
    >

      {sidebarOpen && (
        <Sidebar
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          newScan={newScan}
          nav={nav}
          page={page}
          setPage={setPage}
          logout={logout}
        />
      )}

      <main
        className={`portal-main ${
          sidebarOpen ? "" : "expanded"
        }`}
      >

        <PortalHeader
          page={page}
          name={name}
          darkMode={darkMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          toggleTheme={toggleTheme}
          logout={logout}
          setPage={setPage}
        />

        {page === "dashboard" && (
          <Dashboard
            name={name}
            newScan={newScan}
            lastAnalysis={lastAnalysis}
            analysisCount={analysisCount}
            skinType={skinType}
            skinConcern={skinConcern}
            age={age}
            setPage={setPage}
          />
        )}

        {page === "scan" && (
          <SkinScan
            preview={preview}
            analyzing={analyzing}
            handleImage={handleImage}
            changeImage={changeImage}
            startAnalysis={startAnalysis}
          />
        )}

        {page === "report" && (
          <Report
            preview={preview}
            lastAnalysis={lastAnalysis}
            newScan={newScan}
          />
        )}

        {page === "resources" && (
          <Resources
            guides={guides}
            selectedGuide={selectedGuide}
            setSelectedGuide={setSelectedGuide}
          />
        )}

      </main>

      {toast && <div className="toast">{toast}</div>}

    </div>
  );
}

export default Portal;