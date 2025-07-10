import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
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
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Switch,
  FormControlLabel,
  Alert,
  useTheme,
  alpha,
  Divider,
  Badge
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  PersonAdd,
  Search,
  FilterList,
  MoreVert,
  SupervisorAccount,
  Person,
  Block,
  CheckCircle,
  Email,
  Phone,
  LocationOn,
  Badge as BadgeIcon,
  Security,
  Save,
  Cancel,
  Visibility,
  VisibilityOff,
  Group
} from '@mui/icons-material';
import PageContainer from '@/components/PageContainer';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  department: string;
  badgeId: string;
  phone: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  permissions: string[];
  avatar?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin',
    department: 'IT',
    badgeId: 'BADGE001',
    phone: '+1 (555) 123-4567',
    isActive: true,
    lastLogin: '2 hours ago',
    createdAt: '2023-01-15',
    permissions: ['read', 'write', 'delete', 'manage_users', 'system_admin'],
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=1976d2&color=fff'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'manager',
    department: 'Operations',
    badgeId: 'BADGE002',
    phone: '+1 (555) 234-5678',
    isActive: true,
    lastLogin: '30 minutes ago',
    createdAt: '2023-02-20',
    permissions: ['read', 'write', 'manage_bookings'],
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=7b1fa2&color=fff'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'user',
    department: 'Sales',
    badgeId: 'BADGE003',
    phone: '+1 (555) 345-6789',
    isActive: true,
    lastLogin: '1 day ago',
    createdAt: '2023-03-10',
    permissions: ['read', 'write'],
    avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=388e3c&color=fff'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'user',
    department: 'Marketing',
    badgeId: 'BADGE004',
    phone: '+1 (555) 456-7890',
    isActive: false,
    lastLogin: '1 week ago',
    createdAt: '2023-04-05',
    permissions: ['read'],
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=f57c00&color=fff'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@company.com',
    role: 'user',
    department: 'Finance',
    badgeId: 'BADGE005',
    phone: '+1 (555) 567-8901',
    isActive: true,
    lastLogin: '3 hours ago',
    createdAt: '2023-05-12',
    permissions: ['read', 'write'],
    avatar: 'https://ui-avatars.com/api/?name=David+Brown&background=d32f2f&color=fff'
  }
];

