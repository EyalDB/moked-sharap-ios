import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import History from "./pages/History";
import ServiceInfo from "./pages/ServiceInfo";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

// Use HashRouter for iOS (file:// protocol), BrowserRouter for web
const isIOS =
  import.meta.env.MODE === "ios" || window.location.protocol === "file:";
const Router = isIOS ? HashRouter : BrowserRouter;
const routerProps = isIOS ? {} : { basename: "/emergency-sharap" };

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router {...routerProps}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/history" element={<History />} />
            <Route path="/info" element={<ServiceInfo />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
