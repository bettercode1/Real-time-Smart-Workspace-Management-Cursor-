import React, { useState } from "react";
import { 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  Box,
  Chip,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  useTheme,
  alpha,
  LinearProgress
} from "@mui/material";
import {
  Warning,
  Error,
  Info,
  CheckCircle,
  Settings,
  Notifications,
  NotificationImportant,
  Air,
  Thermostat,
  WaterDrop,
  DevicesOther,
  Person,
  Schedule,
  Add,
  Edit,
  Close,
  TrendingUp,
  TrendingDown,
  Block,
  Refresh
} from "@mui/icons-material";
import AlertsPanel from "@/components/AlertsPanel";
import NotificationCenter from "@/components/NotificationCenter";
import IAQWidgets from "@/components/IAQWidgets";
import PageContainer from "@/components/PageContainer";

interface AlertRule {
  id: string;
  name: string;
  type: 'temperature' | 'humidity' | 'co2' | 'occupancy' | 'device' | 'booking';
  threshold: number;
  operator: 'greater' | 'less' | 'equal';
  location: string;
  isActive: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  notificationMethods: string[];
  description: string;
}

const mockAlertRules: AlertRule[] = [
  {
    id: '1',
    name: 'High CO2 Alert',
    type: 'co2',
    threshold: 1000,
    operator: 'greater',
    location: 'All Rooms',
    isActive: true,
    severity: 'high',
    notificationMethods: ['email', 'dashboard'],
    description: 'Alert when CO2 levels exceed 1000 ppm'
  },
  {
    id: '2',
    name: 'Temperature Warning',
    type: 'temperature',
    threshold: 26,
    operator: 'greater',
    location: 'Meeting Rooms',
    isActive: true,
    severity: 'medium',
    notificationMethods: ['dashboard'],
    description: 'Alert when temperature exceeds 26°C'
  },
  {
    id: '3',
    name: 'Device Offline',
    type: 'device',
    threshold: 0,
    operator: 'equal',
    location: 'All Locations',
    isActive: true,
    severity: 'critical',
    notificationMethods: ['email', 'dashboard', 'sms'],
    description: 'Alert when devices go offline'
  },
  {
    id: '4',
    name: 'Overcapacity Warning',
    type: 'occupancy',
    threshold: 90,
    operator: 'greater',
    location: 'Open Spaces',
    isActive: false,
    severity: 'medium',
    notificationMethods: ['dashboard'],
    description: 'Alert when occupancy exceeds 90%'
  }
];

const mockSystemHealth = {
  overallStatus: 'good',
  lastChecked: '2 minutes ago',
  metrics: {
    devices: { online: 45, offline: 2, total: 47 },
    sensors: { active: 23, inactive: 1, total: 24 },
    rooms: { monitored: 15, total: 15 },
    alerts: { active: 3, resolved: 12, total: 15 }
  }
};

