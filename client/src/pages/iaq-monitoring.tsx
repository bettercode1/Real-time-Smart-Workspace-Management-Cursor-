import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  useTheme,
  alpha,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  Air,
  Thermostat,
  WaterDrop,
  Speed,
  Warning,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Settings,
  Refresh,
  NotificationImportant,
  LocationOn,
  Schedule,
  Analytics,
  FilterList,
  Download,
  Visibility,
  BarChart,
  Timeline
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import IAQWidgets from '@/components/IAQWidgets';
import PageContainer from '@/components/PageContainer';

interface IAQReading {
  id: string;
  roomId: string;
  roomName: string;
  temperature: number;
  humidity: number;
  co2: number;
  airQuality: number;
  timestamp: string;
  status: 'excellent' | 'good' | 'moderate' | 'poor' | 'hazardous';
}

const mockIAQReadings: IAQReading[] = [
  {
    id: '1',
    roomId: 'room1',
    roomName: 'Meeting Room 1',
    temperature: 22.5,
    humidity: 45,
    co2: 680,
    airQuality: 95,
    timestamp: '2024-01-15T09:00:00Z',
    status: 'excellent'
  },
  {
    id: '2',
    roomId: 'room2',
    roomName: 'Open Space Central',
    temperature: 23.8,
    humidity: 52,
    co2: 890,
    airQuality: 82,
    timestamp: '2024-01-15T09:00:00Z',
    status: 'good'
  },
  {
    id: '3',
    roomId: 'room3',
    roomName: 'Conference Room A',
    temperature: 25.2,
    humidity: 38,
    co2: 1100,
    airQuality: 68,
    timestamp: '2024-01-15T09:00:00Z',
    status: 'moderate'
  },
  {
    id: '4',
    roomId: 'room4',
    roomName: 'Phone Booth 1',
    temperature: 24.1,
    humidity: 41,
    co2: 750,
    airQuality: 88,
    timestamp: '2024-01-15T09:00:00Z',
    status: 'good'
  },
  {
    id: '5',
    roomId: 'room5',
    roomName: 'Kitchen Area',
    temperature: 26.8,
    humidity: 58,
    co2: 1250,
    airQuality: 55,
    timestamp: '2024-01-15T09:00:00Z',
    status: 'poor'
  }
];

const mockHistoricalData = [
  { time: '06:00', temperature: 21.5, humidity: 42, co2: 450, airQuality: 98 },
  { time: '07:00', temperature: 22.0, humidity: 44, co2: 520, airQuality: 95 },
  { time: '08:00', temperature: 22.5, humidity: 46, co2: 650, airQuality: 92 },
  { time: '09:00', temperature: 23.0, humidity: 48, co2: 780, airQuality: 88 },
  { time: '10:00', temperature: 23.5, humidity: 50, co2: 890, airQuality: 85 },
  { time: '11:00', temperature: 24.0, humidity: 52, co2: 950, airQuality: 82 },
  { time: '12:00', temperature: 24.5, humidity: 54, co2: 1020, airQuality: 78 },
  { time: '13:00', temperature: 25.0, humidity: 56, co2: 1100, airQuality: 75 },
  { time: '14:00', temperature: 25.2, humidity: 58, co2: 1150, airQuality: 72 },
  { time: '15:00', temperature: 24.8, humidity: 56, co2: 1080, airQuality: 76 },
  { time: '16:00', temperature: 24.2, humidity: 54, co2: 980, airQuality: 80 },
  { time: '17:00', temperature: 23.8, humidity: 52, co2: 850, airQuality: 85 },
  { time: '18:00', temperature: 23.2, humidity: 50, co2: 720, airQuality: 90 }
];

const IAQOverviewCard = () => {
  const theme = useTheme();
  const overallStats = {
    averageTemperature: 24.1,
    averageHumidity: 47,
    averageCO2: 895,
    averageAirQuality: 78,
    healthyRooms: mockIAQReadings.filter(r => r.status === 'excellent' || r.status === 'good').length,
    totalRooms: mockIAQReadings.length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return theme.palette.success.main;
      case 'good': return theme.palette.info.main;
      case 'moderate': return theme.palette.warning.main;
      case 'poor': return theme.palette.error.main;
      case 'hazardous': return theme.palette.error.dark;
      default: return theme.palette.grey[500];
    }
  };

  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            IAQ Overview
          </Typography>
          <Button size="small" startIcon={<Refresh />}>
            Refresh
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
              <Typography variant="h5" fontWeight={700} color="primary.main">
                {overallStats.averageTemperature}°C
              </Typography>
              <Typography variant="caption" color="text.secondary">Avg Temperature</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.info.main, 0.1) }}>
              <Typography variant="h5" fontWeight={700} color="info.main">
                {overallStats.averageHumidity}%
              </Typography>
              <Typography variant="caption" color="text.secondary">Avg Humidity</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.warning.main, 0.1) }}>
              <Typography variant="h5" fontWeight={700} color="warning.main">
                {overallStats.averageCO2}
              </Typography>
              <Typography variant="caption" color="text.secondary">Avg CO2 (ppm)</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.success.main, 0.1) }}>
              <Typography variant="h5" fontWeight={700} color="success.main">
                {overallStats.averageAirQuality}
              </Typography>
              <Typography variant="caption" color="text.secondary">Air Quality</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2">Healthy Rooms</Typography>
            <Typography variant="subtitle2" color="success.main">
              {overallStats.healthyRooms}/{overallStats.totalRooms}
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={(overallStats.healthyRooms / overallStats.totalRooms) * 100} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: alpha(theme.palette.success.main, 0.1),
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundColor: theme.palette.success.main
              }
            }}
          />
        </Box>

        <Alert severity="info" sx={{ mt: 2 }}>
          All systems operating normally. No critical alerts.
        </Alert>
      </CardContent>
    </Card>
  );
};

