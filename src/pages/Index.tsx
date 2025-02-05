import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { ArrowRight, Trophy, Users, Calendar, Star, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (path: string) => {
    navigate(path);
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1556056504-5c7696c4c28d")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content wrapper with relative positioning to appear above overlay */}
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
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
                  description: "Find and participate in local\ntournaments across various sports.",
                  path: "/discover"
                },
                {
                  icon: Users,
                  title: "Build Your Team",
                  description: "Connect with players and form teams for upcoming events.",
                  path: "/organize"
                },
                {
                  icon: Calendar,
                  title: "Organize Events",
                  description: "Create and manage your own tournaments with powerful tools.",
                  path: "/organize"
                },
              ].map((feature, index) => (
                <Button
                  key={feature.title}
                  variant="ghost"
                  onClick={() => handleFeatureClick(feature.path)}
                  className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 animate-fadeIn h-full w-full flex flex-col items-start text-left"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <feature.icon className="h-10 w-10 text-accent mb-3" />
                  <h3 className="text-lg font-semibold text-primary mb-2 w-full break-words">{feature.title}</h3>
                  <p className="text-sm text-gray-600 w-full break-words leading-relaxed">{feature.description}</p>
                </Button>
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
    </div>
  );
};

export default Index;