const AlertRuleCard = ({ rule, onEdit }: { rule: AlertRule; onEdit: () => void }) => {
  const theme = useTheme();
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return theme.palette.error.main;
      case 'high': return theme.palette.warning.main;
      case 'medium': return theme.palette.info.main;
      case 'low': return theme.palette.success.main;
      default: return theme.palette.grey[500];
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'temperature': return <Thermostat />;
      case 'humidity': return <WaterDrop />;
      case 'co2': return <Air />;
      case 'occupancy': return <Person />;
      case 'device': return <DevicesOther />;
      case 'booking': return <Schedule />;
      default: return <Warning />;
    }
  };

  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 4px 20px ${alpha(getSeverityColor(rule.severity), 0.15)}`
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box 
              sx={{ 
                p: 1.5,
                borderRadius: 2,
                backgroundColor: alpha(getSeverityColor(rule.severity), 0.1),
                color: getSeverityColor(rule.severity)
              }}
            >
              {getTypeIcon(rule.type)}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {rule.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {rule.location}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <Chip 
              label={rule.severity}
              color={rule.severity === 'critical' ? 'error' : rule.severity === 'high' ? 'warning' : 'info'}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {rule.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Threshold: {rule.threshold} {rule.operator === 'greater' ? '>' : rule.operator === 'less' ? '<' : '='} 
            {rule.type === 'temperature' ? '°C' : rule.type === 'humidity' ? '%' : rule.type === 'co2' ? 'ppm' : ''}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            Notifications:
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {rule.notificationMethods.map((method) => (
              <Chip key={method} label={method} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: rule.isActive ? theme.palette.success.main : theme.palette.error.main
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {rule.isActive ? 'Active' : 'Inactive'}
            </Typography>
          </Box>
          <IconButton size="small" color="primary" onClick={onEdit}>
            <Edit />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

const SystemHealthCard = () => {
  const theme = useTheme();
  const { overallStatus, lastChecked, metrics } = mockSystemHealth;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return theme.palette.success.main;
      case 'warning': return theme.palette.warning.main;
      case 'error': return theme.palette.error.main;
      default: return theme.palette.grey[500];
    }
  };

  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            System Health
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: getStatusColor(overallStatus)
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {overallStatus.toUpperCase()}
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
          Last checked: {lastChecked}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
              <Typography variant="h5" fontWeight={700} color="primary.main">
                {metrics.devices.online}/{metrics.devices.total}
              </Typography>
              <Typography variant="caption" color="text.secondary">Devices Online</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.success.main, 0.1) }}>
              <Typography variant="h5" fontWeight={700} color="success.main">
                {metrics.sensors.active}/{metrics.sensors.total}
              </Typography>
              <Typography variant="caption" color="text.secondary">Active Sensors</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.info.main, 0.1) }}>
              <Typography variant="h5" fontWeight={700} color="info.main">
                {metrics.rooms.monitored}/{metrics.rooms.total}
              </Typography>
              <Typography variant="caption" color="text.secondary">Monitored Rooms</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.warning.main, 0.1) }}>
              <Typography variant="h5" fontWeight={700} color="warning.main">
                {metrics.alerts.active}
              </Typography>
              <Typography variant="caption" color="text.secondary">Active Alerts</Typography>
            </Box>
          </Grid>
        </Grid>

        <Button 
          variant="outlined" 
          startIcon={<Refresh />} 
          fullWidth 
          sx={{ mt: 2 }}
          size="small"
        >
          Refresh Status
        </Button>
      </CardContent>
    </Card>
  );
};

export default function AlertsPage() {
  const [alertRules, setAlertRules] = useState<AlertRule[]>(mockAlertRules);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<AlertRule | undefined>();

  const handleAddRule = () => {
    setSelectedRule(undefined);
    setDialogOpen(true);
  };

  const handleEditRule = (rule: AlertRule) => {
    setSelectedRule(rule);
    setDialogOpen(true);
  };

  const activeRules = alertRules.filter(rule => rule.isActive);
  const inactiveRules = alertRules.filter(rule => !rule.isActive);

  return (
    <PageContainer
      title="Alerts & Notifications"
      description="Monitor system alerts and environmental conditions"
    >
      <Grid container spacing={3}>
        {/* Alert Statistics */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Alert Overview
              </Typography>
              <Button variant="contained" startIcon={<Add />} onClick={handleAddRule}>
                Add Alert Rule
              </Button>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>{alertRules.length}</Typography>
                  <Typography variant="caption">Total Rules</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'success.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>{activeRules.length}</Typography>
                  <Typography variant="caption">Active Rules</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'warning.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>3</Typography>
                  <Typography variant="caption">Active Alerts</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'error.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>{alertRules.filter(r => r.severity === 'critical').length}</Typography>
                  <Typography variant="caption">Critical Rules</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* System Health */}
        <Grid item xs={12} md={4}>
          <SystemHealthCard />
        </Grid>

        {/* Main Alerts Panel */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3,
              backgroundColor: 'background.paper',
              minHeight: '400px'
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Live Alerts
            </Typography>
            <AlertsPanel />
          </Paper>
        </Grid>

        {/* Environmental Monitoring */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3,
              backgroundColor: 'background.paper'
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Environmental Monitoring
            </Typography>
            <IAQWidgets />
          </Paper>
        </Grid>

        {/* Recent Notifications */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3,
              backgroundColor: 'background.paper'
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Recent Notifications
            </Typography>
            <NotificationCenter />
          </Paper>
        </Grid>

        {/* Alert Rules */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Alert Rules
          </Typography>
        </Grid>

        {alertRules.map((rule) => (
          <Grid item xs={12} sm={6} md={4} key={rule.id}>
            <AlertRuleCard 
              rule={rule} 
              onEdit={() => handleEditRule(rule)}
            />
          </Grid>
        ))}

        {/* Empty State */}
        {alertRules.length === 0 && (
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 6,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #fff3e0 0%, #ffffff 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 320,
                border: '2px dashed #ffb74d'
              }}
            >
              <Warning sx={{ fontSize: 64, color: '#ffb74d', mb: 2 }} />
              <Typography variant="h5" fontWeight={700} color="warning.main" mb={1}>
                No Alert Rules
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                Set up your first alert rule to monitor your workspace conditions.
              </Typography>
              <Button variant="contained" color="warning" startIcon={<Add />} onClick={handleAddRule}>
                Add Alert Rule
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>
    </PageContainer>
  );
}