
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Tournament {
  id: string;
  name: string;
  sport: string;
  location: string;
  startDate: Date;
  maxParticipants: number;
  imageUrl?: string;
  trending?: boolean;
}

const sampleTournaments: Tournament[] = [
  {
    id: "1",
    name: "Summer Basketball Championship",
    sport: "basketball",
    location: "Central Sports Complex",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    maxParticipants: 12,
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1700&auto=format&fit=crop",
    trending: true
  },
  {
    id: "2",
    name: "Football League Tournament",
    sport: "football",
    location: "City Stadium",
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    maxParticipants: 16,
    imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Tennis Open",
    sport: "tennis",
    location: "Tennis Club Courts",
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    maxParticipants: 32,
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1470&auto=format&fit=crop",
    trending: true
  }
];

export function FeaturedTournaments() {
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const handleViewTournament = (id: string) => {
    // In a real app, this would navigate to the tournament details page
    navigate(`/tournament/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Featured Tournaments</h2>
        <Button variant="ghost" onClick={() => navigate('/discover')}>See All</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleTournaments.map((tournament) => (
          <Card key={tournament.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <img 
                src={tournament.imageUrl || "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1470&auto=format&fit=crop"} 
                alt={tournament.name} 
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 right-2">
                {tournament.trending && (
                  <Badge variant="destructive" className="bg-red-500">
                    Trending
                  </Badge>
                )}
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{tournament.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" /> {tournament.location}
                  </CardDescription>
                </div>
                <Badge>{tournament.sport}</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pb-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{formatDate(tournament.startDate)}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Max: {tournament.maxParticipants}</span>
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
