import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  IconButton,
  Button,
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  LinearProgress,
  Fab
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Refresh,
  DevicesOther,
  SignalCellular4Bar,
  SignalCellularOff,
  Battery4Bar,
  Thermostat,
  Speed,
  WaterDrop,
  Wifi,
  WifiOff,
  Camera,
  Monitor,
  Sensors,
  Settings,
  CheckCircle,
  Error,
  Warning,
  Search,
  FilterList
} from '@mui/icons-material';
import LoadingSpinner, { LoadingStats, LoadingCard } from '@/components/LoadingSpinner';

interface Device {
  id: string;
  name: string;
  type: 'sensor' | 'controller' | 'camera' | 'display';
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  batteryLevel: number;
  lastSeen: string;
  firmware: string;
  temperature?: number;
  humidity?: number;
  airQuality?: number;
}

const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Meeting Room 1 Sensor',
    type: 'sensor',
    location: 'Meeting Room 1',
    status: 'online',
    batteryLevel: 85,
    lastSeen: '2 minutes ago',
    firmware: 'v2.1.0',
    temperature: 22.5,
    humidity: 45,
    airQuality: 95
  },
  {
    id: '2',
    name: 'Open Space Monitor',
    type: 'sensor',
    location: 'Open Workspace',
    status: 'online',
    batteryLevel: 92,
    lastSeen: '1 minute ago',
    firmware: 'v2.1.0',
    temperature: 23.1,
    humidity: 42,
    airQuality: 87
  },
  {
    id: '3',
    name: 'Kitchen Display',
    type: 'display',
    location: 'Kitchen Area',
    status: 'offline',
    batteryLevel: 0,
    lastSeen: '15 minutes ago',
    firmware: 'v1.8.2'
  },
  {
    id: '4',
    name: 'Entry Camera',
    type: 'camera',
    location: 'Main Entrance',
    status: 'maintenance',
    batteryLevel: 100,
    lastSeen: '5 minutes ago',
    firmware: 'v3.0.1'
  }
];

