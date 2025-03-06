
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, MapPin, User, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Tournament } from "@/types/tournament";
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('tournaments')
          .select('*')
          .eq('visibility', 'public');
          
        if (error) {
          console.error("Error fetching tournaments:", error);
          return;
        }

        setTournaments(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  // Apply filters to tournaments
  const filteredTournaments = tournaments.filter(tournament => {
    // Filter by search term
    const matchesSearch = tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tournament.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by sport
    const matchesSport = sportFilter === 'all' || tournament.sport === sportFilter;
    
    // Filter by skill level
    const matchesSkill = skillFilter === 'all' || tournament.skill_level === skillFilter;
    
    return matchesSearch && matchesSport && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-background pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Discover Tournaments</h1>
              <p className="text-muted-foreground mt-1">Find and join tournaments in your area</p>
            </div>
            <Button onClick={() => navigate("/create-tournament")}>
              Create Tournament
            </Button>
          </div>
          
          {/* Search and Filter Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search tournaments..."
                  className="w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              
              <Select value={sportFilter} onValueChange={setSportFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="volleyball">Volleyball</SelectItem>
                  <SelectItem value="cricket">Cricket</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Skill Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="All Levels">Mixed Levels</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Upcoming
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                This Weekend
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Free Entry
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Near Me
              </Badge>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading tournaments...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredTournaments.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">No tournaments found</h2>
              <p className="text-muted-foreground mb-6">
                There are no tournaments matching your search criteria. Try adjusting your filters or create your own tournament.
              </p>
              <Button onClick={() => navigate("/create-tournament")}>
                Create Tournament
              </Button>
            </div>
          )}

          {/* Tournaments Grid */}
          {!loading && filteredTournaments.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredTournaments.map((tournament) => (
                <Card key={tournament.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={tournament.image_url || "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1470&auto=format&fit=crop"} 
                      alt={tournament.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{tournament.title}</CardTitle>
                      <Badge>{tournament.sport}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(tournament.start_date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{tournament.location}</p>
                      </div>
                      
                      <div className="flex items-start">
                        <User className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Participants: {tournament.participants_count || 0}/{tournament.max_participants}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <DollarSign className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                        <div className="flex flex-col">
                          <p className="text-sm text-muted-foreground">
                            Entry Fee: ₹{tournament.entry_fee || 0}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Skill Level: {tournament.skill_level}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => navigate(`/tournament/${tournament.id}`)}
                      >
                        View Details
                      </Button>
                      <Button variant="outline" className="flex-1">Join Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
