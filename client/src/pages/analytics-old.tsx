import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  EventAvailable,
  CheckCircle,
  Cancel,
  Room,
  DesktopWindows,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function AnalyticsPage() {
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ['/api/bookings'],
  });

  const { data: rooms = [], isLoading: roomsLoading } = useQuery({
    queryKey: ['/api/rooms'],
  });

  const { data: occupancy = [], isLoading: occupancyLoading } = useQuery({
    queryKey: ['/api/occupancy'],
  });

  // Calculate analytics data
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter((b: any) => b.status === 'active').length;
  const completedBookings = bookings.filter((b: any) => b.status === 'completed').length;
  const cancelledBookings = bookings.filter((b: any) => b.status === 'cancelled').length;
  
  const utilizationRate = totalBookings > 0 ? Math.round((completedBookings / totalBookings) * 100) : 0;
  const checkInRate = totalBookings > 0 ? Math.round(((activeBookings + completedBookings) / totalBookings) * 100) : 0;

  // Room utilization data
  const roomData = rooms.map((room: any) => {
    const roomBookings = bookings.filter((b: any) => b.roomId === room.id);
    return {
      name: room.name,
      bookings: roomBookings.length,
      utilization: roomBookings.length > 0 ? Math.round((roomBookings.filter((b: any) => b.status === 'completed').length / roomBookings.length) * 100) : 0,
    };
  });

  // Booking status distribution
  const statusData = [
    { name: 'Active', value: activeBookings, color: '#4caf50' },
    { name: 'Completed', value: completedBookings, color: '#2196f3' },
    { name: 'Cancelled', value: cancelledBookings, color: '#f44336' },
  ];

  // Weekly booking trend (mock data for demo)
  const weeklyData = [
    { day: 'Mon', bookings: 24 },
    { day: 'Tue', bookings: 32 },
    { day: 'Wed', bookings: 28 },
    { day: 'Thu', bookings: 35 },
    { day: 'Fri', bookings: 42 },
    { day: 'Sat', bookings: 18 },
    { day: 'Sun', bookings: 12 },
  ];

  const isLoading = bookingsLoading || roomsLoading || occupancyLoading;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ p: 2, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Analytics Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive workspace utilization and booking insights
        </Typography>
      </Box>

      {/* Key Performance Indicators */}
      <Grid container spacing={3} sx={{ px: 2, mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    mr: 2,
                  }}
                >
                  <EventAvailable />
                </Box>
                <Box>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {totalBookings}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Bookings
                  </Typography>
                </Box>
              </Box>
              <Chip
                icon={<TrendingUp />}
                label="+12% from last week"
                color="success"
                size="small"
                variant="outlined"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'success.light',
                    color: 'success.contrastText',
                    mr: 2,
                  }}
                >
                  <CheckCircle />
                </Box>
                <Box>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {utilizationRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Utilization Rate
                  </Typography>
                </Box>
              </Box>
              <Chip
                icon={<TrendingUp />}
                label="+5% from last week"
                color="success"
                size="small"
                variant="outlined"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'info.light',
                    color: 'info.contrastText',
                    mr: 2,
                  }}
                >
                  <People />
                </Box>
                <Box>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {checkInRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Check-in Rate
                  </Typography>
                </Box>
              </Box>
              <Chip
                icon={<TrendingDown />}
                label="-2% from last week"
                color="error"
                size="small"
                variant="outlined"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: 'warning.light',
                    color: 'warning.contrastText',
                    mr: 2,
                  }}
                >
                  <Room />
                </Box>
                <Box>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {rooms.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Rooms
                  </Typography>
                </Box>
              </Box>
              <Chip
                icon={<TrendingUp />}
                label="Stable"
                color="default"
                size="small"
                variant="outlined"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ px: 2 }}>
        {/* Room Utilization Chart */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Room Utilization
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Booking frequency and completion rates by room
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roomData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#1976d2" name="Total Bookings" />
                  <Bar dataKey="utilization" fill="#4caf50" name="Utilization %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Booking Status Distribution */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Booking Status
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Distribution of booking statuses
              </Typography>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 2 }}>
                {statusData.map((item) => (
                  <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: item.color,
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Trend */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Weekly Booking Trend
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Daily booking patterns over the current week
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#1976d2" 
                    strokeWidth={3}
                    dot={{ fill: '#1976d2', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}