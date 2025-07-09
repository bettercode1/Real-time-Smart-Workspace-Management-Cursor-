import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Chip,
  Button,
  useTheme,
  alpha
} from "@mui/material";
import {
  CalendarToday,
  AccessTime,
  LocationOn,
  Add,
  EventAvailable
} from "@mui/icons-material";

interface Booking {
  id: string;
  room: string;
  date: string;
  time: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const BookingCalendar = () => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const mockBookings: Booking[] = [
    {
      id: '1',
      room: 'Meeting Room 1',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '2 hours',
      status: 'confirmed'
    },
    {
      id: '2',
      room: 'Desk A-15',
      date: '2024-01-15',
      time: '2:00 PM',
      duration: '4 hours',
      status: 'confirmed'
    },
    {
      id: '3',
      room: 'Lounge Area',
      date: '2024-01-16',
      time: '11:00 AM',
      duration: '1 hour',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return theme.palette.success.main;
      case 'pending': return theme.palette.warning.main;
      case 'cancelled': return theme.palette.error.main;
      default: return theme.palette.grey[500];
    }
  };

  const getStatusLabel = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const todayBookings = mockBookings.filter(booking => 
    booking.date === selectedDate.toISOString().split('T')[0]
  );

  return (
    <Card elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ 
            p: 1, 
            borderRadius: 2, 
            background: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main
          }}>
            <CalendarToday sx={{ fontSize: 20 }} />
          </Box>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Today's Schedule
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Add />}
          sx={{
            borderColor: alpha(theme.palette.primary.main, 0.3),
            color: theme.palette.primary.main,
            fontSize: '0.75rem',
            textTransform: 'none',
            '&:hover': {
              borderColor: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
            }
          }}
        >
          New Booking
        </Button>
      </Box>

      {todayBookings.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {todayBookings.map((booking) => (
            <Box
              key={booking.id}
              sx={{
                p: 2,
                borderRadius: 2,
                background: theme.palette.mode === 'light' 
                  ? alpha(theme.palette.grey[50], 0.8)
                  : alpha(theme.palette.grey[800], 0.8),
                border: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#334155'}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: alpha(getStatusColor(booking.status), 0.04),
                  borderColor: alpha(getStatusColor(booking.status), 0.2),
                  transform: 'translateY(-1px)',
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                  {booking.room}
                </Typography>
                </Box>
                <Chip
                  label={getStatusLabel(booking.status)}
                  size="small"
                  sx={{
                    backgroundColor: alpha(getStatusColor(booking.status), 0.1),
                    color: getStatusColor(booking.status),
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    height: 20,
                    textTransform: 'capitalize'
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                    {booking.time}
                </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <EventAvailable sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {booking.duration}
                </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ 
          textAlign: 'center', 
          py: 4,
          color: 'text.secondary'
        }}>
          <CalendarToday sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
          <Typography variant="body1" fontWeight={500} mb={1}>
            No bookings today
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You're all caught up! Time to plan your next session.
            </Typography>
        </Box>
      )}

      <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#334155'}` }}>
        <Typography variant="caption" color="text.secondary">
          {todayBookings.length} booking{todayBookings.length !== 1 ? 's' : ''} today
        </Typography>
      </Box>
    </Card>
  );
};

export default BookingCalendar; 