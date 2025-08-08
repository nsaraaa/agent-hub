import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building2, 
  Users, 
  CreditCard, 
  Shield, 
  Settings, 
  Plus, 
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  Clock,
  Star,
  Activity,
  BarChart3,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  Globe,
  MapPin
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member' | 'viewer';
  status: 'active' | 'invited' | 'suspended';
  lastActive: string;
  avatar: string;
}

interface BillingInfo {
  plan: string;
  status: 'active' | 'past_due' | 'cancelled';
  nextBilling: string;
  amount: number;
  usage: {
    agents: number;
    conversations: number;
    storage: number;
  };
}

interface ComplianceCert {
  id: string;
  name: string;
  status: 'active' | 'expired' | 'pending';
  expiryDate: string;
  issuer: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@acmecorp.com",
    role: 'admin',
    status: 'active',
    lastActive: "2 hours ago",
    avatar: "SC"
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike.johnson@acmecorp.com",
    role: 'manager',
    status: 'active',
    lastActive: "1 day ago",
    avatar: "MJ"
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    email: "alex.rodriguez@acmecorp.com",
    role: 'member',
    status: 'active',
    lastActive: "3 hours ago",
    avatar: "AR"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@acmecorp.com",
    role: 'viewer',
    status: 'invited',
    lastActive: "Never",
    avatar: "ED"
  }
];

const billingInfo: BillingInfo = {
  plan: "Enterprise",
  status: 'active',
  nextBilling: "2024-02-15",
  amount: 2499.00,
  usage: {
    agents: 24,
    conversations: 15847,
    storage: 85
  }
};

const complianceCerts: ComplianceCert[] = [
  {
    id: "1",
    name: "SOC 2 Type II",
    status: 'active',
    expiryDate: "2024-12-31",
    issuer: "Deloitte",
    description: "Security and availability controls certification"
  },
  {
    id: "2",
    name: "GDPR Compliance",
    status: 'active',
    expiryDate: "2025-06-30",
    issuer: "EU Data Protection",
    description: "General Data Protection Regulation compliance"
  },
  {
    id: "3",
    name: "ISO 27001",
    status: 'pending',
    expiryDate: "2024-08-15",
    issuer: "BSI Group",
    description: "Information security management certification"
  }
];

export default function OrganizationProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return "bg-red-100 text-red-800 border-red-200";
      case 'manager': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'member': return "bg-green-100 text-green-800 border-green-200";
      case 'viewer': return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return "bg-green-100 text-green-800 border-green-200";
      case 'invited': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'suspended': return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCertStatusColor = (status: string) => {
    switch (status) {
      case 'active': return "bg-green-100 text-green-800 border-green-200";
      case 'expired': return "bg-red-100 text-red-800 border-red-200";
      case 'pending': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Acme Corporation</h1>
                <p className="text-slate-600">Automotive Parts & Services</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Enterprise Plan
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    4 Team Members
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Organization
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-100 p-1 h-auto border border-slate-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              Team
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              Billing
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              Compliance
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Active Agents</p>
                      <p className="text-3xl font-bold text-slate-900">{billingInfo.usage.agents}</p>
                      <p className="text-sm text-green-600 mt-1">+3 this month</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Monthly Conversations</p>
                      <p className="text-3xl font-bold text-slate-900">{billingInfo.usage.conversations.toLocaleString()}</p>
                      <p className="text-sm text-blue-600 mt-1">+12% vs last month</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Monthly Cost</p>
                      <p className="text-3xl font-bold text-slate-900">${billingInfo.amount.toLocaleString()}</p>
                      <p className="text-sm text-green-600 mt-1">Enterprise Plan</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Organization Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <span className="text-sm">contact@acmecorp.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <span className="text-sm">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span className="text-sm">123 Business Ave, Tech City, TC 12345</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-slate-500" />
                      <span className="text-sm">www.acmecorp.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Compliance Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {complianceCerts.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                        <div>
                          <p className="text-sm font-medium">{cert.name}</p>
                          <p className="text-xs text-slate-500">{cert.issuer}</p>
                        </div>
                        <Badge className={`text-xs ${getCertStatusColor(cert.status)}`}>
                          {cert.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Team Members</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-slate-700">{member.avatar}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getRoleColor(member.role)}`}>
                          {member.role}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(member.status)}`}>
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{member.email}</p>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <span>Last active: {member.lastActive}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Plan</span>
                      <span className="text-sm">{billingInfo.plan}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status</span>
                      <Badge className={`text-xs ${getStatusColor(billingInfo.status)}`}>
                        {billingInfo.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Monthly Cost</span>
                      <span className="text-sm font-bold">${billingInfo.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Next Billing</span>
                      <span className="text-sm">{billingInfo.nextBilling}</span>
                    </div>
                    <Button className="w-full">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Manage Billing
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Usage This Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Agents</span>
                        <span className="text-sm">{billingInfo.usage.agents}/50</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${(billingInfo.usage.agents / 50) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Conversations</span>
                        <span className="text-sm">{billingInfo.usage.conversations.toLocaleString()}/25,000</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(billingInfo.usage.conversations / 25000) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Storage</span>
                        <span className="text-sm">{billingInfo.usage.storage}GB/100GB</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(billingInfo.usage.storage / 100) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceCerts.map((cert) => (
                <Card key={cert.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary" />
                      </div>
                      <Badge className={`text-xs ${getCertStatusColor(cert.status)}`}>
                        {cert.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{cert.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{cert.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Issuer</span>
                        <span className="font-medium">{cert.issuer}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Expires</span>
                        <span className="font-medium">{cert.expiryDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Organization Name</label>
                      <Input defaultValue="Acme Corporation" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Industry</label>
                      <Select defaultValue="automotive">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input defaultValue="Leading automotive parts and services provider" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Contact Email</label>
                      <Input defaultValue="contact@acmecorp.com" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input defaultValue="+1 (555) 123-4567" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Address</label>
                    <Input defaultValue="123 Business Ave, Tech City, TC 12345" className="mt-1" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
