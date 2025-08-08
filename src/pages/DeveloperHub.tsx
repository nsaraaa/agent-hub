import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Code, 
  Copy, 
  Download, 
  Play, 
  Settings, 
  Zap, 
  Globe,
  MessageCircle,
  Webhook,
  Terminal,
  FileText,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Activity,
  Bot,
  Database,
  Shield,
  Key,
  Link,
  Palette,
  Smartphone,
  Monitor
} from "lucide-react";

interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
  category: string;
}

interface WebhookEvent {
  id: string;
  name: string;
  description: string;
  payload: string;
  status: 'active' | 'inactive';
}

const codeSnippets: CodeSnippet[] = [
  {
    id: "1",
    title: "Python API Integration",
    language: "python",
    code: `import requests

def connect_agent(agent_id, api_key):
    base_url = "https://api.aistore.dev/v3"
    return requests.post(
        f"{base_url}/agents/{agent_id}/connect",
        headers={"Authorization": api_key}
    )

# Example usage
response = connect_agent("agent_123", "your_api_key")
print(response.json())`,
    description: "Basic Python integration for connecting to your agent",
    category: "API"
  },
  {
    id: "2",
    title: "JavaScript Chat Widget",
    language: "javascript",
    code: `// Embeddable chat widget
const chatWidget = {
  agentId: 'your_agent_id',
  apiKey: 'your_api_key',
  container: '#chat-container'
};

// Initialize widget
AIAgent.init(chatWidget);

// Handle messages
AIAgent.on('message', (response) => {
  console.log('Agent response:', response);
});`,
    description: "JavaScript widget for embedding chat interface",
    category: "Widget"
  },
  {
    id: "3",
    title: "React Component",
    language: "jsx",
    code: `import { useAIAgent } from '@aistore/react';

function ChatInterface({ agentId }) {
  const { sendMessage, messages, isLoading } = useAIAgent(agentId);

  return (
    <div className="chat-container">
      {messages.map(msg => (
        <div key={msg.id}>{msg.content}</div>
      ))}
      <button onClick={() => sendMessage("Hello!")}>
        Send Message
      </button>
    </div>
  );
}`,
    description: "React hook for integrating AI agents",
    category: "React"
  },
  {
    id: "4",
    title: "Webhook Handler",
    language: "javascript",
    code: `// Express.js webhook handler
app.post('/webhook/agent-response', (req, res) => {
  const { agent_id, message, user_id } = req.body;
  
  // Process the agent response
  console.log('Agent response:', message);
  
  // Send to your system
  sendToSlack(message);
  
  res.status(200).json({ received: true });
});`,
    description: "Handle webhook events from your agents",
    category: "Webhook"
  }
];

const webhookEvents: WebhookEvent[] = [
  {
    id: "1",
    name: "on_agent_response",
    description: "Triggered when an agent sends a response",
    payload: `{
  "agent_id": "agent_123",
  "message": "Hello! How can I help you?",
  "user_id": "user_456",
  "timestamp": "2024-01-15T10:30:00Z"
}`,
    status: 'active'
  },
  {
    id: "2",
    name: "on_conversation_start",
    description: "Triggered when a new conversation begins",
    payload: `{
  "agent_id": "agent_123",
  "user_id": "user_456",
  "session_id": "session_789",
  "timestamp": "2024-01-15T10:30:00Z"
}`,
    status: 'active'
  },
  {
    id: "3",
    name: "on_error",
    description: "Triggered when an error occurs",
    payload: `{
  "agent_id": "agent_123",
  "error": "Rate limit exceeded",
  "timestamp": "2024-01-15T10:30:00Z"
}`,
    status: 'inactive'
  }
];

