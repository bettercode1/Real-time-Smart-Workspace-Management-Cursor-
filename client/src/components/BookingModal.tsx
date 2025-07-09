import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  Typography,
  Alert,
  IconButton,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Autocomplete
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Close,
  Add,
  Edit,
  Delete,
  Repeat,
  Group,
  Room,
  Schedule,
  Warning,
  CheckCircle,
  Person
} from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";

interface Booking {
  id: string;
  title: string;
  roomId: string;
  roomName: string;
  startTime: Date;
  endTime: Date;
  attendees: string[];
  description: string;
  isRecurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';
  recurrenceEnd?: Date;
  status: 'confirmed' | 'tentative' | 'cancelled';
  createdBy: string;
  createdAt: Date;
  equipment?: string[];
  notes?: string;
  maxAttendees?: number;
}

interface Room {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  floor: string;
  type: 'meeting' | 'conference' | 'phone' | 'training';
}

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  booking?: Booking | null;
  selectedDate?: Date;
  selectedRoom?: string;
  mode: 'create' | 'edit' | 'view';
}

const mockRooms: Room[] = [
  { id: 'room1', name: 'Conference Room A', capacity: 12, equipment: ['Projector', 'Whiteboard', 'Video Conf'], floor: '1st Floor', type: 'conference' },
  { id: 'room2', name: 'Meeting Room B', capacity: 6, equipment: ['TV', 'Whiteboard'], floor: '1st Floor', type: 'meeting' },
  { id: 'room3', name: 'Phone Booth 1', capacity: 2, equipment: ['Phone'], floor: '1st Floor', type: 'phone' },
  { id: 'room4', name: 'Training Room', capacity: 20, equipment: ['Projector', 'Speakers', 'Microphone'], floor: '2nd Floor', type: 'training' },
];

const mockUsers = [
  { id: '1', name: 'John Smith', email: 'john@company.com', avatar: null },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@company.com', avatar: null },
  { id: '3', name: 'Mike Davis', email: 'mike@company.com', avatar: null },
  { id: '4', name: 'Emily Brown', email: 'emily@company.com', avatar: null },
];

