import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Tournament {
  id: string;
  title: string;
  sport: string;
  date: string;
  location: string;
  skillLevel: string;
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
    },
    {
      id: "2",
      title: "Local Tennis Tournament",
      sport: "Tennis",
      date: "2024-05-20",
      location: "Central Courts",
      skillLevel: "Advanced",
    },
    // Add more mock tournaments as needed
  ]);

  return (
    <div className="min-h-screen bg-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-primary">Discover Tournaments</h1>
          
          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search tournaments..."
                className="w-full pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Tournaments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {tournaments.map((tournament) => (
              <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{tournament.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Sport:</span> {tournament.sport}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(tournament.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Location:</span> {tournament.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Skill Level:</span> {tournament.skillLevel}
                    </p>
                    <Button className="w-full mt-4">View Details</Button>
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