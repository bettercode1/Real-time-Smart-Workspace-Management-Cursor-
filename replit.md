# SmartSpace Dashboard - v1.0

## Overview

SmartSpace Dashboard is a comprehensive workplace management system that provides real-time occupancy monitoring, environmental tracking, and smart booking capabilities. The application is built as a full-stack solution with a React frontend, Express.js backend, and PostgreSQL database using Drizzle ORM.

The system focuses on enhancing workspace utilization through IoT integration, NFC-based check-ins, and intelligent analytics to optimize facility management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state and data fetching
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with consistent error handling
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)

### Development Setup
- **Build Tool**: Vite for fast development and optimized production builds
- **Development**: Hot module replacement with automatic server restarts
- **Type Safety**: Shared TypeScript types between frontend and backend

## Key Components

### 1. Real-time Monitoring System
- **Live Occupancy Tracking**: Interactive floor plans showing real-time space utilization
- **Environmental Monitoring**: IAQ (Indoor Air Quality) sensors tracking temperature, CO₂, and humidity
- **Device Management**: IoT device status monitoring with online/offline tracking
- **Alert System**: Automated notifications for environmental thresholds and capacity limits

### 2. Smart Booking Platform
- **Resource Management**: Unified booking system for rooms and desks
- **NFC Integration**: Badge-based check-in/check-out workflow
- **Auto-release**: Intelligent no-show detection with automatic resource liberation
- **Calendar Integration**: Time-based booking with conflict prevention

### 3. Analytics Dashboard
- **Utilization Metrics**: Room and desk usage patterns with trend analysis
- **Occupancy Insights**: Peak usage times and space optimization recommendations
- **Booking Efficiency**: Check-in rates and resource waste analysis
- **Environmental Trends**: Historical IAQ data for facility management

### 4. Administrative Tools
- **Room Configuration**: Capacity management and space categorization
- **Device Setup**: IoT sensor registration and location mapping
- **User Management**: Badge ID assignment and role-based access
- **System Settings**: Threshold configuration and alert customization

## Data Flow

### 1. IoT Data Pipeline
1. **Sensor Collection**: Environmental sensors (temperature, CO₂, humidity) push data via HTTP endpoints
2. **Occupancy Detection**: NFC badge readers register check-in/check-out events
3. **Real-time Updates**: TanStack Query manages automatic data refreshing every 10-30 seconds
4. **Alert Processing**: Backend evaluates thresholds and generates notifications

### 2. Booking Workflow
1. **Resource Selection**: Users select rooms/desks from interactive floor plan
2. **Availability Check**: Backend validates time slots against existing bookings
3. **Confirmation Process**: NFC tap-in required within grace period
4. **Status Management**: Automatic transitions between pending, active, and completed states

### 3. Analytics Generation
1. **Data Aggregation**: Historical booking and occupancy data processed into metrics
2. **Trend Analysis**: Daily/weekly utilization patterns calculated
3. **Dashboard Updates**: Real-time charts and insights delivered to frontend
4. **Report Generation**: Exportable analytics for facility management

## External Dependencies

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL for scalable data storage
- **Drizzle ORM**: Type-safe database operations with schema migrations
- **Connect PG Simple**: Session management for user authentication

### Frontend Libraries
- **TanStack Query**: Server state management and caching
- **Radix UI**: Accessible component primitives
- **Recharts**: Data visualization and chart rendering
- **Wouter**: Lightweight routing solution

### Development Tools
- **Vite**: Build tooling with HMR and optimization
- **TypeScript**: Type safety across the entire stack
- **Tailwind CSS**: Utility-first styling framework
- **Replit Integration**: Cloud development environment support

### Future Integration Points
- **Firebase**: Real-time database capabilities for enhanced IoT data streaming
- **NFC Hardware**: Physical badge readers and proximity sensors
- **Calendar APIs**: Integration with Google Calendar, Outlook for external booking sync

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend on separate ports
- **Hot Reloading**: Automatic frontend updates and backend restarts
- **Database**: Local PostgreSQL or Neon development instance
- **Environment Variables**: DATABASE_URL for database connection

