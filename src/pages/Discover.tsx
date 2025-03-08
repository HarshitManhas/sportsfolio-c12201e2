
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { Tournament } from "@/types/tournament";
import TournamentFilters from "@/components/tournament/TournamentFilters";
import TournamentsList from "@/components/tournament/TournamentsList";
import { fetchTournaments } from "@/services/tournamentService";

const Discover = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sportFilter, setSportFilter] = useState("all");

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        setLoading(true);
        const data = await fetchTournaments();
        setTournaments(data);
      } catch (err) {
        console.error("Failed to fetch tournaments:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTournaments();
  }, []);

  // Apply filters to tournaments
  const filteredTournaments = tournaments.filter(tournament => {
    // Get the location string for filtering
    const locationString = typeof tournament.location === 'string'
      ? tournament.location
      : tournament.location?.address || '';
      
    // Filter by search term
    const matchesSearch = tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          locationString.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by sport
    const matchesSport = sportFilter === 'all' || tournament.sport === sportFilter;
    
    return matchesSearch && matchesSport;
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
          
          <TournamentFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sportFilter={sportFilter}
            setSportFilter={setSportFilter}
          />

          <TournamentsList 
            tournaments={filteredTournaments}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Discover;
