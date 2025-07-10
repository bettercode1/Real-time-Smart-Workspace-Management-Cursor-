import React from 'react';
import { Box, Typography, Fade, Skeleton, useTheme, alpha } from '@mui/material';
import { keyframes } from '@mui/system';

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
  variant?: 'modern' | 'liquid' | 'particle' | 'wave' | 'glow' | '3d' | 'fullscreen' | 'card';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export default function LoadingSpinner({ 
  size = 50, 
  message = 'Loading...', 
  variant = 'modern',
  color = 'primary' 
}: LoadingSpinnerProps) {
  const theme = useTheme();
  
  const getColorValue = (colorName: string) => {
    switch(colorName) {
      case 'primary': return theme.palette.primary.main;
      case 'secondary': return theme.palette.secondary.main;
      case 'success': return theme.palette.success.main;
      case 'warning': return theme.palette.warning.main;
      case 'error': return theme.palette.error.main;
      default: return theme.palette.primary.main;
    }
  };

  const colorValue = getColorValue(color);
  
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
            background: `
              linear-gradient(45deg, 
                ${alpha(theme.palette.primary.main, 0.1)}, 
                ${alpha(theme.palette.secondary.main, 0.1)}, 
                ${alpha(theme.palette.primary.light, 0.1)}
              )
            `,
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              animation: `${ultraFloat} 3s ease-in-out infinite`,
              mb: 4,
              position: 'relative',
            }}
          >
            <LoadingSpinner variant="modern" size={80} message="" />
          </Box>
          <Typography 
            variant="h5" 
            fontWeight={600}
            sx={{ 
              color: theme.palette.primary.main,
              animation: `${ultraFloat} 3s ease-in-out infinite`,
              animationDelay: '0.5s'
            }}
          >
            {message}
          </Typography>
        </Box>
      </Fade>
    );
  }

  if (variant === 'modern') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: size,
            height: size,
            background: `linear-gradient(45deg, ${colorValue}, ${alpha(colorValue, 0.6)}, ${theme.palette.secondary.main})`,
            backgroundSize: '300% 300%',
            borderRadius: '50%',
            animation: `${dynamicGradient} 3s ease-in-out infinite, ${ultraFloat} 2s ease-in-out infinite`,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '80%',
              height: '80%',
              background: `linear-gradient(135deg, ${alpha('#ffffff', 0.3)}, transparent)`,
              borderRadius: '50%',
              animation: `${rotation3D} 4s linear infinite`,
            }
          }}
        />
        {message && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontWeight: 600,
              animation: `${ultraFloat} 2s ease-in-out infinite`,
              animationDelay: '0.3s'
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === 'liquid') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: size,
            height: size,
            background: `linear-gradient(45deg, ${colorValue}, ${theme.palette.secondary.main})`,
            animation: `${liquidMorph} 4s ease-in-out infinite`,
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(45deg, transparent, ${alpha('#ffffff', 0.3)}, transparent)`,
              animation: `${dynamicGradient} 2s linear infinite`,
            }
          }}
        />
        {message && (
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === 'wave') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'end' }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              sx={{
                width: size / 5,
                height: size / 3,
                backgroundColor: colorValue,
                borderRadius: 2,
                animation: `${elasticWave} 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </Box>
        {message && (
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === 'glow') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: size,
            height: size,
            background: `radial-gradient(circle, ${colorValue}, ${alpha(colorValue, 0.3)})`,
            borderRadius: '50%',
            animation: `${advancedGlow} 2s ease-in-out infinite, ${ultraFloat} 3s ease-in-out infinite`,
            position: 'relative',
          }}
        />
        {message && (
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === 'particle') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Box sx={{ position: 'relative', width: size, height: size }}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: size * 0.6,
              height: size * 0.6,
              backgroundColor: colorValue,
              borderRadius: '50%',
              animation: `${rotation3D} 3s linear infinite`,
            }}
          />
          {[...Array(8)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 6,
                height: 6,
                backgroundColor: alpha(colorValue, 0.7),
                borderRadius: '50%',
                animation: `${particleFloat} 2s ease-in-out infinite`,
                animationDelay: `${i * 0.25}s`,
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-${size/2}px)`,
                transformOrigin: '50% 50%',
              }}
            />
          ))}
        </Box>
        {message && (
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  if (variant === '3d') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: size,
            height: size,
            background: `linear-gradient(45deg, ${colorValue}, ${theme.palette.secondary.main})`,
            animation: `${rotation3D} 3s linear infinite`,
            borderRadius: 2,
            transformStyle: 'preserve-3d',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '80%',
              height: '80%',
              background: `linear-gradient(135deg, ${alpha('#ffffff', 0.4)}, transparent)`,
              borderRadius: 2,
            }
          }}
        />
        {message && (
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <LoadingSpinner variant="modern" size={size} message="" color={color} />
      {message && (
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

// Card loading skeleton
export const LoadingCard = () => (
  <Box sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
    <Skeleton variant="rectangular" width="100%" height={140} sx={{ borderRadius: 2, mb: 2 }} />
    <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="60%" height={20} />
  </Box>
);

// Table loading skeleton
export const LoadingTable = ({ rows = 5 }: { rows?: number }) => (
  <Box>
    {[...Array(rows)].map((_, i) => (
      <Box key={i} sx={{ display: 'flex', gap: 2, py: 2, alignItems: 'center' }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="70%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="50%" height={16} />
        </Box>
        <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
      </Box>
    ))}
  </Box>
);

// Stats loading skeleton
export const LoadingStats = () => (
  <Box sx={{ display: 'flex', gap: 3 }}>
    {[...Array(4)].map((_, i) => (
      <Box key={i} sx={{ flex: 1, p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={20} />
      </Box>
    ))}
  </Box>
);