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
  Divider
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
  ChevronRight
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
    <Box sx={{ width: 280, height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid',
        borderColor: 'divider',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              width: 48, 
              height: 48,
              bgcolor: 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.3)'
            }}
          >
            <Person />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {user?.displayName || 'User'}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {user?.email}
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <List sx={{ p: 2 }}>
        {navigationItems.map((item, index) => (
          <ListItem 
            key={index}
            sx={{ 
              borderRadius: 2,
              mb: 0.5,
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 500,
                fontSize: '0.95rem'
              }}
            />
            <ChevronRight sx={{ color: 'text.secondary', fontSize: 20 }} />
          </ListItem>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        <ListItem 
          onClick={handleLogout}
          sx={{ 
            borderRadius: 2,
            color: 'error.main',
            '&:hover': {
              bgcolor: 'error.lighter'
            }
          }}
        >
          <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText 
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: 500,
              fontSize: '0.95rem'
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
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ px: 2 }}>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2,
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.lighter'
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
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Smart Workspace
          </Typography>

          <IconButton 
            sx={{ 
              mr: 1,
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'action.hover'
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
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': { 
                bgcolor: 'primary.dark' 
              }
            }}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <Person />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        sx={{ mt: 1 }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 200,
            boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <Person sx={{ mr: 2, color: 'primary.main' }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <Settings sx={{ mr: 2, color: 'primary.main' }} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ExitToApp sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            borderRadius: '0 16px 16px 0',
            boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default MobileHeader;