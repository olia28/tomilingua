import React from "react";
import { Box, Typography } from "@mui/material";
//import Header from "../features/header/Header";
import questionMark from "../assets/question.png";

export const SupportPage: React.FC = () => {
  const marks = [
    { top: "35%", left: "8%", size: 110, rotate: "-15deg" },
    { top: "35%", right: "8%", size: 110, rotate: "15deg" },
    { top: "65%", left: "28%", size: 95, rotate: "-10deg" },
    { top: "65%", right: "28%", size: 95, rotate: "10deg" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        boxSizing: "border-box",
        p: 2,
        overflow: "hidden",
        background:
          "linear-gradient(112.68deg, #F6E6E8 0%, #E8DCF1 22.6%, #DDE3F6 44.23%, #DEF0F3 66.35%, #E4FBE6 88.46%), linear-gradient(0deg, rgba(237, 221, 237, 0.2), rgba(237, 221, 237, 0.2)), linear-gradient(0deg, rgba(234, 219, 221, 0.2), rgba(234, 219, 221, 0.2))",
      }}
    >

      {marks.map((mark, index) => (
        <Box
          key={index}
          component="img"
          src={questionMark}
          alt="question mark"
          sx={{
            position: "absolute",
            top: mark.top,
            left: mark.left,
            right: mark.right,
            width: mark.size * 2,
            height: mark.size * 2,
            objectFit: "contain",
            opacity: 0.65,
            transform: `rotate(${mark.rotate})`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      ))}

      <Typography
        sx={{
          fontSize: {
            xs: "48px",
            sm: "72px",
            md: "96px",
          },
          fontWeight: 700,
          display: "flex",
          margin: "64px auto 0 auto",
          lineHeight: 1.1,
          mb: 10,
          color: "#000",
        }}
      >
        Виникли питання?
      </Typography>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          px: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "18px",
              sm: "22px",
            },
            color: "#3A3A3A",
            lineHeight: 1.4,
            maxWidth: 420,
          }}
        >
          Наша електронна адреса:
          <br />
          tomilingua@gmail.com
          <br />
          Номер телефону:
          <br />
          +38 (067) 123 4567
        </Typography>
      </Box>
    </Box>
  );
};

export default SupportPage;
