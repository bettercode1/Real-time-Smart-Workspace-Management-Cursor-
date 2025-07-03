import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Building, 
  Monitor,
  Activity,
  BarChart3,
  PieChart
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Booking, Room, Occupancy } from "@shared/schema";

export default function AnalyticsPage() {
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ['/api/bookings'],
  });

  const { data: rooms = [], isLoading: roomsLoading } = useQuery<Room[]>({
    queryKey: ['/api/rooms'],
  });

  const { data: occupancy = [], isLoading: occupancyLoading } = useQuery<Occupancy[]>({
    queryKey: ['/api/occupancy'],
  });

  // Calculate analytics data
  const totalBookings = bookings.length;
  const activeBookings = bookings.filter((b) => b.status === 'active').length;
  const completedBookings = bookings.filter((b) => b.status === 'completed').length;
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled').length;
  
  const utilizationRate = totalBookings > 0 ? Math.round((completedBookings / totalBookings) * 100) : 0;
  const checkInRate = totalBookings > 0 ? Math.round(((activeBookings + completedBookings) / totalBookings) * 100) : 0;
  const totalOccupancy = occupancy.reduce((sum, occ) => sum + (occ.currentCount || 0), 0);

  // Room utilization data
  const roomData = rooms.map((room) => {
    const roomBookings = bookings.filter((b) => b.resourceType === 'room' && b.resourceId === room.id);
    return {
      name: room.name,
      bookings: roomBookings.length,
      utilization: room.capacity > 0 ? Math.round((roomBookings.length / room.capacity) * 100) : 0,
    };
  });

  // Status distribution data
  const statusData = [
    { name: 'Completed', value: completedBookings, color: '#10b981' },
    { name: 'Active', value: activeBookings, color: '#3b82f6' },
    { name: 'Cancelled', value: cancelledBookings, color: '#ef4444' },
  ];

  // Weekly booking trend (mock data for demonstration)
  const weeklyData = [
    { day: 'Mon', bookings: 12, occupancy: 85 },
    { day: 'Tue', bookings: 19, occupancy: 92 },
    { day: 'Wed', bookings: 15, occupancy: 78 },
    { day: 'Thu', bookings: 22, occupancy: 95 },
    { day: 'Fri', bookings: 18, occupancy: 87 },
    { day: 'Sat', bookings: 8, occupancy: 45 },
    { day: 'Sun', bookings: 5, occupancy: 32 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b'];

  if (bookingsLoading || roomsLoading || occupancyLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-blue-100">Insights and performance metrics</p>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-8 h-8" />
          </div>
        </div>
      </header>

      {/* Key Metrics */}
      <div className="bg-white border-b px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Utilization Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{utilizationRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Check-in Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{checkInRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Occupancy</p>
                  <p className="text-2xl font-bold text-gray-900">{totalOccupancy}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="utilization" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Room Utilization
              </TabsTrigger>
              <TabsTrigger 
                value="trends" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Trends
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Booking Status Distribution */}
              <Card className="shadow-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <PieChart className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Booking Status Distribution</CardTitle>
                      <p className="text-sm text-gray-600">Current booking statuses</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center space-x-4 mt-4">
                    {statusData.map((item) => (
                      <div key={item.name} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-600">
                          {item.name}: {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="shadow-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                      <p className="text-sm text-gray-600">Key performance indicators</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium">Completed Bookings</span>
                      </div>
                      <Badge variant="default">{completedBookings}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Active Bookings</span>
                      </div>
                      <Badge variant="secondary">{activeBookings}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="font-medium">Cancelled Bookings</span>
                      </div>
                      <Badge variant="destructive">{cancelledBookings}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Building className="w-5 h-5 text-purple-600" />
                        <span className="font-medium">Total Rooms</span>
                      </div>
                      <Badge variant="outline">{rooms.length}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="utilization" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Room Utilization</CardTitle>
                    <p className="text-sm text-gray-600">Booking rates by room</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roomData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Weekly Trends</CardTitle>
                    <p className="text-sm text-gray-600">Booking and occupancy trends</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="bookings" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Bookings"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="occupancy" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Occupancy %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}