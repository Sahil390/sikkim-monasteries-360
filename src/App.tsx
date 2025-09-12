import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Monasteries from "./pages/Monasteries";
import MonasteryDetail from "./pages/MonasteryDetail";
import NotFound from "./pages/PlanYourVisit"; // 404 Page (edit later)
import VirtualTours from './pages/VirtualTours';
import InteractiveMaps from './pages/InteractiveMaps';
import DigitalArchives from './pages/DigitalArchives';
import CulturalCalendar from './pages/CulturalCalender';
import PlanYourVisit from './pages/PlanYourVisit';  

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/monasteries" element={<Monasteries />} />
          <Route path="/monastery/:id" element={<MonasteryDetail />} />
          <Route path="/virtual-tours" element={<VirtualTours />} />
          <Route path="/maps" element={<InteractiveMaps />} />
          <Route path="/archives" element={<DigitalArchives />} />
          <Route path="/calendar" element={<CulturalCalendar />} />
          <Route path="/plan-your-visit" element={<PlanYourVisit />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;