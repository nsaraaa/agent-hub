import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Plus, Upload, Shield, Settings, Link, Trash2, Search, Filter, 
  Star, Download, Eye, Heart, Share2, Zap, Users, TrendingUp,
  Globe, Lock, Unlock, Crown, Sparkles, Bot, MessageSquare,
  Phone, Video, FileText, Database, Cloud, Cpu, Brain,
  CheckCircle, AlertCircle, Clock, DollarSign, BarChart3,
  Target, Palette, Languages, Volume2, Calendar, Mail,
  ShoppingCart, CreditCard, ArrowRight, ChevronRight, Code,
  MessageCircle, ShoppingBag, GraduationCap, X
} from "lucide-react";

interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  downloads: number;
  features: string[];
  tags: string[];
  image: string;
  isPremium: boolean;
  isFeatured: boolean;
}

interface PredefinedTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  systemPrompt: string;
  capabilities: {
    voice: boolean;
    calling: boolean;
    vision: boolean;
    fileUpload: boolean;
    apiAccess: boolean;
  };
  features: string[];
  tags: string[];
}

interface AgentConfig {
  name: string;
  description: string;
  category: string;
  systemPrompt: string;
  language: string;
  pricing: {
    model: string;
    tier: 'starter' | 'professional' | 'enterprise';
    pricePerMessage: number;
    monthlyLimit: number;
  };
  capabilities: {
    voice: boolean;
    calling: boolean;
    vision: boolean;
    fileUpload: boolean;
    apiAccess: boolean;
  };
  integrations: Array<{
    id: string;
    name: string;
    url: string;
    description: string;
    type: string;
  }>;
  analytics: {
    enabled: boolean;
    metrics: string[];
  };
}

const predefinedTemplates: PredefinedTemplate[] = [
  {
    id: "react-agent",
    name: "React Development Agent",
    description: "AI assistant specialized in React development, debugging, and best practices",
    icon: Code,
    category: "Development",
    systemPrompt: "You are an expert React developer assistant. You help with React development, debugging, code reviews, and best practices. You can analyze code, suggest improvements, explain concepts, and help with React ecosystem tools like Next.js, TypeScript, and testing frameworks.",
    capabilities: {
      voice: false,
      calling: false,
      vision: true,
      fileUpload: true,
      apiAccess: true
    },
    features: ["Code Analysis", "Debugging Help", "Best Practices", "TypeScript Support", "Testing Guidance"],
    tags: ["react", "development", "javascript", "typescript", "frontend"]
  },
  {
    id: "customer-support",
    name: "Customer Support Agent",
    description: "Professional customer service agent with sentiment analysis and escalation handling",
    icon: MessageCircle,
    category: "Customer Service",
    systemPrompt: "You are a professional customer support representative. You help customers with their inquiries, troubleshoot issues, provide solutions, and escalate complex problems when necessary. You maintain a friendly, helpful tone and ensure customer satisfaction.",
    capabilities: {
      voice: true,
      calling: true,
      vision: false,
      fileUpload: true,
      apiAccess: true
    },
    features: ["Multi-language Support", "Sentiment Analysis", "Auto-escalation", "CRM Integration", "Knowledge Base"],
    tags: ["support", "customer-service", "helpdesk", "escalation"]
  },
  {
    id: "sales-assistant",
    name: "Sales Assistant Agent",
    description: "Intelligent sales agent for lead qualification and objection handling",
    icon: Target,
    category: "Sales",
    systemPrompt: "You are a skilled sales assistant. You help qualify leads, handle objections, provide product information, and guide prospects through the sales process. You're knowledgeable about products/services and can adapt your approach based on customer needs.",
    capabilities: {
      voice: true,
      calling: true,
      vision: false,
      fileUpload: true,
      apiAccess: true
    },
    features: ["Lead Qualification", "Objection Handling", "Pipeline Management", "Product Knowledge", "Follow-up Automation"],
    tags: ["sales", "lead-generation", "b2b", "pipeline"]
  },
  {
    id: "educational-tutor",
    name: "Educational Tutor Agent",
    description: "AI tutor for personalized learning and educational support",
    icon: GraduationCap,
    category: "Education",
    systemPrompt: "You are an educational tutor and learning assistant. You help students understand concepts, solve problems, provide explanations, and adapt your teaching style to different learning levels. You encourage critical thinking and provide constructive feedback.",
    capabilities: {
      voice: true,
      calling: false,
      vision: true,
      fileUpload: true,
      apiAccess: false
    },
    features: ["Personalized Learning", "Concept Explanation", "Problem Solving", "Progress Tracking", "Adaptive Teaching"],
    tags: ["education", "tutoring", "learning", "academic"]
  }
];

