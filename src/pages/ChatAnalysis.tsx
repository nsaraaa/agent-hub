import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  MessageCircle, 
  Users, 
  AlertTriangle,
  ThumbsUp,
  Phone,
  FileText
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const chatVolumeData = [
  { time: '9AM', chats: 45 },
  { time: '10AM', chats: 78 },
  { time: '11AM', chats: 92 },
  { time: '12PM', chats: 67 },
  { time: '1PM', chats: 54 },
  { time: '2PM', chats: 89 },
  { time: '3PM', chats: 112 },
  { time: '4PM', chats: 95 },
  { time: '5PM', chats: 73 },
];

const sentimentData = [
  { day: 'Mon', positive: 78, neutral: 15, negative: 7 },
  { day: 'Tue', positive: 82, neutral: 12, negative: 6 },
  { day: 'Wed', positive: 75, neutral: 18, negative: 7 },
  { day: 'Thu', positive: 80, neutral: 14, negative: 6 },
  { day: 'Fri', positive: 85, neutral: 11, negative: 4 },
];

const issueData = [
  { category: 'Engine Issues', count: 45, color: 'hsl(var(--primary))' },
  { category: 'Electrical', count: 32, color: 'hsl(var(--surface-500))' },
  { category: 'Transmission', count: 28, color: 'hsl(var(--surface-400))' },
  { category: 'Brakes', count: 22, color: 'hsl(var(--secondary-foreground))' },
  { category: 'Other', count: 18, color: 'hsl(var(--surface-600))' },
];

const carModelData = [
  { model: 'Model S', issues: 23, bookings: 8 },
  { model: 'Model 3', issues: 45, bookings: 15 },
  { model: 'Model X', issues: 18, bookings: 6 },
  { model: 'Model Y', issues: 32, bookings: 12 },
];

export default function ChatAnalysis() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground tracking-tight">Chat Analysis</h1>
              <p className="text-muted-foreground mt-2">Comprehensive insights into agent performance and user interactions</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                2,847 total conversations
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                4.7 average satisfaction
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select defaultValue="7days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-agents">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-agents">All Agents</SelectItem>
              <SelectItem value="customer-support">Customer Support</SelectItem>
              <SelectItem value="sales-assistant">Sales Assistant</SelectItem>
              <SelectItem value="technical-support">Technical Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Chats</p>
                <p className="text-2xl font-bold">2,847</p>
                <p className="text-sm text-primary">+12% from last week</p>
              </div>
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">1.4s</p>
                <p className="text-sm text-primary">-0.2s improvement</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CSAT Score</p>
                <p className="text-2xl font-bold">4.7</p>
                <p className="text-sm text-primary">+0.1 from last week</p>
              </div>
              <ThumbsUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Escalations</p>
                <p className="text-2xl font-bold">47</p>
                <p className="text-sm text-red-600">+3 from last week</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="automotive">Automotive Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Chat Volume</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chatVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="chats" 
                                      stroke="hsl(var(--primary))"
                fill="hsl(var(--primary-light))" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Sentiment Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sentimentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--surface-200))" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="positive" stackId="a" fill="hsl(var(--primary))" />
                    <Bar dataKey="neutral" stackId="a" fill="hsl(var(--surface-400))" />
                    <Bar dataKey="negative" stackId="a" fill="hsl(var(--surface-600))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Communication Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-semibold text-lg">2,145</p>
                  <p className="text-sm text-muted-foreground">Text Chats</p>
                  <p className="text-sm text-primary">75%</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <p className="font-semibold text-lg">567</p>
                  <p className="text-sm text-muted-foreground">Voice Calls</p>
                  <p className="text-sm text-secondary-foreground">20%</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <p className="font-semibold text-lg">135</p>
                  <p className="text-sm text-muted-foreground">File Uploads</p>
                  <p className="text-sm text-secondary-foreground">5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">&lt; 1 second</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-surface-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-3/4"></div>
                      </div>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">1-2 seconds</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-surface-200 rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full w-1/5"></div>
                      </div>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">&gt; 2 seconds</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-surface-200 rounded-full h-2">
                        <div className="bg-surface-400 h-2 rounded-full w-1/20"></div>
                      </div>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-surface-100 rounded-lg">
                    <p className="text-2xl font-bold text-primary">92%</p>
                    <p className="text-sm text-muted-foreground">First Contact Resolution</p>
                  </div>
                  <div className="text-center p-4 bg-surface-100 rounded-lg">
                    <p className="text-2xl font-bold text-primary">2.3</p>
                    <p className="text-sm text-muted-foreground">Avg Messages per Session</p>
                  </div>
                  <div className="text-center p-4 bg-surface-100 rounded-lg">
                    <p className="text-2xl font-bold text-secondary-foreground">4m 32s</p>
                    <p className="text-sm text-muted-foreground">Avg Session Duration</p>
                  </div>
                  <div className="text-center p-4 bg-surface-100 rounded-lg">
                    <p className="text-2xl font-bold text-secondary-foreground">8%</p>
                    <p className="text-sm text-muted-foreground">Escalation Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Issue Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={issueData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="hsl(var(--primary))"
                      dataKey="count"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {issueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Issues This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { issue: "Engine won't start", count: 23, trend: "+12%", severity: "high" },
                    { issue: "Strange noise from brakes", count: 18, trend: "+8%", severity: "medium" },
                    { issue: "Dashboard warning lights", count: 15, trend: "-3%", severity: "low" },
                    { issue: "Air conditioning not working", count: 12, trend: "+25%", severity: "medium" },
                    { issue: "Transmission slipping", count: 9, trend: "+5%", severity: "high" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface-50 rounded-lg border border-surface-200 hover:bg-surface-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          item.severity === 'high' ? 'bg-primary' : 
                          item.severity === 'medium' ? 'bg-secondary-foreground' : 
                          'bg-surface-400'
                        }`}></div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{item.issue}</p>
                          <p className="text-xs text-muted-foreground">{item.count} reports</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            item.trend.startsWith('+') 
                              ? 'border-primary/20 text-primary bg-primary/5' 
                              : 'border-secondary/20 text-secondary-foreground bg-secondary/5'
                          }`}
                        >
                          {item.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automotive" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Issues by Car Model</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={carModelData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--surface-200))" />
                    <XAxis dataKey="model" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Bar dataKey="issues" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chat to Booking Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {carModelData.map((model, index) => {
                    const conversionRate = ((model.bookings / model.issues) * 100).toFixed(1);
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-surface-100 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{model.model}</p>
                          <p className="text-xs text-muted-foreground">
                            {model.bookings} bookings from {model.issues} chats
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{conversionRate}%</p>
                          <p className="text-xs text-muted-foreground">conversion</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Service Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">High Priority</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Increase brake service capacity</li>
                    <li>• Update Model 3 maintenance guides</li>
                    <li>• Train staff on AC issues</li>
                  </ul>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Medium Priority</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Expand diagnostic tools</li>
                    <li>• Create engine troubleshooting flowchart</li>
                    <li>• Review warranty policies</li>
                  </ul>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Low Priority</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Update interior cleaning procedures</li>
                    <li>• Review tire rotation schedule</li>
                    <li>• Enhance customer follow-up</li>
                  </ul>
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