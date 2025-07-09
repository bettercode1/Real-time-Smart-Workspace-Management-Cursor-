import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Rating,
  Stack,
  useTheme,
  alpha
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

export default function Suggestions() {
  const theme = useTheme();
  
  const suggestions = [
    {
      room: "Meeting Room 2",
      reason: "Less crowded during your preferred time",
      confidence: 85,
      features: ["Quiet", "Available"],
      icon: <AccessTimeIcon fontSize="small" />,
      color: theme.palette.primary.main
    },
    {
      room: "Desk C",
      reason: "Similar users prefer this location",
      confidence: 78,
      features: ["Collaborative", "Good lighting"],
      icon: <GroupIcon fontSize="small" />,
      color: theme.palette.success.main
    },
    {
      room: "Open Space",
      reason: "High productivity area for your role",
      confidence: 92,
      features: ["Popular", "Productive"],
      icon: <TrendingUpIcon fontSize="small" />,
      color: theme.palette.warning.main
    },
  ];

  return (
    <Card elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ 
          p: 1, 
          borderRadius: 2, 
          background: alpha(theme.palette.secondary.main, 0.1),
          color: theme.palette.secondary.main,
          mr: 1.5
        }}>
          <SmartToyIcon sx={{ fontSize: 20 }} />
        </Box>
        <Typography variant="h6" fontWeight={600} color="text.primary">
          AI Suggestions
        </Typography>
      </Box>

      <Stack spacing={2} sx={{ maxHeight: 280, overflowY: "auto" }}>
        {suggestions.map((suggestion, idx) => (
          <Card 
            key={idx} 
            elevation={0}
            sx={{ 
              background: alpha(suggestion.color, 0.04),
              border: `1px solid ${alpha(suggestion.color, 0.1)}`,
              borderRadius: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                background: alpha(suggestion.color, 0.08),
                borderColor: alpha(suggestion.color, 0.2),
                transform: 'translateY(-1px)',
              }
            }}
          >
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ 
                    p: 0.5, 
                    borderRadius: 1, 
                    background: alpha(suggestion.color, 0.1),
                    color: suggestion.color,
                    mr: 1
                  }}>
                    {suggestion.icon}
                  </Box>
                  <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                    {suggestion.room}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LightbulbIcon sx={{ fontSize: 16, color: suggestion.color }} />
                  <Typography variant="caption" fontWeight={600} color={suggestion.color}>
                    {suggestion.confidence}%
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" mb={1.5} sx={{ lineHeight: 1.4 }}>
                {suggestion.reason}
              </Typography>

              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 1 }}>
                {suggestion.features.map((feature) => (
                  <Chip
                    key={feature}
                    label={feature}
                    size="small"
                    sx={{
                      backgroundColor: alpha(suggestion.color, 0.1),
                      color: suggestion.color,
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: 20,
                      border: `1px solid ${alpha(suggestion.color, 0.2)}`
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating
                  value={suggestion.confidence / 20}
                  precision={0.1}
                  size="small"
                  readOnly
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: suggestion.color,
                    },
                    '& .MuiRating-iconHover': {
                      color: suggestion.color,
                    }
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  confidence match
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Card>
  );
} 