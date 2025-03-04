
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, LogOut, Trophy, Volleyball } from "lucide-react";

interface Tournament {
  id: string;
  title: string;
  sport: string;
  date: string;
  location: string;
  skillLevel: string;
}

const Profile = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [joinedTournaments, setJoinedTournaments] = useState<Tournament[]>([]);
  const [organizedTournaments, setOrganizedTournaments] = useState<Tournament[]>([]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      
      if (session) {
        // Set user name from session data
        const fullName = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || "User";
        setUserName(fullName);
        
        // Simulate fetching joined tournaments (would normally come from your database)
        setJoinedTournaments([
          {
            id: "1",
            title: "Summer Basketball Championship",
            sport: "Basketball",
            date: "2024-06-15",
            location: "City Sports Complex",
            skillLevel: "Intermediate",
          },
        ]);
        
        // Simulate fetching organized tournaments (would normally come from your database)
        setOrganizedTournaments([
          {
            id: "2",
            title: "Local Tennis Tournament",
            sport: "Tennis",
            date: "2024-05-20",
            location: "Central Courts",
            skillLevel: "Advanced",
          },
        ]);
        
        navigate(from, { replace: true });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        // Update user name when session changes
        const fullName = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || "User";
        setUserName(fullName);
        navigate(from, { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, from]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Successfully signed out!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {session ? (
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <span className="text-3xl">👋</span>
                <span className="ml-2">Hi, {userName}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Welcome to your sports tournament dashboard!
              </p>
              <Button
                onClick={handleSignOut}
                variant="destructive"
                className="flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

          <Tabs defaultValue="joined" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="joined" className="flex items-center">
                <Volleyball className="mr-2 h-4 w-4" />
                Tournaments Joined
              </TabsTrigger>
              <TabsTrigger value="organized" className="flex items-center">
                <Trophy className="mr-2 h-4 w-4" />
                Tournaments Organized
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="joined">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Volleyball className="mr-2 h-5 w-5" />
                    Tournaments You've Joined
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {joinedTournaments.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tournament</TableHead>
                          <TableHead>Sport</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Skill Level</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {joinedTournaments.map((tournament) => (
                          <TableRow key={tournament.id}>
                            <TableCell className="font-medium">{tournament.title}</TableCell>
                            <TableCell>{tournament.sport}</TableCell>
                            <TableCell>{new Date(tournament.date).toLocaleDateString()}</TableCell>
                            <TableCell>{tournament.location}</TableCell>
                            <TableCell>{tournament.skillLevel}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-6">
                      <Award className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">You haven't joined any tournaments yet.</p>
                      <Button 
                        variant="outline"
                        className="mt-4"
                        onClick={() => navigate('/discover')}
                      >
                        Discover Tournaments
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="organized">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="mr-2 h-5 w-5" />
                    Tournaments You've Organized
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {organizedTournaments.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tournament</TableHead>
                          <TableHead>Sport</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Skill Level</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {organizedTournaments.map((tournament) => (
                          <TableRow key={tournament.id}>
                            <TableCell className="font-medium">{tournament.title}</TableCell>
                            <TableCell>{tournament.sport}</TableCell>
                            <TableCell>{new Date(tournament.date).toLocaleDateString()}</TableCell>
                            <TableCell>{tournament.location}</TableCell>
                            <TableCell>{tournament.skillLevel}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-6">
                      <Trophy className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">You haven't organized any tournaments yet.</p>
                      <Button 
                        variant="outline"
                        className="mt-4"
                        onClick={() => navigate('/create-tournament')}
                      >
                        Create Tournament
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <AuthForm />
      )}
    </div>
  );
};

export default Profile;
