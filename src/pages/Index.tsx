import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { ArrowRight, Trophy, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
              Your Local Sports Community
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover tournaments, connect with players, and organize events in your area.
              Join the community that's transforming local sports.
            </p>
            <div className="mt-10">
              <Button
                onClick={() => navigate('/discover')}
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-accent hover:bg-accent/90 transition-colors duration-200"
              >
                Explore Tournaments
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: "Join Tournaments",
                description: "Find and participate in local tournaments across various sports.",
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
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 animate-fadeIn h-auto flex flex-col items-start"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-left">{feature.description}</p>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;