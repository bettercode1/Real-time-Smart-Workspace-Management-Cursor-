import React from 'react';
import { Box, CircularProgress, Typography, Fade, Skeleton } from '@mui/material';
import { keyframes } from '@mui/system';

// Floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Pulse animation
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

// Gradient animation
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  variant?: 'circular' | 'linear' | 'dots' | 'card' | 'fullscreen';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export default function LoadingSpinner({ 
  size = 40, 
  message = 'Loading...', 
  variant = 'circular',
  color = 'primary' 
}: LoadingSpinnerProps) {
  
  if (variant === 'fullscreen') {
    return (
      <Fade in={true}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              animation: `${float} 3s ease-in-out infinite`,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899)',
                backgroundSize: '300% 300%',
                animation: `${gradientShift} 3s ease infinite`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(99,102,241,0.3)',
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress size={30} thickness={4} sx={{ color: '#6366f1' }} />
              </Box>
            </Box>
          </Box>
          
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              color: '#374151',
              animation: `${pulse} 2s ease-in-out infinite`,
            }}
          >
            {message}
          </Typography>
          
          <Box sx={{ mt: 1, display: 'flex', gap: 0.5 }}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#6366f1',
                  animation: `${pulse} 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </Box>
        </Box>
      </Fade>
    );
  }

  if (variant === 'dots') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: `${color}.main`,
                animation: `${pulse} 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </Box>
        {message && (
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === 'card') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          border: '1px solid rgba(99,102,241,0.1)',
        }}
      >
        <CircularProgress 
          size={size} 
          thickness={4}
          sx={{ 
            color: `${color}.main`,
            mb: 2,
            animation: `${float} 2s ease-in-out infinite`,
          }} 
        />
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          {message}
        </Typography>
      </Box>
    );
  }

  if (variant === 'linear') {
    return (
      <Box sx={{ width: '100%', mb: 2 }}>
        <Box
          sx={{
            height: 4,
            borderRadius: 2,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #6366f1)',
            backgroundSize: '300% 100%',
            animation: `${gradientShift} 2s ease infinite`,
          }}
        />
        {message && (
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ display: 'block', textAlign: 'center', mt: 1 }}
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  // Default circular variant
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 2 
      }}
    >
      <CircularProgress 
        size={size} 
        thickness={4}
        sx={{ 
          color: `${color}.main`,
          animation: `${float} 2s ease-in-out infinite`,
        }} 
      />
      {message && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}

// Skeleton loading components for specific use cases
export const LoadingCard = () => (
  <Box sx={{ p: 3, borderRadius: 4 }}>
    <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 2 }} />
    <Skeleton variant="text" height={32} width="60%" sx={{ mb: 1 }} />
    <Skeleton variant="text" height={24} width="40%" />
  </Box>
);

export const LoadingTable = ({ rows = 5 }: { rows?: number }) => (
  <Box>
    {Array.from({ length: rows }).map((_, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" height={24} width="80%" />
          <Skeleton variant="text" height={20} width="50%" />
        </Box>
      </Box>
    ))}
  </Box>
);

export const LoadingStats = () => (
  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
    {Array.from({ length: 4 }).map((_, index) => (
      <Box key={index} sx={{ flex: 1, minWidth: 200 }}>
        <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 4, mb: 1 }} />
      </Box>
    ))}
  </Box>
);