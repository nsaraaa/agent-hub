import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Award, 
  Bot, 
  BarChart3, 
  MessageCircle, 
  Star, 
  TrendingUp, 
  Calendar,
  Settings,
  Edit,
  Plus,
  Download,
  Share2,
  Eye,
  Clock,
  Zap,
  Users,
  Target,
  Activity
} from "lucide-react";

interface SkillBadge {
  id: string;
  name: string;
  description: string;
  icon: any;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  earnedDate: string;
  category: string;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  rating: number;
  conversations: number;
  lastActive: string;
  category: string;
}

interface Analytics {
  totalAgents: number;
  totalConversations: number;
  avgRating: number;
  monthlyGrowth: number;
  topPerformingAgent: string;
  responseTime: string;
}

const skillBadges: SkillBadge[] = [
  {
    id: "1",
    name: "Advanced NLP Designer",
    description: "Expert in natural language processing and prompt engineering",
    icon: Bot,
    level: 'expert',
    earnedDate: "2024-01-10",
    category: "AI/ML"
  },
  {
    id: "2",
    name: "Customer Experience Specialist",
    description: "Skilled in creating empathetic customer service agents",
    icon: Users,
    level: 'advanced',
    earnedDate: "2024-01-05",
    category: "Business"
  },
  {
    id: "3",
    name: "Analytics Pro",
    description: "Expert in agent performance analysis and optimization",
    icon: BarChart3,
    level: 'advanced',
    earnedDate: "2023-12-20",
    category: "Analytics"
  },
  {
    id: "4",
    name: "Integration Master",
    description: "Skilled in API integrations and webhook configurations",
    icon: Zap,
    level: 'intermediate',
    earnedDate: "2023-12-15",
    category: "Development"
  },
  {
    id: "5",
    name: "Prompt Engineer",
    description: "Specialist in crafting effective AI prompts",
    icon: Target,
    level: 'expert',
    earnedDate: "2023-12-01",
    category: "AI/ML"
  }
];

const userAgents: Agent[] = [
  {
    id: "1",
    name: "Customer Support Pro",
    description: "Advanced customer service with sentiment analysis",
    status: 'active',
    rating: 4.9,
    conversations: 3247,
    lastActive: "2 hours ago",
    category: "Customer Service"
  },
  {
    id: "2",
    name: "Sales Qualifier",
    description: "Lead qualification and product recommendations",
    status: 'active',
    rating: 4.6,
    conversations: 1892,
    lastActive: "1 day ago",
    category: "Sales"
  },
  {
    id: "3",
    name: "Tech Diagnostic",
    description: "Vehicle troubleshooting and repair guidance",
    status: 'active',
    rating: 4.8,
    conversations: 2156,
    lastActive: "3 hours ago",
    category: "Technical Support"
  },
  {
    id: "4",
    name: "Appointment Scheduler",
    description: "Smart scheduling with calendar integration",
    status: 'draft',
    rating: 0,
    conversations: 0,
    lastActive: "Never",
    category: "Scheduling"
  }
];

const analytics: Analytics = {
  totalAgents: 8,
  totalConversations: 7295,
  avgRating: 4.7,
  monthlyGrowth: 23.5,
  topPerformingAgent: "Customer Support Pro",
  responseTime: "1.2s"
};

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return "bg-purple-100 text-purple-800 border-purple-200";
      case 'advanced': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'intermediate': return "bg-green-100 text-green-800 border-green-200";
      case 'beginner': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return "bg-green-100 text-green-800 border-green-200";
      case 'draft': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'archived': return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Sarah Chen</h1>
                <p className="text-slate-600">AI Agent Designer & Prompt Engineer</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Expert Level
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    Member since Dec 2023
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 h-auto border border-slate-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              Badges
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Total Agents</p>
                      <p className="text-3xl font-bold text-slate-900">{analytics.totalAgents}</p>
                      <p className="text-sm text-green-600 mt-1">+{analytics.monthlyGrowth}% this month</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Bot className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Total Conversations</p>
                      <p className="text-3xl font-bold text-slate-900">{analytics.totalConversations.toLocaleString()}</p>
                      <p className="text-sm text-blue-600 mt-1">+15% this week</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Average Rating</p>
                      <p className="text-3xl font-bold text-slate-900">{analytics.avgRating}</p>
                      <p className="text-sm text-yellow-600 mt-1">Out of 5.0</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600 fill-current" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Updated Customer Support Pro</p>
                        <p className="text-xs text-slate-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Earned "Advanced NLP Designer" badge</p>
                        <p className="text-xs text-slate-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Created Sales Qualifier agent</p>
                        <p className="text-xs text-slate-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Response Time</span>
                        <span className="text-sm text-slate-600">{analytics.responseTime}</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Customer Satisfaction</span>
                        <span className="text-sm text-slate-600">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Agent Uptime</span>
                        <span className="text-sm text-slate-600">99.9%</span>
                      </div>
                      <Progress value={99.9} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Agents</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create New Agent
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userAgents.map((agent) => (
                <Card key={agent.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                      <Badge className={`text-xs ${getStatusColor(agent.status)}`}>
                        {agent.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{agent.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{agent.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{agent.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Conversations</span>
                        <span className="font-medium">{agent.conversations.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Last Active</span>
                        <span className="text-slate-600">{agent.lastActive}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conversation Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                    <p className="text-slate-500">Chart placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Agent Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                    <p className="text-slate-500">Chart placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillBadges.map((badge) => (
                <Card key={badge.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <badge.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{badge.name}</h3>
                        <Badge className={`text-xs mt-1 ${getLevelColor(badge.level)}`}>
                          {badge.level}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{badge.description}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Earned {badge.earnedDate}</span>
                      <span>{badge.category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
