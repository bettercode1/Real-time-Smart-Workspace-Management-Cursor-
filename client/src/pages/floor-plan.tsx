import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import FloorPlan from "@/components/FloorPlan";
import IAQWidgets from "@/components/IAQWidgets";
import PageContainer from "@/components/PageContainer";

export default function FloorPlanPage() {
  return (
    <PageContainer
      title="Interactive Floor Plan"
      description="Real-time view of workspace occupancy and environment status"
    >
      <Grid container spacing={3}>
        {/* Main Floor Plan */}
        <Grid item xs={12} lg={9}>
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
            <FloorPlan />
          </Paper>
        </Grid>
        {/* IAQ Data */}
        <Grid item xs={12} lg={3}>
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
              Environment Data
            </Typography>
            <IAQWidgets />
          </Paper>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
