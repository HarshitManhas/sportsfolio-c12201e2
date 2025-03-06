
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

interface TournamentFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sportFilter: string;
  setSportFilter: (value: string) => void;
  skillFilter: string;
  setSkillFilter: (value: string) => void;
}

const TournamentFilters = ({
  searchTerm,
  setSearchTerm,
  sportFilter,
  setSportFilter,
  skillFilter,
  setSkillFilter,
}: TournamentFiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search tournaments..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        
        <Select value={sportFilter} onValueChange={setSportFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            <SelectItem value="basketball">Basketball</SelectItem>
            <SelectItem value="tennis">Tennis</SelectItem>
            <SelectItem value="football">Football</SelectItem>
            <SelectItem value="volleyball">Volleyball</SelectItem>
            <SelectItem value="cricket">Cricket</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={skillFilter} onValueChange={setSkillFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Skill Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
            <SelectItem value="All Levels">Mixed Levels</SelectItem>
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
  );
};

export default TournamentFilters;
