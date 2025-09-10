import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, Filter, Navigation, Calendar, Users, Clock, Mountain, BookOpen } from "lucide-react";

// Import Leaflet and its CSS
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Types for our data
interface Monastery {
  id: number;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  tradition: "Nyingma" | "Kagyu" | "Sakya" | "Gelug" | "Bon";
  founded: number;
  description: string;
  highlights: string[];
  visitorInfo: {
    bestTimeToVisit: string;
    openingHours: string;
    entryFee: number;
  };
}

const InteractiveMaps = () => {
  const [monasteries, setMonasteries] = useState<Monastery[]>([]);
  const [filteredMonasteries, setFilteredMonasteries] = useState<Monastery[]>([]);
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [traditionFilter, setTraditionFilter] = useState<string>("all");
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    const sampleData: Monastery[] = [
      {
        id: 1,
        name: "Rumtek Monastery",
        location: "Rumtek, Sikkim",
        coordinates: { lat: 27.2833, lng: 88.5833 },
        tradition: "Kagyu",
        founded: 1740,
        description: "One of the most significant monasteries in Sikkim, also known as the Dharma Chakra Centre. It is a replica of the original Tibetan monastery and serves as the seat of the Kagyu lineage.",
        highlights: ["Golden Stupa", "Ancient relics", "Thangka paintings", "Prayer wheels"],
        visitorInfo: {
          bestTimeToVisit: "March to June and October to December",
          openingHours: "6:00 AM - 6:00 PM",
          entryFee: 0
        }
      },
      {
        id: 2,
        name: "Pemayangtse Monastery",
        location: "Pelling, Sikkim",
        coordinates: { lat: 27.3000, lng: 88.2333 },
        tradition: "Nyingma",
        founded: 1705,
        description: "One of the oldest monasteries in Sikkim, known for its ancient scriptures and sculptures. The monastery offers breathtaking views of the Himalayan ranges.",
        highlights: ["Seven-tiered painted wooden structure", "Ancient manuscripts", "Statue of Guru Padmasambhava"],
        visitorInfo: {
          bestTimeToVisit: "September to June",
          openingHours: "8:00 AM - 6:00 PM",
          entryFee: 20
        }
      },
      {
        id: 3,
        name: "Tashiding Monastery",
        location: "Tashiding, Sikkim",
        coordinates: { lat: 27.3167, lng: 88.3000 },
        tradition: "Nyingma",
        founded: 1641,
        description: "Perched on top of a hill between the Rathong and Rangeet rivers, this monastery is considered one of the most sacred in Sikkim.",
        highlights: ["Sacred chorten", "Bhumchu Festival", "Panoramic views"],
        visitorInfo: {
          bestTimeToVisit: "March to May and October to December",
          openingHours: "7:00 AM - 5:00 PM",
          entryFee: 0
        }
      },
      {
        id: 4,
        name: "Enchey Monastery",
        location: "Gangtok, Sikkim",
        coordinates: { lat: 27.3386, lng: 88.6164 },
        tradition: "Nyingma",
        founded: 1909,
        description: "A beautiful monastery situated on a hilltop overlooking Gangtok. It is known for its annual Chaam dances during the Lunar New Year.",
        highlights: ["Chaam dances", "Ancient scriptures", "City views"],
        visitorInfo: {
          bestTimeToVisit: "Throughout the year",
          openingHours: "6:00 AM - 4:00 PM",
          entryFee: 0
        }
      },
      {
        id: 5,
        name: "Dubdi Monastery",
        location: "Yuksom, Sikkim",
        coordinates: { lat: 27.3667, lng: 88.2167 },
        tradition: "Nyingma",
        founded: 1701,
        description: "Also known as the Hermit's Cell, it is one of the oldest monasteries in Sikkim. It is located on a hilltop and requires a short trek to reach.",
        highlights: ["Ancient architecture", "Peaceful surroundings", "Historical significance"],
        visitorInfo: {
          bestTimeToVisit: "March to May and September to November",
          openingHours: "7:00 AM - 4:00 PM",
          entryFee: 0
        }
      },
      {
        id: 6,
        name: "Phodong Monastery",
        location: "Phodong, Sikkim",
        coordinates: { lat: 27.3833, lng: 88.5833 },
        tradition: "Kagyu",
        founded: 1740,
        description: "A major monastery of the Kagyu sect, known for its beautiful murals and ancient scriptures. It was rebuilt after the 1968 earthquake.",
        highlights: ["Ancient murals", "Religious artifacts", "Peaceful atmosphere"],
        visitorInfo: {
          bestTimeToVisit: "March to June and October to December",
          openingHours: "8:00 AM - 5:00 PM",
          entryFee: 0
        }
      },
      {
        id: 7,
        name: "Ralang Monastery",
        location: "Ravangla, Sikkim",
        coordinates: { lat: 27.3167, lng: 88.3500 },
        tradition: "Kagyu",
        founded: 1768,
        description: "A beautiful monastery known for its intricate architecture and vibrant festivals. It is one of the most important monasteries in Sikkim.",
        highlights: ["Intricate architecture", "Pang Lhabsol festival", "Sacred dances"],
        visitorInfo: {
          bestTimeToVisit: "March to May and September to November",
          openingHours: "7:00 AM - 6:00 PM",
          entryFee: 0
        }
      }
    ];

    setMonasteries(sampleData);
    setFilteredMonasteries(sampleData);
  }, []);

  // Initialize map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([27.5, 88.5], 9);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      // Add markers for each monastery
      monasteries.forEach(monastery => {
        const marker = L.marker([monastery.coordinates.lat, monastery.coordinates.lng])
          .addTo(mapRef.current as L.Map)
          .bindPopup(`
            <div class="p-2">
              <h3 class="font-bold">${monastery.name}</h3>
              <p class="text-sm">${monastery.location}</p>
              <button class="mt-2 px-3 py-1 bg-blue-500 text-black rounded text-xs" onclick="document.dispatchEvent(new CustomEvent('selectMonastery', { detail: ${monastery.id} }))">
                Learn More
              </button>
            </div>
          `);
        
        marker.on('click', () => {
          setSelectedMonastery(monastery);
        });
      });

      // Custom event listener for popup buttons
      document.addEventListener('selectMonastery', ((e: CustomEvent) => {
        const monastery = monasteries.find(m => m.id === e.detail);
        if (monastery) setSelectedMonastery(monastery);
      }) as EventListener);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [monasteries]);

  // Filter monasteries based on search and tradition
  useEffect(() => {
    let result = monasteries;
    
    if (searchTerm) {
      result = result.filter(monastery => 
        monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        monastery.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (traditionFilter !== "all") {
      result = result.filter(monastery => monastery.tradition === traditionFilter);
    }
    
    setFilteredMonasteries(result);
  }, [searchTerm, traditionFilter, monasteries]);

  // Fly to selected monastery on map
  useEffect(() => {
    if (selectedMonastery && mapRef.current) {
      const { lat, lng } = selectedMonastery.coordinates;
      mapRef.current.flyTo([lat, lng], 13);
    }
  }, [selectedMonastery]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setTraditionFilter("all");
    setSelectedMonastery(null);
    if (mapRef.current) {
      mapRef.current.flyTo([27.5, 88.5], 9);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Explore Sikkim's Sacred Monasteries
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover the spiritual heritage of Sikkim through our interactive map. 
            Filter by tradition, search for specific monasteries, and plan your visit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Filters and List */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Monasteries
                </CardTitle>
                <CardDescription>
                  Narrow down your search by tradition or name
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    type="search"
                    placeholder="Search monasteries..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Buddhist Tradition</label>
                  <Select value={traditionFilter} onValueChange={setTraditionFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tradition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Traditions</SelectItem>
                      <SelectItem value="Nyingma">Nyingma</SelectItem>
                      <SelectItem value="Kagyu">Kagyu</SelectItem>
                      <SelectItem value="Sakya">Sakya</SelectItem>
                      <SelectItem value="Gelug">Gelug</SelectItem>
                      <SelectItem value="Bon">Bon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button variant="outline" className="w-full" onClick={handleResetFilters}>
                  Reset Filters
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monasteries ({filteredMonasteries.length})</CardTitle>
                <CardDescription>
                  {filteredMonasteries.length === monasteries.length 
                    ? "All monasteries in Sikkim" 
                    : "Filtered results"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {filteredMonasteries.length > 0 ? (
                  filteredMonasteries.map(monastery => (
                    <Card 
                      key={monastery.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${selectedMonastery?.id === monastery.id ? 'border-blue-500 bg-blue-50' : ''}`}
                      onClick={() => setSelectedMonastery(monastery)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{monastery.name}</h3>
                          <Badge variant="secondary">{monastery.tradition}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-1 flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {monastery.location}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-slate-500 py-4">No monasteries found matching your criteria.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Map and Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  Interactive Map
                </CardTitle>
                <CardDescription>
                  Click on markers to see monastery details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div ref={mapContainerRef} className="h-96 w-full rounded-b-lg" />
              </CardContent>
            </Card>

            {selectedMonastery ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedMonastery.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedMonastery.location}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{selectedMonastery.tradition} Tradition</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{selectedMonastery.description}</p>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Mountain className="h-4 w-4 mr-1" />
                      Highlights
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMonastery.highlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary">{highlight}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Tabs defaultValue="visitor" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="visitor">Visitor Info</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="visitor">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-slate-500" />
                          <span className="text-sm">{selectedMonastery.visitorInfo.openingHours}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                          <span className="text-sm">{selectedMonastery.visitorInfo.bestTimeToVisit}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-slate-500" />
                          <span className="text-sm">Entry Fee: {selectedMonastery.visitorInfo.entryFee === 0 ? 'Free' : `₹${selectedMonastery.visitorInfo.entryFee}`}</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="history">
                      <div className="mt-4 space-y-2">
                        <p><span className="font-medium">Founded:</span> {selectedMonastery.founded}</p>
                        <p><span className="font-medium">Tradition:</span> {selectedMonastery.tradition}</p>
                        <Button variant="outline" className="mt-2">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Learn more about {selectedMonastery.tradition} tradition
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Welcome to Sikkim's Spiritual Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Select a monastery from the list or click on a marker on the map to see detailed information.
                    Use the filters to narrow down your search by tradition or name.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMaps;