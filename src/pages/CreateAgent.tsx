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
  MessageCircle, ShoppingBag, GraduationCap, X, Send, Mic,
  Camera, Paperclip, Smile, MoreVertical, Edit
} from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";

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
  const [showPreview, setShowPreview] = useState(false);
  const [hasSelectedTemplate, setHasSelectedTemplate] = useState(false);
  const [previewMessage, setPreviewMessage] = useState("");
  const [previewMessages, setPreviewMessages] = useState<Array<{type: 'user' | 'agent', content: string, timestamp: Date}>>([
    {
      type: 'agent',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
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

  // Add mockTools state for demonstration
  const [mockTools, setMockTools] = useState([
    {
      name: "Weather API",
      url: "https://api.weather.com/mcp",
      description: "Provides real-time weather data for any location.",
      isActive: true,
    },
    {
      name: "Database Connector",
      url: "https://db.example.com/mcp",
      description: "Allows access to company database records.",
      isActive: false,
    },
    {
      name: "Email Sender",
      url: "https://mail.example.com/mcp",
      description: "Send automated emails to users.",
      isActive: true,
    },
  ]);

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

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleSendPreviewMessage = () => {
    if (!previewMessage.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user' as const,
      content: previewMessage,
      timestamp: new Date()
    };
    setPreviewMessages(prev => [...prev, userMessage]);
    setPreviewMessage("");

    // Simulate agent response
    setIsTyping(true);
    setTimeout(() => {
      const agentResponse = generateAgentResponse(previewMessage);
      const agentMessage = {
        type: 'agent' as const,
        content: agentResponse,
        timestamp: new Date()
      };
      setPreviewMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAgentResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Generate response based on agent configuration
    if (agentConfig.systemPrompt) {
      // Simple response generation based on system prompt
      if (agentConfig.systemPrompt.toLowerCase().includes('customer support')) {
        return "I understand you need help. As a customer support representative, I'm here to assist you. Could you please provide more details about your issue so I can better assist you?";
      } else if (agentConfig.systemPrompt.toLowerCase().includes('sales')) {
        return "Thank you for your interest! I'd be happy to help you with our products and services. What specific information are you looking for?";
      } else if (agentConfig.systemPrompt.toLowerCase().includes('react')) {
        return "I can help you with React development! I can assist with code reviews, debugging, best practices, and explaining concepts. What specific React question do you have?";
      } else if (agentConfig.systemPrompt.toLowerCase().includes('tutor')) {
        return "I'm here to help you learn! I can explain concepts, solve problems, and provide educational guidance. What topic would you like to explore?";
      }
    }

    // Default responses based on message content
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! I'm ${agentConfig.name || 'your AI assistant'}. How can I help you today?`;
    } else if (lowerMessage.includes('help')) {
      return "I'm here to help! Please let me know what you need assistance with.";
    } else if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I understand your message. How can I assist you further?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendPreviewMessage();
    }
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

  // Add form state for settings and voice tabs
  const settingsForm = useForm({
    defaultValues: {
      language: "English (US)",
      model: "GPT-4 Turbo",
      theme: "Light",
      enableImageUpload: false,
      maxResponseLength: "Medium (300 words)",
      temperature: 50,
      enableVoicePrompting: false,
      enableVoiceCalling: false,
      voiceModel: "Professional Female",
    },
  });

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
            <Button variant="outline" onClick={handlePreview}>
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

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Eye className="w-6 h-6 text-primary" />
              <span>Agent Preview</span>
            </DialogTitle>
            <DialogDescription>
              Preview how your AI agent will appear and interact with users
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col h-[600px]">
            {/* Agent Header */}
            <div className="flex items-center space-x-3 p-4 border-b bg-muted/50">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {agentConfig.name || "AI Assistant"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {agentConfig.description || "AI-powered assistant"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {agentConfig.capabilities.voice && (
                  <Badge variant="secondary" className="text-xs">
                    <Mic className="w-3 h-3 mr-1" />
                    Voice
                  </Badge>
                )}
                {agentConfig.capabilities.vision && (
                  <Badge variant="secondary" className="text-xs">
                    <Camera className="w-3 h-3 mr-1" />
                    Vision
                  </Badge>
                )}
                {agentConfig.capabilities.fileUpload && (
                  <Badge variant="secondary" className="text-xs">
                    <Paperclip className="w-3 h-3 mr-1" />
                    Files
                  </Badge>
                )}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {previewMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t p-4 bg-background">
              <div className="flex items-end space-x-2">
                <div className="flex-1 relative">
                  <Textarea
                    value={previewMessage}
                    onChange={(e) => setPreviewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="min-h-[40px] max-h-[120px] resize-none pr-10"
                    rows={1}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                    {agentConfig.capabilities.fileUpload && (
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Paperclip className="w-3 h-3" />
                      </Button>
                    )}
                    {agentConfig.capabilities.vision && (
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Camera className="w-3 h-3" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Smile className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={handleSendPreviewMessage}
                  disabled={!previewMessage.trim() || isTyping}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Agent Info */}
              <div className="mt-3 pt-3 border-t">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span>Language: {getLanguageName(agentConfig.language)}</span>
                    <span>Model: {agentConfig.pricing.model}</span>
                    {agentConfig.capabilities.voice && <span>Voice enabled</span>}
                  </div>
                  <span>Preview Mode</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Horizontal Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6 bg-surface-100 p-1 h-auto border border-surface-200">
                <TabsTrigger 
                  value="basic" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
                >
            <Settings className="w-4 h-4 mr-2" />
                  Basic Setup
                </TabsTrigger>
                <TabsTrigger 
                  value="tools"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
                >
            <Link className="w-4 h-4 mr-2" />
                  MCP Tools
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
                <TabsTrigger 
                  value="voice"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
                >
            <Mic className="w-4 h-4 mr-2" />
                  Voice Features
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
                      {/* Language selection moved to Language tab */}
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
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Replace MCP Links tab with MCP Tools tab */}
              <TabsContent value="tools">
                <Card>
                  <CardHeader>
                    <CardTitle>Model Context Protocol (MCP) Tools</CardTitle>
                    <p className="text-slate-600">
                      Configure external tools and APIs that your chatbot can
                      access to provide enhanced functionality.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Add Tool Section */}
                    <div className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-slate-900">
                          Add New Tool
                        </h4>
                        <Button size="sm">
                          <Plus className="mr-1" size={14} />
                          Add Tool
                          </Button>
                        </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Tool Name</Label>
                          <Input
                            placeholder="e.g., Weather API"
                            className="mt-1"
                          />
                                </div>
                        <div>
                          <Label>MCP URL</Label>
                                    <Input
                            placeholder="https://api.example.com/mcp"
                            className="mt-1"
                                    />
                                  </div>
                                  </div>
                      <div className="mt-4">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe what this tool does..."
                          className="mt-1 h-20"
                        />
                      </div>
                                </div>
                                
                    {/* Configured Tools */}
                    <div>
                      <h4 className="font-medium text-slate-900 mb-4">
                        Configured Tools
                      </h4>
                      <div className="space-y-3">
                        {mockTools.map((tool, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  tool.name.includes("Weather")
                                    ? "bg-emerald-50"
                                    : tool.name.includes("Database")
                                    ? "bg-blue-50"
                                    : "bg-amber-50"
                                }`}
                              >
                                {tool.name.includes("Weather") ? (
                                  <Cloud
                                    className={`text-emerald-500`}
                                    size={16}
                                  />
                                ) : tool.name.includes("Database") ? (
                                  <Database
                                    className={`text-blue-500`}
                                    size={16}
                                  />
                                ) : (
                                  <Mail
                                    className={`text-amber-500`}
                                    size={16}
                                  />
                                )}
                                </div>
                              <div>
                                <h5 className="font-medium text-slate-900">
                                  {tool.name}
                                </h5>
                                <p className="text-sm text-slate-500">
                                  {tool.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  tool.isActive ? "default" : "secondary"
                                }
                              >
                                {tool.isActive ? "Active" : "Inactive"}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <MoreVertical size={16} />
                              </Button>
                            </div>
                          </div>
                          ))}
                        </div>
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

              <TabsContent value="settings">
                <Form {...settingsForm}>
                  <form>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <Card>
                  <CardHeader>
                          <CardTitle>General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                          <FormField
                            control={settingsForm.control}
                            name="language"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Language</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                          </SelectTrigger>
                                  </FormControl>
                          <SelectContent>
                                    <SelectItem value="English (US)">English (US)</SelectItem>
                                    <SelectItem value="English (UK)">English (UK)</SelectItem>
                                    <SelectItem value="Spanish">Spanish</SelectItem>
                                    <SelectItem value="French">French</SelectItem>
                                    <SelectItem value="German">German</SelectItem>
                                    <SelectItem value="Chinese (Simplified)">Chinese (Simplified)</SelectItem>
                          </SelectContent>
                        </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={settingsForm.control}
                            name="model"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>LLM Model</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="GPT-4 Turbo">GPT-4 Turbo</SelectItem>
                                    <SelectItem value="GPT-4">GPT-4</SelectItem>
                                    <SelectItem value="GPT-3.5 Turbo">GPT-3.5 Turbo</SelectItem>
                                    <SelectItem value="Claude 3 Opus">Claude 3 Opus</SelectItem>
                                    <SelectItem value="Claude 3 Sonnet">Claude 3 Sonnet</SelectItem>
                                    <SelectItem value="Gemini Pro">Gemini Pro</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={settingsForm.control}
                            name="theme"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Theme</FormLabel>
                                <div className="grid grid-cols-3 gap-3 mt-2">
                                  {["Light", "Dark", "Auto"].map((theme) => (
                                    <button
                                      key={theme}
                                      type="button"
                                      onClick={() => field.onChange(theme)}
                                      className={`p-3 border-2 rounded-lg text-center transition-colors ${field.value === theme ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400"}`}
                                    >
                                      <div className={`w-full h-8 rounded mb-2 ${theme === "Light" ? "bg-white" : theme === "Dark" ? "bg-slate-800" : "bg-gradient-to-r from-white to-slate-800"}`}></div>
                                      <span className={`text-xs font-medium ${field.value === theme ? "text-blue-700" : "text-slate-700"}`}>{theme}</span>
                                    </button>
                                  ))}
                      </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={settingsForm.control}
                            name="enableImageUpload"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Enable image upload support</FormLabel>
                                  <p className="text-xs text-slate-500">Allow users to upload and analyze images</p>
                                </div>
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Advanced Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <Label>Response Timeout (seconds)</Label>
                            <Input type="number" defaultValue={30} min={5} max={300} className="mt-1" />
                          </div>
                          <FormField
                            control={settingsForm.control}
                            name="maxResponseLength"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Max Response Length</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                          </SelectTrigger>
                                  </FormControl>
                          <SelectContent>
                                    <SelectItem value="Short (100 words)">Short (100 words)</SelectItem>
                                    <SelectItem value="Medium (300 words)">Medium (300 words)</SelectItem>
                                    <SelectItem value="Long (500 words)">Long (500 words)</SelectItem>
                                    <SelectItem value="Very Long (1000 words)">Very Long (1000 words)</SelectItem>
                          </SelectContent>
                        </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={settingsForm.control}
                            name="temperature"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Temperature (Creativity)</FormLabel>
                                <div className="flex items-center space-x-3 mt-2">
                                  <span className="text-sm text-slate-500">Focused</span>
                                  <Input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={field.value}
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    className="flex-1"
                                  />
                                  <span className="text-sm text-slate-500">Creative</span>
                      </div>
                                <p className="text-xs text-slate-500 mt-1">Current: {(field.value / 100).toFixed(1)}</p>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="conversation-memory" />
                              <Label htmlFor="conversation-memory">Enable conversation memory</Label>
                    </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="log-conversations" defaultChecked />
                              <Label htmlFor="log-conversations">Log conversations for analytics</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="fallback-human" />
                              <Label htmlFor="fallback-human">Enable fallback to human agent</Label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="voice">
                <Form {...settingsForm}>
                  <form>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <Card>
                        <CardHeader>
                          <CardTitle>Voice Input Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <FormField
                            control={settingsForm.control}
                            name="enableVoicePrompting"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Enable voice prompting</FormLabel>
                                  <p className="text-sm text-slate-500">Allow users to speak their queries instead of typing</p>
                        </div>
                              </FormItem>
                            )}
                          />
                          <div>
                            <Label>Speech Recognition Language</Label>
                            <Select defaultValue="English (US)">
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="English (US)">English (US)</SelectItem>
                                <SelectItem value="English (UK)">English (UK)</SelectItem>
                                <SelectItem value="Spanish">Spanish</SelectItem>
                                <SelectItem value="French">French</SelectItem>
                                <SelectItem value="German">German</SelectItem>
                                <SelectItem value="Chinese (Mandarin)">Chinese (Mandarin)</SelectItem>
                              </SelectContent>
                            </Select>
                      </div>
                          <div>
                            <Label>Voice Activation</Label>
                            <div className="space-y-2 mt-2">
                              <div className="flex items-center space-x-2">
                                <input type="radio" name="activation" defaultChecked className="text-blue-500" />
                                <Label>Push to talk</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="radio" name="activation" className="text-blue-500" />
                                <Label>Voice activation (wake word)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input type="radio" name="activation" className="text-blue-500" />
                                <Label>Continuous listening</Label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label>Wake Word (if enabled)</Label>
                            <Input placeholder="Hey Assistant" disabled className="mt-1" />
                          </div>
                        </CardContent>
                    </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Voice Calling & Response</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <FormField
                            control={settingsForm.control}
                            name="enableVoiceCalling"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Enable voice calling</FormLabel>
                                  <p className="text-sm text-slate-500">Allow users to call and interact with the chatbot via phone</p>
                                </div>
                              </FormItem>
                            )}
                          />
                          <div>
                            <Label>Voice Response Type</Label>
                            <Select defaultValue="Text-to-Speech (Synthetic)">
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Text-to-Speech (Synthetic)">Text-to-Speech (Synthetic)</SelectItem>
                                <SelectItem value="Pre-recorded Audio">Pre-recorded Audio</SelectItem>
                                <SelectItem value="Hybrid (TTS + Recorded)">Hybrid (TTS + Recorded)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <FormField
                            control={settingsForm.control}
                            name="voiceModel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Voice Model</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Professional Female">Professional Female</SelectItem>
                                    <SelectItem value="Professional Male">Professional Male</SelectItem>
                                    <SelectItem value="Friendly Female">Friendly Female</SelectItem>
                                    <SelectItem value="Friendly Male">Friendly Male</SelectItem>
                                    <SelectItem value="Custom Voice (Upload)">Custom Voice (Upload)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div>
                            <Label>Call Routing</Label>
                            <div className="space-y-3 mt-2">
                              <div className="border border-slate-200 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-slate-900">Technical Support</span>
                                  <Button variant="ghost" size="sm">
                                    <Edit size={14} />
                                  </Button>
                                </div>
                                <p className="text-sm text-slate-500">Route to +1-800-SUPPORT</p>
                                <p className="text-xs text-slate-400">Keywords: "technical", "broken", "not working"</p>
                              </div>
                              <div className="border border-slate-200 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-slate-900">Sales Inquiries</span>
                                  <Button variant="ghost" size="sm">
                                    <Edit size={14} />
                                  </Button>
                                </div>
                                <p className="text-sm text-slate-500">Route to +1-800-SALES</p>
                                <p className="text-xs text-slate-400">Keywords: "buy", "purchase", "pricing"</p>
                              </div>
                              <button className="w-full border-2 border-dashed border-slate-300 rounded-lg p-3 text-slate-500 hover:border-slate-400 hover:text-slate-600">
                                <Plus className="mr-2 inline" size={16} />
                                Add New Route
                              </button>
                            </div>
                          </div>
                  </CardContent>
                </Card>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
    </div>
  );
}