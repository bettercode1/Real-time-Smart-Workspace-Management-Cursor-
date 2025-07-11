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
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
  useTheme,
  alpha,
  Badge,
  Tab,
  Tabs,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  LinearProgress
} from "@mui/material";
import {
  NotificationsActive,
  Warning,
  Info,
  CheckCircle,
  Error,
  Schedule,
  Clear,
  Settings,
  FilterList,
  Refresh,
  MarkEmailRead,
  VolumeUp,
  VolumeOff,
  Visibility,
  Delete,
  Star,
  StarBorder,
  Thermostat,
  Air,
  WaterDrop,
  People,
  Computer,
  Phone,
  EventBusy,
  TrendingUp,
  SecurityUpdate,
  PowerOff,
  LocationOn,
  AccessTime,
  Update,
  Circle,
  Archive
} from "@mui/icons-material";
import PageContainer from "@/components/PageContainer";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'environment' | 'booking' | 'system' | 'security';
  timestamp: string;
  location?: string;
  isRead: boolean;
  isStarred: boolean;
  isActive: boolean;
  icon?: React.ReactNode;
  actionRequired?: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'High CO₂ Levels Detected',
    message: 'CO₂ levels in Meeting Room A have exceeded the safe threshold (>1000 ppm). Immediate ventilation recommended.',
    type: 'warning',
    severity: 'high',
    category: 'environment',
    timestamp: '2 minutes ago',
    location: 'Meeting Room A - Floor 2',
    isRead: false,
    isStarred: true,
    isActive: true,
    icon: <Air />,
    actionRequired: true
  },
  {
    id: '2',
    title: 'Booking Confirmed',
    message: 'Your desk booking for tomorrow has been confirmed. Desk 25, Open Space - Floor 2.',
    type: 'success',
    severity: 'low',
    category: 'booking',
    timestamp: '15 minutes ago',
    location: 'Desk 25 - Floor 2',
    isRead: false,
    isStarred: false,
    isActive: true,
    icon: <CheckCircle />
  },
  {
    id: '3',
    title: 'Meeting Room Available',
    message: 'Meeting Room B is now available for immediate booking. Previously reserved meeting was cancelled.',
    type: 'info',
    severity: 'low',
    category: 'booking',
    timestamp: '1 hour ago',
    location: 'Meeting Room B - Floor 3',
    isRead: true,
    isStarred: false,
    isActive: true,
    icon: <EventBusy />
  },
  {
    id: '4',
    title: 'Device Offline',
    message: 'Temperature sensor in Conference Room C has gone offline. Environmental monitoring may be affected.',
    type: 'error',
    severity: 'medium',
    category: 'system',
    timestamp: '2 hours ago',
    location: 'Conference Room C - Floor 4',
    isRead: true,
    isStarred: false,
    isActive: true,
    icon: <PowerOff />,
    actionRequired: true
  },
  {
    id: '5',
    title: 'Capacity Alert',
    message: 'Open workspace area has reached 90% capacity. Consider booking alternative spaces.',
    type: 'warning',
    severity: 'medium',
    category: 'environment',
    timestamp: '3 hours ago',
    location: 'Open Space - Floor 2',
    isRead: true,
    isStarred: false,
    isActive: true,
    icon: <People />
  },
  {
    id: '6',
    title: 'System Maintenance Scheduled',
    message: 'Planned maintenance for booking system scheduled for tonight 11 PM - 2 AM.',
    type: 'info',
    severity: 'low',
    category: 'system',
    timestamp: '5 hours ago',
    isRead: true,
    isStarred: true,
    isActive: true,
    icon: <SecurityUpdate />
  },
  {
    id: '7',
    title: 'Temperature Optimal',
    message: 'All meeting rooms have returned to optimal temperature range (68-72°F).',
    type: 'success',
    severity: 'low',
    category: 'environment',
    timestamp: '1 day ago',
    location: 'All Floors',
    isRead: true,
    isStarred: false,
    isActive: false,
    icon: <Thermostat />
  }
];

