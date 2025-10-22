import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";
import TicketDetail from "./pages/TicketDetail";
import NotificationSender from "./pages/NotificationSender";
import ChatbotAssistant from "./pages/ChatbotAssistant";
import AICaller from "./pages/AICaller";
import SmartTicketing from "./pages/SmartTicketing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/ticket/:id" element={<TicketDetail />} />
          <Route path="/notifications" element={<NotificationSender />} />
          <Route path="/chatbot" element={<ChatbotAssistant />} />
          <Route path="/ai-caller" element={<AICaller />} />
          <Route path="/smart-ticketing" element={<SmartTicketing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
