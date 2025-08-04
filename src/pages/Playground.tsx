import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, MicOff, User, Bot, Settings, Zap, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: number;
  retrievedDocs?: string[];
}

export default function Playground() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your customer support assistant. How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("customer-support");
  const [isRecording, setIsRecording] = useState(false);
  const [showDebug, setShowDebug] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I understand you're having an issue with your vehicle. Let me check our knowledge base for the most relevant information to help you.",
        timestamp: new Date(),
        tokens: 45,
        retrievedDocs: ["vehicle-manual-section-3.pdf", "common-issues-guide.pdf"]
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground tracking-tight">Agent Playground</h1>
              <p className="text-muted-foreground mt-2">Test and validate agent behavior in real-time</p>
            </div>
            <div className="flex items-center space-x-3">
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer-support">Customer Support</SelectItem>
              <SelectItem value="sales-assistant">Sales Assistant</SelectItem>
              <SelectItem value="technical-support">Technical Support</SelectItem>
            </SelectContent>
          </Select>
          <Badge className="bg-primary-light text-primary border-primary/20">
            Online
          </Badge>
        </div>
      </div>

          {/* Stats */}
          <div className="flex items-center space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                Agent playground ready
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                Real-time testing environment
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        {/* Chat Interface */}
        <div className="lg:col-span-2 flex flex-col">
          <Card className="card-premium flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <span>Chat Interface</span>
              </CardTitle>
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
                          <p className={`text-xs mt-2 ${
                            message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
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
                      className="flex-1 transition-colors hover:border-input-hover focus:border-primary"
                    />
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => setIsRecording(!isRecording)}
                      className="transition-all duration-fast"
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputMessage.trim()}
                    className="transition-all duration-fast"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Debug Panel */}
        <div className="flex flex-col space-y-4">
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
                  className="transition-all duration-fast"
                >
                  {showDebug ? 'Hide' : 'Show'}
                </Button>
              </CardTitle>
            </CardHeader>
            {showDebug && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-foreground">Current Model</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">GPT-4</Badge>
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
                      <p className="font-medium text-foreground">247</p>
                    </div>
                    <div className="bg-surface-50 p-2 rounded-lg">
                      <p className="text-muted-foreground">Cost:</p>
                      <p className="font-medium text-foreground">$0.012</p>
                    </div>
                    <div className="bg-surface-50 p-2 rounded-lg">
                      <p className="text-muted-foreground">Latency:</p>
                      <p className="font-medium text-foreground">1.2s</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-foreground">Retrieved Documents</h4>
                  <div className="space-y-1">
                    {messages
                      .filter(m => m.retrievedDocs)
                      .slice(-1)[0]?.retrievedDocs?.map((doc, index) => (
                      <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-foreground">Quick Actions</h4>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm" className="transition-all duration-fast">
                      Switch Model
                    </Button>
                    <Button variant="outline" size="sm" className="transition-all duration-fast">
                      Clear Chat
                    </Button>
                    <Button variant="outline" size="sm" className="transition-all duration-fast">
                      Export Log
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

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
                  <span className="font-medium text-foreground">1.2s</span>
                </div>
                <div className="w-full bg-surface-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-3/4 transition-all duration-smooth"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quality Score</span>
                  <span className="font-medium text-foreground">92%</span>
                </div>
                <div className="w-full bg-surface-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[92%] transition-all duration-smooth"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Token Usage</span>
                  <span className="font-medium text-foreground">247/8192</span>
                </div>
                <div className="w-full bg-surface-200 rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full w-1/12 transition-all duration-smooth"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
}