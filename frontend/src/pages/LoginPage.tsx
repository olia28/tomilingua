import React, { useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import background from "../assets/background.png";
import { useNavigate } from "react-router";
import axios from "axios";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const BACKEND_URL = "/api/login/";

    try {
      const response = await axios.post(BACKEND_URL, {
        email: formData.email,      
        username: formData.email,  
        password: formData.password
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token || "logged_in");
        localStorage.setItem("firstName", response.data.first_name || "User");
        alert("Вхід успішний!");
        
        navigate("/learning"); 
      }
    } catch (error: any) {
      console.error("Login error:", error);
      alert("Помилка: перевірте пошту та пароль ще раз.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        p: 2,
        overflow: "hidden",
        background:
          "linear-gradient(118.62deg, rgba(220, 235, 255, 0.6) 8.05%, #E2E2E2 57.12%, rgba(255, 228, 249, 0.7) 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          left: "-20%",
          width: "140%",
          height: "140%",
          backgroundImage: `url(${background})`,
          backgroundSize: "70%",
          backgroundPosition: "center",
          opacity: 0.18,
          transform: "rotate(350deg)",
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h5"
          fontWeight={500}
          sx={{
            color: "#4A4A4A",
            mt: 9,
            mb: 2,
            textAlign: "left",
            pl: 7,
          }}
        >
          Вхід на платформу
        </Typography>

        <Divider
          sx={{
            borderColor: "rgba(255,255,255,0.9)",
            borderBottomWidth: "1.5px",
            mb: 3,
            width: "92%",
            mx: "auto",
          }}
        />

        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box>
            <Typography sx={{ mb: 1, ml: 1, fontSize: "1.2rem", fontWeight: 500, color: "#4A4A4A" }}>
              Електронна адреса
            </Typography>
            <TextField
              name="email"
              type="text"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Box>

          <Box>
            <Typography sx={{ mb: 1, ml: 1, fontSize: "1.2rem", fontWeight: 500, color: "#4A4A4A" }}>
              Пароль
            </Typography>
            <TextField
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              sx={textFieldStyle}
            />
          </Box>

          <Typography
            component="div"
            sx={{
              textAlign: "right",
              fontSize: "0.9rem",
              color: "#5E5E5E",
              cursor: "pointer",
              mt: -0.5,
            }}
          >
            <Button onClick={() => navigate("/recovery")}>
              Забули пароль?
            </Button>
          </Typography>

          <Button
            variant="contained"
            onClick={handleLogin} 
            sx={{
              mt: 1,
              py: 1.3,
              width: "130px",
              mx: "auto",
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "1.1rem",
              background: "linear-gradient(90deg, #6F63F6 0%, #8A73FF 100%)",
              boxShadow:
                "0 6px 18px rgba(111, 99, 246, 0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
              "&:hover": {
                background: "linear-gradient(90deg, #7A6EFF 0%, #927CFF 100%)",
              },
            }}
          >
            Увійти
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "999px",
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    px: 1.5,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "all 0.2s ease",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.9)",
      borderWidth: "1.5px", 
    },
    "&:hover fieldset": {
      borderColor: "#ffffff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff",
      borderWidth: "2px",
    },
  },
  "& .MuiInputBase-input": {
    py: 1.5,
  },
};