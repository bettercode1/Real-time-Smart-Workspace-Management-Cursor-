import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Room, Device, insertRoomSchema, insertDeviceSchema } from "@shared/schema";
import { useState } from "react";
import { Building, Wifi, Bell, Users, Plus, Trash2, Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomType, setNewRoomType] = useState("");
  const [newRoomCapacity, setNewRoomCapacity] = useState("");
  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceType, setNewDeviceType] = useState("");
  const [newDeviceLocation, setNewDeviceLocation] = useState("");
  const [newDeviceRoom, setNewDeviceRoom] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: rooms = [] } = useQuery<Room[]>({
    queryKey: ["/api/rooms"]
  });

  const { data: devices = [] } = useQuery<Device[]>({
    queryKey: ["/api/devices"]
  });

  const createRoomMutation = useMutation({
    mutationFn: async (roomData: any) => {
      return apiRequest("POST", "/api/rooms", roomData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rooms"] });
      toast({
        title: "Room Created",
        description: "New room has been added successfully.",
      });
      setNewRoomName("");
      setNewRoomType("");
      setNewRoomCapacity("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create room. Please try again.",
        variant: "destructive",
      });
    }
  });

  const createDeviceMutation = useMutation({
    mutationFn: async (deviceData: any) => {
      return apiRequest("POST", "/api/devices", deviceData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/devices"] });
      toast({
        title: "Device Added",
        description: "New device has been configured successfully.",
      });
      setNewDeviceName("");
      setNewDeviceType("");
      setNewDeviceLocation("");
      setNewDeviceRoom("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add device. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRoomName || !newRoomType || !newRoomCapacity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const roomData = {
      name: newRoomName,
      type: newRoomType,
      capacity: parseInt(newRoomCapacity),
      floor: 1,
      isActive: true
    };

    createRoomMutation.mutate(roomData);
  };

  const handleCreateDevice = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newDeviceName || !newDeviceType || !newDeviceLocation) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const deviceData = {
      name: newDeviceName,
      type: newDeviceType,
      location: newDeviceLocation,
      roomId: newDeviceRoom ? parseInt(newDeviceRoom) : null,
      isOnline: true
    };

    createDeviceMutation.mutate(deviceData);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Settings</h2>
          <p className="text-sm text-slate-500">Configure workspace settings and preferences</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="rooms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rooms" className="flex items-center space-x-2">
              <Building size={16} />
              <span>Rooms</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center space-x-2">
              <Wifi size={16} />
              <span>Devices</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell size={16} />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center space-x-2">
              <SettingsIcon size={16} />
              <span>General</span>
            </TabsTrigger>
          </TabsList>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="space-y-6">
            {/* Add New Room */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Room</CardTitle>
                <p className="text-sm text-slate-500">Create a new workspace room</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateRoom} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="roomName">Room Name</Label>
                      <Input
                        id="roomName"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        placeholder="Conference Room A"
                      />
                    </div>
                    <div>
                      <Label htmlFor="roomType">Room Type</Label>
                      <Select value={newRoomType} onValueChange={setNewRoomType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conference">Conference Room</SelectItem>
                          <SelectItem value="office">Private Office</SelectItem>
                          <SelectItem value="common">Common Area</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="roomCapacity">Capacity</Label>
                      <Input
                        id="roomCapacity"
                        type="number"
                        value={newRoomCapacity}
                        onChange={(e) => setNewRoomCapacity(e.target.value)}
                        placeholder="8"
                        min="1"
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={createRoomMutation.isPending}>
                    <Plus size={16} className="mr-2" />
                    {createRoomMutation.isPending ? "Creating..." : "Add Room"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Existing Rooms */}
            <Card>
              <CardHeader>
                <CardTitle>Existing Rooms</CardTitle>
                <p className="text-sm text-slate-500">Manage workspace rooms</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Capacity</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Floor</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.map((room) => (
                        <tr key={room.id} className="border-b hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium">{room.name}</td>
                          <td className="py-3 px-4 capitalize">{room.type}</td>
                          <td className="py-3 px-4">{room.capacity}</td>
                          <td className="py-3 px-4">{room.floor}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              room.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {room.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="destructive">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices" className="space-y-6">
            {/* Add New Device */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Device</CardTitle>
                <p className="text-sm text-slate-500">Configure a new monitoring device</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateDevice} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deviceName">Device Name</Label>
                      <Input
                        id="deviceName"
                        value={newDeviceName}
                        onChange={(e) => setNewDeviceName(e.target.value)}
                        placeholder="IAQ-001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deviceType">Device Type</Label>
                      <Select value={newDeviceType} onValueChange={setNewDeviceType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="iaq">IAQ Monitor</SelectItem>
                          <SelectItem value="nfc">NFC Reader</SelectItem>
                          <SelectItem value="badge_reader">Badge Reader</SelectItem>
                          <SelectItem value="occupancy_sensor">Occupancy Sensor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="deviceLocation">Location</Label>
                      <Input
                        id="deviceLocation"
                        value={newDeviceLocation}
                        onChange={(e) => setNewDeviceLocation(e.target.value)}
                        placeholder="Conference Room A"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deviceRoom">Associated Room (Optional)</Label>
                      <Select value={newDeviceRoom} onValueChange={setNewDeviceRoom}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">No Room</SelectItem>
                          {rooms.map((room) => (
                            <SelectItem key={room.id} value={room.id.toString()}>
                              {room.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" disabled={createDeviceMutation.isPending}>
                    <Plus size={16} className="mr-2" />
                    {createDeviceMutation.isPending ? "Adding..." : "Add Device"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Existing Devices */}
            <Card>
              <CardHeader>
                <CardTitle>Device Management</CardTitle>
                <p className="text-sm text-slate-500">Monitor and configure devices</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Location</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Last Seen</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devices.map((device) => (
                        <tr key={device.id} className="border-b hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium">{device.name}</td>
                          <td className="py-3 px-4 capitalize">{device.type.replace('_', ' ')}</td>
                          <td className="py-3 px-4">{device.location}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              device.isOnline 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {device.isOnline ? 'Online' : 'Offline'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-600">
                            {new Date(device.lastSeen).toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Configure</Button>
                              <Button size="sm" variant="destructive">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Preferences</CardTitle>
                <p className="text-sm text-slate-500">Configure when and how you receive alerts</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">High CO₂ Alerts</h4>
                      <p className="text-sm text-slate-500">Get notified when CO₂ levels exceed safe limits</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Overcapacity Warnings</h4>
                      <p className="text-sm text-slate-500">Alert when rooms exceed their capacity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">No-Show Notifications</h4>
                      <p className="text-sm text-slate-500">Get notified about missed check-ins</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Device Offline Alerts</h4>
                      <p className="text-sm text-slate-500">Alert when monitoring devices go offline</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Alert Thresholds</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="co2Threshold">CO₂ Alert Threshold (ppm)</Label>
                      <Input id="co2Threshold" type="number" defaultValue="800" />
                    </div>
                    <div>
                      <Label htmlFor="noShowTime">No-Show Alert Time (minutes)</Label>
                      <Input id="noShowTime" type="number" defaultValue="15" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <p className="text-sm text-slate-500">Configure general application preferences</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input id="orgName" defaultValue="SmartSpace Workspace" />
                  </div>
                  
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="America/New_York">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="workingHours">Working Hours</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Input type="time" defaultValue="09:00" />
                      <Input type="time" defaultValue="17:00" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Auto-release No-shows</h4>
                      <p className="text-sm text-slate-500">Automatically release bookings when users don't check in</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Real-time Updates</h4>
                      <p className="text-sm text-slate-500">Enable live data synchronization</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <p className="text-sm text-slate-500">Manage application data and backups</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    Import Configuration
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Reset All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
