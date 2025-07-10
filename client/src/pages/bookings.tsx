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
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  alpha,
  LinearProgress,
  Tab,
  Tabs,
  Badge,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Fade,
  Slide,
  Tooltip
} from "@mui/material";
import {
  CalendarToday,
  Schedule,
  Person,
  Room,
  CheckCircle,
  Cancel,
  Edit,
  Add,
  EventAvailable,
  EventBusy,
  AccessTime,
  People,
  LocationOn,
  Today,
  History,
  TrendingUp,
  Computer,
  Phone,
  Visibility,
  MoreVert,
  FilterList,
  Search,
  Refresh,
  Download,
  Star,
  StarBorder,
  NotificationsActive,
  Event,
  Business,
  Weekend,
  Update
} from "@mui/icons-material";
import BookingCalendar from "@/components/BookingCalendar";
import QuickBooking from "@/components/QuickBooking";
import UserSummary from "@/components/UserSummary";
import PageContainer from "@/components/PageContainer";
import InteractiveFloorPlan from "@/components/InteractiveFloorPlan";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Booking {
  id: string;
  title: string;
  room: string;
  date: string;
  time: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  attendees: number;
  organizer: string;
  type: 'meeting' | 'desk' | 'event';
  priority: 'high' | 'medium' | 'low';
  recurrence?: string;
  floor?: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    title: 'Team Standup',
    room: 'Meeting Room 1',
    date: '2024-01-15',
    time: '09:00 - 10:00',
    duration: '1 hour',
    status: 'confirmed',
    attendees: 8,
    organizer: 'John Doe',
    type: 'meeting',
    priority: 'high',
    floor: 'Floor 2'
  },
  {
    id: '2',
    title: 'Project Review',
    room: 'Conference Room A',
    date: '2024-01-15',
    time: '14:00 - 15:30',
    duration: '1.5 hours',
    status: 'pending',
    attendees: 12,
    organizer: 'Jane Smith',
    type: 'meeting',
    priority: 'medium',
    floor: 'Floor 3'
  },
  {
    id: '3',
    title: 'Desk Booking',
    room: 'Open Space - Desk 15',
    date: '2024-01-16',
    time: '08:00 - 17:00',
    duration: '8 hours',
    status: 'confirmed',
    attendees: 1,
    organizer: 'Mike Johnson',
    type: 'desk',
    priority: 'low',
    floor: 'Floor 2'
  },
  {
    id: '4',
    title: 'Client Presentation',
    room: 'Executive Conference',
    date: '2024-01-17',
    time: '10:00 - 11:30',
    duration: '1.5 hours',
    status: 'confirmed',
    attendees: 6,
    organizer: 'Sarah Wilson',
    type: 'meeting',
    priority: 'high',
    floor: 'Floor 4'
  },
  {
    id: '5',
    title: 'Training Session',
    room: 'Training Room Alpha',
    date: '2024-01-18',
    time: '13:00 - 16:00',
    duration: '3 hours',
    status: 'cancelled',
    attendees: 15,
    organizer: 'David Brown',
    type: 'event',
    priority: 'medium',
    floor: 'Floor 1'
  },
  {
    id: '6',
    title: 'Phone Call - Client',
    room: 'Phone Booth 3',
    date: '2024-01-15',
    time: '11:00 - 11:30',
    duration: '30 mins',
    status: 'confirmed',
    attendees: 1,
    organizer: 'Alex Chen',
    type: 'desk',
    priority: 'medium',
    floor: 'Floor 2'
  },
  {
    id: '7',
    title: 'Weekly Sync',
    room: 'Meeting Room 3',
    date: '2024-01-19',
    time: '15:00 - 16:00',
    duration: '1 hour',
    status: 'confirmed',
    attendees: 5,
    organizer: 'Emma Davis',
    type: 'meeting',
    priority: 'high',
    recurrence: 'Weekly',
    floor: 'Floor 2'
  }
];

