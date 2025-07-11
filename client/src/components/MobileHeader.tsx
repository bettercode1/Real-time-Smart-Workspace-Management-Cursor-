import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
  alpha
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  Person,
  Dashboard,
  CalendarToday,
  Analytics,
  NotificationsActive,
  Settings,
  ExitToApp,
  ChevronRight,
  BusinessCenter
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';

const MobileHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const { user, logout } = useAuth();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
  };

  const navigationItems = [
    { label: 'Dashboard', icon: <Dashboard />, path: '/' },
    { label: 'Floor Plan', icon: <Dashboard />, path: '/floor-plan' },
    { label: 'Bookings', icon: <CalendarToday />, path: '/bookings' },
    { label: 'Analytics', icon: <Analytics />, path: '/analytics' },
    { label: 'Alerts', icon: <NotificationsActive />, path: '/alerts' },
    { label: 'Settings', icon: <Settings />, path: '/settings' }
  ];

  const drawer = (
    <Box sx={{ 
      width: 280, 
      height: '100%', 
      bgcolor: theme.palette.background.paper,
      background: theme.palette.mode === 'light'
        ? 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
        : 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
    }}>
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid',
        borderColor: theme.palette.divider,
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
          : 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: alpha('#ffffff', 0.15),
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
            }}
          >
            <BusinessCenter sx={{ fontSize: 24, color: 'white' }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: '-0.01em' }}>
              SmartSpace
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 500 }}>
              Workspace Management
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40,
              background: `linear-gradient(135deg, ${alpha('#ffffff', 0.8)} 0%, ${alpha('#ffffff', 0.6)} 100%)`,
              border: `1px solid ${alpha('#ffffff', 0.3)}`,
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.25 }}>
              {user?.displayName || user?.email || 'User'}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 500 }}>
              {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : 'User'}
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <List sx={{ p: 2 }}>
        {navigationItems.map((item, index) => (
          <ListItem 
            key={index}
            sx={{ 
              borderRadius: 1,
              mb: 0.5,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.main, minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 500,
                fontSize: '0.875rem',
                color: theme.palette.text.primary,
              }}
            />
            <ChevronRight sx={{ color: theme.palette.text.secondary, fontSize: 18 }} />
          </ListItem>
        ))}
        
        <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />
        
        <ListItem 
          onClick={handleLogout}
          sx={{ 
            borderRadius: 1,
            color: theme.palette.error.main,
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: alpha(theme.palette.error.main, 0.08),
            }
          }}
        >
          <ListItemIcon sx={{ color: theme.palette.error.main, minWidth: 40 }}>
            <ExitToApp sx={{ fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText 
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  if (!isMobile) {
    return null;
  }

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          bgcolor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.9)',
          color: theme.palette.text.primary,
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
          zIndex: theme.zIndex.drawer + 1,
          backdropFilter: 'blur(20px)',
        }}
      >
        <Toolbar sx={{ px: 2, minHeight: 64 }}>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2,
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.01em',
            }}
          >
            SmartSpace
          </Typography>

          <IconButton 
            color="inherit"
            sx={{ 
              mr: 1,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{ 
              p: 0.5,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              }
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)} 0%, ${alpha(theme.palette.secondary.main, 0.8)} 100%)`,
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            border: 'none',
            boxShadow: theme.palette.mode === 'light'
              ? '2px 0 8px rgba(0,0,0,0.1)'
              : '2px 0 8px rgba(0,0,0,0.3)',
          },
        }}
      >
        {drawer}
      </Drawer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }
        }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
          <ListItemIcon>
            <ExitToApp fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default MobileHeader;