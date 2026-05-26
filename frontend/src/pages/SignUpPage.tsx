import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import background from "../assets/background.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const signUpConfig = [
  { label: "Ім'я*", type: "text", name: "first_name" },
  { label: "Прізвище*", type: "text", name: "last_name" },
  { label: "Електронна адреса*", type: "text", name: "email" },
  { label: "Номер телефону", type: "text", name: "phone_number" },
  { label: "Дата народження", type: "date", name: "birth_date" },
  { label: "Пароль*", type: "password", name: "password" },
  { label: "Повторіть пароль*", type: "password", name: "password_confirm" },
];

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    birth_date: "",
    password: "",
    password_confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    const hasPassedInitialTest = localStorage.getItem("initialTestPassed") === "true";

    if (!hasPassedInitialTest) {
      alert("Будь ласка, пройдіть початковий тест перед реєстрацією!");
      navigate("/test");
      return; 
    }

    try {
      const response = await axios.post("/api/signup/", formData);
      
      if (response.status === 201) {
        alert("Реєстрація успішна! Ласкаво просимо.");
        
        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("firstName", response.data.first_name || formData.first_name);
        }

        localStorage.removeItem("initialTestPassed");
        navigate("/learning"); 
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      
      const serverErrors = error.response?.data;
      
      alert(
        "Помилка реєстрації: " + 
        (typeof serverErrors === 'object' && serverErrors !== null
          ? Object.values(serverErrors).flat().join(", ") 
          : "Сервер недоступний")
      );
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
            mb: 1,
            textAlign: "left",
            pl: 7,
          }}
        >
          Реєстрація на платформі
        </Typography>

        <Divider
          sx={{
            borderColor: "rgba(255,255,255,0.9)",
            borderBottomWidth: "1.5px",
            mb: 3,
            width: "95%",
            mx: "auto",
          }}
        />

        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {signUpConfig.map((item) => (
            <Box key={item.name}>
              <Typography
                sx={{
                  mb: 0.8,
                  ml: 1,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "#4A4A4A",
                }}
              >
                {item.label}
              </Typography>

              <TextField
                name={item.name}
                type={item.type}
                value={(formData as any)[item.name]} 
                onChange={handleChange}
                variant="outlined"
                fullWidth
                placeholder=""
                InputLabelProps={{ shrink: item.type === "date" ? true : false }}
                sx={{
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
                }}
              />
            </Box>
          ))}

          <Button
            variant="contained"
            onClick={handleRegister} 
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "1.05rem",
              background: "linear-gradient(90deg, #6F63F6 0%, #8A73FF 100%)",
              boxShadow:
                "0 6px 18px rgba(111, 99, 246, 0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
              "& :hover": {
                background: "linear-gradient(90deg, #7A6EFF 0%, #927CFF 100%)",
              },
            }}
          >
            Зареєструватись
          </Button>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 1,
              color: "#4A4A4A",
              fontWeight: 500,
            }}
          >
            Вже є акаунт?{" "}
            <Box
              component="span"
              onClick={() => navigate("/login")}
              sx={{
                color: "#6F63F6",
                fontWeight: 700,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Увійти
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};