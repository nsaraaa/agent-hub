import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Store, 
  Bot, 
  DollarSign, 
  FileText, 
  Send, 
  CheckCircle, 
  ArrowRight,
  ArrowDown,
  Settings,
  Tag,
  Globe,
  Users,
  Star,
  Eye,
  Edit,
  Plus,
  Clock,
  AlertCircle,
  Check,
  X,
  ExternalLink
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'draft' | 'published' | 'review';
  rating: number;
  conversations: number;
}

interface MarketplaceStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: 'completed' | 'current' | 'pending';
}

const userAgents: Agent[] = [
  {
    id: "1",
    name: "Customer Support Pro",
    description: "Advanced customer service with sentiment analysis",
    category: "Customer Service",
    status: 'published',
    rating: 4.9,
    conversations: 3247
  },
  {
    id: "2",
    name: "Sales Qualifier",
    description: "Lead qualification and product recommendations",
    category: "Sales",
    status: 'draft',
    rating: 4.6,
    conversations: 1892
  },
  {
    id: "3",
    name: "Tech Diagnostic",
    description: "Vehicle troubleshooting and repair guidance",
    category: "Technical Support",
    status: 'review',
    rating: 4.8,
    conversations: 2156
  }
];

const marketplaceSteps: MarketplaceStep[] = [
  {
    id: "1",
    title: "Select Agent",
    description: "Choose which agent to publish to the marketplace",
    icon: Bot,
    status: 'completed'
  },
  {
    id: "2",
    title: "Set Pricing",
    description: "Define pricing model and subscription tiers",
    icon: DollarSign,
    status: 'current'
  },
  {
    id: "3",
    title: "Add Metadata",
    description: "Add descriptions, tags, and documentation",
    icon: FileText,
    status: 'pending'
  },
  {
    id: "4",
    title: "Submit for Review",
    description: "Submit for quality and compliance review",
    icon: Send,
    status: 'pending'
  },
  {
    id: "5",
    title: "Live in Marketplace",
    description: "Agent goes live and available for purchase",
    icon: Store,
    status: 'pending'
  }
];

