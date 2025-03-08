
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tournament } from "@/types/tournament";

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard = ({ tournament }: TournamentCardProps) => {
  const navigate = useNavigate();
  
  // Extract location string from location object or use fallback
  const locationDisplay = typeof tournament.location === 'string' 
    ? tournament.location 
    : tournament.location?.address || 'Location not specified';
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
            <p className="text-sm text-muted-foreground">{locationDisplay}</p>
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
            <div>
              <p className="text-sm text-muted-foreground">
                Entry Fee: ₹{tournament.entry_fee || 0}
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
  );
};

export default TournamentCard;
