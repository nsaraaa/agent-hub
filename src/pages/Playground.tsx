import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { 
  Send, 
  Mic, 
  MicOff, 
  User, 
  Bot, 
  Settings, 
  Zap, 
  MessageCircle,
  Search,
  Filter,
  Star,
  Download,
  Share2,
  Bookmark,
  Play,
  Pause,
  RotateCcw,
  BarChart3,
  TrendingUp,
  Activity,
  Cpu,
  Database,
  FileText,
  Code,
  Globe,
  Users as UsersIcon,
  Settings2,
  Download as DownloadIcon,
  Upload,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  Gauge,
  Layers,
  Sparkles,
  Crown,
  Award,
  Lightbulb,
  Shield,
  Zap as ZapIcon,
  ArrowUpRight,
  ChevronRight,
  Plus,
  Grid3X3,
  List,
  Heart,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  GitBranch,
  GitCommit,
  GitPullRequest
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: number;
  retrievedDocs?: string[];
  confidence?: number;
  latency?: number;
  model?: string;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  model: string;
  rating: number;
  reviews: number;
  downloads: number;
  price: string;
  tags: string[];
  features: string[];
  creator: string;
  isPremium: boolean;
  isFeatured: boolean;
  status: 'active' | 'beta' | 'deprecated';
  lastUpdated: string;
  version: string;
}

interface TestSession {
  id: string;
  agentId: string;
  startTime: Date;
  messages: Message[];
  metrics: {
    totalTokens: number;
    totalCost: number;
    avgLatency: number;
    qualityScore: number;
    userSatisfaction: number;
  };
}

const featuredAgents: Agent[] = [
  {
    id: "customer-support-pro",
    name: "Customer Support Pro",
    description: "Advanced customer support agent with multi-language support and sentiment analysis",
    category: "Customer Service",
    model: "GPT-4 Turbo",
    rating: 4.8,
    reviews: 1247,
    downloads: 15420,
    price: "Free",
    tags: ["customer-service", "multi-language", "sentiment-analysis"],
    features: ["Multi-language Support", "Sentiment Analysis", "Auto-escalation", "Knowledge Base Integration"],
    creator: "Enterprise Solutions Inc.",
    isPremium: false,
    isFeatured: true,
    status: "active",
    lastUpdated: "2024-01-20",
    version: "2.1.0"
  },
  {
    id: "sales-accelerator",
    name: "Sales Accelerator",
    description: "AI-powered sales assistant that helps close deals and qualify leads",
    category: "Sales",
    model: "Claude Sonnet",
    rating: 4.9,
    reviews: 892,
    downloads: 8932,
    price: "$29/month",
    tags: ["sales", "lead-qualification", "deal-closing"],
    features: ["Lead Qualification", "Deal Closing", "Pipeline Management", "ROI Tracking"],
    creator: "SalesForce AI",
    isPremium: true,
    isFeatured: true,
    status: "active",
    lastUpdated: "2024-01-19",
    version: "1.8.2"
  },
  {
    id: "technical-expert",
    name: "Technical Expert",
    description: "Specialized technical support agent with deep domain knowledge",
    category: "Technical Support",
    model: "Claude Opus",
    rating: 4.7,
    reviews: 567,
    downloads: 3245,
    price: "$49/month",
    tags: ["technical-support", "troubleshooting", "documentation"],
    features: ["Deep Technical Knowledge", "Troubleshooting", "Documentation Generation", "Code Review"],
    creator: "TechCorp Solutions",
    isPremium: true,
    isFeatured: false,
    status: "active",
    lastUpdated: "2024-01-18",
    version: "3.0.1"
  }
];

const agentCategories = [
  "All Categories",
  "Customer Service",
  "Sales",
  "Technical Support",
  "Marketing",
  "HR & Recruitment",
  "Finance",
  "Legal",
  "Healthcare",
  "Education"
];

