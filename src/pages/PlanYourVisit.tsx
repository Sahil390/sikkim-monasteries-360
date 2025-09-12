import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Clock, DollarSign, Users, ChevronRight, Download, 
  Plane, Hotel, Package, Mail, User, Shield, CreditCard, Search, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Mock API services (in a real app, these would be actual API calls)
const flightAPI = {
  search: async (from: string, to: string, date: Date, passengers: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return [
      { id: 1, airline: "Air India", departure: "06:00", arrival: "08:45", price: 189, duration: "2h 45m" },
      { id: 2, airline: "IndiGo", departure: "09:30", arrival: "12:15", price: 167, duration: "2h 45m" },
      { id: 3, airline: "Vistara", departure: "14:15", arrival: "17:00", price: 210, duration: "2h 45m" },
      { id: 4, airline: "SpiceJet", departure: "18:45", arrival: "21:30", price: 155, duration: "2h 45m" },
    ];
  }
};

const hotelAPI = {
  search: async (location: string, checkIn: Date, checkOut: Date, guests: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return [
      { id: 1, name: "Luxury Himalayan Resort", location: "Gangtok", price: 120, rating: 4.8, amenities: ["Free WiFi", "Breakfast", "Spa"] },
      { id: 2, name: "Traditional Sikkim Lodge", location: "Pelling", price: 75, rating: 4.3, amenities: ["Mountain View", "Restaurant"] },
      { id: 3, name: "Boutique Monastery Stay", location: "Rumtek", price: 95, rating: 4.6, amenities: ["Cultural Experience", "Yoga Classes"] },
      { id: 4, name: "Premium Gangtok Hotel", location: "Gangtok", price: 145, rating: 4.7, amenities: ["Swimming Pool", "Fine Dining", "Airport Transfer"] },
    ];
  }
};

const emailService = {
  sendItinerary: async (email: string, itineraryData: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real application, this would use Nodemailer, SendGrid, or another email service
    console.log("Sending email to:", email, "with data:", itineraryData);
    
    return { success: true, message: "Itinerary sent successfully!" };
  }
};

