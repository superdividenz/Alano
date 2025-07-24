import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Main from "./components/Main";
import AdminLoginModal from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // ✅ import your dashboard

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
              <Main />
              <Footer onAdminLoginClick={handleLoginClick} />
              <AdminLoginModal
                show={showLogin}
                onClose={handleLoginClose}
                onLoginSuccess={handleLoginSuccess}
              />
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard onLogout={() => navigate("/")} />} />
      </Routes>
    </div>
  );
}

export default App;
