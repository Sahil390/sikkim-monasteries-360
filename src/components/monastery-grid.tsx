import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Camera } from "lucide-react";
import { Link } from "react-router-dom";

import Phe from "../assets/Phensang-Monastery-OG-Image.jpg";
import Ph from "../assets/image1.png";
import Phi from "../assets/image.png";
import rumtekImg from "../assets/rumtek-monastery.jpg";
import PemayangsteImg from "../assets/Pemayangtse-Monastery.jpg";
import EncheyImg from "../assets/Enchey-monastery.jpg";

const monasteries = [
  {
    id: 1,
    name: "Rumtek Monastery",
    location: "East Sikkim",
    founded: "1966",
    tradition: "Kagyu",
    visitors: "Daily 6AM-6PM",
    image: rumtekImg,
    description: "The largest monastery in Sikkim, headquarters of the Karma Kagyu lineage.",
    hasVirtualTour: true,
  },
  {
    id: 2,
    name: "Pemayangtse Monastery",
    location: "West Sikkim",
    founded: "1705",
    tradition: "Nyingma",
    visitors: "Daily 7AM-5PM",
    image: PemayangsteImg,
    description: "One of the oldest and most important monasteries of Sikkim.",
    hasVirtualTour: true,
  },
  {
    id: 3,
    name: "Enchey Monastery",
    location: "Gangtok",
    founded: "1909",
    tradition: "Nyingma",
    visitors: "Daily 6AM-7PM",
    image: EncheyImg,
    description: "Beautiful monastery with stunning views of Gangtok city.",
    hasVirtualTour: false,
  },
  {
    id: 4,
    name: "Tashiding Monastery",
    location: "West Sikkim",
    founded: "1641",
    tradition: "Nyingma",
    visitors: "Daily 6AM-6PM",
    image: Phi,
    description: "Sacred monastery situated on a hilltop between two rivers.",
    hasVirtualTour: true,
  },
  {
    id: 5,
    name: "Dubdi Monastery",
    location: "West Sikkim",
    founded: "1701",
    tradition: "Nyingma",
    visitors: "Daily 7AM-5PM",
    image: Ph,
    description: "The first monastery established in Sikkim.",
    hasVirtualTour: false,
  },
  {
    id: 6,
    name: "Phensang Monastery",
    location: "North Sikkim",
    founded: "1721",
    tradition: "Gelug",
    visitors: "Daily 6AM-6PM",
    image: Phe,
    description: "Remote monastery with breathtaking Himalayan views.",
    hasVirtualTour: true,
  },
];

const MonasteryGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-monastery">
          Explore Sacred Monasteries
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover the spiritual heritage of Sikkim through our curated collection 
          of monasteries, each with its unique history and traditions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {monasteries.map((monastery) => (
          <Card key={monastery.id} className="overflow-hidden hover:shadow-monastery transition-all duration-300 group">
            <div className="relative">
              <img
                src={monastery.image}
                alt={monastery.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {monastery.hasVirtualTour && (
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                  <Camera className="w-3 h-3 mr-1" />
                  360° Tour
                </Badge>
              )}
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary">{monastery.tradition}</Badge>
                <span className="text-sm text-muted-foreground">Est. {monastery.founded}</span>
              </div>
              
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {monastery.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                {monastery.description}
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2 text-heritage" />
                  {monastery.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2 text-heritage" />
                  {monastery.visitors}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link to={`/monastery/${monastery.id}`}>
                    Learn More
                  </Link>
                </Button>
                {monastery.hasVirtualTour && (
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/virtual-tours?tour=${encodeURIComponent(
                      monastery.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                    )}`}>
                      <Camera className="w-4 h-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button asChild variant="outline" size="lg">
          <Link to="/monasteries">
            <MapPin className="w-4 h-4 mr-2" />
            View All Monasteries
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MonasteryGrid;