import React from "react";
import { Grid, Paper } from "@mui/material";
import AnalyticsCards from "@/components/AnalyticsCards";
import Analytics from "@/components/Analytics";
import PageContainer from "@/components/PageContainer";

export default function AnalyticsPage() {
  return (
    <PageContainer
      title="Analytics & Reports"
      description="Comprehensive workspace utilization and performance analytics"
    >
      <Grid container spacing={3}>
        {/* Main Analytics */}
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
            <AnalyticsCards />
          </Paper>
        </Grid>

        {/* Detailed Analytics */}
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
            <Analytics />
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}