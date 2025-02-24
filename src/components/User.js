import React, { useState } from "react";
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from "@mui/material";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Leanne Graham", address: "New York, USA", phone: "123-456-7890", role: "Admin" },
    { id: 2, name: "Ervin Howell", address: "Los Angeles, USA", phone: "987-654-3210", role: "Moderator" },
  ]);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", address: "", phone: "", role: "" });

  // Open Add User Dialog
  const handleOpen = () => setOpen(true);

  // Close Add/Edit/Delete Dialog
  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
    setDeleteOpen(false);
    setSelectedUser(null);
    setNewUser({ name: "", address: "", phone: "", role: "" });
  };

  // Handle Input Change
  const handleChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add User to List
  const handleAddUser = () => {
    if (!newUser.name || !newUser.address || !newUser.phone || !newUser.role) {
      alert("Please fill all fields.");
      return;
    }
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    handleClose();
  };

  // Open Edit User Dialog
  const handleEdit = (user) => {
    setSelectedUser(user);
    setNewUser(user);
    setEditOpen(true);
  };

  // Save Edited User
  const handleSaveEdit = () => {
    if (!newUser.name || !newUser.address || !newUser.phone || !newUser.role) {
      alert("Please fill all fields.");
      return;
    }
    setUsers(users.map(user => user.id === selectedUser.id ? { ...newUser, id: selectedUser.id } : user));
    handleClose();
  };

  // Open Delete Confirmation Dialog
  const handleDeleteConfirm = (user) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  // Delete User
  const handleDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    handleClose();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
      {/* Centered Title */}
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        User Management
      </Typography>

      {/* Centered Add User Button */}
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 3 }}>
        Add User
      </Button>

      {/* User Table */}
      <TableContainer component={Paper} sx={{ width: "80%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button color="primary" sx={{ mr: 1 }} onClick={() => handleEdit(user)}>Edit</Button>
                  <Button color="error" onClick={() => handleDeleteConfirm(user)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add User Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" fullWidth margin="dense" value={newUser.name} onChange={handleChange} />
          <TextField label="Address" name="address" fullWidth margin="dense" value={newUser.address} onChange={handleChange} />
          <TextField label="Phone Number" name="phone" fullWidth margin="dense" value={newUser.phone} onChange={handleChange} />
          <TextField label="Role" name="role" fullWidth margin="dense" value={newUser.role} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleAddUser} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editOpen} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" fullWidth margin="dense" value={newUser.name} onChange={handleChange} />
          <TextField label="Address" name="address" fullWidth margin="dense" value={newUser.address} onChange={handleChange} />
          <TextField label="Phone Number" name="phone" fullWidth margin="dense" value={newUser.phone} onChange={handleChange} />
          <TextField label="Role" name="role" fullWidth margin="dense" value={newUser.role} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedUser?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
