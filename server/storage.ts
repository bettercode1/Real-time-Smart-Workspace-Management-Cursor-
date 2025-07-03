import { 
  users, rooms, desks, devices, bookings, iaqData, occupancy, alerts, sessions,
  type User, type InsertUser, type Room, type InsertRoom, type Desk, type InsertDesk,
  type Device, type InsertDevice, type Booking, type InsertBooking, type IAQData, type InsertIAQData,
  type Occupancy, type InsertOccupancy, type Alert, type InsertAlert, type Session, type InsertSession
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByBadgeId(badgeId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Sessions
  createSession(session: InsertSession): Promise<Session>;
  getSession(id: string): Promise<Session | undefined>;
  deleteSession(id: string): Promise<boolean>;
  deleteUserSessions(userId: number): Promise<boolean>;
  
  // Rooms
  getAllRooms(): Promise<Room[]>;
  getRoom(id: number): Promise<Room | undefined>;
  createRoom(room: InsertRoom): Promise<Room>;
  updateRoom(id: number, room: Partial<Room>): Promise<Room | undefined>;
  
  // Desks
  getAllDesks(): Promise<Desk[]>;
  getDesksByRoom(roomId: number): Promise<Desk[]>;
  createDesk(desk: InsertDesk): Promise<Desk>;
  
  // Devices
  getAllDevices(): Promise<Device[]>;
  getDevice(id: number): Promise<Device | undefined>;
  createDevice(device: InsertDevice): Promise<Device>;
  updateDevice(id: number, device: Partial<Device>): Promise<Device | undefined>;
  
  // Bookings
  getAllBookings(): Promise<Booking[]>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getActiveBookings(): Promise<Booking[]>;
  getTodayBookings(): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, booking: Partial<Booking>): Promise<Booking | undefined>;
  
  // IAQ Data
  getLatestIAQByRoom(roomId: number): Promise<IAQData | undefined>;
  getAllLatestIAQ(): Promise<IAQData[]>;
  createIAQData(data: InsertIAQData): Promise<IAQData>;
  
  // Occupancy
  getAllOccupancy(): Promise<Occupancy[]>;
  getOccupancyByRoom(roomId: number): Promise<Occupancy | undefined>;
  updateOccupancy(roomId: number, count: number): Promise<Occupancy>;
  
  // Alerts
  getAllAlerts(): Promise<Alert[]>;
  getActiveAlerts(): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  resolveAlert(id: number): Promise<Alert | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private sessions: Map<string, Session> = new Map();
  private rooms: Map<number, Room> = new Map();
  private desks: Map<number, Desk> = new Map();
  private devices: Map<number, Device> = new Map();
  private bookings: Map<number, Booking> = new Map();
  private iaqData: Map<number, IAQData> = new Map();
  private occupancy: Map<number, Occupancy> = new Map();
  private alerts: Map<number, Alert> = new Map();
  
  private currentId = {
    users: 1,
    rooms: 1,
    desks: 1,
    devices: 1,
    bookings: 1,
    iaqData: 1,
    occupancy: 1,
    alerts: 1
  };

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample users (admin and regular user)
    const sampleUsers: User[] = [
      { 
        id: 1, 
        username: "admin", 
        email: "admin@smartspace.com", 
        password: "admin123", // In real app, this would be hashed
        badgeId: "BADGE_ADMIN_001", 
        role: "admin" as const, 
        firstName: "System", 
        lastName: "Administrator", 
        department: "IT", 
        isActive: true, 
        createdAt: new Date(), 
        lastLogin: null 
      },
      { 
        id: 2, 
        username: "john.doe", 
        email: "john.doe@smartspace.com", 
        password: "user123", // In real app, this would be hashed
        badgeId: "BADGE_USER_001", 
        role: "user" as const, 
        firstName: "John", 
        lastName: "Doe", 
        department: "Engineering", 
        isActive: true, 
        createdAt: new Date(), 
        lastLogin: null 
      },
      { 
        id: 3, 
        username: "jane.smith", 
        email: "jane.smith@smartspace.com", 
        password: "manager123", // In real app, this would be hashed
        badgeId: "BADGE_MGR_001", 
        role: "manager" as const, 
        firstName: "Jane", 
        lastName: "Smith", 
        department: "Operations", 
        isActive: true, 
        createdAt: new Date(), 
        lastLogin: null 
      }
    ];

    sampleUsers.forEach(user => {
      this.users.set(user.id, user);
      this.currentId.users = Math.max(this.currentId.users, user.id + 1);
    });

    // Initialize with sample data
    const sampleRooms: Room[] = [
      { id: 1, name: "Conference A", type: "conference", capacity: 8, floor: 1, isActive: true },
      { id: 2, name: "Conference B", type: "conference", capacity: 8, floor: 1, isActive: true },
      { id: 3, name: "Conference C", type: "conference", capacity: 8, floor: 1, isActive: true },
      { id: 4, name: "Office 1", type: "office", capacity: 1, floor: 1, isActive: true },
      { id: 5, name: "Office 2", type: "office", capacity: 1, floor: 1, isActive: true },
      { id: 6, name: "Office 3", type: "office", capacity: 1, floor: 1, isActive: true },
      { id: 7, name: "Open Workspace", type: "common", capacity: 20, floor: 1, isActive: true },
      { id: 8, name: "Kitchen", type: "common", capacity: 5, floor: 1, isActive: true },
      { id: 9, name: "Lounge", type: "common", capacity: 10, floor: 1, isActive: true }
    ];

    sampleRooms.forEach(room => {
      this.rooms.set(room.id, room);
      this.currentId.rooms = Math.max(this.currentId.rooms, room.id + 1);
    });

    // Initialize desks for open workspace
    for (let i = 1; i <= 12; i++) {
      const desk: Desk = { id: i, name: `Desk ${i}`, roomId: 7, isActive: true };
      this.desks.set(i, desk);
    }
    this.currentId.desks = 13;

    // Initialize sample devices
    const sampleDevices: Device[] = [
      { id: 1, name: "IAQ-001", type: "iaq", location: "Conference A", roomId: 1, isOnline: true, lastSeen: new Date() },
      { id: 2, name: "IAQ-002", type: "iaq", location: "Conference B", roomId: 2, isOnline: true, lastSeen: new Date() },
      { id: 3, name: "IAQ-003", type: "iaq", location: "Open Workspace", roomId: 7, isOnline: true, lastSeen: new Date() },
      { id: 4, name: "NFC-001", type: "nfc", location: "Main Entrance", roomId: null, isOnline: false, lastSeen: new Date(Date.now() - 60000) },
      { id: 5, name: "Badge Reader", type: "badge_reader", location: "Main Entrance", roomId: null, isOnline: true, lastSeen: new Date() },
      { id: 6, name: "Occupancy-001", type: "occupancy_sensor", location: "Conference B", roomId: 2, isOnline: true, lastSeen: new Date() }
    ];

    sampleDevices.forEach(device => {
      this.devices.set(device.id, device);
      this.currentId.devices = Math.max(this.currentId.devices, device.id + 1);
    });

    // Initialize sample occupancy data
    const sampleOccupancy: Occupancy[] = [
      { id: 1, roomId: 1, deskId: null, currentCount: 0, lastUpdated: new Date() },
      { id: 2, roomId: 2, deskId: null, currentCount: 6, lastUpdated: new Date() },
      { id: 3, roomId: 3, deskId: null, currentCount: 10, lastUpdated: new Date() },
      { id: 4, roomId: 5, deskId: null, currentCount: 1, lastUpdated: new Date() },
      { id: 5, roomId: 7, deskId: null, currentCount: 8, lastUpdated: new Date() }
    ];

    sampleOccupancy.forEach(occ => {
      this.occupancy.set(occ.roomId!, occ);
      this.currentId.occupancy = Math.max(this.currentId.occupancy, occ.id + 1);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByBadgeId(badgeId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.badgeId === badgeId);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.isActive);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id, createdAt: new Date(), lastLogin: null };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updated = { ...user, ...updates };
    this.users.set(id, updated);
    return updated;
  }

  // Sessions
  async createSession(insertSession: InsertSession): Promise<Session> {
    const session: Session = { ...insertSession, createdAt: new Date() };
    this.sessions.set(session.id, session);
    return session;
  }

  async getSession(id: string): Promise<Session | undefined> {
    const session = this.sessions.get(id);
    if (!session) return undefined;
    
    // Check if session is expired
    if (session.expiresAt < new Date()) {
      this.sessions.delete(id);
      return undefined;
    }
    
    return session;
  }

  async deleteSession(id: string): Promise<boolean> {
    return this.sessions.delete(id);
  }

  async deleteUserSessions(userId: number): Promise<boolean> {
    const userSessions = Array.from(this.sessions.entries())
      .filter(([_, session]) => session.userId === userId);
    
    userSessions.forEach(([sessionId]) => {
      this.sessions.delete(sessionId);
    });
    
    return userSessions.length > 0;
  }

  // Rooms
  async getAllRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values()).filter(room => room.isActive);
  }

  async getRoom(id: number): Promise<Room | undefined> {
    return this.rooms.get(id);
  }

  async createRoom(insertRoom: InsertRoom): Promise<Room> {
    const id = this.currentId.rooms++;
    const room: Room = { ...insertRoom, id };
    this.rooms.set(id, room);
    return room;
  }

  async updateRoom(id: number, updates: Partial<Room>): Promise<Room | undefined> {
    const room = this.rooms.get(id);
    if (!room) return undefined;
    const updated = { ...room, ...updates };
    this.rooms.set(id, updated);
    return updated;
  }

  // Desks
  async getAllDesks(): Promise<Desk[]> {
    return Array.from(this.desks.values()).filter(desk => desk.isActive);
  }

  async getDesksByRoom(roomId: number): Promise<Desk[]> {
    return Array.from(this.desks.values()).filter(desk => desk.roomId === roomId && desk.isActive);
  }

  async createDesk(insertDesk: InsertDesk): Promise<Desk> {
    const id = this.currentId.desks++;
    const desk: Desk = { ...insertDesk, id };
    this.desks.set(id, desk);
    return desk;
  }

  // Devices
  async getAllDevices(): Promise<Device[]> {
    return Array.from(this.devices.values());
  }

  async getDevice(id: number): Promise<Device | undefined> {
    return this.devices.get(id);
  }

  async createDevice(insertDevice: InsertDevice): Promise<Device> {
    const id = this.currentId.devices++;
    const device: Device = { ...insertDevice, id, lastSeen: new Date() };
    this.devices.set(id, device);
    return device;
  }

  async updateDevice(id: number, updates: Partial<Device>): Promise<Device | undefined> {
    const device = this.devices.get(id);
    if (!device) return undefined;
    const updated = { ...device, ...updates, lastSeen: new Date() };
    this.devices.set(id, updated);
    return updated;
  }

  // Bookings
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.userId === userId);
  }

  async getActiveBookings(): Promise<Booking[]> {
    const now = new Date();
    return Array.from(this.bookings.values()).filter(booking => 
      booking.status === 'active' && booking.endTime > now
    );
  }

  async getTodayBookings(): Promise<Booking[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return Array.from(this.bookings.values()).filter(booking => 
      booking.startTime >= today && booking.startTime < tomorrow
    );
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentId.bookings++;
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date(),
      checkedInAt: null 
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: number, updates: Partial<Booking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    const updated = { ...booking, ...updates };
    if (updates.checkedIn && !booking.checkedInAt) {
      updated.checkedInAt = new Date();
    }
    this.bookings.set(id, updated);
    return updated;
  }

  // IAQ Data
  async getLatestIAQByRoom(roomId: number): Promise<IAQData | undefined> {
    const roomData = Array.from(this.iaqData.values())
      .filter(data => data.roomId === roomId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    return roomData[0];
  }

  async getAllLatestIAQ(): Promise<IAQData[]> {
    const rooms = await this.getAllRooms();
    const latestData: IAQData[] = [];
    
    for (const room of rooms) {
      const latest = await this.getLatestIAQByRoom(room.id);
      if (latest) latestData.push(latest);
    }
    
    return latestData;
  }

  async createIAQData(insertData: InsertIAQData): Promise<IAQData> {
    const id = this.currentId.iaqData++;
    const data: IAQData = { ...insertData, id, timestamp: new Date() };
    this.iaqData.set(id, data);
    return data;
  }

  // Occupancy
  async getAllOccupancy(): Promise<Occupancy[]> {
    return Array.from(this.occupancy.values());
  }

  async getOccupancyByRoom(roomId: number): Promise<Occupancy | undefined> {
    return this.occupancy.get(roomId);
  }

  async updateOccupancy(roomId: number, count: number): Promise<Occupancy> {
    const existing = this.occupancy.get(roomId);
    if (existing) {
      const updated = { ...existing, currentCount: count, lastUpdated: new Date() };
      this.occupancy.set(roomId, updated);
      return updated;
    } else {
      const id = this.currentId.occupancy++;
      const occupancy: Occupancy = {
        id,
        roomId,
        deskId: null,
        currentCount: count,
        lastUpdated: new Date()
      };
      this.occupancy.set(roomId, occupancy);
      return occupancy;
    }
  }

  // Alerts
  async getAllAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getActiveAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values())
      .filter(alert => !alert.isResolved)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = this.currentId.alerts++;
    const alert: Alert = { 
      ...insertAlert, 
      id, 
      createdAt: new Date(),
      resolvedAt: null 
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async resolveAlert(id: number): Promise<Alert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;
    const updated = { ...alert, isResolved: true, resolvedAt: new Date() };
    this.alerts.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
