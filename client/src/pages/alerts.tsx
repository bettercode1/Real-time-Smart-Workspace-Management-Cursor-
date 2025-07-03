import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Alert, Room } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  Users, 
  Clock, 
  WifiOff, 
  Search, 
  X, 
  CheckCircle, 
  Info,
  Activity,
  TrendingUp
} from "lucide-react";

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  
  const queryClient = useQueryClient();

  const { data: alerts = [], isLoading } = useQuery<Alert[]>({
    queryKey: ["/api/alerts"],
    refetchInterval: 10000
  });

  const { data: rooms = [] } = useQuery<Room[]>({
    queryKey: ["/api/rooms"]
  });

  const resolveAlertMutation = useMutation({
    mutationFn: async (alertId: number) => {
      return apiRequest("PATCH", `/api/alerts/${alertId}/resolve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
    }
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'high_co2': return AlertTriangle;
      case 'over_capacity': return Users;
      case 'no_show': return Clock;
      case 'device_offline': return WifiOff;
      default: return Info;
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = !searchTerm || 
      (alert.title && alert.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alert.description && alert.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSeverity = !severityFilter || alert.severity === severityFilter;
    const matchesType = !typeFilter || alert.type === typeFilter;
    
    return matchesSearch && matchesSeverity && matchesType;
  });

  const activeAlerts = filteredAlerts.filter(alert => !alert.resolvedAt);
  const resolvedAlerts = filteredAlerts.filter(alert => alert.resolvedAt);

  const alertCounts = {
    active: activeAlerts.length,
    resolved: resolvedAlerts.length,
    critical: alerts.filter(a => a.severity === 'critical' && !a.resolvedAt).length,
    high: alerts.filter(a => a.severity === 'high' && !a.resolvedAt).length,
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading alerts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Alerts & Notifications</h1>
            <p className="text-red-100">Monitor and manage system alerts</p>
          </div>
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="bg-white border-b px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">{alertCounts.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical</p>
                  <p className="text-2xl font-bold text-gray-900">{alertCounts.critical}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <Activity className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-gray-900">{alertCounts.high}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-gray-900">{alertCounts.resolved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="high_co2">High CO₂</SelectItem>
              <SelectItem value="over_capacity">Over Capacity</SelectItem>
              <SelectItem value="no_show">No Show</SelectItem>
              <SelectItem value="device_offline">Device Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Tabs defaultValue="active" className="space-y-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger 
                value="active" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Active Alerts ({alertCounts.active})
              </TabsTrigger>
              <TabsTrigger 
                value="resolved" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Resolved ({alertCounts.resolved})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active" className="space-y-4">
            {activeAlerts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
                  <p className="text-gray-600">All systems are running normally.</p>
                </CardContent>
              </Card>
            ) : (
              activeAlerts.map((alert) => {
                const IconComponent = getAlertIcon(alert.type);
                return (
                  <Card key={alert.id} className="shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            alert.severity === 'critical' ? 'bg-red-100' : 
                            alert.severity === 'high' ? 'bg-orange-100' : 
                            alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${
                              alert.severity === 'critical' ? 'text-red-600' : 
                              alert.severity === 'high' ? 'text-orange-600' : 
                              alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                              <Badge variant={getSeverityVariant(alert.severity) as any}>
                                {alert.severity}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{alert.description}</p>
                            <p className="text-sm text-gray-500">
                              {alert.createdAt ? formatDateTime(alert.createdAt) : 'No date'}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => resolveAlertMutation.mutate(alert.id)}
                          disabled={resolveAlertMutation.isPending}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Resolve
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {resolvedAlerts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Info className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Resolved Alerts</h3>
                  <p className="text-gray-600">No alerts have been resolved yet.</p>
                </CardContent>
              </Card>
            ) : (
              resolvedAlerts.map((alert) => {
                const IconComponent = getAlertIcon(alert.type);
                return (
                  <Card key={alert.id} className="shadow-sm opacity-75">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                            <Badge variant="outline">Resolved</Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{alert.description}</p>
                          <div className="text-sm text-gray-500">
                            <p>Created: {alert.createdAt ? formatDateTime(alert.createdAt) : 'No date'}</p>
                            <p>Resolved: {alert.resolvedAt ? formatDateTime(alert.resolvedAt) : 'No date'}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}