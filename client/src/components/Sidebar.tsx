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
  const [location] = useLocation();
  const theme = useTheme();

  const adminMenuItems = [
    { text: "Admin Panel", icon: <AdminIcon />, path: "/dashboard" },
    { text: "Live Floor Plan", icon: <MapIcon />, path: "/floor-plan" },
    { text: "Booking Management", icon: <BookingIcon />, path: "/bookings" },
    { text: "Analytics & Reports", icon: <AnalyticsIcon />, path: "/analytics" },
    { text: "Alert Manager", icon: <AlertIcon />, path: "/alerts" },
    { text: "Device Status", icon: <DevicesIcon />, path: "/devices" },
    { text: "User Management", icon: <UsersIcon />, path: "/users" },
    { text: "Room Setup", icon: <RoomIcon />, path: "/rooms" },
    { text: "IAQ Monitoring", icon: <IAQIcon />, path: "/iaq" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  const userMenuItems = [
    { text: "User Panel", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Floor Plan", icon: <MapIcon />, path: "/floor-plan" },
    { text: "My Bookings", icon: <BookingIcon />, path: "/bookings" },
    { text: "Alerts", icon: <AlertIcon />, path: "/alerts" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
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
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#334155'}`,
        boxShadow: theme.palette.mode === 'light' 
          ? '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)'
          : '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
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
              borderRadius: 12,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            <BusinessCenter sx={{ color: "white", fontSize: 24 }} />
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
            borderRadius: 3,
            background: theme.palette.mode === 'light' 
              ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
              : 'linear-gradient(135deg, #334155 0%, #475569 100%)',
            border: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#475569'}`,
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: user?.role === 'admin' ? theme.palette.error.main : theme.palette.success.main,
              width: 40,
              height: 40,
              fontSize: 16,
              fontWeight: 700,
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
              label={user?.role === 'admin' ? 'Administrator' : 'User'}
              size="small"
              sx={{
                backgroundColor: user?.role === 'admin' 
                  ? alpha(theme.palette.error.main, 0.1) 
                  : alpha(theme.palette.success.main, 0.1),
                color: user?.role === 'admin' 
                  ? theme.palette.error.main 
                  : theme.palette.success.main,
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 20,
                border: `1px solid ${user?.role === 'admin' 
                  ? alpha(theme.palette.error.main, 0.2) 
                  : alpha(theme.palette.success.main, 0.2)}`
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
                      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.04)} 100%)`
                      : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`
                    : 'transparent',
                  border: active 
                    ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}` 
                    : `1px solid transparent`,
                      '&:hover': {
                    background: active 
                      ? theme.palette.mode === 'light'
                        ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.primary.main, 0.06)} 100%)`
                        : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.12)} 100%)`
                      : theme.palette.mode === 'light'
                        ? `linear-gradient(135deg, ${alpha(theme.palette.grey[100], 0.8)} 0%, ${alpha(theme.palette.grey[50], 0.8)} 100%)`
                        : `linear-gradient(135deg, ${alpha(theme.palette.grey[800], 0.8)} 0%, ${alpha(theme.palette.grey[700], 0.8)} 100%)`,
                    transform: 'translateX(4px)',
                    border: `1px solid ${active 
                      ? alpha(theme.palette.primary.main, 0.3) 
                      : theme.palette.mode === 'light' 
                        ? '#cbd5e1' 
                        : '#475569'}`,
                  },
                  '&::before': active ? {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 3,
                    height: '60%',
                    background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                    borderRadius: '0 2px 2px 0',
                  } : {},
                  textDecoration: "none",
                  color: "inherit"
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
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
                    color: active ? theme.palette.primary.main : theme.palette.text.primary,
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
            background: alpha(theme.palette.error.main, 0.08),
            border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
            '&:hover': {
              background: alpha(theme.palette.error.main, 0.12),
              transform: 'translateY(-1px)',
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