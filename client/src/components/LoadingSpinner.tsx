import React from 'react';
import { Box, Typography, Fade, Skeleton, useTheme, alpha } from '@mui/material';
import { keyframes } from '@mui/system';

// Custom 3D Spinning Loader Animation - Your Exact Design
const customSpin = keyframes`
  0%, 100% {
    box-shadow: .2em 0px 0 0px currentcolor;
  }
  12% {
    box-shadow: .2em .2em 0 0 currentcolor;
  }
  25% {
    box-shadow: 0 .2em 0 0px currentcolor;
  }
  37% {
    box-shadow: -.2em .2em 0 0 currentcolor;
  }
  50% {
    box-shadow: -.2em 0 0 0 currentcolor;
  }
  62% {
    box-shadow: -.2em -.2em 0 0 currentcolor;
  }
  75% {
    box-shadow: 0px -.2em 0 0 currentcolor;
  }
  87% {
    box-shadow: .2em -.2em 0 0 currentcolor;
  }
`;

// Ultra-modern floating animation with elastic easing
const ultraFloat = keyframes`
  0% { 
    transform: translateY(0px) scale(1) rotateZ(0deg); 
    opacity: 0.9;
    filter: blur(0px);
  }
  25% { 
    transform: translateY(-8px) scale(1.05) rotateZ(2deg); 
    opacity: 1;
    filter: blur(0.5px);
  }
  50% { 
    transform: translateY(-12px) scale(1.08) rotateZ(0deg); 
    opacity: 1;
    filter: blur(0px);
  }
  75% { 
    transform: translateY(-8px) scale(1.05) rotateZ(-2deg); 
    opacity: 1;
    filter: blur(0.5px);
  }
  100% { 
    transform: translateY(0px) scale(1) rotateZ(0deg); 
    opacity: 0.9;
    filter: blur(0px);
  }
`;

// Dynamic gradient rotation with color shifting
const dynamicGradient = keyframes`
  0% { 
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
    background-position: 0% 50%; 
    transform: rotate(0deg) scale(1);
    filter: hue-rotate(0deg);
  }
  25% { 
    background: linear-gradient(135deg, #764ba2, #f093fb, #667eea);
    background-position: 100% 0%; 
    transform: rotate(90deg) scale(1.1);
    filter: hue-rotate(90deg);
  }
  50% { 
    background: linear-gradient(225deg, #f093fb, #667eea, #764ba2);
    background-position: 100% 100%; 
    transform: rotate(180deg) scale(1);
    filter: hue-rotate(180deg);
  }
  75% { 
    background: linear-gradient(315deg, #667eea, #764ba2, #f093fb);
    background-position: 0% 100%; 
    transform: rotate(270deg) scale(1.1);
    filter: hue-rotate(270deg);
  }
  100% { 
    background: linear-gradient(45deg, #667eea, #764ba2, #f093fb);
    background-position: 0% 50%; 
    transform: rotate(360deg) scale(1);
    filter: hue-rotate(360deg);
  }
`;

// Elastic wave animation for dots
const elasticWave = keyframes`
  0%, 80%, 100% {
    transform: translateY(0) scaleY(1) scaleX(1);
    opacity: 0.8;
  }
  20% {
    transform: translateY(-25px) scaleY(1.4) scaleX(0.8);
    opacity: 1;
  }
  40% {
    transform: translateY(-15px) scaleY(1.2) scaleX(0.9);
    opacity: 1;
  }
`;

// Liquid morphing animation
const liquidMorph = keyframes`
  0% { 
    border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
    transform: rotate(0deg) scale(1);
  }
  20% { 
    border-radius: 70% 30% 60% 40% / 50% 60% 40% 50%;
    transform: rotate(72deg) scale(1.1);
  }
  40% { 
    border-radius: 40% 60% 70% 30% / 60% 40% 50% 50%;
    transform: rotate(144deg) scale(0.9);
  }
  60% { 
    border-radius: 60% 40% 30% 70% / 40% 50% 60% 50%;
    transform: rotate(216deg) scale(1.2);
  }
  80% { 
    border-radius: 30% 70% 50% 50% / 50% 40% 60% 50%;
    transform: rotate(288deg) scale(0.8);
  }
  100% { 
    border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
    transform: rotate(360deg) scale(1);
  }
`;

