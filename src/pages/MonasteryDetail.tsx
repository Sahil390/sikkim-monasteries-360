import { useParams } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import rumtekImg1 from "../assets/rumtek-gallery-1.webp";
import rumtekImg2 from "../assets/rumtek-gallery-2.webp";
import rumtekImg3 from "../assets/rumtek-galery-3.jpg";
import pemayangsteImg1 from "../assets/Pemayangtse-Monastery.jpg";
import pemayangsteImg2 from "../assets/Pemayangtse-gallery-1.jpg";
import pemayansteImg3 from "../assets/Pemayangtse_gallery-2.jpg";
import encheyImg1 from "../assets/Enchey-gallery-1.jpg";
import encheyImg2 from "../assets/Enchey-gallery-2.jpg";
import encheyImg3 from "../assets/Enchey-gallery-3.webp";
import tashidingImg1 from "../assets/Tashiding-gallery-1.jpg";
import tashidingImg2 from "../assets/Tashiding-gallery-2.jpg";
import tashidingImg3 from "../assets/Tashiding-gallery-3.jpg";
import dubdiImg1 from "../assets/dubdi-gallery-1.jpg";
import dubdiImg2 from "../assets/dubdi-gallery-2.jpg";
import dubdiImg3 from "../assets/Dubdi-gallery-3.jpg";
import phensangImg1 from "../assets/Tashiding-gallery-1.jpg";
import phensangImg2 from "../assets/Tashiding-gallery-2.jpg";
import phensangImg3 from "../assets/Tashiding-gallery-3.jpg";


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
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { toSlug } from "@/lib/utils";

