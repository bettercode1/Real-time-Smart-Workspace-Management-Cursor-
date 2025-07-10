import React, { useState } from "react";
import { 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  Box, 
  Chip, 
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  useTheme,
  alpha,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  Divider
} from "@mui/material";
import { 
  TrendingUp, 
  TrendingDown, 
  EventAvailable, 
  Person, 
  Schedule, 
  Assessment,
  LocationOn,
  CompareArrows,
  CheckCircle,
  Cancel,
  Download,
  Refresh,
  FilterList,
  BarChart,
  Timeline,
  PieChart,
  ShowChart
} from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';
import AnalyticsCards from "@/components/AnalyticsCards";
import Analytics from "@/components/Analytics";
import LoadingSpinner, { LoadingStats, LoadingCard } from "@/components/LoadingSpinner";

const TopRoomsCard = () => {
  const theme = useTheme();
  const topRooms = [
    { name: "Meeting Room 1", utilization: 85, bookings: 42, checkInRate: 95 },
    { name: "Open Space Central", utilization: 72, bookings: 38, checkInRate: 88 },
    { name: "Meeting Room 2", utilization: 68, bookings: 34, checkInRate: 91 },
    { name: "Collaboration Zone", utilization: 55, bookings: 28, checkInRate: 82 },
    { name: "Phone Booth 1", utilization: 45, bookings: 24, checkInRate: 94 },
  ];

  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Top 5 Most Utilized Spaces
        </Typography>
        <List sx={{ p: 0 }}>
          {topRooms.map((room, index) => (
            <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 600
                  }}
                >
                  {index + 1}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight={600}>{room.name}</Typography>
                    <Chip 
                      label={`${room.utilization}%`} 
                      size="small" 
                      color={room.utilization > 70 ? 'success' : room.utilization > 50 ? 'warning' : 'default'}
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={room.utilization} 
                      sx={{ 
                        mb: 0.5,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          backgroundColor: room.utilization > 70 ? theme.palette.success.main : 
                                          room.utilization > 50 ? theme.palette.warning.main : theme.palette.info.main
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {room.bookings} bookings • {room.checkInRate}% check-in rate
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const BookingComparisonCard = () => {
  const theme = useTheme();
  const comparisonData = [
    { 
      room: "Meeting Room 1", 
      booked: 42, 
      checkedIn: 40, 
      noShow: 2, 
      checkInRate: 95,
      trend: "up"
    },
    { 
      room: "Meeting Room 2", 
      booked: 34, 
      checkedIn: 31, 
      noShow: 3, 
      checkInRate: 91,
      trend: "stable"
    },
    { 
      room: "Open Space", 
      booked: 38, 
      checkedIn: 33, 
      noShow: 5, 
      checkInRate: 87,
      trend: "down"
    },
    { 
      room: "Phone Booth", 
      booked: 24, 
      checkedIn: 23, 
      noShow: 1, 
      checkInRate: 96,
      trend: "up"
    }
  ];

  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Booking vs Check-in Analysis
        </Typography>
        <List sx={{ p: 0 }}>
          {comparisonData.map((item, index) => (
            <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <CompareArrows color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight={600}>{item.room}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {item.trend === 'up' && <TrendingUp sx={{ fontSize: 16, color: theme.palette.success.main }} />}
                      {item.trend === 'down' && <TrendingDown sx={{ fontSize: 16, color: theme.palette.error.main }} />}
                      <Typography variant="caption" fontWeight={600} color="text.primary">
                        {item.checkInRate}%
                      </Typography>
                    </Box>
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CheckCircle sx={{ fontSize: 14, color: theme.palette.success.main }} />
                      <Typography variant="caption" color="text.secondary">
                        {item.checkedIn} checked in
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Cancel sx={{ fontSize: 14, color: theme.palette.error.main }} />
                      <Typography variant="caption" color="text.secondary">
                        {item.noShow} no-show
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const UsageTrendsCard = () => {
  const theme = useTheme();
  const trends = [
    { period: "This Week", value: 78, change: +5, changeType: "increase" },
    { period: "This Month", value: 72, change: +8, changeType: "increase" },
    { period: "Peak Hours", value: "2-4 PM", change: 0, changeType: "stable" },
    { period: "Avg Session", value: "2.5hrs", change: -0.3, changeType: "decrease" },
  ];

  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Usage Trends
        </Typography>
        <Grid container spacing={2}>
          {trends.map((trend, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: alpha(theme.palette.primary.main, 0.05),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  textAlign: 'center'
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  {trend.period}
                </Typography>
                <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mb: 0.5 }}>
                  {trend.value}
                </Typography>
                {trend.change !== 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                    {trend.changeType === 'increase' && <TrendingUp sx={{ fontSize: 16, color: theme.palette.success.main }} />}
                    {trend.changeType === 'decrease' && <TrendingDown sx={{ fontSize: 16, color: theme.palette.error.main }} />}
                    <Typography variant="caption" color={trend.changeType === 'increase' ? 'success.main' : 'error.main'}>
                      {trend.changeType === 'increase' ? '+' : ''}{trend.change}%
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default function AnalyticsPage() {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('week');
  const [viewType, setViewType] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Sample data for charts
  const occupancyData = [
    { time: '9:00', occupancy: 15, capacity: 50 },
    { time: '10:00', occupancy: 32, capacity: 50 },
    { time: '11:00', occupancy: 45, capacity: 50 },
    { time: '12:00', occupancy: 38, capacity: 50 },
    { time: '13:00', occupancy: 28, capacity: 50 },
    { time: '14:00', occupancy: 42, capacity: 50 },
    { time: '15:00', occupancy: 48, capacity: 50 },
    { time: '16:00', occupancy: 35, capacity: 50 },
    { time: '17:00', occupancy: 22, capacity: 50 },
  ];

  const utilizationData = [
    { name: 'Mon', bookings: 24, checkins: 22 },
    { name: 'Tue', bookings: 28, checkins: 25 },
    { name: 'Wed', bookings: 32, checkins: 30 },
    { name: 'Thu', bookings: 26, checkins: 24 },
    { name: 'Fri', bookings: 30, checkins: 27 },
  ];

  return (
    <Box sx={{
      minHeight: '100%',
      width: '100%',
      maxWidth: '100%',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
      position: 'relative',
      pb: 6,
      overflowX: 'hidden'
    }}>
      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        px: { xs: 2, md: 3 }, 
        pt: { xs: 4, md: 6 },
        width: '100%',
        overflowX: 'hidden'
      }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 1, letterSpacing: -1 }}>
              Analytics Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
              Essential analytics with occupancy trends, booking insights, and space utilization
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} label="Time Range">
                <MenuItem value="day">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="quarter">This Quarter</MenuItem>
              </Select>
            </FormControl>
            <Button 
              variant="outlined" 
              startIcon={<Download />} 
              sx={{ borderRadius: 2 }}
              onClick={() => console.log('Export clicked')}
            >
              Export
            </Button>
            <Button 
              variant="contained" 
              startIcon={refreshing ? <LoadingSpinner size={16} variant="wave" /> : <Refresh />} 
              sx={{ borderRadius: 2 }}
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </Box>
        </Box>

        {/* Analytics Cards */}
        {loading ? (
          <LoadingStats />
        ) : (
          <Grid container spacing={3} sx={{ mb: 4, width: '100%', mx: 0 }}>
            <Grid item xs={12} sm={6} md={3} sx={{ width: '100%', maxWidth: '100%' }}>
              <Card elevation={0} sx={{
                p: 3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                boxShadow: '0 2px 8px rgba(99,102,241,0.06)',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                minHeight: 140,
            }}>
              <Box sx={{
                bgcolor: '#818cf8', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <TrendingUp sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" fontWeight={800} color="#3730a3">73%</Typography>
              <Typography fontWeight={600} color="#6366f1" fontSize={15}>Average Utilization</Typography>
              <Typography color="#818cf8" fontSize={13}>+5% from last week</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ width: '100%', maxWidth: '100%' }}>
            <Card elevation={0} sx={{
              p: 3,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              boxShadow: '0 2px 8px rgba(34,197,94,0.06)',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              minHeight: 140,
            }}>
              <Box sx={{
                bgcolor: '#22c55e', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <EventAvailable sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" fontWeight={800} color="#14532d">142</Typography>
              <Typography fontWeight={600} color="#16a34a" fontSize={15}>Total Bookings</Typography>
              <Typography color="#22c55e" fontSize={13}>This week</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ width: '100%', maxWidth: '100%' }}>
            <Card elevation={0} sx={{
              p: 3,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              boxShadow: '0 2px 8px rgba(245,158,11,0.06)',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              minHeight: 140,
            }}>
              <Box sx={{
                bgcolor: '#f59e0b', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckCircle sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" fontWeight={800} color="#92400e">89%</Typography>
              <Typography fontWeight={600} color="#d97706" fontSize={15}>Check-in Rate</Typography>
              <Typography color="#f59e0b" fontSize={13}>+2% improvement</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ width: '100%', maxWidth: '100%' }}>
            <Card elevation={0} sx={{
              p: 3,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
              boxShadow: '0 2px 8px rgba(236,72,153,0.06)',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              minHeight: 140,
            }}>
              <Box sx={{
                bgcolor: '#ec4899', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Person sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" fontWeight={800} color="#831843">32</Typography>
              <Typography fontWeight={600} color="#be185d" fontSize={15}>Peak Occupancy</Typography>
              <Typography color="#ec4899" fontSize={13}>Today at 2:30 PM</Typography>
            </Card>
          </Grid>
        </Grid>
        )}

        {/* Charts Section */}
        {loading ? (
          <Box sx={{ my: 4 }}>
            <LoadingCard />
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ width: '100%', mx: 0 }}>
            {/* Occupancy Chart */}
            <Grid item xs={12} md={8} sx={{ width: '100%', maxWidth: '100%' }}>
              <Card elevation={0} sx={{ 
                p: 3, 
                borderRadius: 4, 
                background: '#fff',
                boxShadow: '0 2px 12px rgba(99,102,241,0.06)',
                minHeight: 400
              }}>
                <Typography variant="h6" fontWeight={600} mb={3}>
                  Today's Occupancy Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="time" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }} 
                    />
                    <Line type="monotone" dataKey="occupancy" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }} />
                    <Line type="monotone" dataKey="capacity" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Grid>

            {/* Top Rooms */}
            <Grid item xs={12} md={4} sx={{ width: '100%', maxWidth: '100%' }}>
              <TopRoomsCard />
            </Grid>

            {/* Booking vs Check-in */}
            <Grid item xs={12} md={6} sx={{ width: '100%', maxWidth: '100%' }}>
              <BookingComparisonCard />
            </Grid>

            {/* Usage Trends */}
            <Grid item xs={12} md={6} sx={{ width: '100%', maxWidth: '100%' }}>
              <UsageTrendsCard />
            </Grid>

            {/* Detailed Analytics */}
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <Card elevation={0} sx={{ 
                p: 3, 
                borderRadius: 4, 
                background: '#fff',
                boxShadow: '0 2px 12px rgba(99,102,241,0.06)'
              }}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Detailed Analytics & Insights
                </Typography>
                <Analytics />
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}