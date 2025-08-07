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
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Welcome back! Here's what's happening with your AI agents.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                {dashboardStats.totalAgents} total agents
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                {dashboardStats.totalChats.toLocaleString()} total conversations
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Agents</p>
                  <p className="text-2xl font-semibold text-foreground">{dashboardStats.totalAgents}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-muted-foreground">{dashboardStats.activeAgents} active</span>
                    <span className="text-xs text-primary font-medium">+{dashboardStats.monthlyGrowth}%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Average Rating</p>
                  <p className="text-2xl font-semibold text-foreground">{dashboardStats.avgRating}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-muted-foreground">Out of 5.0</span>
                    <span className="text-xs text-primary font-medium">+0.2</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-secondary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Conversations</p>
                  <p className="text-2xl font-semibold text-foreground">{dashboardStats.totalChats.toLocaleString()}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-muted-foreground">This month</span>
                    <span className="text-xs text-primary font-medium">+{dashboardStats.monthlyGrowth}%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-secondary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Response Time</p>
                  <p className="text-2xl font-semibold text-foreground">{dashboardStats.responseTime}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-muted-foreground">Last 7 days</span>
                    <span className="text-xs text-primary font-medium">-0.3s</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-secondary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-2">Quick Actions</h2>
              <p className="text-sm text-muted-foreground">Get started with common tasks</p>
            </div>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <Link key={action.title} to={action.href}>
                  <Card className="border-border bg-card hover:shadow-md transition-all duration-200 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                          <action.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground mb-1">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity & Trending Agents */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">Recent Activity</h2>
                  <p className="text-sm text-muted-foreground">Latest updates from your agents</p>
                </div>
                <Link to="/my-agents">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const Icon = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface-50 transition-colors">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.status)} bg-current/10`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{activity.title}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{activity.user}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trending Agents */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">Trending Agents</h2>
                  <p className="text-sm text-muted-foreground">Your best performing agents</p>
                </div>
                <Link to="/trending">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingAgents.map((agent) => (
                  <Card key={agent.id} className="border-border bg-card hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground text-sm">{agent.name}</h3>
                            <Badge className={`text-xs mt-1 ${getStatusBadgeColor(agent.status)}`}>
                              {agent.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{agent.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-4">
                          <span className="text-muted-foreground">{agent.chats.toLocaleString()} chats</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-secondary-foreground fill-current" />
                            <span className="text-muted-foreground">{agent.rating}</span>
                          </div>
                        </div>
                        <span className="text-primary font-medium">{agent.growth}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}