import {
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export const SectionCard = ({
  title,
  emoji,
  description,
  progress,
  total,
  gradient,
  color,
  onClick,
}: {
  title: string;
  emoji: string;
  description: string;
  progress: number;
  total: number;
  gradient: string;
  color: string;
  onClick?: () => void;
}) => {
  return (
    <Card
      onClick={onClick}
      elevation={3}
      sx={{
        borderRadius: "28px",
        background: gradient,
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.15s ease",
        "&:hover": onClick
          ? {
              transform: "scale(1.02)",
            }
          : {},
      }}
    >
      <CardContent sx={{ p: 3, color: color }}>
        <Box sx={{ display: "flex" }}>
          <Typography
            fontSize={28}
            fontWeight={700}
            sx={{ textDecoration: "underline", display: "flex" }}
          >
            {title}
          </Typography>
          <Typography fontSize={28}>{emoji}</Typography>
        </Box>

        <Typography sx={{ mt: 1.5, opacity: 0.9, maxWidth: 260 }}>
          {description}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <LinearProgress
            variant="determinate"
            value={(progress / total) * 100}
            sx={{
              height: 10,
              borderRadius: "999px",
              backgroundColor: "rgba(255,255,255,0.35)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#6ef3a5",
              },
            }}
          />

          <Typography sx={{ mt: 1, fontWeight: 600 }}>
            {progress}/{total}
          </Typography>
        </Box>

        <IconButton
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            background: "#fff",
            boxShadow: 2,
          }}
        >
          <PlayArrowIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};
