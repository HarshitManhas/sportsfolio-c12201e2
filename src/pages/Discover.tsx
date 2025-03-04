
import { useState } from "react";
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

interface Tournament {
  id: string;
  title: string;
  sport: string;
  date: string;
  location: string;
  skillLevel: string;
  entryFee: string;
  organizer: string;
  participantsCount: number;
  maxParticipants: number;
  image?: string;
}

const Discover = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([
    {
      id: "1",
      title: "Summer Basketball Championship",
      sport: "Basketball",
      date: "2024-06-15",
      location: "City Sports Complex",
      skillLevel: "Intermediate",
      entryFee: "$50",
      organizer: "City Sports Association",
      participantsCount: 12,
      maxParticipants: 16,
      image: "https://images.unsplash.com/photo-1546519638-68e109acd27d?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3"
    },
    {
      id: "2",
      title: "Local Tennis Tournament",
      sport: "Tennis",
      date: "2024-05-20",
      location: "Central Courts",
      skillLevel: "Advanced",
      entryFee: "$75",
      organizer: "Tennis Club",
      participantsCount: 8,
      maxParticipants: 32,
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
    },
    {
      id: "3",
      title: "Football League",
      sport: "Football",
      date: "2024-07-05",
      location: "Main Stadium",
      skillLevel: "All Levels",
      entryFee: "$100",
      organizer: "Football Association",
      participantsCount: 6,
      maxParticipants: 12,
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=2671&ixlib=rb-4.0.3"
    },
    {
      id: "4",
      title: "Volleyball Beach Tournament",
      sport: "Volleyball",
      date: "2024-08-12",
      location: "City Beach",
      skillLevel: "Beginner",
      entryFee: "$30",
      organizer: "Beach Sports Club",
      participantsCount: 16,
      maxParticipants: 24,
      image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=2607&ixlib=rb-4.0.3"
    },
  ]);

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
            <Button onClick={() => window.location.href = "/create-tournament"}>
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
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
              
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="volleyball">Volleyball</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Skill Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
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

          {/* Tournaments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {tournaments.map((tournament) => (
              <Card key={tournament.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {tournament.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={tournament.image} 
                      alt={tournament.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                )}
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
                          {new Date(tournament.date).toLocaleDateString('en-US', {
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
                          Participants: {tournament.participantsCount}/{tournament.maxParticipants}
                        </p>
                        <p className="text-xs text-muted-foreground">Organized by: {tournament.organizer}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <DollarSign className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-muted-foreground" />
                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">
                          Entry Fee: {tournament.entryFee}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Skill Level: {tournament.skillLevel}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1">View Details</Button>
                    <Button variant="outline" className="flex-1">Join Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