export default function Playground() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showDebug, setShowDebug] = useState(true);
  const [activeTab, setActiveTab] = useState("playground");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [testSessions, setTestSessions] = useState<TestSession[]>([]);
  const [currentSession, setCurrentSession] = useState<TestSession | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [debugSettings, setDebugSettings] = useState({
    showTokens: true,
    showLatency: true,
    showConfidence: true,
    showRetrievedDocs: true,
    enableStreaming: true,
    enableAutoScroll: true
  });
  const [performanceMetrics, setPerformanceMetrics] = useState({
    responseTime: 1.2,
    qualityScore: 92,
    tokenUsage: 247,
    maxTokens: 8192,
    costPerRequest: 0.012,
    totalCost: 0.048
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedAgent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response with enhanced metrics
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about ${inputMessage.toLowerCase().includes('vehicle') ? 'your vehicle' : 'this topic'}. Let me provide you with the most relevant information based on my training and available knowledge base.`,
        timestamp: new Date(),
        tokens: Math.floor(Math.random() * 50) + 30,
        retrievedDocs: ["knowledge-base-v2.pdf", "faq-database.pdf", "troubleshooting-guide.pdf"],
        confidence: Math.random() * 0.3 + 0.7,
        latency: Math.random() * 2 + 0.5,
        model: selectedAgent.model
      };
      setMessages(prev => [...prev, aiMessage]);
      
      // Update performance metrics
      setPerformanceMetrics(prev => ({
        ...prev,
        responseTime: aiMessage.latency || 1.2,
        tokenUsage: prev.tokenUsage + (aiMessage.tokens || 0),
        totalCost: prev.totalCost + (aiMessage.tokens || 0) * 0.0001
      }));
    }, 1000);
  };

  const startNewSession = (agent: Agent) => {
    const session: TestSession = {
      id: Date.now().toString(),
      agentId: agent.id,
      startTime: new Date(),
      messages: [],
      metrics: {
        totalTokens: 0,
        totalCost: 0,
        avgLatency: 0,
        qualityScore: 0,
        userSatisfaction: 0
      }
    };
    setCurrentSession(session);
    setMessages([]);
    setIsSessionActive(true);
    setSelectedAgent(agent);
  };

  const stopSession = () => {
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        messages,
        metrics: {
          totalTokens: performanceMetrics.tokenUsage,
          totalCost: performanceMetrics.totalCost,
          avgLatency: performanceMetrics.responseTime,
          qualityScore: performanceMetrics.qualityScore,
          userSatisfaction: Math.floor(Math.random() * 30) + 70
        }
      };
      setTestSessions(prev => [...prev, updatedSession]);
      setIsSessionActive(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current && debugSettings.enableAutoScroll) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, debugSettings.enableAutoScroll]);

  const filteredAgents = featuredAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All Categories" || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground tracking-tight">Agent Playground</h1>
              <p className="text-muted-foreground mt-2">Enterprise-grade agent testing and marketplace</p>
            </div>
            <div className="flex items-center space-x-3">
              {selectedAgent && (
                <Badge className="bg-primary-light text-primary border-primary/20">
                  Testing: {selectedAgent.name}
                </Badge>
              )}
              <Badge variant="outline" className="bg-success-light text-success border-success/20">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                Enterprise Ready
              </Badge>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="flex items-center space-x-8 mt-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                {testSessions.length} test sessions completed
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-sm text-muted-foreground">
                {featuredAgents.length} agents available
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <UsersIcon className="w-4 h-4 text-secondary" />
              <span className="text-sm text-muted-foreground">
                Team collaboration enabled
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="marketplace" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Marketplace</span>
            </TabsTrigger>
            <TabsTrigger value="playground" className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Playground</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Sessions</span>
            </TabsTrigger>
          </TabsList>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search agents, features, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {agentCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Featured Agents */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Featured Agents</h2>
                <Button variant="outline" size="sm">
                  View All
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAgents.map((agent) => (
                    <Card key={agent.id} className="card-premium hover-lift transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                              <Bot className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{agent.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{agent.creator}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {agent.isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
                            {agent.isFeatured && <Star className="w-4 h-4 text-primary fill-primary" />}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{agent.description}</p>
                        
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{agent.category}</Badge>
                          <Badge variant="outline">{agent.model}</Badge>
                          <Badge className={agent.status === 'active' ? 'bg-success-light text-success' : 'bg-warning-light text-warning'}>
                            {agent.status}
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span>{agent.rating}</span>
                            <span className="text-muted-foreground">({agent.reviews})</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="w-4 h-4 text-muted-foreground" />
                            <span>{agent.downloads.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">{agent.price}</span>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              onClick={() => startNewSession(agent)}
                              className="bg-primary hover:bg-primary-hover"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Test
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAgents.map((agent) => (
                    <Card key={agent.id} className="card-premium">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                              <Bot className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{agent.name}</h3>
                              <p className="text-sm text-muted-foreground">{agent.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge variant="outline">{agent.category}</Badge>
                                <Badge variant="outline">{agent.model}</Badge>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  <span className="text-sm">{agent.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="font-semibold text-foreground">{agent.price}</span>
                            <Button 
                              onClick={() => startNewSession(agent)}
                              className="bg-primary hover:bg-primary-hover"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Test
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Playground Tab */}
          <TabsContent value="playground" className="space-y-6">
            {!selectedAgent ? (
              <Card className="card-premium">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Select an Agent to Start Testing</h3>
                  <p className="text-muted-foreground mb-6">Choose from our marketplace of enterprise-grade agents to begin your testing session.</p>
                  <Button onClick={() => setActiveTab("marketplace")}>
                    Browse Agents
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-320px)]">
                {/* Chat Interface */}
                <div className="lg:col-span-2 flex flex-col">
                  <Card className="card-premium flex-1 flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <span>{selectedAgent.name}</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">{selectedAgent.model}</Badge>
                              <Badge className="bg-success-light text-success text-xs">Active</Badge>
                            </div>
                          </div>
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          {isSessionActive && (
                            <Button variant="outline" size="sm" onClick={stopSession}>
                              <Pause className="w-4 h-4" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => setMessages([])}>
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Settings className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" />
                                Export Chat
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="w-4 h-4 mr-2" />
                                Share Session
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Settings2 className="w-4 h-4 mr-2" />
                                Agent Settings
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="flex-1 flex flex-col p-0">
                      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`flex items-start space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  message.role === 'user' 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-surface-200 text-muted-foreground'
                                }`}>
                                  {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </div>
                                <div className={`rounded-lg p-3 ${
                                  message.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-surface-100 text-foreground border border-border'
                                }`}>
                                  <p className="text-sm">{message.content}</p>
                                  <div className={`flex items-center space-x-2 mt-2 ${
                                    message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                  }`}>
                                    <span className="text-xs">{message.timestamp.toLocaleTimeString()}</span>
                                    {message.role === 'assistant' && debugSettings.showLatency && message.latency && (
                                      <span className="text-xs">• {message.latency.toFixed(1)}s</span>
                                    )}
                                    {message.role === 'assistant' && debugSettings.showConfidence && message.confidence && (
                                      <span className="text-xs">• {(message.confidence * 100).toFixed(0)}% confidence</span>
                                    )}
                                  </div>
                                  {message.role === 'assistant' && debugSettings.showRetrievedDocs && message.retrievedDocs && (
                                    <div className="mt-2 pt-2 border-t border-border/50">
                                      <p className="text-xs text-muted-foreground mb-1">Retrieved documents:</p>
                                      <div className="flex flex-wrap gap-1">
                                        {message.retrievedDocs.map((doc, index) => (
                                          <Badge key={index} variant="outline" className="text-xs">
                                            {doc}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      <div className="border-t border-border p-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 flex items-center space-x-2">
                            <Input
                              placeholder="Type your message..."
                              value={inputMessage}
                              onChange={(e) => setInputMessage(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                              className="flex-1"
                            />
                            <Button
                              variant={isRecording ? "destructive" : "outline"}
                              size="sm"
                              onClick={() => setIsRecording(!isRecording)}
                            >
                              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                            </Button>
                          </div>
                          <Button 
                            onClick={handleSendMessage} 
                            disabled={!inputMessage.trim()}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Enhanced Debug Panel */}
                <div className="flex flex-col space-y-4">
                  {/* Debug Settings */}
                  <Card className="card-premium">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                            <Settings className="w-5 h-5 text-secondary-foreground" />
                          </div>
                          <span>Debug Panel</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowDebug(!showDebug)}
                        >
                          {showDebug ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    {showDebug && (
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Show Tokens</span>
                            <Switch
                              checked={debugSettings.showTokens}
                              onCheckedChange={(checked) => setDebugSettings(prev => ({ ...prev, showTokens: checked }))}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Show Latency</span>
                            <Switch
                              checked={debugSettings.showLatency}
                              onCheckedChange={(checked) => setDebugSettings(prev => ({ ...prev, showLatency: checked }))}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Show Confidence</span>
                            <Switch
                              checked={debugSettings.showConfidence}
                              onCheckedChange={(checked) => setDebugSettings(prev => ({ ...prev, showConfidence: checked }))}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Show Retrieved Docs</span>
                            <Switch
                              checked={debugSettings.showRetrievedDocs}
                              onCheckedChange={(checked) => setDebugSettings(prev => ({ ...prev, showRetrievedDocs: checked }))}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-foreground">Current Model</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{selectedAgent.model}</Badge>
                            <Badge className="bg-secondary-light text-secondary border-secondary/20">Balanced</Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-foreground">Session Stats</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-surface-50 p-2 rounded-lg">
                              <p className="text-muted-foreground">Messages:</p>
                              <p className="font-medium text-foreground">{messages.length}</p>
                            </div>
                            <div className="bg-surface-50 p-2 rounded-lg">
                              <p className="text-muted-foreground">Tokens:</p>
                              <p className="font-medium text-foreground">{performanceMetrics.tokenUsage}</p>
                            </div>
                            <div className="bg-surface-50 p-2 rounded-lg">
                              <p className="text-muted-foreground">Cost:</p>
                              <p className="font-medium text-foreground">${performanceMetrics.totalCost.toFixed(3)}</p>
                            </div>
                            <div className="bg-surface-50 p-2 rounded-lg">
                              <p className="text-muted-foreground">Latency:</p>
                              <p className="font-medium text-foreground">{performanceMetrics.responseTime.toFixed(1)}s</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-foreground">Quick Actions</h4>
                          <div className="flex flex-col space-y-2">
                            <Button variant="outline" size="sm">
                              <GitBranch className="w-4 h-4 mr-2" />
                              Switch Model
                            </Button>
                            <Button variant="outline" size="sm">
                              <RotateCcw className="w-4 h-4 mr-2" />
                              Clear Chat
                            </Button>
                            <Button variant="outline" size="sm">
                              <DownloadIcon className="w-4 h-4 mr-2" />
                              Export Log
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* Performance Metrics */}
                  <Card className="card-premium">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-secondary-foreground" />
                        </div>
                        <span>Performance</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Response Time</span>
                          <span className="font-medium text-foreground">{performanceMetrics.responseTime.toFixed(1)}s</span>
                        </div>
                        <div className="w-full bg-surface-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-smooth"
                            style={{ width: `${Math.min((performanceMetrics.responseTime / 3) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Quality Score</span>
                          <span className="font-medium text-foreground">{performanceMetrics.qualityScore}%</span>
                        </div>
                        <div className="w-full bg-surface-200 rounded-full h-2">
                          <div 
                            className="bg-success h-2 rounded-full transition-all duration-smooth"
                            style={{ width: `${performanceMetrics.qualityScore}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Token Usage</span>
                          <span className="font-medium text-foreground">{performanceMetrics.tokenUsage}/{performanceMetrics.maxTokens}</span>
                        </div>
                        <div className="w-full bg-surface-200 rounded-full h-2">
                          <div 
                            className="bg-secondary h-2 rounded-full transition-all duration-smooth"
                            style={{ width: `${(performanceMetrics.tokenUsage / performanceMetrics.maxTokens) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Cost</span>
                          <span className="font-medium text-foreground">${performanceMetrics.totalCost.toFixed(3)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-premium">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Sessions</p>
                      <p className="text-2xl font-semibold text-foreground">{testSessions.length}</p>
                      <p className="text-xs text-success">+12% from last week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-premium">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Quality Score</p>
                      <p className="text-2xl font-semibold text-foreground">92%</p>
                      <p className="text-xs text-success">+5% from last week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-premium">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-warning-light rounded-lg flex items-center justify-center">
                      <Gauge className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Response Time</p>
                      <p className="text-2xl font-semibold text-foreground">1.2s</p>
                      <p className="text-xs text-success">-0.3s from last week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-premium">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-secondary-light rounded-lg flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Tokens</p>
                      <p className="text-2xl font-semibold text-foreground">12.4K</p>
                      <p className="text-xs text-success">+8% from last week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Performance Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Chart visualization would go here
                  </div>
                </CardContent>
              </Card>

              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Agent Usage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredAgents.slice(0, 3).map((agent) => (
                      <div key={agent.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
                            <Bot className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{agent.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-surface-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {Math.floor(Math.random() * 50) + 10}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Test Sessions</h2>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>

            {testSessions.length === 0 ? (
              <Card className="card-premium">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Database className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Test Sessions Yet</h3>
                  <p className="text-muted-foreground mb-6">Start testing agents to see your session history and analytics.</p>
                  <Button onClick={() => setActiveTab("marketplace")}>
                    Start Testing
                    <Play className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {testSessions.map((session) => (
                  <Card key={session.id} className="card-premium">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                            <Bot className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {featuredAgents.find(a => a.id === session.agentId)?.name || 'Unknown Agent'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {session.startTime.toLocaleDateString()} • {session.messages.length} messages
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">
                              Quality: {session.metrics.qualityScore}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Cost: ${session.metrics.totalCost.toFixed(3)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}