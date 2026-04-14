import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Features/AuthSlice";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import image from "../Asserts/Login.jpg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    dispatch(login());
    setError("");
    navigate("/products");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        },
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          padding: 4,
          boxShadow: 6,
          borderRadius: 2,
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              color: "blue",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Login Form
          </Typography>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Button
            variant="text"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
          >
            Don't have an account? Register
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;