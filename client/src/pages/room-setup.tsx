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
  ListItemSecondaryAction,
  Divider,
  Alert,
  useTheme,
  alpha
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  People,
  MeetingRoom,
  EventSeat,
  LocationOn,
  Settings,
  Tv,
  Wifi,
  VolumeUp,
  Videocam,
  Mic,
  Computer,
  AccessibilityNew,
  Save,
  Cancel
} from '@mui/icons-material';
import PageContainer from '@/components/PageContainer';

interface Room {
  id: string;
  name: string;
  type: 'meeting' | 'open' | 'phone' | 'training' | 'collaboration';
  capacity: number;
  location: string;
  floor: string;
  equipment: string[];
  isActive: boolean;
  bookingEnabled: boolean;
  accessLevel: 'public' | 'restricted' | 'private';
  description: string;
  features: string[];
}

const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Executive Conference Room',
    type: 'meeting',
    capacity: 12,
    location: 'East Wing',
    floor: 'Floor 1',
    equipment: ['4K Display', 'Video Conferencing', 'Wireless Presentation', 'Audio System'],
    isActive: true,
    bookingEnabled: true,
    accessLevel: 'restricted',
    description: 'Premium conference room with advanced AV equipment',
    features: ['Climate Control', 'Soundproofing', 'Whiteboard', 'Coffee Station']
  },
  {
    id: '2',
    name: 'Open Collaboration Zone',
    type: 'open',
    capacity: 8,
    location: 'Central Area',
    floor: 'Floor 1',
    equipment: ['Moveable Furniture', 'Power Outlets', 'WiFi Access'],
    isActive: true,
    bookingEnabled: true,
    accessLevel: 'public',
    description: 'Flexible workspace for team collaboration',
    features: ['Natural Light', 'Adjustable Tables', 'Charging Stations']
  },
  {
    id: '3',
    name: 'Phone Booth 1',
    type: 'phone',
    capacity: 1,
    location: 'North Corridor',
    floor: 'Floor 1',
    equipment: ['Noise Cancellation', 'Phone Line', 'USB Charging'],
    isActive: true,
    bookingEnabled: true,
    accessLevel: 'public',
    description: 'Private space for phone calls and video meetings',
    features: ['Soundproofing', 'Ventilation', 'Comfortable Seating']
  },
  {
    id: '4',
    name: 'Training Room Alpha',
    type: 'training',
    capacity: 20,
    location: 'West Wing',
    floor: 'Floor 2',
    equipment: ['Projector', 'Sound System', 'Microphones', 'Flip Charts'],
    isActive: false,
    bookingEnabled: false,
    accessLevel: 'restricted',
    description: 'Large training room for workshops and presentations',
    features: ['Tiered Seating', 'Recording Capability', 'Breakout Areas']
  }
];

