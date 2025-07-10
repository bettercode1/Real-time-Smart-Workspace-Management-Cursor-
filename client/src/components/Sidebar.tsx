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
    { text: t.dashboard, icon: <AdminIcon />, path: "/dashboard" },
    { text: t.floorPlan, icon: <MapIcon />, path: "/floor-plan" },
    { text: t.bookings, icon: <BookingIcon />, path: "/bookings" },
    { text: t.analytics, icon: <AnalyticsIcon />, path: "/analytics" },
    { text: t.alerts, icon: <AlertIcon />, path: "/alerts" },
    { text: t.devices, icon: <DevicesIcon />, path: "/devices" },
    { text: t.users, icon: <UsersIcon />, path: "/users" },
    { text: t.rooms, icon: <RoomIcon />, path: "/rooms" },
    { text: t.iaq, icon: <IAQIcon />, path: "/iaq" },
    { text: t.settings, icon: <SettingsIcon />, path: "/settings" },
  ];

  const userMenuItems = [
    { text: t.dashboard, icon: <DashboardIcon />, path: "/dashboard" },
    { text: t.floorPlan, icon: <MapIcon />, path: "/floor-plan" },
    { text: t.bookings, icon: <BookingIcon />, path: "/bookings" },
    { text: t.alerts, icon: <AlertIcon />, path: "/alerts" },
    { text: t.settings, icon: <SettingsIcon />, path: "/settings" },
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
          ? '#ffffff'
          : '#1e293b',
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#f1f5f9' : '#334155'}`,
        boxShadow: theme.palette.mode === 'light' 
          ? '0 0 0 1px rgba(0,0,0,0.05)'
          : '0 0 0 1px rgba(255,255,255,0.05)',
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
        overflowY: 'auto',
        pb: 3,
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
              background: theme.palette.mode === 'light'
                ? '#f8fafc'
                : '#334155',
              border: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#475569'}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BusinessCenter 
              sx={{ 
                color: theme.palette.mode === 'light' ? '#64748b' : '#94a3b8',
                fontSize: 24,
              }} 
            />
          </Box>
          <Box>
        <Typography 
              variant="h6" 
              fontWeight={700} 
          sx={{ 
                color: theme.palette.text.primary,
                letterSpacing: '-0.01em'
          }}
        >
          SmartSpace
        </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 500
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
              ? '#f8fafc'
              : '#334155',
            border: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#475569'}`,
            transition: 'all 0.2s ease',
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: theme.palette.mode === 'light' ? '#e2e8f0' : '#475569',
              color: theme.palette.mode === 'light' ? '#64748b' : '#94a3b8',
              width: 40,
              height: 40,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {user?.displayName?.charAt(0) || <Person />}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography 
              variant="subtitle2" 
              fontWeight={600} 
              sx={{ 
                color: theme.palette.text.primary,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}
            >
              {user?.displayName || "Guest User"}
            </Typography>
            <Chip 
              label={user?.role === 'admin' ? 'Admin' : 'User'} 
              size="small" 
              sx={{ 
                bgcolor: theme.palette.mode === 'light' ? '#f1f5f9' : '#475569',
                color: theme.palette.mode === 'light' ? '#64748b' : '#94a3b8',
                fontWeight: 500,
                fontSize: '0.7rem',
                height: 20,
                borderRadius: 1,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }} 
            />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: theme.palette.mode === 'light' ? '#e2e8f0' : '#334155', mx: 2 }} />

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, px: 2, py: 2, position: 'relative', zIndex: 1 }}>
        <List sx={{ py: 1 }}>
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <ListItem
                key={item.text}
                  component={Link}
                to={item.path}
                  sx={{
                  borderRadius: 2,
                    mb: 0.5,
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  background: active 
                    ? theme.palette.mode === 'light'
                      ? '#f8fafc'
                      : '#334155'
                    : 'transparent',
                  border: active 
                    ? `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#475569'}` 
                    : `1px solid transparent`,
                      '&:hover': {
                    background: theme.palette.mode === 'light'
                      ? '#f1f5f9'
                      : '#475569',
                    border: `1px solid ${theme.palette.mode === 'light' ? '#cbd5e1' : '#64748b'}`,
                  },
                  '&::before': active ? {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 2,
                    height: '50%',
                    background: theme.palette.mode === 'light' ? '#64748b' : '#94a3b8',
                    borderRadius: '0 1px 1px 0',
                  } : {},
                  textDecoration: "none",
                  color: "inherit"
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                    color: active 
                      ? theme.palette.mode === 'light' ? '#475569' : '#cbd5e1'
                      : theme.palette.text.secondary,
                      minWidth: 40,
                    transition: 'all 0.2s ease',
                    }}
                  >
                  {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                  primary={item.text}
                    primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: active ? 600 : 500,
                    color: active 
                      ? theme.palette.mode === 'light' ? '#334155' : '#e2e8f0'
                      : theme.palette.text.primary,
                    }}
                  />
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: theme.palette.mode === 'light' ? '#e2e8f0' : '#334155', mx: 2 }} />

      {/* Logout */}
      <Box sx={{ p: 2, pb: 3, position: 'relative', zIndex: 1 }}>
        <ListItem
          onClick={logout}
          sx={{
            borderRadius: 2,
            cursor: "pointer",
            transition: 'all 0.2s ease',
            background: theme.palette.mode === 'light' ? '#fef2f2' : '#450a0a',
            border: `1px solid ${theme.palette.mode === 'light' ? '#fecaca' : '#7f1d1d'}`,
            '&:hover': {
              background: theme.palette.mode === 'light' ? '#fee2e2' : '#7f1d1d',
              boxShadow: `0 4px 12px ${alpha(theme.palette.error.main, 0.2)}`
            },
            color: theme.palette.error.main,
            fontWeight: 600,
          }}
        >
          <ListItemIcon sx={{ color: theme.palette.error.main, minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Logout"
            primaryTypographyProps={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: theme.palette.error.main
            }}
          />
        </ListItem>
      </Box>
    </Box>
  );
};

export default Sidebar;