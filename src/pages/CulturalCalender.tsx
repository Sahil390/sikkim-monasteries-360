import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar, Bell, MapPin, Clock, Heart, Share, Play, Camera, Sparkles, Moon, Sun } from "lucide-react";

// Types
interface Festival {
  id: string;
  name: string;
  description: string;
  date: Date;
  endDate?: Date;
  type: "religious" | "cultural" | "harvest" | "national";
  significance: string;
  rituals: string[];
  dos: string[];
  donts: string[];
  locations: string[];
  imageUrl: string;
  isAuspicious: boolean;
  notificationMessage?: string;
}

interface AuspiciousDay {
  date: Date;
  type: "full_moon" | "new_moon" | "holy_day" | "fasting_day";
  significance: string;
  recommendedActivities: string[];
  monasteries: string[];
}

interface Meditation {
  date: Date;
  quote: string;
  mantra: string;
  meaning: string;
}

const CulturalCalendar = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [auspiciousDays, setAuspiciousDays] = useState<AuspiciousDay[]>([]);
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Festival | null>(null);
  const [showAR, setShowAR] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

  // Sample festival data
  useEffect(() => {
    const sampleFestivals: Festival[] = [
      {
        id: "1",
        name: "Losar (Tibetan New Year)",
        description: "The Tibetan New Year celebration marking the beginning of the new year in the Tibetan calendar.",
        date: new Date(new Date().getFullYear(), 2, 3),
        type: "religious",
        significance: "Losar is one of the most important festivals in Sikkim, celebrating the new year with prayers, rituals, and cultural performances.",
        rituals: ["Cleansing rituals", "Offering prayers", "Butter lamp offerings", "Traditional dances"],
        dos: ["Wear traditional clothes", "Offer khata (white scarf)", "Visit monasteries", "Participate in prayers"],
        donts: ["Don't wear black", "Avoid loud behavior", "Don't refuse offered tea", "Avoid arguments"],
        locations: ["Rumtek Monastery", "Pemayangtse Monastery", "Tashiding Monastery", "Enchey Monastery"],
        imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        isAuspicious: true,
        notificationMessage: "Today is Losar! Visit Rumtek Monastery for special prayers and celebrations."
      },
      {
        id: "2",
        name: "Saga Dawa",
        description: "A festival commemorating the birth, enlightenment, and parinirvana of Buddha.",
        date: new Date(new Date().getFullYear(), 5, 14),
        type: "religious",
        significance: "Considered the holiest month in the Tibetan calendar, especially the full moon day which marks Buddha's enlightenment.",
        rituals: ["Circumambulation of holy stupas", "Prayer flag hoisting", "Butter lamp offerings", "Sutra recitations"],
        dos: ["Perform good deeds", "Offer prayers", "Be vegetarian", "Practice generosity"],
        donts: ["Avoid harming insects", "Don't eat meat", "Avoid negative actions", "Don't skip prayers"],
        locations: ["Tashiding Monastery", "Rumtek Monastery", "Pemayangtse Monastery"],
        imageUrl: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        isAuspicious: true,
        notificationMessage: "Today is Saga Dawa! Join the prayers at Tashiding Monastery for blessings."
      },
      {
        id: "3",
        name: "Pang Lhabsol",
        description: "A unique Sikkimese festival honoring Mount Kangchenjunga and the protective deities.",
        date: new Date(new Date().getFullYear(), 8, 23),
        type: "cultural",
        significance: "Celebrates the oath-taking ceremony between the Lepchas and Bhutias, and honors Mount Kangchenjunga as the protective deity.",
        rituals: ["Warrior dances", "Mask dances", "Offerings to mountain deity", "Prayer ceremonies"],
        dos: ["Witness the mask dances", "Offer prayers", "Respect local customs", "Participate in ceremonies"],
        donts: ["Don't point at the mountain", "Avoid disrespectful behavior", "Don't interrupt rituals"],
        locations: ["Tsuklakhang Palace", "Rumtek Monastery", "Pemayangtse Monastery"],
        imageUrl: "https://images.unsplash.com/photo-1564466809058-b5a9c85aaf2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        isAuspicious: true,
        notificationMessage: "Pang Lhabsol celebrations today! Don't miss the warrior dances at Tsuklakhang Palace."
      },
      {
        id: "4",
        name: "Lhabab Düchen",
        description: "Celebrates Buddha's descent from the Tushita heaven back to earth.",
        date: new Date(new Date().getFullYear(), 10, 22),
        type: "religious",
        significance: "Marks the day when Buddha returned to earth after teaching his mother in the Tushita heaven.",
        rituals: ["Lighting butter lamps", "Offering prayers", "Circumambulation", "Sutra readings"],
        dos: ["Visit monasteries", "Offer butter lamps", "Recite prayers", "Practice generosity"],
        donts: ["Avoid negative actions", "Don't skip prayers", "Avoid meat consumption"],
        locations: ["All monasteries in Sikkim"],
        imageUrl: "https://images.unsplash.com/photo-1534295622241-5ccdf4fb9d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        isAuspicious: true,
        notificationMessage: "Lhabab Düchen today! A perfect day for offering butter lamps at any monastery."
      },
      {
        id: "5",
        name: "Bumchu Festival",
        description: "A sacred water vase festival at Tashiding Monastery.",
        date: new Date(new Date().getFullYear(), 2, 28),
        type: "religious",
        significance: "The sacred water vase is opened once a year, and the water level predicts the coming year's fortunes.",
        rituals: ["Viewing of sacred water", "Prayers for blessings", "Receiving holy water", "Offerings"],
        dos: ["Receive blessings", "Drink holy water", "Offer prayers", "Respect the rituals"],
        donts: ["Don't push in crowds", "Avoid disrespectful behavior", "Don't waste holy water"],
        locations: ["Tashiding Monastery"],
        imageUrl: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        isAuspicious: true,
        notificationMessage: "Bumchu Festival today! Visit Tashiding Monastery to witness the sacred water ceremony."
      }
    ];

    const sampleAuspiciousDays: AuspiciousDay[] = [
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
        type: "full_moon",
        significance: "Full moon days are considered highly auspicious for spiritual practices and merit accumulation.",
        recommendedActivities: ["Monastery visits", "Butter lamp offerings", "Prayer flag hanging", "Meditation"],
        monasteries: ["All monasteries"]
      },
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        type: "new_moon",
        significance: "New moon days are ideal for new beginnings and purification practices.",
        recommendedActivities: ["Fasting", "Water offerings", "Prostrations", "Reciting mantras"],
        monasteries: ["Rumtek Monastery", "Pemayangtse Monastery"]
      },
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
        type: "holy_day",
        significance: "A day commemorating an important event in Buddhist history.",
        recommendedActivities: ["Sutra readings", "Offering meals to monks", "Circumambulation", "Charity"],
        monasteries: ["Tashiding Monastery", "Enchey Monastery"]
      },
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
        type: "fasting_day",
        significance: "A day for purification through fasting and intensified practice.",
        recommendedActivities: ["Fasting", "Silent meditation", "Prayer sessions", "Water bowl offerings"],
        monasteries: ["Rumtek Monastery", "Pemayangtse Monastery"]
      }
    ];

    const sampleMeditations: Meditation[] = [
      {
        date: new Date(),
        quote: "Happiness does not decrease by being shared.",
        mantra: "Om Mani Padme Hum",
        meaning: "The jewel in the lotus, a compassion mantra that purifies body, speech, and mind."
      },
      {
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        quote: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
        mantra: "Om Ah Hum",
        meaning: "Represents the body, speech, and mind of all Buddhas, used for purification and blessing."
      }
    ];

    setFestivals(sampleFestivals);
    setAuspiciousDays(sampleAuspiciousDays);
    setMeditations(sampleMeditations);
  }, []);

  // Get events for selected date
  const getEventsForDate = (date: Date) => {
    return festivals.filter(festival => {
      const festivalDate = new Date(festival.date);
      return festivalDate.getDate() === date.getDate() && 
             festivalDate.getMonth() === date.getMonth() && 
             festivalDate.getFullYear() === date.getFullYear();
    });
  };

  // Get auspicious days for selected date
  const getAuspiciousDaysForDate = (date: Date) => {
    return auspiciousDays.filter(day => {
      const dayDate = new Date(day.date);
      return dayDate.getDate() === date.getDate() && 
             dayDate.getMonth() === date.getMonth() && 
             dayDate.getFullYear() === date.getFullYear();
    });
  };

  // Get meditation for selected date
  const getMeditationForDate = (date: Date) => {
    return meditations.find(meditation => {
      const medDate = new Date(meditation.date);
      return medDate.getDate() === date.getDate() && 
             medDate.getMonth() === date.getMonth() && 
             medDate.getFullYear() === date.getFullYear();
    });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date,
        isCurrentMonth: false,
        events: getEventsForDate(date),
        auspiciousDays: getAuspiciousDaysForDate(date)
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        events: getEventsForDate(date),
        auspiciousDays: getAuspiciousDaysForDate(date)
      });
    }
    
    // Next month days
    const daysNeeded = 42 - days.length; // 6 weeks of 7 days
    for (let i = 1; i <= daysNeeded; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        events: getEventsForDate(date),
        auspiciousDays: getAuspiciousDaysForDate(date)
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Toggle notifications
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (!notificationsEnabled) {
      alert("Notifications enabled! You'll receive reminders for upcoming festivals and auspicious days.");
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-amber-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Calendar className="h-8 w-8 text-amber-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Sikkim Cultural Calendar
            </h1>
          </div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover festivals, auspicious days, and spiritual practices of Sikkim. Plan your journey through the rich cultural heritage of the Himalayas.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </CardTitle>
                    <CardDescription>
                      Sikkim's spiritual and cultural events
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={prevMonth}>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>
                      Today
                    </Button>
                    <Button variant="outline" size="sm" onClick={nextMonth}>
                      Next
                    </Button>
                    <Button 
                      variant={viewMode === "calendar" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setViewMode("calendar")}
                    >
                      Calendar
                    </Button>
                    <Button 
                      variant={viewMode === "list" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      List
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === "calendar" ? (
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center font-medium text-slate-500 py-2">
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((day, index) => {
                      const isSelected = selectedDate && 
                        day.date.getDate() === selectedDate.getDate() &&
                        day.date.getMonth() === selectedDate.getMonth() &&
                        day.date.getFullYear() === selectedDate.getFullYear();
                      
                      const hasEvents = day.events.length > 0;
                      const isAuspicious = day.auspiciousDays.length > 0;
                      
                      return (
                        <div 
                          key={index}
                          className={`min-h-20 p-1 border rounded-lg cursor-pointer transition-all
                            ${isSelected ? 'bg-amber-100 border-amber-300' : 'border-slate-200'} 
                            ${!day.isCurrentMonth ? 'opacity-50 bg-slate-50' : 'bg-white'}
                            ${hasEvents ? 'hover:bg-amber-50' : 'hover:bg-slate-50'}
                          `}
                          onClick={() => setSelectedDate(day.date)}
                        >
                          <div className="flex justify-between items-start">
                            <span className={`text-sm font-medium p-1 rounded-full h-6 w-6 flex items-center justify-center
                              ${isSelected ? 'bg-amber-500 text-white' : 'text-slate-700'}
                            `}>
                              {day.date.getDate()}
                            </span>
                            {isAuspicious && (
                              <Sparkles className="h-3 w-3 text-amber-500 mt-1 mr-1" />
                            )}
                          </div>
                          
                          <div className="mt-1 space-y-1">
                            {day.events.slice(0, 2).map(event => (
                              <div 
                                key={event.id} 
                                className="text-xs bg-amber-100 text-amber-800 px-1 py-0.5 rounded truncate"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEvent(event);
                                }}
                              >
                                {event.name}
                              </div>
                            ))}
                            {day.events.length > 2 && (
                              <div className="text-xs text-slate-500">
                                +{day.events.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {festivals.map(festival => (
                      <div 
                        key={festival.id} 
                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-amber-50 cursor-pointer"
                        onClick={() => setSelectedEvent(festival)}
                      >
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                          <img 
                            src={festival.imageUrl} 
                            alt={festival.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">{festival.name}</h3>
                          <p className="text-sm text-slate-600 mb-1">{formatDate(festival.date)}</p>
                          <p className="text-sm text-slate-600 line-clamp-2">{festival.description}</p>
                        </div>
                        <Badge variant="secondary" className="capitalize">
                          {festival.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={toggleNotifications}
                >
                  <Bell className={`h-4 w-4 mr-2 ${notificationsEnabled ? 'text-amber-600' : ''}`} />
                  {notificationsEnabled ? 'Notifications Enabled' : 'Enable Notifications'}
                </Button>
              </CardContent>
            </Card>

            {/* AR Experience Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Augmented Reality Experience
                </CardTitle>
                <CardDescription>
                  Point your camera at monasteries to see rituals and historical information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 rounded-lg p-6 text-center">
                  <div className="mx-auto bg-white rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                    <Camera className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">Explore Monasteries in AR</h3>
                  <p className="text-slate-600 mb-4">
                    Point your camera at any monastery in Sikkim to see information about daily rituals, historical facts, and more.
                  </p>
                  <Button onClick={() => setShowAR(true)}>
                    <Camera className="h-4 w-4 mr-2" />
                    Launch AR Experience
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Selected Date Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>{formatDate(selectedDate)}</CardTitle>
                <CardDescription>
                  Events and auspicious information for today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Events */}
                {getEventsForDate(selectedDate).length > 0 ? (
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Festivals & Events</h3>
                    {getEventsForDate(selectedDate).map(event => (
                      <div 
                        key={event.id} 
                        className="p-3 border rounded-lg mb-2 cursor-pointer hover:bg-amber-50"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                            <img 
                              src={event.imageUrl} 
                              alt={event.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-800">{event.name}</h4>
                            <p className="text-sm text-slate-600">{event.type}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-slate-500">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                    <p>No festivals today</p>
                  </div>
                )}

                {/* Auspicious Days */}
                {getAuspiciousDaysForDate(selectedDate).length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Auspicious Day</h3>
                    {getAuspiciousDaysForDate(selectedDate).map((day, index) => (
                      <div key={index} className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-amber-600" />
                          <span className="font-medium text-amber-800 capitalize">
                            {day.type.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 mb-2">{day.significance}</p>
                        <div className="text-sm">
                          <span className="font-medium">Recommended:</span>
                          <ul className="list-disc list-inside mt-1">
                            {day.recommendedActivities.map((activity, i) => (
                              <li key={i} className="text-slate-600">{activity}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Meditation for the day */}
                {getMeditationForDate(selectedDate) && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-2">Daily Meditation</h3>
                    <div className="text-sm text-slate-700 space-y-2">
                      <p className="italic">"{getMeditationForDate(selectedDate)?.quote}"</p>
                      <div>
                        <span className="font-medium">Mantra:</span>
                        <p className="font-semibold text-blue-800">{getMeditationForDate(selectedDate)?.mantra}</p>
                      </div>
                      <div>
                        <span className="font-medium">Meaning:</span>
                        <p>{getMeditationForDate(selectedDate)?.meaning}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Then vs Now Feature */}
                <div className="p-3 bg-slate-100 rounded-lg">
                  <h3 className="font-semibold text-slate-800 mb-2">Then vs Now</h3>
                  <p className="text-sm text-slate-600 mb-2">
                    See how festivals have evolved over the decades
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Camera className="h-4 w-4 mr-2" />
                    View Historical Comparison
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Reminder
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share className="h-4 w-4 mr-2" />
                  Share Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Nearby Monasteries
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Favorites
                </Button>
              </CardContent>
            </Card>

            {/* Monastery Ritual Times */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Ritual Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Rumtek Monastery</span>
                  <span className="text-sm text-slate-600">6:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pemayangtse Monastery</span>
                  <span className="text-sm text-slate-600">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Tashiding Monastery</span>
                  <span className="text-sm text-slate-600">7:00 AM - 5:00 PM</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View All Schedules
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-3xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.name}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(selectedEvent.date)}</span>
                    <span>•</span>
                    <Badge variant="secondary" className="capitalize">
                      {selectedEvent.type}
                    </Badge>
                  </div>
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img 
                    src={selectedEvent.imageUrl} 
                    alt={selectedEvent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Significance</h3>
                  <p className="text-slate-700 mb-4">{selectedEvent.significance}</p>
                  
                  <h3 className="font-semibold text-slate-800 mb-2">Rituals & Practices</h3>
                  <ul className="list-disc list-inside text-slate-700 mb-4">
                    {selectedEvent.rituals.map((ritual, index) => (
                      <li key={index}>{ritual}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Do's</h3>
                  <ul className="list-disc list-inside text-green-700">
                    {selectedEvent.dos.map((doItem, index) => (
                      <li key={index}>{doItem}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Don'ts</h3>
                  <ul className="list-disc list-inside text-red-700">
                    {selectedEvent.donts.map((dont, index) => (
                      <li key={index}>{dont}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-slate-800 mb-2">Where to Experience</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.locations.map((location, index) => (
                    <Badge key={index} variant="outline" className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button>
                  <Bell className="h-4 w-4 mr-2" />
                  Set Reminder
                </Button>
                <Button variant="outline">
                  <Share className="h-4 w-4 mr-2" />
                  Share Event
                </Button>
                <Button variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* AR Experience Dialog */}
      <Dialog open={showAR} onOpenChange={setShowAR}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Augmented Reality Experience</DialogTitle>
            <DialogDescription>
              Point your camera at monasteries to see rituals and historical information
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-slate-100 rounded-lg p-4 text-center">
            <div className="mx-auto bg-white rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
              <Camera className="h-10 w-10 text-amber-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">AR Monastery Explorer</h3>
            <p className="text-slate-600 mb-4">
              When you visit any monastery in Sikkim, point your camera at the building to see:
            </p>
            
            <ul className="text-left text-slate-700 space-y-2 mb-6">
              <li className="flex items-center">
                <Sparkles className="h-4 w-4 text-amber-600 mr-2" />
                <span>Daily ritual schedules</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 text-amber-600 mr-2" />
                <span>Historical information</span>
              </li>
              <li className="flex items-center">
                <Play className="h-4 w-4 text-amber-600 mr-2" />
                <span>Video demonstrations of rituals</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 text-amber-600 mr-2" />
                <span>Interactive maps of the monastery</span>
              </li>
            </ul>
            
            <div className="space-y-2">
              <Button className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Launch Camera
              </Button>
              <Button variant="outline" className="w-full">
                View Demo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CulturalCalendar;