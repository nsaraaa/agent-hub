import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  TrendingUp, 
  Star, 
  Download, 
  Eye, 
  Users, 
  MessageCircle,
  Filter,
  Bot,
  Sparkles,
  Clock,
  ArrowRight
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const trendingAgents = [
  {
    id: 1,
    name: "Universal Customer Support",
    description: "Multi-industry customer support agent with advanced problem-solving capabilities",
    creator: "Enterprise Solutions Inc.",
    category: "Customer Service",
    model: "GPT-4 Turbo",
    rating: 4.9,
    downloads: 12847,
    weeklyGrowth: "+23%",
    tags: ["customer-service", "multilingual", "enterprise"],
    featured: true,
  },
  {
    id: 2,
    name: "Automotive Diagnostic Expert",
    description: "Specialized agent for automotive troubleshooting and maintenance guidance",
    creator: "AutoTech AI",
    category: "Automotive",
    model: "Claude Opus",
    rating: 4.8,
    downloads: 8932,
    weeklyGrowth: "+19%",
    tags: ["automotive", "diagnostics", "technical"],
    featured: false,
  },
  {
    id: 3,
    name: "Sales Conversion Specialist",
    description: "High-converting sales agent optimized for lead qualification and closing",
    creator: "SalesForce Labs",
    category: "Sales",
    model: "GPT-4",
    rating: 4.7,
    downloads: 7654,
    weeklyGrowth: "+31%",
    tags: ["sales", "conversion", "lead-qualification"],
    featured: false,
  },
  {
    id: 4,
    name: "Healthcare Assistant",
    description: "HIPAA-compliant healthcare support agent for patient inquiries",
    creator: "MedTech Solutions",
    category: "Healthcare",
    model: "Claude Sonnet",
    rating: 4.9,
    downloads: 6789,
    weeklyGrowth: "+15%",
    tags: ["healthcare", "hipaa", "patient-care"],
    featured: false,
  },
  {
    id: 5,
    name: "Financial Advisor Bot",
    description: "Provides basic financial guidance and product recommendations",
    creator: "FinanceAI Corp",
    category: "Finance",
    model: "GPT-4",
    rating: 4.6,
    downloads: 5432,
    weeklyGrowth: "+12%",
    tags: ["finance", "advisory", "investments"],
    featured: false,
  }
];

const recommendedAgents = [
  {
    id: 6,
    name: "E-commerce Helper",
    description: "Optimized for online shopping assistance and product recommendations",
    creator: "RetailBot Inc.",
    category: "E-commerce",
    model: "GPT-3.5 Turbo",
    rating: 4.5,
    downloads: 4321,
    weeklyGrowth: "+8%",
    tags: ["e-commerce", "retail", "shopping"],
  },
  {
    id: 7,
    name: "Legal Research Assistant",
    description: "Legal document analysis and research support",
    creator: "LegalTech AI",
    category: "Legal",
    model: "Claude Opus",
    rating: 4.7,
    downloads: 3456,
    weeklyGrowth: "+18%",
    tags: ["legal", "research", "documents"],
  }
];

export default function TrendingAgents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAgents = trendingAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || agent.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredAgent = trendingAgents.find(agent => agent.featured);
  const topAgents = trendingAgents.filter(agent => !agent.featured).slice(0, 4);

  const handleTryAgent = (agentId: number) => {
    console.log("Try agent:", agentId);
  };

  const handleCloneAgent = (agentId: number) => {
    console.log("Clone agent:", agentId);
  };

  const categories = Array.from(new Set(trendingAgents.map(agent => agent.category)));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground tracking-tight">Trending Agents</h1>
              <p className="text-muted-foreground mt-2">
                Discover and deploy the most popular AI agents
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                {trendingAgents.length} trending agents
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                {trendingAgents.reduce((sum, agent) => sum + agent.downloads, 0).toLocaleString()} total downloads
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          {/* Search and Filters */}
          <div className="flex items-center space-x-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search agents, creators, or categories..."
                className="pl-10 border-border bg-card"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="border-border"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8 p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Category:</span>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Featured Agent */}
        {featuredAgent && !searchTerm && filterCategory === "all" && (
          <div className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Featured Agent</h2>
            </div>
            
            <Card className="border-2 border-primary/20 bg-primary-light/5">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <Bot className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-xl font-semibold text-foreground">{featuredAgent.name}</h3>
                          <Badge className="bg-primary text-primary-foreground border-primary">
                            Featured
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{featuredAgent.creator}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 max-w-2xl">
                      {featuredAgent.description}
                    </p>
                    
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-secondary-foreground fill-current" />
                        <span className="text-sm font-medium">{featuredAgent.rating}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {featuredAgent.downloads.toLocaleString()} downloads
                      </div>
                      <div className="text-sm text-primary font-medium">
                        {featuredAgent.weeklyGrowth} this week
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                        <Download className="w-4 h-4 mr-2" />
                        Deploy Agent
                      </Button>
                      <Button variant="outline" className="border-border">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                  
                  <div className="ml-8">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Model</div>
                      <div className="text-sm font-medium">{featuredAgent.model}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Top Agents */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Top Agents</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View all
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(searchTerm || filterCategory !== "all" ? filteredAgents : topAgents).map((agent) => (
              <Card key={agent.id} className="border-border bg-card hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{agent.name}</h3>
                        <p className="text-sm text-muted-foreground">{agent.creator}</p>
                      </div>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground border-secondary/20">
                      {agent.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {agent.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-secondary-foreground fill-current" />
                        <span className="text-muted-foreground">{agent.rating}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {agent.downloads.toLocaleString()} downloads
                      </div>
                    </div>
                    <div className="text-sm text-primary font-medium">
                      {agent.weeklyGrowth}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 border-border">
                      <Download className="w-4 h-4 mr-2" />
                      Deploy
                    </Button>
                    <Button variant="outline" size="sm" className="border-border">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended for You */}
        {!searchTerm && filterCategory === "all" && (
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Users className="w-5 h-5 text-secondary-foreground" />
              <h2 className="text-xl font-semibold text-foreground">Recommended for You</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedAgents.map((agent) => (
                <Card key={agent.id} className="border-border bg-card hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-surface-200 rounded-lg flex items-center justify-center">
                          <Bot className="w-5 h-5 text-surface-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground">{agent.creator}</p>
                        </div>
                      </div>
                      <Badge className="bg-surface-200 text-surface-600 border-surface-300">
                        {agent.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {agent.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-secondary-foreground fill-current" />
                          <span className="text-muted-foreground">{agent.rating}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {agent.downloads.toLocaleString()} downloads
                        </div>
                      </div>
                      <div className="text-sm text-primary font-medium">
                        {agent.weeklyGrowth}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 border-border">
                        <Download className="w-4 h-4 mr-2" />
                        Deploy
                      </Button>
                      <Button variant="outline" size="sm" className="border-border">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredAgents.length === 0 && (searchTerm || filterCategory !== "all") && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-surface-600" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No agents found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
              }}
              className="border-border"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}