import { useState } from "react";
import FloorPlan from "@/components/FloorPlan";
import BookingModal from "@/components/BookingModal";

export default function FloorPlanPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<{
    type: string;
    id: number;
    name: string;
  } | undefined>();

  const handleResourceSelect = (type: string, id: number) => {
    if (type === 'quick-book') {
      setSelectedResource(undefined);
      setBookingModalOpen(true);
      return;
    }

    let name = '';
    switch (type) {
      case 'room':
        name = `Room ${id}`;
        break;
      case 'desk':
        name = `Desk ${id}`;
        break;
      default:
        name = `Resource ${id}`;
    }

    setSelectedResource({ type, id, name });
    setBookingModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Floor Plan</h2>
          <p className="text-sm text-slate-500">Interactive workspace layout and occupancy</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <FloorPlan onResourceSelect={handleResourceSelect} />
      </main>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedResource={selectedResource}
      />
    </div>
  );
}
