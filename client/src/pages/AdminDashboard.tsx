import React from "react";
import { Typography, Card, CardContent, Paper, Chip, List, ListItem, ListItemText, ListItemIcon, Button, IconButton, useTheme, alpha, Grid, Box, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/SettingsContext";
import { translations } from "@/lib/translations";
import { AdminPanelSettings, Person, Dashboard, TrendingUp, Notifications, Settings, Security, People, EventAvailable, Warning, Add, Edit, Delete } from "@mui/icons-material";
import FloorPlan from "@/components/FloorPlan";
import IAQWidgets from "@/components/IAQWidgets";
import NotificationCenter from "@/components/NotificationCenter";
import AnalyticsCards from "@/components/AnalyticsCards";
import DeviceModal from "@/components/DeviceModal";
import PageContainer from "@/components/PageContainer";

type Floor = { id: number; name: string; rooms: number };

const QuickStatsCard = ({ title, value, subtitle, color, icon }: {
  title: string;
  value: string;
  subtitle: string;
  color: string;
  icon: React.ReactNode;
}) => {
  const theme = useTheme();
  
  return (
    <Card 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        background: theme.palette.mode === 'light' 
          ? `linear-gradient(135deg, ${alpha(color, 0.04)} 0%, ${alpha(color, 0.08)} 100%)`
          : `linear-gradient(135deg, ${alpha(color, 0.08)} 0%, ${alpha(color, 0.12)} 100%)`,
        border: `1px solid ${alpha(color, 0.1)}`,
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 4px 12px ${alpha(color, 0.15)}`,
          borderColor: alpha(color, 0.2),
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ letterSpacing: 0.5, textTransform: 'uppercase', mb: 1, display: 'block' }}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={700} color="text.primary" sx={{ mb: 1, lineHeight: 1.2 }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {subtitle}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            p: 1.5,
            borderRadius: 1.5,
            background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
            color: 'white',
            boxShadow: `0 2px 8px ${alpha(color, 0.25)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 44,
            height: 44
          }}
        >
          {icon}
        </Box>
      </Box>
    </Card>
  );
};

const AdminWelcomeCard = ({ user }: { user: any }) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        borderRadius: 2,
        background: theme.palette.mode === 'light'
          ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
          : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
        color: theme.palette.primary.contrastText,
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${alpha('#ffffff', 0.1)} 0%, transparent 70%)`,
          borderRadius: '50%'
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              background: alpha('#ffffff', 0.15),
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
            }}
          >
            <AdminPanelSettings sx={{ fontSize: 28, color: 'white' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight={700} mb={1} sx={{ lineHeight: 1.2 }}>
              Welcome, {user?.displayName}!
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 400 }}>
              System Administrator Dashboard - Monitor and manage your workspace
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: alpha('#ffffff', 0.15),
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha('#ffffff', 0.2)}`,
              color: 'white',
              fontWeight: 600,
              borderRadius: 1.5,
              px: 3,
              py: 1,
              fontSize: '0.875rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: alpha('#ffffff', 0.25),
                transform: 'translateY(-1px)',
              }
            }}
            startIcon={<Settings />}
          >
            System Settings
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            sx={{ 
              borderColor: alpha('#ffffff', 0.3),
              borderWidth: 1,
              color: 'white',
              fontWeight: 600,
              borderRadius: 1.5,
              px: 3,
              py: 1,
              fontSize: '0.875rem',
              textTransform: 'none',
              '&:hover': {
                borderColor: alpha('#ffffff', 0.5),
                backgroundColor: alpha('#ffffff', 0.1),
                transform: 'translateY(-1px)'
              }
            }}
            startIcon={<Security />}
          >
            Security Panel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

