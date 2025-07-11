import React, { useState } from 'react';
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
  Divider,
  useTheme,
  alpha,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Fab
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  FilterList,
  MoreVert,
  SupervisorAccount,
  PersonAdd,
  Groups,
  Badge,
  LocationOn,
  Schedule,
  CheckCircle,
  Error,
  Block,
  Refresh,
  Download,
  Settings,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import LoadingSpinner, { LoadingStats, LoadingCard, LoadingTable } from '@/components/LoadingSpinner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  department: string;
  badgeId: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  joinDate: string;
  avatar?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'admin',
    department: 'IT',
    badgeId: 'IT001',
    status: 'active',
    lastLogin: '2 hours ago',
    joinDate: '2023-01-15',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    role: 'manager',
    department: 'HR',
    badgeId: 'HR002',
    status: 'active',
    lastLogin: '1 day ago',
    joinDate: '2023-02-20',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'user',
    department: 'Marketing',
    badgeId: 'MK003',
    status: 'active',
    lastLogin: '3 hours ago',
    joinDate: '2023-03-10',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@company.com',
    role: 'user',
    department: 'Sales',
    badgeId: 'SL004',
    status: 'inactive',
    lastLogin: '1 week ago',
    joinDate: '2023-01-30',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@company.com',
    role: 'user',
    department: 'Engineering',
    badgeId: 'EN005',
    status: 'pending',
    lastLogin: 'Never',
    joinDate: '2023-12-01',
    avatar: '/api/placeholder/32/32'
  }
];

