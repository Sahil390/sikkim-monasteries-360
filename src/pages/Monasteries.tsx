import Navigation from "@/components/ui/navigation";
import MonasteryGrid from "@/components/monastery-grid";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin } from "lucide-react";
import { useState } from "react";

const Monasteries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Monasteries" },
    { id: "nyingma", label: "Nyingma" },
    { id: "kagyu", label: "Kagyu" },
    { id: "gelug", label: "Gelug" },
    { id: "virtual", label: "Virtual Tours" },
  ];

  return (
    <div className="min-h-screen bg-gradient-mist">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-gradient-monastery text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sacred Monasteries of Sikkim
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Explore over 200 monasteries across the mystical landscape of Sikkim. 
            Each monastery tells a unique story of faith, culture, and heritage.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-background border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search monasteries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="text-sm"
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            {/* Map View Button */}
            <Button variant="outline" className="whitespace-nowrap">
              <MapPin className="w-4 h-4 mr-2" />
              Map View
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center bg-gradient-to-br from-card to-muted/50">
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Monasteries</div>
            </Card>
            
            <Card className="p-6 text-center bg-gradient-to-br from-card to-muted/50">
              <div className="text-3xl font-bold text-heritage mb-2">4</div>
              <div className="text-sm text-muted-foreground">Buddhist Traditions</div>
            </Card>
            
            <Card className="p-6 text-center bg-gradient-to-br from-card to-muted/50">
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Virtual Tours</div>
            </Card>
            
            <Card className="p-6 text-center bg-gradient-to-br from-card to-muted/50">
              <div className="text-3xl font-bold text-primary-glow mb-2">300+</div>
              <div className="text-sm text-muted-foreground">Years History</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Monastery Grid */}
      <MonasteryGrid />

      {/* Call to Action */}
      <div className="bg-gradient-sunset text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience the Sacred Journey
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Plan your spiritual journey through Sikkim's monasteries. 
            Get guided tours, transportation, and cultural insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground">
              Plan Your Visit
            </Button>
            <Button size="lg" className="bg-white text-foreground hover:bg-gray-100">
              Download Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monasteries;