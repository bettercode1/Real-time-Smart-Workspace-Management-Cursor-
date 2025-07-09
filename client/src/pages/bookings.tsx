import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import BookingCalendar from "@/components/BookingCalendar";
import QuickBooking from "@/components/QuickBooking";
import UserSummary from "@/components/UserSummary";
import PageContainer from "@/components/PageContainer";

export default function BookingsPage() {
  return (
    <PageContainer
      title="Room & Desk Booking"
      description="Manage your workspace reservations and check availability"
    >
      <Grid container spacing={3}>
        {/* Main Booking Calendar */}
        <Grid item xs={12} lg={8}>
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              backgroundColor: 'background.paper',
              minHeight: '70vh'
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Booking Calendar
            </Typography>
            <BookingCalendar />
          </Paper>
        </Grid>

        {/* Sidebar - Quick Booking & Summary */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Quick Booking */}
            <Grid item xs={12}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  backgroundColor: 'background.paper' 
                }}
              >
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Quick Booking
                </Typography>
                <QuickBooking />
              </Paper>
            </Grid>

            {/* User Summary */}
            <Grid item xs={12}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  backgroundColor: 'background.paper' 
                }}
              >
                <UserSummary />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
}