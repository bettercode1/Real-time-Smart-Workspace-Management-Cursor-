import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Booking } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Zap } from "lucide-react";

export default function QuickBooking() {
  const [resourceType, setResourceType] = useState<string>("");
  const [duration, setDuration] = useState<string>("60");
  const [badgeId, setBadgeId] = useState<string>("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: todayBookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/bookings/today"]
  });

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      return apiRequest("POST", "/api/bookings", bookingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking Created",
        description: "Your quick booking has been confirmed.",
      });
      // Reset form
      setResourceType("");
      setDuration("60");
      setBadgeId("");
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Unable to create booking. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resourceType || !badgeId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const now = new Date();
    const startTime = new Date(now.getTime() + 5 * 60000); // Start in 5 minutes
    const endTime = new Date(startTime.getTime() + parseInt(duration) * 60000);

    // For demo purposes, use room ID 1 for conference, desk ID 1 for desk
    const resourceId = resourceType === "conference" ? 1 : resourceType === "desk" ? 1 : 4;

    const bookingData = {
      userId: 1, // Demo user ID
      resourceType: resourceType === "conference" ? "room" : resourceType,
      resourceId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      status: "pending"
    };

    createBookingMutation.mutate(bookingData);
  };

  const getBookingStatus = (booking: Booking) => {
    switch (booking.status) {
      case 'active': return { label: 'Active', color: 'text-green-600' };
      case 'pending': return { label: 'Pending', color: 'text-yellow-600' };
      case 'completed': return { label: 'Completed', color: 'text-slate-600' };
      case 'cancelled': return { label: 'Cancelled', color: 'text-red-600' };
      default: return { label: booking.status, color: 'text-slate-600' };
    }
  };

  const formatBookingTime = (start: Date, end: Date) => {
    const startTime = new Date(start).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    const endTime = new Date(end).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    return `${startTime}-${endTime}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Booking</CardTitle>
        <p className="text-sm text-slate-500">Reserve spaces instantly</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="resourceType">Resource Type</Label>
            <Select value={resourceType} onValueChange={setResourceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desk">Desk</SelectItem>
                <SelectItem value="conference">Conference Room</SelectItem>
                <SelectItem value="office">Private Office</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
                <SelectItem value="240">4 hours</SelectItem>
                <SelectItem value="480">All day</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="badgeId">Badge ID</Label>
            <Input
              id="badgeId"
              type="text"
              placeholder="Scan or enter badge ID"
              value={badgeId}
              onChange={(e) => setBadgeId(e.target.value)}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={createBookingMutation.isPending}
          >
            <Zap className="mr-2" size={16} />
            {createBookingMutation.isPending ? "Booking..." : "Quick Book Now"}
          </Button>
        </form>
        
        <div className="mt-6 pt-4 border-t border-slate-200">
          <h4 className="text-sm font-medium text-slate-700 mb-3">Today's Bookings</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {todayBookings.length === 0 ? (
              <p className="text-xs text-slate-500">No bookings for today</p>
            ) : (
              todayBookings.slice(0, 5).map((booking) => {
                const status = getBookingStatus(booking);
                const resourceName = booking.resourceType === 'room' ? `Room ${booking.resourceId}` : `Desk ${booking.resourceId}`;
                
                return (
                  <div key={booking.id} className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">{resourceName}</span>
                    <span className="text-slate-500">
                      {formatBookingTime(booking.startTime, booking.endTime)}
                    </span>
                    <span className={status.color}>{status.label}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
