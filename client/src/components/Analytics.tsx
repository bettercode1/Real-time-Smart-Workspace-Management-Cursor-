import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Room, Booking, Occupancy } from "@shared/schema";

export default function Analytics() {
  const { data: rooms = [] } = useQuery<Room[]>({
    queryKey: ["/api/rooms"]
  });

  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/bookings/today"]
  });

  const { data: occupancy = [] } = useQuery<Occupancy[]>({
    queryKey: ["/api/occupancy"]
  });

  // Calculate room utilization
  const getRoomUtilization = (roomId: number) => {
    const occ = occupancy.find(o => o.roomId === roomId);
    const room = rooms.find(r => r.id === roomId);
    if (!occ || !room) return 0;
    
    return Math.round((occ.currentCount / room.capacity) * 100);
  };

  // Get top used rooms
  const topRooms = rooms
    .map(room => ({
      ...room,
      utilization: getRoomUtilization(room.id)
    }))
    .sort((a, b) => b.utilization - a.utilization)
    .slice(0, 3);

  // Calculate booking efficiency
  const totalBookings = bookings.length;
  const usedBookings = bookings.filter(b => b.checkedIn || b.status === 'active').length;
  const bookingEfficiency = totalBookings > 0 ? Math.round((usedBookings / totalBookings) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Analytics Preview</CardTitle>
            <p className="text-sm text-slate-500">Key insights at a glance</p>
          </div>
          <Button variant="link" className="text-primary">
            Full Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Top Used Rooms */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-700 mb-3">Most Used Today</h4>
          <div className="space-y-2">
            {topRooms.map((room) => (
              <div key={room.id} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{room.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${room.utilization}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-500">{room.utilization}%</span>
                </div>
              </div>
            ))}
            {topRooms.length === 0 && (
              <p className="text-sm text-slate-500">No utilization data available</p>
            )}
          </div>
        </div>
        
        {/* Booking vs Usage */}
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-3">Booking Efficiency</h4>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-600">Reserved vs Used</span>
              <span className="text-xs font-medium text-slate-800">{bookingEfficiency}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${bookingEfficiency}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {usedBookings} of {totalBookings} bookings were used today
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
