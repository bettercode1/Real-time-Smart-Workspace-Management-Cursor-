import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import AlertsPanel from "@/components/AlertsPanel";
import NotificationCenter from "@/components/NotificationCenter";
import IAQWidgets from "@/components/IAQWidgets";
import PageContainer from "@/components/PageContainer";

export default function AlertsPage() {
  return (
    <PageContainer
      title="Alerts & Notifications"
      description="Monitor system alerts and environmental conditions"
    >
      <Grid container spacing={3}>
        {/* Main Alerts Panel */}
        <Grid item xs={12} lg={8}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              backgroundColor: 'background.paper',
              minHeight: '70vh',
              width: '100%'
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              System Alerts
            </Typography>
            <AlertsPanel />
          </Paper>
        </Grid>

        {/* Sidebar - Notifications & IAQ */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Environmental Data */}
            <Grid item xs={12}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  width: '100%'
                }}
              >
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Environmental Monitoring
                </Typography>
                <IAQWidgets />
              </Paper>
            </Grid>

            {/* Recent Notifications */}
            <Grid item xs={12}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  width: '100%'
                }}
              >
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Recent Notifications
                </Typography>
                <NotificationCenter />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
}