import React from "react";
import { Typography, Card, CardContent, Paper, Chip, List, ListItem, ListItemText, ListItemIcon, Button, IconButton, useTheme, alpha, Grid, Box, Avatar } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import { AdminPanelSettings, Person, Dashboard, TrendingUp, Notifications, Settings, Security, People, EventAvailable, Warning } from "@mui/icons-material";
import FloorPlan from "@/components/FloorPlan";
import IAQWidgets from "@/components/IAQWidgets";
import NotificationCenter from "@/components/NotificationCenter";
import AnalyticsCards from "@/components/AnalyticsCards";
import DeviceModal from "@/components/DeviceModal";
import PageContainer from "@/components/PageContainer";

const QuickStatsCard = ({ title, value, subtitle, color, icon }: {
  title: string;
  value: string;
  subtitle: string;
  color: string;
  icon: React.ReactNode;
}) => {
  const theme = useTheme();
  
  return (
    <Card 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 3,
        background: theme.palette.mode === 'light' 
          ? `linear-gradient(135deg, ${alpha(color, 0.04)} 0%, ${alpha(color, 0.08)} 100%)`
          : `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.15)} 100%)`,
        border: `1px solid ${alpha(color, 0.1)}`,
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px ${alpha(color, 0.15)}`,
          borderColor: alpha(color, 0.2),
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ letterSpacing: 0.5, textTransform: 'uppercase' }}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ my: 1, lineHeight: 1.2 }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {subtitle}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            p: 2,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
            color: 'white',
            boxShadow: `0 4px 12px ${alpha(color, 0.3)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 48,
            height: 48
          }}
        >
          {icon}
        </Box>
      </Box>
    </Card>
  );
};

