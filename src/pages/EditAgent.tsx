import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Upload, Shield, Settings, ArrowLeft, Save, Trash2, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock agent data - in a real app, this would come from an API
const mockAgentData = {
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
  language: "en",
  systemPrompt: "You are a polite customer support representative for an auto-repair company. You help customers with scheduling appointments, answering questions about services, and providing general automotive advice. Always be professional, empathetic, and accurate in your responses.",
  cheapModel: "gpt-3.5",
  balancedModel: "gpt-4",
  premiumModel: "gpt-4-turbo",
  enableVoice: true,
  enableCalling: false,
  chunkSize: "500",
  topKRetrieval: "5",
  responseTimeLimit: "30",
  maxConversationLength: "50",
  enableAnalytics: true,
  guardrails: {
    toxicityFilter: true,
    legalMedicalAdvice: true,
    pricingInformation: false,
    companyCompliance: true
  },
  blockedPhrases: "refund\ncancel order\ncomplaint",
  escalationTriggers: "engine malfunction\nlawsuit\naccident",
  customFallbackResponse: "I'm sorry, I can't help with that request. Let me connect you with a specialist who can better assist you.",
  documents: [
    {
      id: 1,
      name: "customer-support-guide.pdf",
      size: "2.3 MB",
      uploadedAt: "2 hours ago",
      type: "PDF"
    }
  ],
  mcpLinks: [
    {
      id: "1",
      name: "Weather API",
      url: "https://api.weatherapi.com/v1",
      description: "Provides real-time weather data for customer location queries",
      type: "api"
    },
    {
      id: "2", 
      name: "Customer Database",
      url: "mcp://localhost:5432/customers",
      description: "Access to customer records and order history",
      type: "database"
    }
  ]
};

