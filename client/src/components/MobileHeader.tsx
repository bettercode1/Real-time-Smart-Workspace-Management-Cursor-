import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Map as MapIcon,
  CalendarToday,
  Analytics,
  NotificationsActive,
  Settings as SettingsIcon,
  Logout,
  Person,
  AdminPanelSettings,
  Group,
} from '@mui/icons-material';

interface MobileHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function MobileHeader({ isMenuOpen, setIsMenuOpen }: MobileHeaderProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const theme = useTheme();

  const getMenuItems = () => [
    { path: "/", icon: DashboardIcon, label: "Dashboard" },
    { path: "/floor-plan", icon: MapIcon, label: "Floor Plan" },
    { path: "/bookings", icon: CalendarToday, label: "Bookings" },
    { path: "/analytics", icon: Analytics, label: "Analytics" },
    { path: "/alerts", icon: NotificationsActive, label: "Alerts" },
    { path: "/settings", icon: SettingsIcon, label: "Settings" },
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <AdminPanelSettings />;
      case 'manager': return <Group />;
      default: return <Person />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'error';
      case 'manager': return 'warning';
      default: return 'primary';
    }
  };

  const menuItems = getMenuItems();

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const mobileDrawer = (
    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          SmartSpace
        </Typography>
        <IconButton
          color="inherit"
          onClick={handleMenuClose}
          edge="end"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* User Profile */}
      <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={user?.photoURL} 
            sx={{ 
              width: 48, 
              height: 48, 
              mr: 2,
              bgcolor: 'primary.main'
            }}
          >
            {user?.firstName?.[0] || user?.username?.[0]?.toUpperCase()}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.username}
            </Typography>
            <Chip
              size="small"
              icon={getRoleIcon(user?.role || 'user')}
              label={(user?.role || 'user').charAt(0).toUpperCase() + (user?.role || 'user').slice(1)}
              color={getRoleColor(user?.role || 'user') as any}
              variant="outlined"
              sx={{ mt: 0.5 }}
            />
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path || 
              (item.path !== "/" && location.startsWith(item.path));

            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  selected={isActive}
                  onClick={handleMenuClose}
                  sx={{
                    mx: 1,
                    mb: 0.5,
                    borderRadius: 2,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                    '&:hover': {
                      bgcolor: isActive ? 'primary.dark' : 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: 40,
                      color: isActive ? 'inherit' : 'text.secondary'
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 500 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider />

      {/* Logout */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={() => {
            logout();
            handleMenuClose();
          }}
          sx={{
            borderRadius: 2,
            color: 'error.main',
            '&:hover': {
              bgcolor: 'error.light',
              color: 'error.contrastText',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
            <Logout />
          </ListItemIcon>
          <ListItemText 
            primary="Logout"
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile AppBar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          display: { xs: 'block', lg: 'none' },
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsMenuOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            SmartSpace
          </Typography>
          
          <Chip
            size="small"
            icon={getRoleIcon(user?.role || 'user')}
            label={(user?.role || 'user').charAt(0).toUpperCase() + (user?.role || 'user').slice(1)}
            color={getRoleColor(user?.role || 'user') as any}
            variant="outlined"
            sx={{ 
              color: 'primary.contrastText',
              borderColor: 'primary.contrastText',
              '& .MuiChip-icon': {
                color: 'primary.contrastText',
              },
            }}
          />
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {mobileDrawer}
      </Drawer>
    </>
  );
}