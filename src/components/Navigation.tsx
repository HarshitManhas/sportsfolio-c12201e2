
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Menu, X, CalendarDays, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Discover", path: "/discover" },
    { name: "Create Tournament", path: "/create-tournament" },
    { name: "Profile", path: "/profile" },
  ];

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const notificationTypes = {
    tournament: {
      icon: <CalendarDays className="h-4 w-4" />,
      color: "bg-blue-500"
    },
    payment: {
      icon: <CircleDollarSign className="h-4 w-4" />,
      color: "bg-green-500"
    },
    system: {
      icon: <Bell className="h-4 w-4" />,
      color: "bg-gray-500"
    }
  };

  const notifications = [
    {
      id: 1,
      type: "tournament",
      title: "Tournament Registration Approved",
      message: "Your registration for Summer Basketball Tournament has been approved.",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Verified",
      message: "Your payment for Tennis Open has been verified.",
      time: "1 day ago",
      read: true
    },
    {
      id: 3,
      type: "system",
      title: "New Tournament Nearby",
      message: "A new tennis tournament has been announced in your area.",
      time: "1 day ago",
      read: false
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary font-racing tracking-wider">SportsFolio</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-accent font-medium"
                    : "text-gray-600 hover:text-accent"
                }`}
              >
                {item.name}
              </button>
            ))}
            
            {/* Notifications Icon */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs rounded-full bg-red-500 text-white">
                      {unreadCount}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-sm mb-1">Notifications</h3>
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {unreadCount} new
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs mb-3">Your recent notifications</p>
                  
                  <div className="space-y-2 max-h-[350px] overflow-auto">
                    {notifications.map((notification) => {
                      const type = notification.type as keyof typeof notificationTypes;
                      const { icon, color } = notificationTypes[type] || notificationTypes.system;
                      
                      return (
                        <div 
                          key={notification.id}
                          className={`p-3 rounded-md flex items-start gap-3 ${
                            notification.read ? 'bg-gray-50' : 'bg-blue-50/50 border-l-2 border-blue-500'
                          }`}
                        >
                          <div className={`p-2 rounded-full ${color} text-white flex-shrink-0`}>
                            {icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium line-clamp-1 ${!notification.read ? 'text-blue-700' : ''}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                    See all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden animate-fadeIn">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-accent bg-gray-50"
                      : "text-gray-600 hover:text-accent hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Notifications in mobile menu */}
              <button
                onClick={() => {}}
                className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-accent hover:bg-gray-50"
              >
                <Bell className="h-5 w-5 mr-2" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
