import React from "react";
import {
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Paper,
} from "@mui/material";
import logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!localStorage.getItem("token");

  const isAuthPage = ["/signup", "/login"].includes(location.pathname);
  const isSupportPage = ["/support"].includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    navigate("/login");
  };

  return (
    <Container maxWidth={false} sx={{ pt: 1 }}>
      <Paper
        elevation={2}
        sx={{
          borderRadius: "40px",
          px: 3,
          py: 0.4,
          backgroundColor: "#f7f4f7",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: "48px !important",
            px: 0,
          }}
        >
          <Box sx={{ flex: 1 }}>
            {!isSupportPage && (
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ 
                  color: "#00000099", 
                  fontSize: "18px", 
                  mx: 2,
                  cursor: "pointer" 
                }}
                onClick={() => navigate("/support")}
              >
                Support
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="tomiLingua"
              onClick={() => navigate("/dashboard")}
              sx={{
                paddingTop: "10px",
                width: "100%",
                maxWidth: "100px",
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              alignItems: "center",
            }}
          >
            {!isAuthPage && (
              isAuthenticated ? (
                <>
                  <Button
                    color="inherit"
                    sx={{ fontWeight: 600, fontSize: "17px", textTransform: "none" }}
                    onClick={() => navigate("/learning")}
                  >
                    Course
                  </Button>
                  <Button
                    color="inherit"
                    sx={{ fontWeight: 600, fontSize: "17px", textTransform: "none" }}
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </Button>
                  
                  <Button
                    onClick={handleLogout}
                    sx={{ 
                      fontWeight: 600, 
                      fontSize: "17px", 
                      textTransform: "none",
                      color: "#000",
                      "&:hover": {
                        backgroundColor: "rgba(211, 47, 47, 0.04)"
                      }
                    }}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    sx={{ fontWeight: 600, fontSize: "17px" }}
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "999px",
                      fontSize: "16px",
                      px: 2,
                      py: 0.3,
                      textTransform: "none",
                      backgroundColor: "#000",
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up →
                  </Button>
                </>
              )
            )}
          </Box>
        </Toolbar>
      </Paper>
    </Container>
  );
};

export default Header;