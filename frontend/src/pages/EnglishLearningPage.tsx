import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import axios from "axios";
import { SmallStatCard } from "../features/SmallStatCard";
import { SectionCard } from "../features/SectionCard";

export const EnglishLearningPage: React.FC = () => {
  const navigate = useNavigate();
  const userFirstName = localStorage.getItem("firstName") || "Olha";
  const token = localStorage.getItem("token");

  const [courseStats, setCourseStats] = useState({
    completedModules: 0,
    totalModules: 3, 
    averageScore: 0,
  });

  const [modulesProgress, setModulesProgress] = useState({
    reading: 0,
    grammar: 0,
    vocabulary: 0,
  });

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const response = await axios.get("/api/user/progress/", {
          headers: { Authorization: `Token ${token}` },
        });

        if (response.data) {
          const completedCount = response.data.completed_modules_count || 0;
          
          setCourseStats({
            completedModules: completedCount,
            totalModules: 3,
            averageScore: Math.round(response.data.average_score || 0),
          });

          setModulesProgress({
            reading: completedCount >= 1 ? 1 : 0,
            grammar: completedCount >= 2 ? 1 : 0,
            vocabulary: completedCount >= 3 ? 1 : 0,
          });
        }
      } catch (error) {
        console.error("Помилка при завантаженні загального прогресу:", error);
      }
    };

    if (token) {
      fetchCourseProgress();
    }
  }, [token]); 

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #efd9e9 0%, #e6eee8 100%)",
        p: 2,
      }}
    >
      <Container maxWidth={false} sx={{ mt: 9 }}>
        <Box
          sx={{
            p: 3,
            borderRadius: "28px",
            background:
              "linear-gradient(90deg, rgba(180, 159, 255, 0) 0%, #B39FFF 72.12%)",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontSize={28} fontWeight={700}>
            🇬🇧 English A1+
          </Typography>

          <Typography fontSize={26} fontWeight={600}>
            Welcome, {userFirstName}! 👋
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <SmallStatCard 
            label="DONE" 
            value={`${courseStats.completedModules}/${courseStats.totalModules}`} 
            progress={(courseStats.completedModules / courseStats.totalModules) * 100} 
          />
          <SmallStatCard 
            label="AVERAGE SCORE" 
            value={`${courseStats.averageScore}%`} 
            color="#00c853" 
          />
        </Box>

        <Grid
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          <SectionCard
            title="Reading"
            emoji="📖"
            description="Read a short story about an adventurous day."
            progress={modulesProgress.reading}
            total={1}
            color={`rgba(227, 41, 159, 1)`}
            gradient="linear-gradient(95.91deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 31, 169, 0.8) 100%)"
            onClick={() => navigate("/reading")}
          />

          <SectionCard
            title="Grammar"
            emoji="🗣️"
            description="Learn Present Simple and be able to talk about daily life."
            progress={modulesProgress.grammar} 
            total={1}
            color={`rgba(86, 126, 251, 1)`}
            gradient="linear-gradient(95.91deg, rgba(255, 255, 255, 0.8) 0%, rgba(31, 83, 255, 0.8) 100%)"
            onClick={() => navigate("/grammar")}
          />
        </Grid>

        <Box sx={{ mt: 3, maxWidth: "49%" }}>
          <SectionCard
            title="Vocabulary"
            emoji="📚"
            description="Read a short story about an adventurous day."
            progress={modulesProgress.vocabulary} 
            total={1}
            color={`rgba(34, 199, 28, 1)`}
            gradient="linear-gradient(95.91deg, rgba(255, 255, 255, 0.8) 0%, rgba(11, 226, 0, 0.8) 100%)"
            onClick={() => navigate("/vocabulary")}
          />
        </Box>
      </Container>
    </Box>
  );
};