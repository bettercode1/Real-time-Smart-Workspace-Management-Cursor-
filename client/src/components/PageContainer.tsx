import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface PageContainerProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string | number;
}

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  description,
  children,
  maxWidth = 1400
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: '100%',
        width: '100%',
        maxWidth: '100%',
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
          : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        py: { xs: 3, md: 4 },
        px: { xs: 2, md: 3 },
        overflowX: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === 'light'
            ? `
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.02) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.02) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.01) 0%, transparent 50%)
            `
            : `
              radial-gradient(circle at 20% 80%, rgba(96, 165, 250, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(129, 140, 248, 0.02) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(96, 165, 250, 0.02) 0%, transparent 50%)
            `,
          pointerEvents: 'none',
          zIndex: 0
        }
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          overflowX: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h1" fontWeight={700} color="text.primary" sx={{ mb: 1, fontSize: { xs: 32, md: 40 } }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default PageContainer; 