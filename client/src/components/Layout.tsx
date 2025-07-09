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
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', width: '100vw', maxWidth: '100vw' }}>
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
          width: '100vw',
          maxWidth: '100vw',
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
            : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          position: 'relative',
          paddingLeft: isMobile ? 0 : '280px', // Sidebar offset
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'light'
              ? `
                radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.04) 0%, transparent 50%)
              `
              : `
                radial-gradient(circle at 20% 80%, rgba(129, 140, 248, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(96, 165, 250, 0.06) 0%, transparent 50%)
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
            top: 18,
            right: 32,
            zIndex: 10,
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
            '&:hover': {
              background: theme.palette.mode === 'light' ? 'rgba(248,250,252,0.98)' : 'rgba(51,65,85,0.98)',
            }
          }}
          aria-label="Powered by BetterCode"
        >
          <span style={{ fontSize: 13, fontWeight: 500, marginRight: 6 }}>Powered by</span>
          <img
            src={bettercodeLogo}
            alt="BetterCode logo"
            style={{ height: 22, width: 'auto', display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }}
          />
          <span style={{ fontWeight: 700, fontSize: 14, color: '#222' }}>BetterCode</span>
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
            py: { xs: 2, sm: 3, md: 4 },
            width: '100vw',
            maxWidth: '100vw'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 