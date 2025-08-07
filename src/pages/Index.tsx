import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Bot, 
  Play, 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Star,
  Activity,
  Clock,
  Zap,
  ArrowRight,
  Settings,
  AlertTriangle,
  ChevronRight,
  Calendar,
  Target,
  Input,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for the dashboard
const dashboardStats = {
  totalAgents: 24,
  avgRating: 4.7,
  totalChats: 15847,
  activeAgents: 18,
  monthlyGrowth: 12.5,
  responseTime: "1.2s"
};

const recentActivity = [
  {
    id: 1,
    type: "agent_created",
    title: "New Customer Support Agent created",
    time: "2 hours ago",
    status: "success",
    user: "Sarah Chen"
  },
  {
    id: 2,
    type: "high_usage",
    title: "Sales Assistant reached 1000 chats milestone",
    time: "4 hours ago",
    status: "info",
    user: "System"
  },
  {
    id: 3,
    type: "issue",
    title: "Technical Support Agent flagged for review",
    time: "6 hours ago",
    status: "warning",
    user: "Auto-Monitor"
  },
  {
    id: 4,
    type: "update",
    title: "Parts Specialist updated with new knowledge base",
    time: "1 day ago",
    status: "success",
    user: "Mike Johnson"
  }
];

const trendingAgents = [
  {
    id: 1,
    name: "Customer Support Pro",
    description: "Advanced customer service with sentiment analysis",
    chats: 3247,
    rating: 4.9,
    status: "active",
    growth: "+23%"
  },
  {
    id: 2,
    name: "Sales Qualifier",
    description: "Lead qualification and product recommendations",
    chats: 1892,
    rating: 4.6,
    status: "active",
    growth: "+18%"
  },
  {
    id: 3,
    name: "Tech Diagnostic",
    description: "Vehicle troubleshooting and repair guidance",
    chats: 2156,
    rating: 4.8,
    status: "active",
    growth: "+31%"
  },
  {
    id: 4,
    name: "Appointment Scheduler",
    description: "Smart scheduling with calendar integration",
    chats: 1634,
    rating: 4.5,
    status: "testing",
    growth: "+15%"
  }
];

const quickActions = [
  {
    title: "Create Agent",
    description: "Build a new AI agent from scratch",
    icon: Plus,
    href: "/create",
    color: "primary"
  },
  {
    title: "Test in Playground",
    description: "Test and refine agent responses",
    icon: Play,
    href: "/playground",
    color: "secondary"
  },
  {
    title: "Analyze Conversations",
    description: "Review performance metrics",
    icon: BarChart3,
    href: "/analysis",
    color: "accent"
  }
];

// Mock agent data (reuse from MyAgents)
const agents = [
  { name: "Jira Cloud", icon: Bot },
  { name: "Miro", icon: Bot },
  { name: "Mural", icon: Bot },
  { name: "Cohere", icon: Bot },
  { name: "Moveworks", icon: Bot },
  { name: "Zensai", icon: Bot },
  { name: "Snowflake Cortex Agent", icon: Bot },
  { name: "Now Virtual Agent", icon: Bot },
];

const msftAgents = [
  {
    name: "Researcher (Frontier)",
    desc: "With Researcher, now every employee has access to expertise...",
    color: "bg-fuchsia-50",
  },
  {
    name: "Analyst (Frontier)",
    desc: "Perform complex data analysis over files in a variety of formats",
    color: "bg-pink-50",
  },
  {
    name: "Sales",
    desc: "Microsoft 365 Copilot for Sales reimagines the way sellers work",
    color: "bg-sky-50",
  },
  {
    name: "Prompt Coach",
    desc: "Write and improve your prompts",
    color: "bg-violet-50",
  },
  {
    name: "Visual Creator",
    desc: "Create stunning visuals with Microsoft 365 Copilot",
    color: "bg-orange-50",
  },
  {
    name: "Writing Coach",
    desc: "Take your writing to the next level with Writing Coach...",
    color: "bg-cyan-50",
  },
];

export default function Index() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "agent_created": return Plus;
      case "high_usage": return TrendingUp;
      case "issue": return AlertTriangle;
      case "update": return Settings;
      default: return Activity;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case "success": return "text-primary";
      case "warning": return "text-secondary-foreground";
      case "info": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active": return "bg-primary-light text-primary border-primary/20";
      case "testing": return "bg-secondary text-secondary-foreground border-secondary/20";
      case "disabled": return "bg-surface-200 text-surface-600 border-surface-300";
      default: return "bg-surface-200 text-surface-600 border-surface-300";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="flex justify-end items-center px-8 py-4">
        <Button className="bg-primary text-primary-foreground" size="sm">
          + Create agent
        </Button>
      </div>
      <main className="max-w-5xl mx-auto px-4 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Agent Store</h1>
          <p className="text-muted-foreground mt-2">
            Find agents with the expertise to help you complete complex tasks
          </p>
        </div>
        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search agents"
              className="pl-10 py-3 rounded-lg border border-border bg-card"
            />
          </div>
        </div>
        {/* Your agents */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Your agents</h2>
            <Button variant="link" className="text-primary px-0 h-auto">See more &gt;</Button>
          </div>
          <div className="flex flex-wrap gap-6 items-center">
            {agents.map((agent) => (
              <div key={agent.name} className="flex flex-col items-center min-w-[80px]">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-2">
                  <agent.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs text-foreground text-center font-medium truncate max-w-[80px]">{agent.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Built by Microsoft */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Built by Microsoft</h2>
            <Button variant="link" className="text-primary px-0 h-auto">See more &gt;</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {msftAgents.map((agent) => (
              <Card key={agent.name} className={`${agent.color} border-0 shadow-none`}>
                <CardContent className="p-5">
                  <div className="font-semibold text-foreground mb-1">{agent.name}</div>
                  <div className="text-xs text-muted-foreground leading-snug">{agent.desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}