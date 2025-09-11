import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, MapPin, BookOpen, Calendar, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/monastery-hero.jpg";

const HeroSection = () => {
  const features = [
    {
      icon: Play,
      title: "Virtual Tours",
      description: "Immersive 360° experiences of monastery interiors",
      path: "/virtual-tours",
    },
    {
      icon: MapPin,
      title: "Interactive Maps",
      description: "Explore 200+ monasteries across Sikkim",
      path: "/maps",
    },
    {
      icon: BookOpen,
      title: "Digital Archives",
      description: "Access rare manuscripts and historical documents",
      path: "/archives",
    },
    {
      icon: Calendar,
      title: "Cultural Calendar",
      description: "Discover festivals and spiritual events",
      path: "/calendar",
    },
    {
      icon: CalendarDays,
      title: "Plan Your Visit",
      description: "Essential information for your monastery journey",
      path: "/PlanYourVisit",
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-float">
            Discover Sikkim's
            <span className="block text-primary-glow">Sacred Heritage</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
            Experience over 200 ancient monasteries through immersive virtual tours, 
            digital archives, and cultural insights. Preserving spiritual treasures for future generations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-primary hover:bg-primary-glow text-white font-semibold px-8 py-4 text-lg shadow-monastery">
              <Link to="/monasteries">
                <Play className="mr-2 h-5 w-5" />
                Start Virtual Tour
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-black px-8 py-4 text-lg">
              <Link to="/archives">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Archives
              </Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link to={feature.path} key={feature.title}>
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:bg-white/20 transition-all duration-300 animate-float cursor-pointer group" style={{ animationDelay: `${index * 0.2}s` }}>
                    <Icon className="h-8 w-8 text-primary-glow mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-lg mb-2 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-200 text-sm">
                      {feature.description}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;