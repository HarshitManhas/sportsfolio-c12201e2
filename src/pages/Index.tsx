
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import QuickAccess from "../components/QuickAccess";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Hero Section with Search */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-8 mb-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find and Join Local Sports Tournaments
          </h1>
          <p className="text-lg mb-6">
            Discover nearby tournaments, showcase your skills, and connect with the sports community
          </p>
          
          <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
            <Input
              type="text"
              placeholder="Search for tournaments by name, sport, or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/90 text-black"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>
        
        {/* Quick Access */}
        <div className="mb-8">
          <QuickAccess />
        </div>
        
        {/* Sports News Preview */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Latest Sports News</h2>
            <Button variant="ghost">See All</Button>
          </div>
          
          <div className="p-4 border rounded-md bg-gray-50 text-center">
            <p className="text-muted-foreground">
              Sports news and updates coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
