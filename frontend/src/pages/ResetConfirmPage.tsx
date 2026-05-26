import { useState } from "react";
import { useParams, useNavigate } from 'react-router'; 
import { Box, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

export const ResetConfirmPage = () => {
    const { uid, token } = useParams<{ uid: string; token: string }>();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

    const handleConfirm = async () => {
        try {
            const response = await axios.post("/api/password-reset/confirm/", {
                uid: uid,
                token: token
            });
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('firstName', response.data.first_name || "Olha");
            }

            setStatus('success');
            
            setTimeout(() => {
                navigate('/learning');
            }, 2000);

        } catch (error) {
            console.error("Password reset confirmation error:", error);
            setStatus('error');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 3 }}>
            <Typography variant="h5" sx={{ color: "#4A4A4A", fontWeight: 500 }}>
                Підтвердження входу в Tomilingua
            </Typography>
            
            {status === 'loading' && (
                <Button 
                    variant="contained" 
                    onClick={handleConfirm} 
                    sx={buttonStyles}
                >
                    Підтвердити та увійти
                </Button>
            )}

            {status === 'success' && (
                <Alert severity="success" sx={{ borderRadius: "12px" }}>
                    Вхід успішно підтверджено! Перенаправлення на賦платформу...
                </Alert>
            )}

            {status === 'error' && (
                <Typography color="error" sx={{ fontWeight: 500 }}>
                    Посилання недійсне, застаріло або сервер недоступний.
                </Typography>
            )}
        </Box>
    );
};

const buttonStyles = {
  py: 1.5,
  px: 4,
  borderRadius: "999px",
  textTransform: "none",
  fontWeight: 700,
  fontSize: "1.05rem",
  background: "linear-gradient(90deg, #6F63F6 0%, #8A73FF 100%)",
  boxShadow: "0 6px 18px rgba(111, 99, 246, 0.35)",
  "&:hover": {
    background: "linear-gradient(90deg, #7A6EFF 0%, #927CFF 100%)",
  },
};