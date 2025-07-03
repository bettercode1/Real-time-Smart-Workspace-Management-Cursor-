import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  badgeId: text("badge_id").unique(),
  role: text("role", { enum: ["admin", "user", "manager"] }).notNull().default("user"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  department: text("department"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  lastLogin: timestamp("last_login"),
});

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // conference, office, common
  capacity: integer("capacity").notNull(),
  floor: integer("floor").notNull().default(1),
  isActive: boolean("is_active").notNull().default(true),
});

export const desks = pgTable("desks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  roomId: integer("room_id").references(() => rooms.id),
  isActive: boolean("is_active").notNull().default(true),
});

export const devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // iaq, nfc, badge_reader, occupancy_sensor
  location: text("location").notNull(),
  roomId: integer("room_id").references(() => rooms.id),
  isOnline: boolean("is_online").notNull().default(true),
  lastSeen: timestamp("last_seen").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  resourceType: text("resource_type").notNull(), // room, desk
  resourceId: integer("resource_id").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  status: text("status").notNull().default("pending"), // pending, active, completed, cancelled, no_show
  purpose: text("purpose"),
  checkedIn: boolean("checked_in").notNull().default(false),
  checkedInAt: timestamp("checked_in_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const iaqData = pgTable("iaq_data", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").references(() => devices.id),
  roomId: integer("room_id").references(() => rooms.id),
  temperature: real("temperature").notNull(),
  humidity: real("humidity").notNull(),
  co2: real("co2").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const occupancy = pgTable("occupancy", {
  id: serial("id").primaryKey(),
  roomId: integer("room_id").references(() => rooms.id),
  deskId: integer("desk_id").references(() => desks.id),
  currentCount: integer("current_count").notNull().default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // high_co2, over_capacity, no_show, device_offline
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull().default("medium"), // low, medium, high, critical
  roomId: integer("room_id").references(() => rooms.id),
  deviceId: integer("device_id").references(() => devices.id),
  isResolved: boolean("is_resolved").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

// Sessions table for authentication
export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  role: text("role").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, lastLogin: true });
export const insertSessionSchema = createInsertSchema(sessions).omit({ createdAt: true });
export const insertRoomSchema = createInsertSchema(rooms).omit({ id: true });
export const insertDeskSchema = createInsertSchema(desks).omit({ id: true });
export const insertDeviceSchema = createInsertSchema(devices).omit({ id: true, lastSeen: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ 
  id: true, 
  createdAt: true, 
  checkedInAt: true 
});
export const insertIAQDataSchema = createInsertSchema(iaqData).omit({ id: true, timestamp: true });
export const insertOccupancySchema = createInsertSchema(occupancy).omit({ id: true, lastUpdated: true });
export const insertAlertSchema = createInsertSchema(alerts).omit({ 
  id: true, 
  createdAt: true, 
  resolvedAt: true 
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Room = typeof rooms.$inferSelect;
export type InsertRoom = z.infer<typeof insertRoomSchema>;
export type Desk = typeof desks.$inferSelect;
export type InsertDesk = z.infer<typeof insertDeskSchema>;
export type Device = typeof devices.$inferSelect;
export type InsertDevice = z.infer<typeof insertDeviceSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type IAQData = typeof iaqData.$inferSelect;
export type InsertIAQData = z.infer<typeof insertIAQDataSchema>;
export type Occupancy = typeof occupancy.$inferSelect;
export type InsertOccupancy = z.infer<typeof insertOccupancySchema>;
export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
