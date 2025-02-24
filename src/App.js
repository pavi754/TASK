import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Employee from "./components/Employee";
import User from "./components/User";
import AdminLogin from "./components/AdminLogin";
import Menu from "./components/Menu";
import { Box } from "@mui/material";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [open, setOpen] = useState(false);

  // Check if the user is already logged in
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // ✅ Save login state
  };

  // Logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // ✅ Clear login state
  };

  const toggleSidebar = () => setOpen(!open);

  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {isAuthenticated && <Sidebar open={open} toggleSidebar={toggleSidebar} />}
        <Box sx={{ flexGrow: 1 }}>
          {isAuthenticated && <Navbar toggleSidebar={toggleSidebar} onLogout={handleLogout} />}
          
          <Box sx={{ p: 3 }}>
            <Routes>
              <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <AdminLogin onLogin={handleLogin} />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/employee" element={isAuthenticated ? <Employee /> : <Navigate to="/" />} />
              <Route path="/menu" element={isAuthenticated ? <Menu /> : <Navigate to="/" />} />


              <Route path="/user" element={isAuthenticated ? <User /> : <Navigate to="/" />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
