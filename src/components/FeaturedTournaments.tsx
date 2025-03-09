
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchTournaments } from "@/services";
import { Tournament } from "@/types/tournament";

export function FeaturedTournaments() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const data = await fetchTournaments();
        // Sort tournaments by participants_count in descending order and take the top 3
        const trendingTournaments = data
          .sort((a, b) => (b.participants_count || 0) - (a.participants_count || 0))
          .slice(0, 3);
          
        setTournaments(trendingTournaments);
      } catch (error) {
        console.error("Error loading tournaments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTournaments();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const handleViewTournament = (id: string) => {
    navigate(`/tournament/${id}`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Trending Tournaments</h2>
          <Button variant="ghost" onClick={() => navigate('/discover')}>See All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <CardHeader className="pb-2">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Trending Tournaments</h2>
          <Button variant="ghost" onClick={() => navigate('/discover')}>See All</Button>
        </div>
        <div className="bg-white p-6 rounded-lg text-center">
          <p className="text-muted-foreground">
            No tournaments available at the moment. Check back later or explore all tournaments.
          </p>
          <Button className="mt-4" onClick={() => navigate('/discover')}>
            Discover Tournaments
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trending Tournaments</h2>
        <Button variant="ghost" onClick={() => navigate('/discover')}>See All</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <img 
                src={tournament.image_url || "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1470&auto=format&fit=crop"} 
                alt={tournament.title} 
                className="h-full w-full object-cover"
              />
              {(tournament.participants_count && tournament.participants_count > 5) && (
                <div className="absolute top-2 right-2">
                  <Badge variant="destructive" className="bg-red-500">
                    Trending
                  </Badge>
                </div>
              )}
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{tournament.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" /> 
                    {typeof tournament.location === 'string' 
                      ? tournament.location 
                      : tournament.location?.address || 'Unknown location'}
                  </CardDescription>
                </div>
                <Badge>{tournament.sport}</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pb-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{formatDate(tournament.start_date)}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>
                    {tournament.participants_count || 0}/{tournament.max_participants}
                  </span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleViewTournament(tournament.id)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FeaturedTournaments;
