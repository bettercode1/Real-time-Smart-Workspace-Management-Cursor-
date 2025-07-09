import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Button,
  TextField,
  Card,
  CardContent,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Divider,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha
} from "@mui/material";
import {
  Person,
  Notifications,
  Security,
  Monitor,
  Language,
  Help,
  Save,
  Edit,
  Palette,
  VolumeUp,
  Vibration,
  Email,
  Sms,
  Badge,
  Key,
  Lock,
  Visibility,
  VisibilityOff,
  Backup,
  CloudDownload,
  Delete,
  RestoreFromTrash,
  Info,
  Warning,
  CheckCircle,
  Schedule,
  DataUsage,
  Storage,
  Update,
  BugReport,
  QuestionAnswer
} from "@mui/icons-material";
import PageContainer from '@/components/PageContainer';

const SystemStatusCard = () => {
  const theme = useTheme();
  const systemStatus = {
    version: 'v2.1.0',
    uptime: '15 days, 8 hours',
    lastUpdate: '2024-01-10',
    storage: {
      used: 2.4,
      total: 10,
      percentage: 24
    },
    performance: 'Excellent',
    backup: {
      lastBackup: '2024-01-15 03:00',
      status: 'Success',
      size: '1.2 GB'
    }
  };

  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          System Status
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
              <Typography variant="h6" fontWeight={700} color="primary.main">
                {systemStatus.version}
              </Typography>
              <Typography variant="caption" color="text.secondary">Version</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.success.main, 0.1) }}>
              <Typography variant="h6" fontWeight={700} color="success.main">
                {systemStatus.performance}
              </Typography>
              <Typography variant="caption" color="text.secondary">Performance</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2">Storage Usage</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {systemStatus.storage.used}GB / {systemStatus.storage.total}GB
            </Typography>
          </Box>
          <Box sx={{ 
            height: 8, 
            borderRadius: 4, 
            backgroundColor: alpha(theme.palette.warning.main, 0.1),
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              height: '100%', 
              width: `${systemStatus.storage.percentage}%`, 
              backgroundColor: theme.palette.warning.main,
              borderRadius: 4,
              transition: 'width 0.3s ease'
            }} />
          </Box>
        </Box>

        <List sx={{ p: 0 }}>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Schedule />
            </ListItemIcon>
            <ListItemText
              primary="Uptime"
              secondary={systemStatus.uptime}
            />
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Backup />
            </ListItemIcon>
            <ListItemText
              primary="Last Backup"
              secondary={`${systemStatus.backup.lastBackup} (${systemStatus.backup.size})`}
            />
          </ListItem>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Update />
            </ListItemIcon>
            <ListItemText
              primary="Last Update"
              secondary={systemStatus.lastUpdate}
            />
          </ListItem>
        </List>

        <Button variant="outlined" fullWidth startIcon={<Update />} sx={{ mt: 2 }}>
          Check for Updates
        </Button>
      </CardContent>
    </Card>
  );
};

