import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    if (location.pathname === "/employee") return "Employee Management System";
    if (location.pathname === "/user") return "User Management System";
    return "Food Management System";
  };

  // Handle logout and redirect to login page
  const handleLogoutClick = () => {
    onLogout(); // Call logout function
    navigate("/"); // Redirect to login page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          {getTitle()}
        </Typography>

        {/* Logout Button */}
        <Button color="inherit" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
