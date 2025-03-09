
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TournamentRegistration from "../components/TournamentRegistration";
import { CalendarDays, MapPin, Clock, Users, Trophy, Clipboard, CreditCard, Share2 } from "lucide-react";
import { Tournament } from "@/types/tournament";
import { fetchTournamentById, fetchTournamentRegistrations } from "@/services/tournamentQueries"; // Updated import
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { ParticipantApproval } from "@/components/tournament/ParticipantApproval";

const TournamentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadTournament = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await fetchTournamentById(id);
        setTournament(data);
        
        // Check if current user is the organizer
        if (user) {
          setIsOrganizer(data.organizer_id === user.id);
          
          // If user is organizer, load registrations
          if (data.organizer_id === user.id) {
            const regs = await fetchTournamentRegistrations(id);
            setRegistrations(regs);
          }
        }
        
        setError(null);
      } catch (err) {
        console.error("Failed to fetch tournament:", err);
        setError("Failed to load tournament details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadTournament();
  }, [id, user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tournament?.title || "Tournament Details",
        text: `Check out this tournament: ${tournament?.title || ""}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-64 w-full mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Skeleton className="h-96 w-full" />
              </div>
              <div>
                <Skeleton className="h-64 w-full mb-4" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !tournament) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 px-4 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error</h1>
          <p className="text-gray-700">{error || "Tournament not found"}</p>
          <Button className="mt-4" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  // Get location display string
  const locationDisplay = typeof tournament.location === 'string' 
    ? tournament.location 
    : tournament.location?.address || 'Location not specified';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-20">
        {/* Tournament header with image */}
        <div className="relative h-64 w-full">
          <img 
            src={tournament.image_url || "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1470&auto=format&fit=crop"} 
            alt={tournament.title} 
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
            <h1 className="text-3xl font-bold">{tournament.title}</h1>
            <p className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" /> {locationDisplay}
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
              <Tabs defaultValue={isOrganizer ? "manage" : "details"}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="rules">Rules</TabsTrigger>
                  <TabsTrigger value="participants">Participants</TabsTrigger>
                  {isOrganizer && (
                    <TabsTrigger value="manage">Manage</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Tournament Details</h2>
                      <p className="text-gray-700 mb-6">{tournament.description || "No description provided."}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <div className="mr-3 p-2 rounded-full bg-primary/10">
                            <Trophy className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Format</p>
                            <p className="text-sm text-muted-foreground">{tournament.format || "Not specified"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mr-3 p-2 rounded-full bg-primary/10">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Entry Fee</p>
                            <p className="text-sm text-muted-foreground">
                              {tournament.entry_fee ? `₹${tournament.entry_fee}` : "Free"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mr-3 p-2 rounded-full bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Maximum Participants</p>
                            <p className="text-sm text-muted-foreground">{tournament.max_participants}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="mr-3 p-2 rounded-full bg-primary/10">
                            <CalendarDays className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Dates</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
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
                        {tournament.rules || "No rules have been specified for this tournament."}
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
                          {tournament.participants_count > 0 
                            ? `${tournament.participants_count} participants registered so far.`
                            : 'Registration is open. Be the first to join!'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {isOrganizer && (
                  <TabsContent value="manage">
                    <ParticipantApproval 
                      tournamentId={tournament.id} 
                      tournamentName={tournament.title} 
                    />
                  </TabsContent>
                )}
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
                        <p className="font-medium">{formatDate(tournament.start_date)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm">Registration Deadline</p>
                        <p className="font-medium">
                          {formatDate(new Date(
                            new Date(tournament.start_date).getTime() - 2 * 24 * 60 * 60 * 1000
                          ).toISOString())}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm">Location</p>
                        <p className="font-medium">{locationDisplay}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm">Organizer</p>
                        <p className="font-medium">{tournament.organizer_name || "Tournament Organizer"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <TournamentRegistration 
                      tournamentId={tournament.id} 
                      tournamentName={tournament.title} 
                      entryFee={tournament.entry_fee || "0"}
                    />
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
