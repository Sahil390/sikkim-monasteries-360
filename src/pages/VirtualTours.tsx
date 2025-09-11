import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Compass, MapPin, Info, Fullscreen, Minimize } from "lucide-react";

// Types
interface VirtualTour {
  id: string;
  title: string;
  description: string;
  location: string;
  tradition: string;
  scenes: Scene[];
}

interface Scene {
  id: string;
  title: string;
  imageUrl: string;
  hotspots: Hotspot[];
}

interface Hotspot {
  id: string;
  pitch: number;
  yaw: number;
  type: "info" | "scene";
  text?: string;
  sceneId?: string;
}

const VirtualTours = () => {
  const [tours, setTours] = useState<VirtualTour[]>([]);
  const [selectedTour, setSelectedTour] = useState<VirtualTour | null>(null);
  const [currentScene, setCurrentScene] = useState<Scene | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const sphereRef = useRef<any>(null);
  const hotspotsRef = useRef<any[]>([]);

  // Sample virtual tour data with actual 360° images
  useEffect(() => {
    const sampleTours: VirtualTour[] = [
      {
        id: "rumtek",
        title: "Rumtek Monastery",
        description: "Experience the grandeur of one of Sikkim's most significant monasteries through our immersive 360° virtual tour.",
        location: "Rumtek, Sikkim",
        tradition: "Kagyu",
        scenes: [
          {
            id: "main-courtyard",
            title: "Main Courtyard",
            imageUrl: "https://cdn.pannellum.org/2.5/pannellum.htm?image=https://i.imgur.com/KgRj2XQ.jpg",
            hotspots: [
              { id: "info-1", pitch: -10, yaw: 0, type: "info", text: "The main courtyard is used for ceremonies and gatherings." },
              { id: "scene-1", pitch: -5, yaw: 90, type: "scene", sceneId: "prayer-hall" },
            ]
          },
          {
            id: "prayer-hall",
            title: "Prayer Hall",
            imageUrl: "https://cdn.pannellum.org/2.5/pannellum.htm?image=https://i.imgur.com/8M7vqJc.jpg",
            hotspots: [
              { id: "info-2", pitch: -5, yaw: 180, type: "info", text: "The prayer hall features intricate thangka paintings and statues." },
              { id: "scene-2", pitch: -5, yaw: -90, type: "scene", sceneId: "main-courtyard" },
            ]
          }
        ]
      },
      {
        id: "pemayangtse",
        title: "Pemayangtse Monastery",
        description: "Explore one of Sikkim's oldest monasteries through our immersive 360° virtual tour.",
        location: "Pelling, Sikkim",
        tradition: "Nyingma",
        scenes: [
          {
            id: "entrance",
            title: "Main Entrance",
            imageUrl: "https://cdn.pannellum.org/2.5/pannellum.htm?image=https://i.imgur.com/KgRj2XQ.jpg",
            hotspots: [
              { id: "info-3", pitch: -10, yaw: 0, type: "info", text: "The entrance is adorned with traditional Buddhist motifs." },
              { id: "scene-3", pitch: -5, yaw: 90, type: "scene", sceneId: "main-temple" },
            ]
          },
          {
            id: "main-temple",
            title: "Main Temple",
            imageUrl: "https://cdn.pannellum.org/2.5/pannellum.htm?image=https://i.imgur.com/8M7vqJc.jpg",
            hotspots: [
              { id: "info-4", pitch: -5, yaw: 180, type: "info", text: "The main temple houses a seven-tiered painted wooden structure." },
              { id: "scene-4", pitch: -5, yaw: -90, type: "scene", sceneId: "entrance" },
            ]
          }
        ]
      }
    ];

    setTours(sampleTours);
    setSelectedTour(sampleTours[0]);
    setCurrentScene(sampleTours[0].scenes[0]);
    setIsLoading(false);
  }, []);

  // Initialize Three.js when component mounts or scene changes
  useEffect(() => {
    if (!containerRef.current || !currentScene) return;

    // Dynamically import Three.js
    import('three').then((THREE) => {
      // Initialize scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Initialize camera
      const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
      cameraRef.current = camera;

      // Initialize renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Create sphere geometry
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1); // Invert the sphere to view from inside

      // Load texture
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(currentScene.imageUrl, () => {
        setIsLoading(false);
      });

      // Create material and mesh
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
      sphereRef.current = sphere;

      // Add hotspots
      clearHotspots();
      currentScene.hotspots.forEach(hotspot => {
        addHotspot(hotspot, THREE);
      });

      // Set initial camera position
      camera.position.set(0, 0, 0.1);

      // Add controls
      let isUserInteracting = false;
      let lon = 0;
      let lat = 0;
      let phi = 0;
      let theta = 0;
      const distance = 50;

      function onPointerDown(event: MouseEvent) {
        isUserInteracting = true;
        containerRef.current!.style.cursor = 'grabbing';
      }

      function onPointerMove(event: MouseEvent) {
        if (isUserInteracting) {
          lon = (event.clientX - window.innerWidth / 2) * 0.1;
          lat = (event.clientY - window.innerHeight / 2) * 0.1;
        }
      }

      function onPointerUp() {
        isUserInteracting = false;
        containerRef.current!.style.cursor = 'grab';
      }

      function onWheel(event: WheelEvent) {
        camera.fov += event.deltaY * 0.05;
        camera.fov = Math.max(30, Math.min(100, camera.fov));
        camera.updateProjectionMatrix();
      }

      containerRef.current.addEventListener('mousedown', onPointerDown);
      containerRef.current.addEventListener('mousemove', onPointerMove);
      containerRef.current.addEventListener('mouseup', onPointerUp);
      containerRef.current.addEventListener('wheel', onWheel);
      containerRef.current.style.cursor = 'grab';

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);

        lat = Math.max(-85, Math.min(85, lat));
        phi = THREE.MathUtils.degToRad(90 - lat);
        theta = THREE.MathUtils.degToRad(lon);

        camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
        camera.position.y = distance * Math.cos(phi);
        camera.position.z = distance * Math.sin(phi) * Math.sin(theta);

        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      }

      animate();

      // Handle window resize
      function onWindowResize() {
        camera.aspect = containerRef.current!.clientWidth / containerRef.current!.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      }

      window.addEventListener('resize', onWindowResize);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', onWindowResize);
        containerRef.current?.removeEventListener('mousedown', onPointerDown);
        containerRef.current?.removeEventListener('mousemove', onPointerMove);
        containerRef.current?.removeEventListener('mouseup', onPointerUp);
        containerRef.current?.removeEventListener('wheel', onWheel);
        
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
      };
    }).catch(error => {
      console.error('Error loading Three.js:', error);
    });
  }, [currentScene]);

  const addHotspot = (hotspot: Hotspot, THREE: any) => {
    const hotspotGeometry = new THREE.SphereGeometry(2, 32, 32);
    const hotspotMaterial = new THREE.MeshBasicMaterial({ 
      color: hotspot.type === 'info' ? 0xff0000 : 0x0000ff,
      transparent: true,
      opacity: 0.7
    });
    
    const hotspotMesh = new THREE.Mesh(hotspotGeometry, hotspotMaterial);
    
    // Convert spherical coordinates to Cartesian
    const phi = THREE.MathUtils.degToRad(90 - hotspot.pitch);
    const theta = THREE.MathUtils.degToRad(hotspot.yaw);
    const distance = 490; // Slightly inside the sphere
    
    hotspotMesh.position.x = distance * Math.sin(phi) * Math.cos(theta);
    hotspotMesh.position.y = distance * Math.cos(phi);
    hotspotMesh.position.z = distance * Math.sin(phi) * Math.sin(theta);
    
    hotspotMesh.userData = hotspot;
    sceneRef.current.add(hotspotMesh);
    hotspotsRef.current.push(hotspotMesh);
    
    // Add click event
    hotspotMesh.addEventListener('click', () => {
      handleHotspotClick(hotspot);
    });
  };

  const clearHotspots = () => {
    hotspotsRef.current.forEach(hotspot => {
      sceneRef.current.remove(hotspot);
    });
    hotspotsRef.current = [];
  };

  const handleTourChange = (tourId: string) => {
    const tour = tours.find(t => t.id === tourId);
    if (tour) {
      setSelectedTour(tour);
      setCurrentScene(tour.scenes[0]);
    }
  };

  const handleSceneChange = (sceneId: string) => {
    if (!selectedTour) return;
    const scene = selectedTour.scenes.find(s => s.id === sceneId);
    if (scene) {
      setCurrentScene(scene);
    }
  };

  const handleHotspotClick = (hotspot: Hotspot) => {
    if (hotspot.type === "info") {
      // Show info dialog
      alert(hotspot.text);
    } else if (hotspot.type === "scene" && hotspot.sceneId) {
      // Change scene
      handleSceneChange(hotspot.sceneId);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading virtual tours...</p>
        </div>
      </div>
    );
  }

  if (!selectedTour || !currentScene) {
    return <div>Error loading tours. Please try again.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Immersive Virtual Tours
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Step inside Sikkim's sacred monasteries through our 360° virtual experiences. 
            Explore intricate details and learn about Buddhist heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Tour Selection */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select a Tour</CardTitle>
                <CardDescription>
                  Choose a monastery to explore
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedTour.id} onValueChange={handleTourChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tour" />
                  </SelectTrigger>
                  <SelectContent>
                    {tours.map(tour => (
                      <SelectItem key={tour.id} value={tour.id}>
                        {tour.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  <h3 className="font-semibold">{selectedTour.title}</h3>
                  <p className="text-sm text-slate-600">{selectedTour.description}</p>
                  <div className="flex items-center text-sm text-slate-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedTour.location}
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <Compass className="h-4 w-4 mr-1" />
                    {selectedTour.tradition} Tradition
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tour Navigation</CardTitle>
                <CardDescription>
                  Explore different areas of the monastery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {selectedTour.scenes.map(scene => (
                  <Button
                    key={scene.id}
                    variant={currentScene.id === scene.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleSceneChange(scene.id)}
                  >
                    {scene.title}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tour Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Click and drag to look around</p>
                <p>• Use mouse wheel to zoom in/out</p>
                <p>• Click on hotspots for more information</p>
                <p>• Use fullscreen for immersive experience</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Virtual Tour Viewer */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{currentScene.title}</CardTitle>
                    <CardDescription>
                      {selectedTour.title} - {currentScene.title}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                    {isFullscreen ? <Minimize className="h-4 w-4 mr-2" /> : <Fullscreen className="h-4 w-4 mr-2" />}
                    {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 relative">
                <div ref={containerRef} className="relative h-96 md:h-[500px] w-full">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-slate-600">Loading scene...</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Custom Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 rounded-lg p-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/20"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/20"
                    onClick={() => {
                      // Reset view logic would go here
                    }}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/20"
                    onClick={() => setShowInfo(!showInfo)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>

                {showInfo && (
                  <div className="p-4 bg-slate-50 border-t">
                    <h3 className="font-semibold mb-2">About This Scene</h3>
                    <p className="text-sm text-slate-600">
                      {currentScene.hotspots.find(h => h.type === "info")?.text || 
                       "Explore this area of the monastery. Click on hotspots to learn more."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>About {selectedTour.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="history">
                  <TabsList>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="architecture">Architecture</TabsTrigger>
                    <TabsTrigger value="significance">Significance</TabsTrigger>
                  </TabsList>
                  <TabsContent value="history" className="pt-4">
                    <p>
                      {selectedTour.title} is one of the most important monasteries in Sikkim. 
                      Established centuries ago, it has served as a center for Buddhist learning and practice.
                    </p>
                  </TabsContent>
                  <TabsContent value="architecture" className="pt-4">
                    <p>
                      The monastery features traditional Tibetan architecture with intricate woodwork, 
                      colorful murals, and sacred symbols. The main prayer hall is adorned with thangka 
                      paintings and statues of Buddhist deities.
                    </p>
                  </TabsContent>
                  <TabsContent value="significance" className="pt-4">
                    <p>
                      This monastery plays a vital role in preserving the {selectedTour.tradition} tradition 
                      of Tibetan Buddhism. It hosts important religious ceremonies and festivals throughout 
                      the year, attracting devotees from across the region.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTours;