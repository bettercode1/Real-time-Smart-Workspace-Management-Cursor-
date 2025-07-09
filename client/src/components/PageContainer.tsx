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
        minHeight: '100vh',
        width: '100vw',
        background: `radial-gradient(ellipse at 60% 0%, ${theme.palette.primary.light}10 0%, ${theme.palette.secondary.light}05 100%), linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        py: { xs: 2, md: 4 },
        px: { xs: 1, md: 3 },
        overflowX: 'hidden',
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
        }}
      >
        {title && (
          <Typography variant="h4" fontWeight={800} mb={1}>
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="body1" color="text.secondary" mb={3}>
            {description}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
};

export default PageContainer; 