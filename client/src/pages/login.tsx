import React, { useState } from "react";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Divider,
  Stack,
  CircularProgress,
  Alert,
  useTheme,
  alpha
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "@/contexts/AuthContext";
import bettercodeLogo from '../assets/bettercode-logo.png';

export default function Login() {
  const { loginWithGoogle, loginWithDemo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await loginWithGoogle();
    } catch (error) {
      setError("Google login failed. Please try again.");
    }
    setLoading(false);
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await loginWithDemo();
    } catch (error) {
      setError("Demo login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: `radial-gradient(ellipse at 60% 0%, ${theme.palette.primary.light}10 0%, ${theme.palette.secondary.light}05 100%), linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        px: 2,
        position: 'relative',
        flexDirection: 'column'
      }}
    >
      {/* Powered by BetterCode (Top Right, Fixed) */}
      <Box
        sx={{
          position: 'fixed',
          top: 24,
          right: 32,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          background: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(30,41,59,0.85)',
          borderRadius: 999,
          px: 2,
          py: 0.5,
          boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
          border: `1px solid ${theme.palette.divider}`,
          fontSize: 14,
          fontWeight: 500,
          color: theme.palette.text.secondary,
          transition: 'background 0.2s',
          pointerEvents: 'auto',
        }}
        aria-label="Powered by BetterCode"
      >
        <span style={{ fontSize: 13, fontWeight: 500, marginRight: 6 }}>Powered by</span>
        <img
          src={bettercodeLogo}
          alt="BetterCode logo"
          style={{ height: 22, width: 'auto', display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }}
        />
        <span style={{ fontWeight: 700, fontSize: 14, color: '#222' }}></span>
      </Box>
      <Card sx={{ width: '100%', maxWidth: 420, p: 3, borderRadius: 4, boxShadow: '0 8px 32px rgba(99,102,241,0.10)' }}>
        <CardContent>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" fontWeight={600} color="primary" mb={1} sx={{ letterSpacing: 1 }}>
              SmartSpace
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
              Workspace Management System
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={3}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
              onClick={handleGoogleLogin}
              disabled={loading}
              sx={{ py: 1.5, fontWeight: 700, fontSize: '1rem', borderRadius: 2, boxShadow: '0 2px 8px rgba(99,102,241,0.08)' }}
            >
              {loading ? "Signing in..." : "Continue with Google (Admin)"}
            </Button>

            <Divider sx={{ fontWeight: 600, color: 'text.secondary' }}>OR</Divider>

            <Button
              variant="outlined"
              size="large"
              fullWidth
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonIcon />}
              onClick={handleDemoLogin}
              disabled={loading}
              sx={{ py: 1.5, fontWeight: 700, fontSize: '1rem', borderRadius: 2, borderWidth: 2, borderColor: alpha(theme.palette.primary.main, 0.2), '&:hover': { borderColor: theme.palette.primary.main } }}
            >
              {loading ? "Signing in..." : "Demo Login (User)"}
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary" textAlign="center" mt={3}>
            Access your smart office dashboard with real-time occupancy monitoring, booking system, and analytics.
          </Typography>
          {/* Demo Accounts info box removed */}
        </CardContent>
      </Card>
    </Box>
  );
}