import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../Features/UserSlice";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent
} from "@mui/material";
import image from "../Asserts/ecommerse.png";

const Register = ({ setPage }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(formData));

    setFormData({ name: "", email: "", password: "" });
    setPage("login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ display: "flex", flexDirection: "row", maxWidth: 1200, width: "100%", boxShadow: 4, borderRadius: 2 }}>
        {/* LEFT IMAGE */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: "2px 0 0 2px",
          }}
        >
          <img
            src={image}
            alt="cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              minHeight: 500,
            }}
          />
        </Box>

        {/* RIGHT FORM */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            backgroundColor: "#ffffff",
            borderRadius: "0 2px 2px 0",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 350 }}>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  color: "blue",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Register Form
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  margin="normal"
                  value={formData.name}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  margin="normal"
                  value={formData.email}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  margin="normal"
                  value={formData.password}
                  onChange={handleChange}
                />

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3 }}
                  type="submit"
                >
                  Register
                </Button>
              </form>

              <Button
                variant="text"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => setPage("login")}
              >
                Already have an account? Login
              </Button>
            </Box>
          </Box>
      </Card>
    </Box>
  );
};

export default Register;