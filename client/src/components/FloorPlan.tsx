import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Chip, 
  Grid, 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  IconButton,
  Divider,
  Alert,
  useTheme,
  alpha
} from "@mui/material";
import { 
  EventAvailable, 
  Person, 
  AccessTime, 
  LocationOn, 
  Air, 
  Thermostat, 
  WaterDrop,
  Close,
  BookmarkAdd,
  Groups
} from "@mui/icons-material";

const rooms = [
  {
    id: "meeting1",
    name: "Meeting Room 1",
    type: "meeting",
    capacity: 8,
    co2: 420,
    humidity: 45,
    temperature: 22,
    zone: "Floor 1 - East Wing",
    equipment: ["Projector", "Whiteboard", "Video Conference"],
    desks: [
      { id: "m1d1", status: "available", type: "chair" },
      { id: "m1d2", status: "available", type: "chair" },
      { id: "m1d3", status: "available", type: "chair" },
      { id: "m1d4", status: "available", type: "chair" },
      { id: "m1d5", status: "available", type: "chair" },
      { id: "m1d6", status: "available", type: "chair" },
    ],
  },
  {
    id: "meeting2",
    name: "Meeting Room 2",
    type: "meeting",
    capacity: 6,
    co2: 480,
    humidity: 50,
    temperature: 23,
    zone: "Floor 1 - West Wing",
    equipment: ["Smart TV", "Whiteboard"],
    desks: [
      { id: "m2d1", status: "occupied", type: "chair" },
      { id: "m2d2", status: "occupied", type: "chair" },
      { id: "m2d3", status: "occupied", type: "chair" },
      { id: "m2d4", status: "booked", type: "chair" },
      { id: "m2d5", status: "available", type: "chair" },
      { id: "m2d6", status: "available", type: "chair" },
    ],
  },
  {
    id: "open1",
    name: "Open Space",
    type: "open",
    capacity: 12,
    co2: 400,
    humidity: 42,
    temperature: 21,
    zone: "Floor 1 - Central",
    equipment: ["Power Outlets", "WiFi"],
    desks: [
      { id: "o1d1", status: "available", type: "desk" },
      { id: "o1d2", status: "available", type: "desk" },
      { id: "o1d3", status: "booked", type: "desk" },
      { id: "o1d4", status: "available", type: "desk" },
      { id: "o1d5", status: "available", type: "desk" },
      { id: "o1d6", status: "available", type: "desk" },
    ],
  },
  {
    id: "open2",
    name: "Open Space",
    type: "open",
    capacity: 8,
    co2: 415,
    humidity: 44,
    temperature: 22,
    zone: "Floor 1 - North",
    equipment: ["Power Outlets", "WiFi"],
    desks: [
      { id: "o2d1", status: "available", type: "desk" },
      { id: "o2d2", status: "available", type: "desk" },
      { id: "o2d3", status: "available", type: "desk" },
      { id: "o2d4", status: "available", type: "desk" },
    ],
  },
];

const deskStatusColor = {
  available: "#22c55e",
  occupied: "#64748b",
  booked: "#f59e0b",
};

