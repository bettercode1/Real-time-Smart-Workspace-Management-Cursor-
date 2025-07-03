import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Alert, Room } from "@shared/schema";
import { AlertTriangle, Users, Clock, X } from "lucide-react";

export default function AlertsPanel() {
  const queryClient = useQueryClient();

  const { data: alerts = [] } = useQuery<Alert[]>({
    queryKey: ["/api/alerts/active"],
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
      queryClient.invalidateQueries({ queryKey: ["/api/alerts/active"] });
    }
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'high_co2': return <AlertTriangle className="text-red-500" size={16} />;
      case 'over_capacity': return <Users className="text-orange-500" size={16} />;
      case 'no_show': return <Clock className="text-slate-500" size={16} />;
      case 'device_offline': return <AlertTriangle className="text-yellow-500" size={16} />;
      default: return <AlertTriangle className="text-slate-500" size={16} />;
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

  const getRoomName = (roomId: number | null) => {
    if (!roomId) return 'Unknown';
    const room = rooms.find(r => r.id === roomId);
    return room?.name || `Room ${roomId}`;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const handleDismissAlert = (alertId: number) => {
    resolveAlertMutation.mutate(alertId);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Live Alerts</CardTitle>
            <p className="text-sm text-slate-500">Recent notifications and warnings</p>
          </div>
          <Button variant="link" className="text-primary">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p>No active alerts</p>
            </div>
          ) : (
            alerts.slice(0, 5).map((alert) => (
              <div
                key={alert.id}
                className={`flex items-start space-x-3 p-3 ${getAlertBackground(alert.severity)} border rounded-lg`}
              >
                <div className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center flex-shrink-0">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{alert.title}</p>
                  <p className="text-xs text-slate-600">{alert.description}</p>
                  {alert.roomId && (
                    <p className="text-xs text-slate-500 mt-1">
                      {getRoomName(alert.roomId)}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">
                    {formatTimeAgo(new Date(alert.createdAt))}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-slate-600"
                  onClick={() => handleDismissAlert(alert.id)}
                  disabled={resolveAlertMutation.isPending}
                >
                  <X size={14} />
                </Button>
              </div>
            ))
          )}
        </div>
        
        {alerts.length > 0 && (
          <Button
            variant="ghost"
            className="w-full mt-4 text-slate-600 hover:text-slate-800 border-t border-slate-200 pt-4"
          >
            Clear All Notifications
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
