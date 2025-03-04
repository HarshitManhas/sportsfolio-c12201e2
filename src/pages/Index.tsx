
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { ArrowRight, Trophy, Users, Calendar, Star, Shield, Target, Search, Bell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  // Featured tournaments (mock data)
  const featuredTournaments = [
    {
      id: "1",
      title: "Summer Basketball Championship",
      sport: "Basketball",
      date: "Jun 15 - Jun 20, 2024",
      location: "City Sports Complex",
      entryFee: "$50",
      image: "https://images.unsplash.com/photo-1546519638-68e109acd27d?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3"
    },
    {
      id: "2",
      title: "Tennis Grand Slam",
      sport: "Tennis",
      date: "May 10 - May 15, 2024",
      location: "Central Courts",
      entryFee: "$75",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
    },
    {
      id: "3",
      title: "Football League",
      sport: "Football",
      date: "Jul 5 - Aug 20, 2024",
      location: "Main Stadium",
      entryFee: "$100",
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=2671&ixlib=rb-4.0.3"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      {/* Hero Section with Background Image */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1540747913346-19e32dc3e97e")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.5)'
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Your Local Sports Community
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto">
              Discover tournaments, connect with players, and organize events in your area.
              Join the community that's transforming local sports.
            </p>
            <div className="mt-10 space-y-4">
              <Button
                onClick={() => navigate('/discover')}
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-accent hover:bg-accent/90 transition-colors duration-200"
              >
                Explore Tournaments
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-gray-300 text-sm">Join 10,000+ sports enthusiasts in your area</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Input
                type="search"
                placeholder="Search tournaments by name, location or sport..."
                className="w-full pl-10 py-6 text-base"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            </div>
            <Button className="w-full md:w-auto">
              Find Tournaments
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-primary">Featured Tournaments</h2>
            <Button variant="outline" onClick={() => navigate('/discover')}>
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTournaments.map((tournament) => (
              <Card key={tournament.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/discover')}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={tournament.image} 
                    alt={tournament.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-clamp-1">{tournament.title}</h3>
                    <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {tournament.sport}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{tournament.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{tournament.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Entry Fee:</span>
                      <span className="ml-2">{tournament.entryFee}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Buttons */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Access</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Trophy, title: "Upcoming Tournaments", path: "/discover" },
              { icon: Users, title: "My Tournaments", path: "/profile" },
              { icon: Calendar, title: "Create Tournament", path: "/create-tournament" },
              { icon: Star, title: "My Profile", path: "/profile" },
              { icon: Bell, title: "Notifications", path: "#" },
              { icon: MapPin, title: "Events Near Me", path: "/discover" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/20 transition-colors"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Everything You Need to Excel in Sports</h2>
            <p className="mt-4 text-gray-600">Comprehensive tools and features to enhance your sporting experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: "Join Tournaments",
                description: "Find and participate in\nlocal tournaments across\nvarious sports",
                action: () => navigate("/discover")
              },
              {
                icon: Users,
                title: "Build Your Team",
                description: "Connect with players\nand form teams for\nupcoming tournaments",
                action: () => navigate("/discover")
              },
              {
                icon: Calendar,
                title: "Organize Events",
                description: "Create and manage your\nown tournaments with\nour easy-to-use tools",
                action: () => navigate("/create-tournament")
              }
            ].map((feature) => (
              <div
                key={feature.title}
                onClick={feature.action}
                className="relative p-6 bg-card rounded-lg shadow-lg cursor-pointer transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute top-0 right-0 p-4">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
                <feature.icon className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose SportsFolio?</h2>
            <p className="mt-4 text-gray-300">Experience the advantages of our comprehensive sports platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Quality Matches",
                description: "Participate in well-organized tournaments with skilled players"
              },
              {
                icon: Shield,
                title: "Secure Platform",
                description: "Safe and reliable environment for organizing and joining events"
              },
              {
                icon: Target,
                title: "Skill Development",
                description: "Track your progress and improve with every match"
              }
            ].map((benefit, index) => (
              <div
                key={benefit.title}
                className="p-6 rounded-lg bg-white/10 backdrop-blur-sm animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <benefit.icon className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your journey today and become part of the fastest-growing sports community in your area
          </p>
          <Button
            onClick={() => navigate('/discover')}
            className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-md bg-white text-accent hover:bg-gray-100 transition-colors duration-200"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
