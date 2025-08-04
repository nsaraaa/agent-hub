import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Bot, 
  Users, 
  Calendar,
  Activity,
  Edit,
  Copy,
  Trash2,
  Eye
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const allAgents = [
  {
    id: 1,
    name: "Customer Support Assistant",
    creator: "john.doe@company.com",
    type: "User Agent",
    model: "GPT-4",
    status: "active",
    lastUsed: "2024-01-20",
    totalChats: 1247,
    organization: "AutoCorp",
    tags: ["customer-service", "support"],
  },
  {
    id: 2,
    name: "Universal Customer Support",
    creator: "Enterprise Solutions Inc.",
    type: "Public Template",
    model: "GPT-4 Turbo",
    status: "active",
    lastUsed: "2024-01-19",
    totalChats: 12847,
    organization: "Platform",
    tags: ["template", "enterprise"],
  },
  {
    id: 3,
    name: "Sales Assistant",
    creator: "jane.smith@company.com",
    type: "User Agent",
    model: "Claude Sonnet",
    status: "testing",
    lastUsed: "2024-01-18",
    totalChats: 89,
    organization: "AutoCorp",
    tags: ["sales", "conversion"],
  },
  {
    id: 4,
    name: "Automotive Diagnostic Expert",
    creator: "AutoTech AI",
    type: "Shared Agent",
    model: "Claude Opus",
    status: "active",
    lastUsed: "2024-01-20",
    totalChats: 8932,
    organization: "AutoTech",
    tags: ["automotive", "diagnostics"],
  },
  {
    id: 5,
    name: "Technical Support",
    creator: "tech.team@company.com",
    type: "User Agent",
    model: "GPT-4 Turbo",
    status: "active",
    lastUsed: "2024-01-20",
    totalChats: 892,
    organization: "AutoCorp",
    tags: ["technical", "troubleshooting"],
  },
  {
    id: 6,
    name: "Parts Specialist",
    creator: "parts.team@company.com",
    type: "User Agent",
    model: "GPT-3.5",
    status: "disabled",
    lastUsed: "2024-01-17",
    totalChats: 234,
    organization: "AutoCorp",
    tags: ["parts", "inventory"],
  },
  {
    id: 7,
    name: "Healthcare Assistant",
    creator: "MedTech Solutions",
    type: "Public Template",
    model: "Claude Sonnet",
    status: "active",
    lastUsed: "2024-01-19",
    totalChats: 6789,
    organization: "Platform",
    tags: ["healthcare", "hipaa"],
  },
  {
    id: 8,
    name: "Financial Advisor Bot",
    creator: "FinanceAI Corp",
    type: "Shared Agent",
    model: "GPT-4",
    status: "active",
    lastUsed: "2024-01-19",
    totalChats: 5432,
    organization: "FinanceAI",
    tags: ["finance", "advisory"],
  }
];

export default function AllAgents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterOrganization, setFilterOrganization] = useState("all");

  const organizations = [...new Set(allAgents.map(agent => agent.organization))];
  const agentTypes = [...new Set(allAgents.map(agent => agent.type))];

  const filteredAgents = allAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || agent.type === filterType;
    const matchesStatus = filterStatus === "all" || agent.status === filterStatus;
    const matchesOrg = filterOrganization === "all" || agent.organization === filterOrganization;
    
    return matchesSearch && matchesType && matchesStatus && matchesOrg;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-primary-light text-primary";
      case "testing": return "bg-secondary text-secondary-foreground";
      case "disabled": return "bg-surface-200 text-surface-600";
      default: return "bg-surface-200 text-surface-600";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "User Agent": return "bg-primary-light text-primary";
      case "Public Template": return "bg-secondary text-secondary-foreground";
      case "Shared Agent": return "bg-surface-200 text-surface-600";
      default: return "bg-surface-200 text-surface-600";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground tracking-tight">All Agents</h1>
              <p className="text-muted-foreground mt-2">Complete overview of all agents across the platform</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                {allAgents.length} total agents
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                {organizations.length} organizations
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="kpi-card">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="kpi-value">{allAgents.length}</p>
              <p className="kpi-label">Total Agents</p>
            </div>
          </div>
        </Card>

        <Card className="kpi-card">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="kpi-value text-primary">
                {allAgents.filter(a => a.status === "active").length}
              </p>
              <p className="kpi-label">Active Agents</p>
            </div>
          </div>
        </Card>

        <Card className="kpi-card">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="kpi-value">{organizations.length}</p>
              <p className="kpi-label">Organizations</p>
            </div>
          </div>
        </Card>

        <Card className="kpi-card">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="kpi-value">
                {allAgents.reduce((sum, agent) => sum + agent.totalChats, 0).toLocaleString()}
              </p>
              <p className="kpi-label">Total Chats</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-premium">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search agents, creators, or tags..."
                className="pl-10 transition-colors hover:border-input-hover focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48 transition-colors hover:border-input-hover focus:border-primary">
                <SelectValue placeholder="Agent Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {agentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 transition-colors hover:border-input-hover focus:border-primary">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterOrganization} onValueChange={setFilterOrganization}>
              <SelectTrigger className="w-48 transition-colors hover:border-input-hover focus:border-primary">
                <SelectValue placeholder="Organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                {organizations.map(org => (
                  <SelectItem key={org} value={org}>{org}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setFilterType("all");
                setFilterStatus("all");
                setFilterOrganization("all");
              }}
              className="transition-all duration-fast"
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Agents Table */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Agents ({filteredAgents.length})</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="transition-all duration-fast">
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Creator/Owner</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Total Chats</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id} className="hover:bg-surface-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{agent.name}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {agent.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium text-foreground">{agent.creator}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getTypeColor(agent.type)}`}>
                      {agent.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {agent.model}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground">{agent.organization}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(agent.lastUsed).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-foreground">
                      {agent.totalChats.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="transition-all duration-fast">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="hover:bg-surface-50">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-surface-50">
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        {agent.type === "User Agent" && (
                          <>
                            <DropdownMenuItem 
                              className="hover:bg-surface-50"
                              onClick={() => navigate(`/edit/${agent.id}`)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive hover:bg-destructive-light">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No agents found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setFilterType("all");
                setFilterStatus("all");
                setFilterOrganization("all");
              }} className="transition-all duration-fast">
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
}