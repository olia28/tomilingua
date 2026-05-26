import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";

const mockQuestions = [
  {
    id: 1,
    question: "Excuse me, ____ you the new English teacher?",
    options: ["is", "are", "am"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "I live in a small flat, but my sister ____ a large house.",
    options: ["has", "have", "is"],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: "____ you like a glass of sparkling water?",
    options: ["Do", "Will", "Would"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "I’m going to the ____ to post some letters.",
    options: ["chemist's", "post office", "stationer's"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "There ____ any biscuits left in the tin.",
    options: ["aren't", "isn't", "no"],
    correctAnswer: 0,
  },
  {
    id: 6,
    question: "Could you tell me the ____ to the City Hall?",
    options: ["road", "way", "street"],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "It’s 10:30. It’s ____ past ten.",
    options: ["quarter", "half", "twenty"],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "I usually go to work ____ bus.",
    options: ["on", "by", "in"],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "My brother’s daughter is my ____.",
    options: ["nephew", "niece", "cousin"],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "Listen! Someone ____ the piano upstairs.",
    options: ["plays", "is playing", "play"],
    correctAnswer: 1,
  },
  {
    id: 11,
    question: "We ____ a wonderful holiday in Cornwall last summer.",
    options: ["had", "have had", "were having"],
    correctAnswer: 0,
  },
  {
    id: 12,
    question: "The train was delayed, so I ____ my connection.",
    options: ["lost", "missed", "failed"],
    correctAnswer: 1,
  },
  {
    id: 13,
    question: "This motorway is ____ than the old road.",
    options: ["more dangerous", "dangerouser", "most dangerous"],
    correctAnswer: 0,
  },
  {
    id: 14,
    question: "I ____ a shower when the doorbell rang.",
    options: ["had", "was having", "have had"],
    correctAnswer: 1,
  },
  {
    id: 15,
    question: "If I see Mark, I ____ him your message.",
    options: ["give", "I'll give", "gave"],
    correctAnswer: 1,
  },
  {
    id: 16,
    question: "I need to ____ a table for four for Friday night.",
    options: ["book", "hire", "rent"],
    correctAnswer: 0,
  },
  {
    id: 17,
    question: "Have you ____ been to the Edinburgh Festival?",
    options: ["yet", "already", "ever"],
    correctAnswer: 2,
  },
  {
    id: 18,
    question: "You ____ touch that; it's extremely hot.",
    options: ["mustn't", "don't have to", "shouldn't"],
    correctAnswer: 0,
  },
  {
    id: 19,
    question: "I’m really ____. I think I’ll go to bed.",
    options: ["bored", "exhausted", "angry"],
    correctAnswer: 1,
  },
  {
    id: 20,
    question: "I don’t mind ____ the washing-up.",
    options: ["do", "doing", "to do"],
    correctAnswer: 1,
  },
  {
    id: 21,
    question: "The bridge ____ built in the nineteenth century.",
    options: ["is", "was", "has been"],
    correctAnswer: 1,
  },
  {
    id: 22,
    question: "I’ve decided to ____ up a new hobby, maybe squash.",
    options: ["take", "set", "make"],
    correctAnswer: 0,
  },
  {
    id: 23,
    question: "I’ve lived in this town ____ I was a child.",
    options: ["for", "since", "ago"],
    correctAnswer: 1,
  },
  {
    id: 24,
    question: "He asked me where I ____ the previous night.",
    options: ["have been", "was", "had been"],
    correctAnswer: 2,
  },
  {
    id: 25,
    question: "I wish I ____ more time to travel.",
    options: ["have", "had", "would have"],
    correctAnswer: 1,
  },
  {
    id: 26,
    question: "I can’t ____ to buy a new car this year.",
    options: ["afford", "spend", "pay"],
    correctAnswer: 0,
  },
  {
    id: 27,
    question: "This is the house ____ my grandfather was born.",
    options: ["which", "that", "where"],
    correctAnswer: 2,
  },
  {
    id: 28,
    question: "Unless you ____ now, you’ll be late for the lecture.",
    options: ["leave", "don't leave", "will leave"],
    correctAnswer: 0,
  },
  {
    id: 29,
    question: "The film was so ____ that I fell asleep.",
    options: ["dull", "bright", "moving"],
    correctAnswer: 0,
  },
  {
    id: 30,
    question: "You ____ better see a doctor about that cough.",
    options: ["would", "should", "had"],
    correctAnswer: 2,
  },
  {
    id: 31,
    question: "The meeting has been ____ until next Tuesday.",
    options: ["put off", "put out", "put away"],
    correctAnswer: 0,
  },
  {
    id: 32,
    question: "I’d rather you ____ talk about politics at dinner.",
    options: ["don't", "didn't", "not"],
    correctAnswer: 1,
  },
  {
    id: 33,
    question: "By this time next week, we ____ our exams.",
    options: ["will finish", "will have finished", "are finishing"],
    correctAnswer: 1,
  },
  {
    id: 34,
    question: "He is very ____; you can always count on him.",
    options: ["reliable", "confident", "stubborn"],
    correctAnswer: 0,
  },
  {
    id: 35,
    question: "It’s no use ____ for him; he won’t come.",
    options: ["to wait", "waiting", "wait"],
    correctAnswer: 1,
  },
  {
    id: 36,
    question: "The police are ____ the cause of the accident.",
    options: ["investigating", "searching", "looking"],
    correctAnswer: 0,
  },
  {
    id: 37,
    question: "Little ____ we realise the importance of the discovery.",
    options: ["did", "had", "have"],
    correctAnswer: 0,
  },
  {
    id: 38,
    question: "He admitted ____ the confidential documents.",
    options: ["to take", "taking", "take"],
    correctAnswer: 1,
  },
  {
    id: 39,
    question: "She has a very high ____ as a talented solicitor.",
    options: ["reputation", "fame", "notice"],
    correctAnswer: 0,
  },
  {
    id: 40,
    question: "I’m not used to ____ on the left-hand side of the road.",
    options: ["drive", "driving", "have driven"],
    correctAnswer: 1,
  },
  {
    id: 41,
    question: "Had it not been for your support, I ____ given up.",
    options: ["would have", "will have", "should have"],
    correctAnswer: 0,
  },
  {
    id: 42,
    question: "The company’s success is ____ to its innovative staff.",
    options: ["attributed", "contributed", "distributed"],
    correctAnswer: 0,
  },
  {
    id: 43,
    question: "It’s high time the government ____ action on climate change.",
    options: ["takes", "took", "will take"],
    correctAnswer: 1,
  },
  {
    id: 44,
    question: "The instructions were quite ____; I couldn't follow them.",
    options: ["ambiguous", "transparent", "straightforward"],
    correctAnswer: 0,
  },
  {
    id: 45,
    question: "Try ____ she might, she couldn't master the cello.",
    options: ["although", "as", "however"],
    correctAnswer: 1,
  },
  {
    id: 46,
    question: "He is well-known for his ____ wit and sharp tongue.",
    options: ["biting", "chewing", "tasting"],
    correctAnswer: 0,
  },
  {
    id: 47,
    question: "Were the negotiations ____ fail, the consequences would be dire.",
    options: ["to", "will", "should"],
    correctAnswer: 0,
  },
  {
    id: 48,
    question: "The landscape was ____, with no signs of life.",
    options: ["bleak", "lush", "vibrant"],
    correctAnswer: 0,
  },
  {
    id: 49,
    question: "He was on the ____ of making a major breakthrough.",
    options: ["edge", "verge", "border"],
    correctAnswer: 1,
  },
  {
    id: 50,
    question: "The new law was ____ to improve public safety.",
    options: ["enacted", "enforced", "engaged"],
    correctAnswer: 0,
  },
];

export const TestPage: React.FC = () => {
  const getLevelFromScore = (score: number) => { 
    if (score <= 15) {
      return {
        level: "A1+",
        title: "Чудово!",
        description:
          "Ваш результат дорівнює рівню A1. На цьому рівні ви вже можете розуміти та вживати знайомі повсякденні вирази, а також будувати прості речення. ",
      };
    }

    if (score <= 30) {
      return {
        level: "A2",
        title: "Гарний результат!",
        description:
          "Ви впевнено орієнтуєтесь у базових ситуаціях та можете підтримати просту розмову.",
      };
    }

    return {
      level: "B1+",
      title: "Відмінно!",
      description:
        "У вас хороший рівень англійської та сильна база для подальшого навчання.",
    };
  };
  
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    Array(mockQuestions.length).fill(-1),
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultData, setResultData] = useState<null | {
    score: number;
    total: number;
    level: string;
    title: string;
    description: string;
  }>(null);

  const currentQuestion = mockQuestions[currentQuestionIndex];

  const progress = useMemo(() => {
    const answeredCount = selectedAnswers.filter((a) => a !== -1).length;
    return (answeredCount / mockQuestions.length) * 100;
  }, [selectedAnswers]);

  const handleSelectAnswer = (answerIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }

    const score = selectedAnswers.reduce((acc, answer, index) => {
      return answer === mockQuestions[index].correctAnswer ? acc + 1 : acc;
    }, 0);

    const result = getLevelFromScore(score);

    localStorage.setItem(
      "onboarding_test_result",
      JSON.stringify({
        score,
        total: mockQuestions.length,
        level: result.level,
        completedAt: new Date().toISOString(),
      }),
    );

    setResultData({
      score,
      total: mockQuestions.length,
      level: result.level,
      title: result.title,
      description: result.description,
    });

    localStorage.setItem("initialTestPassed", "true");
    setIsCompleted(true);
  };

  if (isCompleted && resultData) {
    const percentage = (resultData.score / resultData.total) * 100;

    return (
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(90deg, #dfe8f3 0%, #f1dfe8 100%)",
          p: 2,
        }}
      >
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />

        <Container
          maxWidth="lg"
          sx={{ mt: 4, position: "relative", zIndex: 1 }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            <Paper
              sx={{
                p: 4,
                borderRadius: "28px",
                background: "linear-gradient(0deg, #EEF2F7 0%, #B6A2FF 100%)",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" fontWeight={700}>
                Ваш результат 🏆
              </Typography>
              <Box
                sx={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  mx: "auto",
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(180deg, #f3f3f3 0%, rgba(9, 0, 255, 0.12) 100%)",
                }}
              >
                <Typography sx={{ fontSize: "4rem", fontWeight: 700 }}>
                  {resultData.score}
                </Typography>
                <Typography sx={{ fontSize: "2rem" }}>
                  з {resultData.total}
                </Typography>
              </Box>
              <Typography sx={{ mt: 3, fontSize: "2rem", fontWeight: 700 }}>
                {resultData.title}
              </Typography>
              <Typography sx={{ mt: 2, color: "#5b5b5b" }}>
                {resultData.description}
              </Typography>
            </Paper>

            <Paper
              sx={{
                p: 4,
                borderRadius: "28px",
                background:
                  "linear-gradient(159.05deg, #EAFFD2 1.7%, #E3D8FF 46.88%, #FFDCDD 98.58%)",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" fontWeight={700}>
                Рекомендований курс
              </Typography>
              <Typography sx={{ mt: 4, fontSize: "5rem", fontWeight: 800 }}>
                {resultData.level}
              </Typography>
              <Box
                sx={{
                  mt: 3,
                  height: 18,
                  borderRadius: 999,
                  background: "#fff",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${percentage}%`,
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #5eff72 0%, #d9ffd8 100%)",
                  }}
                />
              </Box>
              <Typography sx={{ mt: 3, color: "#5b5b5b" }}>
                Ви навчитеся впевнено спілкуватися в типових побутових
                ситуаціях, використовуючи розширений словниковий запас для опису
                свого оточення, роботи та планів.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/signup")}
                sx={{
                  mt: 4,
                  borderRadius: "999px",
                  px: 5,
                  background: "rgba(165, 142, 255, 1)",
                  fontWeight: "700",
                }}
              >
                Почати
              </Button>
            </Paper>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              m: 2,
              justifyContent: "center",
              background: "rgba(255,255,255,0.45)",
              p: 2,
              borderRadius: "20px",
            }}
          >
            {mockQuestions.map((question, index) => {
              const selected = selectedAnswers[index];
              const isCorrect = selected === question.correctAnswer;
              const isActive = index === currentQuestionIndex;

              let bg = "#ececec";

              if (selected !== -1) {
                bg = isCorrect ? "#b8e6b8" : "#f4c2c2";
              }

              if (isActive) {
                bg = "#8b6ff8";
              }

              return (
                <Box
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  sx={{
                    width: 28,
                    height: 28,
                    px: 1,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    backgroundColor: bg,
                    color: isActive ? "#fff" : "#333",
                    transition: "0.2s",
                    userSelect: "none",
                    transform: isActive ? "scale(1.06)" : "scale(1)",
                    boxShadow: isActive
                      ? "0 0 0 3px rgba(139,111,248,0.2)"
                      : "none",
                    "&:hover": {
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {index + 1}
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              p: 3,
              borderRadius: "24px",
              background: "rgba(255,255,255,0.65)",
            }}
          >
            <Typography sx={{ fontSize: "1.3rem", fontWeight: 700, mb: 2 }}>
              {mockQuestions[currentQuestionIndex].id}.{" "}
              {mockQuestions[currentQuestionIndex].question}
            </Typography>

            {mockQuestions[currentQuestionIndex].options.map(
              (option, index) => {
                const selected = selectedAnswers[currentQuestionIndex];
                const correct =
                  mockQuestions[currentQuestionIndex].correctAnswer;

                const isCorrect = index === correct;
                const isSelected = index === selected;
                const isWrongSelected = isSelected && index !== correct;

                let background = "#efefef";

                if (isCorrect) background = "#b8e6b8";
                if (isWrongSelected) background = "#f4c2c2";

                return (
                  <Box
                    key={option}
                    sx={{
                      mt: 1,
                      px: 3,
                      py: 1.5,
                      borderRadius: "999px",
                      backgroundColor: background,
                    }}
                  >
                    {String.fromCharCode(97 + index)}. {option}
                    {isSelected && " ← ваша відповідь"}
                    {isCorrect && " ✓ правильна"}
                  </Box>
                );
              },
            )}
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(118.62deg, rgba(220, 235, 255, 0.6) 8.05%, #E2E2E2 57.12%, rgba(255, 228, 249, 0.7) 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: "36px",
            background: "rgba(255,255,255,0.35)",
            p: { xs: 3, md: 5 },
          }}
        >
          <Grid>
            <Typography
              sx={{
                fontSize: { xs: "1.5rem", md: "1.5rem" },
                fontWeight: 800,
                color: "#676274",
                mb: 2,
              }}
            >
              Пройдіть онлайн-тест на рівень англійської
            </Typography>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 10,
                mb: 5,
                backgroundColor: "#e5e5e5",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#8b6ff8",
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mb: 4,
                justifyContent: "center",
              }}
            >
              {mockQuestions.map((_, index) => {
                const isActive = index === currentQuestionIndex;
                const isAnswered = selectedAnswers[index] !== -1;

                return (
                  <Box
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    sx={{
                      minWidth: 28,
                      height: 28,
                      px: 1,
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "0.2s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      userSelect: "none",
                      backgroundColor: isActive
                        ? "#8b6ff8"
                        : isAnswered
                          ? "#c7b9ff"
                          : "#d9d9d9",
                      color: isActive ? "#fff" : "#333",
                      transform: isActive ? "scale(1.06)" : "scale(1)",
                      boxShadow: isActive
                        ? "0 0 0 3px rgba(139,111,248,0.2)"
                        : "none",
                      "&:hover": {
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    {index + 1}
                  </Box>
                );
              })}
            </Box>

            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
                mb: 3,
              }}
            >
              {currentQuestion.id}. {currentQuestion.question}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {currentQuestion.options.map((option, index) => {
                const isSelected =
                  selectedAnswers[currentQuestionIndex] === index;

                return (
                  <Button
                    key={option}
                    onClick={() => handleSelectAnswer(index)}
                    sx={{
                      justifyContent: "flex-start",
                      px: 3,
                      py: 1.5,
                      borderRadius: "999px",
                      textTransform: "none",
                      fontSize: "1rem",
                      color: "#222",
                      backgroundColor: isSelected
                        ? "rgba(139,111,248,0.35)"
                        : "#efefef",
                    }}
                  >
                    {String.fromCharCode(97 + index)}. {option}
                  </Button>
                );
              })}
            </Box>

            <Button
              variant="contained"
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === -1}
              sx={{
                mt: 5,
                px: 5,
                py: 1.5,
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 800,
                fontSize: "1.2rem",
                display: "block",
                mx: "auto",
                background: "linear-gradient(90deg, #7a6df0 0%, #8b6ff8 100%)",
              }}
            >
              {currentQuestionIndex === mockQuestions.length - 1
                ? "Завершити тест"
                : "Наступне питання"}
            </Button>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};