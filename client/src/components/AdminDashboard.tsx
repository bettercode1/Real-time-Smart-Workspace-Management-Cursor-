import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building, Wifi, Shield, Settings, BarChart3, AlertTriangle, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-blue-100">Welcome back, {user?.firstName || 'Administrator'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">124</p>
                  <p className="text-xs text-green-600 mt-1">+12% this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Building className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Rooms</p>
                  <p className="text-2xl font-bold text-gray-900">9</p>
                  <p className="text-xs text-gray-500 mt-1">All systems operational</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                  <p className="text-xs text-blue-600 mt-1">6 pending approval</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                  <Wifi className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">IoT Devices</p>
                  <p className="text-2xl font-bold text-gray-900">27/30</p>
                  <p className="text-xs text-yellow-600 mt-1">3 offline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span>User Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Active Users</p>
                    <p className="text-sm text-gray-600">Currently logged in: 42</p>
                  </div>
                  <Button size="sm" variant="outline">View All</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Permissions</p>
                    <p className="text-sm text-gray-600">Manage user roles and access</p>
                  </div>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
                <Button className="w-full">Add New User</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0 bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-green-600" />
                </div>
                <span>System Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Room Settings</p>
                    <p className="text-sm text-gray-600">Configure capacity and features</p>
                  </div>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">IoT Devices</p>
                    <p className="text-sm text-gray-600">Monitor and configure sensors</p>
                  </div>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
                <Button className="w-full">System Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="shadow-sm border-0 bg-white mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <span>System Health Monitor</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <p className="font-medium text-gray-900">Database</p>
                <p className="text-sm text-green-600">Online</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <p className="font-medium text-gray-900">API Services</p>
                <p className="text-sm text-green-600">Running</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
                <p className="font-medium text-gray-900">IoT Network</p>
                <p className="text-sm text-yellow-600">Partial</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <p className="font-medium text-gray-900">Authentication</p>
                <p className="text-sm text-green-600">Secure</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-orange-600" />
              </div>
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-16 text-left justify-start" variant="outline">
                <div>
                  <p className="font-medium">Generate Report</p>
                  <p className="text-sm text-gray-600">Export system analytics</p>
                </div>
              </Button>
              <Button className="h-16 text-left justify-start" variant="outline">
                <div>
                  <p className="font-medium">Backup Data</p>
                  <p className="text-sm text-gray-600">Create system backup</p>
                </div>
              </Button>
              <Button className="h-16 text-left justify-start" variant="outline">
                <div>
                  <p className="font-medium">System Maintenance</p>
                  <p className="text-sm text-gray-600">Schedule maintenance</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}