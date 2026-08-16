import { useEffect, useState } from "react";
import "./App.css";

import LoginPage from "./authentication/LoginPage";
import Onboarding from "./authentication/Onboarding";
import Portal from "./portal/Portal";
import PublicWebsite from "./website/PublicWebsite";

const clinicalImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAJn7_qWXWuEZQywU7t8Bx0wmFcqdplsenjoc6HXppfkac0sn0zd3rHWhW7CkZn_EU5i2VZpfRGszM_mDGoFq3vkkxdllamDdPC8Ei0falg2UDCP6OjSP5EeH1MUNwkCDPG-QC_UzRQ5J6YQ2d9QBhJ6E3vnUHW64sn1CzT3R5DmvJIbbn65XjS9QQMA_NKnCqFi29RJAJXN8SaHfGhxniekkNbWN3DXsKnWajOhtPizeacpxLBuJC6";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* AUTH */

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

  /* PORTAL */

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

  /* LOAD SESSION */

  useEffect(() => {
    const savedSession =
      localStorage.getItem("dermasathi_session");

    if (savedSession) {
      try {
        const user = JSON.parse(savedSession);

        setIsLoggedIn(true);

        setName(user.name || "");
        setAuthEmail(user.email || "");

        setSkinConcern(user.skinConcern || "");
        setSkinType(user.skinType || "");
        setAge(user.age || "");

        setShowLogin(false);
        setShowGetStarted(false);
      } catch (error) {
        localStorage.removeItem("dermasathi_session");
      }
    }

    const savedTheme =
      localStorage.getItem("dermasathi_theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  /* TOAST */

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

  /* THEME */

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

  /* IMAGE */

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
    document
      .getElementById("dashboard-upload")
      ?.click();
  };

  /* ANALYSIS */

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

  /* LOCAL STORAGE */

  const getUsers = () => {
    try {
      return (
        JSON.parse(
          localStorage.getItem("dermasathi_users")
        ) || []
      );
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

  /* LOGIN */

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

    notify(
      `Welcome back, ${existingUser.name}!`
    );
  };

  /* SIGNUP */

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
      notify(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      notify("Passwords do not match.");
      return;
    }

    const users = getUsers();

    const userExists = users.some(
      (user) =>
        user.email.toLowerCase() === email
    );

    if (userExists) {
      notify(
        "An account with this email already exists."
      );
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
    setShowGetStarted(true);

    setPage("dashboard");

    setAuthPassword("");
    setConfirmPassword("");

    notify("Account created successfully.");
  };

  /* LOGOUT */

  const logout = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    localStorage.removeItem(
      "dermasathi_session"
    );

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

  /* HOME */

  const goHome = () => {
    setShowLogin(false);
    setAuthMode("login");

    setAuthEmail("");
    setAuthPassword("");
    setConfirmPassword("");
  };

  /* PROFILE */

  const saveProfile = () => {
    const session =
      localStorage.getItem(
        "dermasathi_session"
      );

    if (!session) {
      setShowGetStarted(false);
      return;
    }

    try {
      const currentUser =
        JSON.parse(session);

      const updatedUser = {
        ...currentUser,
        name,
        skinConcern,
        skinType,
        age,
      };

      const users = getUsers();

      const updatedUsers = users.map(
        (user) =>
          user.id === updatedUser.id
            ? updatedUser
            : user
      );

      saveUsers(updatedUsers);
      saveSession(updatedUser);

      setShowGetStarted(false);

      notify("Profile details saved.");
    } catch {
      setShowGetStarted(false);
    }
  };

  /* NAVIGATION */

  const scrollToSection = (id) => {
    setShowLogin(false);

    setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({
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

  /* LOGIN / SIGNUP */

  if (showLogin && !isLoggedIn) {
    return (
      <LoginPage
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        authMode={authMode}
        setAuthMode={setAuthMode}
        name={name}
        setName={setName}
        authEmail={authEmail}
        setAuthEmail={setAuthEmail}
        authPassword={authPassword}
        setAuthPassword={setAuthPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        goHome={goHome}
        toast={toast}
      />
    );
  }

  /* ONBOARDING */

  if (isLoggedIn && showGetStarted) {
    return (
      <Onboarding
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        name={name}
        skinConcern={skinConcern}
        setSkinConcern={setSkinConcern}
        skinType={skinType}
        setSkinType={setSkinType}
        age={age}
        setAge={setAge}
        saveProfile={saveProfile}
        setShowGetStarted={setShowGetStarted}
        notify={notify}
        toast={toast}
      />
    );
  }

  /* PORTAL */

  if (isLoggedIn) {
    return (
      <Portal
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        page={page}
        setPage={setPage}
        nav={nav}
        name={name}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        logout={logout}
        newScan={newScan}
        lastAnalysis={lastAnalysis}
        analysisCount={analysisCount}
        skinType={skinType}
        skinConcern={skinConcern}
        age={age}
        preview={preview}
        analyzing={analyzing}
        handleImage={handleImage}
        changeImage={changeImage}
        startAnalysis={startAnalysis}
        guides={guides}
        selectedGuide={selectedGuide}
        setSelectedGuide={setSelectedGuide}
        toast={toast}
      />
    );
  }

  /* PUBLIC WEBSITE */

  return (
    <PublicWebsite
      darkMode={darkMode}
      toggleTheme={toggleTheme}
      setAuthMode={setAuthMode}
      setShowLogin={setShowLogin}
      scrollToSection={scrollToSection}
      clinicalImage={clinicalImage}
      toast={toast}
    />
  );
}

export default App;