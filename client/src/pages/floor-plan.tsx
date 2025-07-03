import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FloorPlan from "@/components/FloorPlan";
import BookingModal from "@/components/BookingModal";
import { useQuery } from "@tanstack/react-query";
import { Building, Users, MapPin, Calendar, Maximize2 } from "lucide-react";

export default function FloorPlanPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<{
    type: string;
    id: number;
    name: string;
  } | undefined>();

  const { data: occupancy = [] } = useQuery({
    queryKey: ["/api/occupancy"],
    refetchInterval: 30000
  });

  const { data: rooms = [] } = useQuery({
    queryKey: ["/api/rooms"]
  });

  const handleResourceSelect = (type: string, id: number) => {
    if (type === 'quick-book') {
      setSelectedResource(undefined);
      setBookingModalOpen(true);
      return;
    }

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

  // Calculate stats
  const totalRooms = rooms.length;
  const totalOccupancy = occupancy.reduce((sum: number, occ: any) => sum + (occ.currentCount || 0), 0);
  const averageOccupancy = totalRooms > 0 ? Math.round((totalOccupancy / totalRooms) * 100) / 100 : 0;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Interactive Floor Plan</h1>
            <p className="text-green-100">Real-time workspace visualization and booking</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Maximize2 className="w-4 h-4 mr-2" />
              Fullscreen
            </Button>
            <Button className="bg-white text-green-600 hover:bg-green-50">
              <Calendar className="w-4 h-4 mr-2" />
              Quick Book
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="bg-white border-b px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Building className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spaces</p>
                  <p className="text-2xl font-bold text-gray-900">{totalRooms}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Occupancy</p>
                  <p className="text-2xl font-bold text-gray-900">{totalOccupancy}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Utilization</p>
                  <p className="text-2xl font-bold text-gray-900">{averageOccupancy}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Floor Plan Legend</h3>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Occupied</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Booked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span className="text-sm text-gray-600">Maintenance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floor Plan */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Card className="h-full">
          <CardContent className="p-6 h-full">
            <FloorPlan onResourceSelect={handleResourceSelect} />
          </CardContent>
        </Card>
      </main>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedResource={selectedResource}
      />
    </div>
  );
}