const RoomCard = ({ room, onEdit, onDelete }: { room: Room; onEdit: () => void; onDelete: () => void }) => {
  const theme = useTheme();
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return theme.palette.primary.main;
      case 'open': return theme.palette.success.main;
      case 'phone': return theme.palette.info.main;
      case 'training': return theme.palette.warning.main;
      case 'collaboration': return theme.palette.secondary.main;
      default: return theme.palette.grey[500];
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <MeetingRoom />;
      case 'open': return <People />;
      case 'phone': return <Mic />;
      case 'training': return <Computer />;
      case 'collaboration': return <EventSeat />;
      default: return <MeetingRoom />;
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
          boxShadow: `0 4px 20px ${alpha(getTypeColor(room.type), 0.15)}`
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box 
              sx={{ 
                p: 1.5,
                borderRadius: 2,
                backgroundColor: alpha(getTypeColor(room.type), 0.1),
                color: getTypeColor(room.type)
              }}
            >
              {getTypeIcon(room.type)}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {room.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {room.location} • {room.floor}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Chip 
              label={room.isActive ? 'Active' : 'Inactive'}
              color={room.isActive ? 'success' : 'default'}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {room.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <People sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {room.capacity} people
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Settings sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {room.equipment.length} equipment
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            Equipment:
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {room.equipment.slice(0, 3).map((item, index) => (
              <Chip key={index} label={item} size="small" variant="outlined" />
            ))}
            {room.equipment.length > 3 && (
              <Chip label={`+${room.equipment.length - 3} more`} size="small" variant="outlined" />
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip 
            label={room.accessLevel}
            color={room.accessLevel === 'public' ? 'success' : room.accessLevel === 'restricted' ? 'warning' : 'error'}
            size="small"
            variant="outlined"
          />
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

const RoomFormDialog = ({ open, onClose, room, onSave }: { 
  open: boolean; 
  onClose: () => void; 
  room?: Room; 
  onSave: (room: Room) => void; 
}) => {
  const [formData, setFormData] = useState<Partial<Room>>(room || {
    name: '',
    type: 'meeting',
    capacity: 8,
    location: '',
    floor: 'Floor 1',
    equipment: [],
    isActive: true,
    bookingEnabled: true,
    accessLevel: 'public',
    description: '',
    features: []
  });

  const handleSave = () => {
    if (formData.name && formData.location) {
      onSave(formData as Room);
      onClose();
    }
  };

  const equipmentOptions = [
    'Projector', '4K Display', 'Video Conferencing', 'Wireless Presentation',
    'Audio System', 'Microphones', 'Whiteboard', 'Flip Charts',
    'WiFi Access', 'Power Outlets', 'Phone Line', 'Charging Stations'
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {room ? 'Edit Room' : 'Add New Room'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Room Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Room Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Room Type"
                  onChange={(e) => setFormData({...formData, type: e.target.value as Room['type']})}
                >
                  <MenuItem value="meeting">Meeting Room</MenuItem>
                  <MenuItem value="open">Open Space</MenuItem>
                  <MenuItem value="phone">Phone Booth</MenuItem>
                  <MenuItem value="training">Training Room</MenuItem>
                  <MenuItem value="collaboration">Collaboration Zone</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                inputProps={{ min: 1, max: 100 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Floor</InputLabel>
                <Select
                  value={formData.floor}
                  label="Floor"
                  onChange={(e) => setFormData({...formData, floor: e.target.value})}
                >
                  <MenuItem value="Floor 1">Floor 1</MenuItem>
                  <MenuItem value="Floor 2">Floor 2</MenuItem>
                  <MenuItem value="Floor 3">Floor 3</MenuItem>
                  <MenuItem value="Basement">Basement</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Access Level</InputLabel>
                <Select
                  value={formData.accessLevel}
                  label="Access Level"
                  onChange={(e) => setFormData({...formData, accessLevel: e.target.value as Room['accessLevel']})}
                >
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="restricted">Restricted</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Equipment (select multiple)
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {equipmentOptions.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    clickable
                    color={formData.equipment?.includes(item) ? 'primary' : 'default'}
                    onClick={() => {
                      const currentEquipment = formData.equipment || [];
                      const newEquipment = currentEquipment.includes(item)
                        ? currentEquipment.filter(e => e !== item)
                        : [...currentEquipment, item];
                      setFormData({...formData, equipment: newEquipment});
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
          Save Room
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function RoomSetupPage() {
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  const [rooms, setRooms] = useState<Room[]>(mockRooms);

  const handleAddRoom = () => {
    setSelectedRoom(undefined);
    setDialogOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setDialogOpen(true);
  };

  const handleDeleteRoom = (roomId: string) => {
    setRooms(rooms.filter(r => r.id !== roomId));
  };

  const handleSaveRoom = (room: Room) => {
    if (selectedRoom) {
      // Edit existing room
      setRooms(rooms.map(r => r.id === selectedRoom.id ? {...room, id: selectedRoom.id} : r));
    } else {
      // Add new room
      setRooms([...rooms, {...room, id: Date.now().toString()}]);
    }
  };

  const roomStats = {
    total: rooms.length,
    active: rooms.filter(r => r.isActive).length,
    meeting: rooms.filter(r => r.type === 'meeting').length,
    open: rooms.filter(r => r.type === 'open').length,
    phone: rooms.filter(r => r.type === 'phone').length,
    training: rooms.filter(r => r.type === 'training').length
  };

  return (
    <PageContainer
      title="Room Setup"
      description="Configure and manage workspace rooms and areas"
    >
      <Grid container spacing={3}>
        {/* Room Statistics */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Room Overview
              </Typography>
              <Button variant="contained" startIcon={<Add />} onClick={handleAddRoom}>
                Add Room
              </Button>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={2}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>{roomStats.total}</Typography>
                  <Typography variant="caption">Total Rooms</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'success.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>{roomStats.active}</Typography>
                  <Typography variant="caption">Active</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'info.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>{roomStats.meeting}</Typography>
                  <Typography variant="caption">Meeting</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'warning.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>{roomStats.open}</Typography>
                  <Typography variant="caption">Open Space</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'secondary.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>{roomStats.phone}</Typography>
                  <Typography variant="caption">Phone Booth</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'error.main', color: 'white' }}>
                  <Typography variant="h4" fontWeight={700}>{roomStats.training}</Typography>
                  <Typography variant="caption">Training</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Room Cards */}
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <RoomCard 
              room={room} 
              onEdit={() => handleEditRoom(room)}
              onDelete={() => handleDeleteRoom(room.id)}
            />
          </Grid>
        ))}

        {/* Empty State */}
        {rooms.length === 0 && (
          <Grid item xs={12}>
            <Paper
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
              <MeetingRoom sx={{ fontSize: 64, color: '#90caf9', mb: 2 }} />
              <Typography variant="h5" fontWeight={700} color="primary" mb={1}>
                No Rooms Configured
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                Start by adding your first room to begin managing your workspace.
              </Typography>
              <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddRoom}>
                Add Room
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>

      <RoomFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        room={selectedRoom}
        onSave={handleSaveRoom}
      />
    </PageContainer>
  );
}