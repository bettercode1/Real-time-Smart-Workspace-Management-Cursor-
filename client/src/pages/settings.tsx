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
  alpha,
  Snackbar,
  FormControlLabel
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
  QuestionAnswer,
  DarkMode,
  LightMode,
  Translate,
  Download,
  Upload,
  DeleteForever,
  ContactSupport
} from "@mui/icons-material";
import PageContainer from '@/components/PageContainer';
import { useSettings } from '@/contexts/SettingsContext';

const translations = {
  en: {
    title: "Settings",
    subtitle: "Manage your preferences and account settings",
    profile: "Profile Settings",
    notifications: "Notification Preferences", 
    security: "Security & Privacy",
    appearance: "Appearance & Language",
    system: "System Information",
    help: "Help & Support",
    save: "Save Changes",
    cancel: "Cancel",
    edit: "Edit",
    name: "Full Name",
    email: "Email Address", 
    badgeId: "Badge ID",
    department: "Department",
    darkMode: "Dark Mode",
    language: "Language",
    english: "English",
    arabic: "Arabic",
    emailNotifications: "Email Notifications",
    smsNotifications: "SMS Notifications", 
    pushNotifications: "Push Notifications",
    soundNotifications: "Sound Notifications",
    vibrationNotifications: "Vibration",
    twoFactor: "Two-Factor Authentication",
    changePassword: "Change Password",
    exportData: "Export Data",
    deleteAccount: "Delete Account",
    userGuide: "User Guide",
    faq: "FAQ",
    reportIssue: "Report Issue",
    contactSupport: "Contact Support",
    version: "Version",
    uptime: "Uptime", 
    lastUpdate: "Last Update",
    storage: "Storage",
    performance: "Performance",
    backup: "Backup"
  },
  ar: {
    title: "الإعدادات",
    subtitle: "إدارة تفضيلاتك وإعدادات الحساب",
    profile: "إعدادات الملف الشخصي",
    notifications: "تفضيلات الإشعارات",
    security: "الأمان والخصوصية", 
    appearance: "المظهر واللغة",
    system: "معلومات النظام",
    help: "المساعدة والدعم",
    save: "حفظ التغييرات",
    cancel: "إلغاء",
    edit: "تعديل",
    name: "الاسم الكامل",
    email: "عنوان البريد الإلكتروني",
    badgeId: "رقم الشارة", 
    department: "القسم",
    darkMode: "الوضع المظلم",
    language: "اللغة",
    english: "الإنجليزية",
    arabic: "العربية",
    emailNotifications: "إشعارات البريد الإلكتروني",
    smsNotifications: "إشعارات الرسائل النصية",
    pushNotifications: "الإشعارات المدفوعة",
    soundNotifications: "إشعارات الصوت",
    vibrationNotifications: "الاهتزاز",
    twoFactor: "المصادقة الثنائية",
    changePassword: "تغيير كلمة المرور",
    exportData: "تصدير البيانات",
    deleteAccount: "حذف الحساب",
    userGuide: "دليل المستخدم",
    faq: "الأسئلة الشائعة",
    reportIssue: "الإبلاغ عن مشكلة",
    contactSupport: "اتصل بالدعم",
    version: "النسخة",
    uptime: "وقت التشغيل",
    lastUpdate: "آخر تحديث",
    storage: "التخزين",
    performance: "الأداء",
    backup: "النسخ الاحتياطي"
  }
};