const PlanYourVisit = () => {
  const [date, setDate] = useState<Date>();
  const [selectedMonasteries, setSelectedMonasteries] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("planner");
  const [currentStep, setCurrentStep] = useState(1);
  const [flightData, setFlightData] = useState({
    from: "",
    to: "IXB (Bagdogra Airport)",
    departureDate: new Date(),
    returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    passengers: 1,
  });
  const [hotelData, setHotelData] = useState({
    location: "Gangtok",
    checkIn: new Date(),
    checkOut: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    rooms: 1,
    guests: 2,
  });
  const [selectedPackage, setSelectedPackage] = useState("");
  const [visitorInfo, setVisitorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    groupSize: "",
    specialRequirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flightResults, setFlightResults] = useState<any[]>([]);
  const [hotelResults, setHotelResults] = useState<any[]>([]);
  const [searchingFlights, setSearchingFlights] = useState(false);
  const [searchingHotels, setSearchingHotels] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null);
  const { toast } = useToast();

  const popularMonasteries = [
    { id: "rumtek", name: "Rumtek Monastery", location: "Near Gangtok", bestTime: "Mar-May, Sep-Nov" },
    { id: "pemayangtse", name: "Pemayangtse Monastery", location: "Pelling", bestTime: "Feb-Apr, Oct-Dec" },
    { id: "tsuklakhang", name: "Tsuklakhang Palace Monastery", location: "Gangtok", bestTime: "Year-round" },
    { id: "enchey", name: "Enchey Monastery", location: "Gangtok", bestTime: "During festivals" },
    { id: "tashiding", name: "Tashiding Monastery", location: "West Sikkim", bestTime: "Feb-Apr" },
  ];

  const travelPackages = [
    {
      id: "basic",
      name: "Basic Spiritual Tour",
      price: 299,
      duration: "5 days / 4 nights",
      includes: ["Accommodation (3-star)", "Local transportation", "Guide services", "3 monastery visits"],
      bestFor: "Budget travelers"
    },
    {
      id: "standard",
      name: "Standard Cultural Experience",
      price: 599,
      duration: "7 days / 6 nights",
      includes: ["Accommodation (4-star)", "All meals", "Private transportation", "5 monastery visits", "Cultural shows"],
      bestFor: "Most travelers",
      popular: true
    },
    {
      id: "premium",
      name: "Premium Himalayan Retreat",
      price: 999,
      duration: "10 days / 9 nights",
      includes: ["Luxury accommodation", "Gourmet meals", "Helicopter transfer", "All monastery visits", "Spa treatments", "Personal guide"],
      bestFor: "Luxury seekers"
    }
  ];

  const travelTips = [
    {
      title: "Best Time to Visit",
      content: "March to May and September to November offer the best weather for monastery visits with clear skies and pleasant temperatures."
    },
    {
      title: "Dress Code",
      content: "Modest clothing is required. Cover shoulders and knees. Remove shoes before entering prayer halls and main temples."
    },
    {
      title: "Photography",
      content: "Always ask for permission before taking photos, especially of monks and religious ceremonies. Some areas may prohibit photography."
    },
    {
      title: "Donations",
      content: "Consider making a donation to support the maintenance of these sacred sites. There are usually donation boxes near the entrance."
    }
  ];

  const toggleMonasterySelection = (monasteryId: string) => {
    if (selectedMonasteries.includes(monasteryId)) {
      setSelectedMonasteries(selectedMonasteries.filter(id => id !== monasteryId));
    } else {
      setSelectedMonasteries([...selectedMonasteries, monasteryId]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVisitorInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleFlightChange = (field: string, value: any) => {
    setFlightData(prev => ({ ...prev, [field]: value }));
  };

  const handleHotelChange = (field: string, value: any) => {
    setHotelData(prev => ({ ...prev, [field]: value }));
  };

  const searchFlights = async () => {
    if (!flightData.from) {
      toast({
        title: "Missing Information",
        description: "Please enter a departure city",
        variant: "destructive"
      });
      return;
    }

    setSearchingFlights(true);
    try {
      const results = await flightAPI.search(
        flightData.from, 
        flightData.to, 
        flightData.departureDate, 
        flightData.passengers
      );
      setFlightResults(results);
      toast({
        title: "Flights Found",
        description: `Found ${results.length} flight options`
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Could not search for flights. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSearchingFlights(false);
    }
  };

  const searchHotels = async () => {
    setSearchingHotels(true);
    try {
      const results = await hotelAPI.search(
        hotelData.location, 
        hotelData.checkIn, 
        hotelData.checkOut, 
        hotelData.guests
      );
      setHotelResults(results);
      toast({
        title: "Hotels Found",
        description: `Found ${results.length} hotel options in ${hotelData.location}`
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Could not search for hotels. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSearchingHotels(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare itinerary data
      const itineraryData = {
        date, 
        selectedMonasteries, 
        visitorInfo, 
        flightData: selectedFlight ? flightResults.find(f => f.id === selectedFlight) : null,
        hotelData: selectedHotel ? hotelResults.find(h => h.id === selectedHotel) : null,
        selectedPackage: travelPackages.find(p => p.id === selectedPackage)
      };
      
      // Send email
      const result = await emailService.sendItinerary(visitorInfo.email, itineraryData);
      
      if (result.success) {
        toast({
          title: "Success!",
          description: "Your itinerary has been sent to your email.",
        });
        setCurrentStep(1);
        setActiveTab("confirmation");
      } else {
        throw new Error("Email sending failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your itinerary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Auto-search for hotels when location changes
  useEffect(() => {
    if (currentStep === 2) {
      searchHotels();
    }
  }, [hotelData.location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Monastery Visit Planner</h1>
            <p className="text-slate-600">Plan your spiritual journey through Sikkim's sacred monasteries</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="flex items-center mr-4">
              <User className="h-5 w-5 text-slate-500 mr-2" />
              <span className="text-sm text-slate-600">Dashboard</span>
            </div>
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              My Plans
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">Create Your Visit Plan</CardTitle>
                    <CardDescription className="text-blue-100">
                      Follow these steps to plan your perfect monastery tour
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    Step {currentStep} of 4
                  </Badge>
                </div>
                <Progress value={currentStep * 25} className="mt-2 bg-blue-700" />
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Monastery Selection */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Select Monasteries to Visit</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {popularMonasteries.map(monastery => (
                            <div
                              key={monastery.id}
                              className={cn(
                                "border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
                                selectedMonasteries.includes(monastery.id)
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-slate-200 hover:border-slate-300"
                              )}
                              onClick={() => toggleMonasterySelection(monastery.id)}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium">{monastery.name}</h4>
                                  <div className="flex items-center mt-1 text-sm text-slate-500">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {monastery.location}
                                  </div>
                                </div>
                                <Badge variant="outline" className="ml-2">
                                  {monastery.bestTime}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div></div>
                        <Button onClick={nextStep} disabled={selectedMonasteries.length === 0}>
                          Next: Travel Details <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Travel & Accommodation */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4 flex items-center">
                            <Plane className="h-5 w-5 mr-2 text-blue-500" />
                            Flight Options
                          </h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Departure From</Label>
                              <Input 
                                value={flightData.from} 
                                onChange={(e) => handleFlightChange("from", e.target.value)}
                                placeholder="City or airport code" 
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Destination</Label>
                              <Select 
                                value={flightData.to} 
                                onValueChange={(value) => handleFlightChange("to", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select destination" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="IXB (Bagdogra Airport)">IXB (Bagdogra Airport)</SelectItem>
                                  <SelectItem value="PBH (Paro Airport)">PBH (Paro Airport, Bhutan)</SelectItem>
                                  <SelectItem value="GAU (Guwahati Airport)">GAU (Guwahati Airport)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Departure Date</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !flightData.departureDate && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {flightData.departureDate ? format(flightData.departureDate, "PPP") : <span>Pick date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={flightData.departureDate}
                                      onSelect={(date) => handleFlightChange("departureDate", date)}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="space-y-2">
                                <Label>Return Date</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !flightData.returnDate && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {flightData.returnDate ? format(flightData.returnDate, "PPP") : <span>Pick date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={flightData.returnDate}
                                      onSelect={(date) => handleFlightChange("returnDate", date)}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Passengers</Label>
                              <Select 
                                value={flightData.passengers.toString()} 
                                onValueChange={(value) => handleFlightChange("passengers", parseInt(value))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Number of passengers" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 Passenger</SelectItem>
                                  <SelectItem value="2">2 Passengers</SelectItem>
                                  <SelectItem value="3">3 Passengers</SelectItem>
                                  <SelectItem value="4">4 Passengers</SelectItem>
                                  <SelectItem value="5">5+ Passengers</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button 
                              onClick={searchFlights} 
                              disabled={searchingFlights || !flightData.from}
                              className="w-full"
                            >
                              {searchingFlights ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Searching...
                                </>
                              ) : (
                                <>
                                  <Search className="mr-2 h-4 w-4" />
                                  Search Flights
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-4 flex items-center">
                            <Hotel className="h-5 w-5 mr-2 text-amber-500" />
                            Hotel Options
                          </h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Preferred Location</Label>
                              <Select 
                                value={hotelData.location} 
                                onValueChange={(value) => handleHotelChange("location", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Gangtok">Gangtok</SelectItem>
                                  <SelectItem value="Pelling">Pelling</SelectItem>
                                  <SelectItem value="Rumtek">Rumtek</SelectItem>
                                  <SelectItem value="Yuksom">Yuksom</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Check-in Date</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !hotelData.checkIn && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {hotelData.checkIn ? format(hotelData.checkIn, "PPP") : <span>Pick date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={hotelData.checkIn}
                                      onSelect={(date) => handleHotelChange("checkIn", date)}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="space-y-2">
                                <Label>Check-out Date</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !hotelData.checkOut && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {hotelData.checkOut ? format(hotelData.checkOut, "PPP") : <span>Pick date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={hotelData.checkOut}
                                      onSelect={(date) => handleHotelChange("checkOut", date)}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Rooms</Label>
                                <Select 
                                  value={hotelData.rooms.toString()} 
                                  onValueChange={(value) => handleHotelChange("rooms", parseInt(value))}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Number of rooms" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 Room</SelectItem>
                                    <SelectItem value="2">2 Rooms</SelectItem>
                                    <SelectItem value="3">3 Rooms</SelectItem>
                                    <SelectItem value="4">4+ Rooms</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Guests</Label>
                                <Select 
                                  value={hotelData.guests.toString()} 
                                  onValueChange={(value) => handleHotelChange("guests", parseInt(value))}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Number of guests" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 Guest</SelectItem>
                                    <SelectItem value="2">2 Guests</SelectItem>
                                    <SelectItem value="3">3 Guests</SelectItem>
                                    <SelectItem value="4">4 Guests</SelectItem>
                                    <SelectItem value="5">5+ Guests</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <Button 
                              onClick={searchHotels} 
                              disabled={searchingHotels}
                              className="w-full"
                            >
                              {searchingHotels ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Searching...
                                </>
                              ) : (
                                <>
                                  <Search className="mr-2 h-4 w-4" />
                                  Search Hotels
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={prevStep}>
                          Back
                        </Button>
                        <Button onClick={nextStep}>
                          Next: Select Package <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Package Selection */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Package className="h-5 w-5 mr-2 text-emerald-500" />
                        Select a Travel Package
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {travelPackages.map((pkg) => (
                          <div
                            key={pkg.id}
                            className={cn(
                              "border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
                              selectedPackage === pkg.id
                                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                : "border-slate-200 hover:border-slate-300"
                            )}
                            onClick={() => setSelectedPackage(pkg.id)}
                          >
                            {pkg.popular && (
                              <div className="flex justify-end">
                                <Badge className="mb-2 bg-blue-600">Most Popular</Badge>
                              </div>
                            )}
                            <h4 className="font-medium text-lg">{pkg.name}</h4>
                            <div className="mt-2">
                              <span className="text-2xl font-bold">${pkg.price}</span>
                              <span className="text-slate-600">/person</span>
                            </div>
                            <div className="text-sm text-slate-600 mt-1">{pkg.duration}</div>
                            <Separator className="my-3" />
                            <div className="text-sm">
                              <div className="font-medium mb-1">Includes:</div>
                              <ul className="space-y-1">
                                {pkg.includes.map((item, index) => (
                                  <li key={index} className="flex items-start">
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="text-xs text-slate-500 mt-3">Best for: {pkg.bestFor}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={prevStep}>
                          Back
                        </Button>
                        <Button onClick={nextStep} disabled={!selectedPackage}>
                          Next: Personal Details <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Personal Details */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={visitorInfo.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={visitorInfo.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={visitorInfo.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="groupSize">Group Size</Label>
                          <Select onValueChange={(value) => setVisitorInfo(prev => ({ ...prev, groupSize: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Number of people" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Solo (1 person)</SelectItem>
                              <SelectItem value="2">Couple (2 people)</SelectItem>
                              <SelectItem value="3-5">Small group (3-5 people)</SelectItem>
                              <SelectItem value="6-10">Medium group (6-10 people)</SelectItem>
                              <SelectItem value="10+">Large group (10+ people)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialRequirements">Special Requirements</Label>
                        <Textarea
                          id="specialRequirements"
                          name="specialRequirements"
                          value={visitorInfo.specialRequirements}
                          onChange={handleInputChange}
                          placeholder="Mobility needs, dietary restrictions, special interests..."
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={prevStep}>
                          Back
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Mail className="mr-2 h-4 w-4" />
                              Send My Plan
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Flight Options Card */}
            {currentStep === 2 && flightResults.length > 0 && (
              <Card className="mt-6 shadow-md border-0">
                <CardHeader className="bg-slate-50 py-3">
                  <CardTitle className="text-lg">Available Flights</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {flightResults.map(flight => (
                      <div 
                        key={flight.id} 
                        className={cn(
                          "flex items-center justify-between p-3 border rounded-lg transition-all",
                          selectedFlight === flight.id 
                            ? "border-blue-500 bg-blue-50" 
                            : "border-slate-200 hover:border-slate-300 cursor-pointer"
                        )}
                        onClick={() => setSelectedFlight(flight.id)}
                      >
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-lg mr-4">
                            <Plane className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{flight.airline}</div>
                            <div className="text-sm text-slate-600">
                              {flight.departure} - {flight.arrival} • {flight.duration}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${flight.price}</div>
                          <Button size="sm" className="mt-2" variant={selectedFlight === flight.id ? "default" : "outline"}>
                            {selectedFlight === flight.id ? "Selected" : "Select"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Hotel Options Card */}
            {currentStep === 2 && hotelResults.length > 0 && (
              <Card className="mt-6 shadow-md border-0">
                <CardHeader className="bg-slate-50 py-3">
                  <CardTitle className="text-lg">Recommended Hotels</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {hotelResults.map(hotel => (
                      <div 
                        key={hotel.id} 
                        className={cn(
                          "flex items-center justify-between p-3 border rounded-lg transition-all",
                          selectedHotel === hotel.id 
                            ? "border-blue-500 bg-blue-50" 
                            : "border-slate-200 hover:border-slate-300 cursor-pointer"
                        )}
                        onClick={() => setSelectedHotel(hotel.id)}
                      >
                        <div className="flex items-center">
                          <div className="bg-amber-100 p-2 rounded-lg mr-4">
                            <Hotel className="h-6 w-6 text-amber-600" />
                          </div>
                          <div>
                            <div className="font-medium">{hotel.name}</div>
                            <div className="text-sm text-slate-600 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {hotel.location}
                              <span className="mx-2">•</span>
                              <span className="flex items-center">
                                {hotel.rating} ★
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              {hotel.amenities.join(" • ")}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${hotel.price}<span className="text-sm font-normal">/night</span></div>
                          <Button size="sm" className="mt-2" variant={selectedHotel === hotel.id ? "default" : "outline"}>
                            {selectedHotel === hotel.id ? "Selected" : "Select"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-white">Plan Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {selectedMonasteries.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Selected Monasteries</h4>
                    <div className="space-y-2">
                      {selectedMonasteries.map(id => {
                        const monastery = popularMonasteries.find(m => m.id === id);
                        return monastery ? (
                          <div key={id} className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                            {monastery.name}
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {selectedFlight && (
                  <div>
                    <h4 className="font-medium mb-2">Selected Flight</h4>
                    <div className="text-sm">
                      <div>{flightResults.find(f => f.id === selectedFlight)?.airline}</div>
                      <div className="text-slate-600">
                        {flightData.from} → {flightData.to}
                      </div>
                      <div className="text-slate-600">
                        {flightData.departureDate && format(flightData.departureDate, "MMM d")} - 
                        {flightData.returnDate && format(flightData.returnDate, "MMM d")}
                      </div>
                    </div>
                  </div>
                )}

                {selectedHotel && (
                  <div>
                    <h4 className="font-medium mb-2">Selected Hotel</h4>
                    <div className="text-sm">
                      <div>{hotelResults.find(h => h.id === selectedHotel)?.name}</div>
                      <div className="text-slate-600">
                        {hotelData.location}
                      </div>
                      <div className="text-slate-600">
                        {hotelData.checkIn && format(hotelData.checkIn, "MMM d")} - 
                        {hotelData.checkOut && format(hotelData.checkOut, "MMM d")}
                      </div>
                    </div>
                  </div>
                )}

                {selectedPackage && (
                  <div>
                    <h4 className="font-medium mb-2">Selected Package</h4>
                    <div className="text-sm">
                      {travelPackages.find(p => p.id === selectedPackage)?.name}
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Estimated Total</span>
                  <span>
                    {selectedPackage ? 
                      `$${travelPackages.find(p => p.id === selectedPackage)?.price}` : 
                      "Select a package"
                    }
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0">
              <CardHeader>
                <CardTitle>Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Visiting Hours</h4>
                    <p className="text-sm text-slate-600">Most monasteries: 7 AM - 6 PM</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Entry Fees</h4>
                    <p className="text-sm text-slate-600">Some monasteries charge nominal fees (₹20-100)</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-medium">Guided Tours</h4>
                    <p className="text-sm text-slate-600">Available at major monasteries</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-0">
              <CardHeader>
                <CardTitle>Download Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Monastery Etiquette Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Sikkim Travel Checklist
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Monastery Map & Locations
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {activeTab === "confirmation" && (
          <Card className="mt-8 shadow-lg border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-800 flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Plan Sent Successfully!
              </CardTitle>
              <CardDescription>
                Your personalized monastery visit plan has been sent to your email address.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-4">
                <div className="rounded-full bg-green-100 p-3 inline-flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Check Your Inbox</h3>
                <p className="text-slate-600 mb-4">
                  We've sent your detailed itinerary to {visitorInfo.email}. 
                  The email includes your flight options, hotel recommendations, 
                  and a day-by-day breakdown of your monastery visits.
                </p>
                <Button onClick={() => setActiveTab("planner")}>
                  Create Another Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
export default PlanYourVisit;