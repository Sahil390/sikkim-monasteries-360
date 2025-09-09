import Navigation from "@/components/ui/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Filter,
  Search,
  Bell,
  Download,
  Share2
} from "lucide-react";
import { useState } from "react";

interface Event {
  id: number;
  title: string;
  monastery: string;
  location: string;
  date: Date;
  time: string;
  category: "festival" | "ceremony" | "teaching" | "meditation" | "special";
  description: string;
  duration: string;
  participants: number;
  isBookable: boolean;
  featured: boolean;
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Events", color: "bg-primary" },
    { id: "festival", label: "Festivals", color: "bg-heritage" },
    { id: "ceremony", label: "Ceremonies", color: "bg-accent" },
    { id: "teaching", label: "Teachings", color: "bg-primary-glow" },
    { id: "meditation", label: "Meditation", color: "bg-muted" },
    { id: "special", label: "Special Events", color: "bg-destructive" }
  ];

  // Sample events data
  const events: Event[] = [
    {
      id: 1,
      title: "Losar Festival",
      monastery: "Rumtek Monastery",
      location: "East Sikkim",
      date: new Date(2025, 11, 15), // December 15, 2025
      time: "6:00 AM",
      category: "festival",
      description: "Tibetan New Year celebration with traditional dances, prayers, and festivities.",
      duration: "3 days",
      participants: 500,
      isBookable: true,
      featured: true
    },
    {
      id: 2,
      title: "Morning Prayer Session",
      monastery: "Pemayangtse Monastery",
      location: "West Sikkim",
      date: new Date(2025, 8, 10), // September 10, 2025
      time: "5:30 AM",
      category: "ceremony",
      description: "Daily morning prayers open to visitors. Experience authentic Buddhist chanting.",
      duration: "2 hours",
      participants: 50,
      isBookable: true,
      featured: false
    },
    {
      id: 3,
      title: "Dharma Teaching by Lama Norbu",
      monastery: "Enchey Monastery",
      location: "Gangtok",
      date: new Date(2025, 8, 12), // September 12, 2025
      time: "2:00 PM",
      category: "teaching",
      description: "Special teachings on Buddhist philosophy and meditation practices.",
      duration: "4 hours",
      participants: 100,
      isBookable: true,
      featured: true
    },
    {
      id: 4,
      title: "Full Moon Meditation",
      monastery: "Tashiding Monastery",
      location: "West Sikkim",
      date: new Date(2025, 8, 14), // September 14, 2025
      time: "7:00 PM",
      category: "meditation",
      description: "Guided meditation session under the full moon with panoramic mountain views.",
      duration: "3 hours",
      participants: 30,
      isBookable: true,
      featured: false
    },
    {
      id: 5,
      title: "Bumchu Festival",
      monastery: "Tashiding Monastery",
      location: "West Sikkim",
      date: new Date(2025, 1, 19), // February 19, 2025
      time: "8:00 AM",
      category: "festival",
      description: "Sacred water vessel ceremony, one of the most important festivals in Sikkim.",
      duration: "1 day",
      participants: 1000,
      isBookable: true,
      featured: true
    },
    {
      id: 6,
      title: "Consecration Ceremony",
      monastery: "Rumtek Monastery",
      location: "East Sikkim",
      date: new Date(2025, 8, 16), // September 16, 2025
      time: "10:00 AM",
      category: "special",
      description: "Special blessing ceremony for new prayer wheels and statues.",
      duration: "5 hours",
      participants: 200,
      isBookable: false,
      featured: false
    }
  ];

  // Filter events based on selected category and search query
  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.monastery.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get events for selected date
  const eventsForSelectedDate = selectedDate 
    ? filteredEvents.filter(event => 
        event.date.toDateString() === selectedDate.toDateString()
      )
    : [];

  // Get upcoming events (next 7 days)
  const upcomingEvents = filteredEvents
    .filter(event => {
      const today = new Date();
      const weekFromNow = new Date();
      weekFromNow.setDate(today.getDate() + 7);
      return event.date >= today && event.date <= weekFromNow;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  // Get featured events
  const featuredEvents = filteredEvents.filter(event => event.featured);

  const getCategoryBadgeColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : "bg-muted";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-mist">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-gradient-monastery text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sacred Calendar
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Discover festivals, ceremonies, and spiritual events across Sikkim's monasteries. 
              Join the sacred rhythms of Buddhist tradition and plan your spiritual journey.
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <CalendarDays className="h-8 w-8 mx-auto mb-2 text-primary-glow" />
                <div className="text-2xl font-bold">{events.length}</div>
                <div className="text-sm opacity-90">Events This Month</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-heritage" />
                <div className="text-2xl font-bold">{featuredEvents.length}</div>
                <div className="text-sm opacity-90">Featured Events</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-primary-glow" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm opacity-90">Participating Monasteries</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-heritage" />
                <div className="text-2xl font-bold">5K+</div>
                <div className="text-sm opacity-90">Monthly Participants</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="calendar" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>

          {/* Search and Filter Section */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-card p-6 rounded-lg shadow-gentle">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search events, monasteries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-sm"
                >
                  <div className={`w-2 h-2 rounded-full ${category.color} mr-2`}></div>
                  {category.label}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <TabsContent value="calendar" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar Widget */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-monastery">
                    <CalendarDays className="h-5 w-5" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      hasEvents: events.map(event => event.date)
                    }}
                    modifiersClassNames={{
                      hasEvents: "bg-primary/20 text-primary font-semibold"
                    }}
                  />
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium mb-2">Legend:</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-3 h-3 bg-primary/20 rounded"></div>
                      Days with events
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Events for Selected Date */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-monastery">
                    Events for {selectedDate ? formatDate(selectedDate) : 'Selected Date'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {eventsForSelectedDate.length > 0 ? (
                    <div className="space-y-4">
                      {eventsForSelectedDate.map((event) => (
                        <div 
                          key={event.id} 
                          className="p-4 border rounded-lg hover:shadow-monastery transition-all duration-300 group"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold group-hover:text-primary transition-colors">
                                {event.title}
                              </h3>
                              {event.featured && (
                                <Star className="h-4 w-4 text-heritage fill-current" />
                              )}
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={`${getCategoryBadgeColor(event.category)} text-white`}
                            >
                              {event.category}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {event.monastery}, {event.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {event.time} • {event.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {event.participants} participants
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm mt-2 text-muted-foreground">
                            {event.description}
                          </p>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex gap-2">
                              {event.isBookable && (
                                <Button size="sm" className="shadow-gentle">
                                  Book Now
                                </Button>
                              )}
                              <Button variant="outline" size="sm">
                                <Share2 className="w-3 h-3 mr-1" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No events scheduled for this date</p>
                      <p className="text-sm">Select another date to view events</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-monastery">Upcoming Events (Next 7 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-6">
                    {upcomingEvents.map((event) => (
                      <div 
                        key={event.id} 
                        className="flex flex-col lg:flex-row gap-6 p-6 border rounded-lg hover:shadow-monastery transition-all duration-300"
                      >
                        <div className="lg:w-1/4">
                          <div className="text-center p-4 bg-primary/10 rounded-lg">
                            <div className="text-2xl font-bold text-primary">
                              {event.date.getDate()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {event.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </div>
                            <div className="text-sm font-medium mt-2">
                              {event.time}
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:w-3/4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold text-monastery">
                              {event.title}
                            </h3>
                            <Badge 
                              variant="secondary" 
                              className={`${getCategoryBadgeColor(event.category)} text-white`}
                            >
                              {event.category}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.monastery}, {event.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {event.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {event.participants} participants
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            {event.description}
                          </p>
                          
                          <div className="flex gap-2">
                            {event.isBookable && (
                              <Button className="shadow-gentle">
                                Book Now
                              </Button>
                            )}
                            <Button variant="outline">
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming events in the next 7 days</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="overflow-hidden hover:shadow-heritage transition-all duration-300 group"
                >
                  <CardHeader className="bg-gradient-sunset text-white relative">
                    <div className="absolute top-4 right-4">
                      <Star className="h-5 w-5 text-heritage fill-current" />
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <div className="flex items-center gap-2 text-gray-200">
                      <MapPin className="h-4 w-4" />
                      {event.monastery}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {event.date.getDate()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {event.date.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                      
                      <Badge 
                        variant="secondary" 
                        className={`${getCategoryBadgeColor(event.category)} text-white`}
                      >
                        {event.category}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {event.time} • {event.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Up to {event.participants} participants
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {event.isBookable && (
                        <Button className="flex-1 shadow-gentle">
                          Book Now
                        </Button>
                      )}
                      <Button variant="outline" className="flex-1">
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-mist py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-monastery">
            Stay Connected to Sacred Traditions
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get notified about upcoming festivals, special ceremonies, and spiritual events. 
            Never miss a moment of Sikkim's rich Buddhist heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              type="email"
              className="flex-1"
            />
            <Button className="shadow-monastery">
              <Bell className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