const monasteries = [
    {
      id: 1,
      name: "Rumtek Monastery",
      location: "East Sikkim",
      founded: "1966",
      tradition: "Kagyu",
      visitors: "Daily 6AM-6PM",
      description: "The largest monastery in Sikkim and the main seat of the Karma Kagyu lineage outside Tibet. Also known as the Dharmachakra Centre, this monastery is a remarkable example of traditional Tibetan architecture and spiritual significance.",
      fullDescription: "Rumtek Monastery, officially known as the Dharmachakra Centre, is one of the most significant monasteries in Sikkim. Built in the 1960s by the 16th Karmapa, Rangjung Rigpe Dorje, it serves as the main seat of the Karma Kagyu lineage outside Tibet. The monastery is renowned for its authentic Tibetan architecture, precious relics, and spiritual significance in preserving Tibetan Buddhist traditions.",
      images: [
        rumtekImg1,
        rumtekImg2,
        rumtekImg3
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
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      location: "West Sikkim",
      founded: "1705",
      tradition: "Nyingma",
      visitors: "Daily 7AM-5PM",
      description: "One of the oldest and most important monasteries of Sikkim, known for its spiritual significance and stunning views.",
      fullDescription: "Pemayangtse Monastery is a historic and spiritual landmark in Sikkim. Built in 1705, it is one of the oldest monasteries in the region and serves as a key center for the Nyingma tradition of Tibetan Buddhism. The monastery is renowned for its exquisite wooden sculptures, ancient relics, and serene surroundings.",
      images: [
        pemayangsteImg1,
        pemayangsteImg2,
        pemayansteImg3
      ],
      hasVirtualTour: true,
      rating: 4.7,
      reviews: 1890,
      highlights: [
        "Ancient wooden sculptures and relics",
        "Panoramic views of the Himalayas",
        "Annual Cham dance festival",
        "Peaceful meditation retreats"
      ],
      history: "Pemayangtse Monastery was established in 1705 by Lama Lhatsun Chempo. It has played a pivotal role in the spiritual and cultural history of Sikkim, serving as a center for meditation, learning, and preservation of Buddhist traditions.",
      architecture: "The monastery features traditional Tibetan architecture with intricate wood carvings, vibrant murals, and a three-story structure that houses sacred relics and statues.",
      festivals: [
        {
          name: "Cham Dance Festival",
          date: "January",
          description: "Traditional masked dance performed by monks"
        },
        {
          name: "Saga Dawa",
          date: "June",
          description: "Celebration of Buddha's life and teachings"
        }
      ]
    },
    {
      id: 3,
      name: "Enchey Monastery",
      location: "Gangtok",
      founded: "1909",
      tradition: "Nyingma",
      visitors: "Daily 6AM-7PM",
      description: "A serene monastery offering stunning views of Gangtok and the surrounding mountains.",
      fullDescription: "Enchey Monastery, located in Gangtok, is a small yet significant monastery in the Nyingma tradition of Tibetan Buddhism. Built in 1909, it is known for its peaceful ambiance, vibrant festivals, and breathtaking views of the surrounding mountains.",
      images: [
        encheyImg1,
        encheyImg2,
        encheyImg3
      ],
      hasVirtualTour: false,
      rating: 4.5,
      reviews: 1320,
      highlights: [
        "Peaceful environment for meditation",
        "Annual Pang Lhabsol festival",
        "Stunning views of Gangtok city"
      ],
      history: "Enchey Monastery was established in 1909 on the site blessed by Lama Drupthob Karpo, a tantric master known for his flying powers. The monastery has since been a center for spiritual practice and community gatherings.",
      architecture: "The monastery features a traditional Tibetan design with colorful prayer flags, intricate murals, and a serene courtyard.",
      festivals: [
        {
          name: "Pang Lhabsol",
          date: "September",
          description: "Festival honoring the guardian deities of Sikkim"
        },
        {
          name: "Losoong",
          date: "December",
          description: "Harvest festival celebrated with traditional dances and rituals"
        }
      ]
    },
    {
      id: 4,
      name: "Tashiding Monastery",
      location: "West Sikkim",
      founded: "1641",
      tradition: "Nyingma",
      visitors: "Daily 6AM-6PM",
      description: "Sacred monastery situated on a hilltop between two rivers, known for its spiritual significance.",
      fullDescription: "Tashiding Monastery is one of the holiest monasteries in Sikkim, founded in 1641 by Ngadak Sempa Chempo Phunshok Rigzing. It is renowned for its sacred chorten and annual Bumchu festival, which attracts devotees from across the region.",
      images: [
        tashidingImg1,
        tashidingImg2,
        tashidingImg3
      ],
      hasVirtualTour: true,
      rating: 4.6,
      reviews: 1450,
      highlights: [
        "Sacred chorten containing holy relics",
        "Annual Bumchu festival",
        "Panoramic views of the surrounding valleys"
      ],
      history: "Tashiding Monastery was established in 1641 and is considered one of the most sacred sites in Sikkim. It has been a center for spiritual practice and pilgrimage for centuries.",
      architecture: "The monastery features traditional Tibetan architecture with its iconic chorten and vibrant murals.",
      festivals: [
        {
          name: "Bumchu Festival",
          date: "March",
          description: "Annual festival featuring the sacred water ceremony"
        }
      ]
    },
    {
      id: 5,
      name: "Dubdi Monastery",
      location: "West Sikkim",
      founded: "1701",
      tradition: "Nyingma",
      visitors: "Daily 7AM-5PM",
      description: "The first monastery established in Sikkim, offering a serene and historic atmosphere.",
      fullDescription: "Dubdi Monastery, also known as the Yuksom Monastery, was established in 1701 by Lhatsun Namkha Jigme. It is the oldest monastery in Sikkim and holds great historical and spiritual significance.",
      images: [
        dubdiImg1,
        dubdiImg2,
        dubdiImg3
      ],
      hasVirtualTour: false,
      rating: 4.4,
      reviews: 1200,
      highlights: [
        "Historic significance as the first monastery in Sikkim",
        "Peaceful environment for meditation",
        "Scenic location amidst lush greenery"
      ],
      history: "Dubdi Monastery was established in 1701 and is an important site in the history of Sikkimese Buddhism. It served as the coronation site for the first Chogyal (king) of Sikkim.",
      architecture: "The monastery features a simple yet elegant design with traditional Tibetan elements.",
      festivals: [
        {
          name: "Losar",
          date: "February",
          description: "Tibetan New Year celebrations with traditional rituals"
        }
      ]
    },
    {
      id: 6,
      name: "Phensang Monastery",
      location: "North Sikkim",
      founded: "1721",
      tradition: "Gelug",
      visitors: "Daily 6AM-6PM",
      description: "Remote monastery with breathtaking Himalayan views and a rich spiritual heritage.",
      fullDescription: "Phensang Monastery, established in 1721, is a prominent Gelug monastery in North Sikkim. It is known for its serene location, vibrant festivals, and contributions to the preservation of Tibetan Buddhist traditions.",
      images: [
          phensangImg1,
          phensangImg2,
          phensangImg3,
      ],
      hasVirtualTour: true,
      rating: 4.7,
      reviews: 1350,
      highlights: [
        "Stunning views of the Himalayas",
        "Annual Cham dance festival",
        "Peaceful retreat for meditation"
      ],
      history: "Phensang Monastery was established in 1721 and has been a center for spiritual learning and practice for centuries. It is one of the largest monasteries in Sikkim.",
      architecture: "The monastery features traditional Tibetan architecture with vibrant murals and intricate woodwork.",
      festivals: [
        {
          name: "Cham Dance Festival",
          date: "December",
          description: "Traditional masked dance performed by monks"
        }
      ]
    }
  ];

const MonasteryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const monastery = monasteries.find(m => m.id === Number(id));

  if (!monastery) {
    return <div>Monastery not found</div>;
  }

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
            <Button size="lg" className="bg-primary hover:bg-primary-glow shadow-monastery" onClick={() => navigate(`/virtual-tours?tour=${toSlug(monastery.name)}`)}>
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
                <Button className="w-full" variant="outline" onClick={() => navigate(`/maps?monastery=${toSlug(monastery.name)}`)}>
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
                
                <Button className="w-full" variant="outline" onClick={() => navigate('/plan-your-visit')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Plan Visit
                </Button>
                
                <Button className="w-full" variant="outline" onClick={() => toast({ title: 'Audio Guide', description: 'Audio guide is coming soon.' })}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Audio Guide
                </Button>
                
                <Button className="w-full" variant="outline" onClick={() => {
                  // Trigger a fake download (placeholder)
                  const blob = new Blob([`Brochure for ${monastery.name}`], { type: 'application/pdf' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${toSlug(monastery.name)}-brochure.pdf`;
                  a.click();
                  URL.revokeObjectURL(url);
                  toast({ title: 'Download started', description: 'Brochure download started.' });
                }}>
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