export default function Marketplace() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [pricing, setPricing] = useState({
    model: 'subscription',
    price: 29.99,
    currency: 'USD',
    billingCycle: 'monthly'
  });
  const [metadata, setMetadata] = useState({
    description: '',
    tags: '',
    documentation: '',
    category: '',
    features: ''
  });

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return "bg-green-100 text-green-800 border-green-200";
      case 'review': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'draft': return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Marketplace</h1>
              <p className="text-slate-600 mt-2">Publish your agents to the marketplace and start earning revenue</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Marketplace
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Publish New Agent
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Workflow Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Store className="w-5 h-5 mr-2" />
                  Publishing Workflow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketplaceSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          getStepStatus(index + 1) === 'completed' 
                            ? 'bg-green-100 text-green-600' 
                            : getStepStatus(index + 1) === 'current'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {getStepStatus(index + 1) === 'completed' ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <step.icon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">{step.title}</h3>
                          <p className="text-sm text-slate-600">{step.description}</p>
                        </div>
                        <Badge className={`text-xs ${
                          getStepStatus(index + 1) === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : getStepStatus(index + 1) === 'current'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {getStepStatus(index + 1) === 'completed' ? 'Completed' : 
                           getStepStatus(index + 1) === 'current' ? 'Current' : 'Pending'}
                        </Badge>
                      </div>
                      {index < marketplaceSteps.length - 1 && (
                        <div className="ml-6">
                          <ArrowDown className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step Content */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="w-5 h-5 mr-2" />
                    Select Agent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-slate-600">Choose which agent you want to publish to the marketplace:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userAgents.map((agent) => (
                        <div
                          key={agent.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedAgent?.id === agent.id
                              ? "border-primary bg-primary/5"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                          onClick={() => setSelectedAgent(agent)}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Bot className="w-5 h-5 text-primary" />
                            </div>
                            <Badge className={`text-xs ${getStatusColor(agent.status)}`}>
                              {agent.status}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-slate-900 mb-2">{agent.name}</h3>
                          <p className="text-sm text-slate-600 mb-3">{agent.description}</p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span>{agent.rating}</span>
                            </div>
                            <span className="text-slate-500">{agent.conversations.toLocaleString()} conversations</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedAgent && (
                      <div className="flex items-center space-x-3">
                        <Button onClick={() => setCurrentStep(2)}>
                          Continue to Pricing
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Agent
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Set Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Pricing Model</label>
                        <Select value={pricing.model} onValueChange={(value) => setPricing({...pricing, model: value})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="subscription">Subscription</SelectItem>
                            <SelectItem value="one-time">One-time Purchase</SelectItem>
                            <SelectItem value="usage">Usage-based</SelectItem>
                            <SelectItem value="free">Free</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Currency</label>
                        <Select value={pricing.currency} onValueChange={(value) => setPricing({...pricing, currency: value})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Price</label>
                        <Input
                          type="number"
                          value={pricing.price}
                          onChange={(e) => setPricing({...pricing, price: parseFloat(e.target.value)})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Billing Cycle</label>
                        <Select value={pricing.billingCycle} onValueChange={(value) => setPricing({...pricing, billingCycle: value})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button onClick={() => setCurrentStep(3)}>
                        Continue to Metadata
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>
                        Back
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Add Metadata
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={metadata.description}
                        onChange={(e) => setMetadata({...metadata, description: e.target.value})}
                        placeholder="Describe what your agent does and its key features..."
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <Select value={metadata.category} onValueChange={(value) => setMetadata({...metadata, category: value})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="customer-service">Customer Service</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="technical-support">Technical Support</SelectItem>
                            <SelectItem value="scheduling">Scheduling</SelectItem>
                            <SelectItem value="analytics">Analytics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Tags</label>
                        <Input
                          value={metadata.tags}
                          onChange={(e) => setMetadata({...metadata, tags: e.target.value})}
                          placeholder="ai, chatbot, support, automation"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Key Features</label>
                      <Textarea
                        value={metadata.features}
                        onChange={(e) => setMetadata({...metadata, features: e.target.value})}
                        placeholder="List the key features and capabilities of your agent..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Documentation</label>
                      <Textarea
                        value={metadata.documentation}
                        onChange={(e) => setMetadata({...metadata, documentation: e.target.value})}
                        placeholder="Add any additional documentation or setup instructions..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button onClick={() => setCurrentStep(4)}>
                        Continue to Review
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" onClick={() => setCurrentStep(2)}>
                        Back
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    Submit for Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-blue-900">Review Process</h3>
                      </div>
                      <p className="text-sm text-blue-700">
                        Your agent will be reviewed for quality, compliance, and marketplace standards. 
                        This typically takes 2-3 business days.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold">Review Checklist</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Agent functionality tested</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Pricing information complete</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Metadata and documentation provided</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Compliance requirements met</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button onClick={() => setCurrentStep(5)}>
                        Submit for Review
                        <Send className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" onClick={() => setCurrentStep(3)}>
                        Back
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Store className="w-5 h-5 mr-2" />
                    Live in Marketplace
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-green-900">Congratulations!</h3>
                      </div>
                      <p className="text-sm text-green-700">
                        Your agent has been successfully published to the marketplace and is now live!
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-lg bg-slate-50">
                        <h3 className="font-semibold mb-2">Next Steps</h3>
                        <ul className="space-y-2 text-sm">
                          <li>• Monitor performance and analytics</li>
                          <li>• Respond to customer inquiries</li>
                          <li>• Update agent based on feedback</li>
                          <li>• Promote your agent</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-slate-50">
                        <h3 className="font-semibold mb-2">Marketplace Stats</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Total Agents:</span>
                            <span className="font-medium">1,247</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Active Users:</span>
                            <span className="font-medium">45,892</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg. Rating:</span>
                            <span className="font-medium">4.6/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button>
                        View in Marketplace
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Listing
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Marketplace Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Your Published Agents</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Revenue</span>
                    <span className="font-semibold text-green-600">$2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Subscriptions</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Rating</span>
                    <span className="font-semibold">4.7/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Top Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Service</span>
                    <span className="text-sm font-medium">342 agents</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sales & Marketing</span>
                    <span className="text-sm font-medium">287 agents</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technical Support</span>
                    <span className="text-sm font-medium">198 agents</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Analytics</span>
                    <span className="text-sm font-medium">156 agents</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 rounded bg-slate-50">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New subscription</p>
                      <p className="text-xs text-slate-500">Customer Support Pro</p>
                    </div>
                    <span className="text-xs text-slate-500">2h ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded bg-slate-50">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">5-star review</p>
                      <p className="text-xs text-slate-500">Sales Qualifier</p>
                    </div>
                    <span className="text-xs text-slate-500">1d ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded bg-slate-50">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Agent updated</p>
                      <p className="text-xs text-slate-500">Tech Diagnostic</p>
                    </div>
                    <span className="text-xs text-slate-500">3d ago</span>
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
