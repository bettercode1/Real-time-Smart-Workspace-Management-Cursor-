import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Alert, Room } from "@shared/schema";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Alert as MuiAlert,
  CircularProgress,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import {
  Warning,
  People,
  Schedule,
  WifiOff,
  Search,
  Clear,
  CheckCircle,
  ErrorOutline,
  InfoOutlined,
  Close,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`alerts-tabpanel-${index}`}
      aria-labelledby={`alerts-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [activeTab, setActiveTab] = useState(0);
  
  const queryClient = useQueryClient();

  const { data: alerts = [], isLoading } = useQuery<Alert[]>({
    queryKey: ["/api/alerts"],
    refetchInterval: 10000
  });

  const { data: rooms = [] } = useQuery<Room[]>({
    queryKey: ["/api/rooms"]
  });

  const resolveAlertMutation = useMutation({
    mutationFn: async (alertId: number) => {
      return apiRequest("PATCH", `/api/alerts/${alertId}/resolve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
    }
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'high_co2': return <Warning />;
      case 'over_capacity': return <People />;
      case 'no_show': return <Schedule />;
      case 'device_offline': return <WifiOff />;
      default: return <ErrorOutline />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <ErrorOutline color="error" />;
      case 'high': return <Warning color="warning" />;
      case 'medium': return <InfoOutlined color="info" />;
      case 'low': return <CheckCircle color="success" />;
      default: return <InfoOutlined />;
    }
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = !searchTerm || 
      (alert.title && alert.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alert.description && alert.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSeverity = !severityFilter || alert.severity === severityFilter;
    const matchesType = !typeFilter || alert.type === typeFilter;
    
    return matchesSearch && matchesSeverity && matchesType;
  });

  const activeAlerts = filteredAlerts.filter(alert => !alert.resolvedAt);
  const resolvedAlerts = filteredAlerts.filter(alert => alert.resolvedAt);

  const alertCounts = {
    active: activeAlerts.length,
    resolved: resolvedAlerts.length,
    critical: alerts.filter(a => a.severity === 'critical' && !a.resolvedAt).length,
    high: alerts.filter(a => a.severity === 'high' && !a.resolvedAt).length,
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Alerts & Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor and manage system alerts
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Chip 
                label={alertCounts.active} 
                color="primary" 
                sx={{ fontSize: '1.1rem', fontWeight: 'bold', mb: 1 }} 
              />
              <Typography variant="body2" color="text.secondary">
                Active
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Chip 
                label={alertCounts.resolved} 
                color="success" 
                sx={{ fontSize: '1.1rem', fontWeight: 'bold', mb: 1 }} 
              />
              <Typography variant="body2" color="text.secondary">
                Resolved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Chip 
                label={alertCounts.critical} 
                color="error" 
                sx={{ fontSize: '1.1rem', fontWeight: 'bold', mb: 1 }} 
              />
              <Typography variant="body2" color="text.secondary">
                Critical
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Chip 
                label={alertCounts.high} 
                color="warning" 
                sx={{ fontSize: '1.1rem', fontWeight: 'bold', mb: 1 }} 
              />
              <Typography variant="body2" color="text.secondary">
                High Priority
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchTerm("")}>
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Severity</InputLabel>
                <Select
                  value={severityFilter}
                  label="Severity"
                  onChange={(e) => setSeverityFilter(e.target.value)}
                >
                  <MenuItem value="">All Severities</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  value={typeFilter}
                  label="Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="high_co2">High CO₂</MenuItem>
                  <MenuItem value="over_capacity">Over Capacity</MenuItem>
                  <MenuItem value="no_show">No Show</MenuItem>
                  <MenuItem value="device_offline">Device Offline</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
          >
            <Tab 
              label={`Active Alerts (${activeAlerts.length})`}
              icon={<Warning />}
              iconPosition="start"
            />
            <Tab 
              label={`Recent Resolved Alerts (${resolvedAlerts.length})`}
              icon={<CheckCircle />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Active Alerts Tab */}
        <TabPanel value={activeTab} index={0}>
          {activeAlerts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No active alerts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All systems are operating normally
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {activeAlerts.map((alert, index) => (
                <Box key={alert.id}>
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemIcon>
                      {getSeverityIcon(alert.severity)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          {getAlertIcon(alert.type)}
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {alert.title || alert.description}
                          </Typography>
                          <Chip 
                            label={alert.severity} 
                            color={getAlertColor(alert.severity) as any}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          Room ID: {alert.roomId} • {alert.createdAt ? formatDateTime(alert.createdAt) : 'N/A'}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        startIcon={<CheckCircle />}
                        onClick={() => resolveAlertMutation.mutate(alert.id)}
                        disabled={resolveAlertMutation.isPending}
                      >
                        Resolve
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < activeAlerts.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
        </TabPanel>

        {/* Resolved Alerts Tab */}
        <TabPanel value={activeTab} index={1}>
          {resolvedAlerts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <InfoOutlined sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No resolved alerts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Resolved alerts will appear here
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {resolvedAlerts.map((alert, index) => (
                <Box key={alert.id}>
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          {getAlertIcon(alert.type)}
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              fontWeight: 500,
                              textDecoration: 'line-through',
                              color: 'text.secondary'
                            }}
                          >
                            {alert.message}
                          </Typography>
                          <Chip 
                            label="Resolved" 
                            color="success"
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          Room ID: {alert.roomId} • Resolved: {alert.resolvedAt ? formatDateTime(alert.resolvedAt) : 'N/A'}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < resolvedAlerts.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
        </TabPanel>
      </Card>
    </Box>
  );
}