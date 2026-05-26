import React from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import student from "../assets/student.png";
import { useNavigate } from "react-router";

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #efd9e9 0%, #e6eee8 100%)",
        p: 2,
      }}
    >

      <Container maxWidth={false} sx={{ mt: 10 }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: "36px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.35)",
            p: 0,
          }}
        >
          <Grid
            sx={{
              height: "100%",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "7fr 6fr" },
              gridTemplateRows: "auto 1fr",
              gap: 0,
            }}
          >
            <Box
              sx={{
                p: { xs: 4, md: 6 },
                backgroundColor: "rgba(215, 209, 244, 0.8)",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: 700,
                  color: "#676274",
                  lineHeight: 1.1,
                }}
              >
                Пройдіть тест для визначення вашого рівня знання англійскьої
                мови
              </Typography>

              <Typography
                sx={{
                  mt: 3,
                  maxWidth: 700,
                  color: "#7c7687",
                  fontSize: "1.3em",
                  lineHeight: 1.5,
                }}
              >
                Проходження цього тесту є обов’язковим, адже він допоможе
                визначити ваш рівень знання мови та підібрати курс, яким
                підходитиме саме під ваші потреби.
              </Typography>

              <Button
                variant="contained"
                sx={{
                  mt: 5,
                  px: 4,
                  py: 1.4,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: "800",
                  fontSize: "1.2rem",
                  background:
                    "linear-gradient(90deg, #7a6df0 0%, #8b6ff8 100%)",
                  display: "block",
                  mx: "auto",
                  boxShadow:
                    "0 2px 0 0 rgba(255,255,255,0.5), 2px 0 0 0 rgba(255,255,255,0.3), -2px 0 0 0 rgba(255,255,255,0.3)",
                }}
                onClick={() => navigate("/test")}
              >
                Пройти тест
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "radial-gradient(circle at center, #cfd4ff 0%, #f2d9ef 60%, #eef3ef 100%)",
                minHeight: 500,
              }}
            >
              <Box
                component="img"
                src={student}
                alt="Student"
                sx={{
                  width: "100%",
                  maxWidth: 700,
                  objectFit: "contain",
                }}
              />
            </Box>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
