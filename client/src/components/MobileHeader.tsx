import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Building, 
  Menu, 
  X,
  LayoutDashboard, 
  Map, 
  Calendar, 
  BarChart3, 
  Bell, 
  Settings, 
  User,
  LogOut,
  Shield,
  Users
} from "lucide-react";
import { Link, useLocation } from "wouter";

interface MobileHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function MobileHeader({ isMenuOpen, setIsMenuOpen }: MobileHeaderProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      { path: "/", icon: LayoutDashboard, label: "Dashboard" },
      { path: "/floor-plan", icon: Map, label: "Floor Plan" },
      { path: "/bookings", icon: Calendar, label: "Bookings" },
      { path: "/analytics", icon: BarChart3, label: "Analytics" },
      { path: "/alerts", icon: Bell, label: "Alerts" },
    ];

    const adminItems = [
      { path: "/users", icon: Users, label: "User Management", adminOnly: true }
    ];

    const settingsItem = { path: "/settings", icon: Settings, label: "Settings" };

    if (user?.role === 'admin') {
      return [...baseItems, ...adminItems, settingsItem];
    }
    
    return [...baseItems, settingsItem];
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Building className="text-white" size={16} />
          </div>
          <h1 className="text-lg font-bold text-slate-800">SmartSpace</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className={`text-xs ${
            user?.role === 'admin' ? 'bg-red-50 text-red-700 border-red-200' :
            user?.role === 'manager' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            'bg-green-50 text-green-700 border-green-200'
          }`}>
            {user?.role === 'admin' ? 'Admin' :
             user?.role === 'manager' ? 'Manager' : 'User'}
          </Badge>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 top-16 bottom-0 w-64 bg-white shadow-lg">
            <div className="flex flex-col h-full">
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
                            onClick={() => setIsMenuOpen(false)}
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
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    user?.role === 'admin' ? 'bg-red-100' :
                    user?.role === 'manager' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {user?.role === 'admin' ? (
                      <Shield className="text-red-600" size={20} />
                    ) : (
                      <User className="text-slate-600" size={20} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {user?.firstName && user?.lastName 
                        ? `${user.firstName} ${user.lastName}`
                        : user?.username || 'User'
                      }
                    </p>
                    {user?.department && (
                      <p className="text-xs text-slate-500 truncate">
                        {user.department}
                      </p>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-400 hover:text-slate-600"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    title="Logout"
                  >
                    <LogOut size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}