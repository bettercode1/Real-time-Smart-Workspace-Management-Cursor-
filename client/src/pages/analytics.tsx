import React from "react";
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
  alpha
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
  Cancel
} from "@mui/icons-material";
import AnalyticsCards from "@/components/AnalyticsCards";
import Analytics from "@/components/Analytics";
import PageContainer from "@/components/PageContainer";

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
  return (
    <PageContainer
      title="Analytics & Reports"
      description="Comprehensive workspace utilization and performance analytics"
    >
      <Grid container spacing={3}>
        {/* Main Analytics Cards */}
        <Grid item xs={12}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              borderRadius: 3,
              backgroundColor: 'background.paper',
              width: '100%'
            }}
          >
            <AnalyticsCards />
          </Paper>
        </Grid>

        {/* Top Rooms and Comparison */}
        <Grid item xs={12} md={6}>
          <TopRoomsCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <BookingComparisonCard />
        </Grid>

        {/* Usage Trends */}
        <Grid item xs={12}>
          <UsageTrendsCard />
        </Grid>

        {/* Detailed Analytics Charts */}
        <Grid item xs={12}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              borderRadius: 3,
              backgroundColor: 'background.paper',
              width: '100%'
            }}
          >
            <Analytics />
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}