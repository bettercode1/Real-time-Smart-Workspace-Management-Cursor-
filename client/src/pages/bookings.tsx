import React, { useState } from "react";
import { 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  Box,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha,
  LinearProgress
} from "@mui/material";
import {
  CalendarToday,
  Schedule,
  Person,
  Room,
  CheckCircle,
  Cancel,
  Edit,
  Add,
  EventAvailable,
  EventBusy,
  AccessTime,
  People,
  LocationOn,
  Today,
  Upcoming,
  History,
  TrendingUp
} from "@mui/icons-material";
import BookingCalendar from "@/components/BookingCalendar";
import QuickBooking from "@/components/QuickBooking";
import UserSummary from "@/components/UserSummary";
import PageContainer from "@/components/PageContainer";

interface Booking {
  id: string;
  title: string;
  room: string;
  date: string;
  time: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  attendees: number;
  organizer: string;
  type: 'meeting' | 'desk' | 'event';
}

const mockBookings: Booking[] = [
  {
    id: '1',
    title: 'Team Standup',
    room: 'Meeting Room 1',
    date: '2024-01-15',
    time: '09:00 - 10:00',
    duration: '1 hour',
    status: 'confirmed',
    attendees: 8,
    organizer: 'John Doe',
    type: 'meeting'
  },
  {
    id: '2',
    title: 'Project Review',
    room: 'Conference Room A',
    date: '2024-01-15',
    time: '14:00 - 15:30',
    duration: '1.5 hours',
    status: 'pending',
    attendees: 12,
    organizer: 'Jane Smith',
    type: 'meeting'
  },
  {
    id: '3',
    title: 'Desk Booking',
    room: 'Open Space - Desk 15',
    date: '2024-01-16',
    time: '08:00 - 17:00',
    duration: '8 hours',
    status: 'confirmed',
    attendees: 1,
    organizer: 'Mike Johnson',
    type: 'desk'
  },
  {
    id: '4',
    title: 'Client Presentation',
    room: 'Executive Conference',
    date: '2024-01-17',
    time: '10:00 - 11:30',
    duration: '1.5 hours',
    status: 'confirmed',
    attendees: 6,
    organizer: 'Sarah Wilson',
    type: 'meeting'
  },
  {
    id: '5',
    title: 'Training Session',
    room: 'Training Room Alpha',
    date: '2024-01-18',
    time: '13:00 - 16:00',
    duration: '3 hours',
    status: 'cancelled',
    attendees: 15,
    organizer: 'David Brown',
    type: 'event'
  }
];

const BookingStatsCard = () => {
  const theme = useTheme();
  const stats = {
    totalBookings: mockBookings.length,
    confirmed: mockBookings.filter(b => b.status === 'confirmed').length,
    pending: mockBookings.filter(b => b.status === 'pending').length,
    cancelled: mockBookings.filter(b => b.status === 'cancelled').length,
    utilizationRate: 78
  };

  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Booking Statistics
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                {stats.totalBookings}
              </Typography>
              <Typography variant="caption" color="text.secondary">Total Bookings</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.success.main, 0.1) }}>
              <Typography variant="h4" fontWeight={700} color="success.main">
                {stats.confirmed}
              </Typography>
              <Typography variant="caption" color="text.secondary">Confirmed</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.warning.main, 0.1) }}>
              <Typography variant="h4" fontWeight={700} color="warning.main">
                {stats.pending}
              </Typography>
              <Typography variant="caption" color="text.secondary">Pending</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.error.main, 0.1) }}>
              <Typography variant="h4" fontWeight={700} color="error.main">
                {stats.cancelled}
              </Typography>
              <Typography variant="caption" color="text.secondary">Cancelled</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2">Utilization Rate</Typography>
            <Typography variant="subtitle2" color="primary.main">{stats.utilizationRate}%</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={stats.utilizationRate} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundColor: theme.palette.primary.main
              }
            }}
          />
        </Box>

        <Button variant="outlined" fullWidth startIcon={<TrendingUp />} size="small">
          View Analytics
        </Button>
      </CardContent>
    </Card>
  );
};

const UpcomingBookingsCard = () => {
  const theme = useTheme();
  const upcomingBookings = mockBookings.filter(b => b.status === 'confirmed').slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return theme.palette.success.main;
      case 'pending': return theme.palette.warning.main;
      case 'cancelled': return theme.palette.error.main;
      default: return theme.palette.grey[500];
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <People />;
      case 'desk': return <LocationOn />;
      case 'event': return <EventAvailable />;
      default: return <Schedule />;
    }
  };

  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            Upcoming Bookings
          </Typography>
          <Button size="small" startIcon={<Add />}>
            New Booking
          </Button>
        </Box>

        <List sx={{ p: 0 }}>
          {upcomingBookings.map((booking, index) => (
            <ListItem key={booking.id} sx={{ px: 0, py: 1.5 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{ 
                    backgroundColor: alpha(getStatusColor(booking.status), 0.1),
                    color: getStatusColor(booking.status)
                  }}
                >
                  {getTypeIcon(booking.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {booking.title}
                    </Typography>
                    <Chip 
                      label={booking.status}
                      size="small"
                      color={booking.status === 'confirmed' ? 'success' : 'warning'}
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {booking.room} • {booking.time}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {booking.attendees} attendees • {booking.organizer}
                    </Typography>
                  </Box>
                }
              />
              <IconButton size="small" color="primary">
                <Edit />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Button variant="outlined" fullWidth startIcon={<History />} size="small">
          View All Bookings
        </Button>
      </CardContent>
    </Card>
  );
};

export default function BookingsPage() {
  const theme = useTheme();

  return (
    <PageContainer
      title="Room & Desk Booking"
      description="Manage your workspace reservations and check availability"
    >
      <Grid container spacing={3}>
        {/* Booking Statistics */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Booking Overview
              </Typography>
              <Button variant="contained" startIcon={<Add />}>
                New Booking
              </Button>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>24</Typography>
                  <Typography variant="caption">Today's Bookings</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'success.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>18</Typography>
                  <Typography variant="caption">Active Now</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'warning.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>3</Typography>
                  <Typography variant="caption">Pending</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'info.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>85%</Typography>
                  <Typography variant="caption">Utilization</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Main Booking Calendar */}
        <Grid item xs={12} lg={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3,
              backgroundColor: 'background.paper',
              minHeight: '600px'
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Booking Calendar
            </Typography>
            <BookingCalendar />
          </Paper>
        </Grid>

        {/* Sidebar - Quick Booking & Summary */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Quick Booking */}
            <Grid item xs={12}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  backgroundColor: 'background.paper'
                }}
              >
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Quick Booking
                </Typography>
                <QuickBooking />
              </Paper>
            </Grid>

            {/* User Summary */}
            <Grid item xs={12}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  backgroundColor: 'background.paper'
                }}
              >
                <UserSummary />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Booking Statistics */}
        <Grid item xs={12} md={6}>
          <BookingStatsCard />
        </Grid>

        {/* Upcoming Bookings */}
        <Grid item xs={12} md={6}>
          <UpcomingBookingsCard />
        </Grid>
      </Grid>
    </PageContainer>
  );
}