import Navigation from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Archive, 
  FileText, 
  Image, 
  Video, 
  Scroll,
  Search,
  Bell,
  Download,
  Calendar,
  MapPin,
  Clock
} from "lucide-react";

const Archives = () => {
  const archiveCategories = [
    {
      icon: FileText,
      title: "Manuscripts",
      description: "Ancient Buddhist texts and religious documents",
      count: "Coming Soon",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Image,
      title: "Historical Photos",
      description: "Rare photographs of monasteries through the ages",
      count: "Coming Soon", 
      color: "bg-heritage/10 text-heritage"
    },
    {
      icon: Video,
      title: "Documentaries",
      description: "Video archives of ceremonies and teachings",
      count: "Coming Soon",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: Scroll,
      title: "Artifacts",
      description: "Digital records of sacred objects and artworks",
      count: "Coming Soon",
      color: "bg-primary-glow/10 text-primary"
    }
  ];

  const features = [
    "AI-Powered Search through ancient texts",
    "High-resolution digitized manuscripts",
    "Interactive timeline of monastery history",
    "Multi-language translation support",
    "Scholar collaboration platform",
    "Virtual artifact examination"
  ];

  return (
    <div className="min-h-screen bg-gradient-mist">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-gradient-monastery text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Archive className="h-12 w-12 text-heritage" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Digital Archives
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Preserving centuries of Buddhist heritage through cutting-edge digital preservation. 
            Our comprehensive archive system is currently under development to bring you unprecedented 
            access to Sikkim's sacred treasures.
          </p>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-12 bg-gradient-to-br from-card to-muted/50 shadow-heritage">
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="p-6 bg-primary/10 rounded-full">
                  <BookOpen className="h-16 w-16 text-primary" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-monastery">
                  Archives Coming Soon
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  We are meticulously digitizing thousands of ancient manuscripts, photographs, 
                  and sacred artifacts to create the world's most comprehensive Buddhist heritage archive.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button size="lg" className="shadow-monastery">
                  <Bell className="w-5 h-5 mr-2" />
                  Notify Me When Ready
                </Button>
                <Button size="lg" variant="outline">
                  <Download className="w-5 h-5 mr-2" />
                  Preview Sample Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Archive Categories Preview */}
      <div className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-monastery">
              What's Coming
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our digital archive will feature multiple categories of carefully preserved content
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {archiveCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={category.title} className="p-6 hover:shadow-gentle transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">
                        {category.count}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-monastery">
                Advanced Archive Features
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our digital archive platform will revolutionize access to Buddhist heritage 
                with cutting-edge technology and scholarly tools.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-card to-muted/50">
              <CardHeader>
                <CardTitle className="text-2xl text-monastery mb-4">
                  Stay Updated
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Be the first to explore our digital archives when they launch. 
                  Get notified about preview releases and early access opportunities.
                </p>
                
                <div className="space-y-4">
                  <Input 
                    placeholder="Enter your email address" 
                    type="email"
                  />
                  <Button className="w-full shadow-monastery">
                    <Bell className="w-4 h-4 mr-2" />
                    Subscribe for Updates
                  </Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    Expected launch: Early 2026
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gradient-sunset text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Development Timeline
            </h2>
            <p className="text-xl text-gray-200">
              Track our progress as we build the world's most comprehensive Buddhist digital archive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-heritage rounded-full"></div>
                  <CardTitle className="text-lg">Phase 1 - Current</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>• Document cataloging</li>
                  <li>• High-resolution scanning</li>
                  <li>• Metadata collection</li>
                  <li>• Platform architecture</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-primary-glow rounded-full"></div>
                  <CardTitle className="text-lg">Phase 2 - Q1 2026</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>• Beta platform launch</li>
                  <li>• Search functionality</li>
                  <li>• First manuscript collections</li>
                  <li>• Scholar tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <CardTitle className="text-lg">Phase 3 - Q2 2026</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>• Full public access</li>
                  <li>• AI translation tools</li>
                  <li>• Interactive features</li>
                  <li>• Mobile applications</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-monastery">
            Help Preserve Our Heritage
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Support our mission to digitally preserve and share Sikkim's Buddhist heritage with the world. 
            Your contribution helps us accelerate the development of this invaluable resource.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-monastery">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Tour
            </Button>
            <Button size="lg" variant="outline">
              <MapPin className="w-5 h-5 mr-2" />
              Visit Monasteries
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archives;