const RoomIAQCard = ({ reading }: { reading: IAQReading }) => {
  const theme = useTheme();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return theme.palette.success.main;
      case 'good': return theme.palette.info.main;
      case 'moderate': return theme.palette.warning.main;
      case 'poor': return theme.palette.error.main;
      case 'hazardous': return theme.palette.error.dark;
      default: return theme.palette.grey[500];
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <CheckCircle />;
      case 'moderate':
      case 'poor':
      case 'hazardous':
        return <Warning />;
      default:
        return <CheckCircle />;
    }
  };

  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        borderRadius: 3,
        border: `1px solid ${alpha(getStatusColor(reading.status), 0.3)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 4px 20px ${alpha(getStatusColor(reading.status), 0.15)}`
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box 
              sx={{ 
                p: 1.5,
                borderRadius: 2,
                backgroundColor: alpha(getStatusColor(reading.status), 0.1),
                color: getStatusColor(reading.status)
              }}
            >
              <LocationOn />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {reading.roomName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Last updated: {new Date(reading.timestamp).toLocaleTimeString()}
              </Typography>
            </Box>
          </Box>
          <Chip 
            icon={getStatusIcon(reading.status)}
            label={reading.status.toUpperCase()}
            color={reading.status === 'excellent' || reading.status === 'good' ? 'success' : 
                   reading.status === 'moderate' ? 'warning' : 'error'}
            size="small"
            variant="outlined"
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Thermostat sx={{ fontSize: 20, color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {reading.temperature}°C
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Temperature
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <WaterDrop sx={{ fontSize: 20, color: theme.palette.info.main }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {reading.humidity}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Humidity
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Air sx={{ fontSize: 20, color: theme.palette.warning.main }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {reading.co2}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  CO2 (ppm)
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Speed sx={{ fontSize: 20, color: theme.palette.success.main }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {reading.airQuality}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Air Quality
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button size="small" startIcon={<Timeline />}>
            View History
          </Button>
          <IconButton size="small" color="primary">
            <Settings />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

const HistoricalChartCard = () => {
  const theme = useTheme();
  const [selectedMetric, setSelectedMetric] = useState('temperature');

  const getChartData = () => {
    switch (selectedMetric) {
      case 'temperature':
        return mockHistoricalData.map(d => ({ time: d.time, value: d.temperature }));
      case 'humidity':
        return mockHistoricalData.map(d => ({ time: d.time, value: d.humidity }));
      case 'co2':
        return mockHistoricalData.map(d => ({ time: d.time, value: d.co2 }));
      case 'airQuality':
        return mockHistoricalData.map(d => ({ time: d.time, value: d.airQuality }));
      default:
        return mockHistoricalData.map(d => ({ time: d.time, value: d.temperature }));
    }
  };

  const getChartColor = () => {
    switch (selectedMetric) {
      case 'temperature': return theme.palette.primary.main;
      case 'humidity': return theme.palette.info.main;
      case 'co2': return theme.palette.warning.main;
      case 'airQuality': return theme.palette.success.main;
      default: return theme.palette.primary.main;
    }
  };

  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            Historical Trends
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                displayEmpty
              >
                <MenuItem value="temperature">Temperature</MenuItem>
                <MenuItem value="humidity">Humidity</MenuItem>
                <MenuItem value="co2">CO2</MenuItem>
                <MenuItem value="airQuality">Air Quality</MenuItem>
              </Select>
            </FormControl>
            <Button size="small" startIcon={<Download />}>
              Export
            </Button>
          </Box>
        </Box>

        <Box sx={{ height: 300, width: '100%' }}>
          <ResponsiveContainer>
            <AreaChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={getChartColor()}
                fill={alpha(getChartColor(), 0.1)}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function IAQMonitoringPage() {
  const theme = useTheme();
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');

  const alertCount = mockIAQReadings.filter(r => r.status === 'poor' || r.status === 'hazardous').length;

  return (
    <PageContainer
      title="IAQ Monitoring"
      description="Monitor indoor air quality and environmental conditions across all spaces"
    >
      <Grid container spacing={3}>
        {/* IAQ Statistics */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Environmental Overview
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" startIcon={<FilterList />} size="small">
                  Filter
                </Button>
                <Button variant="contained" startIcon={<Analytics />} size="small">
                  Generate Report
                </Button>
              </Box>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>{mockIAQReadings.length}</Typography>
                  <Typography variant="caption">Monitored Spaces</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'success.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>
                    {mockIAQReadings.filter(r => r.status === 'excellent' || r.status === 'good').length}
                  </Typography>
                  <Typography variant="caption">Healthy Spaces</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'warning.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>
                    {mockIAQReadings.filter(r => r.status === 'moderate').length}
                  </Typography>
                  <Typography variant="caption">Moderate Quality</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'error.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>{alertCount}</Typography>
                  <Typography variant="caption">Alerts</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* IAQ Overview */}
        <Grid item xs={12} md={6}>
          <IAQOverviewCard />
        </Grid>

        {/* Historical Chart */}
        <Grid item xs={12} md={6}>
          <HistoricalChartCard />
        </Grid>

        {/* Main IAQ Widgets */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3,
              backgroundColor: 'background.paper'
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Real-time Environmental Data
            </Typography>
            <IAQWidgets />
          </Paper>
        </Grid>

        {/* Room IAQ Cards */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Room-by-Room Analysis
          </Typography>
        </Grid>

        {mockIAQReadings.map((reading) => (
          <Grid item xs={12} sm={6} md={4} key={reading.id}>
            <RoomIAQCard reading={reading} />
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}