export default function FloorPlan() {
  const theme = useTheme();
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    duration: '1',
    attendees: '1',
    purpose: ''
  });

  const handleDeskClick = (room, desk) => {
    setSelectedDesk(desk);
    setSelectedRoom(room);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedDesk(null);
    setSelectedRoom(null);
  };

  const handleBooking = () => {
    // Simulate booking process
    console.log('Booking:', { room: selectedRoom, desk: selectedDesk, ...bookingData });
    // Here you would typically make an API call to book the desk/room
    alert(`Successfully booked ${selectedRoom?.name} - ${selectedDesk?.id}`);
    handleDialogClose();
  };

  return (
    <Box sx={{ 
      width: "100%", 
      maxWidth: "100%", 
      position: "relative", 
      background: "transparent", 
      p: 0, 
      m: 0 
    }}>
      {/* Title */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
          Live Occupancy & Environment Monitoring
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click on any desk or room to view details and book
        </Typography>
      </Box>

      {/* Floor Plan Container */}
      <Card elevation={0} sx={{ 
        p: 4, 
        borderRadius: 3, 
        border: `2px solid ${theme.palette.divider}`,
        background: alpha(theme.palette.background.default, 0.5)
      }}>
        <Box sx={{ 
          display: "grid", 
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, 
          gridTemplateRows: { xs: "auto", md: "1fr 1fr" },
          gap: 3, 
          width: "100%", 
          minHeight: 500
        }}>
          {/* Meeting Room 1 (Left) */}
          <Box sx={{ 
            background: alpha(theme.palette.background.paper, 0.8), 
            borderRadius: 3, 
            border: `2px solid ${theme.palette.divider}`, 
            p: 3, 
            minHeight: 220, 
            display: "flex", 
            flexDirection: "column",
            position: 'relative'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography fontWeight={700} fontSize={18} color="text.primary">
                Meeting Room 1
              </Typography>
              <Chip 
                label={`${rooms[0].desks.filter(d => d.status === 'available').length}/${rooms[0].desks.length} Available`} 
                color="success" 
                size="small"
                variant="outlined"
              />
            </Box>
            <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
              {rooms[0].desks.map((desk, i) => (
                <Grid item key={desk.id} xs={4} sm={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: deskStatusColor[desk.status],
                      cursor: "pointer",
                      boxShadow: desk.status === "available" ? `0 2px 8px ${alpha(deskStatusColor[desk.status], 0.3)}` : undefined,
                      border: `2px solid ${desk.status === "available" ? deskStatusColor[desk.status] : theme.palette.divider}`,
                      transition: "all 0.2s ease",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': { 
                        transform: "scale(1.1)",
                        boxShadow: `0 4px 12px ${alpha(deskStatusColor[desk.status], 0.4)}`
                      },
                    }}
                    onClick={() => handleDeskClick(rooms[0], desk)}
                  >
                    <Person sx={{ fontSize: 20, color: 'white' }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 'auto', pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                Zone: {rooms[0].zone}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label={`${rooms[0].co2} ppm CO₂`} size="small" color="info" variant="outlined" />
                <Chip label={`${rooms[0].temperature}°C`} size="small" color="success" variant="outlined" />
              </Box>
            </Box>
          </Box>

          {/* Desk Area (Individual desks) */}
          <Box sx={{ 
            background: alpha(theme.palette.background.paper, 0.6), 
            borderRadius: 3, 
            border: `2px solid ${theme.palette.divider}`, 
            p: 3, 
            minHeight: 220, 
            display: "flex", 
            flexDirection: "column",
            position: 'relative'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography fontWeight={700} fontSize={18} color="text.primary">
                Desk
              </Typography>
              <Chip 
                label="Individual" 
                color="primary" 
                size="small"
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Box
                sx={{
                  width: 60,
                  height: 40,
                  borderRadius: 2,
                  background: deskStatusColor['available'],
                  cursor: "pointer",
                  boxShadow: `0 2px 8px ${alpha(deskStatusColor['available'], 0.3)}`,
                  border: `2px solid ${deskStatusColor['available']}`,
                  transition: "all 0.2s ease",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': { 
                    transform: "scale(1.1)",
                    boxShadow: `0 4px 12px ${alpha(deskStatusColor['available'], 0.4)}`
                  },
                }}
                onClick={() => handleDeskClick(rooms[3], { id: 'desk-1', status: 'available', type: 'desk' })}
              >
                <Person sx={{ fontSize: 24, color: 'white' }} />
              </Box>
            </Box>
          </Box>

          {/* Open Space (Central) */}
          <Box sx={{ 
            background: alpha(theme.palette.background.paper, 0.7), 
            borderRadius: 3, 
            border: `2px solid ${theme.palette.divider}`, 
            p: 3, 
            minHeight: 220, 
            display: "flex", 
            flexDirection: "column",
            position: 'relative'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography fontWeight={700} fontSize={18} color="text.primary">
                Open Space
              </Typography>
              <Chip 
                label={`${rooms[2].desks.filter(d => d.status === 'available').length}/${rooms[2].desks.length} Available`} 
                color="success" 
                size="small"
                variant="outlined"
              />
            </Box>
            <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
              {rooms[2].desks.map((desk, i) => (
                <Grid item key={desk.id} xs={4} sm={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: deskStatusColor[desk.status],
                      cursor: "pointer",
                      boxShadow: desk.status === "available" ? `0 2px 8px ${alpha(deskStatusColor[desk.status], 0.3)}` : undefined,
                      border: `2px solid ${desk.status === "available" ? deskStatusColor[desk.status] : theme.palette.divider}`,
                      transition: "all 0.2s ease",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': { 
                        transform: "scale(1.1)",
                        boxShadow: `0 4px 12px ${alpha(deskStatusColor[desk.status], 0.4)}`
                      },
                    }}
                    onClick={() => handleDeskClick(rooms[2], desk)}
                  >
                    <Person sx={{ fontSize: 20, color: 'white' }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 'auto', pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                Zone: {rooms[2].zone}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label={`${rooms[2].co2} ppm CO₂`} size="small" color="info" variant="outlined" />
                <Chip label={`${rooms[2].temperature}°C`} size="small" color="success" variant="outlined" />
              </Box>
            </Box>
          </Box>

          {/* Meeting Room 2 (Right) */}
          <Box sx={{ 
            background: alpha(theme.palette.background.paper, 0.8), 
            borderRadius: 3, 
            border: `2px solid ${theme.palette.divider}`, 
            p: 3, 
            minHeight: 220, 
            display: "flex", 
            flexDirection: "column",
            position: 'relative'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography fontWeight={700} fontSize={18} color="text.primary">
                Meeting Room 2
              </Typography>
              <Chip 
                label={`${rooms[1].desks.filter(d => d.status === 'available').length}/${rooms[1].desks.length} Available`} 
                color="warning" 
                size="small"
                variant="outlined"
              />
            </Box>
            <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
              {rooms[1].desks.map((desk, i) => (
                <Grid item key={desk.id} xs={4} sm={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: deskStatusColor[desk.status],
                      cursor: "pointer",
                      boxShadow: desk.status === "available" ? `0 2px 8px ${alpha(deskStatusColor[desk.status], 0.3)}` : undefined,
                      border: `2px solid ${desk.status === "available" ? deskStatusColor[desk.status] : theme.palette.divider}`,
                      transition: "all 0.2s ease",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': { 
                        transform: "scale(1.1)",
                        boxShadow: `0 4px 12px ${alpha(deskStatusColor[desk.status], 0.4)}`
                      },
                    }}
                    onClick={() => handleDeskClick(rooms[1], desk)}
                  >
                    <Person sx={{ fontSize: 20, color: 'white' }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 'auto', pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                Zone: {rooms[1].zone}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label={`${rooms[1].co2} ppm CO₂`} size="small" color="warning" variant="outlined" />
                <Chip label={`${rooms[1].temperature}°C`} size="small" color="success" variant="outlined" />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Legend */}
        <Box sx={{ 
          mt: 3, 
          p: 2, 
          borderRadius: 2, 
          background: alpha(theme.palette.background.paper, 0.8), 
          border: `1px solid ${theme.palette.divider}` 
        }}>
          <Typography variant="subtitle2" fontWeight={600} color="text.primary" sx={{ mb: 1 }}>
            Status Legend
          </Typography>
          <Box sx={{ display: "flex", gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: 1, backgroundColor: "#22c55e" }} />
              <Typography variant="caption" color="text.secondary">Available</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: 1, backgroundColor: "#64748b" }} />
              <Typography variant="caption" color="text.secondary">Occupied</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: 1, backgroundColor: "#f59e0b" }} />
              <Typography variant="caption" color="text.secondary">Booked</Typography>
            </Box>
          </Box>
        </Box>
      </Card>
      {/* Enhanced Booking Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BookmarkAdd color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Book Space
            </Typography>
          </Box>
          <IconButton onClick={handleDialogClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedDesk && selectedRoom && (
            <Box>
              {/* Space Information */}
              <Card elevation={0} sx={{ mb: 3, p: 2, background: alpha(theme.palette.primary.main, 0.05) }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" fontWeight={600} color="text.primary">
                      {selectedRoom.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <LocationOn sx={{ fontSize: 16 }} />
                      {selectedRoom.zone}
                    </Typography>
                  </Box>
                  <Chip 
                    label={selectedDesk.status.charAt(0).toUpperCase() + selectedDesk.status.slice(1)}
                    color={selectedDesk.status === 'available' ? 'success' : selectedDesk.status === 'booked' ? 'warning' : 'default'}
                    variant="outlined"
                  />
                </Box>
                
                {/* Space Details */}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Chip 
                    icon={<Air />}
                    label={`${selectedRoom.co2} ppm CO₂`} 
                    size="small" 
                    color="info" 
                    variant="outlined" 
                  />
                  <Chip 
                    icon={<Thermostat />}
                    label={`${selectedRoom.temperature}°C`} 
                    size="small" 
                    color="success" 
                    variant="outlined" 
                  />
                  <Chip 
                    icon={<WaterDrop />}
                    label={`${selectedRoom.humidity}%`} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                  />
                  <Chip 
                    icon={<Groups />}
                    label={`${selectedRoom.capacity} capacity`} 
                    size="small" 
                    color="default" 
                    variant="outlined" 
                  />
                </Box>

                {/* Equipment */}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  Available Equipment:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedRoom.equipment.map((item, index) => (
                    <Chip key={index} label={item} size="small" variant="outlined" />
                  ))}
                </Box>
              </Card>

              {/* Booking Form */}
              {selectedDesk.status === 'available' ? (
                <Box>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Booking Details
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Date"
                        type="date"
                        value={bookingData.date}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Duration</InputLabel>
                        <Select
                          value={bookingData.duration}
                          label="Duration"
                          onChange={(e) => setBookingData({...bookingData, duration: e.target.value})}
                        >
                          <MenuItem value="0.5">30 minutes</MenuItem>
                          <MenuItem value="1">1 hour</MenuItem>
                          <MenuItem value="2">2 hours</MenuItem>
                          <MenuItem value="4">4 hours</MenuItem>
                          <MenuItem value="8">Full day</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Start Time"
                        type="time"
                        value={bookingData.startTime}
                        onChange={(e) => setBookingData({...bookingData, startTime: e.target.value})}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="End Time"
                        type="time"
                        value={bookingData.endTime}
                        onChange={(e) => setBookingData({...bookingData, endTime: e.target.value})}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Number of Attendees"
                        type="number"
                        value={bookingData.attendees}
                        onChange={(e) => setBookingData({...bookingData, attendees: e.target.value})}
                        inputProps={{ min: 1, max: selectedRoom.capacity }}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Purpose</InputLabel>
                        <Select
                          value={bookingData.purpose}
                          label="Purpose"
                          onChange={(e) => setBookingData({...bookingData, purpose: e.target.value})}
                        >
                          <MenuItem value="meeting">Meeting</MenuItem>
                          <MenuItem value="presentation">Presentation</MenuItem>
                          <MenuItem value="workshop">Workshop</MenuItem>
                          <MenuItem value="individual">Individual Work</MenuItem>
                          <MenuItem value="collaboration">Collaboration</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      You'll receive an NFC tap-in confirmation after booking. Please tap in within 15 minutes of your start time.
                    </Typography>
                  </Alert>
                </Box>
              ) : (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    This space is currently {selectedDesk.status}. Please select an available space to book.
                  </Typography>
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button onClick={handleDialogClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          {selectedDesk?.status === 'available' && (
            <Button 
              onClick={handleBooking} 
              variant="contained" 
              color="primary"
              startIcon={<EventAvailable />}
            >
              Book Now
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
