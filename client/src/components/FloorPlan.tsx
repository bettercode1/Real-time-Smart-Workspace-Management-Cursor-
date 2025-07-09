import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Chip, Grid } from "@mui/material";

const rooms = [
  {
    id: "meeting1",
    name: "Meeting Room 1",
    type: "meeting",
    co2: 420,
    humidity: 45,
    temperature: 22,
    desks: [
      { id: "m1d1", status: "available" },
      { id: "m1d2", status: "available" },
      { id: "m1d3", status: "available" },
      { id: "m1d4", status: "available" },
      { id: "m1d5", status: "available" },
      { id: "m1d6", status: "available" },
    ],
  },
  {
    id: "meeting2",
    name: "Meeting Room 2",
    type: "meeting",
    co2: 480,
    humidity: 50,
    temperature: 23,
    desks: [
      { id: "m2d1", status: "occupied" },
      { id: "m2d2", status: "occupied" },
      { id: "m2d3", status: "occupied" },
      { id: "m2d4", status: "occupied" },
      { id: "m2d5", status: "occupied" },
      { id: "m2d6", status: "occupied" },
    ],
  },
  {
    id: "open1",
    name: "Open Space",
    type: "open",
    co2: 400,
    humidity: 42,
    temperature: 21,
    desks: [
      { id: "o1d1", status: "available" },
      { id: "o1d2", status: "available" },
      { id: "o1d3", status: "available" },
      { id: "o1d4", status: "available" },
      { id: "o1d5", status: "available" },
      { id: "o1d6", status: "available" },
    ],
  },
];

const deskStatusColor = {
  available: "#22c55e",
  occupied: "#a3a3a3",
  booked: "#fbbf24",
};

