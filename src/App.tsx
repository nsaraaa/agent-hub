import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import CreateAgent from "./pages/CreateAgent";
import EditAgent from "./pages/EditAgent";
import Playground from "./pages/Playground";
import ChatAnalysis from "./pages/ChatAnalysis";
import MyAgents from "./pages/MyAgents";
import TrendingAgents from "./pages/TrendingAgents";
import AllAgents from "./pages/AllAgents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Index />
            </AppLayout>
          } />
          <Route path="/create" element={
            <AppLayout>
              <CreateAgent />
            </AppLayout>
          } />
          <Route path="/edit/:id" element={
            <AppLayout>
              <EditAgent />
            </AppLayout>
          } />
          <Route path="/playground" element={
            <AppLayout>
              <Playground />
            </AppLayout>
          } />
          <Route path="/analysis" element={
            <AppLayout>
              <ChatAnalysis />
            </AppLayout>
          } />
          <Route path="/my-agents" element={
            <AppLayout>
              <MyAgents />
            </AppLayout>
          } />
          <Route path="/trending" element={
            <AppLayout>
              <TrendingAgents />
            </AppLayout>
          } />
          <Route path="/all-agents" element={
            <AppLayout>
              <AllAgents />
            </AppLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
