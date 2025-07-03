import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { QrCode } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedResource?: {
    type: string;
    id: number;
    name: string;
  };
}

export default function BookingModal({ isOpen, onClose, selectedResource }: BookingModalProps) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [badgeId, setBadgeId] = useState("");
  const [purpose, setPurpose] = useState("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      return apiRequest("POST", "/api/bookings", bookingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking Confirmed",
        description: `Successfully booked ${selectedResource?.name}.`,
      });
      handleClose();
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Unable to create booking. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleClose = () => {
    setStartTime("");
    setEndTime("");
    setBadgeId("");
    setPurpose("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startTime || !endTime || !badgeId || !selectedResource) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const today = new Date();
    const start = new Date(`${today.toDateString()} ${startTime}`);
    const end = new Date(`${today.toDateString()} ${endTime}`);

    if (end <= start) {
      toast({
        title: "Invalid Time",
        description: "End time must be after start time.",
        variant: "destructive",
      });
      return;
    }

    const bookingData = {
      userId: 1, // Demo user ID
      resourceType: selectedResource.type === 'desk' ? 'desk' : 'room',
      resourceId: selectedResource.id,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      purpose: purpose || null,
      status: "pending"
    };

    createBookingMutation.mutate(bookingData);
  };

  const handleScanBadge = () => {
    // Simulate badge scanning
    setBadgeId(`BADGE_${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    toast({
      title: "Badge Scanned",
      description: "Badge ID has been automatically filled.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book Resource</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Selected Resource</Label>
            <Input 
              value={selectedResource?.name || ""} 
              readOnly 
              className="bg-slate-50"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="badgeId">Badge ID</Label>
            <div className="relative">
              <Input
                id="badgeId"
                type="text"
                placeholder="Scan badge or enter manually"
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={handleScanBadge}
              >
                <QrCode size={16} />
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="purpose">Purpose (Optional)</Label>
            <Textarea
              id="purpose"
              placeholder="Meeting purpose..."
              rows={2}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="resize-none"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={createBookingMutation.isPending}
            >
              {createBookingMutation.isPending ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
