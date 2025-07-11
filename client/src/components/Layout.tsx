import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import bettercodeLogo from '../assets/bettercode-logo.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh', 
      overflow: 'hidden', 
      width: '100%',
      maxWidth: '100%',
      backgroundColor: theme.palette.background.default,
    }}>
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}
      
      {/* Mobile Header */}
      <MobileHeader />
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          width: isMobile ? '100%' : 'calc(100% - 280px)',
          maxWidth: isMobile ? '100%' : 'calc(100% - 280px)',
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
            : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          position: 'relative',
          marginLeft: isMobile ? 0 : '280px',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'light'
              ? `
                radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.02) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.02) 0%, transparent 50%)
              `
              : `
                radial-gradient(circle at 20% 80%, rgba(96, 165, 250, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(129, 140, 248, 0.04) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(96, 165, 250, 0.03) 0%, transparent 50%)
              `,
            pointerEvents: 'none',
            zIndex: 0
          }
        }}
      >
        {/* Powered by BetterCode */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 24,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            background: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(30,41,59,0.9)',
            borderRadius: 20,
            px: 2,
            py: 0.75,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: `1px solid ${theme.palette.divider}`,
            fontSize: 13,
            fontWeight: 500,
            color: theme.palette.text.secondary,
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              background: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.95)' : 'rgba(30,41,59,0.95)',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }
          }}
          aria-label="Powered by BetterCode"
        >
          <span style={{ fontSize: 12, fontWeight: 500, marginRight: 4 }}>Powered by</span>
          <img
            src={bettercodeLogo}
            alt="BetterCode logo"
            style={{ height: 18, width: 'auto', display: 'inline-block', verticalAlign: 'middle' }}
          />
        </Box>
        
        {/* Content Container */}
        <Box 
          sx={{ 
            flex: 1, 
            overflow: 'auto',
            position: 'relative',
            zIndex: 1,
            pt: isMobile ? 8 : 0,
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 3, sm: 4, md: 5 },
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 