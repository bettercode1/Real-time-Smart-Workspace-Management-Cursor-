import React from "react";
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
  CardContent
} from "@mui/material";
import {
  Person,
  Notifications,
  Security,
  Monitor,
  Language,
  Help,
  Save
} from "@mui/icons-material";
import PageContainer from '@/components/PageContainer';

export default function SettingsPage() {
  return (
    <PageContainer
      title="Settings"
      description="Manage your preferences and system configuration"
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(99,102,241,0.06)', background: 'background.paper' }}>
            <Typography variant="h6" fontWeight={600} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 1 }} />
              Profile Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Display Name"
                  defaultValue="John Doe"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue="john.doe@company.com"
                  variant="outlined"
                  size="small"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" startIcon={<Save />}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(99,102,241,0.06)', background: 'background.paper' }}>
            <Typography variant="h6" fontWeight={600} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Notifications sx={{ mr: 1 }} />
              Notification Preferences
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Email Notifications"
                  secondary="Receive alerts via email"
                />
                <Switch defaultChecked />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Booking Reminders"
                  secondary="Get reminded about upcoming bookings"
                />
                <Switch defaultChecked />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="IAQ Alerts"
                  secondary="Environmental quality notifications"
                />
                <Switch defaultChecked />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(99,102,241,0.06)', background: 'background.paper' }}>
            <Typography variant="h6" fontWeight={600} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Monitor sx={{ mr: 1 }} />
              Display Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Dark Mode"
                  secondary="Switch to dark theme"
                />
                <Switch />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Compact View"
                  secondary="Show more information in less space"
                />
                <Switch />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Auto Refresh"
                  secondary="Automatically update data"
                />
                <Switch defaultChecked />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(99,102,241,0.06)', background: 'background.paper' }}>
            <Typography variant="h6" fontWeight={600} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Security sx={{ mr: 1 }} />
              Security & Privacy
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Two-Factor Authentication"
                  secondary="Add an extra layer of security"
                />
                <Button variant="outlined" size="small">
                  Enable
                </Button>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Change Password"
                  secondary="Update your login password"
                />
                <Button variant="outlined" size="small">
                  Change
                </Button>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Session Timeout"
                  secondary="Auto logout after inactivity"
                />
                <Switch defaultChecked />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        {/* Help & Support */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(99,102,241,0.06)', background: 'background.paper' }}>
            <Typography variant="h6" fontWeight={600} mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Help sx={{ mr: 1 }} />
              Help & Support
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      User Guide
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      Learn how to use all features
                    </Typography>
                    <Button variant="outlined">
                      View Guide
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      FAQ
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      Frequently asked questions
                    </Typography>
                    <Button variant="outlined">
                      View FAQ
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      Contact Support
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      Get help from our team
                    </Typography>
                    <Button variant="outlined">
                      Contact
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
