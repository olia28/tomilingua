import React, { useState } from "react";
import { Box, Typography, Container, Button, Paper } from "@mui/material";
import walkingImg from "../assets/walking.png";
import axios from "axios";

const text = `This is a brown dog. Its name is Max. Max likes to run in the park. Every morning, Max and his owner go for a walk. Max plays with a ball and runs fast. After the walk, Max eats his food and drinks water. In the evening, Max sleeps in his small bed. Max is a happy and friendly dog.`;

const questions = [
  {
    question: "What is the dog's name?",
    options: ["Max", "Thomas", "Jack"],
    correct: 0,
  },
  {
    question: "What does Max do after his walk?",
    options: [
      "He plays with a ball",
      "He eats food and drinks water",
      "He runs in the park",
    ],
    correct: 1,
  },
  {
    question: "How is Max described in the text?",
    options: ["Sad and lazy", "Happy and friendly", "Angry and noisy"],
    correct: 1,
  },
];

const ResultBar = ({ score, total }: { score: number; total: number }) => {
  const wrong = total - score;
  const correctPercent = (score / total) * 100;
  const wrongPercent = (wrong / total) * 100;

  return (
    <Box
      sx={{
        width: 100,
        height: "100%",
        borderRadius: "20px",
        background: "#eee",
        position: "relative",
        overflow: "hidden",
        boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.4)",
      }}
    >
      {wrong > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: `${wrongPercent}%`,
            background: "#F05E60",
            transition: "0.5s",
          }}
        />
      )}

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: `${correctPercent}%`,
          background: "#3CD959",
          transition: "0.5s",
        }}
      />

      <Typography
        sx={{
          position: "absolute",
          bottom: 12,
          width: "100%",
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        {score}/{total}
      </Typography>
    </Box>
  );
};

export const ReadingTestPage: React.FC = () => {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  );
  const [submitted, setSubmitted] = useState(false);

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
    const token = localStorage.getItem("token");
    
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
      console.log("Прогрес тесту успішно збережено в базі даних!");
    } catch (error) {
      console.error("Error saving progress:", error);
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
            background: "rgba(255,255,255,0.6)",
            p: 5,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5)",
          }}
        >
          <Typography
            fontSize={34}
            fontWeight={700}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "underline",
            }}
          >
            Reading 📚
          </Typography>

          <Typography
            sx={{
              mt: 1.5,
              mb: 4,
              color: "#666",
              fontWeight: 600,
              fontSize: "1.1rem",
            }}
          >
            Read a short text and answer the questions below.
          </Typography>

          <Box sx={{ display: "flex", gap: 5, alignItems: "center", mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  color: "#555",
                  fontSize: "25px",
                  width: "90%",
                  lineHeight: 1.5,
                }}
              >
                {text}
              </Typography>

              <Typography sx={{ mt: 2, color: "#6c63ff", fontWeight: 500 }}>
                owner - власник
              </Typography>
            </Box>

            <Box
              component="img"
              src={walkingImg}
              alt="walking"
              sx={{
                width: 350,
                height: "auto",
              }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 4, alignItems: "stretch" }}>
            <Box sx={{ flex: 1 }}>
              {questions.map((q, qIndex) => (
                <Box key={qIndex} sx={{ mb: 3 }}>
                  <Typography sx={{ mb: 1, fontWeight: 600, color: "#444" }}>
                    {qIndex + 1}. {q.question}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      maxWidth: 400,
                    }}
                  >
                    {q.options.map((opt, i) => {
                      const letters = ["a", "b", "c"];
                      const selected = answers[qIndex];
                      const isSelected = selected === i;
                      const isCorrect = i === q.correct;

                      let bg = "#dcdcdc";

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
                            px: 2,
                            py: 0.6,
                            fontSize: "0.9rem",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
                            color: bg === "#dcdcdc" ? "#444" : "#ffffff",
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
                width: submitted ? 100 : 0,
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
                  px: 4,
                  py: 1,
                  background: "linear-gradient(90deg, #7a6df0, #8b6ff8)",
                  textTransform: "none",
                  boxShadow: "0 2px 0 rgba(255,255,255,0.5)",
                }}
              >
                Hand in
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