const UserCard = ({ user }: { user: User }) => {
  const theme = useTheme();
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return theme.palette.error.main;
      case 'manager': return theme.palette.warning.main;
      case 'user': return theme.palette.info.main;
      default: return theme.palette.grey[500];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return theme.palette.success.main;
      case 'inactive': return theme.palette.error.main;
      case 'pending': return theme.palette.warning.main;
      default: return theme.palette.grey[500];
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle />;
      case 'inactive': return <Block />;
      case 'pending': return <Schedule />;
      default: return <Error />;
    }
  };

  return (
    <Card elevation={0} sx={{
      p: 3,
      borderRadius: 4,
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid',
      borderColor: alpha(theme.palette.grey[300], 0.5),
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        borderColor: theme.palette.primary.main,
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Avatar 
          src={user.avatar} 
          sx={{ width: 48, height: 48, bgcolor: theme.palette.primary.main }}
        >
          {user.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <IconButton size="small">
          <MoreVert />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Chip
          label={user.role.toUpperCase()}
          size="small"
          sx={{
            backgroundColor: alpha(getRoleColor(user.role), 0.1),
            color: getRoleColor(user.role),
            fontWeight: 600,
            fontSize: 11
          }}
        />
        <Chip
          icon={getStatusIcon(user.status)}
          label={user.status.toUpperCase()}
          size="small"
          sx={{
            backgroundColor: alpha(getStatusColor(user.status), 0.1),
            color: getStatusColor(user.status),
            fontWeight: 600,
            fontSize: 11
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Badge sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Badge: {user.badgeId}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {user.department}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Last login: {user.lastLogin}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button size="small" startIcon={<Edit />} variant="outlined">
          Edit
        </Button>
        <Button size="small" startIcon={<Visibility />} variant="outlined">
          View
        </Button>
        <Button size="small" startIcon={<Delete />} variant="outlined" color="error">
          Delete
        </Button>
      </Box>
    </Card>
  );
};

export default function UserManagementPage() {
  const theme = useTheme();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Filter users based on search and filters
  React.useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, filterRole, filterStatus, users]);

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    pending: users.filter(u => u.status === 'pending').length,
    admins: users.filter(u => u.role === 'admin').length,
    managers: users.filter(u => u.role === 'manager').length
  };

  return (
    <Box sx={{
      minHeight: '100%',
      width: '100%',
      maxWidth: '100%',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
      position: 'relative',
      pb: 6,
      overflowX: 'hidden'
    }}>
      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        px: { xs: 2, md: 3 }, 
        pt: { xs: 4, md: 6 },
        width: '100%',
        overflowX: 'hidden'
      }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 1, letterSpacing: -1 }}>
              User Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage User Accounts, Permissions, and Access Control
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="outlined" 
              startIcon={refreshing ? <LoadingSpinner size={16} variant="glow" /> : <Refresh />} 
              sx={{ borderRadius: 2 }}
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<Download />} 
              sx={{ borderRadius: 2 }}
              onClick={() => console.log('Export users')}
            >
              Export
            </Button>
            <Button 
              variant="contained" 
              startIcon={<PersonAdd />} 
              sx={{ borderRadius: 2 }} 
              onClick={() => setDialogOpen(true)}
            >
              Add User
            </Button>
          </Box>
        </Box>

        {/* User Statistics */}
        {loading ? (
          <LoadingStats />
        ) : (
          <Grid container spacing={3} sx={{ mb: 4, width: '100%', mx: 0 }}>
            <Grid item xs={12} sm={6} md={3} sx={{ width: '100%', maxWidth: '100%' }}>
              <Card elevation={0} sx={{
                p: 3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                boxShadow: '0 2px 8px rgba(99,102,241,0.06)',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                minHeight: 140,
              }}>
                <Box sx={{
                  bgcolor: '#818cf8', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Groups sx={{ fontSize: 28 }} />
                </Box>
                <Typography variant="h5" fontWeight={800} color="#3730a3">{userStats.total}</Typography>
                <Typography fontWeight={600} color="#6366f1" fontSize={15}>Total Users</Typography>
                <Typography color="#818cf8" fontSize={13}>All registered users</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ width: '100%', maxWidth: '100%' }}>
              <Card elevation={0} sx={{
                p: 3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                boxShadow: '0 2px 8px rgba(34,197,94,0.06)',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                minHeight: 140,
              }}>
                <Box sx={{
                  bgcolor: '#22c55e', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CheckCircle sx={{ fontSize: 28 }} />
                </Box>
                <Typography variant="h5" fontWeight={800} color="#14532d">{userStats.active}</Typography>
                <Typography fontWeight={600} color="#16a34a" fontSize={15}>Active Users</Typography>
                <Typography color="#22c55e" fontSize={13}>Currently active</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ width: '100%', maxWidth: '100%' }}>
              <Card elevation={0} sx={{
                p: 3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
                boxShadow: '0 2px 8px rgba(239,68,68,0.06)',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                minHeight: 140,
              }}>
                <Box sx={{
                  bgcolor: '#ef4444', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <SupervisorAccount sx={{ fontSize: 28 }} />
                </Box>
                <Typography variant="h5" fontWeight={800} color="#7f1d1d">{userStats.admins}</Typography>
                <Typography fontWeight={600} color="#dc2626" fontSize={15}>Admin Users</Typography>
                <Typography color="#ef4444" fontSize={13}>System administrators</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={{ width: '100%', maxWidth: '100%' }}>
              <Card elevation={0} sx={{
                p: 3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                boxShadow: '0 2px 8px rgba(245,158,11,0.06)',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                minHeight: 140,
              }}>
                <Box sx={{
                  bgcolor: '#f59e0b', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Schedule sx={{ fontSize: 28 }} />
                </Box>
                <Typography variant="h5" fontWeight={800} color="#92400e">{userStats.pending}</Typography>
                <Typography fontWeight={600} color="#d97706" fontSize={15}>Pending Users</Typography>
                <Typography color="#f59e0b" fontSize={13}>Awaiting approval</Typography>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Filters and Search */}
        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search users..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{ minWidth: 200 }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Role</InputLabel>
            <Select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} label="Role">
              <MenuItem value="all">All Roles</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Status">
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={viewMode === 'cards' ? <Visibility /> : <VisibilityOff />}
            onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')}
            sx={{ borderRadius: 2 }}
          >
            {viewMode === 'cards' ? 'Table View' : 'Card View'}
          </Button>
        </Box>

        {/* Users Display */}
        {loading ? (
          <Box sx={{ my: 4 }}>
            <LoadingCard />
          </Box>
        ) : viewMode === 'cards' ? (
          <Grid container spacing={3} sx={{ width: '100%', mx: 0 }}>
            {filteredUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id} sx={{ width: '100%', maxWidth: '100%' }}>
                <UserCard user={user} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
                    <TableCell>User</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Login</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar src={user.avatar} sx={{ width: 32, height: 32 }}>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {user.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role.toUpperCase()}
                          size="small"
                          color={user.role === 'admin' ? 'error' : user.role === 'manager' ? 'warning' : 'info'}
                        />
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.status.toUpperCase()}
                          size="small"
                          color={user.status === 'active' ? 'success' : user.status === 'inactive' ? 'error' : 'warning'}
                        />
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small">
                            <Edit />
                          </IconButton>
                          <IconButton size="small">
                            <Visibility />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* Floating Action Button */}
        <Fab 
          color="primary" 
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={() => setDialogOpen(true)}
        >
          <Add />
        </Fab>

        {/* Add User Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField fullWidth label="Full Name" variant="outlined" />
              <TextField fullWidth label="Email Address" variant="outlined" type="email" />
              <TextField fullWidth label="Badge ID" variant="outlined" />
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select label="Role">
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select label="Department">
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label="Status">
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={() => {
                console.log('Adding new user...');
                setDialogOpen(false);
              }}
            >
              Add User
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}