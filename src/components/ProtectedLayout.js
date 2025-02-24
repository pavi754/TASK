import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = ({ toggleSidebar, open }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar open={open} toggleSidebar={toggleSidebar} />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Box sx={{ p: 3 }}>
          <Outlet /> {/* ✅ This will render Dashboard, Employee, User */}
        </Box>
      </Box>
    </Box>
  );
};

export default ProtectedLayout;
