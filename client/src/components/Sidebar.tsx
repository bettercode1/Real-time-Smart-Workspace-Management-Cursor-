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
    { text: t.dashboard, icon: <AdminIcon />, path: "/dashboard", color: "#3b82f6" },
    { text: t.floorPlan, icon: <MapIcon />, path: "/floor-plan", color: "#6366f1" },
    { text: t.bookings, icon: <BookingIcon />, path: "/bookings", color: "#8b5cf6" },
    { text: t.analytics, icon: <AnalyticsIcon />, path: "/analytics", color: "#06b6d4" },
    { text: t.alerts, icon: <AlertIcon />, path: "/alerts", color: "#ef4444" },
    { text: t.devices, icon: <DevicesIcon />, path: "/devices", color: "#10b981" },
    { text: t.users, icon: <UsersIcon />, path: "/users", color: "#f59e0b" },
    { text: t.rooms, icon: <RoomIcon />, path: "/rooms", color: "#84cc16" },
    { text: t.iaq, icon: <IAQIcon />, path: "/iaq", color: "#06b6d4" },
    { text: t.settings, icon: <SettingsIcon />, path: "/settings", color: "#64748b" },
  ];

  const userMenuItems = [
    { text: t.dashboard, icon: <DashboardIcon />, path: "/dashboard", color: "#3b82f6" },
    { text: t.floorPlan, icon: <MapIcon />, path: "/floor-plan", color: "#6366f1" },
    { text: t.bookings, icon: <BookingIcon />, path: "/bookings", color: "#8b5cf6" },
    { text: t.alerts, icon: <AlertIcon />, path: "/alerts", color: "#ef4444" },
    { text: t.settings, icon: <SettingsIcon />, path: "/settings", color: "#64748b" },
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
          ? 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
          : 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        borderRight: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.palette.mode === 'light' 
          ? '1px 0 3px rgba(0, 0, 0, 0.05)'
          : '1px 0 3px rgba(0, 0, 0, 0.2)',
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
        overflowY: 'auto',
        pb: 3,
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
              },
            }}
          >
            <BusinessCenter 
              sx={{ 
                color: '#ffffff',
                fontSize: 24,
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
              }} 
            />
          </Box>
          <Box>
            <Typography 
              variant="h6" 
              fontWeight={700} 
              sx={{ 
                background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.01em',
                mb: 0.5,
              }}
            >
              SmartSpace
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
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
            p: 2.5,
            borderRadius: 2,
            background: theme.palette.mode === 'light' 
              ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
              : 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.palette.mode === 'light'
              ? '0 1px 3px rgba(0, 0, 0, 0.05)'
              : '0 1px 3px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: theme.palette.mode === 'light'
                ? '0 2px 6px rgba(0, 0, 0, 0.08)'
                : '0 2px 6px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)} 0%, ${alpha(theme.palette.secondary.main, 0.8)} 100%)`,
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 0.25,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user?.displayName || user?.email || 'User'}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 500,
                textTransform: 'capitalize',
              }}
            >
              {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : 'User'}
            </Typography>
          </Box>
          <Chip
            label={user?.role === 'admin' ? 'Admin' : 'User'}
            size="small"
            sx={{
              backgroundColor: user?.role === 'admin' 
                ? alpha(theme.palette.primary.main, 0.1)
                : alpha(theme.palette.secondary.main, 0.1),
              color: user?.role === 'admin' 
                ? theme.palette.primary.main
                : theme.palette.secondary.main,
              fontWeight: 600,
              fontSize: '0.6875rem',
              height: 20,
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ mx: 2, mb: 2, borderColor: theme.palette.divider }} />

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, px: 2 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: theme.palette.text.secondary,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            px: 2,
            mb: 1,
            display: 'block',
          }}
        >
          Navigation
        </Typography>
        
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              href={item.path}
              sx={{
                p: 0,
                mb: 0.5,
                borderRadius: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: alpha(item.color, 0.08),
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  p: 1.5,
                  borderRadius: 1,
                  background: isActive(item.path)
                    ? `linear-gradient(135deg, ${alpha(item.color, 0.12)} 0%, ${alpha(item.color, 0.08)} 100%)`
                    : 'transparent',
                  border: isActive(item.path)
                    ? `1px solid ${alpha(item.color, 0.2)}`
                    : '1px solid transparent',
                  position: 'relative',
                  '&::before': isActive(item.path) ? {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: `linear-gradient(180deg, ${item.color} 0%, ${alpha(item.color, 0.7)} 100%)`,
                    borderRadius: '0 2px 2px 0',
                  } : {},
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive(item.path) ? item.color : theme.palette.text.secondary,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: isActive(item.path) ? 600 : 500,
                      color: isActive(item.path) ? theme.palette.text.primary : theme.palette.text.secondary,
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease',
                    },
                  }}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout Section */}
      <Box sx={{ px: 2, pt: 2 }}>
        <Divider sx={{ mb: 2, borderColor: theme.palette.divider }} />
        <Box
          component="button"
          onClick={logout}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            p: 1.5,
            borderRadius: 1,
            border: 'none',
            background: 'transparent',
            color: theme.palette.error.main,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: alpha(theme.palette.error.main, 0.08),
            },
          }}
        >
          <LogoutIcon sx={{ fontSize: 20 }} />
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            Logout
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;