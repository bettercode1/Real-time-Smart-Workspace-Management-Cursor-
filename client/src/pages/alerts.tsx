import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Alert, Room } from "@shared/schema";
import { AlertTriangle, Users, Clock, Wifi, X, Search, Filter } from "lucide-react";
import { useState } from "react";

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  
  const queryClient = useQueryClient();

  const { data: alerts = [] } = useQuery<Alert[]>({
    queryKey: ["/api/alerts"],
    refetchInterval: 10000 // Refresh every 10 seconds
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
      case 'high_co2': return <AlertTriangle className="text-red-500" size={20} />;
      case 'over_capacity': return <Users className="text-orange-500" size={20} />;
      case 'no_show': return <Clock className="text-slate-500" size={20} />;
      case 'device_offline': return <Wifi className="text-yellow-500" size={20} />;
      default: return <AlertTriangle className="text-slate-500" size={20} />;
    }
  };

  const getAlertBackground = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'high': return 'bg-orange-50 border-orange-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'low': return 'bg-slate-50 border-slate-200';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getRoomName = (roomId: number | null) => {
    if (!roomId) return 'System';
    const room = rooms.find(r => r.id === roomId);
    return room?.name || `Room ${roomId}`;
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

  const handleResolveAlert = (alertId: number) => {
    resolveAlertMutation.mutate(alertId);
  };

  // Filter alerts based on search and filters
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = searchTerm === "" || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getRoomName(alert.roomId).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === "" || alert.severity === severityFilter;
    const matchesType = typeFilter === "" || alert.type === typeFilter;
    
    return matchesSearch && matchesSeverity && matchesType;
  });

  const activeAlerts = filteredAlerts.filter(alert => !alert.isResolved);
  const resolvedAlerts = filteredAlerts.filter(alert => alert.isResolved);

  const alertTypes = [...new Set(alerts.map(alert => alert.type))];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Alerts & Notifications</h2>
            <p className="text-sm text-slate-500">Monitor and manage system alerts</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="destructive" className="text-sm">
              {activeAlerts.length} Active
            </Badge>
            <Badge variant="outline" className="text-sm">
              {resolvedAlerts.length} Resolved
            </Badge>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  <Input
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Severity" />
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
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {alertTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSeverityFilter("");
                    setTypeFilter("");
                  }}
                >
                  <Filter size={16} className="mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Active Alerts ({activeAlerts.length})</span>
              {activeAlerts.length > 0 && (
                <Button variant="outline" size="sm">
                  Resolve All
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeAlerts.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <AlertTriangle size={48} className="mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium">No active alerts</p>
                <p className="text-sm">All systems are operating normally</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start space-x-4 p-4 ${getAlertBackground(alert.severity)} border rounded-lg`}
                  >
                    <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center flex-shrink-0">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-800">{alert.title}</h4>
                          <p className="text-sm text-slate-600 mt-1">{alert.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant={getSeverityVariant(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            <span className="text-xs text-slate-500">
                              {getRoomName(alert.roomId)}
                            </span>
                            <span className="text-xs text-slate-500">
                              {formatDateTime(alert.createdAt)}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResolveAlert(alert.id)}
                          disabled={resolveAlertMutation.isPending}
                        >
                          <X size={14} className="mr-1" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Resolved Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Resolved Alerts ({resolvedAlerts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {resolvedAlerts.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No resolved alerts</p>
              </div>
            ) : (
              <div className="space-y-3">
                {resolvedAlerts.slice(0, 10).map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg opacity-75"
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-slate-700">{alert.title}</h5>
                      <p className="text-xs text-slate-500">{alert.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">Resolved</Badge>
                      <p className="text-xs text-slate-500">
                        {alert.resolvedAt && formatDateTime(alert.resolvedAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
