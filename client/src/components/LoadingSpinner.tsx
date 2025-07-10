import React from 'react';
import { Box, CircularProgress, Typography, Fade, Skeleton } from '@mui/material';
import { keyframes } from '@mui/system';

// Modern floating animation with easing
const float = keyframes`
  0% { 
    transform: translateY(0px) scale(1); 
    opacity: 0.8;
  }
  50% { 
    transform: translateY(-15px) scale(1.02); 
    opacity: 1;
  }
  100% { 
    transform: translateY(0px) scale(1); 
    opacity: 0.8;
  }
`;

// Smooth pulse with scaling
const pulse = keyframes`
  0% { 
    transform: scale(0.8); 
    opacity: 0.6; 
  }
  50% { 
    transform: scale(1.2); 
    opacity: 1; 
  }
  100% { 
    transform: scale(0.8); 
    opacity: 0.6; 
  }
`;

// Enhanced gradient animation
const gradientShift = keyframes`
  0% { 
    background-position: 0% 50%; 
    transform: rotate(0deg);
  }
  25% { 
    background-position: 100% 0%; 
    transform: rotate(90deg);
  }
  50% { 
    background-position: 100% 50%; 
    transform: rotate(180deg);
  }
  75% { 
    background-position: 0% 100%; 
    transform: rotate(270deg);
  }
  100% { 
    background-position: 0% 50%; 
    transform: rotate(360deg);
  }
`;

// Wave animation for dots
const wave = keyframes`
  0%, 60%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.7;
  }
  30% {
    transform: translateY(-20px) scale(1.3);
    opacity: 1;
  }
`;

// Morphing shape animation
const morph = keyframes`
  0% { 
    border-radius: 50% 50% 50% 50%;
    transform: rotate(0deg) scale(1);
  }
  25% { 
    border-radius: 60% 40% 60% 40%;
    transform: rotate(90deg) scale(1.1);
  }
  50% { 
    border-radius: 40% 60% 40% 60%;
    transform: rotate(180deg) scale(1);
  }
  75% { 
    border-radius: 60% 40% 60% 40%;
    transform: rotate(270deg) scale(1.1);
  }
  100% { 
    border-radius: 50% 50% 50% 50%;
    transform: rotate(360deg) scale(1);
  }
`;

// Glow effect
const glow = keyframes`
  0% { 
    box-shadow: 0 0 5px rgba(99,102,241,0.3), 0 0 10px rgba(99,102,241,0.2), 0 0 15px rgba(99,102,241,0.1);
  }
  50% { 
    box-shadow: 0 0 20px rgba(99,102,241,0.6), 0 0 30px rgba(99,102,241,0.4), 0 0 40px rgba(99,102,241,0.3);
  }
  100% { 
    box-shadow: 0 0 5px rgba(99,102,241,0.3), 0 0 10px rgba(99,102,241,0.2), 0 0 15px rgba(99,102,241,0.1);
  }
`;

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  variant?: 'circular' | 'linear' | 'dots' | 'card' | 'fullscreen' | 'modern' | 'wave' | 'morph' | 'glow';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export default function LoadingSpinner({ 
  size = 40, 
  message = 'Loading...', 
  variant = 'modern',
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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            backgroundSize: '400% 400%',
            animation: `${gradientShift} 6s ease infinite`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              animation: `${float} 4s ease-in-out infinite`,
              mb: 4,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                background: 'linear-gradient(45deg, #ffffff, #f8fafc, #e0e7ff)',
                backgroundSize: '200% 200%',
                animation: `${morph} 4s ease-in-out infinite, ${glow} 2s ease-in-out infinite`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  backgroundColor: '#6366f1',
                  borderRadius: '50%',
                  animation: `${pulse} 1s ease-in-out infinite`,
                }}
              />
            </Box>
          </Box>
          
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              animation: `${float} 3s ease-in-out infinite`,
              mb: 2,
            }}
          >
            {message}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 3,
                  height: 16,
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.8)',
                  animation: `${wave} 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </Box>
        </Box>
      </Fade>
    );
  }

  if (variant === 'modern') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: size,
            height: size,
            background: 'linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899, #6366f1)',
            backgroundSize: '300% 300%',
            animation: `${morph} 3s ease-in-out infinite, ${gradientShift} 4s ease infinite`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: size * 0.6,
              height: size * 0.6,
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: '50%',
              animation: `${pulse} 2s ease-in-out infinite`,
            }}
          />
        </Box>
        {message && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === 'wave') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'end', gap: 0.5 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              sx={{
                width: 4,
                height: 20,
                borderRadius: 2,
                background: `linear-gradient(180deg, #6366f1, #8b5cf6)`,
                animation: `${wave} 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </Box>
        {message && (
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === 'glow') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
            animation: `${glow} 2s ease-in-out infinite, ${float} 3s ease-in-out infinite`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: size * 0.5,
              height: size * 0.5,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.9)',
              animation: `${pulse} 1.5s ease-in-out infinite`,
            }}
          />
        </Box>
        {message && (
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === 'dots') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: `linear-gradient(45deg, #6366f1, #8b5cf6)`,
                animation: `${wave} 1.8s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
              }}
            />
          ))}
        </Box>
        {message && (
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
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
            height: 6,
            borderRadius: 3,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #6366f1)',
            backgroundSize: '400% 100%',
            animation: `${gradientShift} 3s ease infinite`,
            boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: `${gradientShift} 1.5s ease infinite`,
            }
          }}
        />
        {message && (
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              display: 'block', 
              textAlign: 'center', 
              mt: 1,
              fontWeight: 500 
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  // Default circular variant with modern styling
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2 
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `3px solid rgba(99,102,241,0.2)`,
          borderTop: `3px solid #6366f1`,
          animation: `${gradientShift} 1s linear infinite, ${glow} 2s ease-in-out infinite`,
          position: 'relative',
        }}
      />
      {message && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontWeight: 600 }}
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