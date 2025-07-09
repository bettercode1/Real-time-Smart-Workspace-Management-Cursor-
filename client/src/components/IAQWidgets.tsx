import React, { useState, useEffect } from "react";
import { 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  LinearProgress,
  Chip,
  IconButton,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  alpha
} from "@mui/material";
import { 
  Air, 
  Thermostat, 
  WaterDrop, 
  Warning,
  TrendingUp,
  TrendingDown,
  Timeline,
  Settings
} from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface IAQData {
  timestamp: string;
  co2: number;
  temperature: number;
  humidity: number;
}

interface IAQMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'excellent' | 'good' | 'moderate' | 'poor' | 'hazardous';
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
  threshold: {
    excellent: number;
    good: number;
    moderate: number;
    poor: number;
  };
  description: string;
}

// Mock historical data
const generateHistoricalData = (): IAQData[] => {
  const data: IAQData[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      timestamp: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      co2: 400 + Math.random() * 200 + Math.sin(i * 0.5) * 100,
      temperature: 20 + Math.random() * 6 + Math.sin(i * 0.3) * 2,
      humidity: 45 + Math.random() * 20 + Math.sin(i * 0.4) * 10
    });
  }
  
  return data;
};

const IAQWidgets = () => {
  const theme = useTheme();
  const [currentData, setCurrentData] = useState<IAQData>({
    timestamp: new Date().toLocaleTimeString(),
    co2: 620,
    temperature: 22.5,
    humidity: 48
  });
  
  const [historicalData, setHistoricalData] = useState<IAQData[]>(generateHistoricalData());
  const [selectedMetric, setSelectedMetric] = useState<IAQMetric | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(prev => ({
        timestamp: new Date().toLocaleTimeString(),
        co2: Math.max(350, Math.min(1000, prev.co2 + (Math.random() - 0.5) * 20)),
        temperature: Math.max(18, Math.min(28, prev.temperature + (Math.random() - 0.5) * 0.5)),
        humidity: Math.max(30, Math.min(70, prev.humidity + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatus = (value: number, thresholds: IAQMetric['threshold'], reverse = false): IAQMetric['status'] => {
    if (reverse) {
      if (value <= thresholds.excellent) return 'excellent';
      if (value <= thresholds.good) return 'good';
      if (value <= thresholds.moderate) return 'moderate';
      if (value <= thresholds.poor) return 'poor';
      return 'hazardous';
    } else {
      if (value >= thresholds.excellent) return 'excellent';
      if (value >= thresholds.good) return 'good';
      if (value >= thresholds.moderate) return 'moderate';
      if (value >= thresholds.poor) return 'poor';
      return 'hazardous';
    }
  };

  const getTrend = (current: number, historical: IAQData[]): 'up' | 'down' | 'stable' => {
    if (historical.length < 2) return 'stable';
    const recent = historical.slice(-3).map(d => d.co2).reduce((a, b) => a + b, 0) / 3;
    const diff = current - recent;
    if (Math.abs(diff) < 5) return 'stable';
    return diff > 0 ? 'up' : 'down';
  };

  const metrics: IAQMetric[] = [
    {
      id: 'co2',
      name: 'CO₂',
      value: Math.round(currentData.co2),
      unit: 'ppm',
      status: getStatus(currentData.co2, { excellent: 400, good: 600, moderate: 800, poor: 1000 }, true),
      trend: getTrend(currentData.co2, historicalData),
      icon: <Air />,
      color: currentData.co2 > 800 ? theme.palette.error.main : currentData.co2 > 600 ? theme.palette.warning.main : theme.palette.success.main,
      threshold: { excellent: 400, good: 600, moderate: 800, poor: 1000 },
      description: 'Carbon dioxide concentration in the air. High levels can cause drowsiness and reduced cognitive function.'
    },
    {
      id: 'temperature',
      name: 'TEMP',
      value: Math.round(currentData.temperature * 10) / 10,
      unit: '°C',
      status: getStatus(Math.abs(currentData.temperature - 22), { excellent: 1, good: 2, moderate: 3, poor: 4 }, true),
      trend: getTrend(currentData.temperature, historicalData.map(d => ({ ...d, co2: d.temperature }))),
      icon: <Thermostat />,
      color: Math.abs(currentData.temperature - 22) > 3 ? theme.palette.error.main : Math.abs(currentData.temperature - 22) > 2 ? theme.palette.warning.main : theme.palette.success.main,
      threshold: { excellent: 21, good: 20, moderate: 19, poor: 18 },
      description: 'Ambient temperature. Optimal range is 20-24°C for comfort and productivity.'
    },
    {
      id: 'humidity',
      name: 'HUMID',
      value: Math.round(currentData.humidity),
      unit: '%',
      status: getStatus(Math.abs(currentData.humidity - 50), { excellent: 5, good: 10, moderate: 15, poor: 20 }, true),
      trend: getTrend(currentData.humidity, historicalData.map(d => ({ ...d, co2: d.humidity }))),
      icon: <WaterDrop />,
      color: Math.abs(currentData.humidity - 50) > 15 ? theme.palette.error.main : Math.abs(currentData.humidity - 50) > 10 ? theme.palette.warning.main : theme.palette.success.main,
      threshold: { excellent: 45, good: 40, moderate: 35, poor: 30 },
      description: 'Relative humidity in the air. Optimal range is 40-60% to prevent dryness and mold growth.'
    }
  ];

  const getStatusColor = (status: IAQMetric['status']) => {
    switch (status) {
      case 'excellent': return theme.palette.success.main;
      case 'good': return theme.palette.success.light;
      case 'moderate': return theme.palette.warning.main;
      case 'poor': return theme.palette.error.light;
      case 'hazardous': return theme.palette.error.main;
      default: return theme.palette.grey[500];
    }
  };

  const handleMetricClick = (metric: IAQMetric) => {
    setSelectedMetric(metric);
    setDetailsOpen(true);
  };

  const MetricCard = ({ metric }: { metric: IAQMetric }) => (
    <Card 
      elevation={0}
      sx={{ 
        cursor: 'pointer', 
        transition: 'all 0.2s ease',
        border: `1px solid ${alpha(metric.color, 0.2)}`,
        borderRadius: 3,
        background: alpha(metric.color, 0.04),
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px ${alpha(metric.color, 0.15)}`,
          background: alpha(metric.color, 0.08),
          borderColor: alpha(metric.color, 0.3),
        },
        height: '100%'
      }}
      onClick={() => handleMetricClick(metric)}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            background: `linear-gradient(135deg, ${metric.color} 0%, ${alpha(metric.color, 0.8)} 100%)`,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40
          }}>
            {metric.icon}
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h4" fontWeight={700} color="text.primary">
              {metric.value}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              {metric.unit}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" fontWeight={600} color="text.primary">
            {metric.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {metric.trend === 'up' && <TrendingUp sx={{ fontSize: 16, color: theme.palette.error.main }} />}
            {metric.trend === 'down' && <TrendingDown sx={{ fontSize: 16, color: theme.palette.success.main }} />}
            {metric.trend === 'stable' && <Timeline sx={{ fontSize: 16, color: theme.palette.info.main }} />}
          </Box>
        </Box>
        
        <Chip
          label={metric.status}
          size="small"
          sx={{
            backgroundColor: alpha(getStatusColor(metric.status), 0.1),
            color: getStatusColor(metric.status),
            fontWeight: 600,
            fontSize: '0.7rem',
            height: 20,
            textTransform: 'capitalize'
          }}
        />
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} color="text.primary" mb={1}>
          IAQ Monitoring
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Real-time environmental quality metrics
        </Typography>
      </Box>
      
      <Grid container spacing={2}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={4} key={metric.id}>
            <MetricCard metric={metric} />
          </Grid>
        ))}
      </Grid>

      {/* Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight={600}>
            {selectedMetric?.name} Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Historical trends and analysis
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedMetric && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 3, 
                      background: alpha(selectedMetric.color, 0.1),
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}>
                      {selectedMetric.icon}
                    </Box>
                    <Typography variant="h3" fontWeight={700} color="text.primary" mb={1}>
                      {selectedMetric.value} {selectedMetric.unit}
                    </Typography>
                    <Chip
                      label={selectedMetric.status}
                      sx={{
                        backgroundColor: alpha(getStatusColor(selectedMetric.status), 0.1),
                        color: getStatusColor(selectedMetric.status),
                        fontWeight: 600,
                        textTransform: 'capitalize'
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {selectedMetric.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight={600} color="text.primary" mb={1}>
                      Status Thresholds
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="text.secondary">Excellent</Typography>
                        <Typography variant="caption" fontWeight={600} color={theme.palette.success.main}>
                          ≤ {selectedMetric.threshold.excellent}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="text.secondary">Good</Typography>
                        <Typography variant="caption" fontWeight={600} color={theme.palette.success.light}>
                          ≤ {selectedMetric.threshold.good}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="text.secondary">Moderate</Typography>
                        <Typography variant="caption" fontWeight={600} color={theme.palette.warning.main}>
                          ≤ {selectedMetric.threshold.moderate}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="text.secondary">Poor</Typography>
                        <Typography variant="caption" fontWeight={600} color={theme.palette.error.light}>
                          ≤ {selectedMetric.threshold.poor}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<Settings />}>
            Configure Alerts
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IAQWidgets;