// Advanced glow with multiple layers
const advancedGlow = keyframes`
  0% { 
    box-shadow: 
      0 0 10px rgba(99,102,241,0.4), 
      0 0 20px rgba(99,102,241,0.3),
      0 0 30px rgba(99,102,241,0.2),
      inset 0 0 10px rgba(99,102,241,0.1);
    filter: brightness(1);
  }
  33% { 
    box-shadow: 
      0 0 20px rgba(118,75,162,0.6), 
      0 0 35px rgba(118,75,162,0.4),
      0 0 50px rgba(118,75,162,0.3),
      inset 0 0 15px rgba(118,75,162,0.2);
    filter: brightness(1.2);
  }
  66% { 
    box-shadow: 
      0 0 25px rgba(240,147,251,0.7), 
      0 0 40px rgba(240,147,251,0.5),
      0 0 60px rgba(240,147,251,0.3),
      inset 0 0 20px rgba(240,147,251,0.2);
    filter: brightness(1.4);
  }
  100% { 
    box-shadow: 
      0 0 10px rgba(99,102,241,0.4), 
      0 0 20px rgba(99,102,241,0.3),
      0 0 30px rgba(99,102,241,0.2),
      inset 0 0 10px rgba(99,102,241,0.1);
    filter: brightness(1);
  }
`;

// Particle explosion effect
const particleFloat = keyframes`
  0% { 
    transform: translateY(0) translateX(0) scale(0.8); 
    opacity: 0; 
  }
  20% { 
    transform: translateY(-10px) translateX(5px) scale(1); 
    opacity: 1; 
  }
  80% { 
    transform: translateY(-30px) translateX(-5px) scale(1.2); 
    opacity: 1; 
  }
  100% { 
    transform: translateY(-50px) translateX(10px) scale(0.6); 
    opacity: 0; 
  }
`;

