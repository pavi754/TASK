import React from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Box } from "@mui/material";

const Sidebar = ({ open, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <Drawer variant="temporary" open={open} onClose={toggleSidebar} sx={{ width: 240, flexShrink: 0 }}>
      <Box sx={{ width: 240, p: 2 }}>
        <List>
          <ListItem button onClick={() => navigate("/employee")}>
            <ListItemText primary="Employee" />
          </ListItem>
          <ListItem button onClick={() => navigate("/user")}>
            <ListItemText primary="User" />
          </ListItem>
          <ListItem button onClick={() => navigate("/menu")}>
            <ListItemText primary="Menu" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
