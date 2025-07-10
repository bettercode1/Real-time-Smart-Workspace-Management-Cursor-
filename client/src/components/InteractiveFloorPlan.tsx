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
  // Floor 1
  { id: '11', number: 'D11', type: 'desk', status: 'available', floor: 'Floor 1', zone: 'Open Workspace', amenities: ['WiFi', 'Power'], x: 100, y: 60 },
  { id: '12', number: 'D12', type: 'desk', status: 'booked', floor: 'Floor 1', zone: 'Open Workspace', amenities: ['WiFi', 'Power'], bookedBy: 'Alice', bookedUntil: '1:00 PM', x: 200, y: 60 },
  { id: '13', number: 'M11', type: 'meeting', status: 'available', floor: 'Floor 1', zone: 'Meeting Area', amenities: ['WiFi', 'Projector'], x: 150, y: 180 },
  { id: '14', number: 'P11', type: 'phone', status: 'occupied', floor: 'Floor 1', zone: 'Quiet Zone', amenities: ['WiFi'], x: 100, y: 300 },

  // Floor 2 (existing)
  { id: '1', number: 'D01', type: 'desk', status: 'available', floor: 'Floor 2', zone: 'Open Workspace', amenities: ['WiFi', 'Power', 'Monitor'], x: 100, y: 60 },
  { id: '2', number: 'D02', type: 'desk', status: 'booked', floor: 'Floor 2', zone: 'Open Workspace', amenities: ['WiFi', 'Power'], bookedBy: 'John Doe', bookedUntil: '2:00 PM', x: 200, y: 60 },
  { id: '3', number: 'D03', type: 'desk', status: 'available', floor: 'Floor 2', zone: 'Open Workspace', amenities: ['WiFi', 'Power', 'Monitor'], x: 300, y: 60 },
  { id: '4', number: 'D04', type: 'desk', status: 'occupied', floor: 'Floor 2', zone: 'Open Workspace', amenities: ['WiFi', 'Power'], x: 400, y: 60 },
  { id: '5', number: 'D05', type: 'desk', status: 'available', floor: 'Floor 2', zone: 'Open Workspace', amenities: ['WiFi', 'Power', 'Monitor'], x: 500, y: 60 },
  { id: '6', number: 'M01', type: 'meeting', status: 'available', floor: 'Floor 2', zone: 'Meeting Area', amenities: ['WiFi', 'Projector', 'Whiteboard'], x: 150, y: 180 },
  { id: '7', number: 'M02', type: 'meeting', status: 'booked', floor: 'Floor 2', zone: 'Meeting Area', amenities: ['WiFi', 'Projector'], bookedBy: 'Sarah Team', bookedUntil: '3:30 PM', x: 350, y: 180 },
  { id: '8', number: 'P01', type: 'phone', status: 'available', floor: 'Floor 2', zone: 'Quiet Zone', amenities: ['WiFi', 'Power'], x: 100, y: 300 },
  { id: '9', number: 'P02', type: 'phone', status: 'available', floor: 'Floor 2', zone: 'Quiet Zone', amenities: ['WiFi', 'Power'], x: 200, y: 300 },
  { id: '10', number: 'P03', type: 'phone', status: 'occupied', floor: 'Floor 2', zone: 'Quiet Zone', amenities: ['WiFi', 'Power'], x: 300, y: 300 },

  // Floor 3
  { id: '15', number: 'D21', type: 'desk', status: 'available', floor: 'Floor 3', zone: 'Open Workspace', amenities: ['WiFi', 'Power'], x: 100, y: 60 },
  { id: '16', number: 'D22', type: 'desk', status: 'booked', floor: 'Floor 3', zone: 'Open Workspace', amenities: ['WiFi', 'Power'], bookedBy: 'Bob', bookedUntil: '11:00 AM', x: 200, y: 60 },
  { id: '17', number: 'M21', type: 'meeting', status: 'available', floor: 'Floor 3', zone: 'Meeting Area', amenities: ['WiFi', 'Projector'], x: 150, y: 180 },
  { id: '18', number: 'P21', type: 'phone', status: 'available', floor: 'Floor 3', zone: 'Quiet Zone', amenities: ['WiFi'], x: 100, y: 300 },

  // Floor 4
  { id: '19', number: 'D31', type: 'desk', status: 'available', floor: 'Floor 4', zone: 'Open Workspace', amenities: ['WiFi', 'Power'], x: 100, y: 60 },
  { id: '20', number: 'D32', type: 'desk', status: 'booked', floor: 'Floor 4', zone: 'Open Workspace', amenities: ['WiFi', 'Power'], bookedBy: 'Carol', bookedUntil: '5:00 PM', x: 200, y: 60 },
  { id: '21', number: 'M31', type: 'meeting', status: 'available', floor: 'Floor 4', zone: 'Meeting Area', amenities: ['WiFi', 'Projector'], x: 150, y: 180 },
  { id: '22', number: 'P31', type: 'phone', status: 'available', floor: 'Floor 4', zone: 'Quiet Zone', amenities: ['WiFi'], x: 100, y: 300 },
];