### Production Deployment
- **Build Process**: Vite builds static assets, esbuild bundles server code
- **Server Setup**: Single Node.js process serving both API and static files
- **Database**: Production Neon PostgreSQL instance
- **Static Assets**: Served from dist/public directory

### Database Management
- **Schema Migrations**: Drizzle Kit for version-controlled database changes
- **Seeding**: Initial data setup for rooms, devices, and test users
- **Backup Strategy**: Neon automated backups with point-in-time recovery

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- July 10, 2025: MODERN LOADING ANIMATIONS - Updated LoadingSpinner with contemporary animations including modern morphing shapes, wave effects, glow effects, and enhanced gradients
- July 10, 2025: FUNCTIONAL SETTINGS PAGE WITH MULTILINGUAL SUPPORT - Created fully functional Settings page with working dark mode toggle, English/Arabic language switching, editable profile settings, notification preferences, security controls, data export functionality, and comprehensive help options
- July 10, 2025: COMPREHENSIVE ALERTS & NOTIFICATIONS REDESIGN - Created user-focused alerts page with interactive filtering, real-time notifications, star system, and comprehensive alert management from user perspective
- July 10, 2025: FLOOR PLAN CONTENT VISIBILITY FIX - Fixed layout issues and content overflow in Floor Plan page with proper grid structure and sidebar optimization
- July 10, 2025: COMPREHENSIVE BOOKING PAGE REDESIGN - Completely redesigned booking page with tabbed interface, comprehensive content, interactive floor plan, dynamic seat booking with popups, and eliminated empty space issues
- July 10, 2025: DYNAMIC SEAT BOOKING SYSTEM - Implemented SeatBookingModal and InteractiveFloorPlan components with visual state changes, popup notifications, and smooth animations for seat booking experience
- July 10, 2025: MODERN LOADING ANIMATIONS - Updated LoadingSpinner with contemporary animations including modern morphing shapes, wave effects, glow effects, and enhanced gradients
- July 10, 2025: ROLE-BASED ACCESS CONTROL - Removed analytics access from user panel and implemented AdminRoute component for proper role-based security
- July 10, 2025: COMPLETE USER DASHBOARD REDESIGN - Redesigned user dashboard to match admin panel design with proper alignment and professional styling
- July 10, 2025: Implemented consistent design system between admin and user panels with matching color schemes and layouts
- July 10, 2025: Added professional welcome card with green gradient theme for user dashboard
- July 10, 2025: Enhanced user dashboard with modern card layouts, proper spacing, and consistent visual hierarchy
- July 10, 2025: Integrated comprehensive user features including booking calendar, quick actions, and environment overview
- July 09, 2025: COMPREHENSIVE REDESIGN - Enhanced all pages with professional alignment and complete content
- July 09, 2025: Redesigned Bookings page with comprehensive booking statistics, upcoming bookings list, and better layout
- July 09, 2025: Created complete IAQ Monitoring page with real-time data, historical charts, and room-by-room analysis
- July 09, 2025: Enhanced Floor Plan page with occupancy stats, interactive controls, and proper content alignment
- July 09, 2025: Completely redesigned Settings page with profile management, appearance settings, and security options
- July 09, 2025: Fixed all alignment issues and added proper spacing throughout the application
- July 09, 2025: Added comprehensive content to previously empty pages with relevant project-specific information
- July 09, 2025: Enhanced all pages with proper statistics cards, interactive elements, and professional styling
- July 09, 2025: Implemented consistent card layouts with proper margins, padding, and visual hierarchy
- July 09, 2025: Added proper error handling and fixed import issues (Admin icon → SupervisorAccount)

## Changelog

Changelog:
- July 03, 2025. Initial setup and comprehensive improvements