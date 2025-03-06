
import { Button } from "@/components/ui/button";
import { Tournament } from "@/types/tournament";
import { useNavigate } from "react-router-dom";
import TournamentCard from "./TournamentCard";

interface TournamentsListProps {
  tournaments: Tournament[];
  loading: boolean;
}

const TournamentsList = ({ tournaments, loading }: TournamentsListProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading tournaments...</p>
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">No tournaments found</h2>
        <p className="text-muted-foreground mb-6">
          There are no tournaments matching your search criteria. Try adjusting your filters or create your own tournament.
        </p>
        <Button onClick={() => navigate("/create-tournament")}>
          Create Tournament
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {tournaments.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
};

export default TournamentsList;
