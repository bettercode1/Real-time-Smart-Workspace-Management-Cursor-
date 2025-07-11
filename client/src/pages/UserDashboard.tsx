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
import PageContainer from "@/components/PageContainer";

const UpcomingBookingsCard = () => {
  const theme = useTheme();
  const { language } = useSettings();
  const t = translations[language];
  
  const bookings = [
    { 
      room: "Meeting Room 1", 
      time: "2:00 PM - 3:30 PM", 
      date: "Today", 
      status: "Confirmed",
      location: "Floor 2"
    },
    { 
      room: "Desk A-15", 
      time: "9:00 AM - 5:00 PM", 
      date: "Tomorrow", 
      status: "Confirmed",
      location: "Floor 1"
    },
    { 
      room: "Lounge Area", 
      time: "12:00 PM - 1:00 PM", 
      date: "Tomorrow", 
      status: "Pending",
      location: "Floor 1"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#3b82f6';
    }
  };

  return (
    <Card elevation={0} sx={{ 
      p: 3, 
      borderRadius: 2, 
      background: theme.palette.background.paper,
      boxShadow: theme.palette.mode === 'light' 
        ? '0 1px 3px rgba(0,0,0,0.1)'
        : '0 1px 3px rgba(0,0,0,0.3)',
      height: '100%',
      minHeight: 400,
      border: `1px solid ${theme.palette.divider}`,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" fontWeight={600} color="text.primary">
          {t.bookings}
        </Typography>
        <Chip 
          label="3 Upcoming" 
          size="small" 
          sx={{ 
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            fontWeight: 600,
          }} 
        />
      </Box>
      <List sx={{ p: 0 }}>
        {bookings.map((booking, index) => (
          <ListItem 
            key={index} 
            sx={{ 
              px: 0, 
              py: 1.5,
              mb: 1,
              borderRadius: 1,
              background: theme.palette.mode === 'light' 
                ? alpha(getStatusColor(booking.status), 0.04)
                : alpha(getStatusColor(booking.status), 0.08),
              border: `1px solid ${alpha(getStatusColor(booking.status), 0.1)}`,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  background: `linear-gradient(135deg, ${getStatusColor(booking.status)} 0%, ${alpha(getStatusColor(booking.status), 0.8)} 100%)`,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  boxShadow: `0 2px 6px ${alpha(getStatusColor(booking.status), 0.25)}`,
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
                    sx={{
                      backgroundColor: alpha(getStatusColor(booking.status), 0.1),
                      color: getStatusColor(booking.status),
                      fontWeight: 600,
                      fontSize: '0.6875rem',
                      height: 20,
                    }}
                  />
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 500 }}>
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
        sx={{ 
          mt: 3, 
          borderRadius: 1.5,
          borderWidth: 1,
          fontWeight: 600,
          '&:hover': {
            borderWidth: 1,
          }
        }}
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
    { title: "Book a Room", icon: <EventAvailable />, color: "#3b82f6", description: "Reserve meeting spaces" },
    { title: "Find a Desk", icon: <LocationOn />, color: "#10b981", description: "Locate available desks" },
    { title: "View Schedule", icon: <AccessTime />, color: "#8b5cf6", description: "Check your calendar" },
    { title: "Check Air Quality", icon: <Air />, color: "#f59e0b", description: "Environmental status" },
  ];

  return (
    <Card elevation={0} sx={{ 
      p: 3, 
      borderRadius: 2, 
      background: theme.palette.background.paper,
      boxShadow: theme.palette.mode === 'light' 
        ? '0 1px 3px rgba(0,0,0,0.1)'
        : '0 1px 3px rgba(0,0,0,0.3)',
      height: '100%',
      minHeight: 300,
      border: `1px solid ${theme.palette.divider}`,
    }}>
      <Typography variant="h6" fontWeight={600} mb={3} color="text.primary">
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid item xs={6} key={index}>
            <Card
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 1.5,
                background: theme.palette.mode === 'light' 
                  ? `linear-gradient(135deg, ${alpha(action.color, 0.04)} 0%, ${alpha(action.color, 0.08)} 100%)`
                  : `linear-gradient(135deg, ${alpha(action.color, 0.08)} 0%, ${alpha(action.color, 0.12)} 100%)`,
                border: `1px solid ${alpha(action.color, 0.1)}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, ${action.color} 0%, ${alpha(action.color, 0.7)} 100%)`,
                },
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
                  borderRadius: 1.5,
                  background: `linear-gradient(135deg, ${action.color} 0%, ${alpha(action.color, 0.8)} 100%)`,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  mx: 'auto',
                  mb: 1.5,
                  boxShadow: `0 2px 8px ${alpha(action.color, 0.25)}`
                }}
              >
                {action.icon}
              </Box>
              <Typography variant="subtitle2" fontWeight={600} color="text.primary" sx={{ mb: 0.5 }}>
                {action.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                {action.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

const UserWelcomeCard = ({ user }: { user: any }) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        borderRadius: 2,
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
              width: 56,
              height: 56,
              borderRadius: 2,
              background: alpha('#ffffff', 0.15),
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
            }}
          >
            <Person sx={{ fontSize: 28, color: 'white' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight={700} mb={1} sx={{ lineHeight: 1.2 }}>
              Welcome Back, {user?.displayName && user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1).toLowerCase()}!
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 400 }}>
              Your workspace dashboard - manage bookings and stay productive
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
              borderRadius: 1.5,
              px: 3,
              py: 1,
              fontSize: '0.875rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: alpha('#ffffff', 0.25),
                transform: 'translateY(-1px)',
              }
            }}
            startIcon={<EventAvailable />}
          >
            Book a Room
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            sx={{ 
              borderColor: alpha('#ffffff', 0.3),
              borderWidth: 1,
              color: 'white',
              fontWeight: 600,
              borderRadius: 1.5,
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
            startIcon={<LocationOn />}
          >
            Find a Desk
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default function UserDashboard() {
  const { user } = useAuth();
  const { language } = useSettings();
  const theme = useTheme();
  const t = translations[language];

  return (
    <PageContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to your workspace management dashboard
        </Typography>
      </Box>

      {/* Welcome Card */}
      <Box sx={{ mb: 4 }}>
        <UserWelcomeCard user={user} />
      </Box>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {/* Analytics Cards */}
            <Grid item xs={12}>
              <AnalyticsCards />
            </Grid>

            {/* Floor Plan */}
            <Grid item xs={12}>
              <Card elevation={0} sx={{ p: 3, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 3 }}>
                  Floor Plan
                </Typography>
                <FloorPlan />
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Upcoming Bookings */}
            <Grid item xs={12}>
              <UpcomingBookingsCard />
            </Grid>

            {/* Quick Actions */}
            <Grid item xs={12}>
              <QuickActionsCard />
            </Grid>

            {/* IAQ Widgets */}
            <Grid item xs={12}>
              <Card elevation={0} sx={{ p: 3, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 3 }}>
                  Air Quality
                </Typography>
                <IAQWidgets />
              </Card>
            </Grid>

            {/* Notifications */}
            <Grid item xs={12}>
              <Card elevation={0} sx={{ p: 3, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 3 }}>
                  Notifications
                </Typography>
                <NotificationCenter />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
}