export default function AlertsPage() {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [filter, setFilter] = useState('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const toggleStar = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isStarred: !alert.isStarred } : alert
    ));
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return theme.palette.success.main;
      case 'warning': return theme.palette.warning.main;
      case 'error': return theme.palette.error.main;
      case 'info': return theme.palette.info.main;
      default: return theme.palette.grey[500];
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return theme.palette.error.main;
      case 'high': return theme.palette.error.light;
      case 'medium': return theme.palette.warning.main;
      case 'low': return theme.palette.info.main;
      default: return theme.palette.grey[500];
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'environment': return <Air />;
      case 'booking': return <Schedule />;
      case 'system': return <Settings />;
      case 'security': return <SecurityUpdate />;
      default: return <Info />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (currentTab === 0) return alert.isActive; // Active
    if (currentTab === 1) return !alert.isRead; // Unread
    if (currentTab === 2) return alert.isStarred; // Starred
    if (currentTab === 3) return !alert.isActive; // Archived
    return true;
  }).filter(alert => {
    if (filter === 'all') return true;
    return alert.category === filter;
  });

  const stats = {
    total: alerts.length,
    active: alerts.filter(a => a.isActive).length,
    unread: alerts.filter(a => !a.isRead).length,
    critical: alerts.filter(a => a.severity === 'critical' || a.severity === 'high').length,
    starred: alerts.filter(a => a.isStarred).length,
    actionRequired: alerts.filter(a => a.actionRequired).length
  };

  return (
    <PageContainer
      title="Alerts & Notifications"
      description="Stay updated with real-time alerts, system notifications, and environmental monitoring"
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
            icon={<Circle sx={{ fontSize: '8px !important' }} />} 
            label={`${stats.active} Active`} 
            color="warning" 
            variant="outlined"
            size="small"
          />
          <Chip 
            icon={<Circle sx={{ fontSize: '8px !important' }} />} 
            label={`${stats.unread} Unread`} 
            color="primary" 
            variant="outlined"
            size="small"
          />
          <Chip 
            icon={<Circle sx={{ fontSize: '8px !important' }} />} 
            label={`${stats.critical} Critical`} 
            color="error" 
            variant="outlined"
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch 
                checked={soundEnabled} 
                onChange={(e) => setSoundEnabled(e.target.checked)}
                size="small"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {soundEnabled ? <VolumeUp sx={{ fontSize: 16 }} /> : <VolumeOff sx={{ fontSize: 16 }} />}
                <Typography variant="caption">Sound</Typography>
              </Box>
            }
          />
          <Button
            variant="outlined"
            startIcon={refreshing ? <LoadingSpinner size={16} variant="modern" /> : <Refresh />}
            onClick={handleRefresh}
            disabled={refreshing}
            sx={{ borderRadius: 2 }}
            size="small"
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<MarkEmailRead />}
            sx={{ borderRadius: 2 }}
            size="small"
          >
            Mark All Read
          </Button>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={4} md={2}>
          <Card elevation={0} sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                {stats.total}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Total Alerts
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <Card elevation={0} sx={{
            background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                {stats.active}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Active
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <Card elevation={0} sx={{
            background: `linear-gradient(135deg, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                {stats.unread}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Unread
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <Card elevation={0} sx={{
            background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                {stats.critical}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Critical
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <Card elevation={0} sx={{
            background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                {stats.starred}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Starred
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <Card elevation={0} sx={{
            background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
            color: 'white',
            borderRadius: 3
          }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                {stats.actionRequired}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Action Needed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Card elevation={0} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          {/* Tabs and Filter */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Tabs 
              value={currentTab} 
              onChange={handleTabChange}
              sx={{ 
                '& .MuiTab-root': { 
                  fontWeight: 600,
                  textTransform: 'none',
                  minWidth: 100
                }
              }}
            >
              <Tab 
                icon={<Badge badgeContent={stats.active} color="warning" max={99}><NotificationsActive /></Badge>} 
                label="Active" 
                iconPosition="start" 
              />
              <Tab 
                icon={<Badge badgeContent={stats.unread} color="primary" max={99}><MarkEmailRead /></Badge>} 
                label="Unread" 
                iconPosition="start" 
              />
              <Tab 
                icon={<Badge badgeContent={stats.starred} color="warning" max={99}><Star /></Badge>} 
                label="Starred" 
                iconPosition="start" 
              />
              <Tab 
                icon={<Archive />} 
                label="Archived" 
                iconPosition="start" 
              />
            </Tabs>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filter}
                label="Category"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="environment">Environment</MenuItem>
                <MenuItem value="booking">Booking</MenuItem>
                <MenuItem value="system">System</MenuItem>
                <MenuItem value="security">Security</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Alerts List */}
          <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
            {filteredAlerts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <NotificationsActive sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No Alerts to Display
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All caught up! You'll see new alerts here as they arrive.
                </Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {filteredAlerts.map((alert, index) => (
                  <ListItem
                    key={alert.id}
                    sx={{
                      p: 2,
                      mb: 1,
                      borderRadius: 2,
                      backgroundColor: !alert.isRead 
                        ? alpha(getTypeColor(alert.type), 0.05)
                        : 'transparent',
                      border: `1px solid ${!alert.isRead 
                        ? alpha(getTypeColor(alert.type), 0.2)
                        : theme.palette.divider}`,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: alpha(getTypeColor(alert.type), 0.08),
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${alpha(getTypeColor(alert.type), 0.1)}`
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          backgroundColor: alpha(getTypeColor(alert.type), 0.1),
                          color: getTypeColor(alert.type),
                          width: 48,
                          height: 48
                        }}
                      >
                        {alert.icon}
                      </Avatar>
                    </ListItemAvatar>
                    
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography 
                            variant="subtitle1" 
                            fontWeight={!alert.isRead ? 700 : 600}
                            sx={{ mr: 2, flex: 1 }}
                          >
                            {alert.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Chip 
                              size="small"
                              label={alert.severity}
                              sx={{ 
                                backgroundColor: alpha(getSeverityColor(alert.severity), 0.1),
                                color: getSeverityColor(alert.severity),
                                fontWeight: 600,
                                fontSize: '0.7rem'
                              }}
                            />
                            <Chip 
                              size="small"
                              icon={getCategoryIcon(alert.category)}
                              label={alert.category}
                              variant="outlined"
                              sx={{ fontSize: '0.7rem' }}
                            />
                          </Box>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {alert.message}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              {alert.location && (
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <LocationOn sx={{ fontSize: 12 }} />
                                  {alert.location}
                                </Typography>
                              )}
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AccessTime sx={{ fontSize: 12 }} />
                                {alert.timestamp}
                              </Typography>
                            </Box>
                            {alert.actionRequired && (
                              <Chip 
                                label="Action Required" 
                                size="small"
                                color="warning"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                              />
                            )}
                          </Box>
                        </Box>
                      }
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ml: 1 }}>
                      <Tooltip title={alert.isStarred ? "Remove from starred" : "Add to starred"}>
                        <IconButton 
                          size="small" 
                          onClick={() => toggleStar(alert.id)}
                          sx={{ color: alert.isStarred ? 'warning.main' : 'text.secondary' }}
                        >
                          {alert.isStarred ? <Star /> : <StarBorder />}
                        </IconButton>
                      </Tooltip>
                      
                      {!alert.isRead && (
                        <Tooltip title="Mark as read">
                          <IconButton 
                            size="small" 
                            onClick={() => markAsRead(alert.id)}
                            color="primary"
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                      )}
                      
                      <Tooltip title="Delete alert">
                        <IconButton 
                          size="small" 
                          onClick={() => deleteAlert(alert.id)}
                          sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
}