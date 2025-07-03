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
      <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-indigo-100">Complete system overview and management</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-indigo-100">Live</span>
            </div>
            <div className="text-sm text-indigo-100">{currentTime}</div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <CalendarCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Rooms</p>
                  <p className="text-2xl font-bold text-gray-900">9</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Leaf className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Air Quality</p>
                  <p className="text-2xl font-bold text-gray-900">Good</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <Wifi className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Devices Online</p>
                  <p className="text-2xl font-bold text-gray-900">12/15</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health Section */}
        <div className="mb-8">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
                  <p className="text-sm text-gray-600">Real-time system status monitoring</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Database Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Online</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">API Services</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Running</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">IoT Connectivity</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Partial</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Current Occupancy</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">42 People</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Administration Tools Section */}
        <div className="mb-8">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Administration Tools</h2>
                  <p className="text-sm text-gray-600">Manage system components and resources</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
                      <p className="text-sm text-gray-600 mb-4">Manage user accounts and permissions</p>
                      <Button size="sm" className="w-full">
                        Manage Users
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">Monitor Resources</h3>
                      <p className="text-sm text-gray-600 mb-4">Real-time system monitoring</p>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={handleManageDevices}
                      >
                        Monitor System
                      </Button>
                    </div>
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
