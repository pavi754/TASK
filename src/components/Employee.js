import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Box, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, 
  Paper, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
  Select, MenuItem 
} from "@mui/material";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: "", role: "", salary: "" });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // Fetch employees from API
  useEffect(() => {
    axios.get("https://reqres.in/api/users")
      .then((response) => {
        const fetchedEmployees = response.data.data.map((user, index) => ({
          id: index + 1,
          name: `${user.first_name} ${user.last_name}`,
          role: "Waiter", // Default role
          salary: 40000 + index * 5000, // Example salary
        }));
        setEmployees(fetchedEmployees);
      })
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  // Toggle Add Employee Form
  const handleAddClick = () => setShowForm(!showForm);

  // Handle Input Changes
  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  // Add Employee
  const handleSave = () => {
    if (newEmployee.name && newEmployee.role && newEmployee.salary) {
      axios.post("https://reqres.in/api/users", newEmployee)
        .then((response) => {
          setEmployees([...employees, { id: employees.length + 1, ...newEmployee }]);
          setNewEmployee({ name: "", role: "", salary: "" });
          setShowForm(false);
        })
        .catch((error) => console.error("Error adding employee:", error));
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Open Delete Confirmation Dialog
  const handleDeleteClick = (id) => {
    setSelectedEmployeeId(id);
    setDeleteDialogOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    setEmployees(employees.filter((employee) => employee.id !== selectedEmployeeId));
    setDeleteDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
      {/* Page Title */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Employee Management System
      </Typography>

      {/* Add Employee Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          {showForm ? "Cancel" : "ADD EMPLOYEE"}
        </Button>
      </Box>

      {/* Add Employee Form */}
      {showForm && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3, width: "50%", margin: "auto" }}>
          <TextField label="Name" name="name" value={newEmployee.name} onChange={handleChange} fullWidth required />
          
          {/* Job Role Select Dropdown */}
          <Select name="role" value={newEmployee.role} onChange={handleChange} fullWidth required displayEmpty>
            <MenuItem value="" disabled>Select Job Role</MenuItem>
            <MenuItem value="Chef">Chef</MenuItem>
            <MenuItem value="Senior Chef">Senior Chef</MenuItem>
            <MenuItem value="Waiter">Waiter</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Sous Chef">Sous Chef</MenuItem>
          </Select>

          <TextField label="Salary" name="salary" type="number" value={newEmployee.salary} onChange={handleChange} fullWidth required />
          <Button variant="contained" color="success" onClick={handleSave}>
            SAVE EMPLOYEE
          </Button>
        </Box>
      )}

      {/* Employee Table */}
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Job Role</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>
                  <Button color="primary" sx={{ mr: 1 }}>
                    EDIT
                  </Button>
                  <Button color="error" onClick={() => handleDeleteClick(employee.id)}>
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this employee?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Employee;
