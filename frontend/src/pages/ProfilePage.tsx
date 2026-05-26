import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router";

const inputStyle = {
  "& .MuiInputBase-root": {
    borderRadius: "999px",
    background: "#f3f3f3",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
    px: 2,
  },
};

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [dob, setDob] = useState<Dayjs | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/profile/", {
          headers: { Authorization: `Token ${token}` },
        });

        if (response.status === 200) {
          setFormData({
            firstName: response.data.first_name || "",
            lastName: response.data.last_name || "",
            email: response.data.email || "",
            phoneNumber: response.data.phone_number || "",
          });

          if (response.data.birth_date) {
            setDob(dayjs(response.data.birth_date));
          }
        }
      } catch (error) {
        console.error("Помилка при завантаженні профілю:", error);
      }
    };

    if (token) {
      fetchProfileData();
    }
  }, [token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      const formattedDate = dob ? dob.format("YYYY-MM-DD") : null;

      const response = await axios.patch(
        "/api/profile/",
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phoneNumber,
          birth_date: formattedDate,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("firstName", response.data.first_name);
        alert("Зміни успішно збережено в базі даних!");
      }
    } catch (error) {
      console.error("Помилка при збереженні профілю:", error);
      alert("Не вдалося зберегти зміни.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete("/api/profile/", {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.status === 204 || response.status === 200) {
        alert("Ваш акаунт успішно видалено.");
        localStorage.clear(); 
        navigate("/login");    
      }
    } catch (error) {
      console.error("Помилка при видаленні акаунта:", error);
      alert("Не вдалося видалити акаунт. Спробуйте пізніше.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #efd9e9 0%, #e6eee8 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: "28px",
            p: 5,
            background: "rgba(255,255,255,0.65)",
          }}
        >
          {!isDeleting ? (
            <Box>
              <Typography fontSize={28} fontWeight={700} mb={4}>
                Персональна Інформація
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr",
                  },
                  gap: 3,
                }}
              >
                <Box>
                  <Typography mb={0.5}>Ім’я</Typography>
                  <TextField
                    fullWidth
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={inputStyle}
                  />
                </Box>

                <Box>
                  <Typography mb={0.5}>Прізвище</Typography>
                  <TextField
                    fullWidth
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={inputStyle}
                  />
                </Box>

                <Box>
                  <Typography mb={0.5}>Електронна адреса</Typography>
                  <TextField
                    fullWidth
                    name="email"
                    value={formData.email}
                    disabled 
                    variant="outlined"
                    sx={{ ...inputStyle, "& .MuiInputBase-root": { ...inputStyle["& .MuiInputBase-root"], opacity: 0.7 } }}
                  />
                </Box>

                <Box>
                  <Typography mb={0.5}>Номер телефону</Typography>
                  <TextField
                    fullWidth
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={inputStyle}
                  />
                </Box>

                <Box>
                  <Typography mb={0.5}>Дата народження</Typography>
                  <DatePicker
                    value={dob}
                    onChange={(newValue) => setDob(newValue)}
                    format="DD MMMM YYYY"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: inputStyle,
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    onClick={() => setIsDeleting(true)}
                    sx={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "#666",
                      fontSize: "0.95rem",
                      "&:hover": { color: "#000" },
                    }}
                  >
                    Видалити акаунт
                  </Typography>
                </Box>
                <Box />
              </Box>

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{ flex: 1, display: "flex", justifyContent: "center" }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSaveProfile}
                    sx={{
                      borderRadius: "999px",
                      px: 5,
                      py: 1.2,
                      fontSize: "1rem",
                      textTransform: "none",
                      background: "linear-gradient(90deg, #7a6df0, #8b6ff8)",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    Зберегти
                  </Button>
                </Box>

                <Box sx={{ width: 120 }} />
              </Box>
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", py: 3 }}>
              <Typography fontSize={26} fontWeight={700} mb={3}>
                Видалення акаунта
              </Typography>

              <Box
                sx={{
                  maxWidth: 500,
                  mx: "auto",
                  mb: 3,
                  p: 3,
                  borderRadius: "20px",
                  background: "#FFDADA",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography fontSize={32}>❗❗</Typography>

                <Typography
                  sx={{
                    color: "#FF2929",
                    textAlign: "left",
                    fontSize: "0.95rem",
                  }}
                >
                  Увага! Цю дію не можна скасувати. Після підтвердження, усі
                  дані будуть видалені з наших серверів.
                </Typography>
              </Box>

              <Typography mb={1} fontSize={14} color="#555">
                Напишіть &quot;ВИДАЛИТИ&quot; для підтвердження дії
              </Typography>

              <TextField
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                fullWidth
                sx={{
                  ...inputStyle,
                  maxWidth: 400,
                  mx: "auto",
                }}
              />

              <Typography mt={1} mb={3} fontSize={12} color="#d32f2f">
                Видалення назавжди
              </Typography>

              <Button
                disabled={confirmText !== "ВИДАЛИТИ"}
                onClick={handleDeleteAccount}
                sx={{
                  borderRadius: "999px",
                  px: 5,
                  py: 1.2,
                  fontSize: "1rem",
                  textTransform: "none",
                  background:
                    "linear-gradient(94.17deg, #FF9797 7.42%, #FF7B7B 51.61%, #FF7575 95.81%)",
                  color: "#fff",
                  mb: 2,
                  "&:disabled": {
                    background: "#ccc",
                  },
                }}
              >
                Видалити
              </Button>

              <Typography
                onClick={() => {
                  setIsDeleting(false);
                  setConfirmText("");
                }}
                sx={{
                  cursor: "pointer",
                  color: "#777",
                  "&:hover": { color: "#000" },
                }}
              >
                Скасувати
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};