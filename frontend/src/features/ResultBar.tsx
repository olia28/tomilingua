import { Box, Typography } from "@mui/material";

export const ResultBar = ({
  score,
  total,
}: {
  score: number;
  total: number;
}) => {
  const wrong = total - score;
  const correctPercent = (score / total) * 100;
  const wrongPercent = (wrong / total) * 100;

  return (
    <Box
      sx={{
        width: 120,
        borderRadius: "20px",
        background: "#eee",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        transform: "translateX(0)",
        opacity: 1,
        transition: "all 0.4s ease",
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
            transition: "height 0.5s ease",
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
          transition: "height 0.5s ease",
        }}
      />

      <Typography
        sx={{
          position: "absolute",
          bottom: 10,
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
