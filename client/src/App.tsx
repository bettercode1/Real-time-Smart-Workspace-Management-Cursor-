import React, { useState } from "react";
import { Router, Route, Switch, Redirect } from "wouter";
import { ThemeProvider, CssBaseline, Box, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SettingsProvider, useSettings } from "@/contexts/SettingsContext";
import { lightTheme, darkTheme } from "@/theme";
import Layout from "@/components/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import AdminRoute from "@/components/AdminRoute";

// Import pages
import Dashboard from "@/pages/dashboard";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import Login from "@/pages/login";
import FloorPlanPage from "@/pages/floor-plan";
import BookingsPage from "@/pages/bookings";
import AnalyticsPage from "@/pages/analytics";
import AlertsPage from "@/pages/alerts";
import SettingsPage from "@/pages/settings";
import NotFoundPage from "@/pages/not-found";
import DevicesPage from "@/pages/devices";
import RoomSetupPage from "@/pages/room-setup";
import UserManagementPage from "@/pages/user-management";
import IAQMonitoringPage from "@/pages/iaq-monitoring";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const AppRoutes = () => {
  const { isAuthenticated, loading, user } = useAuth();
  
  if (loading) {
    return <LoadingSpinner variant="fullscreen" message="SmartSpace Loading..." size={80} />;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Layout>
      <Switch>
        {/* Default dashboard route based on user role */}
        <Route path="/dashboard">
          {user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
        </Route>
        
        {/* Admin-specific routes with protection */}
        <Route path="/admin">
          <AdminRoute><AdminDashboard /></AdminRoute>
        </Route>
        <Route path="/devices">
          <AdminRoute><DevicesPage /></AdminRoute>
        </Route>
        <Route path="/users">
          <AdminRoute><UserManagementPage /></AdminRoute>
        </Route>
        <Route path="/rooms">
          <AdminRoute><RoomSetupPage /></AdminRoute>
        </Route>
        <Route path="/iaq">
          <AdminRoute><IAQMonitoringPage /></AdminRoute>
        </Route>
        <Route path="/analytics">
          <AdminRoute><AnalyticsPage /></AdminRoute>
        </Route>
        
        {/* Common routes for both admin and users */}
        <Route path="/floor-plan" component={FloorPlanPage} />
        <Route path="/bookings" component={BookingsPage} />
        <Route path="/alerts" component={AlertsPage} />
        <Route path="/settings">
          <SettingsPage />
        </Route>
        
        {/* Redirects */}
        <Route path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Layout>
  );
};

const ThemedApp = () => {
  const { themeMode } = useSettings();
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default function App() {
  return (
    <SettingsProvider>
      <ThemedApp />
    </SettingsProvider>
  );
}
