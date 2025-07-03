import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Device } from "@shared/schema";
import { Thermometer, Wifi, IdCard, Video, Plus } from "lucide-react";

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeviceModal({ isOpen, onClose }: DeviceModalProps) {
  const { data: devices = [] } = useQuery<Device[]>({
    queryKey: ["/api/devices"]
  });

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'iaq': return <Thermometer size={16} />;
      case 'nfc': return <Wifi size={16} />;
      case 'badge_reader': return <IdCard size={16} />;
      case 'occupancy_sensor': return <Video size={16} />;
      default: return <Wifi size={16} />;
    }
  };

  const getStatusVariant = (isOnline: boolean) => {
    return isOnline ? "default" : "destructive";
  };

  const getStatusLabel = (isOnline: boolean) => {
    return isOnline ? "Online" : "Offline";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Device Management</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Device
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {devices.map((device) => (
                  <tr key={device.id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="text-slate-400 mr-2">
                          {getDeviceIcon(device.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{device.name}</p>
                          <p className="text-xs text-slate-500">{device.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={getStatusVariant(device.isOnline)}>
                        {getStatusLabel(device.isOnline)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="link" size="sm" className="text-primary hover:text-primary/80">
                        Configure
                      </Button>
                    </td>
                  </tr>
                ))}
                {devices.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                      No devices found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <Button className="w-full" variant="outline">
            <Plus className="mr-2" size={16} />
            Add New Device
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
