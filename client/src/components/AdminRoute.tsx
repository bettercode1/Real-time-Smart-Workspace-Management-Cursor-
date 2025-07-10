import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Box, Typography, Button } from '@mui/material';
import { Lock, Home } from '@mui/icons-material';
import { Link } from 'wouter';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        p: 3
      }}>
        <Box sx={{
          textAlign: 'center',
          p: 6,
          backgroundColor: 'white',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          maxWidth: 500
        }}>
          <Box sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'error.light',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3
          }}>
            <Lock sx={{ fontSize: 40 }} />
          </Box>
          
          <Typography variant="h4" fontWeight={700} color="text.primary" mb={2}>
            Access Restricted
          </Typography>
          
          <Typography variant="body1" color="text.secondary" mb={4}>
            This page is only available to administrators. You don't have permission to access this area.
          </Typography>
          
          <Link to="/dashboard">
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<Home />}
              sx={{ borderRadius: 2 }}
            >
              Return to Dashboard
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;