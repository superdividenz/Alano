// App.jsx
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./components/Main";
import AdminLoginModal from "./pages/Login";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    navigate("/dashboard");
  };

  return (
    <div className="App min-h-screen relative pb-20">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main onAdminLoginClick={handleLoginClick} />
              <AdminLoginModal
                show={showLogin}
                onClose={handleLoginClose}
                onLoginSuccess={handleLoginSuccess}
              />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard onLogout={() => navigate("/")} />}
        />
      </Routes>
    </div>
  );
}

export default App;
