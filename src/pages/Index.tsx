import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/hero-section";
import MonasteryGrid from "@/components/monastery-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Camera, Calendar, MapPin, Users, Globe } from "lucide-react";

const Index = () => {
  const stats = [
    { icon: MapPin, number: "200+", label: "Monasteries" },
    { icon: Camera, number: "50+", label: "Virtual Tours" },
    { icon: BookOpen, number: "1000+", label: "Digital Archives" },
    { icon: Users, number: "10K+", label: "Monthly Visitors" },
  ];

  const features = [
    {
      icon: Camera,
      title: "360° Virtual Tours",
      description: "Immerse yourself in stunning panoramic views of monastery interiors and sacred spaces."
    },
    {
      icon: Globe,
      title: "Interactive Heritage Map",
      description: "Explore geo-tagged locations with travel routes and nearby cultural attractions."
    },
    {
      icon: BookOpen,
      title: "Digital Archives",
      description: "Access rare manuscripts, murals, and historical documents with AI-powered search."
    },
    {
      icon: Calendar,
      title: "Cultural Calendar",
      description: "Discover festivals, rituals, and spiritual events with booking options."
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <div className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-monastery">
              Preserving Sacred Heritage
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Digital preservation and immersive experiences connecting global audiences 
              with Sikkim's spiritual treasures.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="text-center p-6 bg-gradient-to-br from-card to-card/80 border-0 shadow-gentle hover:shadow-monastery transition-all duration-300">
                  <Icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-heritage mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-monastery">
              Immersive Cultural Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge technology meets ancient wisdom to create 
              unprecedented access to Sikkim's monastery heritage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="p-8 hover:shadow-heritage transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <Icon className="h-12 w-12 text-primary group-hover:text-primary-glow transition-colors mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monastery Showcase */}
      <MonasteryGrid />

      {/* Call to Action */}
      <div className="bg-gradient-sunset text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Begin Your Spiritual Journey
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Explore centuries of Buddhist heritage, connect with ancient wisdom, 
            and experience the transformative power of Sikkim's sacred spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-foreground hover:bg-gray-100 shadow-monastery">
              <Camera className="w-5 h-5 mr-2" />
              Start Virtual Tour
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground">
              <BookOpen className="w-5 h-5 mr-2" />
              Explore Archives
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
