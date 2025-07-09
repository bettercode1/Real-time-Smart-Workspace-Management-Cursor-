import React, { useState } from "react";
import {
  Box,
  Typography,
  Card, 
  List,
  ListItem,
  ListItemText, 
  ListItemIcon,
  Chip,
  IconButton,
  Button,
  useTheme,
  alpha
} from "@mui/material";
import {
  Notifications,
  Warning,
  Info, 
  CheckCircle,
  Error,
  MoreVert,
  AccessTime
} from "@mui/icons-material";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will begin in 30 minutes. Please save your work.',
    type: 'info',
    timestamp: '2 minutes ago',
    read: false,
    priority: 'medium'
  },
  {
    id: '2',
    title: 'High CO₂ Levels',
    message: 'CO₂ levels in Meeting Room 1 have exceeded 800 ppm. Consider ventilation.',
    type: 'warning',
    timestamp: '5 minutes ago',
    read: false,
    priority: 'high'
  },
  {
    id: '3',
    title: 'Booking Confirmed',
    message: 'Your booking for Desk A-15 has been confirmed for tomorrow.',
    type: 'success',
    timestamp: '10 minutes ago',
    read: true,
    priority: 'low'
  },
  {
    id: '4',
    title: 'Device Offline',
    message: 'Temperature sensor in Kitchen area is not responding.',
    type: 'error',
    timestamp: '15 minutes ago',
    read: false,
    priority: 'high'
  },
  {
    id: '5',
    title: 'Weekly Report',
    message: 'Your weekly workspace utilization report is ready.',
    type: 'info',
    timestamp: '1 hour ago',
    read: true,
    priority: 'low'
  }
];

const NotificationCenter = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info': return <Info />;
      case 'warning': return <Warning />;
      case 'error': return <Error />;
      case 'success': return <CheckCircle />;
      default: return <Notifications />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'info': return theme.palette.info.main;
      case 'warning': return theme.palette.warning.main;
      case 'error': return theme.palette.error.main;
      case 'success': return theme.palette.success.main;
      default: return theme.palette.primary.main;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return theme.palette.error.main;
      case 'medium': return theme.palette.warning.main;
      case 'low': return theme.palette.success.main;
      default: return theme.palette.grey[500];
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      <Card elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Notifications
          </Typography>
        {unreadCount > 0 && (
          <Chip 
              label={unreadCount}
            size="small" 
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 20,
              }}
          />
        )}
        </Box>
        <Button
          size="small"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: '0.75rem',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
            }
          }}
        >
          Mark all read
        </Button>
      </Box>

      <List sx={{ p: 0 }}>
        {notifications.slice(0, 5).map((notification) => (
            <ListItem
            key={notification.id}
              sx={{
              p: 2,
              mb: 1,
                borderRadius: 2,
              background: notification.read 
                ? 'transparent'
                : alpha(theme.palette.primary.main, 0.04),
              border: `1px solid ${notification.read 
                ? theme.palette.mode === 'light' ? '#e2e8f0' : '#334155'
                : alpha(theme.palette.primary.main, 0.1)}`,
              transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                background: alpha(getNotificationColor(notification.type), 0.04),
                borderColor: alpha(getNotificationColor(notification.type), 0.2),
                transform: 'translateX(4px)',
                }
              }}
            onClick={() => markAsRead(notification.id)}
            >
            <ListItemIcon sx={{ minWidth: 40 }}>
                <Box
                  sx={{
                  p: 1,
                  borderRadius: 1.5,
                  background: alpha(getNotificationColor(notification.type), 0.1),
                  color: getNotificationColor(notification.type),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  width: 32,
                  height: 32
                }}
              >
                {getNotificationIcon(notification.type)}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography 
                    variant="subtitle2" 
                    fontWeight={600} 
                    color="text.primary"
                    sx={{ 
                      opacity: notification.read ? 0.7 : 1,
                      flex: 1
                    }}
                  >
                      {notification.title}
                    </Typography>
                  <Chip
                    label={notification.priority}
                    size="small"
                        sx={{ 
                      backgroundColor: alpha(getPriorityColor(notification.priority), 0.1),
                      color: getPriorityColor(notification.priority),
                      fontWeight: 600,
                      fontSize: '0.6rem',
                      height: 16,
                      textTransform: 'capitalize'
                        }} 
                      />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography 
                    variant="body2" 
                      color="text.secondary"
                    sx={{ 
                      opacity: notification.read ? 0.7 : 1,
                      mb: 1
                    }}
                    >
                      {notification.message}
                    </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime sx={{ fontSize: 14, color: 'text.disabled' }} />
                      <Typography variant="caption" color="text.disabled">
                        {notification.timestamp}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
              <IconButton
                size="small"
                sx={{ 
                color: 'text.disabled',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main
                }
                }}
              >
                <MoreVert sx={{ fontSize: 16 }} />
              </IconButton>
          </ListItem>
        ))}
      </List>

      {notifications.length > 5 && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: alpha(theme.palette.primary.main, 0.3),
              color: theme.palette.primary.main,
              fontSize: '0.75rem',
              textTransform: 'none',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.04),
              }
            }}
          >
            View all notifications
          </Button>
        </Box>
      )}
    </Card>
    </Box>
  );
};

export default NotificationCenter; 