const AdminWelcomeCard = ({ user }: { user: any }) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        borderRadius: 3,
        background: theme.palette.mode === 'light'
          ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
          : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
        color: theme.palette.primary.contrastText,
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${alpha('#ffffff', 0.1)} 0%, transparent 70%)`,
          borderRadius: '50%'
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              background: alpha('#ffffff', 0.15),
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
            }}
          >
            <AdminPanelSettings sx={{ fontSize: 32, color: 'white' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight={700} mb={1} sx={{ lineHeight: 1.2 }}>
              Welcome, {user?.displayName}!
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 400 }}>
              System Administrator Dashboard - Monitor and manage your workspace
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: alpha('#ffffff', 0.15),
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
              color: 'white',
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              fontSize: '0.875rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: alpha('#ffffff', 0.25),
                transform: 'translateY(-1px)',
              }
            }}
            startIcon={<Settings />}
          >
            System Settings
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            sx={{ 
              borderColor: alpha('#ffffff', 0.3),
              borderWidth: 1.5,
              color: 'white',
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              fontSize: '0.875rem',
              textTransform: 'none',
              '&:hover': {
                borderColor: alpha('#ffffff', 0.5),
                backgroundColor: alpha('#ffffff', 0.1),
                transform: 'translateY(-1px)'
              }
            }}
            startIcon={<Security />}
          >
            Security Panel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

const ManagementCard = ({ title, subtitle, icon, color, onClick }: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}) => {
  const theme = useTheme();
  
  return (
    <Card
      elevation={0}
      onClick={onClick}
      sx={{
        p: 3,
        borderRadius: 3,
        cursor: onClick ? 'pointer' : 'default',
        background: theme.palette.mode === 'light' 
          ? `linear-gradient(135deg, ${alpha(color, 0.04)} 0%, ${alpha(color, 0.08)} 100%)`
          : `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.15)} 100%)`,
        border: `1px solid ${alpha(color, 0.1)}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px ${alpha(color, 0.15)}`,
          borderColor: alpha(color, 0.2),
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box 
          sx={{ 
            p: 1.5,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 40,
            height: 40
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

const RecentActivityCard = () => {
  const theme = useTheme();
  
  const activities = [
    { text: "New user registration", time: "2 minutes ago", type: "user" },
    { text: "Room booking confirmed", time: "5 minutes ago", type: "booking" },
    { text: "System maintenance completed", time: "10 minutes ago", type: "system" },
    { text: "Alert resolved", time: "15 minutes ago", type: "alert" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Person />;
      case 'booking': return <EventAvailable />;
      case 'system': return <Settings />;
      case 'alert': return <Warning />;
      default: return <Notifications />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user': return theme.palette.success.main;
      case 'booking': return theme.palette.info.main;
      case 'system': return theme.palette.warning.main;
      case 'alert': return theme.palette.error.main;
      default: return theme.palette.primary.main;
    }
  };

  return (
    <Card elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Recent Activity
      </Typography>
      <List sx={{ p: 0 }}>
        {activities.map((activity, index) => (
          <ListItem key={index} sx={{ px: 0, py: 1 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  background: alpha(getActivityColor(activity.type), 0.1),
                  color: getActivityColor(activity.type),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32
                }}
              >
                {getActivityIcon(activity.type)}
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={activity.text}
              secondary={activity.time}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'text.primary'
              }}
              secondaryTypographyProps={{
                fontSize: '0.75rem',
                color: 'text.secondary'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const theme = useTheme();
  const { language } = useSettings();
  const t = translations[language];

  return (
    <Box sx={{
      minHeight: '100%',
      width: '100%',
      maxWidth: '100%',
      background: theme.palette.mode === 'light' 
        ? 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)'
        : `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.background.paper, 0.5)} 100%)`,
      position: 'relative',
      pb: 6,
      overflowX: 'hidden'
    }}>
      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        px: { xs: 2, md: 3 }, 
        pt: { xs: 4, md: 6 },
        width: '100%',
        overflowX: 'hidden'
      }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 1, letterSpacing: -1, color: 'text.primary' }}>
            {t.dashboard} - Admin
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
            Monitor, manage, and optimize your workspace in real time
          </Typography>
        </Box>
        {/* Welcome Card + Stats */}
        <Grid container spacing={3} alignItems="stretch" sx={{ mb: 4, width: '100%', mx: 0 }}>
          <Grid item xs={12} md={7} sx={{ width: '100%', maxWidth: '100%' }}>
            {/* Welcome Card */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 5,
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                  : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                color: theme.palette.primary.contrastText,
                position: 'relative',
                overflow: 'hidden',
                minHeight: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(99,102,241,0.10)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: 'rgba(255,255,255,0.12)', fontSize: 36, mr: 2 }}>
                  <AdminPanelSettings sx={{ fontSize: 36, color: '#fff' }} />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700} sx={{ lineHeight: 1.2, mb: 0.5 }}>
                    Welcome, {user?.displayName || 'John Admin'}!
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.92, fontWeight: 400 }}>
                    System Administrator Dashboard - Monitor and manage your workspace
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'rgba(255,255,255,0.18)',
                    color: '#fff',
                    fontWeight: 700,
                    borderRadius: 999,
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.28)',
                    },
                  }}
                  startIcon={<Settings />}
                >
                  System Settings
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.38)',
                    color: '#fff',
                    fontWeight: 700,
                    borderRadius: 999,
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.58)',
                      background: 'rgba(255,255,255,0.10)',
                    },
                  }}
                  startIcon={<Security />}
                >
                  Security Panel
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5} sx={{ width: '100%', maxWidth: '100%' }}>
            {/* Stats Cards Row */}
            <Grid container spacing={2} sx={{ width: '100%', mx: 0 }}>
              <Grid item xs={12} sm={6}>
                <Card elevation={0} sx={{
                  p: 3,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                  boxShadow: '0 2px 8px rgba(99,102,241,0.06)',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  minHeight: 120,
                }}>
                  <Box sx={{
                    bgcolor: '#818cf8', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Person sx={{ fontSize: 28 }} />
                  </Box>
                  <Typography variant="h5" fontWeight={800} color="#3730a3">128</Typography>
                  <Typography fontWeight={600} color="#6366f1" fontSize={15}>Active Users</Typography>
                  <Typography color="#818cf8" fontSize={13}>Currently online</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card elevation={0} sx={{
                  p: 3,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  boxShadow: '0 2px 8px rgba(16,185,129,0.06)',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  minHeight: 120,
                }}>
                  <Box sx={{
                    bgcolor: '#34d399', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <EventAvailable sx={{ fontSize: 28 }} />
                  </Box>
                  <Typography variant="h5" fontWeight={800} color="#065f46">42</Typography>
                  <Typography fontWeight={600} color="#10b981" fontSize={15}>Bookings</Typography>
                  <Typography color="#34d399" fontSize={13}>Today</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card elevation={0} sx={{
                  p: 3,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
                  boxShadow: '0 2px 8px rgba(251,191,36,0.06)',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  minHeight: 120,
                }}>
                  <Box sx={{
                    bgcolor: '#fbbf24', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Warning sx={{ fontSize: 28 }} />
                  </Box>
                  <Typography variant="h5" fontWeight={800} color="#b45309">3</Typography>
                  <Typography fontWeight={600} color="#f59e42" fontSize={15}>Alerts</Typography>
                  <Typography color="#fbbf24" fontSize={13}>Requires attention</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card elevation={0} sx={{
                  p: 3,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  boxShadow: '0 2px 8px rgba(59,130,246,0.06)',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  minHeight: 120,
                }}>
                  <Box sx={{
                    bgcolor: '#60a5fa', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Dashboard sx={{ fontSize: 28 }} />
                  </Box>
                  <Typography variant="h5" fontWeight={800} color="#1e40af">All OK</Typography>
                  <Typography fontWeight={600} color="#3b82f6" fontSize={15}>Systems</Typography>
                  <Typography color="#60a5fa" fontSize={13}>All systems operational</Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Notifications & IAQ */}
        <Grid container spacing={3} alignItems="stretch" sx={{ width: '100%', mx: 0 }}>
          <Grid item xs={12} md={6} sx={{ width: '100%', maxWidth: '100%' }}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 4, background: 'background.paper', minHeight: 240, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Recent Notifications
              </Typography>
              <Box sx={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
                <NotificationCenter />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} sx={{ width: '100%', maxWidth: '100%' }}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 4, background: 'background.paper', minHeight: 240, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                IAQ Monitoring
              </Typography>
              <Box sx={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
                <IAQWidgets />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
} 