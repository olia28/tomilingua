import { Card, Box, Typography, CircularProgress } from "@mui/material";

type SmallStatCardProps = {
  label: string;
  value: string;
  color?: string;
  progress?: number; 
};

export const SmallStatCard = ({
  label,
  value,
  color,
  progress,
}: SmallStatCardProps) => (
  <Card
    sx={{
      borderRadius: "20px",
      px: 2.5,
      py: 1.5,
      minWidth: 160,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Box>
      <Typography fontSize={12} color="#8c8796">
        {label}
      </Typography>

      <Typography fontSize={28} fontWeight={700} color={color || "inherit"}>
        {value}
      </Typography>
    </Box>

    {progress !== undefined && (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={56}
          thickness={5}
          sx={{
            color: "#e0e0e0",
            position: "absolute",
            left: 0,
          }}
        />

        <CircularProgress
          variant="determinate"
          value={progress}
          size={56}
          thickness={5}
          sx={{
            color: color || "#7a6df0",
            "& .MuiCircularProgress-circle": {
              strokeLinecap: "round",
            },
          }}
        />
      </Box>
    )}
  </Card>
);
