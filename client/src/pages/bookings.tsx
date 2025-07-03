import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Booking, Room, Desk } from "@shared/schema";

export default function BookingsPage() {
  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"]
  });

  const { data: rooms = [] } = useQuery<Room[]>({
    queryKey: ["/api/rooms"]
  });

  const { data: desks = [] } = useQuery<Desk[]>({
    queryKey: ["/api/desks"]
  });

  const getResourceName = (booking: Booking) => {
    if (booking.resourceType === 'room') {
      const room = rooms.find(r => r.id === booking.resourceId);
      return room?.name || `Room ${booking.resourceId}`;
    } else {
      const desk = desks.find(d => d.id === booking.resourceId);
      return desk?.name || `Desk ${booking.resourceId}`;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      case 'no_show': return 'destructive';
      default: return 'outline';
    }
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Bookings</h2>
            <p className="text-sm text-slate-500">Manage room and desk reservations</p>
          </div>
          <Button>
            <i className="fas fa-plus mr-2"></i>New Booking
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Resource</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Start Time</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">End Time</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Check-in</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Purpose</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-slate-500">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking.id} className="border-b hover:bg-slate-50">
                        <td className="py-3 px-4">{getResourceName(booking)}</td>
                        <td className="py-3 px-4 capitalize">{booking.resourceType}</td>
                        <td className="py-3 px-4">{formatDateTime(booking.startTime)}</td>
                        <td className="py-3 px-4">{formatDateTime(booking.endTime)}</td>
                        <td className="py-3 px-4">
                          <Badge variant={getStatusVariant(booking.status)}>
                            {booking.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {booking.checkedIn ? (
                            <span className="text-green-600 text-sm">
                              ✓ {booking.checkedInAt ? formatDateTime(booking.checkedInAt) : 'Yes'}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-sm">Not checked in</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 max-w-xs truncate">
                          {booking.purpose || '-'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="destructive">Cancel</Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
