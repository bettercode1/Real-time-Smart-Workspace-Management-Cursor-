import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { IAQData, Room } from "@shared/schema";

export default function IAQWidgets() {
  const { data: rooms = [] } = useQuery<Room[]>({
    queryKey: ["/api/rooms"]
  });

  const { data: iaqData = [] } = useQuery<IAQData[]>({
    queryKey: ["/api/iaq"],
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const getAirQualityStatus = (co2: number) => {
    if (co2 < 500) return { status: 'good', color: 'bg-green-500' };
    if (co2 < 800) return { status: 'fair', color: 'bg-yellow-500' };
    return { status: 'poor', color: 'bg-red-500' };
  };

  const getRoomIAQ = (roomId: number) => {
    return iaqData.find(data => data.roomId === roomId);
  };

  // Show IAQ data for main rooms only
  const mainRooms = rooms.filter(room => 
    room.type === 'conference' || room.name === 'Open Workspace'
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Environmental Monitoring</CardTitle>
            <p className="text-sm text-slate-500">Real-time air quality and comfort metrics</p>
          </div>
          <Button variant="link" className="text-primary">
            View All <i className="fas fa-arrow-right ml-1"></i>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainRooms.map((room) => {
            const iaq = getRoomIAQ(room.id);
            const airQuality = iaq ? getAirQualityStatus(iaq.co2) : { status: 'unknown', color: 'bg-gray-500' };
            
            return (
              <div key={room.id} className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-slate-800">{room.name}</h4>
                  <div className={`w-3 h-3 ${airQuality.color} rounded-full`}></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Temperature</span>
                    <span className="text-sm font-medium text-slate-800">
                      {iaq ? `${Math.round(iaq.temperature)}°C` : '--°C'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">CO₂</span>
                    <span className={`text-sm font-medium ${
                      iaq && iaq.co2 > 800 ? 'text-orange-600' : 'text-slate-800'
                    }`}>
                      {iaq ? `${Math.round(iaq.co2)} ppm` : '-- ppm'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Humidity</span>
                    <span className="text-sm font-medium text-slate-800">
                      {iaq ? `${Math.round(iaq.humidity)}%` : '--%'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Show placeholder if no data */}
          {mainRooms.length === 0 && (
            <div className="col-span-full text-center py-8 text-slate-500">
              <p>No IAQ monitoring data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
