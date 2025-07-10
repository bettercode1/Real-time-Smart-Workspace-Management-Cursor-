import React from "react";
import {
  Box, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Chip,
  useTheme,
  alpha
} from "@mui/material";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import {
  Dashboard as DashboardIcon,
  Map as MapIcon,
  EventAvailable as BookingIcon,
  Analytics as AnalyticsIcon,
  Warning as AlertIcon,
  Settings as SettingsIcon,
  AdminPanelSettings as AdminIcon,
  Devices as DevicesIcon,
  People as UsersIcon,
  Room as RoomIcon,
  Air as IAQIcon,
  Logout as LogoutIcon,
  BusinessCenter,
  Person
} from "@mui/icons-material";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { language } = useSettings();
  const [location] = useLocation();
  const theme = useTheme();
  const t = translations[language];

  const adminMenuItems = [
    { text: t.dashboard, icon: <AdminIcon />, path: "/dashboard", color: "#667eea" },
    { text: t.floorPlan, icon: <MapIcon />, path: "/floor-plan", color: "#764ba2" },
    { text: t.bookings, icon: <BookingIcon />, path: "/bookings", color: "#f093fb" },
    { text: t.analytics, icon: <AnalyticsIcon />, path: "/analytics", color: "#4facfe" },
    { text: t.alerts, icon: <AlertIcon />, path: "/alerts", color: "#ff6b6b" },
    { text: t.devices, icon: <DevicesIcon />, path: "/devices", color: "#4ecdc4" },
    { text: t.users, icon: <UsersIcon />, path: "/users", color: "#45b7d1" },
    { text: t.rooms, icon: <RoomIcon />, path: "/rooms", color: "#96ceb4" },
    { text: t.iaq, icon: <IAQIcon />, path: "/iaq", color: "#ffeaa7" },
    { text: t.settings, icon: <SettingsIcon />, path: "/settings", color: "#dda0dd" },
  ];

  const userMenuItems = [
    { text: t.dashboard, icon: <DashboardIcon />, path: "/dashboard", color: "#667eea" },
    { text: t.floorPlan, icon: <MapIcon />, path: "/floor-plan", color: "#764ba2" },
    { text: t.bookings, icon: <BookingIcon />, path: "/bookings", color: "#f093fb" },
    { text: t.alerts, icon: <AlertIcon />, path: "/alerts", color: "#ff6b6b" },
    { text: t.settings, icon: <SettingsIcon />, path: "/settings", color: "#dda0dd" },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location === "/" || location === "/dashboard";
    }
    return location === path;
  };

  return (
    <Box
      sx={{
        width: 280,
        minWidth: 280,
        maxWidth: 280,
        flexShrink: 0,
        height: "100vh",
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)'
          : 'linear-gradient(180deg, #1a1a1a 0%, #0f172a 100%)',
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#334155'}`,
        boxShadow: theme.palette.mode === 'light' 
          ? '2px 0 20px rgba(0, 0, 0, 0.05)'
          : '2px 0 20px rgba(0, 0, 0, 0.3)',
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
        overflowY: 'auto',
        pb: 3,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.mode === 'light' ? '#cbd5e1' : '#475569',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: theme.palette.mode === 'light' ? '#94a3b8' : '#64748b',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
              },
            }}
          >
            <BusinessCenter 
              sx={{ 
                color: '#ffffff',
                fontSize: 28,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              }} 
            />
          </Box>
          <Box>
            <Typography 
              variant="h5" 
              fontWeight={800} 
              sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                mb: 0.5,
              }}
            >
              SmartSpace
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 600,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Workspace Management
            </Typography>
          </Box>
        </Box>

        {/* User Info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 3,
            borderRadius: 3,
            background: theme.palette.mode === 'light' 
              ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
              : 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
            border: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#475569'}`,
            boxShadow: theme.palette.mode === 'light'
              ? '0 4px 20px rgba(0, 0, 0, 0.08)'
              : '0 4px 20px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.palette.mode === 'light'
                ? '0 8px 30px rgba(0, 0, 0, 0.12)'
                : '0 8px 30px rgba(0, 0, 0, 0.4)',
            },
          }}
        >
          <Avatar 
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#ffffff',
              width: 48,
              height: 48,
              fontSize: 18,
              fontWeight: 700,
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
            }}
          >
            {user?.displayName?.charAt(0) || <Person />}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="subtitle1" 
              fontWeight={700} 
              sx={{ 
                color: theme.palette.text.primary,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                mb: 0.5,
              }}
            >
              {user?.displayName || "Guest User"}
            </Typography>
            <Chip 
              label={user?.role === 'admin' ? t.admin : t.user} 
              size="small" 
              sx={{ 
                background: user?.role === 'admin' 
                  ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
                  : 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.7rem',
                height: 22,
                borderRadius: 1.5,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }} 
            />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ 
        borderColor: theme.palette.mode === 'light' ? '#e2e8f0' : '#334155', 
        mx: 3,
        borderWidth: '1px',
      }} />

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, px: 2, py: 3, position: 'relative', zIndex: 1 }}>
        <List sx={{ py: 1 }}>
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <ListItem
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  background: active 
                    ? `linear-gradient(135deg, ${alpha(item.color, 0.1)} 0%, ${alpha(item.color, 0.05)} 100%)`
                    : 'transparent',
                  border: active 
                    ? `2px solid ${item.color}` 
                    : `1px solid transparent`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${alpha(item.color, 0.08)} 0%, ${alpha(item.color, 0.03)} 100%)`,
                    border: `1px solid ${alpha(item.color, 0.3)}`,
                    transform: 'translateX(4px)',
                    boxShadow: `0 4px 15px ${alpha(item.color, 0.15)}`,
                  },
                  '&::before': active ? {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 4,
                    height: '60%',
                    background: `linear-gradient(180deg, ${item.color} 0%, ${alpha(item.color, 0.7)} 100%)`,
                    borderRadius: '0 2px 2px 0',
                    boxShadow: `0 0 10px ${alpha(item.color, 0.5)}`,
                  } : {},
                  textDecoration: "none",
                  color: "inherit",
                  p: 2,
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: active ? item.color : theme.palette.text.secondary,
                    minWidth: 44,
                    transition: 'all 0.3s ease',
                    '& .MuiSvgIcon-root': {
                      fontSize: 22,
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    fontWeight: active ? 700 : 600,
                    color: active 
                      ? item.color
                      : theme.palette.text.primary,
                    letterSpacing: active ? '0.5px' : '0.2px',
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ 
        borderColor: theme.palette.mode === 'light' ? '#e2e8f0' : '#334155', 
        mx: 3,
        borderWidth: '1px',
      }} />

      {/* Logout */}
      <Box sx={{ p: 2, pb: 3, position: 'relative', zIndex: 1 }}>
        <ListItem
          onClick={logout}
          sx={{
            borderRadius: 3,
            cursor: "pointer",
            transition: 'all 0.3s ease',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
            border: '2px solid transparent',
            p: 2,
            '&:hover': {
              background: 'linear-gradient(135deg, #ff5252 0%, #d84315 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
            },
            color: '#ffffff',
            fontWeight: 700,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            },
            '&:hover::before': {
              opacity: 1,
            },
          }}
        >
          <ListItemIcon sx={{ 
            color: '#ffffff', 
            minWidth: 44,
            '& .MuiSvgIcon-root': {
              fontSize: 22,
            },
          }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary={t.logout}
            primaryTypographyProps={{
              fontSize: "0.9rem",
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '0.5px',
            }}
          />
        </ListItem>
      </Box>
    </Box>
  );
};

export default Sidebar;