export default function EditAgent() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Form state
  const [agentName, setAgentName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [language, setLanguage] = useState("en");
  const [cheapModel, setCheapModel] = useState("gpt-3.5");
  const [balancedModel, setBalancedModel] = useState("gpt-4");
  const [premiumModel, setPremiumModel] = useState("gpt-4-turbo");
  const [enableVoice, setEnableVoice] = useState(false);
  const [enableCalling, setEnableCalling] = useState(false);
  const [chunkSize, setChunkSize] = useState("500");
  const [topKRetrieval, setTopKRetrieval] = useState("5");
  const [responseTimeLimit, setResponseTimeLimit] = useState("30");
  const [maxConversationLength, setMaxConversationLength] = useState("50");
  const [enableAnalytics, setEnableAnalytics] = useState(true);
  const [blockedPhrases, setBlockedPhrases] = useState("");
  const [escalationTriggers, setEscalationTriggers] = useState("");
  const [customFallbackResponse, setCustomFallbackResponse] = useState("");
  const [guardrails, setGuardrails] = useState({
    toxicityFilter: true,
    legalMedicalAdvice: true,
    pricingInformation: false,
    companyCompliance: true
  });
  const [mcpLinks, setMcpLinks] = useState<Array<{
    id: string;
    name: string;
    url: string;
    description: string;
    type: string;
  }>>([]);

  // Load agent data on component mount
  useEffect(() => {
    // In a real app, you would fetch the agent data from an API
    // For now, we'll use the mock data
    const agent = mockAgentData;
    
    setAgentName(agent.name);
    setSystemPrompt(agent.systemPrompt);
    setLanguage(agent.language);
    setCheapModel(agent.cheapModel);
    setBalancedModel(agent.balancedModel);
    setPremiumModel(agent.premiumModel);
    setEnableVoice(agent.enableVoice);
    setEnableCalling(agent.enableCalling);
    setChunkSize(agent.chunkSize);
    setTopKRetrieval(agent.topKRetrieval);
    setResponseTimeLimit(agent.responseTimeLimit);
    setMaxConversationLength(agent.maxConversationLength);
    setEnableAnalytics(agent.enableAnalytics);
    setBlockedPhrases(agent.blockedPhrases);
    setEscalationTriggers(agent.escalationTriggers);
    setCustomFallbackResponse(agent.customFallbackResponse);
    setGuardrails(agent.guardrails);
    setMcpLinks(agent.mcpLinks);
  }, [id]);

  const handleSave = () => {
    // In a real app, you would save the changes to an API
    console.log("Saving agent changes...");
    // Navigate back to agents list
    navigate("/all-agents");
  };

  const handleDelete = () => {
    // In a real app, you would show a confirmation dialog and then delete
    console.log("Deleting agent...");
    navigate("/all-agents");
  };

  const updateGuardrail = (key: string, value: boolean) => {
    setGuardrails(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/all-agents")}
                className="transition-all duration-fast"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Agents
              </Button>
              <div>
                <h1 className="text-3xl font-semibold text-foreground tracking-tight">Edit Agent</h1>
                <p className="text-muted-foreground mt-2">Modify configuration and settings for your agent</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={handleDelete}
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-fast"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Agent
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-primary hover:bg-primary-hover text-primary-foreground transition-all duration-fast"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          {/* Agent Info */}
          <div className="flex items-center space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                Agent ID: {id}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                Last modified: {new Date().toLocaleDateString()}
              </span>
            </div>
            <Badge className="bg-primary-light text-primary">
              {mockAgentData.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-surface-100 p-1 h-auto border border-surface-200">
          <TabsTrigger 
            value="basic" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
          >
            Basic Setup
          </TabsTrigger>
          <TabsTrigger 
            value="knowledge"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
          >
            Knowledge Base
          </TabsTrigger>
          <TabsTrigger 
            value="guardrails"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
          >
            Guardrails
          </TabsTrigger>
          <TabsTrigger 
            value="settings"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200"
          >
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
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="transition-colors hover:border-input-hover focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-sm font-medium">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
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
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
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
                    <Select value={cheapModel} onValueChange={setCheapModel}>
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
                    <Select value={balancedModel} onValueChange={setBalancedModel}>
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
                    <Select value={premiumModel} onValueChange={setPremiumModel}>
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
                    <Switch checked={enableVoice} onCheckedChange={setEnableVoice} />
                  </div>
                </Card>
                <Card className="p-4 border border-border">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Enable Calling</Label>
                      <p className="text-sm text-muted-foreground">Twilio or SIP integration</p>
                    </div>
                    <Switch checked={enableCalling} onCheckedChange={setEnableCalling} />
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
                      setMcpLinks([...mcpLinks, newLink]);
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

                {mcpLinks.length === 0 ? (
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
                        setMcpLinks([...mcpLinks, newLink]);
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
                    {mcpLinks.map((link, index) => (
                      <Card key={link.id} className="p-4 border border-border">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-foreground">MCP Link {index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setMcpLinks(mcpLinks.filter((_, i) => i !== index));
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
                                  const updatedLinks = [...mcpLinks];
                                  updatedLinks[index].name = e.target.value;
                                  setMcpLinks(updatedLinks);
                                }}
                                className="transition-colors hover:border-input-hover focus:border-primary"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Link Type</Label>
                              <Select 
                                value={link.type} 
                                onValueChange={(value) => {
                                  const updatedLinks = [...mcpLinks];
                                  updatedLinks[index].type = value;
                                  setMcpLinks(updatedLinks);
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
                                const updatedLinks = [...mcpLinks];
                                updatedLinks[index].url = e.target.value;
                                setMcpLinks(updatedLinks);
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
                                const updatedLinks = [...mcpLinks];
                                updatedLinks[index].description = e.target.value;
                                setMcpLinks(updatedLinks);
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
                  <Select value={chunkSize} onValueChange={setChunkSize}>
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
                  <Select value={topKRetrieval} onValueChange={setTopKRetrieval}>
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
                {mockAgentData.documents.map((doc) => (
                  <Card key={doc.id} className="card-interactive p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-destructive-light rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium text-destructive">{doc.type}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.size} • Uploaded {doc.uploadedAt}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        Remove
                      </Button>
                    </div>
                  </Card>
                ))}
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
                  <Card className="card-interactive p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm text-foreground">Toxicity Filter</p>
                        <p className="text-xs text-muted-foreground">Prevent harmful or offensive content</p>
                      </div>
                      <Switch 
                        checked={guardrails.toxicityFilter} 
                        onCheckedChange={(value) => updateGuardrail('toxicityFilter', value)} 
                      />
                    </div>
                  </Card>
                  <Card className="card-interactive p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm text-foreground">Legal/Medical Advice</p>
                        <p className="text-xs text-muted-foreground">Block legal and medical guidance</p>
                      </div>
                      <Switch 
                        checked={guardrails.legalMedicalAdvice} 
                        onCheckedChange={(value) => updateGuardrail('legalMedicalAdvice', value)} 
                      />
                    </div>
                  </Card>
                  <Card className="card-interactive p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm text-foreground">Pricing Information</p>
                        <p className="text-xs text-muted-foreground">Restrict pricing discussions</p>
                      </div>
                      <Switch 
                        checked={guardrails.pricingInformation} 
                        onCheckedChange={(value) => updateGuardrail('pricingInformation', value)} 
                      />
                    </div>
                  </Card>
                  <Card className="card-interactive p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm text-foreground">Company Compliance</p>
                        <p className="text-xs text-muted-foreground">Ensure brand tone compliance</p>
                      </div>
                      <Switch 
                        checked={guardrails.companyCompliance} 
                        onCheckedChange={(value) => updateGuardrail('companyCompliance', value)} 
                      />
                    </div>
                  </Card>
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
                      value={blockedPhrases}
                      onChange={(e) => setBlockedPhrases(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Escalation Triggers</Label>
                    <Textarea 
                      placeholder="Keywords that trigger human handoff (e.g., 'engine malfunction', 'lawsuit')..." 
                      className="min-h-[80px] transition-colors hover:border-input-hover focus:border-primary"
                      value={escalationTriggers}
                      onChange={(e) => setEscalationTriggers(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Custom Fallback Response</Label>
                    <Textarea 
                      placeholder="I'm sorry, I can't help with that request. Let me connect you with a specialist..." 
                      className="min-h-[80px] transition-colors hover:border-input-hover focus:border-primary"
                      value={customFallbackResponse}
                      onChange={(e) => setCustomFallbackResponse(e.target.value)}
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
                  <Select value={responseTimeLimit} onValueChange={setResponseTimeLimit}>
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
                  <Select value={maxConversationLength} onValueChange={setMaxConversationLength}>
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
                  <Switch checked={enableAnalytics} onCheckedChange={setEnableAnalytics} />
                </div>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
} 