import React from "react";
import { Typography, Card, Paper, Button, IconButton, Chip, useTheme, alpha, Grid, Box } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { Person, Bookmark, TrendingUp, Notifications, Dashboard, EventAvailable, AccessTime, LocationOn } from "@mui/icons-material";
import FloorPlan from "@/components/FloorPlan";
import IAQWidgets from "@/components/IAQWidgets";
import NotificationCenter from "@/components/NotificationCenter";
import AnalyticsCards from "@/components/AnalyticsCards";
import BookingCalendar from "@/components/BookingCalendar";
import UserSummary from "@/components/UserSummary";
import Suggestions from "@/components/Suggestions";
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

const WelcomeCard = ({ user }: { user: any }) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        borderRadius: 3,
        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
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
            <Person sx={{ fontSize: 32, color: 'white' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight={700} mb={1} sx={{ lineHeight: 1.2 }}>
              Welcome back, {user?.displayName}!
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 400 }}>
              Ready to make the most of your workspace today?
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
            startIcon={<Bookmark />}
          >
            Quick Book
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
            startIcon={<TrendingUp />}
          >
            View Analytics
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

const UpcomingBookingsCard = () => {
  const theme = useTheme();
  
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
    <Card elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Upcoming Bookings
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {bookings.map((booking, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              borderRadius: 2,
              background: theme.palette.mode === 'light' 
                ? alpha(theme.palette.grey[50], 0.8)
                : alpha(theme.palette.grey[800], 0.8),
              border: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#334155'}`,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                {booking.room}
              </Typography>
              <Chip
                label={booking.status}
                size="small"
                sx={{
                  backgroundColor: alpha(getStatusColor(booking.status), 0.1),
                  color: getStatusColor(booking.status),
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  height: 20,
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {booking.time}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {booking.location} • {booking.date}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

const QuickActionsCard = () => {
  const theme = useTheme();
  
  const actions = [
    { title: "Book a Room", icon: <EventAvailable />, color: theme.palette.primary.main },
    { title: "Find a Desk", icon: <LocationOn />, color: theme.palette.success.main },
    { title: "View Schedule", icon: <AccessTime />, color: theme.palette.info.main },
    { title: "Get Help", icon: <Notifications />, color: theme.palette.warning.main },
  ];

  return (
    <Card elevation={0} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid item xs={6} key={index}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: theme.palette.mode === 'light' 
                  ? `linear-gradient(135deg, ${alpha(action.color, 0.04)} 0%, ${alpha(action.color, 0.08)} 100%)`
                  : `linear-gradient(135deg, ${alpha(action.color, 0.1)} 0%, ${alpha(action.color, 0.15)} 100%)`,
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
                  p: 1,
                  borderRadius: 1,
                  background: `linear-gradient(135deg, ${action.color} 0%, ${alpha(action.color, 0.8)} 100%)`,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  mx: 'auto',
                  mb: 1
                }}
              >
                {action.icon}
              </Box>
              <Typography variant="caption" fontWeight={600} color="text.primary">
                {action.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default function UserDashboard() {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <PageContainer
      title="User Dashboard"
      description="Your personalized workspace overview and quick actions"
    >
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <WelcomeCard user={user} />
        </Grid>
        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <QuickStatsCard title="Bookings" value="5" subtitle="Upcoming" color={theme.palette.primary.main} icon={<EventAvailable />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <QuickStatsCard title="Notifications" value="2" subtitle="Unread" color={theme.palette.warning.main} icon={<Notifications />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <QuickStatsCard title="Analytics" value="View" subtitle="Usage trends" color={theme.palette.info.main} icon={<TrendingUp />} />
        </Grid>
        {/* Booking Calendar & Suggestions */}
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 3, background: 'background.paper', minHeight: 340 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Booking Calendar
            </Typography>
            <BookingCalendar />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 3, background: 'background.paper', minHeight: 340 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              AI Suggestions
            </Typography>
            <Suggestions />
          </Paper>
        </Grid>
        {/* User Summary & Notifications */}
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 3, background: 'background.paper', minHeight: 240 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Personal Summary
            </Typography>
            <UserSummary />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 3, background: 'background.paper', minHeight: 240 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Notifications
            </Typography>
            <NotificationCenter />
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}