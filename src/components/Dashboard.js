import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  const location = useLocation();

  // Function to get page title dynamically
  const getTitle = () => {
    switch (location.pathname) {
      case "/employee":
        return "Employee Management";
      case "/user":
        return "User Management";
      case "/food-management":
        return "Food Management System";
      default:
        return "Dashboard";
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
      {/* Page Title */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        {getTitle()}
      </Typography>

      {/* Page Content */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1">
          Welcome to the {getTitle()} Page!
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
