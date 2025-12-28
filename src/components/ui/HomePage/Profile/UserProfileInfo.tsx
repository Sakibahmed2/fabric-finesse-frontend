import React, { useState } from "react";
import { Box, Typography, Button, Modal, TextField } from "@mui/material";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const UserProfileInfo = () => {
    // Replace with real user data from props, context, or redux
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState({
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        address: "123 Main St, City, Country",
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // Save logic here (API call, redux, etc.)
        setOpen(false);
    };

    return (
        <Box className="space-y-2 p-4 border rounded-md shadow-md bg-white">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Profile Information</Typography>
                <Button variant="outlined" size="small" onClick={handleOpen}>
                    Edit
                </Button>
            </Box>
            <Typography><strong>Name:</strong> {editData.name}</Typography>
            <Typography><strong>Email:</strong> {editData.email}</Typography>
            <Typography><strong>Phone:</strong> {editData.phone}</Typography>
            <Typography><strong>Address:</strong> {editData.address}</Typography>

            <Modal open={open} onClose={handleClose} aria-labelledby="edit-profile-modal">
                <Box sx={style}>
                    <Typography id="edit-profile-modal" variant="h6" mb={2}>
                        Edit Profile
                    </Typography>
                    <TextField
                        label="Name"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={editData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={editData.phone}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={editData.address}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} variant="contained" color="primary">
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default UserProfileInfo;