import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/pages/dashboard";
import FloorPlan from "@/pages/floor-plan";
import Bookings from "@/pages/bookings";
import Analytics from "@/pages/analytics";
import Alerts from "@/pages/alerts";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/floor-plan" component={FloorPlan} />
        <Route path="/bookings" component={Bookings} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