const DeviceCard = ({ device }: { device: Device }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'success';
      case 'offline': return 'error';
      case 'maintenance': return 'warning';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sensor': return <DevicesOther />;
      case 'camera': return <DevicesOther />;
      case 'display': return <DevicesOther />;
      default: return <DevicesOther />;
    }
  };

  return (
    <Card 
      elevation={2}
      sx={{ 
        height: '100%',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        background: 'background.paper',
        boxShadow: '0 2px 12px rgba(99,102,241,0.06)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box 
              sx={{ 
                p: 1,
                borderRadius: 2,
                backgroundColor: 'primary.main',
                color: 'white'
              }}
            >
              {getTypeIcon(device.type)}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {device.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {device.location}
              </Typography>
            </Box>
          </Box>
          <Chip 
            label={device.status}
            color={getStatusColor(device.status) as any}
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Battery4Bar color={device.batteryLevel > 20 ? "success" : "error"} />
            <Typography variant="caption">
              {device.batteryLevel}%
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {device.status === 'online' ? (
              <SignalCellular4Bar color="success" />
            ) : (
              <SignalCellularOff color="error" />
            )}
            <Typography variant="caption">
              {device.lastSeen}
            </Typography>
          </Box>
        </Box>

        {device.type === 'sensor' && (
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Thermostat color="primary" />
              <Typography variant="caption">
                {device.temperature}°C
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <WaterDrop color="info" />
              <Typography variant="caption">
                {device.humidity}%
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Speed color="success" />
              <Typography variant="caption">
                AQ: {device.airQuality}
              </Typography>
            </Box>
          </Box>
        )}

        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          Firmware: {device.firmware}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <IconButton size="small" color="primary">
            <Edit />
          </IconButton>
          <IconButton size="small" color="error">
            <Delete />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

const EmptyDevicePlaceholder = () => (
  <Paper
    elevation={0}
    sx={{
      p: 6,
      borderRadius: 4,
      background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 320,
      border: '2px dashed #90caf9',
      boxShadow: '0 4px 20px rgba(33,150,243,0.08)'
    }}
  >
    <DevicesOther sx={{ fontSize: 64, color: '#90caf9', mb: 2 }} />
    <Typography variant="h5" fontWeight={700} color="primary" mb={1}>
      No Devices Found
    </Typography>
    <Typography variant="body1" color="text.secondary" mb={3}>
      You haven't added any devices yet. Start by adding your first IoT device to monitor your workspace!
    </Typography>
    <Button variant="contained" color="primary" startIcon={<Add />} size="large">
      Add Device
    </Button>
  </Paper>
);

export default function DevicesPage() {
  const theme = useTheme();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };
  
  const deviceStats = {
    total: mockDevices.length,
    online: mockDevices.filter(d => d.status === 'online').length,
    offline: mockDevices.filter(d => d.status === 'offline').length,
    maintenance: mockDevices.filter(d => d.status === 'maintenance').length
  };

  const hasDevices = mockDevices && mockDevices.length > 0;
  const filteredDevices = filterStatus === 'all' ? mockDevices : mockDevices.filter(d => d.status === filterStatus);

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
              Device Management
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
              Monitor and manage all connected IoT devices in your workspace
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Filter Status</InputLabel>
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Filter Status">
                <MenuItem value="all">All Devices</MenuItem>
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="offline">Offline</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
              </Select>
            </FormControl>
            <Button 
              variant="outlined" 
              startIcon={refreshing ? <LoadingSpinner size={16} variant="modern" /> : <Refresh />} 
              sx={{ borderRadius: 2 }}
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Add />} 
              sx={{ borderRadius: 2 }} 
              onClick={() => setAddDialogOpen(true)}
            >
              Add Device
            </Button>
          </Box>
        </Box>

        {/* Device Statistics */}
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
                  <DevicesOther sx={{ fontSize: 28 }} />
                </Box>
                <Typography variant="h5" fontWeight={800} color="#3730a3">{deviceStats.total}</Typography>
                <Typography fontWeight={600} color="#6366f1" fontSize={15}>Total Devices</Typography>
                <Typography color="#818cf8" fontSize={13}>Connected sensors and devices</Typography>
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
              <Typography variant="h5" fontWeight={800} color="#14532d">{deviceStats.online}</Typography>
              <Typography fontWeight={600} color="#16a34a" fontSize={15}>Online</Typography>
              <Typography color="#22c55e" fontSize={13}>Active and responding</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ width: '100%', maxWidth: '100%' }}>
            <Card elevation={0} sx={{
              p: 3,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
              boxShadow: '0 2px 8px rgba(239,68,68,0.06)',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              minHeight: 140,
            }}>
              <Box sx={{
                bgcolor: '#ef4444', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Error sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" fontWeight={800} color="#7f1d1d">{deviceStats.offline}</Typography>
              <Typography fontWeight={600} color="#dc2626" fontSize={15}>Offline</Typography>
              <Typography color="#ef4444" fontSize={13}>Not responding</Typography>
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
                <Warning sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" fontWeight={800} color="#92400e">{deviceStats.maintenance}</Typography>
              <Typography fontWeight={600} color="#d97706" fontSize={15}>Maintenance</Typography>
              <Typography color="#f59e0b" fontSize={13}>Under maintenance</Typography>
            </Card>
          </Grid>
        </Grid>
        )}

        {/* Device Cards */}
        {loading ? (
          <Box sx={{ my: 4 }}>
            <LoadingCard />
          </Box>
        ) : (
        <Grid container spacing={3} sx={{ width: '100%', mx: 0 }}>
          {hasDevices ? (
            filteredDevices.map((device) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={device.id} sx={{ width: '100%', maxWidth: '100%' }}>
                <DeviceCard device={device} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <EmptyDevicePlaceholder />
            </Grid>
          )}
        </Grid>
        )}

        {/* Floating Action Button */}
        <Fab 
          color="primary" 
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={() => setAddDialogOpen(true)}
        >
          <Add />
        </Fab>

        {/* Add Device Dialog */}
        <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Device</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField fullWidth label="Device Name" variant="outlined" />
              <TextField fullWidth label="Location" variant="outlined" />
              <FormControl fullWidth>
                <InputLabel>Device Type</InputLabel>
                <Select label="Device Type">
                  <MenuItem value="sensor">Sensor</MenuItem>
                  <MenuItem value="camera">Camera</MenuItem>
                  <MenuItem value="controller">Controller</MenuItem>
                  <MenuItem value="display">Display</MenuItem>
                </Select>
              </FormControl>
              <TextField fullWidth label="MAC Address" variant="outlined" />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={() => {
                // Here you would typically add the device to the state
                console.log('Adding new device...');
                setAddDialogOpen(false);
              }}
            >
              Add Device
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
} 