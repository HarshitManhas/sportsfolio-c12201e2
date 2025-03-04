
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-4">
                  <h3 className="font-medium text-sm mb-1">Notifications</h3>
                  <p className="text-muted-foreground text-xs mb-3">Your recent notifications</p>
                  
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/50 rounded-md">
                      <p className="text-sm font-medium">Tournament Registration Approved</p>
                      <p className="text-xs text-muted-foreground">Your registration for Summer Basketball Tournament has been approved.</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                    
                    <div className="p-3 bg-muted/50 rounded-md">
                      <p className="text-sm font-medium">New Tournament Nearby</p>
                      <p className="text-xs text-muted-foreground">A new tennis tournament has been announced in your area.</p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
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
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
