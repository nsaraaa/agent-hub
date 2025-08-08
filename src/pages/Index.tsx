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
  Target
} from "lucide-react";
import { Input } from "@/components/ui/input";
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

const yourAgents = [
  { id: 1, name: "SupportBot", icon: Bot },
  { id: 2, name: "SalesGuru", icon: Users },
  { id: 3, name: "Scheduler", icon: Calendar },
  { id: 4, name: "InsightAI", icon: BarChart3 },
  { id: 5, name: "Techie", icon: Activity },
  { id: 6, name: "Chatter", icon: MessageCircle },
  { id: 7, name: "Trendster", icon: TrendingUp },
  { id: 8, name: "StarAgent", icon: Star },
  { id: 9, name: "QuickHelp", icon: Clock },
  { id: 10, name: "Zapster", icon: Zap },
];

const builtByCompany = [
  {
    id: 1,
    title: "Parts Finder",
    description: "Instantly locate and order parts from your inventory.",
    gradient: "from-pink-100 via-pink-50 to-white",
  },
  {
    id: 2,
    title: "Customer Insights",
    description: "Analyze customer sentiment and feedback trends.",
    gradient: "from-blue-100 via-blue-50 to-white",
  },
  {
    id: 3,
    title: "Smart Scheduler",
    description: "Automate and optimize appointment bookings.",
    gradient: "from-green-100 via-green-50 to-white",
  },
  {
    id: 4,
    title: "Sales Assistant",
    description: "Qualify leads and recommend products in real time.",
    gradient: "from-yellow-100 via-yellow-50 to-white",
  },
  {
    id: 5,
    title: "Tech Support",
    description: "Troubleshoot and resolve issues with AI guidance.",
    gradient: "from-purple-100 via-purple-50 to-white",
  },
  {
    id: 6,
    title: "Analytics Pro",
    description: "Advanced analytics for your business operations.",
    gradient: "from-teal-100 via-teal-50 to-white",
  },
];

export default function Index() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [search, setSearch] = useState("");

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
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {/* Page Title & Subtitle */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Agent Store</h1>
          <p className="text-lg text-slate-500 font-normal max-w-xl mx-auto">Discover, manage, and deploy AI agents to supercharge your business workflows. Explore our curated collection or build your own.</p>
        </div>
        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <Input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search agents"
            className="w-full max-w-xl rounded-full px-6 py-4 text-lg bg-slate-50 border border-slate-200 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        {/* Your Agents Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">Your Agents</h2>
            <Link to="/my-agents" className="text-primary text-sm font-medium hover:underline">See more</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-6">
            {yourAgents.slice(0, 10).map(agent => (
              <div key={agent.id} className="flex flex-col items-center bg-slate-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 mb-3">
                  <agent.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-base font-medium text-slate-800 truncate w-full text-center">{agent.name}</span>
              </div>
            ))}
          </div>
        </section>
        {/* Built by [Your Company Name] Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">Built by Acme Corp</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {builtByCompany.map(tile => (
              <div
                key={tile.id}
                className={`rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all bg-gradient-to-br ${tile.gradient}`}
                style={{ minHeight: 170 }}
              >
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{tile.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-1">{tile.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}