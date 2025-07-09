import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  alpha,
  Chip
} from "@mui/material";
import {
  Add,
  AccessTime,
  LocationOn,
  Group,
  Schedule
} from "@mui/icons-material";

const QuickBooking = () => {
  const theme = useTheme();
  const [bookingData, setBookingData] = useState({
    room: '',
    date: '',
    time: '',
    duration: '',
    purpose: ''
  });

  const rooms = [
    'Meeting Room 1',
    'Meeting Room 2',
    'Conference Room A',
    'Conference Room B',
    'Desk A-15',
    'Desk B-22',
    'Lounge Area',
    'Quiet Zone'
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM'
  ];

  const durations = [
    '30 minutes',
    '1 hour',
    '2 hours',
    '4 hours',
    'Full day'
  ];

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Handle booking submission
    console.log('Booking submitted:', bookingData);
    // Reset form
    setBookingData({
      room: '',
      date: '',
      time: '',
      duration: '',
      purpose: ''
    });
  };

  const isFormValid = bookingData.room && bookingData.date && bookingData.time && bookingData.duration;

  return (
    <Card elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box sx={{ 
          p: 1, 
          borderRadius: 2, 
          background: alpha(theme.palette.success.main, 0.1),
          color: theme.palette.success.main
        }}>
          <Add sx={{ fontSize: 20 }} />
        </Box>
        <Typography variant="h6" fontWeight={600} color="text.primary">
          Quick Booking
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* Room Selection */}
        <FormControl fullWidth size="small">
          <InputLabel>Select Room</InputLabel>
          <Select
            value={bookingData.room}
            label="Select Room"
            onChange={(e) => handleInputChange('room', e.target.value)}
            startAdornment={<LocationOn sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
          >
            {rooms.map((room) => (
              <MenuItem key={room} value={room}>
                {room}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Date and Time */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            label="Date"
            type="date"
            value={bookingData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1 }}
          />
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>Time</InputLabel>
            <Select
              value={bookingData.time}
              label="Time"
              onChange={(e) => handleInputChange('time', e.target.value)}
              startAdornment={<AccessTime sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
            >
              {timeSlots.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Duration */}
        <FormControl fullWidth size="small">
          <InputLabel>Duration</InputLabel>
          <Select
            value={bookingData.duration}
            label="Duration"
            onChange={(e) => handleInputChange('duration', e.target.value)}
            startAdornment={<Schedule sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />}
          >
            {durations.map((duration) => (
              <MenuItem key={duration} value={duration}>
                {duration}
              </MenuItem>
            ))}
            </Select>
        </FormControl>

        {/* Purpose */}
        <TextField
          fullWidth
          size="small"
          label="Purpose (optional)"
          value={bookingData.purpose}
          onChange={(e) => handleInputChange('purpose', e.target.value)}
          multiline
          rows={2}
          placeholder="Meeting, work session, collaboration..."
        />

        {/* Quick Purpose Chips */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {['Team Meeting', 'Client Call', 'Focus Work', 'Collaboration'].map((purpose) => (
            <Chip
              key={purpose}
              label={purpose}
              size="small"
              onClick={() => handleInputChange('purpose', purpose)}
              sx={{
                backgroundColor: bookingData.purpose === purpose 
                  ? alpha(theme.palette.primary.main, 0.1)
                  : alpha(theme.palette.grey[100], 0.8),
                color: bookingData.purpose === purpose 
                  ? theme.palette.primary.main
                  : 'text.secondary',
                fontWeight: 500,
                fontSize: '0.7rem',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                }
              }}
            />
          ))}
        </Box>

        {/* Submit Button */}
          <Button 
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={!isFormValid}
          startIcon={<Group />}
          sx={{
            mt: 1,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            background: isFormValid 
              ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
              : theme.palette.grey[300],
            '&:hover': {
              background: isFormValid 
                ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
                : theme.palette.grey[300],
            }
          }}
        >
          Book Now
          </Button>
      </Box>

      {/* Info Text */}
      <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#334155'}` }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Schedule sx={{ fontSize: 14 }} />
          Bookings are confirmed instantly for available slots
        </Typography>
      </Box>
    </Card>
  );
};

export default QuickBooking;