export default function BookingsPage() {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'floor'>('calendar');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const stats = {
    totalBookings: mockBookings.length,
    confirmed: mockBookings.filter(b => b.status === 'confirmed').length,
    pending: mockBookings.filter(b => b.status === 'pending').length,
    cancelled: mockBookings.filter(b => b.status === 'cancelled').length,
    utilizationRate: 78,
    todayBookings: mockBookings.filter(b => b.date === '2024-01-15').length,
    activeNow: mockBookings.filter(b => b.status === 'confirmed').length,
    highPriority: mockBookings.filter(b => b.priority === 'high').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return theme.palette.success.main;
      case 'pending': return theme.palette.warning.main;
      case 'cancelled': return theme.palette.error.main;
      default: return theme.palette.grey[500];
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <People />;
      case 'desk': return <Computer />;
      case 'event': return <EventAvailable />;
      default: return <Schedule />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return theme.palette.error.main;
      case 'medium': return theme.palette.warning.main;
      case 'low': return theme.palette.info.main;
      default: return theme.palette.grey[500];
    }
  };

  const filteredBookings = mockBookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSearch = booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <PageContainer
      title="Workspace Booking"
      description="Manage your workspace reservations, check availability, and book meeting rooms or desks"
    >
      <Box sx={{ mb: 3 }}>
        {/* Header Section with Tabs */}
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
                minWidth: 120
              }
            }}
          >
            <Tab icon={<Today />} label="Today" iconPosition="start" />
            <Tab icon={<CalendarToday />} label="Calendar" iconPosition="start" />
            <Tab icon={<Computer />} label="Floor Plan" iconPosition="start" />
            <Tab icon={<Business />} label="All Bookings" iconPosition="start" />
          </Tabs>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={refreshing ? <LoadingSpinner size={16} variant="modern" /> : <Refresh />}
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{ borderRadius: 2 }}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ 
                borderRadius: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
              }}
            >
              New Booking
            </Button>
          </Box>
        </Box>

        {/* Stats Overview Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3} md={3}>
            <Card elevation={0} sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: 'white',
              borderRadius: 3
            }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                      {stats.todayBookings}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Today's Bookings
                    </Typography>
                  </Box>
                  <Today sx={{ fontSize: 32, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} sm={3} md={3}>
            <Card elevation={0} sx={{
              background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
              color: 'white',
              borderRadius: 3
            }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                      {stats.activeNow}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Active Now
                    </Typography>
                  </Box>
                  <CheckCircle sx={{ fontSize: 32, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} sm={3} md={3}>
            <Card elevation={0} sx={{
              background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
              color: 'white',
              borderRadius: 3
            }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                      {stats.pending}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Pending
                    </Typography>
                  </Box>
                  <AccessTime sx={{ fontSize: 32, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} sm={3} md={3}>
            <Card elevation={0} sx={{
              background: `linear-gradient(135deg, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
              color: 'white',
              borderRadius: 3
            }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                      {stats.utilizationRate}%
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Utilization
                    </Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 32, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Tab Content */}
      {currentTab === 0 && (
        // Today's Schedule
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card elevation={0} sx={{ borderRadius: 3, minHeight: 500 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight={700}>
                    Today's Schedule
                  </Typography>
                  <Badge badgeContent={stats.todayBookings} color="primary">
                    <Event color="action" />
                  </Badge>
                </Box>

                <List sx={{ p: 0 }}>
                  {mockBookings.filter(b => b.date === '2024-01-15').map((booking, index) => (
                    <ListItem 
                      key={booking.id} 
                      sx={{ 
                        px: 0, 
                        py: 2,
                        borderBottom: index < stats.todayBookings - 1 ? `1px solid ${theme.palette.divider}` : 'none'
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{ 
                            backgroundColor: alpha(getStatusColor(booking.status), 0.1),
                            color: getStatusColor(booking.status),
                            width: 48,
                            height: 48
                          }}
                        >
                          {getTypeIcon(booking.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" fontWeight={600}>
                              {booking.title}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Chip 
                                size="small"
                                label={booking.priority}
                                sx={{ 
                                  backgroundColor: alpha(getPriorityColor(booking.priority), 0.1),
                                  color: getPriorityColor(booking.priority),
                                  fontWeight: 600
                                }}
                              />
                              <Chip 
                                label={booking.status}
                                size="small"
                                color={booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'error'}
                                variant="outlined"
                              />
                            </Box>
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <LocationOn sx={{ fontSize: 16 }} />
                              {booking.room} • {booking.floor}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <AccessTime sx={{ fontSize: 16 }} />
                              {booking.time} ({booking.duration})
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Person sx={{ fontSize: 16 }} />
                              {booking.attendees} attendees • {booking.organizer}
                            </Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Tooltip title="View Details">
                          <IconButton size="small" color="primary">
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Booking">
                          <IconButton size="small" color="primary">
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card elevation={0} sx={{ borderRadius: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                      Quick Actions
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Button 
                        variant="outlined" 
                        startIcon={<Room />} 
                        fullWidth 
                        sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
                      >
                        Book Meeting Room
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<Computer />} 
                        fullWidth 
                        sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
                      >
                        Reserve Desk
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<Phone />} 
                        fullWidth 
                        sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
                      >
                        Book Phone Booth
                      </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<CalendarToday />} 
                        fullWidth 
                        sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
                      >
                        Schedule Recurring
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card elevation={0} sx={{ borderRadius: 3 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                      Utilization Stats
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">Overall Utilization</Typography>
                        <Typography variant="body2" fontWeight={600} color="primary.main">{stats.utilizationRate}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={stats.utilizationRate} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                          }
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                      <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: alpha(theme.palette.success.main, 0.1) }}>
                        <Typography variant="h6" fontWeight={700} color="success.main">{stats.confirmed}</Typography>
                        <Typography variant="caption" color="text.secondary">Confirmed</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', p: 1, borderRadius: 2, bgcolor: alpha(theme.palette.error.main, 0.1) }}>
                        <Typography variant="h6" fontWeight={700} color="error.main">{stats.highPriority}</Typography>
                        <Typography variant="caption" color="text.secondary">High Priority</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {currentTab === 1 && (
        // Calendar View
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card elevation={0} sx={{ borderRadius: 3, minHeight: 600 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  Booking Calendar
                </Typography>
                <BookingCalendar />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card elevation={0} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  Quick Booking
                </Typography>
                <QuickBooking />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {currentTab === 2 && (
        // Floor Plan View
        <Card elevation={0} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
              Interactive Floor Plan - Book Available Seats
            </Typography>
            <InteractiveFloorPlan />
          </CardContent>
        </Card>
      )}

      {currentTab === 3 && (
        // All Bookings List
        <Card elevation={0} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={700}>
                All Bookings ({filteredBookings.length})
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  size="small"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                  sx={{ width: 200 }}
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    label="Status"
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="confirmed">Confirmed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Booking</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date & Time</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Attendees</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            sx={{ 
                              backgroundColor: alpha(getStatusColor(booking.status), 0.1),
                              color: getStatusColor(booking.status),
                              width: 32,
                              height: 32
                            }}
                          >
                            {getTypeIcon(booking.type)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {booking.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {booking.organizer}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {booking.date}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {booking.time}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {booking.room}
                        </Typography>
                        {booking.floor && (
                          <Typography variant="caption" color="text.secondary">
                            {booking.floor}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={booking.status}
                          size="small"
                          color={booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'error'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          size="small"
                          label={booking.priority}
                          sx={{ 
                            backgroundColor: alpha(getPriorityColor(booking.priority), 0.1),
                            color: getPriorityColor(booking.priority),
                            fontWeight: 600
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <People sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {booking.attendees}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="View">
                            <IconButton size="small" color="primary">
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" color="primary">
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="More">
                            <IconButton size="small">
                              <MoreVert />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </PageContainer>
  );
}