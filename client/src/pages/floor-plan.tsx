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
  alpha,
  Badge,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Tooltip,
  Fab
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
  Fullscreen,
  Computer,
  Phone,
  AccessTime,
  TrendingUp,
  Business,
  Wifi,
  PowerSettingsNew,
  Monitor,
  Add,
  FilterList,
  Map
} from "@mui/icons-material";
import InteractiveFloorPlan from "@/components/InteractiveFloorPlan";
import PageContainer from "@/components/PageContainer";
import LoadingSpinner from '@/components/LoadingSpinner';

const FloorControlsCard = () => {
  const theme = useTheme();
  const [selectedFloor, setSelectedFloor] = useState('floor-2');
  const [viewMode, setViewMode] = useState('interactive');
  const [showLabels, setShowLabels] = useState(true);
  const [showOccupancy, setShowOccupancy] = useState(true);

  const floors = [
    { value: 'floor-1', label: 'Floor 1 - Lobby & Reception', rooms: 8, available: 5 },
    { value: 'floor-2', label: 'Floor 2 - Open Workspace', rooms: 25, available: 18 },
    { value: 'floor-3', label: 'Floor 3 - Meeting Rooms', rooms: 12, available: 7 },
    { value: 'floor-4', label: 'Floor 4 - Executive Floor', rooms: 6, available: 4 }
  ];

  const currentFloor = floors.find(f => f.value === selectedFloor);

  return (
    <Card elevation={0} sx={{ height: 'fit-content', width: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Floor Plan Controls
        </Typography>

        {/* Floor Selection */}
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Select Floor</InputLabel>
            <Select
              value={selectedFloor}
              label="Select Floor"
              onChange={(e) => setSelectedFloor(e.target.value)}
            >
              {floors.map((floor) => (
                <MenuItem key={floor.value} value={floor.value}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <span>{floor.label}</span>
                    <Chip 
                      size="small" 
                      label={`${floor.available}/${floor.rooms}`}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Current Floor Info */}
        {currentFloor && (
          <Box sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              {currentFloor.label}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">Available Spaces</Typography>
              <Typography variant="body2" fontWeight={600} color="success.main">
                {currentFloor.available} of {currentFloor.rooms}
              </Typography>
            </Box>
            <Box sx={{ 
              height: 6, 
              borderRadius: 3, 
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                height: '100%', 
                width: `${(currentFloor.available / currentFloor.rooms) * 100}%`, 
                backgroundColor: theme.palette.success.main,
                borderRadius: 3,
                transition: 'width 0.3s ease'
              }} />
            </Box>
          </Box>
        )}

        {/* View Options */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
            Display Options
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={showLabels} 
                  onChange={(e) => setShowLabels(e.target.checked)}
                  size="small"
                />
              }
              label="Show Labels"
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={showOccupancy} 
                  onChange={(e) => setShowOccupancy(e.target.checked)}
                  size="small"
                />
              }
              label="Show Occupancy"
            />
          </Box>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button 
            variant="outlined" 
            startIcon={<Computer />} 
            fullWidth 
            size="small"
            sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
          >
            Find Available Desk
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<People />} 
            fullWidth 
            size="small"
            sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
          >
            Book Meeting Room
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Phone />} 
            fullWidth 
            size="small"
            sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
          >
            Reserve Phone Booth
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Map />} 
            fullWidth 
            size="small"
            sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
          >
            Export Floor Plan
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const SpaceStatsCard = () => {
  const theme = useTheme();
  
  const spaceTypes = [
    { 
      type: 'Desks', 
      total: 45, 
      available: 32, 
      occupied: 13, 
      icon: <Computer />,
      color: theme.palette.primary.main
    },
    { 
      type: 'Meeting Rooms', 
      total: 8, 
      available: 5, 
      occupied: 3, 
      icon: <People />,
      color: theme.palette.success.main
    },
    { 
      type: 'Phone Booths', 
      total: 6, 
      available: 4, 
      occupied: 2, 
      icon: <Phone />,
      color: theme.palette.warning.main
    }
  ];

  return (
    <Card elevation={0} sx={{ height: 'fit-content', width: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Space Statistics
          </Typography>
          <Button size="small" startIcon={<Refresh />}>
            Refresh
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {spaceTypes.map((space, index) => {
            const utilizationRate = Math.round((space.occupied / space.total) * 100);
            
            return (
              <Box key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    backgroundColor: alpha(space.color, 0.1),
                    color: space.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    {space.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {space.type}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {space.available} available of {space.total}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight={700} color={space.color}>
                    {utilizationRate}%
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  height: 6, 
                  borderRadius: 3, 
                  backgroundColor: alpha(space.color, 0.1),
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    height: '100%', 
                    width: `${utilizationRate}%`, 
                    backgroundColor: space.color,
                    borderRadius: 3,
                    transition: 'width 0.3s ease'
                  }} />
                </Box>
              </Box>
            );
          })}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} color="primary.main" sx={{ mb: 1 }}>
            72%
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Overall Space Utilization
          </Typography>
          <Chip 
            icon={<TrendingUp />}
            label="+8% from yesterday"
            color="success"
            variant="outlined"
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const EnvironmentCard = () => {
  const theme = useTheme();
  
  const environmentData = [
    {
      metric: 'Temperature',
      value: '72°F',
      status: 'optimal',
      icon: <Thermostat />,
      color: theme.palette.info.main
    },
    {
      metric: 'Air Quality',
      value: '420 ppm',
      status: 'good',
      icon: <Air />,
      color: theme.palette.success.main
    },
    {
      metric: 'Humidity',
      value: '45%',
      status: 'optimal',
      icon: <WaterDrop />,
      color: theme.palette.primary.main
    }
  ];

  return (
    <Card elevation={0} sx={{ height: 'fit-content', width: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Environment Status
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {environmentData.map((item, index) => (
            <Box 
              key={index}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 2, 
                borderRadius: 2,
                backgroundColor: alpha(item.color, 0.05),
                border: `1px solid ${alpha(item.color, 0.1)}`
              }}
            >
              <Box sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: alpha(item.color, 0.1),
                color: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2
              }}>
                {item.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={600}>
                  {item.metric}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Status: {item.status}
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight={700} color={item.color}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default function FloorPlanPage() {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <PageContainer
      title="Interactive Floor Plan"
      description="View real-time occupancy, book available spaces, and monitor environment conditions"
    >
      {/* Header Actions */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip 
            icon={<CheckCircle />} 
            label="32 Available" 
            color="success" 
            variant="outlined"
          />
          <Chip 
            icon={<AccessTime />} 
            label="13 Occupied" 
            color="warning" 
            variant="outlined"
          />
          <Chip 
            icon={<Warning />} 
            label="2 Maintenance" 
            color="error" 
            variant="outlined"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={refreshing ? <LoadingSpinner size={16} variant="modern" /> : <Refresh />}
            onClick={handleRefresh}
            disabled={refreshing}
            sx={{ borderRadius: 2 }}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ 
              borderRadius: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
            }}
          >
            Quick Book
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Floor Plan */}
        <Grid item xs={12} lg={8}>
          <Card elevation={0} sx={{ borderRadius: 3, minHeight: 600 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={700}>
                  Floor Plan - Click Available Seats to Book
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Zoom In">
                    <IconButton size="small" color="primary">
                      <ZoomIn />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Zoom Out">
                    <IconButton size="small" color="primary">
                      <ZoomOut />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Fullscreen">
                    <IconButton size="small" color="primary">
                      <Fullscreen />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              
              {/* Interactive Floor Plan Component */}
              <InteractiveFloorPlan />
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar with Controls and Stats */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: 'fit-content' }}>
            <FloorControlsCard />
            <SpaceStatsCard />
            <EnvironmentCard />
          </Box>
        </Grid>
      </Grid>

      {/* Floating Action Button for Quick Booking */}
      <Fab
        color="primary"
        aria-label="quick book"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          '&:hover': {
            background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
          }
        }}
      >
        <Add />
      </Fab>
    </PageContainer>
  );
}