export default function FloorPlan() {
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  return (
    <Box sx={{ width: "100%", minWidth: 700, maxWidth: 1000, height: 600, minHeight: 400, maxHeight: 700, position: "relative", overflow: "auto", background: "transparent", borderRadius: 2, boxShadow: "none", p: 0, m: 0 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 3, width: "100%", height: "100%", p: 3, background: "#f8fafc", borderRadius: 4, border: "2px solid #e5e7eb" }}>
        {/* Left column: Meeting Room 1 and Open Space */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Meeting Room 1 */}
          <Box sx={{ flex: 1, background: "#f8fafc", borderRadius: 3, border: "2px solid #e5e7eb", p: 2, minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography fontWeight={700} fontSize={20} mb={1} align="center">Meeting Room 1</Typography>
            <Grid container spacing={1} justifyContent="center">
              {rooms[0].desks.map((desk, i) => (
                <Grid item key={desk.id} xs={4} sm={2} md={2} lg={2}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      background: deskStatusColor[desk.status],
                      cursor: "pointer",
                      boxShadow: desk.status === "available" ? "0 2px 8px #22c55e33" : undefined,
                      border: desk.status === "available" ? "2px solid #16a34a" : "2px solid #e5e7eb",
                      transition: "transform 0.1s",
                      '&:hover': { transform: "scale(1.08)" },
                    }}
                    onClick={() => handleDeskClick(rooms[0], desk)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* Open Space */}
          <Box sx={{ flex: 1, background: "#f1f5f9", borderRadius: 3, border: "2px solid #e5e7eb", p: 2, minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography fontWeight={600} fontSize={16} mb={1} align="center">Open Space</Typography>
            <Grid container spacing={1} justifyContent="center">
              {rooms[2].desks.map((desk, i) => (
                <Grid item key={desk.id} xs={4} sm={2} md={2} lg={2}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      background: deskStatusColor[desk.status],
                      cursor: "pointer",
                      boxShadow: desk.status === "available" ? "0 2px 8px #22c55e33" : undefined,
                      border: desk.status === "available" ? "2px solid #16a34a" : "2px solid #e5e7eb",
                      transition: "transform 0.1s",
                      '&:hover': { transform: "scale(1.08)" },
                    }}
                    onClick={() => handleDeskClick(rooms[2], desk)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        {/* Right column: Meeting Room 1 (right) and Meeting Room 2 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Meeting Room 1 (right) */}
          <Box sx={{ flex: 1, background: "#f8fafc", borderRadius: 3, border: "2px solid #e5e7eb", p: 2, minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography fontWeight={700} fontSize={20} mb={1} align="center">Meeting Room 1</Typography>
            <Grid container spacing={1} justifyContent="center">
              {rooms[0].desks.map((desk, i) => (
                <Grid item key={desk.id + "r"} xs={4} sm={2} md={2} lg={2}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      background: deskStatusColor[desk.status],
                      cursor: "pointer",
                      boxShadow: desk.status === "available" ? "0 2px 8px #22c55e33" : undefined,
                      border: desk.status === "available" ? "2px solid #16a34a" : "2px solid #e5e7eb",
                      transition: "transform 0.1s",
                      '&:hover': { transform: "scale(1.08)" },
                    }}
                    onClick={() => handleDeskClick(rooms[0], desk)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* Meeting Room 2 */}
          <Box sx={{ flex: 1, background: "#f8fafc", borderRadius: 3, border: "2px solid #e5e7eb", p: 2, minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            <Typography fontWeight={700} fontSize={20} mb={1} align="center">Meeting Room 2</Typography>
            <Grid container spacing={1} justifyContent="center">
              {rooms[1].desks.map((desk, i) => (
                <Grid item key={desk.id} xs={4} sm={2} md={2} lg={2}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      background: deskStatusColor[desk.status],
                      cursor: "pointer",
                      boxShadow: desk.status === "available" ? "0 2px 8px #22c55e33" : undefined,
                      border: desk.status === "available" ? "2px solid #16a34a" : "2px solid #e5e7eb",
                      transition: "transform 0.1s",
                      '&:hover': { transform: "scale(1.08)" },
                    }}
                    onClick={() => handleDeskClick(rooms[1], desk)}
                  />
                </Grid>
              ))}
            </Grid>
            {/* Legend */}
            <Box sx={{ position: "absolute", bottom: 12, right: 12, p: 2, borderRadius: 2, background: "#fff", boxShadow: "0 2px 8px #0001", border: "1px solid #e5e7eb", zIndex: 2, minWidth: 120 }}>
              <Typography variant="caption" fontWeight={600} color="text.primary" sx={{ mb: 1, display: "block" }}>
                Status Legend
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: 1, backgroundColor: "#22c55e" }} />
                  <Typography variant="caption" color="text.secondary">Available</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: 1, backgroundColor: "#a3a3a3" }} />
                  <Typography variant="caption" color="text.secondary">Occupied</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: 1, backgroundColor: "#fbbf24" }} />
                  <Typography variant="caption" color="text.secondary">Booked</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Booking Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>Book Desk</DialogTitle>
        <DialogContent>
          {selectedDesk && selectedRoom && (
            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>Desk: {selectedDesk.id}</Typography>
              <Typography variant="body2" mb={1}>Room: {selectedRoom.name}</Typography>
              <Typography variant="body2" mb={1}>Status: {selectedDesk.status.charAt(0).toUpperCase() + selectedDesk.status.slice(1)}</Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 2, mt: 2 }}>
                <Chip label={`CO₂: ${selectedRoom.co2} ppm`} color="info" variant="outlined" />
                <Chip label={`Humidity: ${selectedRoom.humidity}%`} color="primary" variant="outlined" />
                <Chip label={`Temp: ${selectedRoom.temperature}°C`} color="success" variant="outlined" />
              </Box>
              {selectedDesk.status === 'available' ? (
                <Button variant="contained" color="success" fullWidth>Book This Desk</Button>
              ) : (
                <Button variant="outlined" color="inherit" fullWidth disabled>Not Available</Button>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