export default function DeveloperHub() {
  const [activeTab, setActiveTab] = useState("quick-start");
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet>(codeSnippets[0]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Developer Hub</h1>
              <p className="text-slate-600 mt-2">Integrate AI agents into your applications with our comprehensive developer tools</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download SDK
              </Button>
              <Button size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Docs
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-100 p-1 h-auto border border-slate-200">
            <TabsTrigger value="quick-start" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              Quick Start
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              API Reference
            </TabsTrigger>
            <TabsTrigger value="widgets" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              Widgets
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              Webhooks
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              Tools
            </TabsTrigger>
          </TabsList>

          {/* Quick Start Tab */}
          <TabsContent value="quick-start" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Get Started in 5 Minutes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Get your API key</p>
                        <p className="text-sm text-slate-600">From your dashboard settings</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Choose your agent</p>
                        <p className="text-sm text-slate-600">Select from your created agents</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Copy the code snippet</p>
                        <p className="text-sm text-slate-600">Choose your preferred language</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">4</span>
                      </div>
                      <div>
                        <p className="font-medium">Test your integration</p>
                        <p className="text-sm text-slate-600">Use our playground to verify</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Popular Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Globe className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Web Widget</p>
                          <p className="text-sm text-slate-600">Embed chat interface</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">API Integration</p>
                          <p className="text-sm text-slate-600">Direct API calls</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Webhook className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Webhook Setup</p>
                          <p className="text-sm text-slate-600">Event-driven integration</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* API Reference Tab */}
          <TabsContent value="api" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Code className="w-5 h-5 mr-2" />
                        Code Snippets
                      </span>
                      <Select value={selectedSnippet.id} onValueChange={(value) => setSelectedSnippet(codeSnippets.find(s => s.id === value) || codeSnippets[0])}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {codeSnippets.map((snippet) => (
                            <SelectItem key={snippet.id} value={snippet.id}>
                              {snippet.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">{selectedSnippet.title}</h3>
                        <p className="text-sm text-slate-600 mb-4">{selectedSnippet.description}</p>
                      </div>
                      <div className="relative">
                        <div className="bg-slate-900 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-slate-400 text-sm">{selectedSnippet.language}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(selectedSnippet.code)}
                              className="text-slate-400 hover:text-white"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <pre className="text-slate-300 text-sm overflow-x-auto">
                            <code>{selectedSnippet.code}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Key className="w-5 h-5 mr-2" />
                      API Keys
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-slate-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Production Key</span>
                          <Badge variant="outline" className="text-xs">Active</Badge>
                        </div>
                        <code className="text-xs bg-white p-2 rounded border block">sk_live_1234567890abcdef...</code>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Test Key</span>
                          <Badge variant="outline" className="text-xs">Test</Badge>
                        </div>
                        <code className="text-xs bg-white p-2 rounded border block">sk_test_abcdef1234567890...</code>
                      </div>
                      <Button size="sm" className="w-full">
                        <Key className="w-4 h-4 mr-2" />
                        Generate New Key
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      API Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">API Response Time</span>
                        <span className="text-sm font-medium text-green-600">120ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Uptime</span>
                        <span className="text-sm font-medium text-green-600">99.9%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Rate Limit</span>
                        <span className="text-sm font-medium">1000 req/min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Widgets Tab */}
          <TabsContent value="widgets" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Chat Widget</h3>
                      <p className="text-sm text-slate-600">Embeddable chat interface</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Customizable</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Responsive</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Multi-language</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Copy className="w-4 h-4 mr-2" />
                    Get Code
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Mobile SDK</h3>
                      <p className="text-sm text-slate-600">iOS & Android integration</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Native UI</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Offline support</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Push notifications</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="w-4 h-4 mr-2" />
                    Download SDK
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Palette className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Custom UI</h3>
                      <p className="text-sm text-slate-600">Build your own interface</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>React components</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Vue components</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Angular components</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Code className="w-4 h-4 mr-2" />
                    View Components
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Webhook className="w-5 h-5 mr-2" />
                    Webhook Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {webhookEvents.map((event) => (
                      <div key={event.id} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{event.name}</h3>
                            <p className="text-sm text-slate-600">{event.description}</p>
                          </div>
                          <Badge className={`text-xs ${event.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {event.status}
                          </Badge>
                        </div>
                        <div className="bg-slate-900 rounded p-3 mb-3">
                          <pre className="text-slate-300 text-xs overflow-x-auto">
                            <code>{event.payload}</code>
                          </pre>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Payload
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Webhook Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Webhook URL</label>
                      <Input placeholder="https://your-domain.com/webhook" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Secret Key</label>
                      <Input placeholder="your-secret-key" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Events</label>
                      <div className="space-y-2 mt-2">
                        {webhookEvents.map((event) => (
                          <div key={event.id} className="flex items-center space-x-2">
                            <input type="checkbox" id={event.id} defaultChecked={event.status === 'active'} />
                            <label htmlFor={event.id} className="text-sm">{event.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full">
                      <Webhook className="w-4 h-4 mr-2" />
                      Save Configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Terminal className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">VS Code Extension</h3>
                      <p className="text-sm text-slate-600">In-IDE agent testing</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Code completion</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Agent testing</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Debug tools</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="w-4 h-4 mr-2" />
                    Install Extension
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">API Playground</h3>
                      <p className="text-sm text-slate-600">Test API endpoints</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Interactive docs</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Request builder</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Response viewer</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Playground
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">SDK Generator</h3>
                      <p className="text-sm text-slate-600">Generate client libraries</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Multiple languages</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Type definitions</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Examples included</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Code className="w-4 h-4 mr-2" />
                    Generate SDK
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
