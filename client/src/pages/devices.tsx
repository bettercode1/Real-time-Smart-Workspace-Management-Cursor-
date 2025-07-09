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
  Alert
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
  WaterDrop
} from '@mui/icons-material';
import PageContainer from '@/components/PageContainer';

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
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  
  const deviceStats = {
    total: mockDevices.length,
    online: mockDevices.filter(d => d.status === 'online').length,
    offline: mockDevices.filter(d => d.status === 'offline').length,
    maintenance: mockDevices.filter(d => d.status === 'maintenance').length
  };

  const hasDevices = mockDevices && mockDevices.length > 0;

  return (
    <PageContainer
      title="Device Status"
      description="View and manage connected devices in your workspace"
    >
      <Grid container spacing={3}>
        {mockDevices.map((device) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={device.id}>
            <DeviceCard device={device} />
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
} 