const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onClose,
  booking,
  selectedDate,
  selectedRoom,
  mode
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<Booking>>({
    title: '',
    roomId: selectedRoom || '',
    startTime: selectedDate || new Date(),
    endTime: selectedDate ? new Date(selectedDate.getTime() + 60 * 60 * 1000) : new Date(),
    attendees: [],
    description: '',
    isRecurring: false,
    status: 'confirmed',
    equipment: [],
    notes: '',
    maxAttendees: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [conflicts, setConflicts] = useState<Booking[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (booking && mode !== 'create') {
      setFormData({
        ...booking,
        startTime: new Date(booking.startTime),
        endTime: new Date(booking.endTime),
        recurrenceEnd: booking.recurrenceEnd ? new Date(booking.recurrenceEnd) : undefined
      });
    } else {
      setFormData({
        title: '',
        roomId: selectedRoom || '',
        startTime: selectedDate || new Date(),
        endTime: selectedDate ? new Date(selectedDate.getTime() + 60 * 60 * 1000) : new Date(),
        attendees: [],
        description: '',
        isRecurring: false,
        status: 'confirmed',
        equipment: [],
        notes: '',
        maxAttendees: 0
      });
    }
  }, [booking, mode, selectedDate, selectedRoom]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.roomId) {
      newErrors.roomId = 'Room selection is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    const selectedRoom = mockRooms.find(r => r.id === formData.roomId);
    if (selectedRoom && formData.attendees && formData.attendees.length > selectedRoom.capacity) {
      newErrors.attendees = `Too many attendees for room capacity (${selectedRoom.capacity})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkConflicts = () => {
    // Mock conflict checking
    const mockConflicts: Booking[] = [];
    if (formData.startTime && formData.roomId === 'room1') {
      mockConflicts.push({
        id: 'conflict1',
        title: 'Weekly Team Meeting',
        roomId: 'room1',
        roomName: 'Conference Room A',
        startTime: new Date(formData.startTime.getTime() + 30 * 60 * 1000),
        endTime: new Date(formData.startTime.getTime() + 90 * 60 * 1000),
        attendees: ['john@company.com'],
        description: 'Recurring team meeting',
        isRecurring: true,
        status: 'confirmed',
        createdBy: 'john@company.com',
        createdAt: new Date()
      });
    }
    setConflicts(mockConflicts);
  };

  useEffect(() => {
    if (formData.startTime && formData.endTime && formData.roomId) {
      checkConflicts();
    }
  }, [formData.startTime, formData.endTime, formData.roomId]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Booking saved:', formData);
      onClose();
    } catch (error) {
      console.error('Error saving booking:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!booking) return;
    
    setSaving(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Booking deleted:', booking.id);
      onClose();
    } catch (error) {
      console.error('Error deleting booking:', error);
    } finally {
      setSaving(false);
    }
  };

  const selectedRoomData = mockRooms.find(r => r.id === formData.roomId);

  const getModalTitle = () => {
    switch (mode) {
      case 'create': return 'Create New Booking';
      case 'edit': return 'Edit Booking';
      case 'view': return 'Booking Details';
      default: return 'Booking';
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { minHeight: '80vh' }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{getModalTitle()}</Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Basic Information</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Booking Title"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        error={!!errors.title}
                        helperText={errors.title}
                        disabled={mode === 'view'}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth error={!!errors.roomId}>
                        <InputLabel>Room</InputLabel>
                        <Select
                          value={formData.roomId || ''}
                          onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                          disabled={mode === 'view'}
                          required
                        >
                          {mockRooms.map((room) => (
                            <MenuItem key={room.id} value={room.id}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Typography>{room.name}</Typography>
                                <Chip 
                                  size="small" 
                                  label={`${room.capacity} seats`}
                                  color="primary"
                                />
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        label="Date"
                        value={formData.startTime}
                        onChange={(date) => {
                          if (date) {
                            const newStartTime = new Date(date);
                            const newEndTime = new Date(date.getTime() + 60 * 60 * 1000);
                            setFormData({ 
                              ...formData, 
                              startTime: newStartTime,
                              endTime: newEndTime
                            });
                          }
                        }}
                        disabled={mode === 'view'}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.startTime,
                            helperText: errors.startTime
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TimePicker
                        label="Start Time"
                        value={formData.startTime}
                        onChange={(time) => {
                          if (time) {
                            setFormData({ ...formData, startTime: time });
                          }
                        }}
                        disabled={mode === 'view'}
                        slotProps={{
                          textField: {
                            fullWidth: true
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TimePicker
                        label="End Time"
                        value={formData.endTime}
                        onChange={(time) => {
                          if (time) {
                            setFormData({ ...formData, endTime: time });
                          }
                        }}
                        disabled={mode === 'view'}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.endTime,
                            helperText: errors.endTime
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Room Information */}
            {selectedRoomData && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Room Information</Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                      <Chip icon={<Room />} label={selectedRoomData.floor} />
                      <Chip icon={<Group />} label={`${selectedRoomData.capacity} capacity`} />
                      <Chip label={selectedRoomData.type} color="primary" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Available Equipment:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {selectedRoomData.equipment.map((eq, index) => (
                        <Chip key={index} size="small" label={eq} variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Attendees */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Attendees</Typography>
                  <Autocomplete
                    multiple
                    options={mockUsers}
                    getOptionLabel={(option) => `${option.name} (${option.email})`}
                    value={mockUsers.filter(user => formData.attendees?.includes(user.email) || false)}
                    onChange={(_, newValue) => {
                      setFormData({ 
                        ...formData, 
                        attendees: newValue.map(user => user.email) 
                      });
                    }}
                    disabled={mode === 'view'}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Attendees"
                        placeholder="Search users..."
                        error={!!errors.attendees}
                        helperText={errors.attendees}
                      />
                    )}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <Avatar sx={{ mr: 2, width: 24, height: 24 }}>
                          {option.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2">{option.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.email}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Additional Options */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Additional Options</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={3}
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        disabled={mode === 'view'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.isRecurring || false}
                            onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                            disabled={mode === 'view'}
                          />
                        }
                        label="Recurring Booking"
                      />
                    </Grid>
                    {formData.isRecurring && (
                      <>
                        <Grid item xs={6}>
                          <FormControl fullWidth>
                            <InputLabel>Repeat Pattern</InputLabel>
                            <Select
                              value={formData.recurrencePattern || 'weekly'}
                              onChange={(e) => setFormData({ 
                                ...formData, 
                                recurrencePattern: e.target.value as 'daily' | 'weekly' | 'monthly' 
                              })}
                              disabled={mode === 'view'}
                            >
                              <MenuItem value="daily">Daily</MenuItem>
                              <MenuItem value="weekly">Weekly</MenuItem>
                              <MenuItem value="monthly">Monthly</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <DatePicker
                            label="End Date"
                            value={formData.recurrenceEnd}
                            onChange={(date) => setFormData({ ...formData, recurrenceEnd: date })}
                            disabled={mode === 'view'}
                            slotProps={{
                              textField: {
                                fullWidth: true
                              }
                            }}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Conflicts Warning */}
            {conflicts.length > 0 && (
              <Grid item xs={12}>
                <Alert severity="warning" icon={<Warning />}>
                  <Typography variant="subtitle2" gutterBottom>
                    Booking Conflicts Detected
                  </Typography>
                  <List dense>
                    {conflicts.map((conflict, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={conflict.title}
                          secondary={`${conflict.startTime.toLocaleTimeString()} - ${conflict.endTime.toLocaleTimeString()}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          
          {mode === 'edit' && (
            <Button
              onClick={handleDelete}
              color="error"
              disabled={saving}
              startIcon={<Delete />}
            >
              Delete
            </Button>
          )}
          
          {mode !== 'view' && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={saving || Object.keys(errors).length > 0}
              startIcon={mode === 'create' ? <Add /> : <Edit />}
            >
              {saving ? 'Saving...' : mode === 'create' ? 'Create Booking' : 'Update Booking'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default BookingModal;
