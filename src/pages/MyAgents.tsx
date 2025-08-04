import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Bot, 
  Edit, 
  Copy, 
  Trash2, 
  Play,
  Pause,
  Calendar,
  MessageCircle,
  BarChart3,
  Grid3X3,
  List,
  Filter,
  Star
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const agents = [
  {
    id: 1,
    name: "Customer Support Assistant",
    description: "Handles general customer inquiries and support requests",
    model: "GPT-4",
    status: "active",
    lastUsed: "2 hours ago",
    totalChats: 1247,
    avgRating: 4.8,
    created: "2024-01-15",
  },
  {
    id: 2,
    name: "Sales Assistant",
    description: "Qualified leads and provides product information",
    model: "Claude Sonnet",
    status: "testing",
    lastUsed: "1 day ago",
    totalChats: 89,
    avgRating: 4.6,
    created: "2024-01-10",
  },
  {
    id: 3,
    name: "Technical Support",
    description: "Provides technical troubleshooting for vehicle issues",
    model: "GPT-4 Turbo",
    status: "active",
    lastUsed: "30 minutes ago",
    totalChats: 892,
    avgRating: 4.9,
    created: "2024-01-08",
  },
  {
    id: 4,
    name: "Parts Specialist",
    description: "Helps customers find and order specific vehicle parts",
    model: "GPT-3.5",
    status: "disabled",
    lastUsed: "3 days ago",
    totalChats: 234,
    avgRating: 4.2,
    created: "2024-01-05",
  }
];

export default function MyAgents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || agent.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-primary-light text-primary border-primary/20";
      case "testing": return "bg-secondary text-secondary-foreground border-secondary/20";
      case "disabled": return "bg-surface-200 text-surface-600 border-surface-300";
      default: return "bg-surface-200 text-surface-600 border-surface-300";
    }
  };

  const toggleAgentStatus = (agentId: number) => {
    // Logic to toggle agent status
    console.log("Toggle agent status:", agentId);
  };

  const activeAgents = agents.filter(a => a.status === "active").length;
  const totalChats = agents.reduce((sum, agent) => sum + agent.totalChats, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground tracking-tight">My Agents</h1>
              <p className="text-muted-foreground mt-2">
                Manage and monitor your AI agents
              </p>
            </div>
            <Button 
              className="bg-primary hover:bg-primary-hover text-primary-foreground"
              onClick={() => navigate("/create")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Agent
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                {activeAgents} active agents
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                {totalChats.toLocaleString()} total conversations
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
                placeholder="Search agents..."
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

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="border-border"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="border-border"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8 p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Agents Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="border-border bg-card hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{agent.name}</h3>
                        <p className="text-sm text-muted-foreground">{agent.model}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/edit/${agent.id}`)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {agent.description}
                  </p>

                  {/* Status */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`text-xs ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-secondary-foreground fill-current" />
                      <span className="text-sm text-muted-foreground">{agent.avgRating}</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last used</span>
                      <span className="text-foreground">{agent.lastUsed}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total chats</span>
                      <span className="text-foreground">{agent.totalChats.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-border"
                      onClick={() => navigate("/playground")}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Test
                    </Button>
                    <Button variant="outline" size="sm" className="border-border">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="border-border bg-card hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-medium text-foreground truncate">{agent.name}</h3>
                          <Badge className={`text-xs ${getStatusColor(agent.status)}`}>
                            {agent.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{agent.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-right">
                        <div className="text-muted-foreground">Last used</div>
                        <div className="text-foreground">{agent.lastUsed}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-muted-foreground">Rating</div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-secondary-foreground fill-current" />
                          <span className="text-foreground">{agent.avgRating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-muted-foreground">Chats</div>
                        <div className="text-foreground">{agent.totalChats.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-6">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-border"
                        onClick={() => navigate("/playground")}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Test
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/edit/${agent.id}`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-surface-600" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No agents found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filters"
                : "Get started by creating your first agent"
              }
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Button 
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
                onClick={() => navigate("/create")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Agent
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}