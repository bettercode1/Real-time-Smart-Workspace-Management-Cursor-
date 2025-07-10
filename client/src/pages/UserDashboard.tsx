import React from "react";
import { Typography, Card, CardContent, Paper, Button, IconButton, Chip, useTheme, alpha, Grid, Box, Avatar, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import { Person, Bookmark, TrendingUp, Notifications, Dashboard, EventAvailable, AccessTime, LocationOn, Air, Thermostat, Schedule } from "@mui/icons-material";
import FloorPlan from "@/components/FloorPlan";
import IAQWidgets from "@/components/IAQWidgets";
import NotificationCenter from "@/components/NotificationCenter";
import AnalyticsCards from "@/components/AnalyticsCards";
import BookingCalendar from "@/components/BookingCalendar";
import UserSummary from "@/components/UserSummary";
import Suggestions from "@/components/Suggestions";

const UpcomingBookingsCard = () => {
  const theme = useTheme();
  const { language } = useSettings();
  const t = translations[language];
  
  const bookings = [
    { 
      room: "Meeting Room 1", 
      time: "2:00 PM - 3:30 PM", 
      date: "Today", 
      status: "confirmed",
      location: "Floor 2"
    },
    { 
      room: "Desk A-15", 
      time: "9:00 AM - 5:00 PM", 
      date: "Tomorrow", 
      status: "confirmed",
      location: "Floor 1"
    },
    { 
      room: "Lounge Area", 
      time: "12:00 PM - 1:00 PM", 
      date: "Tomorrow", 
      status: "pending",
      location: "Floor 1"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return theme.palette.success.main;
      case 'pending': return theme.palette.warning.main;
      case 'cancelled': return theme.palette.error.main;
      default: return theme.palette.info.main;
    }
  };

  return (
    <Card elevation={0} sx={{ 
      p: 3, 
      borderRadius: 4, 
      background: theme.palette.background.paper,
      boxShadow: theme.palette.mode === 'light' 
        ? '0 2px 12px rgba(99,102,241,0.06)'
        : '0 2px 12px rgba(0,0,0,0.3)',
      height: '100%',
      minHeight: 400,
      border: `1px solid ${theme.palette.divider}`,
    }}>
      <Typography variant="h6" fontWeight={600} mb={2} color="text.primary">
        {t.bookings}
      </Typography>
      <List sx={{ p: 0 }}>
        {bookings.map((booking, index) => (
          <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  background: alpha(getStatusColor(booking.status), 0.1),
                  color: getStatusColor(booking.status),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32
                }}
              >
                <Schedule sx={{ fontSize: 16 }} />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                    {booking.room}
                  </Typography>
                  <Chip 
                    label={t[booking.status as keyof typeof t] || booking.status}
                    size="small"
                    color={booking.status === 'confirmed' ? 'success' : 'warning'}
                    variant="outlined"
                  />
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    {booking.time} • {booking.date}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {booking.location}
                  </Typography>
                </Box>
              }
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
      
      <Button 
        variant="outlined" 
        fullWidth 
        sx={{ mt: 2, borderRadius: 2 }}
        startIcon={<EventAvailable />}
      >
        View All Bookings
      </Button>
    </Card>
  );
};

const QuickActionsCard = () => {
  const theme = useTheme();
  
  const actions = [
    { title: "Book a Room", icon: <EventAvailable />, color: theme.palette.primary.main, description: "Reserve meeting spaces" },
    { title: "Find a Desk", icon: <LocationOn />, color: theme.palette.success.main, description: "Locate available desks" },
    { title: "View Schedule", icon: <AccessTime />, color: theme.palette.info.main, description: "Check your calendar" },
    { title: "Check Air Quality", icon: <Air />, color: theme.palette.warning.main, description: "Environmental status" },
  ];

  return (
    <Card elevation={0} sx={{ 
      p: 3, 
      borderRadius: 4, 
      background: '#fff',
      boxShadow: '0 2px 12px rgba(99,102,241,0.06)',
      height: '100%',
      minHeight: 300
    }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid item xs={6} key={index}>
            <Card
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(action.color, 0.04)} 0%, ${alpha(action.color, 0.08)} 100%)`,
                border: `1px solid ${alpha(action.color, 0.1)}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 12px ${alpha(action.color, 0.15)}`,
                  borderColor: alpha(action.color, 0.2),
                }
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${action.color} 0%, ${alpha(action.color, 0.8)} 100%)`,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  mx: 'auto',
                  mb: 1.5,
                  boxShadow: `0 4px 12px ${alpha(action.color, 0.3)}`
                }}
              >
                {action.icon}
              </Box>
              <Typography variant="subtitle2" fontWeight={600} color="text.primary" sx={{ mb: 0.5 }}>
                {action.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {action.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default function UserDashboard() {
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
            {t.dashboard}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
            {t.personalizedWorkspace || 'Your personalized workspace overview and quick actions'}
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
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : `linear-gradient(135deg, ${theme.palette.success.dark} 0%, ${alpha(theme.palette.success.main, 0.8)} 100%)`,
                color: theme.palette.success.contrastText,
                position: 'relative',
                overflow: 'hidden',
                minHeight: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(16,185,129,0.10)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: 'rgba(255,255,255,0.12)', fontSize: 36, mr: 2 }}>
                  <Person sx={{ fontSize: 36, color: '#fff' }} />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700} sx={{ lineHeight: 1.2, mb: 0.5 }}>
                    {t.welcomeBack || 'Welcome back'}, {user?.displayName || 'John'}!
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.92, fontWeight: 400 }}>
                    {t.readyToWork || 'Ready to make the most of your workspace today?'}
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
                  startIcon={<Bookmark />}
                >
                  {t.quickBook || 'Quick Book'}
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
                  startIcon={<TrendingUp />}
                >
                  {t.viewAnalytics || 'View Analytics'}
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
                    <EventAvailable sx={{ fontSize: 28 }} />
                  </Box>
                  <Typography variant="h5" fontWeight={800} color="#3730a3">5</Typography>
                  <Typography fontWeight={600} color="#6366f1" fontSize={15}>My Bookings</Typography>
                  <Typography color="#818cf8" fontSize={13}>Upcoming this week</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card elevation={0} sx={{
                  p: 3,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  boxShadow: '0 2px 8px rgba(245,158,11,0.06)',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  minHeight: 120,
                }}>
                  <Box sx={{
                    bgcolor: '#f59e0b', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Notifications sx={{ fontSize: 28 }} />
                  </Box>
                  <Typography variant="h5" fontWeight={800} color="#92400e">3</Typography>
                  <Typography fontWeight={600} color="#d97706" fontSize={15}>Notifications</Typography>
                  <Typography color="#f59e0b" fontSize={13}>Unread messages</Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={3} sx={{ width: '100%', mx: 0 }}>
          {/* Booking Calendar */}
          <Grid item xs={12} md={8} sx={{ width: '100%', maxWidth: '100%' }}>
            <Card elevation={0} sx={{ 
              p: 3, 
              borderRadius: 4, 
              background: '#fff',
              boxShadow: '0 2px 12px rgba(99,102,241,0.06)',
              minHeight: 400
            }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Booking Calendar
              </Typography>
              <BookingCalendar />
            </Card>
          </Grid>

          {/* Upcoming Bookings */}
          <Grid item xs={12} md={4} sx={{ width: '100%', maxWidth: '100%' }}>
            <UpcomingBookingsCard />
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={6} sx={{ width: '100%', maxWidth: '100%' }}>
            <QuickActionsCard />
          </Grid>

          {/* AI Suggestions */}
          <Grid item xs={12} md={6} sx={{ width: '100%', maxWidth: '100%' }}>
            <Card elevation={0} sx={{ 
              p: 3, 
              borderRadius: 4, 
              background: '#fff',
              boxShadow: '0 2px 12px rgba(99,102,241,0.06)',
              minHeight: 300
            }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                AI Suggestions
              </Typography>
              <Suggestions />
            </Card>
          </Grid>

          {/* Personal Summary */}
          <Grid item xs={12} md={6} sx={{ width: '100%', maxWidth: '100%' }}>
            <Card elevation={0} sx={{ 
              p: 3, 
              borderRadius: 4, 
              background: '#fff',
              boxShadow: '0 2px 12px rgba(99,102,241,0.06)',
              minHeight: 280
            }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Personal Summary
              </Typography>
              <UserSummary />
            </Card>
          </Grid>

          {/* Notifications */}
          <Grid item xs={12} md={6} sx={{ width: '100%', maxWidth: '100%' }}>
            <Card elevation={0} sx={{ 
              p: 3, 
              borderRadius: 4, 
              background: '#fff',
              boxShadow: '0 2px 12px rgba(99,102,241,0.06)',
              minHeight: 280
            }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Recent Notifications
              </Typography>
              <NotificationCenter />
            </Card>
          </Grid>

          {/* Environment Overview */}
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <Card elevation={0} sx={{ 
              p: 3, 
              borderRadius: 4, 
              background: '#fff',
              boxShadow: '0 2px 12px rgba(99,102,241,0.06)'
            }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Environment Overview
              </Typography>
              <IAQWidgets />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}