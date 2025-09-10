import { useParams } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Camera, 
  BookOpen, 
  Users, 
  Star,
  Play,
  Download,
  Share2
} from "lucide-react";

const MonasteryDetail = () => {
  const { id } = useParams();

  // Mock data - in real app this would come from an API
  const monastery = {
    id: 1,
    name: "Rumtek Monastery",
    location: "East Sikkim",
    founded: "1966",
    tradition: "Kagyu",
    visitors: "Daily 6AM-6PM",
    description: "The largest monastery in Sikkim and the main seat of the Karma Kagyu lineage outside Tibet. Also known as the Dharmachakra Centre, this monastery is a remarkable example of traditional Tibetan architecture and spiritual significance.",
    fullDescription: "Rumtek Monastery, officially known as the Dharmachakra Centre, is one of the most significant monasteries in Sikkim. Built in the 1960s by the 16th Karmapa, Rangjung Rigpe Dorje, it serves as the main seat of the Karma Kagyu lineage outside Tibet. The monastery is renowned for its authentic Tibetan architecture, precious relics, and spiritual significance in preserving Tibetan Buddhist traditions.",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1607909664584-3d3a1c7e2ac6?w=800&h=600&fit=crop",
    ],
    hasVirtualTour: true,
    rating: 4.8,
    reviews: 2156,
    highlights: [
      "Golden Stupa containing sacred relics of the 16th Karmapa",
      "Rare collection of Buddhist texts and manuscripts",
      "Traditional Tibetan architecture and design",
      "Annual Tibetan New Year celebrations",
      "Meditation and retreat facilities"
    ],
    history: "Founded in 1966 by the 16th Karmapa, Rangjung Rigpe Dorje, Rumtek Monastery was built as a replica of the original Tsurphu Monastery in Tibet. The monastery houses some of the most sacred Buddhist relics and serves as an important center for the preservation of Tibetan Buddhist culture and traditions.",
    architecture: "The monastery showcases authentic Tibetan architecture with its distinctive golden roof, intricate woodwork, and vibrant murals. The main hall can accommodate over 1,500 monks and features elaborate Buddhist iconography and artistic details that represent centuries of Tibetan craftsmanship.",
    festivals: [
      {
        name: "Tibetan New Year (Losar)",
        date: "February/March",
        description: "Colorful celebrations with traditional dances and ceremonies"
      },
      {
        name: "Buddha Purnima",
        date: "May",
        description: "Celebration of Buddha's birth, enlightenment, and death"
      },
      {
        name: "Drupka Teshi",
        date: "August",
        description: "Festival commemorating Buddha's first sermon"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-96 lg:h-[500px]">
        <img
          src={monastery.images[0]}
          alt={monastery.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute bottom-8 left-8 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-primary text-primary-foreground">
              {monastery.tradition}
            </Badge>
            <Badge variant="outline" className="border-white text-white">
              Est. {monastery.founded}
            </Badge>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-2">
            {monastery.name}
          </h1>
          <div className="flex items-center gap-4 text-lg">
            <div className="flex items-center gap-1">
              <MapPin className="w-5 h-5" />
              {monastery.location}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              {monastery.rating} ({monastery.reviews} reviews)
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-8 right-8 flex gap-3">
          {monastery.hasVirtualTour && (
            <Button size="lg" className="bg-primary hover:bg-primary-glow shadow-monastery">
              <Play className="w-5 h-5 mr-2" />
              Virtual Tour
            </Button>
          )}
          <Button variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-black">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="architecture">Architecture</TabsTrigger>
                <TabsTrigger value="festivals">Festivals</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Monastery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {monastery.fullDescription}
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg mb-3">Highlights</h4>
                      {monastery.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Image Gallery */}
                <Card>
                  <CardHeader>
                    <CardTitle>Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {monastery.images.slice(1).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${monastery.name} ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Significance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {monastery.history}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="architecture">
                <Card>
                  <CardHeader>
                    <CardTitle>Architectural Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {monastery.architecture}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="festivals">
                <Card>
                  <CardHeader>
                    <CardTitle>Annual Festivals & Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monastery.festivals.map((festival, index) => (
                        <div key={index} className="border-l-4 border-primary pl-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{festival.name}</h4>
                            <Badge variant="outline">{festival.date}</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {festival.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Visit Information */}
            <Card>
              <CardHeader>
                <CardTitle>Visit Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-heritage" />
                  <div>
                    <div className="font-medium">Opening Hours</div>
                    <div className="text-sm text-muted-foreground">{monastery.visitors}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-heritage" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">{monastery.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-heritage" />
                  <div>
                    <div className="font-medium">Tradition</div>
                    <div className="text-sm text-muted-foreground">{monastery.tradition} Buddhism</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
                
                <Button className="w-full" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Plan Visit
                </Button>
                
                <Button className="w-full" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Audio Guide
                </Button>
                
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Brochure
                </Button>
              </CardContent>
            </Card>

            {/* Related Monasteries */}
            <Card>
              <CardHeader>
                <CardTitle>Nearby Monasteries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1590736792157-0cb9b3aa2d2e?w=60&h=60&fit=crop"
                    alt="Enchey Monastery"
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Enchey Monastery</div>
                    <div className="text-xs text-muted-foreground">2.5 km away</div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=60&h=60&fit=crop"
                    alt="Do Drul Chorten"
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Do Drul Chorten</div>
                    <div className="text-xs text-muted-foreground">3.2 km away</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonasteryDetail;