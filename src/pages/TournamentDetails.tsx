
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TournamentRegistration from "../components/TournamentRegistration";
import { CalendarDays, MapPin, Clock, Users, Trophy, Clipboard, CreditCard, Share2 } from "lucide-react";

// In a real app, this would come from an API
const getTournamentDetails = (id: string) => {
  return {
    id,
    name: "Summer Basketball Championship",
    sport: "basketball",
    location: "Central Sports Complex, 123 Main St",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    entryFee: "₹500",
    maxParticipants: 12,
    format: "Knockout",
    description: "Join our exciting summer basketball tournament! Open to all skill levels, with prizes for the winners and runners-up. Event includes refreshments and a networking session after the final match.",
    rules: "1. Teams must have 5-7 players\n2. Games are 20 minutes each\n3. Tournament rules follow standard basketball regulations\n4. Fair play is expected from all participants",
    organizer: "City Sports Association",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1700&auto=format&fit=crop",
    registered: false
  };
};

const TournamentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const tournament = getTournamentDetails(id || "1");

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tournament.name,
        text: `Check out this tournament: ${tournament.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20">
        {/* Tournament header with image */}
        <div className="relative h-64 w-full">
          <img 
            src={tournament.imageUrl} 
            alt={tournament.name} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <Badge 
              className="mb-2"
              variant="sport"
              sport={tournament.sport as any}
            >
              {tournament.sport}
            </Badge>
            <h1 className="text-3xl font-bold">{tournament.name}</h1>
            <p className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" /> {tournament.location}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-4 right-4 bg-white/80 hover:bg-white"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="md:col-span-2 space-y-6">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="rules">Rules</TabsTrigger>
                  <TabsTrigger value="participants">Participants</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Tournament Details</h2>
                      <p className="text-gray-700 mb-6">{tournament.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="mr-3 p-2 rounded-full bg-primary/10">
                            <Trophy className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Format</p>
                            <p className="text-sm text-muted-foreground">{tournament.format}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mr-3 p-2 rounded-full bg-primary/10">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Entry Fee</p>
                            <p className="text-sm text-muted-foreground">{tournament.entryFee}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mr-3 p-2 rounded-full bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Maximum Participants</p>
                            <p className="text-sm text-muted-foreground">{tournament.maxParticipants}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mr-3 p-2 rounded-full bg-primary/10">
                            <CalendarDays className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Dates</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="rules">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Clipboard className="mr-2 h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold">Tournament Rules</h2>
                      </div>
                      <div className="whitespace-pre-line">
                        {tournament.rules}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="participants">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Users className="mr-2 h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold">Participants</h2>
                      </div>
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          Registration is open. Be the first to join!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Tournament Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CalendarDays className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm">Start Date</p>
                        <p className="font-medium">{formatDate(tournament.startDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm">Registration Deadline</p>
                        <p className="font-medium">{formatDate(new Date(tournament.startDate.getTime() - 2 * 24 * 60 * 60 * 1000))}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm">Location</p>
                        <p className="font-medium">{tournament.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm">Organizer</p>
                        <p className="font-medium">{tournament.organizer}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    {tournament.registered ? (
                      <Button variant="outline" className="w-full">Already Registered</Button>
                    ) : (
                      <TournamentRegistration 
                        tournamentId={tournament.id} 
                        tournamentName={tournament.name} 
                        entryFee={tournament.entryFee}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Share Tournament</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Invite friends and teammates to join this tournament
                  </p>
                  <Button className="w-full" variant="outline" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
