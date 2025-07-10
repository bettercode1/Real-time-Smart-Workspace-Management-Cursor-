import React, { useState } from "react";
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
  Divider,
  useTheme,
  alpha
} from "@mui/material";
import {
  Visibility,
  ZoomIn,
  ZoomOut,
  Refresh,
  Settings,
  People,
  LocationOn,
  EventAvailable,
  EventBusy,
  CheckCircle,
  Warning,
  Air,
  Thermostat,
  WaterDrop,
  Speed,
  FloorPlan as FloorIcon,
  Layers,
  ViewComfy,
  Fullscreen
} from "@mui/icons-material";
import FloorPlan from "@/components/FloorPlan";
import IAQWidgets from "@/components/IAQWidgets";
import PageContainer from "@/components/PageContainer";
import LoadingSpinner, { LoadingStats, LoadingCard } from '@/components/LoadingSpinner';

const OccupancyStatsCard = () => {
  const theme = useTheme();
  const occupancyData = [
    { space: 'Meeting Room 1', current: 6, capacity: 8, status: 'occupied' },
    { space: 'Meeting Room 2', current: 0, capacity: 12, status: 'available' },
    { space: 'Open Space Central', current: 24, capacity: 30, status: 'busy' },
    { space: 'Conference Room A', current: 8, capacity: 15, status: 'occupied' },
    { space: 'Phone Booth 1', current: 1, capacity: 1, status: 'occupied' },
    { space: 'Phone Booth 2', current: 0, capacity: 1, status: 'available' },
    { space: 'Training Room', current: 0, capacity: 25, status: 'maintenance' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return theme.palette.success.main;
      case 'occupied': return theme.palette.info.main;
      case 'busy': return theme.palette.warning.main;
      case 'maintenance': return theme.palette.error.main;
      default: return theme.palette.grey[500];
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle />;
      case 'occupied': return <People />;
      case 'busy': return <Warning />;
      case 'maintenance': return <Settings />;
      default: return <LocationOn />;
    }
  };

  const totalCapacity = occupancyData.reduce((sum, item) => sum + item.capacity, 0);
  const currentOccupancy = occupancyData.reduce((sum, item) => sum + item.current, 0);
  const utilizationRate = Math.round((currentOccupancy / totalCapacity) * 100);

  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            Real-time Occupancy
          </Typography>
          <Button size="small" startIcon={<Refresh />}>
            Refresh
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2">Overall Utilization</Typography>
            <Typography variant="subtitle2" color="primary.main">
              {currentOccupancy}/{totalCapacity} ({utilizationRate}%)
            </Typography>
          </Box>
          <Box sx={{ 
            height: 8, 
            borderRadius: 4, 
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              height: '100%', 
              width: `${utilizationRate}%`, 
              backgroundColor: theme.palette.primary.main,
              borderRadius: 4,
              transition: 'width 0.3s ease'
            }} />
          </Box>
        </Box>

        <List sx={{ p: 0, maxHeight: 300, overflow: 'auto' }}>
          {occupancyData.map((item, index) => (
            <ListItem key={index} sx={{ px: 0, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Box sx={{ color: getStatusColor(item.status) }}>
                  {getStatusIcon(item.status)}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {item.space}
                    </Typography>
                    <Chip 
                      label={item.status}
                      size="small"
                      sx={{ 
                        backgroundColor: alpha(getStatusColor(item.status), 0.1),
                        color: getStatusColor(item.status),
                        fontWeight: 600
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {item.current} / {item.capacity} people
                    </Typography>
                    <Box sx={{ 
                      width: 60, 
                      height: 4, 
                      borderRadius: 2, 
                      backgroundColor: alpha(getStatusColor(item.status), 0.2),
                      overflow: 'hidden'
                    }}>
                      <Box sx={{ 
                        height: '100%', 
                        width: `${(item.current / item.capacity) * 100}%`, 
                        backgroundColor: getStatusColor(item.status),
                        borderRadius: 2
                      }} />
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

const FloorPlanControlsCard = () => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState('occupancy');
  const [zoomLevel, setZoomLevel] = useState(100);

  const viewModes = [
    { value: 'occupancy', label: 'Occupancy', icon: <People /> },
    { value: 'bookings', label: 'Bookings', icon: <EventAvailable /> },
    { value: 'environment', label: 'Environment', icon: <Air /> },
    { value: 'layout', label: 'Layout', icon: <ViewComfy /> }
  ];

  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Floor Plan Controls
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            View Mode
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {viewModes.map((mode) => (
              <Chip
                key={mode.value}
                icon={mode.icon}
                label={mode.label}
                clickable
                color={viewMode === mode.value ? 'primary' : 'default'}
                onClick={() => setViewMode(mode.value)}
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Zoom Level: {zoomLevel}%
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              size="small" 
              onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
              disabled={zoomLevel <= 50}
            >
              <ZoomOut />
            </IconButton>
            <Box sx={{ 
              flex: 1, 
              height: 4, 
              borderRadius: 2, 
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
              position: 'relative'
            }}>
              <Box sx={{ 
                height: '100%', 
                width: `${(zoomLevel - 50) / 1.5}%`, 
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2,
                transition: 'width 0.3s ease'
              }} />
            </Box>
            <IconButton 
              size="small" 
              onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
              disabled={zoomLevel >= 200}
            >
              <ZoomIn />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
          <Button variant="outlined" startIcon={<Layers />} size="small">
            Toggle Layers
          </Button>
          <Button variant="outlined" startIcon={<Fullscreen />} size="small">
            Fullscreen
          </Button>
          <Button variant="outlined" startIcon={<Settings />} size="small">
            Settings
          </Button>
        </Box>

        <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: alpha(theme.palette.info.main, 0.1) }}>
          <Typography variant="caption" color="info.main" fontWeight={600}>
            💡 Tips:
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            Click on any room to view details or make a booking. Use the view modes to see different data overlays.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function FloorPlanPage() {
  const theme = useTheme();
  const [selectedView, setSelectedView] = useState('2D');
  const [selectedFloor, setSelectedFloor] = useState('Floor 1');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

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
        maxWidth: '1400px', 
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
              Interactive Floor Plan
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
              Real-time floor plan with live occupancy status and booking controls
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" startIcon={<Layers />} sx={{ borderRadius: 2 }}>
              {selectedFloor}
            </Button>
            <Button variant="outlined" startIcon={<ViewComfy />} sx={{ borderRadius: 2 }}>
              {selectedView} View
            </Button>
            <Button 
              variant="outlined" 
              startIcon={refreshing ? <LoadingSpinner size={16} variant="dots" /> : <Refresh />} 
              sx={{ borderRadius: 2 }}
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button variant="contained" startIcon={<Fullscreen />} sx={{ borderRadius: 2 }}>
              Full Screen
            </Button>
          </Box>
        </Box>

        {/* Quick Stats */}
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
                  <People sx={{ fontSize: 28 }} />
                </Box>
                <Typography variant="h5" fontWeight={800} color="#3730a3">58</Typography>
                <Typography fontWeight={600} color="#6366f1" fontSize={15}>Current Occupancy</Typography>
                <Typography color="#818cf8" fontSize={13}>Out of 92 capacity</Typography>
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
                <CheckCircle sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" fontWeight={800} color="#14532d">12</Typography>
              <Typography fontWeight={600} color="#16a34a" fontSize={15}>Available Rooms</Typography>
              <Typography color="#22c55e" fontSize={13}>Ready for booking</Typography>
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
                <EventAvailable sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" fontWeight={800} color="#92400e">8</Typography>
              <Typography fontWeight={600} color="#d97706" fontSize={15}>Active Bookings</Typography>
              <Typography color="#f59e0b" fontSize={13}>Currently in use</Typography>
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
                <Air sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" fontWeight={800} color="#831843">Good</Typography>
              <Typography fontWeight={600} color="#be185d" fontSize={15}>Air Quality</Typography>
              <Typography color="#ec4899" fontSize={13}>All rooms optimal</Typography>
            </Card>
          </Grid>
        </Grid>
        )}

        {/* Main Content */}
        {loading ? (
          <Box sx={{ my: 4 }}>
            <LoadingCard />
          </Box>
        ) : (
        <Grid container spacing={3} sx={{ width: '100%', mx: 0 }}>
          {/* Floor Plan */}
          <Grid item xs={12} md={8} sx={{ width: '100%', maxWidth: '100%' }}>
            <Card elevation={0} sx={{ 
              p: 3, 
              borderRadius: 4, 
              background: '#fff',
              boxShadow: '0 2px 12px rgba(99,102,241,0.06)',
              minHeight: 600
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Floor Plan - {selectedFloor}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" onClick={() => setZoomLevel(prev => Math.min(prev + 10, 200))}><ZoomIn /></IconButton>
                  <Typography variant="caption" sx={{ px: 2, py: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                    {zoomLevel}%
                  </Typography>
                  <IconButton size="small" onClick={() => setZoomLevel(prev => Math.max(prev - 10, 50))}><ZoomOut /></IconButton>
                  <IconButton size="small"><Refresh /></IconButton>
                </Box>
              </Box>
              <FloorPlan />
            </Card>
          </Grid>

          {/* Occupancy Stats */}
          <Grid item xs={12} md={4} sx={{ width: '100%', maxWidth: '100%' }}>
            <OccupancyStatsCard />
          </Grid>

          {/* IAQ Overview */}
          <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
            <Card elevation={0} sx={{ 
              p: 3, 
              borderRadius: 4, 
              background: '#fff',
              boxShadow: '0 2px 12px rgba(99,102,241,0.06)'
            }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Environmental Overview
              </Typography>
              <IAQWidgets />
            </Card>
          </Grid>
        </Grid>
        )}
      </Box>
    </Box>
  );
}
