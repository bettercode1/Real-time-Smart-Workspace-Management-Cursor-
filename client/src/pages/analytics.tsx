import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Room, Booking, Occupancy } from "@shared/schema";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, Calendar, Activity, BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  const { data: rooms = [] } = useQuery<Room[]>({
    queryKey: ["/api/rooms"]
  });

  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"]
  });

  const { data: occupancy = [] } = useQuery<Occupancy[]>({
    queryKey: ["/api/occupancy"]
  });

  // Calculate room utilization data for charts
  const roomUtilizationData = rooms.map(room => {
    const occ = occupancy.find(o => o.roomId === room.id);
    const utilization = occ ? Math.round((occ.currentCount / room.capacity) * 100) : 0;
    
    return {
      name: room.name,
      utilization,
      capacity: room.capacity,
      current: occ?.currentCount || 0
    };
  });

  // Booking status distribution
  const bookingStatusData = [
    { name: 'Active', value: bookings.filter(b => b.status === 'active').length, color: '#10B981' },
    { name: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: '#F59E0B' },
    { name: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: '#6B7280' },
    { name: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: '#EF4444' },
  ];

  // Resource type distribution
  const resourceTypeData = [
    { name: 'Rooms', value: bookings.filter(b => b.resourceType === 'room').length, color: '#3B82F6' },
    { name: 'Desks', value: bookings.filter(b => b.resourceType === 'desk').length, color: '#8B5CF6' },
  ];

  // Calculate overall stats
  const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
  const totalOccupied = occupancy.reduce((sum, occ) => sum + occ.currentCount, 0);
  const overallUtilization = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

  const totalBookings = bookings.length;
  const usedBookings = bookings.filter(b => b.checkedIn || b.status === 'active').length;
  const bookingEfficiency = totalBookings > 0 ? Math.round((usedBookings / totalBookings) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <BarChart3 className="text-primary" size={28} />
              Analytics Dashboard
            </h2>
            <p className="text-slate-600 mt-1">Real-time workspace insights and utilization metrics</p>
          </div>
          <Badge variant="outline" className="text-sm">
            Live Data
          </Badge>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Overall Utilization</p>
                  <p className="text-3xl font-bold text-slate-800">{overallUtilization}%</p>
                  <p className="text-sm text-slate-600 flex items-center gap-1">
                    <Users size={14} />
                    {totalOccupied}/{totalCapacity} spaces
                  </p>
                </div>
                <div className={`p-3 rounded-full ${overallUtilization > 80 ? 'bg-red-100' : overallUtilization > 60 ? 'bg-yellow-100' : 'bg-green-100'}`}>
                  <Activity className={`${overallUtilization > 80 ? 'text-red-600' : overallUtilization > 60 ? 'text-yellow-600' : 'text-green-600'}`} size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Booking Efficiency</p>
                  <p className="text-3xl font-bold text-slate-800">{bookingEfficiency}%</p>
                  <p className="text-sm text-slate-600 flex items-center gap-1">
                    <Calendar size={14} />
                    {usedBookings}/{totalBookings} used
                  </p>
                </div>
                <div className={`p-3 rounded-full ${bookingEfficiency > 80 ? 'bg-green-100' : bookingEfficiency > 60 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                  {bookingEfficiency > 70 ? (
                    <TrendingUp className="text-green-600" size={24} />
                  ) : (
                    <TrendingDown className="text-red-600" size={24} />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Total Rooms</p>
                  <p className="text-3xl font-bold text-slate-800">{rooms.length}</p>
                  <p className="text-sm text-slate-600">Available spaces</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <BarChart3 className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Total Bookings</p>
                  <p className="text-3xl font-bold text-slate-800">{totalBookings}</p>
                  <p className="text-sm text-slate-600">All time</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <Calendar className="text-purple-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Room Utilization Chart */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="text-blue-600" size={20} />
                Room Utilization
              </CardTitle>
              <p className="text-sm text-slate-500">Current occupancy by room</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={roomUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="utilization" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Booking Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Status</CardTitle>
              <p className="text-sm text-slate-500">Distribution of booking statuses</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {bookingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center mt-4 space-x-4">
                {bookingStatusData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-slate-600">{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resource Usage Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Room Statistics</CardTitle>
            <p className="text-sm text-slate-500">Comprehensive room utilization data</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Room</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Capacity</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Current</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Utilization</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Bookings Today</th>
                  </tr>
                </thead>
                <tbody>
                  {roomUtilizationData.map((room, index) => {
                    const roomBookings = bookings.filter(b => 
                      b.resourceType === 'room' && 
                      b.resourceId === rooms[index]?.id &&
                      new Date(b.startTime).toDateString() === new Date().toDateString()
                    ).length;
                    
                    return (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="py-3 px-4 font-medium">{room.name}</td>
                        <td className="py-3 px-4 capitalize">{rooms[index]?.type}</td>
                        <td className="py-3 px-4">{room.capacity}</td>
                        <td className="py-3 px-4">{room.current}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${room.utilization}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{room.utilization}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{roomBookings}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
