import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import FloorPlan from "./FloorPlan";
import IAQWidgets from "./IAQWidgets";
import AlertsPanel from "./AlertsPanel";
import QuickBooking from "./QuickBooking";
import Analytics from "./Analytics";
import BookingModal from "./BookingModal";
import DeviceModal from "./DeviceModal";
import { Users, CalendarCheck, Leaf, Wifi } from "lucide-react";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  );
  
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<{
    type: string;
    id: number;
    name: string;
  } | undefined>();

  // Update time every minute
  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }));
    }, 60000);
    
    return () => clearInterval(timer);
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
    refetchInterval: 30000
  });

  const handleResourceSelect = (type: string, id: number) => {
    if (type === 'quick-book') {
      setSelectedResource(undefined);
      setBookingModalOpen(true);
      return;
    }

    // Map resource types to names
    let name = '';
    switch (type) {
      case 'room':
        name = `Room ${id}`;
        break;
      case 'desk':
        name = `Desk ${id}`;
        break;
      default:
        name = `Resource ${id}`;
    }

    setSelectedResource({ type, id, name });
    setBookingModalOpen(true);
  };

  const handleManageDevices = () => {
    setDeviceModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Dashboard Overview</h2>
            <p className="text-sm text-slate-500">Real-time workspace monitoring and management</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Live Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">Live</span>
            </div>
            
            {/* Current Time */}
            <div className="text-sm text-slate-600">
              <i className="fas fa-clock mr-1"></i>
              <span>{currentTime}</span>
            </div>
            
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <i className="fas fa-bell text-lg"></i>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {stats?.alerts?.count || 0}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Current Occupancy */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Current Occupancy</p>
                  <p className="text-3xl font-bold text-slate-800">
                    {stats?.occupancy?.current || "0%"}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    <i className="fas fa-arrow-up mr-1"></i>
                    {stats?.occupancy?.change || "+0% from yesterday"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="text-primary" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Bookings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Active Bookings</p>
                  <p className="text-3xl font-bold text-slate-800">
                    {stats?.bookings?.active || 0}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    {stats?.bookings?.pending || 0} pending
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <CalendarCheck className="text-green-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Air Quality */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Avg Air Quality</p>
                  <p className="text-3xl font-bold text-slate-800">
                    {stats?.airQuality?.average || "Good"}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    {stats?.airQuality?.co2 || "0 ppm CO₂"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Leaf className="text-green-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Devices Online */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Devices Online</p>
                  <p className="text-3xl font-bold text-slate-800">
                    {stats?.devices?.online || "0/0"}
                  </p>
                  <p className="text-sm text-yellow-600 mt-1">
                    <i className="fas fa-exclamation-triangle mr-1"></i>
                    {stats?.devices?.offline || 0} offline
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <Wifi className="text-yellow-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Floor Plan and IAQ */}
          <div className="lg:col-span-2 space-y-8">
            <FloorPlan onResourceSelect={handleResourceSelect} />
            <IAQWidgets />
          </div>

          {/* Right Column: Alerts, Bookings, Analytics */}
          <div className="space-y-8">
            <AlertsPanel />
            <QuickBooking />
            <Analytics />
          </div>
        </div>

        {/* Device Status Footer */}
        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Device Status</h3>
                <Button 
                  variant="link" 
                  className="text-primary"
                  onClick={handleManageDevices}
                >
                  Manage Devices
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-thermometer-half text-green-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">IAQ-001</p>
                    <p className="text-xs text-green-600">Online</p>
                    <p className="text-xs text-slate-500">Conference A</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-wifi text-yellow-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">NFC-002</p>
                    <p className="text-xs text-yellow-600">Offline</p>
                    <p className="text-xs text-slate-500">Desk Area</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-id-card text-green-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Badge Reader</p>
                    <p className="text-xs text-green-600">Online</p>
                    <p className="text-xs text-slate-500">Main Entrance</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-video text-green-500"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Occupancy Sensor</p>
                    <p className="text-xs text-green-600">Online</p>
                    <p className="text-xs text-slate-500">Conference B</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedResource={selectedResource}
      />
      
      <DeviceModal
        isOpen={deviceModalOpen}
        onClose={() => setDeviceModalOpen(false)}
      />
    </div>
  );
}
