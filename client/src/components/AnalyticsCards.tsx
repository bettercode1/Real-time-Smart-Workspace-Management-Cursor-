import React from "react";
import { Box, Typography, Card, Grid, useTheme, alpha } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';

const occupancyData = [
  { name: 'Mon', occupancy: 65, bookings: 12 },
  { name: 'Tue', occupancy: 75, bookings: 15 },
  { name: 'Wed', occupancy: 80, bookings: 18 },
  { name: 'Thu', occupancy: 70, bookings: 14 },
  { name: 'Fri', occupancy: 85, bookings: 20 },
  { name: 'Sat', occupancy: 40, bookings: 8 },
  { name: 'Sun', occupancy: 30, bookings: 5 }
];

const roomUsageData = [
  { name: 'Meeting Room 1', value: 85, color: '#6366f1' },
  { name: 'Meeting Room 2', value: 72, color: '#10b981' },
  { name: 'Open Space', value: 95, color: '#f59e0b' },
  { name: 'Kitchen', value: 45, color: '#ef4444' },
  { name: 'Lounge', value: 60, color: '#8b5cf6' }
];

const iaqTrendData = [
  { time: '9:00', co2: 420, temp: 21, humidity: 45 },
  { time: '10:00', co2: 580, temp: 22, humidity: 48 },
  { time: '11:00', co2: 650, temp: 23, humidity: 50 },
  { time: '12:00', co2: 720, temp: 24, humidity: 52 },
  { time: '13:00', co2: 580, temp: 23, humidity: 49 },
  { time: '14:00', co2: 620, temp: 22, humidity: 47 },
  { time: '15:00', co2: 590, temp: 22, humidity: 46 },
  { time: '16:00', co2: 560, temp: 21, humidity: 45 }
];

const AnalyticsCards = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {/* Occupancy Trends */}
      <Grid item xs={12} md={6}>
        <Card 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 3, 
            height: '100%',
            background: theme.palette.mode === 'light' 
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`
              : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} color="text.primary" mb={1}>
              Weekly Occupancy Trends
        </Typography>
        <Typography variant="body2" color="text.secondary">
              Occupancy % and booking patterns
          </Typography>
        </Box>
          <Box sx={{ height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.mode === 'light' ? '#e2e8f0' : '#334155'} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                  stroke={theme.palette.mode === 'light' ? '#cbd5e1' : '#475569'}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                  stroke={theme.palette.mode === 'light' ? '#cbd5e1' : '#475569'}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme.palette.background.paper, 
                    border: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#334155'}`,
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    color: theme.palette.text.primary
                  }}
                />
                <Bar 
                dataKey="occupancy"
                  fill={theme.palette.primary.main} 
                  radius={[4, 4, 0, 0]}
                  name="Occupancy %"
                />
                <Bar 
                  dataKey="bookings" 
                  fill={theme.palette.success.main} 
                  radius={[4, 4, 0, 0]}
                  name="Bookings"
                />
              </BarChart>
          </ResponsiveContainer>
        </Box>
    </Card>
      </Grid>

      {/* Top Rooms */}
      <Grid item xs={12} md={6}>
        <Card 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 3, 
            height: '100%',
            background: theme.palette.mode === 'light' 
              ? `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.04)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`
              : `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`,
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} color="text.primary" mb={1}>
          Room Utilization
        </Typography>
            <Typography variant="body2" color="text.secondary">
              Usage percentage by room
            </Typography>
        </Box>
          <Box sx={{ height: 250, display: 'flex', flexDirection: 'column' }}>
            {roomUsageData.map((room, index) => (
              <Box key={room.name} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" fontWeight={500} color="text.primary">
                    {room.name}
                  </Typography>
                  <Typography variant="body2" fontWeight={600} color={room.color}>
                    {room.value}%
        </Typography>
        </Box>
                <Box
                  sx={{
                    width: '100%', 
                    height: 8, 
                    backgroundColor: theme.palette.mode === 'light' ? '#e2e8f0' : '#334155', 
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}
                >
                  <Box 
                    sx={{ 
                      width: `${room.value}%`, 
                      height: '100%', 
                      backgroundColor: room.color,
                      borderRadius: 4,
                      transition: 'width 0.3s ease'
                    }} 
                  />
                </Box>
              </Box>
          ))}
          </Box>
        </Card>
        </Grid>

      {/* IAQ Trends */}
      <Grid item xs={12}>
        <Card 
          elevation={0} 
          sx={{ 
            p: 3, 
            borderRadius: 3,
            background: theme.palette.mode === 'light' 
              ? `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.04)} 0%, ${alpha(theme.palette.info.main, 0.08)} 100%)`
              : `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)} 0%, ${alpha(theme.palette.info.main, 0.15)} 100%)`,
            border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} color="text.primary" mb={1}>
              Environmental Quality Trends
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time CO₂, temperature, and humidity monitoring
        </Typography>
          </Box>
          <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
              <LineChart data={iaqTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.mode === 'light' ? '#e2e8f0' : '#334155'} />
              <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                  stroke={theme.palette.mode === 'light' ? '#cbd5e1' : '#475569'}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                  stroke={theme.palette.mode === 'light' ? '#cbd5e1' : '#475569'}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme.palette.background.paper, 
                    border: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#334155'}`,
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    color: theme.palette.text.primary
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="co2" 
                  stroke={theme.palette.error.main} 
                  strokeWidth={3}
                  dot={{ fill: theme.palette.error.main, strokeWidth: 2, r: 4 }}
                  name="CO₂ (ppm)"
              />
              <Line
                type="monotone"
                  dataKey="temp" 
                  stroke={theme.palette.warning.main} 
                strokeWidth={3}
                  dot={{ fill: theme.palette.warning.main, strokeWidth: 2, r: 4 }}
                  name="Temperature (°C)"
                />
                <Line 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke={theme.palette.info.main} 
                  strokeWidth={3}
                  dot={{ fill: theme.palette.info.main, strokeWidth: 2, r: 4 }}
                  name="Humidity (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
    </Card>
          </Grid>
        </Grid>
  );
};

export default AnalyticsCards; 