import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertRoomSchema, insertDeviceSchema, insertIAQDataSchema, insertAlertSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rooms
  app.get("/api/rooms", async (req, res) => {
    try {
      const rooms = await storage.getAllRooms();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rooms" });
    }
  });

  app.post("/api/rooms", async (req, res) => {
    try {
      const roomData = insertRoomSchema.parse(req.body);
      const room = await storage.createRoom(roomData);
      res.status(201).json(room);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create room" });
      }
    }
  });

  // Desks
  app.get("/api/desks", async (req, res) => {
    try {
      const desks = await storage.getAllDesks();
      res.json(desks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch desks" });
    }
  });

  app.get("/api/desks/room/:roomId", async (req, res) => {
    try {
      const roomId = parseInt(req.params.roomId);
      const desks = await storage.getDesksByRoom(roomId);
      res.json(desks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch desks for room" });
    }
  });

  // Devices
  app.get("/api/devices", async (req, res) => {
    try {
      const devices = await storage.getAllDevices();
      res.json(devices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch devices" });
    }
  });

  app.post("/api/devices", async (req, res) => {
    try {
      const deviceData = insertDeviceSchema.parse(req.body);
      const device = await storage.createDevice(deviceData);
      res.status(201).json(device);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create device" });
      }
    }
  });

  app.patch("/api/devices/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const device = await storage.updateDevice(id, updates);
      if (!device) {
        res.status(404).json({ error: "Device not found" });
        return;
      }
      res.json(device);
    } catch (error) {
      res.status(500).json({ error: "Failed to update device" });
    }
  });

  // Bookings
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.get("/api/bookings/active", async (req, res) => {
    try {
      const bookings = await storage.getActiveBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch active bookings" });
    }
  });

  app.get("/api/bookings/today", async (req, res) => {
    try {
      const bookings = await storage.getTodayBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch today's bookings" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create booking" });
      }
    }
  });

  app.patch("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const booking = await storage.updateBooking(id, updates);
      if (!booking) {
        res.status(404).json({ error: "Booking not found" });
        return;
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to update booking" });
    }
  });

  // IAQ Data
  app.get("/api/iaq", async (req, res) => {
    try {
      const iaqData = await storage.getAllLatestIAQ();
      res.json(iaqData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch IAQ data" });
    }
  });

  app.get("/api/iaq/room/:roomId", async (req, res) => {
    try {
      const roomId = parseInt(req.params.roomId);
      const iaqData = await storage.getLatestIAQByRoom(roomId);
      if (!iaqData) {
        res.status(404).json({ error: "No IAQ data found for room" });
        return;
      }
      res.json(iaqData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch IAQ data for room" });
    }
  });

  app.post("/api/iaq", async (req, res) => {
    try {
      const iaqData = insertIAQDataSchema.parse(req.body);
      const data = await storage.createIAQData(iaqData);
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create IAQ data" });
      }
    }
  });

  // Occupancy
  app.get("/api/occupancy", async (req, res) => {
    try {
      const occupancy = await storage.getAllOccupancy();
      res.json(occupancy);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch occupancy data" });
    }
  });

  app.patch("/api/occupancy/:roomId", async (req, res) => {
    try {
      const roomId = parseInt(req.params.roomId);
      const { count } = req.body;
      if (typeof count !== 'number') {
        res.status(400).json({ error: "Count must be a number" });
        return;
      }
      const occupancy = await storage.updateOccupancy(roomId, count);
      res.json(occupancy);
    } catch (error) {
      res.status(500).json({ error: "Failed to update occupancy" });
    }
  });

  // Alerts
  app.get("/api/alerts", async (req, res) => {
    try {
      const alerts = await storage.getAllAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch alerts" });
    }
  });

  app.get("/api/alerts/active", async (req, res) => {
    try {
      const alerts = await storage.getActiveAlerts();
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch active alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const alertData = insertAlertSchema.parse(req.body);
      const alert = await storage.createAlert(alertData);
      res.status(201).json(alert);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create alert" });
      }
    }
  });

  app.patch("/api/alerts/:id/resolve", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const alert = await storage.resolveAlert(id);
      if (!alert) {
        res.status(404).json({ error: "Alert not found" });
        return;
      }
      res.json(alert);
    } catch (error) {
      res.status(500).json({ error: "Failed to resolve alert" });
    }
  });

  // Badge check-in simulation
  app.post("/api/checkin", async (req, res) => {
    try {
      const { badgeId, resourceType, resourceId } = req.body;
      
      // Find user by badge ID (simulate)
      const user = await storage.getUserByBadgeId(badgeId);
      if (!user) {
        res.status(404).json({ error: "Badge ID not found" });
        return;
      }

      // Find active booking for this user and resource
      const bookings = await storage.getActiveBookings();
      const booking = bookings.find(b => 
        b.userId === user.id && 
        b.resourceType === resourceType && 
        b.resourceId === resourceId
      );

      if (!booking) {
        res.status(404).json({ error: "No active booking found for this resource" });
        return;
      }

      // Update booking to checked in
      const updatedBooking = await storage.updateBooking(booking.id, {
        checkedIn: true,
        status: 'active'
      });

      res.json({ success: true, booking: updatedBooking });
    } catch (error) {
      res.status(500).json({ error: "Check-in failed" });
    }
  });

  // Dashboard stats
  app.get("/api/stats", async (req, res) => {
    try {
      const rooms = await storage.getAllRooms();
      const occupancy = await storage.getAllOccupancy();
      const activeBookings = await storage.getActiveBookings();
      const devices = await storage.getAllDevices();
      const activeAlerts = await storage.getActiveAlerts();

      // Calculate total occupancy percentage
      const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
      const totalOccupied = occupancy.reduce((sum, occ) => sum + occ.currentCount, 0);
      const occupancyPercentage = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

      // Device status
      const onlineDevices = devices.filter(d => d.isOnline).length;
      const totalDevices = devices.length;

      // IAQ status
      const iaqData = await storage.getAllLatestIAQ();
      const avgCO2 = iaqData.length > 0 
        ? Math.round(iaqData.reduce((sum, data) => sum + data.co2, 0) / iaqData.length)
        : 0;

      const stats = {
        occupancy: {
          current: `${occupancyPercentage}%`,
          change: "+5% from yesterday"
        },
        bookings: {
          active: activeBookings.length,
          pending: activeBookings.filter(b => b.status === 'pending').length
        },
        airQuality: {
          average: avgCO2 < 500 ? "Good" : avgCO2 < 800 ? "Fair" : "Poor",
          co2: `${avgCO2} ppm CO₂`
        },
        devices: {
          online: `${onlineDevices}/${totalDevices}`,
          offline: totalDevices - onlineDevices
        },
        alerts: {
          count: activeAlerts.length
        }
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