const UserFormDialog = ({ 
  open, 
  onClose, 
  user, 
  onSave 
}: { 
  open: boolean; 
  onClose: () => void; 
  user?: User; 
  onSave: (user: User) => void; 
}) => {
  const [formData, setFormData] = useState<Partial<User>>(user || {
    name: '',
    email: '',
    role: 'user',
    department: '',
    badgeId: '',
    phone: '',
    isActive: true,
    permissions: ['read']
  });

  const handleSave = () => {
    if (formData.name && formData.email && formData.badgeId) {
      onSave({
        ...formData,
        id: user?.id || Date.now().toString(),
        lastLogin: user?.lastLogin || 'Never',
        createdAt: user?.createdAt || new Date().toISOString().split('T')[0]
      } as User);
      onClose();
    }
  };

  const permissionOptions = [
    { value: 'read', label: 'Read Access' },
    { value: 'write', label: 'Write Access' },
    { value: 'delete', label: 'Delete Access' },
    { value: 'manage_bookings', label: 'Manage Bookings' },
    { value: 'manage_users', label: 'Manage Users' },
    { value: 'system_admin', label: 'System Admin' }
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {user ? 'Edit User' : 'Add New User'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={formData.role}
                  label="Role"
                  onChange={(e) => setFormData({...formData, role: e.target.value as User['role']})}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Department"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Badge ID"
                value={formData.badgeId}
                onChange={(e) => setFormData({...formData, badgeId: e.target.value})}
                required
                placeholder="BADGE001"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+1 (555) 123-4567"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  />
                }
                label="Active User"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Permissions
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {permissionOptions.map((permission) => (
                  <Chip
                    key={permission.value}
                    label={permission.label}
                    clickable
                    color={formData.permissions?.includes(permission.value) ? 'primary' : 'default'}
                    onClick={() => {
                      const currentPermissions = formData.permissions || [];
                      const newPermissions = currentPermissions.includes(permission.value)
                        ? currentPermissions.filter(p => p !== permission.value)
                        : [...currentPermissions, permission.value];
                      setFormData({...formData, permissions: newPermissions});
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<Cancel />}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" startIcon={<Save />}>
          Save User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const UserCard = ({ user, onEdit, onDelete }: { user: User; onEdit: () => void; onDelete: () => void }) => {
  const theme = useTheme();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return theme.palette.error.main;
      case 'manager': return theme.palette.warning.main;
      case 'user': return theme.palette.info.main;
      default: return theme.palette.grey[500];
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <SupervisorAccount />;
      case 'manager': return <Security />;
      case 'user': return <Person />;
      default: return <Person />;
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
          boxShadow: `0 4px 20px ${alpha(getRoleColor(user.role), 0.15)}`
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: user.isActive ? theme.palette.success.main : theme.palette.error.main,
                  border: `2px solid ${theme.palette.background.paper}`
                }}
              />
            }
          >
            <Avatar
              src={user.avatar}
              sx={{ width: 48, height: 48, mr: 2 }}
            >
              {user.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
          </Badge>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
          <Chip
            icon={getRoleIcon(user.role)}
            label={user.role}
            color={user.role === 'admin' ? 'error' : user.role === 'manager' ? 'warning' : 'info'}
            size="small"
            variant="outlined"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {user.department}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BadgeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {user.badgeId}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
          <CheckCircle sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            Last login: {user.lastLogin}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            Permissions:
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {user.permissions.slice(0, 3).map((permission) => (
              <Chip key={permission} label={permission} size="small" variant="outlined" />
            ))}
            {user.permissions.length > 3 && (
              <Chip label={`+${user.permissions.length - 3} more`} size="small" variant="outlined" />
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Created: {new Date(user.createdAt).toLocaleDateString()}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" color="primary" onClick={onEdit}>
              <Edit />
            </IconButton>
            <IconButton size="small" color="error" onClick={onDelete}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function UserManagementPage() {
  const theme = useTheme();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleAddUser = () => {
    setSelectedUser(undefined);
    setDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleSaveUser = (user: User) => {
    if (selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? user : u));
    } else {
      setUsers([...users, user]);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const userStats = {
    total: users.length,
    active: users.filter(u => u.isActive).length,
    admins: users.filter(u => u.role === 'admin').length,
    managers: users.filter(u => u.role === 'manager').length,
    users: users.filter(u => u.role === 'user').length
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
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
              Manage workspace users, roles, permissions, and badge assignments
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Filter Role</InputLabel>
              <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} label="Filter Role">
                <MenuItem value="all">All Users</MenuItem>
                <MenuItem value="admin">Admins</MenuItem>
                <MenuItem value="manager">Managers</MenuItem>
                <MenuItem value="user">Users</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" startIcon={<Search />} sx={{ borderRadius: 2 }}>
              Search
            </Button>
            <Button variant="contained" startIcon={<PersonAdd />} sx={{ borderRadius: 2 }} onClick={handleAddUser}>
              Add User
            </Button>
          </Box>
        </Box>

        {/* User Statistics */}
        <Grid container spacing={3} sx={{ mb: 4, width: '100%', mx: 0 }}>
          <Grid item xs={12} sm={6} md={2.4} sx={{ width: '100%', maxWidth: '100%' }}>
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
                <Person sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" fontWeight={800} color="#3730a3">{userStats.total}</Typography>
              <Typography fontWeight={600} color="#6366f1" fontSize={15}>Total Users</Typography>
              <Typography color="#818cf8" fontSize={13}>Registered accounts</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4} sx={{ width: '100%', maxWidth: '100%' }}>
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
              <Typography color="#22c55e" fontSize={13}>Currently enabled</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4} sx={{ width: '100%', maxWidth: '100%' }}>
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
              <Typography fontWeight={600} color="#dc2626" fontSize={15}>Administrators</Typography>
              <Typography color="#ef4444" fontSize={13}>Admin privileges</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4} sx={{ width: '100%', maxWidth: '100%' }}>
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
                <Security sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" fontWeight={800} color="#92400e">{userStats.managers}</Typography>
              <Typography fontWeight={600} color="#d97706" fontSize={15}>Managers</Typography>
              <Typography color="#f59e0b" fontSize={13}>Management roles</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4} sx={{ width: '100%', maxWidth: '100%' }}>
            <Card elevation={0} sx={{
              p: 3,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
              boxShadow: '0 2px 8px rgba(139,92,246,0.06)',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              minHeight: 140,
            }}>
              <Box sx={{
                bgcolor: '#8b5cf6', color: '#fff', borderRadius: 999, p: 1.5, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Group sx={{ fontSize: 28 }} />
              </Box>
              <Typography variant="h5" fontWeight={800} color="#581c87">{userStats.users}</Typography>
              <Typography fontWeight={600} color="#7c3aed" fontSize={15}>Standard Users</Typography>
              <Typography color="#8b5cf6" fontSize={13}>Regular access</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Card elevation={0} sx={{ 
          p: 2, 
          borderRadius: 4, 
          background: '#fff',
          boxShadow: '0 2px 12px rgba(99,102,241,0.06)',
          mb: 3 
        }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              size="small"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />
              }}
              sx={{ minWidth: 200 }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                label="Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary">
              {filteredUsers.length} users found
            </Typography>
          </Box>
        </Card>

        {/* User Cards */}
        <Grid container spacing={3} sx={{ width: '100%', mx: 0 }}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id} sx={{ width: '100%', maxWidth: '100%' }}>
              <UserCard 
                user={user} 
                onEdit={() => handleEditUser(user)}
                onDelete={() => handleDeleteUser(user.id)}
              />
            </Grid>
          ))}

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <Card
                elevation={0}
                sx={{
                  p: 6,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 320,
                  border: '2px dashed #90caf9'
                }}
              >
                <Person sx={{ fontSize: 64, color: '#90caf9', mb: 2 }} />
                <Typography variant="h5" fontWeight={700} color="primary" mb={1}>
                  No Users Found
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  {searchTerm || roleFilter !== 'all' 
                    ? 'No users match your current filters.' 
                    : 'Start by adding your first user to the system.'}
                </Typography>
                <Button variant="contained" color="primary" startIcon={<PersonAdd />} onClick={handleAddUser}>
                  Add User
                </Button>
              </Card>
            </Grid>
          )}
        </Grid>

        <UserFormDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          user={selectedUser}
          onSave={handleSaveUser}
        />
      </Box>
    </Box>
  );
}