// Add selectedFloor prop to the component
type InteractiveFloorPlanProps = {
  selectedFloor: string;
  currentFloor: { value: string; label: string; rooms: number; available: number } | undefined;
  floors: Array<{ value: string; label: string; rooms: number; available: number }>;
};

export default function InteractiveFloorPlan({ selectedFloor, currentFloor, floors }: InteractiveFloorPlanProps) {
  const theme = useTheme();
  const [seats, setSeats] = useState<Seat[]>(mockSeats);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter seats by selectedFloor
  const filteredSeats = seats.filter(seat => seat.floor.replace(/\s+/g, '-').toLowerCase() === selectedFloor.replace(/\s+/g, '-').toLowerCase() || seat.floor === selectedFloor);

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

  // Only count stats for filtered seats
  const availableSeats = filteredSeats.filter(seat => seat.status === 'available').length;
  const bookedSeats = filteredSeats.filter(seat => seat.status === 'booked').length;
  const occupiedSeats = filteredSeats.filter(seat => seat.status === 'occupied').length;

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {/* Interactive Floor Plan Visualization */}
      <Box sx={{
        position: 'relative',
        width: '100%',
        height: '400px',
        backgroundColor: '#f8fafc',
        borderRadius: 2,
        border: `2px solid ${theme.palette.divider}`,
        overflow: 'hidden'
      }}>
        {/* Floor Plan Background */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              ${alpha(theme.palette.grey[300], 0.1)},
              ${alpha(theme.palette.grey[300], 0.1)} 1px,
              transparent 1px,
              transparent 20px
            ),
            repeating-linear-gradient(
              90deg,
              ${alpha(theme.palette.grey[300], 0.1)},
              ${alpha(theme.palette.grey[300], 0.1)} 1px,
              transparent 1px,
              transparent 20px
            )
          `,
        }} />

        {/* Zone Labels */}
        <Typography 
          variant="h6" 
          fontWeight={600} 
          sx={{ 
            position: 'absolute',
            top: 20,
            left: 20,
            color: theme.palette.text.secondary
          }}
        >
          Open Workspace
        </Typography>

        <Typography 
          variant="h6" 
          fontWeight={600} 
          sx={{ 
            position: 'absolute',
            top: 140,
            left: 20,
            color: theme.palette.text.secondary
          }}
        >
          Meeting Rooms
        </Typography>

        <Typography 
          variant="h6" 
          fontWeight={600} 
          sx={{ 
            position: 'absolute',
            top: 260,
            left: 20,
            color: theme.palette.text.secondary
          }}
        >
          Phone Booths
        </Typography>

        {/* Render seats for selected floor only */}
        {filteredSeats.map((seat) => (
          <Tooltip
            key={seat.id}
            title={
              <Box sx={{ p: 1 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {seat.number} - {seat.type.charAt(0).toUpperCase() + seat.type.slice(1)}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Status: {seat.status.charAt(0).toUpperCase() + seat.status.slice(1)}
                </Typography>
                {seat.status === 'available' && (
                  <Typography variant="body2" color="success.main" fontWeight={600}>
                    Click to book!
                  </Typography>
                )}
                {seat.bookedBy && (
                  <Typography variant="body2">
                    Booked by: {seat.bookedBy} until {seat.bookedUntil}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  Amenities: {seat.amenities.join(', ')}
                </Typography>
              </Box>
            }
            placement="top"
            arrow
          >
            <Box
              sx={{
                position: 'absolute',
                left: seat.x,
                top: seat.y,
                width: seat.type === 'meeting' ? 80 : 60,
                height: seat.type === 'meeting' ? 50 : 40,
                backgroundColor: getSeatColor(seat),
                borderRadius: seat.type === 'meeting' ? 3 : 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                cursor: seat.status === 'available' ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                animation: seat.status === 'available'
                  ? `${pulse} 2s infinite`
                  : seat.justBooked
                  ? `${successPulse} 2s ease-out`
                  : 'none',
                '&:hover': seat.status === 'available' ? {
                  transform: 'scale(1.1)',
                  boxShadow: `0 4px 20px ${alpha(getSeatColor(seat), 0.4)}`,
                  zIndex: 10
                } : {},
                border: `2px solid ${alpha(getSeatColor(seat), 0.3)}`,
                boxShadow: `0 2px 8px ${alpha(getSeatColor(seat), 0.2)}`
              }}
              onClick={() => handleSeatClick(seat)}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                {getSeatIcon(seat.type)}
                <Typography variant="caption" fontWeight={700}>
                  {seat.number}
                </Typography>
              </Box>
            </Box>
          </Tooltip>
        ))}
      </Box>

      {/* Real-time Statistics */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.main
            }} />
            <Typography variant="body2" fontWeight={600}>
              {/* Show available/total from currentFloor if available */}
              {currentFloor ? `${currentFloor.available} of ${currentFloor.rooms} Available` : `${availableSeats} Available`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: theme.palette.warning.main
            }} />
            <Typography variant="body2" fontWeight={600}>
              {bookedSeats} Booked
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: theme.palette.error.main
            }} />
            <Typography variant="body2" fontWeight={600}>
              {occupiedSeats} Occupied
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
          Live updates every 30 seconds
        </Typography>
      </Box>

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