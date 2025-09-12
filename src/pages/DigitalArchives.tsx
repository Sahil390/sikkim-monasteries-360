import Navigation from "@/components/ui/navigation";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Search, Filter, BookOpen, Image, FileText, MapPin, Calendar, 
  Download, Play, ZoomIn, Heart, Share, Clock, User, Tag, 
  ChevronRight, Star, BarChart3, Brain, Database, Link2,
  Video, Bookmark, Eye, CalendarDays, Mountain, ScrollText
} from "lucide-react";

// Types
interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  type: "manuscript" | "photo" | "document" | "artifact" | "audio" | "video";
  category: string;
  date: string;
  period?: string;
  location?: string;
  imageUrl: string;
  contentUrl?: string;
  tags: string[];
  views: number;
  downloads: number;
  likes: number;
  duration?: string;
  language?: string;
  relatedItems?: string[];
  aiDescription?: string;
  significance?: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
  important?: boolean;
}

const DigitalArchives = () => {
  const [archiveItems, setArchiveItems] = useState<ArchiveItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ArchiveItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [periodFilter, setPeriodFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [aiDescription, setAiDescription] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [showTimeline, setShowTimeline] = useState(false);

  // Sample archive data with more depth and variety
  useEffect(() => {
    const sampleData: ArchiveItem[] = [
      {
        id: "1",
        title: "Ancient Buddhist Manuscript - Prajnaparamita Sutra",
        description: "A 17th-century manuscript containing teachings of Guru Rinpoche, written in classical Tibetan script on handmade paper with gold ink illustrations.",
        type: "manuscript",
        category: "Religion",
        date: "1642",
        period: "Chogyal Dynasty",
        location: "Pemayangtse Monastery",
  imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        contentUrl: "/documents/manuscript-1642.pdf",
        tags: ["Buddhism", "Tibetan", "History", "Sacred Text", "Gold Ink"],
        views: 1245,
        downloads: 342,
        likes: 89,
        language: "Tibetan",
        significance: "One of the oldest surviving manuscripts in Sikkim, containing rare commentary by Guru Rinpoche",
        aiDescription: "This manuscript is written in Uchen script, a formal Tibetan script used for religious texts. The gold ink indicates it was commissioned by royalty, likely for the consecration of Pemayangtse Monastery."
      },
      {
        id: "2",
        title: "Royal Edict of Sikkim - Land Distribution Act",
        description: "A royal proclamation from the Chogyal dynasty establishing laws for land distribution and taxation in the 18th century.",
        type: "document",
        category: "History",
        date: "1780",
        period: "Chogyal Dynasty",
        location: "Gangtok Palace Archives",
  imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        contentUrl: "/documents/royal-edict-1780.pdf",
        tags: ["Royal", "Law", "Chogyal", "Land Rights", "Taxation"],
        views: 876,
        downloads: 210,
        likes: 45,
        language: "Tibetan & Lepcha",
        significance: "This edict established the feudal land system that would govern Sikkim for nearly two centuries",
        relatedItems: ["3", "5"]
      },
      {
        id: "3",
        title: "Traditional Lepcha Weaving Patterns",
        description: "Documentation of traditional Lepcha tribal weaving techniques and patterns used in clothing and textiles, with detailed technical drawings.",
        type: "document",
        category: "Culture",
        date: "1925",
        period: "British Colonial Era",
  imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        contentUrl: "/documents/leapcha-weaving.pdf",
        tags: ["Lepcha", "Textile", "Indigenous", "Weaving", "Craftsmanship"],
        views: 1567,
        downloads: 432,
        likes: 123,
        language: "English & Lepcha",
        significance: "One of the first systematic documentations of Lepcha weaving techniques, preserving knowledge that was previously oral tradition"
      },
      {
        id: "4",
        title: "Historic Photo of Gangtok Market - 1910",
        description: "Rare photograph of Gangtok market in the early 20th century, showing traditional architecture, merchants, and daily life in the capital.",
        type: "photo",
        category: "History",
        date: "1910",
        period: "British Colonial Era",
        location: "Gangtok",
  imageUrl: "https://images.unsplash.com/photo-1488805990569-3c9e1d76d51c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Gangtok", "Architecture", "Historical", "Market", "Daily Life"],
        views: 2109,
        downloads: 654,
        likes: 187,
        significance: "One of the earliest photographs showing Gangtok's commercial center before modernization"
      },
      {
        id: "5",
        title: "Ritual Buddhist Instruments Collection",
        description: "Collection of traditional ritual instruments used in Buddhist ceremonies across Sikkim's monasteries, with detailed descriptions of usage.",
        type: "artifact",
        category: "Religion",
        date: "18th Century",
        period: "Chogyal Dynasty",
  imageUrl: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Ritual", "Ceremony", "Instruments", "Vajrayana", "Tantric"],
        views: 1890,
        downloads: 321,
        likes: 98,
        significance: "Comprehensive catalog of Vajrayana Buddhist ritual objects with explanations of their symbolic meanings"
      },
      {
        id: "6",
        title: "Flora and Fauna of Sikkim - Illustrated Guide",
        description: "Illustrated guide to the unique plant and animal species found in Sikkim's diverse ecosystems, with scientific and local names.",
        type: "document",
        category: "Nature",
        date: "1952",
        period: "Post-Independence",
  imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        contentUrl: "/documents/sikkim-flora-fauna.pdf",
        tags: ["Nature", "Biodiversity", "Environment", "Botany", "Zoology"],
        views: 2456,
        downloads: 765,
        likes: 201,
        language: "English & Nepali",
        significance: "First comprehensive scientific survey of Sikkim's unique biodiversity, documenting several endemic species"
      },
      {
        id: "7",
        title: "Traditional Sikkimese Costumes - Photographic Study",
        description: "Photographic documentation of traditional dresses worn by different ethnic communities in Sikkim with cultural context.",
        type: "photo",
        category: "Culture",
        date: "1960",
        period: "Post-Independence",
  imageUrl: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Costume", "Ethnic", "Traditional", "Fashion", "Cultural Identity"],
        views: 1789,
        downloads: 543,
        likes: 165,
        significance: "Important documentation of traditional attire before Western clothing became widespread"
      },
      {
        id: "8",
        title: "Sacred Dance Mask Collection - Cham Dance",
        description: "Ritual masks used in Cham dances performed during Buddhist festivals in Sikkim's monasteries, with performance context.",
        type: "artifact",
        category: "Culture",
        date: "19th Century",
        period: "Chogyal Dynasty",
        location: "Rumtek Monastery",
  imageUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Cham Dance", "Mask", "Festival", "Performance", "Ritual"],
        views: 1654,
        downloads: 432,
        likes: 143,
        significance: "Rare collection of ceremonial masks representing deities and mythological figures from Tibetan Buddhism"
      },
      {
        id: "9",
        title: "Oral History Recording - Lepcha Elder Interview",
        description: "Audio recording of interviews with Lepcha elders about traditional stories, customs, and historical events (1978).",
        type: "audio",
        category: "Culture",
        date: "1978",
        period: "Modern Sikkim",
  imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        contentUrl: "/audio/leapcha-elders-1978.mp3",
        tags: ["Oral History", "Lepcha", "Interview", "Tradition", "Language"],
        views: 987,
        downloads: 321,
        likes: 76,
        duration: "47:22",
        language: "Lepcha",
        significance: "Valuable preservation of Lepcha language and oral traditions from elders born in the early 20th century"
      },
      {
        id: "10",
        title: "Documentary - Sikkim Coronation Ceremony (1975)",
        description: "Historical footage of the coronation ceremony of the last Chogyal of Sikkim before integration with India.",
        type: "video",
        category: "History",
        date: "1975",
        period: "Modern Sikkim",
  imageUrl: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        contentUrl: "/video/coronation-1975.mp4",
        tags: ["Coronation", "Royalty", "Ceremony", "Historical Event", "Politics"],
        views: 3256,
        downloads: 876,
        likes: 287,
        duration: "28:15",
        significance: "Unique footage of the last royal coronation in Sikkim, capturing a pivotal moment in the region's history"
      }
    ];

    // Sample timeline data
    const sampleTimeline: TimelineEvent[] = [
      { year: "1642", title: "Foundation of Sikkim", description: "Phuntsog Namgyal crowned as the first Chogyal (king) of Sikkim", important: true },
      { year: "1700", title: "Construction of Pemayangtse Monastery", description: "One of Sikkim's oldest monasteries completed" },
      { year: "1717", title: "Tibetan Invasion", description: "Tibetan forces invade Sikkim but are repelled" },
      { year: "1793", title: "Nepalese Invasion", description: "Nepal invades Sikkim, leading to British intervention" },
      { year: "1817", title: "Treaty of Titalia", description: "Sikkim becomes a British protectorate" },
      { year: "1861", title: "British Expedition", description: "British colonial forces enter Sikkim" },
      { year: "1890", title: "Anglo-Chinese Convention", description: "Sikkim's status as British protectorate formalized" },
      { year: "1975", title: "Integration with India", description: "Sikkim becomes the 22nd state of India", important: true },
      { year: "2000", title: "Digital Archive Project Begins", description: "Systematic digitization of Sikkim's cultural heritage" }
    ];

    setArchiveItems(sampleData);
    setFilteredItems(sampleData);
    setTimelineEvents(sampleTimeline);
    setIsLoading(false);
  }, []);

  // Filter items based on search and filters
  useEffect(() => {
    let result = archiveItems;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.tags.some(tag => tag.toLowerCase().includes(term)) ||
        (item.aiDescription && item.aiDescription.toLowerCase().includes(term))
      );
    }
    
    if (typeFilter !== "all") {
      result = result.filter(item => item.type === typeFilter);
    }
    
    if (categoryFilter !== "all") {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    if (periodFilter !== "all") {
      result = result.filter(item => item.period === periodFilter);
    }
    
    setFilteredItems(result);
  }, [searchTerm, typeFilter, categoryFilter, periodFilter, archiveItems]);

  // Simulate AI description generation
  const generateAIDescription = (item: ArchiveItem) => {
    setIsGeneratingAI(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (item.aiDescription) {
        setAiDescription(item.aiDescription);
      } else {
        // Generate a generic AI description if none exists
        setAiDescription(`This ${item.type} from ${item.period} represents an important aspect of Sikkim's ${item.category.toLowerCase()}. Based on visual analysis, it appears to be well-preserved and provides valuable insights into the historical and cultural context of its time. The craftsmanship suggests skilled artisanship, and the subject matter aligns with other known works from this period.`);
      }
      setIsGeneratingAI(false);
    }, 1500);
  };

  const handleDownload = (item: ArchiveItem) => {
    // In a real application, this would trigger a download
    alert(`Downloading: ${item.title}`);
  };

  const handleViewDetails = (item: ArchiveItem) => {
    setSelectedItem(item);
    setAiDescription("");
  };

  const handleLikeItem = (id: string) => {
    setArchiveItems(prev => prev.map(item => 
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-blue-50/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading digital archives...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30">
      <Navigation />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              Sikkim Digital Archives
            </h1>
          </div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore rare manuscripts, historical documents, photographs, and cultural artifacts from Sikkim's rich heritage. 
            Powered by AI-enhanced discovery and immersive multimedia experiences.
          </p>
        </div>

        {/* AI Search Box */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Brain className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium">AI-Powered Search</span>
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="search"
                  placeholder="Ask something about Sikkim's history or culture..."
                  className="pl-8 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Brain className="h-4 w-4 mr-2" />
                AI Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Archives
                </CardTitle>
                <CardDescription>
                  Narrow down your search
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    type="search"
                    placeholder="Search archives..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Content Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="manuscript">Manuscripts</SelectItem>
                      <SelectItem value="document">Documents</SelectItem>
                      <SelectItem value="photo">Photographs</SelectItem>
                      <SelectItem value="artifact">Artifacts</SelectItem>
                      <SelectItem value="audio">Audio Recordings</SelectItem>
                      <SelectItem value="video">Videos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Religion">Religion</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Culture">Culture</SelectItem>
                      <SelectItem value="Nature">Nature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Historical Period</label>
                  <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Periods</SelectItem>
                      <SelectItem value="Chogyal Dynasty">Chogyal Dynasty</SelectItem>
                      <SelectItem value="British Colonial Era">British Colonial Era</SelectItem>
                      <SelectItem value="Post-Independence">Post-Independence</SelectItem>
                      <SelectItem value="Modern Sikkim">Modern Sikkim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setTypeFilter("all");
                    setCategoryFilter("all");
                    setPeriodFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Archive Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Items:</span>
                  <span className="font-medium">{archiveItems.length}</span>
                </div>
                
                {["manuscript", "document", "photo", "artifact", "audio", "video"].map(type => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{type}s:</span>
                    <span className="font-medium">
                      {archiveItems.filter(i => i.type === type).length}
                    </span>
                  </div>
                ))}
                
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Total Views:</span>
                    <span className="font-medium">
                      {archiveItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Downloads:</span>
                    <span className="font-medium">
                      {archiveItems.reduce((sum, item) => sum + item.downloads, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interactive Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowTimeline(true)}
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Historical Timeline
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Geographic Explorer
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Link2 className="h-4 w-4 mr-2" />
                  Relationship Map
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Archive Items */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-semibold text-slate-800">
                Archive Collection <span className="text-blue-600">({filteredItems.length} items)</span>
              </h2>
              
              <div className="flex items-center gap-2">
                <div className="text-sm text-slate-500">
                  Showing {filteredItems.length} of {archiveItems.length} items
                </div>
                <div className="flex border rounded-md overflow-hidden">
                  <Button 
                    variant={viewMode === "grid" ? "default" : "ghost"} 
                    size="sm" 
                    className="h-8 px-2 rounded-none"
                    onClick={() => setViewMode("grid")}
                  >
                    Grid
                  </Button>
                  <Button 
                    variant={viewMode === "list" ? "default" : "ghost"} 
                    size="sm" 
                    className="h-8 px-2 rounded-none"
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </Button>
                </div>
              </div>
            </div>

            {filteredItems.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                {filteredItems.map(item => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="capitalize">
                          {item.type}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        {item.contentUrl && (
                          <Button size="icon" className="h-8 w-8 bg-blue-600 hover:bg-blue-700">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-8 w-8 bg-white/90 backdrop-blur-sm"
                          onClick={() => handleViewDetails(item)}
                        >
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center justify-between text-xs text-white">
                          <div className="flex items-center gap-2 bg-black/60 rounded-full px-2 py-1">
                            <Eye className="h-3 w-3" />
                            <span>{item.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-black/60 rounded-full px-2 py-1">
                            <Heart className="h-3 w-3" />
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {item.date}
                          {item.period && (
                            <Badge variant="secondary" className="ml-2">
                              {item.period}
                            </Badge>
                          )}
                        </div>
                        {item.location && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {item.location}
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleLikeItem(item.id)}
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleViewDetails(item)}
                      >
                        Explore
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Search className="h-12 w-12 text-slate-300 mb-4" />
                  <h3 className="text-lg font-medium text-slate-600 mb-2">No items found</h3>
                  <p className="text-slate-500 text-center mb-4">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button onClick={() => {
                    setSearchTerm("");
                    setTypeFilter("all");
                    setCategoryFilter("all");
                    setPeriodFilter("all");
                  }}>
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Featured Collections Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Featured Collections</h2>
          <Tabs defaultValue="monasteries" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="monasteries" className="flex items-center gap-2">
                <Mountain className="h-4 w-4" />
                Monasteries
              </TabsTrigger>
              <TabsTrigger value="culture" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Culture
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <ScrollText className="h-4 w-4" />
                History
              </TabsTrigger>
              <TabsTrigger value="nature" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Nature
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="monasteries" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative h-40">
                    <img 
                      src="https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                      alt="Sikkim Monasteries"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h3 className="text-white font-semibold">Monastery Manuscripts</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-600">
                      Rare religious texts from Sikkim's ancient monasteries
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative h-40">
                    <img 
                      src="https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                      alt="Monastic Art"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h3 className="text-white font-semibold">Ritual Artifacts</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-600">
                      Sacred objects used in Buddhist ceremonies
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative h-40">
                    <img 
                      src="https://images.unsplash.com/photo-1564466809058-b5a9c85aaf2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                      alt="Festivals"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h3 className="text-white font-semibold">Festival Documentation</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-600">
                      Records of religious festivals and ceremonies
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="culture" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative h-40">
                    <img 
                      src="https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                      alt="Traditional Textiles"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h3 className="text-white font-semibold">Traditional Textiles</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-600">
                      Weaving patterns and techniques of Sikkim's tribes
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative h-40">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                      alt="Traditional Costumes"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h3 className="text-white font-semibold">Ethnic Costumes</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-600">
                      Traditional clothing of Sikkim's diverse communities
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative h-40">
                    <img 
                      src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                      alt="Cuisine"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h3 className="text-white font-semibold">Traditional Cuisine</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-600">
                      Recipes and food culture of Sikkim
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Item Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItem.title}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="capitalize">
                      {selectedItem.type}
                    </Badge>
                    <span>•</span>
                    <span>{selectedItem.date}</span>
                    {selectedItem.period && (
                      <>
                        <span>•</span>
                        <span>{selectedItem.period}</span>
                      </>
                    )}
                    {selectedItem.location && (
                      <>
                        <span>•</span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {selectedItem.location}
                        </span>
                      </>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                  <img 
                    src={selectedItem.imageUrl} 
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <p className="text-slate-700 mb-4">{selectedItem.description}</p>
                  
                  {selectedItem.significance && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-800 mb-1">Historical Significance</h4>
                      <p className="text-sm text-slate-600">{selectedItem.significance}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedItem.tags.map(tag => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {selectedItem.views.toLocaleString()} views
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {selectedItem.downloads.toLocaleString()} downloads
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {selectedItem.likes} likes
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      Like
                    </Button>
                    <Button variant="outline">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* AI Insights Section */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">AI Insights</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto"
                    onClick={() => generateAIDescription(selectedItem)}
                    disabled={isGeneratingAI}
                  >
                    {isGeneratingAI ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Generate Insights
                      </>
                    )}
                  </Button>
                </div>
                
                {aiDescription ? (
                  <p className="text-sm text-slate-700 bg-blue-50 p-4 rounded-lg">{aiDescription}</p>
                ) : (
                  <p className="text-sm text-slate-500 italic">
                    Click "Generate Insights" to get AI-powered analysis of this item.
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Historical Timeline Dialog */}
      <Dialog open={showTimeline} onOpenChange={setShowTimeline}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Sikkim Historical Timeline</DialogTitle>
            <DialogDescription>
              Explore key events in Sikkim's rich history
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-96 pr-4">
            <div className="space-y-4">
              {timelineEvents.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${event.important ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                    {index < timelineEvents.length - 1 && (
                      <div className="w-0.5 h-16 bg-slate-200"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-semibold text-slate-800">{event.year}</h3>
                      <h4 className="text-slate-700">{event.title}</h4>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DigitalArchives;