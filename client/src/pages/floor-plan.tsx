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

  return (
    <PageContainer
      title="Interactive Floor Plan"
      description="Real-time view of workspace occupancy and environment status"
    >
      <Grid container spacing={3}>
        {/* Floor Plan Statistics */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Workspace Overview
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" startIcon={<Visibility />} size="small">
                  View Options
                </Button>
                <Button variant="contained" startIcon={<EventAvailable />} size="small">
                  Quick Book
                </Button>
              </Box>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>15</Typography>
                  <Typography variant="caption">Total Spaces</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'success.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>8</Typography>
                  <Typography variant="caption">Available</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'warning.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>6</Typography>
                  <Typography variant="caption">Occupied</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'info.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>72%</Typography>
                  <Typography variant="caption">Utilization</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Main Floor Plan */}
        <Grid item xs={12} lg={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3,
              backgroundColor: 'background.paper',
              minHeight: '600px'
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Interactive Floor Plan
            </Typography>
            <FloorPlan />
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Floor Plan Controls */}
            <Grid item xs={12}>
              <FloorPlanControlsCard />
            </Grid>

            {/* IAQ Data */}
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
                  Environment Data
                </Typography>
                <IAQWidgets />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Occupancy Stats */}
        <Grid item xs={12}>
          <OccupancyStatsCard />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
