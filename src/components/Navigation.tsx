
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Discover", path: "/discover" },
    { name: "Organize", path: "/organize" },
    { name: "Profile", path: "/profile" },
  ];

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
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-accent font-medium"
                    : "text-gray-600 hover:text-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
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
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-accent bg-gray-50"
                      : "text-gray-600 hover:text-accent hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
