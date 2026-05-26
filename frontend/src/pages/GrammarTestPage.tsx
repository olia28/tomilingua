import React, { useState } from "react";
import { Box, Typography, Container, Button, Paper } from "@mui/material";
import axios from "axios";
import { ResultBar } from "../features/ResultBar";

const questions = [
  {
    question: "The sun ___ in the east?",
    options: ["rise", "rose", "rises"],
    correct: 2,
  },
  {
    question: "He ___ TV every evening.",
    options: ["watches", "watched", "watching"],
    correct: 0,
  },
  {
    question: "You go to the gym on Mondays. (Form a question)",
    options: [
      "You go to the gym on Mondays?",
      "Does you go to the gym on Mondays?",
      "Do you go to the gym on Mondays?",
    ],
    correct: 2,
  },
  {
    question: "She don’t like apples. (Correct the sentence)",
    options: [
      "She not like apples.",
      "She does not like apples.",
      "Помилки немає.",
    ],
    correct: 1,
  },
  {
    question: "We ___ (not / play) football on Sundays.",
    options: ["don’t play", "doesn’t play", "didn’t play"],
    correct: 0,
  },
];

const theoryBlocks = [
  {
    title: "When do we use?",
    lines: [
      "Для регулярних дій або звичок (I go to school every day).",
      "Факти або істини (The sun rises in the east).",
      "Розклади, графіки (The train leaves at 5 PM).",
    ],
    emoji: "🚶‍♂️🌳",
  },
  {
    title: "How do we use?",
    lines: [
      "Підмет + дієслово (I play, We read).",
      "У 3-й особі однини додаємо -s/-es (He plays, She watches).",
    ],
    emoji: "☕",
  },
  {
    title: "How do we form Questions?",
    lines: [
      "Do/Does + підмет + дієслово (Do you like coffee? Does she work here?).",
    ],
    emoji: "💻",
  },
  {
    title: "How do we form Denials?",
    lines: [
      "Підмет + дієслово (I play, We read).",
      "У 3-й особі однини додаємо -s/-es (He plays, She watches).",
    ], 
    emoji: "❌",
  },
];

const getRowStyle = (isReversed: boolean) => ({
  display: "grid",
  gridTemplateColumns: isReversed ? "160px 1fr" : "1fr 160px",
  alignItems: "center",
  gap: 24,
});

export const GrammarTestPage: React.FC = () => {
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
      console.log("Прогрес граматики успішно збережено в базі!");
    } catch (error) {
      console.error("Error saving grammar progress:", error);
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
          }}
        >
          <Typography
            fontSize={32}
            fontWeight={700}
            sx={{ textDecoration: "underline" }}
          >
            Grammar 🗣️
          </Typography>

          <Typography
            fontSize={26}
            fontWeight={800}
            sx={{ textAlign: "center", mt: 2, mb: 4 }}
          >
            Present Simple
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              mb: 5,
            }}
          >
            {theoryBlocks.map((block, index) => {
              const isReversed = index % 2 === 1;

              return (
                <Box key={index} sx={getRowStyle(isReversed)}>
                  {isReversed && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.25)",
                        borderRadius: "20px",
                      }}
                    >
                      <Typography fontSize={index === 0 ? 80 : 60}>
                        {block.emoji}
                      </Typography>
                    </Box>
                  )}

                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: "20px",
                      background: "rgba(255,255,255,0.4)",
                      minHeight: 110,
                    }}
                  >
                    <Typography
                      fontWeight={700}
                      mb={1}
                      fontSize={24}
                      sx={{ color: "#06060699" }}
                    >
                      {block.title}
                    </Typography>

                    {block.lines.map((line, i) => (
                      <Typography
                        key={i}
                        sx={{ color: "#06060699", fontSize: "0.95rem" }}
                      >
                        {line}
                      </Typography>
                    ))}
                  </Box>

                  {!isReversed && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.25)",
                        borderRadius: "20px",
                      }}
                    >
                      <Typography fontSize={index === 0 ? 80 : 60}>
                        {block.emoji}
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>

          <Box sx={{ display: "flex", gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={600} mb={2}>
                Answer the questions related to the material above:
              </Typography>

              {questions.map((q, qIndex) => (
                <Box key={qIndex} sx={{ mb: 3 }}>
                  <Typography mb={1}>
                    {qIndex + 1}. {q.question}
                  </Typography>

                  <Box
                    sx={{
                      maxWidth: 420,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
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
                            color: "rgba(0, 0, 0, 0.6)",
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
                width: submitted ? 110 : 0,
                opacity: submitted ? 1 : 0,
                transform: submitted ? "translateX(0)" : "translateX(20px)",
                transition: "0.4s ease",
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
                  background: "linear-gradient(90deg, #7a6df0, #8b6ff8)",
                  textTransform: "none",
                  color: "white !important",
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