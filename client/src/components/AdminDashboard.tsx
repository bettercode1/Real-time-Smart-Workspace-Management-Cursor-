import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { 
  Users, 
  Building, 
  MonitorSpeaker, 
  Calendar, 
  AlertTriangle, 
  Activity, 
  Settings, 
  Eye,
  UserCheck,
  Shield,
  BarChart3,
  Database
} from "lucide-react";

export default function AdminDashboard() {
  const { data: users = [] } = useQuery({
    queryKey: ['/api/users'],
    queryFn: getQueryFn({ on401: "throw" })
  });

  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: getQueryFn({ on401: "throw" })
  });

  const { data: alerts = [] } = useQuery({
    queryKey: ['/api/alerts/active'],
    queryFn: getQueryFn({ on401: "throw" })
  });

  const { data: rooms = [] } = useQuery({
    queryKey: ['/api/rooms'],
    queryFn: getQueryFn({ on401: "throw" })
  });

  const { data: devices = [] } = useQuery({
    queryKey: ['/api/devices'],
    queryFn: getQueryFn({ on401: "throw" })
  });

  const adminStats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-500"
    },
    {
      title: "Active Rooms",
      value: rooms.filter((r: any) => r.isActive).length.toString(),
      icon: <Building className="h-5 w-5" />,
      color: "bg-green-500"
    },
    {
      title: "Connected Devices",
      value: devices.filter((d: any) => d.isOnline).length.toString(),
      icon: <MonitorSpeaker className="h-5 w-5" />,
      color: "bg-purple-500"
    },
    {
      title: "Active Alerts",
      value: alerts.length.toString(),
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "bg-red-500"
    }
  ];

  const adminActions = [
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: <UserCheck className="h-5 w-5" />,
      action: () => console.log("User management")
    },
    {
      title: "System Settings",
      description: "Configure system parameters",
      icon: <Settings className="h-5 w-5" />,
      action: () => console.log("System settings")
    },
    {
      title: "Monitor Resources",
      description: "Real-time system monitoring",
      icon: <Activity className="h-5 w-5" />,
      action: () => console.log("Monitor resources")
    },
    {
      title: "Security Center",
      description: "Access controls and security logs",
      icon: <Shield className="h-5 w-5" />,
      action: () => console.log("Security center")
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-600">Complete system overview and management</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <Shield className="h-3 w-3 mr-1" />
            Administrator
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
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

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database Status</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Services</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">IoT Connectivity</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  {devices.filter((d: any) => d.isOnline).length}/{devices.length} Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Occupancy</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {stats?.occupancy?.current || "0%"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">
                  No active alerts
                </p>
              ) : (
                alerts.slice(0, 3).map((alert: any) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{alert.title}</p>
                      <p className="text-xs text-slate-600">{alert.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Administration Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adminActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 justify-start hover:bg-slate-50"
                onClick={action.action}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    {action.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm text-slate-600">{action.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-3 text-blue-500" />
            <h3 className="font-semibold text-slate-800">Analytics</h3>
            <p className="text-sm text-slate-600">View detailed reports</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Database className="h-8 w-8 mx-auto mb-3 text-green-500" />
            <h3 className="font-semibold text-slate-800">Data Export</h3>
            <p className="text-sm text-slate-600">Export system data</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Eye className="h-8 w-8 mx-auto mb-3 text-purple-500" />
            <h3 className="font-semibold text-slate-800">Live Monitor</h3>
            <p className="text-sm text-slate-600">Real-time overview</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}