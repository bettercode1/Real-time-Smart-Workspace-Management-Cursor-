import React, { useState } from "react";
import { Router, Route, Switch, Redirect } from "wouter";
import { ThemeProvider, CssBaseline, Box, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { lightTheme, darkTheme } from "@/lib/theme";
import Layout from "@/components/Layout";

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

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const AppRoutes = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
  const { isAuthenticated, loading, user } = useAuth();
  
  if (loading) {
    return (
      <Box sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <Box sx={{ 
          textAlign: 'center',
          p: 4,
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <Typography variant="h5" fontWeight={700} color="primary.main" mb={2}>
            SmartSpace Loading...
          </Typography>
          <Box sx={{ 
            width: 40, 
            height: 4, 
            backgroundColor: 'primary.main', 
            borderRadius: 2,
            mx: 'auto',
            animation: 'pulse 2s ease-in-out infinite alternate'
          }} />
        </Box>
      </Box>
    );
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
        
        {/* Admin-specific routes */}
        {user?.role === 'admin' && (
          <>
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/devices" component={DevicesPage} />
            <Route path="/users" component={UserManagementPage} />
            <Route path="/rooms" component={RoomSetupPage} />
            <Route path="/iaq">
              <div>IAQ Monitoring (TODO)</div>
            </Route>
          </>
        )}
        
        {/* Common routes for both admin and users */}
        <Route path="/floor-plan" component={FloorPlanPage} />
        <Route path="/bookings" component={BookingsPage} />
        <Route path="/analytics" component={AnalyticsPage} />
        <Route path="/alerts" component={AlertsPage} />
        <Route path="/settings" component={SettingsPage} />
        
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

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </Router>
      </AuthProvider>
    </ThemeProvider>
    </QueryClientProvider>
  );
}
