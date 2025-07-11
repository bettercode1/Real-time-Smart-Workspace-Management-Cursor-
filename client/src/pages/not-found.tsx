import React from "react";
import { Box, Typography, Button, Paper, useTheme, alpha } from "@mui/material";
import { useLocation } from "wouter";
import { Home, ArrowBack } from "@mui/icons-material";

export default function NotFoundPage() {
  const [, navigate] = useLocation();
  const theme = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      width: '100vw',
      background: `radial-gradient(ellipse at 60% 0%, ${theme.palette.primary.light}10 0%, ${theme.palette.secondary.light}05 100%), linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4,
      px: 2
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 6, 
          borderRadius: 4,
          textAlign: 'center',
          maxWidth: 500,
          backgroundColor: 'background.paper',
          boxShadow: '0 8px 32px rgba(99,102,241,0.10)'
        }}
      >
        <Typography variant="h1" fontWeight={900} color="primary.main" mb={2} sx={{ fontSize: { xs: 64, md: 96 }, letterSpacing: 2 }}>
          404
        </Typography>
        <Typography variant="h4" fontWeight={700} mb={2}>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          The Page You're Looking For Doesn't Exist or Has Been Moved.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            startIcon={<Home />}
            onClick={() => navigate('/dashboard')}
            sx={{ fontWeight: 700, borderRadius: 2, px: 3, py: 1 }}
          >
            Go to Dashboard
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<ArrowBack />}
            onClick={() => window.history.back()}
            sx={{ fontWeight: 700, borderRadius: 2, px: 3, py: 1 }}
          >
            Go Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
