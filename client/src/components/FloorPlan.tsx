import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Room, Desk, Occupancy } from "@shared/schema";

interface FloorPlanProps {
  onResourceSelect?: (type: string, id: number) => void;
}

export default function FloorPlan({ onResourceSelect }: FloorPlanProps) {
  const [lastUpdate] = useState(new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }));

  const { data: rooms = [] } = useQuery<Room[]>({
    queryKey: ["/api/rooms"]
  });

  const { data: desks = [] } = useQuery<Desk[]>({
    queryKey: ["/api/desks"]
  });

  const { data: occupancy = [] } = useQuery<Occupancy[]>({
    queryKey: ["/api/occupancy"]
  });

  const getOccupancyStatus = (roomId: number, capacity: number) => {
    const occ = occupancy.find(o => o.roomId === roomId);
    if (!occ) return 'available';
    
    const percentage = (occ.currentCount / capacity) * 100;
    if (percentage === 0) return 'available';
    if (percentage <= 75) return 'occupied';
    if (percentage <= 100) return 'warning';
    return 'critical';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500 border-green-300';
      case 'occupied': return 'bg-yellow-500 border-yellow-300';
      case 'warning': return 'bg-orange-500 border-orange-300';
      case 'critical': return 'bg-red-500 border-red-300';
      default: return 'bg-gray-500 border-gray-300';
    }
  };

  const conferenceRooms = rooms.filter(r => r.type === 'conference');
  const offices = rooms.filter(r => r.type === 'office');
  const commonAreas = rooms.filter(r => r.type === 'common' && r.name !== 'Open Workspace');
  const openWorkspace = rooms.find(r => r.name === 'Open Workspace');
  const workspaceDesks = desks.filter(d => d.roomId === openWorkspace?.id);

  const handleResourceClick = (type: string, id: number) => {
    onResourceSelect?.(type, id);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Live Floor Plan</CardTitle>
            <p className="text-sm text-slate-500">Real-time occupancy status</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-slate-600">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-slate-600">Occupied</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-slate-600">Over Capacity</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Floor Plan SVG Container */}
        <div className="relative bg-slate-50 rounded-lg p-6 min-h-[400px]">
          {/* Conference Rooms */}
          <div className="absolute top-6 left-6">
            <div className="space-y-3">
              {conferenceRooms.map((room) => {
                const status = getOccupancyStatus(room.id, room.capacity);
                const occ = occupancy.find(o => o.roomId === room.id);
                return (
                  <button
                    key={room.id}
                    onClick={() => handleResourceClick('room', room.id)}
                    className={`w-24 h-16 ${getStatusColor(status)} border-2 rounded-lg flex flex-col items-center justify-center text-xs font-medium text-white hover:opacity-90 transition-opacity`}
                  >
                    <i className="fas fa-users mb-1"></i>
                    <span>{room.name}</span>
                    <span className="text-xs opacity-75">
                      {occ?.currentCount || 0}/{room.capacity}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Open Workspace Desks */}
          <div className="absolute top-6 right-6">
            <div className="grid grid-cols-6 gap-2">
              {workspaceDesks.map((desk, index) => {
                // Simulate desk occupancy (every 3rd desk occupied for demo)
                const isOccupied = (index + 1) % 3 === 0;
                return (
                  <button
                    key={desk.id}
                    onClick={() => handleResourceClick('desk', desk.id)}
                    className={`w-8 h-8 ${isOccupied ? 'bg-yellow-500 border-yellow-300' : 'bg-green-500 border-green-300'} rounded border-2 hover:opacity-90 transition-opacity`}
                    title={`${desk.name} - ${isOccupied ? 'Occupied' : 'Available'}`}
                  ></button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">Open Workspace</p>
          </div>
          
          {/* Private Offices */}
          <div className="absolute bottom-6 left-6">
            <div className="flex space-x-3">
              {offices.map((office) => {
                const status = getOccupancyStatus(office.id, office.capacity);
                const occ = occupancy.find(o => o.roomId === office.id);
                return (
                  <button
                    key={office.id}
                    onClick={() => handleResourceClick('room', office.id)}
                    className={`w-20 h-20 ${getStatusColor(status)} border-2 rounded-lg flex flex-col items-center justify-center text-xs font-medium text-white hover:opacity-90 transition-opacity`}
                  >
                    <i className="fas fa-user mb-1"></i>
                    <span>{office.name}</span>
                    <span className="text-xs opacity-75">
                      {occ?.currentCount || 0 > 0 ? 'Occupied' : 'Available'}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">Private Offices</p>
          </div>
          
          {/* Common Areas */}
          <div className="absolute bottom-6 right-6">
            <div className="space-y-3">
              {commonAreas.map((area) => {
                const status = getOccupancyStatus(area.id, area.capacity);
                return (
                  <button
                    key={area.id}
                    onClick={() => handleResourceClick('room', area.id)}
                    className={`w-20 h-12 ${getStatusColor(status)} border-2 rounded-lg flex items-center justify-center text-xs font-medium text-white hover:opacity-90 transition-opacity`}
                  >
                    <i className={`fas ${area.name === 'Kitchen' ? 'fa-coffee' : 'fa-couch'} mr-1`}></i>
                    <span>{area.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center space-x-4">
            <Button onClick={() => onResourceSelect?.('quick-book', 0)}>
              <i className="fas fa-plus mr-2"></i>Quick Book
            </Button>
            <Button variant="outline">
              <i className="fas fa-unlock mr-2"></i>Release All No-Shows
            </Button>
          </div>
          <div className="text-sm text-slate-500">
            Last updated: {lastUpdate}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
