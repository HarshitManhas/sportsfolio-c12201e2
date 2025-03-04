
import { useNavigate } from "react-router-dom";
import { 
  CalendarDays, 
  Trophy, 
  UserCircle, 
  Users, 
  Newspaper, 
  Calendar 
} from "lucide-react";

export function QuickAccess() {
  const navigate = useNavigate();
  
  const quickLinks = [
    {
      title: 'Upcoming Tournaments',
      icon: <CalendarDays className="h-6 w-6" />,
      description: 'Discover and register for tournaments',
      path: '/discover'
    },
    {
      title: 'My Tournaments',
      icon: <Trophy className="h-6 w-6" />,
      description: 'Manage joined & created tournaments',
      path: '/profile'
    },
    {
      title: 'My Profile',
      icon: <UserCircle className="h-6 w-6" />,
      description: 'View and update sports achievements',
      path: '/profile'
    },
    {
      title: 'Connect',
      icon: <Users className="h-6 w-6" />,
      description: 'Find and interact with other players',
      path: '/discover'
    },
    {
      title: 'News & Updates',
      icon: <Newspaper className="h-6 w-6" />,
      description: 'Live scores, results, sports news',
      path: '/discover'
    },
    {
      title: 'Events',
      icon: <Calendar className="h-6 w-6" />,
      description: 'Multi-tournament events',
      path: '/create-tournament'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quick Access</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {quickLinks.map((link, index) => (
          <button
            key={index}
            onClick={() => navigate(link.path)}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 border border-gray-100"
          >
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              {link.icon}
            </div>
            <h3 className="font-medium">{link.title}</h3>
            <p className="text-xs text-muted-foreground">{link.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickAccess;
