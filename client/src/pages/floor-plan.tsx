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
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  IconButton,
  Divider,
  useTheme,
  alpha,
  Badge,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Tooltip,
  Fab
} from "@mui/material";
import {
  Visibility,
  ZoomIn,
  ZoomOut,
  Refresh,
  Settings,
  People,
  LocationOn,
  EventAvailable,
  EventBusy,
  CheckCircle,
  Warning,
  Air,
  Thermostat,
  WaterDrop,
  Speed,
  FloorPlan as FloorIcon,
  Layers,
  ViewComfy,
  Fullscreen,
  Computer,
  Phone,
  AccessTime,
  TrendingUp,
  Business,
  Wifi,
  PowerSettingsNew,
  Monitor,
  Add,
  FilterList,
  Map
} from "@mui/icons-material";
import InteractiveFloorPlan from "@/components/InteractiveFloorPlan";
import PageContainer from "@/components/PageContainer";
import LoadingSpinner from '@/components/LoadingSpinner';
import { useTranslation } from 'react-i18next';

const FloorControlsCard = ({ selectedFloor, setSelectedFloor, floors, currentFloor }) => {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState('interactive');
  const [showLabels, setShowLabels] = useState(true);
  const [showOccupancy, setShowOccupancy] = useState(true);
  const { t } = useTranslation();

  return (
    <Card elevation={0} sx={{ height: 'fit-content', width: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          {t('floorPlanControls')}
        </Typography>

        {/* Floor Selection */}
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>{t('selectFloor')}</InputLabel>
            <Select
              value={selectedFloor}
              label={t('selectFloor')}
              onChange={(e) => setSelectedFloor(e.target.value)}
            >
              {floors.map((floor) => (
                <MenuItem key={floor.value} value={floor.value}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <span>{floor.label}</span>
                    <Chip 
                      size="small" 
                      label={`${floor.available}/${floor.rooms}`}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Current Floor Info */}
        {currentFloor && (
          <Box sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              {currentFloor.label}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">{t('availableSpaces')}</Typography>
              <Typography variant="body2" fontWeight={600} color="success.main">
                {currentFloor.available} {t('of')} {currentFloor.rooms}
              </Typography>
            </Box>
            <Box sx={{ 
              height: 6, 
              borderRadius: 3, 
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                height: '100%', 
                width: `${(currentFloor.available / currentFloor.rooms) * 100}%`, 
                backgroundColor: theme.palette.success.main,
                borderRadius: 3,
                transition: 'width 0.3s ease'
              }} />
            </Box>
          </Box>
        )}

        {/* View Options */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
            {t('displayOptions')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FormControlLabel
              control={
                <Switch 
                  checked={showLabels} 
                  onChange={(e) => setShowLabels(e.target.checked)}
                  size="small"
                />
              }
              label={t('showLabels')}
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={showOccupancy} 
                  onChange={(e) => setShowOccupancy(e.target.checked)}
                  size="small"
                />
              }
              label={t('showOccupancy')}
            />
          </Box>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button 
            variant="outlined" 
            startIcon={<Computer />} 
            fullWidth 
            size="small"
            sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
          >
            {t('findAvailableDesk')}
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<People />} 
            fullWidth 
            size="small"
            sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
          >
            {t('bookMeetingRoom')}
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Phone />} 
            fullWidth 
            size="small"
            sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
          >
            {t('reservePhoneBooth')}
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<Map />} 
            fullWidth 
            size="small"
            sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
          >
            {t('exportFloorPlan')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const SpaceStatsCard = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  
  const spaceTypes = [
    { 
      type: t('desks'), 
      total: 45, 
      available: 32, 
      occupied: 13, 
      icon: <Computer />,
      color: theme.palette.primary.main
    },
    { 
      type: t('meetingRooms'), 
      total: 8, 
      available: 5, 
      occupied: 3, 
      icon: <People />,
      color: theme.palette.success.main
    },
    { 
      type: t('phoneBooths'), 
      total: 6, 
      available: 4, 
      occupied: 2, 
      icon: <Phone />,
      color: theme.palette.warning.main
    }
  ];

  return (
    <Card elevation={0} sx={{ height: 'fit-content', width: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            {t('spaceStatistics')}
          </Typography>
          <Button size="small" startIcon={<Refresh />}>
            {t('refresh')}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {spaceTypes.map((space, index) => {
            const utilizationRate = Math.round((space.occupied / space.total) * 100);
            
            return (
              <Box key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    backgroundColor: alpha(space.color, 0.1),
                    color: space.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    {space.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {space.type}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {space.available} {t('availableOf')} {space.total}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight={700} color={space.color}>
                    {utilizationRate}%
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  height: 6, 
                  borderRadius: 3, 
                  backgroundColor: alpha(space.color, 0.1),
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    height: '100%', 
                    width: `${utilizationRate}%`, 
                    backgroundColor: space.color,
                    borderRadius: 3,
                    transition: 'width 0.3s ease'
                  }} />
                </Box>
              </Box>
            );
          })}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} color="primary.main" sx={{ mb: 1 }}>
            72%
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t('overallSpaceUtilization')}
          </Typography>
          <Chip 
            icon={<TrendingUp />}
            label={`${t('plus8FromYesterday')}`}
            color="success"
            variant="outlined"
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const EnvironmentCard = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  
  const environmentData = [
    {
      metric: t('temperature'),
      value: '72°F',
      status: 'optimal',
      icon: <Thermostat />,
      color: theme.palette.info.main
    },
    {
      metric: t('airQuality'),
      value: '420 ppm',
      status: 'good',
      icon: <Air />,
      color: theme.palette.success.main
    },
    {
      metric: t('humidity'),
      value: '45%',
      status: 'optimal',
      icon: <WaterDrop />,
      color: theme.palette.primary.main
    }
  ];

  return (
    <Card elevation={0} sx={{ height: 'fit-content', width: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          {t('environmentStatus')}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {environmentData.map((item, index) => (
            <Box 
              key={index}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 2, 
                borderRadius: 2,
                backgroundColor: alpha(item.color, 0.05),
                border: `1px solid ${alpha(item.color, 0.1)}`
              }}
            >
              <Box sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: alpha(item.color, 0.1),
                color: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2
              }}>
                {item.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={600}>
                  {item.metric}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t('status')}: {item.status}
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight={700} color={item.color}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default function FloorPlanPage() {
  const theme = useTheme();
  const { t } = useTranslation();
  // Move floors array here so it can be shared
  const floors = [
    { value: 'floor-1', label: t('floor1'), rooms: 8, available: 5 },
    { value: 'floor-2', label: t('floor2'), rooms: 25, available: 18 },
    { value: 'floor-3', label: t('floor3'), rooms: 12, available: 7 },
    { value: 'floor-4', label: t('floor4'), rooms: 6, available: 4 }
  ];
  const [selectedFloor, setSelectedFloor] = useState('floor-2');
  const [refreshing, setRefreshing] = useState(false);
  const currentFloor = floors.find(f => f.value === selectedFloor);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <PageContainer
      title={t('interactiveFloorPlan')}
      description={t('viewRealTimeOccupancyBookSpacesMonitorConditions')}
    >
      {/* Header Actions */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip 
            icon={<CheckCircle />} 
            label={`${t('available')} 32`} 
            color="success" 
            variant="outlined"
          />
          <Chip 
            icon={<AccessTime />} 
            label={`${t('occupied')} 13`} 
            color="warning" 
            variant="outlined"
          />
          <Chip 
            icon={<Warning />} 
            label={`${t('maintenance')} 2`} 
            color="error" 
            variant="outlined"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={refreshing ? <LoadingSpinner size={16} variant="modern" /> : <Refresh />}
            onClick={handleRefresh}
            disabled={refreshing}
            sx={{ borderRadius: 2 }}
          >
            {refreshing ? t('refreshing') : t('refresh')}
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ 
              borderRadius: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
            }}
          >
            {t('quickBook')}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Floor Plan */}
        <Grid item xs={12} lg={8}>
          <Card elevation={0} sx={{ borderRadius: 3, minHeight: 700, overflow: 'hidden' }}>
            {/* Header Section */}
            <Box sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: 'white',
              p: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Box>
                <Typography variant="h4" fontWeight={800} sx={{ mb: 1, letterSpacing: -1 }}>
                  Floor Plan
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Interactive Workspace Layout and Space Management
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title={t('zoomIn')}>
                  <IconButton size="small" sx={{ color: 'white' }}>
                    <ZoomIn />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('zoomOut')}>
                  <IconButton size="small" sx={{ color: 'white' }}>
                    <ZoomOut />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('fullscreen')}>
                  <IconButton size="small" sx={{ color: 'white' }}>
                    <Fullscreen />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Legend */}
            <Box sx={{ 
              p: 2, 
              backgroundColor: alpha(theme.palette.primary.main, 0.02),
              borderBottom: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  backgroundColor: theme.palette.success.main 
                }} />
                <Typography variant="body2" fontWeight={600}>{t('available')}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  backgroundColor: theme.palette.warning.main 
                }} />
                <Typography variant="body2" fontWeight={600}>{t('booked')}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  backgroundColor: theme.palette.error.main 
                }} />
                <Typography variant="body2" fontWeight={600}>{t('occupied')}</Typography>
              </Box>
            </Box>
            
            {/* Floor Plan Content */}
            <CardContent sx={{ p: 3, minHeight: 500 }}>
              <InteractiveFloorPlan selectedFloor={selectedFloor} currentFloor={currentFloor} floors={floors} />
            </CardContent>

            {/* Quick Stats Footer */}
            <Box sx={{ 
              p: 2, 
              backgroundColor: alpha(theme.palette.grey[500], 0.05),
              borderTop: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="body2" color="text.secondary">
                {/* Localize floor name */}
                {/* Localize last updated time */}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip 
                  label={`${t('available')} 32`} 
                  color="success" 
                  size="small" 
                  variant="outlined"
                />
                <Chip 
                  label={`${t('booked')} 8`} 
                  color="warning" 
                  size="small" 
                  variant="outlined"
                />
                <Chip 
                  label={`${t('occupied')} 5`} 
                  color="error" 
                  size="small" 
                  variant="outlined"
                />
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Sidebar with Controls and Stats */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: 'fit-content' }}>
            <FloorControlsCard selectedFloor={selectedFloor} setSelectedFloor={setSelectedFloor} floors={floors} currentFloor={currentFloor} />
            <SpaceStatsCard />
            <EnvironmentCard />
          </Box>
        </Grid>
      </Grid>

      {/* Floating Action Button for Quick Booking */}
      <Fab
        color="primary"
        aria-label="quick book"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          '&:hover': {
            background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
          }
        }}
      >
        <Add />
      </Fab>
    </PageContainer>
  );
}