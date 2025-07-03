import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  LayoutDashboard, 
  Map, 
  Calendar, 
  BarChart3, 
  Bell, 
  Settings, 
  User,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();

  const menuItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/floor-plan", icon: Map, label: "Floor Plan" },
    { path: "/bookings", icon: Calendar, label: "Bookings" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/alerts", icon: Bell, label: "Alerts" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-slate-200 flex flex-col">
      {/* Logo and Title */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Building className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">SmartSpace</h1>
            <p className="text-sm text-slate-500">Dashboard v1.0</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <li key={item.path}>
                <Link href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive 
                        ? "bg-primary/10 text-primary hover:bg-primary/20" 
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Icon size={20} className="mr-3" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* User Profile */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center">
            <User className="text-slate-600" size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800">Admin User</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