// 3D rotation with perspective
const rotation3D = keyframes`
  0% { 
    transform: perspective(200px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  25% { 
    transform: perspective(200px) rotateX(90deg) rotateY(45deg) rotateZ(90deg);
  }
  50% { 
    transform: perspective(200px) rotateX(180deg) rotateY(90deg) rotateZ(180deg);
  }
  75% { 
    transform: perspective(200px) rotateX(270deg) rotateY(135deg) rotateZ(270deg);
  }
  100% { 
    transform: perspective(200px) rotateX(360deg) rotateY(180deg) rotateZ(360deg);
  }
`;

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  variant?: 'modern' | 'liquid' | 'particle' | 'wave' | 'glow' | '3d' | 'fullscreen' | 'card' | 'custom';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export default function LoadingSpinner({ 
  size = 50, 
  message = 'Loading...', 
  variant = 'custom',
  color = 'primary' 
}: LoadingSpinnerProps) {
  const theme = useTheme();

  const getColorValue = (colorName: string) => {
    switch (colorName) {
      case 'primary': return theme.palette.primary.main;
      case 'secondary': return theme.palette.secondary.main;
      case 'success': return theme.palette.success.main;
      case 'warning': return theme.palette.warning.main;
      case 'error': return theme.palette.error.main;
      default: return theme.palette.primary.main;
    }
  };

  const renderLoader = () => {
    switch (variant) {
      case 'custom':
        return (
          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            {/* Main 3D Spinning Loader */}
            <Box
              sx={{
                position: 'relative',
                transform: 'rotateZ(45deg)',
                perspective: '1000px',
                borderRadius: '50%',
                width: size,
                height: size,
                color: '#fff',
                '&::before, &::after': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 'inherit',
                  height: 'inherit',
                  borderRadius: '50%',
                  transform: 'rotateX(70deg)',
                  animation: '1s spin linear infinite',
                },
                '&::after': {
                  color: '#FF3D00',
                  transform: 'rotateY(70deg)',
                  animationDelay: '0.4s',
                },
                '@keyframes spin': {
                  '0%, 100%': {
                    boxShadow: '.2em 0px 0 0px currentcolor',
                  },
                  '12%': {
                    boxShadow: '.2em .2em 0 0 currentcolor',
                  },
                  '25%': {
                    boxShadow: '0 .2em 0 0px currentcolor',
                  },
                  '37%': {
                    boxShadow: '-.2em .2em 0 0 currentcolor',
                  },
                  '50%': {
                    boxShadow: '-.2em 0 0 0 currentcolor',
                  },
                  '62%': {
                    boxShadow: '-.2em -.2em 0 0 currentcolor',
                  },
                  '75%': {
                    boxShadow: '0px -.2em 0 0 currentcolor',
                  },
                  '87%': {
                    boxShadow: '.2em -.2em 0 0 currentcolor',
                  },
                },
              }}
            />
            
            {/* Loading Message */}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                textAlign: 'center',
                animation: `${ultraFloat} 2s ease-in-out infinite`,
              }}
            >
              {message}
            </Typography>

            {/* Powered by Better Code */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 2,
                opacity: 0.7,
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.75rem',
                  fontWeight: 400,
                }}
              >
                Powered by
              </Typography>
              <Box
                component="img"
                src="/src/assets/bettercode-logo.png"
                alt="Better Code"
                sx={{
                  height: 16,
                  width: 'auto',
                  filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
                }}
              />
            </Box>
          </Box>
        );

      case 'modern':
        return (
          <Box
            sx={{
              width: size,
              height: size,
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${getColorValue(color)}, ${alpha(getColorValue(color), 0.7)})`,
              animation: `${dynamicGradient} 3s ease-in-out infinite`,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: size * 0.6,
                height: size * 0.6,
                borderRadius: '50%',
                background: theme.palette.background.paper,
                animation: `${ultraFloat} 2s ease-in-out infinite`,
              },
            }}
          />
        );

      case 'liquid':
        return (
          <Box
            sx={{
              width: size,
              height: size,
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${getColorValue(color)}, ${alpha(getColorValue(color), 0.8)})`,
              animation: `${liquidMorph} 4s ease-in-out infinite`,
              boxShadow: `0 0 20px ${alpha(getColorValue(color), 0.3)}`,
            }}
          />
        );

      case 'particle':
        return (
          <Box sx={{ position: 'relative', width: size, height: size }}>
            {[...Array(6)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: getColorValue(color),
                  animation: `${particleFloat} 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-20px)`,
                }}
              />
            ))}
          </Box>
        );

      case 'wave':
        return (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {[...Array(3)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: 4,
                  height: 20,
                  borderRadius: 2,
                  background: getColorValue(color),
                  animation: `${elasticWave} 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </Box>
        );

      case 'glow':
        return (
          <Box
            sx={{
              width: size,
              height: size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${getColorValue(color)}, ${alpha(getColorValue(color), 0.3)})`,
              animation: `${advancedGlow} 2s ease-in-out infinite`,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: size * 0.7,
                height: size * 0.7,
                borderRadius: '50%',
                background: theme.palette.background.paper,
                animation: `${ultraFloat} 1.5s ease-in-out infinite`,
              },
            }}
          />
        );

      case '3d':
        return (
          <Box
            sx={{
              width: size,
              height: size,
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${getColorValue(color)}, ${alpha(getColorValue(color), 0.7)})`,
              animation: `${rotation3D} 3s linear infinite`,
              boxShadow: `0 0 30px ${alpha(getColorValue(color), 0.4)}`,
            }}
          />
        );

      default:
        return (
          <Box
            sx={{
              width: size,
              height: size,
              borderRadius: '50%',
              border: `3px solid ${alpha(getColorValue(color), 0.2)}`,
              borderTop: `3px solid ${getColorValue(color)}`,
              animation: 'spin 1s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
        );
    }
  };

  if (variant === 'fullscreen') {
    return (
      <Fade in={true} timeout={300}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: alpha(theme.palette.background.default, 0.95),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            gap: 3,
          }}
        >
          {renderLoader()}
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            {message}
          </Typography>
        </Box>
      </Fade>
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
          borderRadius: 2,
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[1],
          border: `1px solid ${theme.palette.divider}`,
          gap: 2,
        }}
      >
        {renderLoader()}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            textAlign: 'center',
          }}
        >
          {message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {renderLoader()}
    </Box>
  );
}

export const LoadingCard = () => (
  <Box sx={{ p: 2 }}>
    <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 2 }} />
    <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="40%" height={20} />
  </Box>
);

export const LoadingTable = ({ rows = 5 }: { rows?: number }) => (
  <Box sx={{ p: 2 }}>
    {[...Array(rows)].map((_, i) => (
      <Box key={i} sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: 1 }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="70%" height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="50%" height={16} />
        </Box>
      </Box>
    ))}
  </Box>
);

export const LoadingStats = () => (
  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, p: 2 }}>
    {[...Array(4)].map((_, i) => (
      <Box key={i} sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Skeleton variant="text" width="40%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="60%" height={32} />
      </Box>
    ))}
  </Box>
);