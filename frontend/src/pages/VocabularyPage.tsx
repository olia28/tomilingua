import React, { useState } from "react";
import { Box, Typography, Container, Button, Paper } from "@mui/material";
import axios from "axios";
import { ResultBar } from "../features/ResultBar";

const questions = [
  {
    emoji: "🌃",
    options: ["Good evening!", "Good morning!", "Good afternoon!"],
    correct: 0,
  },
  {
    emoji: "🌆",
    options: ["Good afternoon", "Good evening", "Good morning"],
    correct: 0,
  },
  { emoji: "👋", options: ["Greeting", "Weather", "Cloud"], correct: 0 },
  {
    emoji: "👍",
    options: ["I am fine", "Greeting", "Good afternoon"],
    correct: 0,
  },
  {
    emoji: "👎",
    options: ["I am not quite good", "Good morning!", "Cloud"],
    correct: 0,
  },
  { emoji: "☁️", options: ["Cloud", "Good afternoon", "Greeting"], correct: 0 },
  {
    emoji: "🌧️",
    options: ["Rainy weather", "Cloudy weather", "I am fine"],
    correct: 0,
  },
  {
    emoji: "☀️",
    options: ["Sunny weather", "Cloud", "Good afternoon"],
    correct: 0,
  },
];

export const VocabularyTestPage: React.FC = () => {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  );
  const [submitted, setSubmitted] = useState(false);

  const token = localStorage.getItem("token");

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const score = answers.reduce<number>((acc, answer, i) => {
    return answer === questions[i].correct ? acc + 1 : acc;
  }, 0);

  const handleSubmit = async () => {
    setSubmitted(true);
    
    try {
      await axios.post(
        "/api/user/progress/",
        {
          score: score,
          total: questions.length
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          }
        }
      );
      console.log("Прогрес словникового тесту успішно збережено в базі!");
    } catch (error) {
      console.error("Error saving vocabulary progress:", error);
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
      <Container maxWidth={false} sx={{ mt: 3 }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: "36px",
            background: "rgba(255,255,255,0.35)",
            p: 4,
          }}
        >
          <Typography fontSize={32} fontWeight={700}>
            Vocabulary 📚
          </Typography>

          <Typography sx={{ mt: 1, mb: 3 }}>
            Connect words and pictures:
          </Typography>

          <Box sx={{ display: "flex", gap: 3, alignItems: "stretch" }}>
            <Box
              sx={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(180px, 1fr))",
                gap: 3,
              }}
            >
              {questions.map((q, qIndex) => (
                <Box
                  key={qIndex}
                  sx={{
                    p: 2,
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.6)",
                  }}
                >
                  <Typography fontSize={72} textAlign="center">
                    {q.emoji}
                  </Typography>

                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      color: "#00000099",
                    }}
                  >
                    {q.options.map((opt, i) => {
                      const letters = ["a", "b", "c"];
                      const selected = answers[qIndex];
                      const isSelected = selected === i;
                      const isCorrect = i === q.correct;

                      let bg = "#D9D9D9";

                      if (submitted) {
                        if (isCorrect) bg = "#8DE6A2";
                        else if (isSelected && !isCorrect) bg = "#E68D8E";
                      } else if (isSelected) {
                        bg = "#C1C0E5";
                      }

                      return (
                        <Button
                          key={i}
                          onClick={() => handleSelect(qIndex, i)}
                          sx={{
                            borderRadius: "999px",
                            textTransform: "none",
                            justifyContent: "flex-start",
                            background: bg,
                            // 🔐 ОПТИМІЗАЦІЯ: Текст стає білим на кольорових кнопках результату для кращого контрасту
                            color: bg === "#D9D9D9" ? "rgba(0, 0, 0, 0.6)" : "#ffffff",
                          }}
                        >
                          {letters[i]}. {opt}
                        </Button>
                      );
                    })}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                width: submitted ? 120 : 0,
                opacity: submitted ? 1 : 0,
                transform: submitted ? "translateX(0)" : "translateX(20px)",
                transition: "all 0.4s ease",
                overflow: "hidden",
                display: "flex",
              }}
            >
              {submitted && (
                <ResultBar score={score} total={questions.length} />
              )}
            </Box>
          </Box>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            {!submitted ? (
              <Button
                variant="contained"
                disabled={answers.includes(null)}
                onClick={handleSubmit}
                sx={{
                  borderRadius: "999px",
                  px: 5,
                  py: 1.5,
                  fontSize: "1.1rem",
                  background: "linear-gradient(90deg, #7a6df0, #8b6ff8)",
                  textTransform: "none",
                  color: "white !important",
                }}
              >
                Submit
              </Button>
            ) : (
              <Typography fontSize={22} fontWeight={700}>
                Result: {score}/{questions.length}
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};