import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAuth } from "@/contexts/AuthContext";

export default function UserSummary() {
  const theme = useTheme();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load user bookings from localStorage
    const savedBookings = localStorage.getItem("bookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const userStats = {
    totalBookings: bookings.length,
    todayBookings: bookings.filter(b => b.date === "today").length,
    completedBookings: Math.floor(bookings.length * 0.8),
    favoriteRoom: "Meeting Room 1",
  };

  const upcomingBookings = bookings
    .filter(b => b.date === "today" || b.date === "tomorrow")
    .slice(0, 3);

  return (
    <Card elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Typography variant="h6" fontWeight={600} color="text.primary" mb={3}>
        Personal Summary
      </Typography>

      {/* User Info */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar 
          sx={{ 
            mr: 2, 
            bgcolor: theme.palette.primary.main,
            width: 48,
            height: 48,
            fontSize: 18,
            fontWeight: 600
          }}
        >
          {user?.displayName?.charAt(0) || "U"}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            {user?.displayName || "User"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
      </Box>

      {/* Quick Stats */}
      <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
        <Chip
          icon={<EventIcon />}
          label={`${userStats.totalBookings} Total`}
          sx={{
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontSize: '0.75rem',
            height: 28,
            '& .MuiChip-icon': {
              fontSize: 16
            }
          }}
        />
        <Chip
          icon={<CheckCircleIcon />}
          label={`${userStats.completedBookings} Completed`}
          sx={{
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            color: theme.palette.success.main,
            fontWeight: 600,
            fontSize: '0.75rem',
            height: 28,
            '& .MuiChip-icon': {
              fontSize: 16
            }
          }}
        />
      </Box>

      {/* Favorite Room */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" fontWeight={600} color="text.primary" mb={1}>
          Favorite Room
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          p: 1.5, 
          borderRadius: 2,
          background: alpha(theme.palette.info.main, 0.1),
          border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
        }}>
          <LocationOnIcon sx={{ fontSize: 20, color: theme.palette.info.main }} />
          <Typography variant="body2" fontWeight={500} color="text.primary">
            {userStats.favoriteRoom}
          </Typography>
        </Box>
      </Box>

      {/* Upcoming Bookings */}
      <Typography variant="subtitle2" fontWeight={600} color="text.primary" mb={2}>
        Upcoming Bookings
      </Typography>
      {upcomingBookings.length > 0 ? (
        <List dense sx={{ p: 0 }}>
          {upcomingBookings.map((booking, index) => (
            <ListItem 
              key={booking.id || index} 
              sx={{ 
                px: 0, 
                py: 1,
                borderRadius: 1,
                mb: 1,
                background: theme.palette.mode === 'light' 
                  ? alpha(theme.palette.grey[50], 0.8)
                  : alpha(theme.palette.grey[800], 0.8),
                border: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#334155'}`
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <ScheduleIcon 
                  sx={{ 
                    fontSize: 18, 
                    color: theme.palette.primary.main 
                  }} 
                />
              </ListItemIcon>
              <ListItemText
                primary={`${booking.room} - ${booking.time}`}
                secondary={booking.purpose}
                primaryTypographyProps={{ 
                  variant: "body2", 
                  fontWeight: 500,
                  color: "text.primary"
                }}
                secondaryTypographyProps={{ 
                  variant: "caption",
                  color: "text.secondary"
                }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box sx={{ 
          textAlign: 'center', 
          py: 3,
          color: 'text.secondary'
        }}>
          <ScheduleIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
          <Typography variant="body2">
            No upcoming bookings
          </Typography>
        </Box>
      )}
    </Card>
  );
} 