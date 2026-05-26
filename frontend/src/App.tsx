import { CssBaseline, Box } from "@mui/material";
import { Outlet } from "react-router";
import Header from "./features/header/Header";
import "./App.css";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative" }}>
      <CssBaseline />
      
      <Box sx={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1100, 
        width: "100%" 
      }}>
        <Header />
      </Box>
      
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;