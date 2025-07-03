import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
  Alert,
  CircularProgress,
  Grid,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Google as GoogleIcon,
  AdminPanelSettings,
  Group,
  Person,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const success = await login(username, password);
      if (!success) {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const success = await loginWithGoogle();
      if (!success) {
        setError("Google login failed. Please try again.");
      }
    } catch (error) {
      setError("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoUsername: string, demoPassword: string) => {
    setIsLoading(true);
    setError("");
    
    try {
      const success = await login(demoUsername, demoPassword);
      if (!success) {
        setError("Demo login failed");
      }
    } catch (error) {
      setError("Demo login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'grey.100',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Card 
        sx={{ 
          maxWidth: 480, 
          width: '100%',
          boxShadow: 3,
          borderRadius: 3
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 1
              }}
            >
              SmartSpace
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Workplace Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to access your workspace
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mb: 2, py: 1.5 }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          {/* Google Login */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={isLoading}
            sx={{ mb: 3, py: 1.5 }}
          >
            Continue with Google
          </Button>

          <Divider sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              DEMO ACCOUNTS
            </Typography>
          </Divider>

          {/* Demo Login Buttons */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  bgcolor: 'grey.50',
                  mb: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <Chip
                    icon={<AdminPanelSettings />}
                    label="Administrator"
                    color="error"
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Full system access and management
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => handleDemoLogin("admin", "admin123")}
                  disabled={isLoading}
                >
                  Login as Admin
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  bgcolor: 'grey.50',
                  mb: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <Chip
                    icon={<Group />}
                    label="Manager"
                    color="warning"
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Team management and analytics access
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  onClick={() => handleDemoLogin("jane.smith", "manager123")}
                  disabled={isLoading}
                >
                  Login as Manager
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  bgcolor: 'grey.50'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <Chip
                    icon={<Person />}
                    label="User"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Standard user with booking access
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleDemoLogin("john.doe", "user123")}
                  disabled={isLoading}
                >
                  Login as User
                </Button>
              </Paper>
            </Grid>
          </Grid>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="caption" color="text.secondary">
              Demo credentials are provided for testing purposes
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}