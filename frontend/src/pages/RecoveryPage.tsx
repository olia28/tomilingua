import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import background from "../assets/background.png";
import axios from 'axios';

export const RecoveryPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const handleSendEmail = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await axios.post("/api/password-reset/", { email });
      setMessage({ type: 'success', text: "Лист із посиланням надіслано на вашу пошту!" });
    } catch (error) {
      setMessage({ type: 'error', text: "Помилка: користувача з такою поштою не знайдено або сервер недоступний." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={pageContainerStyles}>
      <Box sx={backgroundOverlayStyles} />
      <Box sx={contentWrapperStyles}>
        <Box sx={formContainerStyles}>
          <Box sx={{ width: "100%", maxWidth: 550, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h4" fontWeight={500} sx={titleStyles}>
              Відновлення доступу
            </Typography>

            {message && <Alert severity={message.type}>{message.text}</Alert>}

            <Typography sx={labelStyles}>Електронна адреса</Typography>
            <TextField
              fullWidth
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={inputStyles}
              disabled={loading}
            />

            <Typography sx={hintStyles}>
              Введіть пошту, і ми надішлемо вам спеціальне посилання для миттєвого входу.
            </Typography>

            <Button
              variant="contained"
              onClick={handleSendEmail}
              disabled={loading || !email}
              sx={buttonStyles}
            >
              {loading ? "Надсилаємо..." : "Надіслати посилання"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const pageContainerStyles = {
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  boxSizing: "border-box",
  p: 2,
  overflow: "hidden",
  background: "linear-gradient(118.62deg, rgba(220, 235, 255, 0.6) 8.05%, #E2E2E2 57.12%, rgba(255, 228, 249, 0.7) 100%)",
};

const backgroundOverlayStyles = {
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
  pointerEvents: "none",
};

const contentWrapperStyles = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const formContainerStyles = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const titleStyles = {
  color: "#4A4A4A",
  mb: 1,
  textAlign: "left",
  pl: 1,
};

const labelStyles = {
  mb: 0.8,
  ml: 1,
  fontSize: "0.95rem",
  fontWeight: 500,
  color: "#4A4A4A",
};

const hintStyles = {
  color: "#00000066",
  mt: 1,
  mb: 1,
  textAlign: "left",
  pl: 1,
  fontWeight: 500,
};

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "999px",
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(8px)",
    px: 1.5,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.9)", borderWidth: "1.5px" },
  },
  "& .MuiInputBase-input": { py: 1.5 },
};

const buttonStyles = {
  mt: 2,
  py: 1.5,
  borderRadius: "999px",
  textTransform: "none",
  fontWeight: 700,
  fontSize: "1.05rem",
  background: "linear-gradient(90deg, #6F63F6 0%, #8A73FF 100%)",
  boxShadow: "0 6px 18px rgba(111, 99, 246, 0.35)",
  "&:hover": { background: "linear-gradient(90deg, #7A6EFF 0%, #927CFF 100%)" },
};