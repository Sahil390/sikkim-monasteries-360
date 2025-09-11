import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Monasteries from "./pages/Monasteries";
import MonasteryDetail from "./pages/MonasteryDetail";
<<<<<<< HEAD
import NotFound from "./pages/PlanYourVisit"; // 404 Page (edit later)
=======
import Calendar from "./pages/Calendar";
import Archives from "./pages/Archives";
import NotFound from "./pages/NotFound";
>>>>>>> 359522c46059f1ebeb09eb02788d6c371fe1de9d
import HeroSection from './components/hero-section';
import VirtualTours from './pages/VirtualTours';
import InteractiveMaps from './pages/InteractiveMaps';
import DigitalArchives from './pages/DigitalArchives';
import CulturalCalendar from './pages/CulturalCalender';
<<<<<<< HEAD
import PlanYourVisit from 'src/pages/PlanYourVisit';  
=======

>>>>>>> 359522c46059f1ebeb09eb02788d6c371fe1de9d

const queryClient = new QueryClient();

// ScrollToTop component: scrolls window to top whenever the route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
  {/* Scroll to top on route change */}
  <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/monasteries" element={<Monasteries />} />
          <Route path="/monastery/:id" element={<MonasteryDetail />} />
          <Route path="/virtual-tours" element={<VirtualTours />} />
          <Route path="/maps" element={<InteractiveMaps />} />
          <Route path="/archives" element={<DigitalArchives />} />
          <Route path="/calendar" element={<CulturalCalendar />} />
<<<<<<< HEAD
=======
          <Route path="/cultural-calendar" element={<CulturalCalendar />} />
>>>>>>> 359522c46059f1ebeb09eb02788d6c371fe1de9d
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