export default function SettingsPage() {
  const theme = useTheme();
  const {
    themeMode, 
    toggleTheme, 
    language, 
    setLanguage, 
    notifications,
    updateNotificationSetting,
    twoFactorEnabled,
    setTwoFactorEnabled,
    profile,
    updateProfile
  } = useSettings();

  const [editingProfile, setEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const t = translations[language];

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleProfileSave = () => {
    updateProfile(tempProfile);
    setEditingProfile(false);
    showSnackbar('Profile updated successfully!');
  };

  const handleExportData = () => {
    const data = {
      profile,
      settings: { themeMode, language, notifications, twoFactorEnabled },
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartspace-settings-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportDialog(false);
    showSnackbar('Settings exported successfully!');
  };

  const handleChangePassword = () => {
    setShowPasswordDialog(false);
    showSnackbar('Password change email sent!');
  };

  const systemStatus = {
    version: 'v2.1.0',
    uptime: '15 days, 8 hours',
    lastUpdate: '2024-01-10',
    storage: { used: 2.4, total: 10, percentage: 24 },
    performance: 'Excellent',
    backup: { lastBackup: '2024-01-15 03:00', status: 'Success', size: '1.2 GB' }
  };

  return (
    <PageContainer title={t.title} description={t.subtitle}>
      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ mr: 1 }} />
                  {t.profile}
                </Typography>
                <IconButton onClick={() => setEditingProfile(!editingProfile)} color="primary">
                  <Edit />
                </IconButton>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t.name}
                    value={editingProfile ? tempProfile.name : profile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    disabled={!editingProfile}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t.email}
                    value={editingProfile ? tempProfile.email : profile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    disabled={!editingProfile}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={t.badgeId}
                    value={editingProfile ? tempProfile.badgeId : profile.badgeId}
                    onChange={(e) => setTempProfile({ ...tempProfile, badgeId: e.target.value })}
                    disabled={!editingProfile}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={t.department}
                    value={editingProfile ? tempProfile.department : profile.department}
                    onChange={(e) => setTempProfile({ ...tempProfile, department: e.target.value })}
                    disabled={!editingProfile}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              {editingProfile && (
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button variant="contained" onClick={handleProfileSave} startIcon={<Save />}>
                    {t.save}
                  </Button>
                  <Button variant="outlined" onClick={() => setEditingProfile(false)}>
                    {t.cancel}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Appearance & Language */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Palette sx={{ mr: 1 }} />
                {t.appearance}
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    {themeMode === 'dark' ? <DarkMode /> : <LightMode />}
                  </ListItemIcon>
                  <ListItemText primary={t.darkMode} />
                  <Switch
                    checked={themeMode === 'dark'}
                    onChange={toggleTheme}
                    color="primary"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Translate />
                  </ListItemIcon>
                  <ListItemText primary={t.language} />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
                      displayEmpty
                    >
                      <MenuItem value="en">{t.english}</MenuItem>
                      <MenuItem value="ar">{t.arabic}</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Notifications sx={{ mr: 1 }} />
                {t.notifications}
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon><Email /></ListItemIcon>
                  <ListItemText primary={t.emailNotifications} />
                  <Switch
                    checked={notifications.email}
                    onChange={(e) => updateNotificationSetting('email', e.target.checked)}
                    color="primary"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon><Sms /></ListItemIcon>
                  <ListItemText primary={t.smsNotifications} />
                  <Switch
                    checked={notifications.sms}
                    onChange={(e) => updateNotificationSetting('sms', e.target.checked)}
                    color="primary"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon><Notifications /></ListItemIcon>
                  <ListItemText primary={t.pushNotifications} />
                  <Switch
                    checked={notifications.push}
                    onChange={(e) => updateNotificationSetting('push', e.target.checked)}
                    color="primary"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon><VolumeUp /></ListItemIcon>
                  <ListItemText primary={t.soundNotifications} />
                  <Switch
                    checked={notifications.sound}
                    onChange={(e) => updateNotificationSetting('sound', e.target.checked)}
                    color="primary"
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon><Vibration /></ListItemIcon>
                  <ListItemText primary={t.vibrationNotifications} />
                  <Switch
                    checked={notifications.vibration}
                    onChange={(e) => updateNotificationSetting('vibration', e.target.checked)}
                    color="primary"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Security sx={{ mr: 1 }} />
                {t.security}
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon><Lock /></ListItemIcon>
                  <ListItemText primary={t.twoFactor} />
                  <Switch
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    color="primary"
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Key />}
                    onClick={() => setShowPasswordDialog(true)}
                  >
                    {t.changePassword}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Download />}
                    onClick={() => setShowExportDialog(true)}
                  >
                    {t.exportData}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteForever />}
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    {t.deleteAccount}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* System Status */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Monitor sx={{ mr: 1 }} />
                {t.system}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                    <Typography variant="h6" fontWeight={700} color="primary.main">
                      {systemStatus.version}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">{t.version}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.success.main, 0.1) }}>
                    <Typography variant="h6" fontWeight={700} color="success.main">
                      {systemStatus.performance}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">{t.performance}</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                  {t.storage}: {systemStatus.storage.used}GB / {systemStatus.storage.total}GB
                </Typography>
                <Box sx={{ 
                  width: '100%', 
                  height: 8, 
                  backgroundColor: alpha(theme.palette.grey[500], 0.1), 
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    width: `${systemStatus.storage.percentage}%`, 
                    height: '100%', 
                    backgroundColor: theme.palette.primary.main,
                    transition: 'width 0.3s ease'
                  }} />
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary">
                {t.uptime}: {systemStatus.uptime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t.lastUpdate}: {systemStatus.lastUpdate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Help & Support */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Help sx={{ mr: 1 }} />
                {t.help}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<QuestionAnswer />}
                    onClick={() => showSnackbar('Opening user guide...')}
                  >
                    {t.userGuide}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Help />}
                    onClick={() => showSnackbar('Opening FAQ...')}
                  >
                    {t.faq}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<BugReport />}
                    onClick={() => showSnackbar('Opening issue reporter...')}
                  >
                    {t.reportIssue}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ContactSupport />}
                    onClick={() => showSnackbar('Contacting support...')}
                  >
                    {t.contactSupport}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialogs */}
      <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            We'll send you an email with instructions to reset your password.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handleChangePassword} variant="contained">Send Email</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showExportDialog} onClose={() => setShowExportDialog(false)}>
        <DialogTitle>Export Settings</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            This will download a JSON file containing your profile and settings.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowExportDialog(false)}>Cancel</Button>
          <Button onClick={handleExportData} variant="contained">Export</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            This action cannot be undone. All your data will be permanently deleted.
          </Alert>
          <Typography variant="body2">
            Are you sure you want to delete your account?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              setShowDeleteDialog(false);
              showSnackbar('Account deletion request submitted', 'error');
            }} 
            variant="contained" 
            color="error"
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}