const AppearanceSettingsCard = () => {
  const theme = useTheme();
  const [themeMode, setThemeMode] = useState('light');
  const [compactMode, setCompactMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState(14);

  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Palette sx={{ mr: 1 }} />
          Appearance
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Theme
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label="Light"
              clickable
              color={themeMode === 'light' ? 'primary' : 'default'}
              onClick={() => setThemeMode('light')}
            />
            <Chip
              label="Dark"
              clickable
              color={themeMode === 'dark' ? 'primary' : 'default'}
              onClick={() => setThemeMode('dark')}
            />
            <Chip
              label="Auto"
              clickable
              color={themeMode === 'auto' ? 'primary' : 'default'}
              onClick={() => setThemeMode('auto')}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Font Size: {fontSize}px
          </Typography>
          <Slider
            value={fontSize}
            onChange={(e, newValue) => setFontSize(newValue as number)}
            min={12}
            max={18}
            step={1}
            marks
            valueLabelDisplay="auto"
          />
        </Box>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            label="Language"
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="de">German</MenuItem>
            <MenuItem value="zh">Chinese</MenuItem>
            <MenuItem value="ja">Japanese</MenuItem>
          </Select>
        </FormControl>

        <List sx={{ p: 0 }}>
          <ListItem sx={{ px: 0 }}>
            <ListItemText
              primary="Compact Mode"
              secondary="Show more content in less space"
            />
            <Switch
              checked={compactMode}
              onChange={(e) => setCompactMode(e.target.checked)}
            />
          </ListItem>
        </List>

        <Button variant="contained" fullWidth startIcon={<Save />} sx={{ mt: 2 }}>
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

const DataPrivacyCard = () => {
  const theme = useTheme();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const privacySettings = [
    { 
      title: 'Data Collection', 
      description: 'Allow usage analytics to improve the service',
      enabled: true,
      icon: <DataUsage />
    },
    { 
      title: 'Location Tracking', 
      description: 'Track your location for better workspace recommendations',
      enabled: false,
      icon: <Storage />
    },
    { 
      title: 'Third-party Sharing', 
      description: 'Share anonymized data with partners',
      enabled: false,
      icon: <CloudDownload />
    }
  ];

  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Security sx={{ mr: 1 }} />
          Security & Privacy
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Key />}
            onClick={() => setShowPasswordDialog(true)}
            sx={{ mb: 2 }}
          >
            Change Password
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Lock />}
            sx={{ mb: 2 }}
          >
            Enable Two-Factor Authentication
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Badge />}
          >
            Manage Badge Access
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Privacy Settings
        </Typography>

        <List sx={{ p: 0 }}>
          {privacySettings.map((setting, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemIcon>
                {setting.icon}
              </ListItemIcon>
              <ListItemText
                primary={setting.title}
                secondary={setting.description}
              />
              <Switch
                checked={setting.enabled}
                onChange={() => {}}
              />
            </ListItem>
          ))}
        </List>

        <Alert severity="info" sx={{ mt: 2 }}>
          Your data is encrypted and stored securely. We never share personal information without your consent.
        </Alert>

        <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Current Password"
                type={showPassword ? 'text' : 'password'}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
              <TextField
                fullWidth
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showPassword ? 'text' : 'password'}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
            <Button variant="contained">Change Password</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default function SettingsPage() {
  const theme = useTheme();
  const [profileData, setProfileData] = useState({
    displayName: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    badgeId: 'BADGE001',
    phone: '+1 (555) 123-4567'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    bookingReminders: true,
    iaqAlerts: true,
    systemUpdates: false
  });

  const handleProfileSave = () => {
    // Save profile logic here
    console.log('Saving profile:', profileData);
  };

  return (
    <PageContainer
      title="Settings"
      description="Manage your preferences and system configuration"
    >
      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 1 }} />
              Profile Settings
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 700
                  }}
                >
                  JD
                </Box>
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'white',
                    boxShadow: 1,
                    '&:hover': { backgroundColor: 'grey.100' }
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Display Name"
                  value={profileData.displayName}
                  onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  variant="outlined"
                  size="small"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  value={profileData.department}
                  onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Badge ID"
                  value={profileData.badgeId}
                  onChange={(e) => setProfileData({...profileData, badgeId: e.target.value})}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  startIcon={<Save />}
                  onClick={handleProfileSave}
                  fullWidth
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Notifications sx={{ mr: 1 }} />
              Notification Preferences
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Notification Methods
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  icon={<Email />}
                  label="Email"
                  color={notifications.email ? 'primary' : 'default'}
                  clickable
                  onClick={() => setNotifications({...notifications, email: !notifications.email})}
                />
                <Chip
                  icon={<Notifications />}
                  label="Push"
                  color={notifications.push ? 'primary' : 'default'}
                  clickable
                  onClick={() => setNotifications({...notifications, push: !notifications.push})}
                />
                <Chip
                  icon={<Sms />}
                  label="SMS"
                  color={notifications.sms ? 'primary' : 'default'}
                  clickable
                  onClick={() => setNotifications({...notifications, sms: !notifications.sms})}
                />
              </Box>
            </Box>

            <List sx={{ p: 0 }}>
              <ListItem sx={{ px: 0 }}>
                <ListItemText
                  primary="Booking Reminders"
                  secondary="Get reminded about upcoming bookings"
                />
                <Switch
                  checked={notifications.bookingReminders}
                  onChange={(e) => setNotifications({...notifications, bookingReminders: e.target.checked})}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemText
                  primary="IAQ Alerts"
                  secondary="Environmental quality notifications"
                />
                <Switch
                  checked={notifications.iaqAlerts}
                  onChange={(e) => setNotifications({...notifications, iaqAlerts: e.target.checked})}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemText
                  primary="System Updates"
                  secondary="Notifications about system maintenance"
                />
                <Switch
                  checked={notifications.systemUpdates}
                  onChange={(e) => setNotifications({...notifications, systemUpdates: e.target.checked})}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Appearance Settings */}
        <Grid item xs={12} md={6}>
          <AppearanceSettingsCard />
        </Grid>

        {/* Security & Privacy */}
        <Grid item xs={12} md={6}>
          <DataPrivacyCard />
        </Grid>

        {/* System Status */}
        <Grid item xs={12} md={6}>
          <SystemStatusCard />
        </Grid>

        {/* Help & Support */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Help sx={{ mr: 1 }} />
              Help & Support
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<QuestionAnswer />}
                  sx={{ mb: 2 }}
                >
                  User Guide
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Help />}
                  sx={{ mb: 2 }}
                >
                  FAQ
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<BugReport />}
                  sx={{ mb: 2 }}
                >
                  Report Issue
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Email />}
                  sx={{ mb: 2 }}
                >
                  Contact Support
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, p: 2, borderRadius: 2, backgroundColor: alpha(theme.palette.success.main, 0.1) }}>
              <Typography variant="subtitle2" color="success.main" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle sx={{ mr: 1, fontSize: 20 }} />
                System Health: All Good
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All systems are running smoothly. Last checked: 2 minutes ago
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
