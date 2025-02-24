import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulated authentication (Replace with API call if needed)
    if (credentials.username === "admin" && credentials.password === "admin123") {
      onLogin();
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid credentials! Use admin/admin123");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={3} sx={{ padding: 4, width: 300, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Admin Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Username" name="username" value={credentials.username} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField fullWidth label="Password" type="password" name="password" value={credentials.password} onChange={handleChange} sx={{ mb: 2 }} required />
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
