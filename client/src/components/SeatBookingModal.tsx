import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Alert,
  Snackbar,
  Fade,
  Slide
} from '@mui/material';
import {
  Close,
  EventSeat,
  AccessTime,
  Person,
  CheckCircle,
  LocationOn,
  Wifi,
  PowerSettingsNew,
  Computer
} from '@mui/icons-material';
import { useTheme, alpha, keyframes } from '@mui/system';
import LoadingSpinner from './LoadingSpinner';

// Animation for success celebration
const celebrate = keyframes`
  0% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
  100% { transform: scale(1) rotate(360deg); opacity: 1; }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
  40%, 43% { transform: translateY(-20px); }
`;

interface Seat {
  id: string;
  number: string;
  type: 'desk' | 'meeting' | 'phone';
  status: 'available' | 'booked' | 'occupied';
  floor: string;
  zone: string;
  amenities: string[];
  bookedBy?: string;
  bookedUntil?: string;
}

interface SeatBookingModalProps {
  open: boolean;
  onClose: () => void;
  seat: Seat | null;
  onBookingSuccess: (seatId: string) => void;
}

export default function SeatBookingModal({ 
  open, 
  onClose, 
  seat, 
  onBookingSuccess 
}: SeatBookingModalProps) {
  const theme = useTheme();
  const [booking, setBooking] = useState(false);
  const [duration, setDuration] = useState('2');
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleBookSeat = async () => {
    if (!seat) return;
    
    setBooking(true);
    
    // Simulate booking API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setBooking(false);
    setBookingComplete(true);
    setShowSuccess(true);
    
    // Notify parent component
    onBookingSuccess(seat.id);
    
    // Auto close after celebration
    setTimeout(() => {
      onClose();
      setBookingComplete(false);
      setShowSuccess(false);
    }, 3000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'desk': return <Computer />;
      case 'meeting': return <EventSeat />;
      case 'phone': return <EventSeat />;
      default: return <EventSeat />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'desk': return theme.palette.primary.main;
      case 'meeting': return theme.palette.success.main;
      case 'phone': return theme.palette.warning.main;
      default: return theme.palette.grey[500];
    }
  };

  if (!seat) return null;

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="sm" 
        fullWidth
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'up' }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          pb: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                background: `linear-gradient(45deg, ${getTypeColor(seat.type)}, ${alpha(getTypeColor(seat.type), 0.7)})`,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {getTypeIcon(seat.type)}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {seat.type === 'desk' ? 'Desk' : seat.type === 'meeting' ? 'Meeting Room' : 'Phone Booth'} {seat.number}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {seat.floor} • {seat.zone}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {bookingComplete ? (
            <Fade in={bookingComplete}>
              <Box sx={{ 
                textAlign: 'center', 
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3
              }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: `${celebrate} 1s ease-in-out`,
                    boxShadow: `0 0 20px ${alpha(theme.palette.success.main, 0.4)}`,
                  }}
                >
                  <CheckCircle sx={{ fontSize: 40 }} />
                </Box>
                
                <Box>
                  <Typography variant="h5" fontWeight={700} color="success.main" sx={{ mb: 1 }}>
                    Seat Booked Successfully!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {seat.type === 'desk' ? 'Desk' : seat.type === 'meeting' ? 'Meeting Room' : 'Phone Booth'} {seat.number} is now reserved for you
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <AccessTime sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight={600}>
                      {duration} hours
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <LocationOn sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
                    <Typography variant="body2" fontWeight={600}>
                      {seat.zone}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          ) : (
            <>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                  Seat Details
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card elevation={0} sx={{ 
                      p: 2, 
                      background: alpha(theme.palette.primary.main, 0.05),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <LocationOn sx={{ fontSize: 20, color: 'primary.main' }} />
                        <Typography variant="body2" fontWeight={600}>Location</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {seat.floor}, {seat.zone}
                      </Typography>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Card elevation={0} sx={{ 
                      p: 2, 
                      background: alpha(theme.palette.success.main, 0.05),
                      border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CheckCircle sx={{ fontSize: 20, color: 'success.main' }} />
                        <Typography variant="body2" fontWeight={600}>Status</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Available Now
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                  Amenities
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {seat.amenities.map((amenity, index) => {
                    const getAmenityIcon = (name: string) => {
                      switch (name.toLowerCase()) {
                        case 'wifi': return <Wifi sx={{ fontSize: 16 }} />;
                        case 'power': return <PowerSettingsNew sx={{ fontSize: 16 }} />;
                        case 'monitor': return <Computer sx={{ fontSize: 16 }} />;
                        default: return <CheckCircle sx={{ fontSize: 16 }} />;
                      }
                    };
                    
                    return (
                      <Chip
                        key={index}
                        icon={getAmenityIcon(amenity)}
                        label={amenity}
                        size="small"
                        sx={{
                          backgroundColor: alpha(theme.palette.info.main, 0.1),
                          color: 'info.main',
                          fontWeight: 500
                        }}
                      />
                    );
                  })}
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                  Booking Duration
                </Typography>
                <Grid container spacing={1}>
                  {['1', '2', '4', '8'].map((hours) => (
                    <Grid item xs={3} key={hours}>
                      <Button
                        variant={duration === hours ? 'contained' : 'outlined'}
                        fullWidth
                        onClick={() => setDuration(hours)}
                        sx={{ borderRadius: 2 }}
                      >
                        {hours}h
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          )}
        </DialogContent>

        {!bookingComplete && (
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button onClick={onClose} sx={{ borderRadius: 2 }}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleBookSeat}
              disabled={booking}
              startIcon={booking ? <LoadingSpinner size={16} variant="modern" /> : <EventSeat />}
              sx={{ 
                borderRadius: 2, 
                minWidth: 120,
                background: booking ? undefined : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
              }}
            >
              {booking ? 'Booking...' : 'Book Seat'}
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {/* Success Toast */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'down' }}
      >
        <Alert
          severity="success"
          sx={{
            width: '100%',
            fontWeight: 600,
            boxShadow: `0 4px 12px ${alpha(theme.palette.success.main, 0.3)}`,
            animation: `${bounce} 2s ease-in-out`,
          }}
        >
          🎉 Seat booked successfully! Check your bookings for details.
        </Alert>
      </Snackbar>
    </>
  );
}