const ManagementCard = ({ title, subtitle, icon, color, onClick }: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}) => {
  const theme = useTheme();
  
  return (
    <Card
      elevation={0}
      onClick={onClick}
      sx={{
        p: 3,
        borderRadius: 2,
        background: theme.palette.mode === 'light' 
          ? `linear-gradient(135deg, ${alpha(color, 0.04)} 0%, ${alpha(color, 0.08)} 100%)`
          : `linear-gradient(135deg, ${alpha(color, 0.08)} 0%, ${alpha(color, 0.12)} 100%)`,
        border: `1px solid ${alpha(color, 0.1)}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: `0 4px 12px ${alpha(color, 0.15)}`,
          borderColor: alpha(color, 0.2),
        } : {},
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box 
          sx={{ 
            p: 1.5,
            borderRadius: 1.5,
            background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
            color: 'white',
            boxShadow: `0 2px 8px ${alpha(color, 0.25)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 44,
            height: 44
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

const RecentActivityCard = () => {
  const theme = useTheme();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return <EventAvailable />;
      case 'alert': return <Warning />;
      case 'user': return <Person />;
      case 'device': return <AdminPanelSettings />;
      default: return <Notifications />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'booking': return '#8b5cf6';
      case 'alert': return '#ef4444';
      case 'user': return '#3b82f6';
      case 'device': return '#10b981';
      default: return '#64748b';
    }
  };

  const activities = [
    { id: 1, type: 'booking', message: 'New Booking Request for Room A-101', time: '2 minutes ago', user: 'John Doe' },
    { id: 2, type: 'alert', message: 'Temperature Alert in Room B-203', time: '5 minutes ago', user: 'System' },
    { id: 3, type: 'user', message: 'New User Registration: Sarah Wilson', time: '10 minutes ago', user: 'Admin' },
    { id: 4, type: 'device', message: 'Device Offline: Sensor-001', time: '15 minutes ago', user: 'System' },
    { id: 5, type: 'booking', message: 'Booking Cancelled for Room C-305', time: '20 minutes ago', user: 'Mike Johnson' },
  ];

  return (
    <Card elevation={0} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" fontWeight={600} color="text.primary">
        Recent Activity
      </Typography>
        <Chip 
          label="Live" 
          size="small" 
          sx={{ 
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            color: theme.palette.success.main,
            fontWeight: 600,
          }} 
        />
      </Box>
      
      <List sx={{ p: 0 }}>
        {activities.map((activity, index) => (
          <ListItem
            key={activity.id}
            sx={{
              p: 0,
              mb: 2,
              borderRadius: 1,
              background: theme.palette.mode === 'light' 
                ? alpha(getActivityColor(activity.type), 0.04)
                : alpha(getActivityColor(activity.type), 0.08),
              border: `1px solid ${alpha(getActivityColor(activity.type), 0.1)}`,
              '&:last-child': { mb: 0 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2, width: '100%' }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  background: `linear-gradient(135deg, ${getActivityColor(activity.type)} 0%, ${alpha(getActivityColor(activity.type), 0.8)} 100%)`,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 32,
                  height: 32,
                  mt: 0.5,
                }}
              >
                {getActivityIcon(activity.type)}
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500, mb: 0.5 }}>
                  {activity.message}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {activity.user}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    •
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const { language } = useSettings();
  const theme = useTheme();
  const t = translations[language];

  const [openFloorDialog, setOpenFloorDialog] = React.useState(false);
  const [editingFloor, setEditingFloor] = React.useState<Floor | null>(null);
  const [floorName, setFloorName] = React.useState('');
  const [floors, setFloors] = React.useState<Floor[]>([
    { id: 1, name: 'Ground Floor', rooms: 12 },
    { id: 2, name: 'First Floor', rooms: 15 },
    { id: 3, name: 'Second Floor', rooms: 8 },
  ]);

  const handleAddFloor = () => {
    setEditingFloor(null);
    setFloorName('');
    setOpenFloorDialog(true);
  };

  const handleEditFloor = (floor: Floor) => {
    setEditingFloor(floor);
    setFloorName(floor.name);
    setOpenFloorDialog(true);
  };

  const handleDeleteFloor = (id: number) => {
    setFloors(floors.filter(floor => floor.id !== id));
  };

  const handleSaveFloor = () => {
    if (editingFloor) {
      setFloors(floors.map(floor => 
        floor.id === editingFloor.id 
          ? { ...floor, name: floorName }
          : floor
      ));
    } else {
      setFloors([...floors, { 
        id: Math.max(...floors.map(f => f.id)) + 1, 
        name: floorName, 
        rooms: 0 
      }]);
    }
    setOpenFloorDialog(false);
  };

  return (
    <PageContainer>
        <Box sx={{ mb: 4 }}>
        <Typography variant="h1" fontWeight={700} color="text.primary" sx={{ mb: 1, fontSize: { xs: 32, md: 40 } }}>
          Admin Dashboard
          </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor and manage your workspace infrastructure
          </Typography>
        </Box>

            {/* Welcome Card */}
      <Box sx={{ mb: 4 }}>
        <AdminWelcomeCard user={user} />
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <QuickStatsCard
            title="Total Users"
            value="1,247"
            subtitle="+12% from last month"
            color="#3b82f6"
            icon={<People sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickStatsCard
            title="Active Bookings"
            value="89"
            subtitle="23 pending approval"
            color="#8b5cf6"
            icon={<EventAvailable sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickStatsCard
            title="Devices Online"
            value="156"
            subtitle="98.5% uptime"
            color="#10b981"
            icon={<AdminPanelSettings sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <QuickStatsCard
            title="Alerts"
            value="3"
            subtitle="2 critical, 1 warning"
            color="#ef4444"
            icon={<Warning sx={{ fontSize: 20 }} />}
          />
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {/* Floor Management */}
            <Grid item xs={12}>
              <Card elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600} color="text.primary">
                    Floor Management
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Add />}
                    onClick={handleAddFloor}
                    sx={{ borderRadius: 1.5 }}
                  >
                    Add Floor
                  </Button>
                </Box>
                
                <Grid container spacing={2}>
                  {floors.map((floor) => (
                    <Grid item xs={12} sm={6} md={4} key={floor.id}>
                      <Card
                        elevation={0}
                  sx={{
                          p: 2.5,
                          borderRadius: 1.5,
                          border: `1px solid ${theme.palette.divider}`,
                          transition: 'all 0.2s ease',
                    '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    },
                  }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6" fontWeight={600} color="text.primary">
                            {floor.name}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleEditFloor(floor)}
                              sx={{ color: theme.palette.primary.main }}
                            >
                              <Edit sx={{ fontSize: 16 }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteFloor(floor.id)}
                              sx={{ color: theme.palette.error.main }}
                >
                              <Delete sx={{ fontSize: 16 }} />
                            </IconButton>
              </Box>
                  </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {floor.rooms} rooms
                        </Typography>
                </Card>
              </Grid>
                  ))}
              </Grid>
                </Card>
              </Grid>

            {/* Analytics Cards */}
            <Grid item xs={12}>
              <AnalyticsCards />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Recent Activity */}
            <Grid item xs={12}>
              <RecentActivityCard />
            </Grid>

            {/* Management Cards */}
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight={600} color="text.primary" sx={{ mb: 2 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ManagementCard
                    title="User Management"
                    subtitle="Manage user accounts and permissions"
                    icon={<People />}
                    color="#3b82f6"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ManagementCard
                    title="Device Control"
                    subtitle="Monitor and control IoT devices"
                    icon={<AdminPanelSettings />}
                    color="#10b981"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ManagementCard
                    title="System Settings"
                    subtitle="Configure system preferences"
                    icon={<Settings />}
                    color="#8b5cf6"
                  />
                </Grid>
              </Grid>
          </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Floor Dialog */}
      <Dialog open={openFloorDialog} onClose={() => setOpenFloorDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          {editingFloor ? 'Edit Floor' : 'Add New Floor'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Floor Name"
            fullWidth
            variant="outlined"
            value={floorName}
            onChange={(e) => setFloorName(e.target.value)}
            sx={{ mb: 2 }}
          />
          </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setOpenFloorDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveFloor} 
            variant="contained"
            disabled={!floorName.trim()}
          >
            {editingFloor ? 'Update' : 'Add'}
          </Button>
          </DialogActions>
        </Dialog>
    </PageContainer>
  );
} 