export default function CreateAgent() {
  const [activeTab, setActiveTab] = useState("template");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [hasSelectedTemplate, setHasSelectedTemplate] = useState(false);
  const [agentConfig, setAgentConfig] = useState<AgentConfig>({
    name: "",
    description: "",
    category: "",
    systemPrompt: "",
    language: "en",
    pricing: {
      model: "gpt-4",
      tier: "professional",
      pricePerMessage: 0.02,
      monthlyLimit: 10000
    },
    capabilities: {
      voice: false,
      calling: false,
      vision: false,
      fileUpload: false,
      apiAccess: false
    },
    integrations: [],
    analytics: {
      enabled: true,
      metrics: ["conversation_length", "user_satisfaction", "response_time"]
    }
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = predefinedTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setAgentConfig({
        ...agentConfig,
        name: template.name,
        description: template.description,
        category: template.category,
        systemPrompt: template.systemPrompt,
        capabilities: template.capabilities
      });
    }
  };

  const handleStartFromScratch = () => {
    setSelectedTemplate(null);
    setAgentConfig({
      name: "",
      description: "",
      category: "",
      systemPrompt: "",
      language: "en",
      pricing: {
        model: "gpt-4",
        tier: "professional",
        pricePerMessage: 0.02,
        monthlyLimit: 10000
      },
      capabilities: {
        voice: false,
        calling: false,
        vision: false,
        fileUpload: false,
        apiAccess: false
      },
      integrations: [],
      analytics: {
        enabled: true,
        metrics: ["conversation_length", "user_satisfaction", "response_time"]
      }
    });
  };

  const handleContinueToConfiguration = () => {
    setHasSelectedTemplate(true);
    setActiveTab("basic");
  };

  const handleCreateAgent = () => {
    setShowSummary(true);
  };

  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      en: "English",
      es: "Spanish", 
      fr: "French",
      de: "German"
    };
    return languages[code] || code;
  };

  const getCapabilityIcon = (capability: string) => {
    switch (capability) {
      case "voice": return Volume2;
      case "calling": return Phone;
      case "vision": return Eye;
      case "fileUpload": return Upload;
      case "apiAccess": return Link;
      default: return CheckCircle;
    }
  };

  const getCapabilityName = (capability: string) => {
    switch (capability) {
      case "voice": return "Voice (TTS/STT)";
      case "calling": return "Phone Calling";
      case "vision": return "Vision Analysis";
      case "fileUpload": return "File Upload";
      case "apiAccess": return "API Access";
      default: return capability;
    }
  };

  // Show template selection screen if no template has been selected yet
  if (!hasSelectedTemplate) {
  return (
      <div className="min-h-screen bg-background p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Create AI Agent</h1>
              <p className="text-muted-foreground mt-2">
                Choose a template to get started or build from scratch
              </p>
            </div>
            </div>
          </div>

        {/* Template Selection */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Choose Your Agent Template</h2>
            <p className="text-muted-foreground">
              Start with a pre-configured template or build from scratch
            </p>
                </div>

          {/* Predefined Templates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predefinedTemplates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedTemplate === template.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                      <template.icon className="w-6 h-6 text-primary" />
                </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{template.name}</h3>
                        {selectedTemplate === template.id && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
              </div>
                      <p className="text-muted-foreground text-sm">{template.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {template.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">Features:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {template.features.slice(0, 3).map((feature) => (
                            <li key={feature} className="flex items-center">
                              <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                </div>
              </div>
                  </div>
                </CardContent>
            </Card>
            ))}
                </div>

          {/* Start from Scratch Option */}
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === null 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:border-primary/50'
            }`}
            onClick={handleStartFromScratch}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary-light rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Start from Scratch</h3>
                    {selectedTemplate === null && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
              </div>
                  <p className="text-muted-foreground text-sm">
                    Build a completely custom agent with your own configuration
                  </p>
                </div>
                </div>
            </CardContent>
            </Card>

          {/* Continue Button */}
          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleContinueToConfiguration}
              className="bg-primary hover:bg-primary-hover text-primary-foreground px-8"
              disabled={selectedTemplate === undefined}
            >
              Continue to Configuration
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Create AI Agent</h1>
            <p className="text-muted-foreground mt-2">
              Build and configure your custom AI agent with advanced capabilities
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              className="bg-primary hover:bg-primary-hover text-primary-foreground"
              onClick={handleCreateAgent}
              disabled={!agentConfig.name.trim()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Agent
            </Button>
              </div>
              </div>
            </div>

      {/* Summary Modal */}
      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-primary" />
              <span>Agent Configuration Summary</span>
            </DialogTitle>
            <DialogDescription>
              Review your AI agent configuration before creation
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Agent Name</Label>
                    <p className="text-foreground font-medium">{agentConfig.name || "Not specified"}</p>
              </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                    <p className="text-foreground font-medium">{agentConfig.category || "Not specified"}</p>
                      </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Language</Label>
                    <p className="text-foreground font-medium">{getLanguageName(agentConfig.language)}</p>
                    </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Template Used</Label>
                    <p className="text-foreground font-medium">
                      {selectedTemplate ? predefinedTemplates.find(t => t.id === selectedTemplate)?.name : "Custom (from scratch)"}
                    </p>
                        </div>
                      </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                  <p className="text-foreground">{agentConfig.description || "No description provided"}</p>
                      </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">System Prompt</Label>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {agentConfig.systemPrompt || "No system prompt configured"}
                    </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

            {/* Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-secondary" />
                  <span>Capabilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(agentConfig.capabilities).map(([key, enabled]) => {
                    const Icon = getCapabilityIcon(key);
                    return (
                      <div key={key} className="flex items-center space-x-3 p-3 rounded-lg border">
                        <Icon className={`w-5 h-5 ${enabled ? 'text-green-500' : 'text-muted-foreground'}`} />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{getCapabilityName(key)}</p>
                          <p className="text-xs text-muted-foreground">
                            {enabled ? 'Enabled' : 'Disabled'}
                          </p>
              </div>
                        {enabled && <CheckCircle className="w-4 h-4 text-green-500" />}
            </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* MCP Integrations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Link className="w-5 h-5 text-accent" />
                  <span>MCP Integrations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {agentConfig.integrations.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <Link className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No MCP integrations configured</p>
                      </div>
                ) : (
                  <div className="space-y-3">
                    {agentConfig.integrations.map((integration, index) => (
                      <div key={integration.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{integration.name || `MCP Link ${index + 1}`}</h4>
                          <Badge variant="outline">{integration.type}</Badge>
                    </div>
                        {integration.url && (
                          <p className="text-sm text-muted-foreground mb-1">
                            <span className="font-medium">URL:</span> {integration.url}
                          </p>
                        )}
                        {integration.description && (
                          <p className="text-sm text-muted-foreground">
                            {integration.description}
                          </p>
                        )}
                      </div>
                ))}
              </div>
                )}
              </CardContent>
            </Card>

            {/* Model Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  <span>Model Configuration</span>
                  </CardTitle>
                </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Pricing Tier</Label>
                    <p className="text-foreground font-medium capitalize">{agentConfig.pricing.tier}</p>
                      </div>
                  <div className="p-3 border rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Price per Message</Label>
                    <p className="text-foreground font-medium">${agentConfig.pricing.pricePerMessage}</p>
                      </div>
                  <div className="p-3 border rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Monthly Limit</Label>
                    <p className="text-foreground font-medium">{agentConfig.pricing.monthlyLimit.toLocaleString()} messages</p>
                    </div>
                </div>
                </CardContent>
              </Card>

            {/* Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  <span>Analytics & Monitoring</span>
                  </CardTitle>
                </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics Enabled</p>
                    <p className="text-sm text-muted-foreground">
                      Track performance metrics and user interactions
                    </p>
                    </div>
                    <div className="flex items-center space-x-2">
                    {agentConfig.analytics.enabled ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">
                      {agentConfig.analytics.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                    </div>
                    </div>
                {agentConfig.analytics.enabled && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium text-muted-foreground">Metrics Tracked</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {agentConfig.analytics.metrics.map((metric) => (
                        <Badge key={metric} variant="secondary" className="text-xs">
                          {metric.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                </CardContent>
              </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowSummary(false)}>
                Back to Edit
              </Button>
              <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                <Bot className="w-4 h-4 mr-2" />
                Deploy Agent
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Horizontal Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-surface-100 p-1 h-auto border border-surface-200">
                <TabsTrigger 
                  value="basic" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
                >
            <Settings className="w-4 h-4 mr-2" />
                  Basic Setup
                </TabsTrigger>
                <TabsTrigger 
                  value="knowledge"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
                >
            <Upload className="w-4 h-4 mr-2" />
                  Knowledge Base
                </TabsTrigger>
                <TabsTrigger 
                  value="guardrails"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
                >
            <Shield className="w-4 h-4 mr-2" />
                  Guardrails
                </TabsTrigger>
                <TabsTrigger 
                  value="settings"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
                >
            <Settings className="w-4 h-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                        <Settings className="w-5 h-5 text-primary" />
                      </div>
                      <span>Agent Configuration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="agentName" className="text-sm font-medium">Agent Name</Label>
                        <Input 
                          id="agentName" 
                          placeholder="Customer Support Assistant"
                          value={agentConfig.name}
                          onChange={(e) => setAgentConfig({...agentConfig, name: e.target.value})}
                          className="transition-colors hover:border-input-hover focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language" className="text-sm font-medium">Language</Label>
                        <Select value={agentConfig.language} onValueChange={(value) => setAgentConfig({...agentConfig, language: value})}>
                          <SelectTrigger className="transition-colors hover:border-input-hover focus:border-primary">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="systemPrompt" className="text-sm font-medium">System Prompt</Label>
                      <Textarea 
                        id="systemPrompt"
                        placeholder="You are a polite customer support representative for an auto-repair company..."
                        className="min-h-[120px] transition-colors hover:border-input-hover focus:border-primary"
                        value={agentConfig.systemPrompt}
                        onChange={(e) => setAgentConfig({...agentConfig, systemPrompt: e.target.value})}
                      />
                      <p className="text-sm text-muted-foreground">
                        Define the agent's personality, tone, and task-specific guidance
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">MCP Model Configuration</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Cheap Model</Label>
                          <Select>
                            <SelectTrigger className="transition-colors hover:border-input-hover focus:border-primary">
                              <SelectValue placeholder="GPT-3.5 Turbo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                              <SelectItem value="claude-haiku">Claude Haiku</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Balanced Model</Label>
                          <Select>
                            <SelectTrigger className="transition-colors hover:border-input-hover focus:border-primary">
                              <SelectValue placeholder="GPT-4" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gpt-4">GPT-4</SelectItem>
                              <SelectItem value="claude-sonnet">Claude Sonnet</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Premium Model</Label>
                          <Select>
                            <SelectTrigger className="transition-colors hover:border-input-hover focus:border-primary">
                              <SelectValue placeholder="GPT-4 Turbo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                              <SelectItem value="claude-opus">Claude Opus</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="p-4 border border-border">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">Enable Voice</Label>
                            <p className="text-sm text-muted-foreground">Text-to-Speech and Speech-to-Text</p>
                          </div>
                          <Switch 
                            checked={agentConfig.capabilities.voice} 
                            onCheckedChange={(checked) => setAgentConfig({
                              ...agentConfig, 
                              capabilities: {...agentConfig.capabilities, voice: checked}
                            })} 
                          />
                        </div>
                      </Card>
                      <Card className="p-4 border border-border">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">Enable Calling</Label>
                            <p className="text-sm text-muted-foreground">Twilio or SIP integration</p>
                          </div>
                          <Switch 
                            checked={agentConfig.capabilities.calling} 
                            onCheckedChange={(checked) => setAgentConfig({
                              ...agentConfig, 
                              capabilities: {...agentConfig.capabilities, calling: checked}
                            })} 
                          />
                        </div>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">MCP Links</h3>
                        <Button 
                          onClick={() => {
                            const newLink = {
                              id: Date.now().toString(),
                              name: "",
                              url: "",
                              description: "",
                              type: "custom"
                            };
                            setAgentConfig({
                              ...agentConfig,
                              integrations: [...agentConfig.integrations, newLink]
                            });
                          }}
                          className="bg-primary hover:bg-primary-hover text-primary-foreground"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add MCP Link
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Connect your agent to external services and APIs through MCP links. These enable your agent to access real-time data, perform actions, and integrate with third-party systems.
                      </p>

                      {agentConfig.integrations.length === 0 ? (
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-surface-50 hover:bg-surface-100 transition-colors">
                          <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
                            <Link className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="font-medium text-foreground mb-1">No MCP Links Added</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Add MCP links to enable your agent to connect with external services and APIs
                          </p>
                          <Button 
                            onClick={() => {
                              const newLink = {
                                id: Date.now().toString(),
                                name: "",
                                url: "",
                                description: "",
                                type: "custom"
                              };
                              setAgentConfig({
                                ...agentConfig,
                                integrations: [...agentConfig.integrations, newLink]
                              });
                            }}
                            variant="outline" 
                            size="sm"
                            className="transition-all duration-fast hover:border-primary"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add First MCP Link
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {agentConfig.integrations.map((link, index) => (
                            <Card key={link.id} className="p-4 border border-border">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-foreground">MCP Link {index + 1}</h4>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setAgentConfig({
                                        ...agentConfig,
                                        integrations: agentConfig.integrations.filter((_, i) => i !== index)
                                      });
                                    }}
                                    className="text-muted-foreground hover:text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">Link Name</Label>
                                    <Input
                                      placeholder="e.g., Weather API, Database Connection"
                                      value={link.name}
                                      onChange={(e) => {
                                        const updatedLinks = [...agentConfig.integrations];
                                        updatedLinks[index].name = e.target.value;
                                        setAgentConfig({
                                          ...agentConfig,
                                          integrations: updatedLinks
                                        });
                                      }}
                                      className="transition-colors hover:border-input-hover focus:border-primary"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">Link Type</Label>
                                    <Select 
                                      value={link.type} 
                                      onValueChange={(value) => {
                                        const updatedLinks = [...agentConfig.integrations];
                                        updatedLinks[index].type = value;
                                        setAgentConfig({
                                          ...agentConfig,
                                          integrations: updatedLinks
                                        });
                                      }}
                                    >
                                      <SelectTrigger className="transition-colors hover:border-input-hover focus:border-primary">
                                        <SelectValue placeholder="Select type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="api">API Endpoint</SelectItem>
                                        <SelectItem value="database">Database</SelectItem>
                                        <SelectItem value="file-system">File System</SelectItem>
                                        <SelectItem value="calendar">Calendar</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="custom">Custom</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Connection URL</Label>
                                  <Input
                                    placeholder="e.g., https://api.example.com/v1, mcp://localhost:3000"
                                    value={link.url}
                                    onChange={(e) => {
                                      const updatedLinks = [...agentConfig.integrations];
                                      updatedLinks[index].url = e.target.value;
                                      setAgentConfig({
                                        ...agentConfig,
                                        integrations: updatedLinks
                                      });
                                    }}
                                    className="transition-colors hover:border-input-hover focus:border-primary"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Description</Label>
                                  <Textarea
                                    placeholder="Describe what this MCP link provides access to..."
                                    value={link.description}
                                    onChange={(e) => {
                                      const updatedLinks = [...agentConfig.integrations];
                                      updatedLinks[index].description = e.target.value;
                                      setAgentConfig({
                                        ...agentConfig,
                                        integrations: updatedLinks
                                      });
                                    }}
                                    className="min-h-[60px] transition-colors hover:border-input-hover focus:border-primary"
                                  />
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="knowledge" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                        <Upload className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <span>Knowledge Base (RAG)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-surface-50 hover:bg-surface-100 transition-colors">
                      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-secondary-foreground" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Upload Documents</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop files or click to browse (PDF, DOCX, TXT)
                      </p>
                      <Button variant="outline" className="transition-all duration-fast hover:border-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Select Files
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Chunk Size</Label>
                        <Select>
                          <SelectTrigger className="transition-colors hover:border-input-hover focus:border-primary">
                            <SelectValue placeholder="500 tokens" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="300">300 tokens</SelectItem>
                            <SelectItem value="500">500 tokens</SelectItem>
                            <SelectItem value="1000">1000 tokens</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Top-K Retrieval</Label>
                        <Select>
                          <SelectTrigger className="transition-colors hover:border-input-hover focus:border-primary">
                            <SelectValue placeholder="5" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Uploaded Documents</h3>
                      <Card className="card-interactive p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-destructive-light rounded-lg flex items-center justify-center">
                              <span className="text-sm font-medium text-destructive">PDF</span>
                            </div>
                            <div>
                              <p className="font-medium text-sm text-foreground">customer-support-guide.pdf</p>
                              <p className="text-xs text-muted-foreground">2.3 MB • Uploaded 2 hours ago</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            Remove
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="guardrails" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <span>Safety Guardrails</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Predefined Guardrails</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {[
                          { title: "Toxicity Filter", desc: "Prevent harmful or offensive content", checked: true },
                          { title: "Legal/Medical Advice", desc: "Block legal and medical guidance", checked: true },
                          { title: "Pricing Information", desc: "Restrict pricing discussions", checked: false },
                          { title: "Company Compliance", desc: "Ensure brand tone compliance", checked: true }
                        ].map((guardrail, index) => (
                          <Card key={index} className="card-interactive p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="font-medium text-sm text-foreground">{guardrail.title}</p>
                                <p className="text-xs text-muted-foreground">{guardrail.desc}</p>
                              </div>
                              <Switch defaultChecked={guardrail.checked} />
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Custom Guardrails</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Blocked Phrases</Label>
                          <Textarea 
                            placeholder="Enter phrases to block, one per line..." 
                            className="min-h-[80px] transition-colors hover:border-input-hover focus:border-primary" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Escalation Triggers</Label>
                          <Textarea 
                            placeholder="Keywords that trigger human handoff (e.g., 'engine malfunction', 'lawsuit')..." 
                            className="min-h-[80px] transition-colors hover:border-input-hover focus:border-primary" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Custom Fallback Response</Label>
                          <Textarea 
                            placeholder="I'm sorry, I can't help with that request. Let me connect you with a specialist..." 
                            className="min-h-[80px] transition-colors hover:border-input-hover focus:border-primary" 
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                        <Settings className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <span>Advanced Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Response Time Limit</Label>
                        <Select>
                          <SelectTrigger className="transition-colors hover:border-input-hover focus:border-primary">
                            <SelectValue placeholder="30 seconds" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                            <SelectItem value="60">60 seconds</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Max Conversation Length</Label>
                        <Select>
                          <SelectTrigger className="transition-colors hover:border-input-hover focus:border-primary">
                            <SelectValue placeholder="50 messages" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25">25 messages</SelectItem>
                            <SelectItem value="50">50 messages</SelectItem>
                            <SelectItem value="100">100 messages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Card className="p-4 border border-border">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Enable Analytics</Label>
                          <p className="text-sm text-muted-foreground">Track performance metrics and user interactions</p>
                        </div>
                        <Switch 
                          checked={agentConfig.analytics.enabled}
                          onCheckedChange={(checked) => setAgentConfig({
                            ...agentConfig,
                            analytics: {...agentConfig.analytics, enabled: checked}
                          })}
                        />
                      </div>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
    </div>
  );
}