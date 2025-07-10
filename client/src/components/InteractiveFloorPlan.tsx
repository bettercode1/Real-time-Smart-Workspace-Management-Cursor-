import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  Chip,
  Grid,
  Paper,
  useTheme,
  alpha,
  Tooltip,
  Zoom
} from '@mui/material';
import {
  EventSeat,
  Computer,
  Phone,
  CheckCircle,
  Person,
  AccessTime,
  LocationOn
} from '@mui/icons-material';
import { keyframes } from '@mui/system';
import SeatBookingModal from './SeatBookingModal';

// Pulse animation for available seats
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
  100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
`;

// Success animation for newly booked seats
const successPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.6); transform: scale(1); }
  50% { box-shadow: 0 0 0 15px rgba(34, 197, 94, 0); transform: scale(1.1); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); transform: scale(1); }
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
  x: number;
  y: number;
  justBooked?: boolean;
}

const mockSeats: Seat[] = [
  // Desk area
  { id: '1', number: 'D01', type: 'desk', status: 'available', floor: 'Floor 2', zone: 'Open Workspace', amenities: ['WiFi', 'Power', 'Monitor'], x: 100, y: 150 },
  { id: '2', number: 'D02', type: 'desk', status: 'booked', floor: 'Floor 2', zone: 'Open Workspace', amenities: ['WiFi', 'Power'], bookedBy: 'John Doe', bookedUntil: '2:00 PM', x: 200, y: 150 },
  { id: '3', number: 'D03', type: 'desk', status: 'available', floor: 'Floor 2', zone: 'Open Workspace', amenities: ['WiFi', 'Power', 'Monitor'], x: 300, y: 150 },
  { id: '4', number: 'D04', type: 'desk', status: 'occupied', floor: 'Floor 2', zone: 'Open Workspace', amenities: ['WiFi', 'Power'], x: 400, y: 150 },
  { id: '5', number: 'D05', type: 'desk', status: 'available', floor: 'Floor 2', zone: 'Open Workspace', amenities: ['WiFi', 'Power', 'Monitor'], x: 500, y: 150 },
  
  // Meeting rooms
  { id: '6', number: 'M01', type: 'meeting', status: 'available', floor: 'Floor 2', zone: 'Meeting Area', amenities: ['WiFi', 'Projector', 'Whiteboard'], x: 150, y: 300 },
  { id: '7', number: 'M02', type: 'meeting', status: 'booked', floor: 'Floor 2', zone: 'Meeting Area', amenities: ['WiFi', 'Projector'], bookedBy: 'Sarah Team', bookedUntil: '3:30 PM', x: 350, y: 300 },
  
  // Phone booths
  { id: '8', number: 'P01', type: 'phone', status: 'available', floor: 'Floor 2', zone: 'Quiet Zone', amenities: ['WiFi', 'Power'], x: 100, y: 450 },
  { id: '9', number: 'P02', type: 'phone', status: 'available', floor: 'Floor 2', zone: 'Quiet Zone', amenities: ['WiFi', 'Power'], x: 200, y: 450 },
  { id: '10', number: 'P03', type: 'phone', status: 'occupied', floor: 'Floor 2', zone: 'Quiet Zone', amenities: ['WiFi', 'Power'], x: 300, y: 450 },
];

export default function InteractiveFloorPlan() {
  const theme = useTheme();
  const [seats, setSeats] = useState<Seat[]>(mockSeats);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'available') {
      setSelectedSeat(seat);
      setModalOpen(true);
    }
  };

  const handleBookingSuccess = (seatId: string) => {
    setSeats(prevSeats => 
      prevSeats.map(seat => 
        seat.id === seatId 
          ? { ...seat, status: 'booked' as const, justBooked: true, bookedBy: 'You', bookedUntil: '4:00 PM' }
          : seat
      )
    );

    // Remove the justBooked flag after animation
    setTimeout(() => {
      setSeats(prevSeats => 
        prevSeats.map(seat => 
          seat.id === seatId 
            ? { ...seat, justBooked: false }
            : seat
        )
      );
    }, 3000);
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.justBooked) return theme.palette.success.main;
    
    switch (seat.status) {
      case 'available': return theme.palette.primary.main;
      case 'booked': return theme.palette.warning.main;
      case 'occupied': return theme.palette.error.main;
      default: return theme.palette.grey[400];
    }
  };

  const getSeatIcon = (type: string) => {
    switch (type) {
      case 'desk': return <Computer sx={{ fontSize: 20 }} />;
      case 'meeting': return <EventSeat sx={{ fontSize: 20 }} />;
      case 'phone': return <Phone sx={{ fontSize: 20 }} />;
      default: return <EventSeat sx={{ fontSize: 20 }} />;
    }
  };

  const availableSeats = seats.filter(seat => seat.status === 'available').length;
  const bookedSeats = seats.filter(seat => seat.status === 'booked').length;
  const occupiedSeats = seats.filter(seat => seat.status === 'occupied').length;

  return (
    <Box>
      {/* Stats Overview */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{
            p: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <CheckCircle />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={700}>{availableSeats}</Typography>
                <Typography variant="body2" color="text.secondary">Available</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{
            p: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)}, ${alpha(theme.palette.warning.main, 0.05)})`,
            border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: theme.palette.warning.main,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <AccessTime />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={700}>{bookedSeats}</Typography>
                <Typography variant="body2" color="text.secondary">Booked</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{
            p: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)}, ${alpha(theme.palette.error.main, 0.05)})`,
            border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: theme.palette.error.main,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Person />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={700}>{occupiedSeats}</Typography>
                <Typography variant="body2" color="text.secondary">Occupied</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Floor Plan */}
      <Card elevation={0} sx={{ 
        p: 3, 
        borderRadius: 4,
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
        minHeight: 600,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Floor Plan - Click Available Seats to Book
        </Typography>

        {/* Legend */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Chip 
            icon={<CheckCircle />} 
            label="Available" 
            size="small" 
            sx={{ 
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
              fontWeight: 600
            }} 
          />
          <Chip 
            icon={<AccessTime />} 
            label="Booked" 
            size="small" 
            sx={{ 
              backgroundColor: alpha(theme.palette.warning.main, 0.1),
              color: 'warning.main',
              fontWeight: 600
            }} 
          />
          <Chip 
            icon={<Person />} 
            label="Occupied" 
            size="small" 
            sx={{ 
              backgroundColor: alpha(theme.palette.error.main, 0.1),
              color: 'error.main',
              fontWeight: 600
            }} 
          />
        </Box>

        {/* Interactive Floor Plan */}
        <Box sx={{ 
          position: 'relative', 
          width: '100%', 
          height: 500,
          background: `linear-gradient(135deg, ${alpha(theme.palette.grey[100], 0.5)}, ${alpha(theme.palette.grey[50], 0.8)})`,
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.grey[300], 0.3)}`,
          overflow: 'hidden'
        }}>
          {/* Zone Labels */}
          <Typography 
            variant="subtitle2" 
            sx={{ 
              position: 'absolute', 
              top: 120, 
              left: 20, 
              fontWeight: 700,
              color: 'text.secondary',
              backgroundColor: 'rgba(255,255,255,0.8)',
              px: 1,
              py: 0.5,
              borderRadius: 1
            }}
          >
            Open Workspace
          </Typography>
          
          <Typography 
            variant="subtitle2" 
            sx={{ 
              position: 'absolute', 
              top: 270, 
              left: 20, 
              fontWeight: 700,
              color: 'text.secondary',
              backgroundColor: 'rgba(255,255,255,0.8)',
              px: 1,
              py: 0.5,
              borderRadius: 1
            }}
          >
            Meeting Rooms
          </Typography>
          
          <Typography 
            variant="subtitle2" 
            sx={{ 
              position: 'absolute', 
              top: 420, 
              left: 20, 
              fontWeight: 700,
              color: 'text.secondary',
              backgroundColor: 'rgba(255,255,255,0.8)',
              px: 1,
              py: 0.5,
              borderRadius: 1
            }}
          >
            Phone Booths
          </Typography>

          {/* Seats */}
          {seats.map((seat) => (
            <Tooltip
              key={seat.id}
              title={
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {seat.type === 'desk' ? 'Desk' : seat.type === 'meeting' ? 'Meeting Room' : 'Phone Booth'} {seat.number}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Status: {seat.status === 'available' ? 'Available' : seat.status === 'booked' ? 'Booked' : 'Occupied'}
                  </Typography>
                  {seat.bookedBy && (
                    <Typography variant="body2">
                      Booked by: {seat.bookedBy} until {seat.bookedUntil}
                    </Typography>
                  )}
                  <Typography variant="body2">
                    Amenities: {seat.amenities.join(', ')}
                  </Typography>
                  {seat.status === 'available' && (
                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600, color: 'primary.main' }}>
                      Click to book!
                    </Typography>
                  )}
                </Box>
              }
              TransitionComponent={Zoom}
              arrow
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: seat.x,
                  top: seat.y,
                  width: seat.type === 'meeting' ? 120 : 60,
                  height: seat.type === 'meeting' ? 80 : 40,
                  backgroundColor: getSeatColor(seat),
                  color: 'white',
                  borderRadius: seat.type === 'meeting' ? 2 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  cursor: seat.status === 'available' ? 'pointer' : 'default',
                  transition: 'all 0.3s ease',
                  animation: seat.status === 'available' 
                    ? `${pulse} 2s infinite`
                    : seat.justBooked 
                    ? `${successPulse} 1s ease-in-out 3`
                    : 'none',
                  '&:hover': seat.status === 'available' ? {
                    transform: 'scale(1.1)',
                    boxShadow: `0 4px 12px ${alpha(getSeatColor(seat), 0.4)}`,
                  } : {},
                  boxShadow: `0 2px 8px ${alpha(getSeatColor(seat), 0.3)}`,
                }}
                onClick={() => handleSeatClick(seat)}
              >
                {getSeatIcon(seat.type)}
                <Typography variant="caption" fontWeight={600} sx={{ fontSize: 10, mt: 0.5 }}>
                  {seat.number}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Card>

      {/* Booking Modal */}
      <SeatBookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        seat={selectedSeat}
        onBookingSuccess={handleBookingSuccess}
      />
    </Box>
  );
}