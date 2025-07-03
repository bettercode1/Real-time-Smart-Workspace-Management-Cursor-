import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Thermometer, 
  Activity,
  BookOpen,
  Home,
  User,
  Badge as BadgeIcon
} from "lucide-react";

export default function UserDashboard() {
  const { user } = useAuth();
  
  const { data: todayBookings = [] } = useQuery({
    queryKey: ['/api/bookings/today'],
    queryFn: getQueryFn({ on401: "throw" })
  });

  const { data: iaqData = [] } = useQuery({
    queryKey: ['/api/iaq'],
    queryFn: getQueryFn({ on401: "throw" })
  });

  const { data: occupancy = [] } = useQuery({
    queryKey: ['/api/occupancy'],
    queryFn: getQueryFn({ on401: "throw" })
  });

  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: getQueryFn({ on401: "throw" })
  });

  const userBookings = todayBookings.filter((booking: any) => booking.userId === user?.id);
  const currentBooking = userBookings.find((booking: any) => booking.status === 'active');
  const upcomingBookings = userBookings.filter((booking: any) => booking.status === 'pending');

  const quickStats = [
    {
      title: "My Bookings Today",
      value: userBookings.length.toString(),
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-blue-500"
    },
    {
      title: "Active Booking",
      value: currentBooking ? "1" : "0",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-green-500"
    },
    {
      title: "Upcoming",
      value: upcomingBookings.length.toString(),
      icon: <Clock className="h-5 w-5" />,
      color: "bg-orange-500"
    },
    {
      title: "Current Occupancy",
      value: stats?.occupancy?.current || "0%",
      icon: <Home className="h-5 w-5" />,
      color: "bg-purple-500"
    }
  ];

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getEnvironmentalStatus = (value: number, type: string) => {
    if (type === 'temperature') {
      if (value < 18 || value > 26) return { status: 'warning', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
      return { status: 'good', color: 'bg-green-50 text-green-700 border-green-200' };
    }
    if (type === 'co2') {
      if (value > 1000) return { status: 'poor', color: 'bg-red-50 text-red-700 border-red-200' };
      if (value > 800) return { status: 'fair', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
      return { status: 'good', color: 'bg-green-50 text-green-700 border-green-200' };
    }
    if (type === 'humidity') {
      if (value < 30 || value > 70) return { status: 'warning', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
      return { status: 'good', color: 'bg-green-50 text-green-700 border-green-200' };
    }
    return { status: 'good', color: 'bg-green-50 text-green-700 border-green-200' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome back, {user?.firstName || user?.username}!
          </h1>
          <p className="text-slate-600">Your workspace dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <User className="h-3 w-3 mr-1" />
            {user?.role === 'manager' ? 'Manager' : 'User'}
          </Badge>
          {user?.department && (
            <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
              {user.department}
            </Badge>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full text-white ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Booking Status */}
      {currentBooking && (
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              Active Booking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">
                  {currentBooking.resourceType === 'room' ? 'Conference Room' : 'Desk'} #{currentBooking.resourceId}
                </p>
                <p className="text-slate-600">
                  {formatTime(currentBooking.startTime)} - {formatTime(currentBooking.endTime)}
                </p>
                <p className="text-sm text-slate-500">
                  Purpose: {currentBooking.purpose || 'General use'}
                </p>
              </div>
              <div className="text-right">
                <Badge className="bg-green-500 text-white">
                  Active
                </Badge>
                <p className="text-sm text-slate-600 mt-1">
                  Badge: {user?.badgeId}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userBookings.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No bookings for today</p>
                  <Button className="mt-3" size="sm">
                    Make a Booking
                  </Button>
                </div>
              ) : (
                userBookings.map((booking: any) => (
                  <div key={booking.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      booking.status === 'active' ? 'bg-green-500' : 
                      booking.status === 'pending' ? 'bg-yellow-500' : 
                      'bg-gray-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">
                        {booking.resourceType === 'room' ? 'Room' : 'Desk'} #{booking.resourceId}
                      </p>
                      <p className="text-sm text-slate-600">
                        {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {booking.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Environmental Quality */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Environmental Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {iaqData.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">
                  No environmental data available
                </p>
              ) : (
                iaqData.slice(0, 3).map((data: any) => (
                  <div key={data.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Temperature</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{data.temperature}°C</span>
                        <Badge variant="outline" className={getEnvironmentalStatus(data.temperature, 'temperature').color}>
                          {getEnvironmentalStatus(data.temperature, 'temperature').status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CO₂ Level</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{data.co2} ppm</span>
                        <Badge variant="outline" className={getEnvironmentalStatus(data.co2, 'co2').color}>
                          {getEnvironmentalStatus(data.co2, 'co2').status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Humidity</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{data.humidity}%</span>
                        <Badge variant="outline" className={getEnvironmentalStatus(data.humidity, 'humidity').color}>
                          {getEnvironmentalStatus(data.humidity, 'humidity').status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-3 text-blue-500" />
            <h3 className="font-semibold text-slate-800">Book a Room</h3>
            <p className="text-sm text-slate-600">Reserve meeting spaces</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Home className="h-8 w-8 mx-auto mb-3 text-green-500" />
            <h3 className="font-semibold text-slate-800">Find a Desk</h3>
            <p className="text-sm text-slate-600">Locate available workspaces</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Activity className="h-8 w-8 mx-auto mb-3 text-purple-500" />
            <h3 className="font-semibold text-slate-800">Check-In</h3>
            <p className="text-sm text-slate-600">NFC badge check-in</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}