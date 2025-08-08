import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  GitBranch, 
  History, 
  Users, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  User,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowLeft,
  ArrowRight,
  Code,
  FileText,
  Settings
} from "lucide-react";

interface Version {
  id: string;
  timestamp: string;
  author: string;
  message: string;
  branch: string;
  status: 'current' | 'previous' | 'draft';
  changes: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface Branch {
  name: string;
  isActive: boolean;
  lastCommit: string;
  author: string;
}

const mockVersions: Version[] = [
  {
    id: "v1.2.3",
    timestamp: "2024-01-15 14:30",
    author: "Sarah Chen",
    message: "Optimized customer service prompt for better empathy",
    branch: "main",
    status: 'current',
    changes: "+ Improved empathy in responses\n+ Added conflict resolution scenarios\n- Removed outdated product references",
    comments: [
      { id: "1", author: "Mike Johnson", content: "Great improvement on the empathy aspect!", timestamp: "2024-01-15 15:00" }
    ]
  },
  {
    id: "v1.2.2",
    timestamp: "2024-01-14 09:15",
    author: "Sarah Chen",
    message: "Added technical troubleshooting section",
    branch: "main",
    status: 'previous',
    changes: "+ Added technical troubleshooting\n+ Updated product knowledge base",
    comments: []
  },
  {
    id: "v1.2.1",
    timestamp: "2024-01-13 16:45",
    author: "Alex Rodriguez",
    message: "Initial prompt setup",
    branch: "main",
    status: 'previous',
    changes: "+ Initial customer service prompt\n+ Basic product knowledge",
    comments: []
  }
];

const mockBranches: Branch[] = [
  { name: "main", isActive: true, lastCommit: "v1.2.3", author: "Sarah Chen" },
  { name: "experimental", isActive: false, lastCommit: "v1.2.3-exp", author: "Mike Johnson" },
  { name: "feature/advanced-nlp", isActive: false, lastCommit: "v1.2.2-feat", author: "Alex Rodriguez" }
];

export default function PromptManagement() {
  const [selectedVersion, setSelectedVersion] = useState<Version>(mockVersions[0]);
  const [currentPrompt, setCurrentPrompt] = useState("You are a skilled customer service representative...");
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState("versions");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Prompt Management</h1>
              <p className="text-slate-600 mt-2">Git-like version control for your agent prompts and configurations</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <GitBranch className="w-4 h-4 mr-2" />
                New Branch
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Version
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Prompt Editor */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Current Prompt
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      <GitBranch className="w-3 h-3 mr-1" />
                      {mockBranches.find(b => b.isActive)?.name}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {selectedVersion.id}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={currentPrompt}
                  onChange={(e) => setCurrentPrompt(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                  placeholder="Enter your prompt here..."
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span>Last modified: {selectedVersion.timestamp}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <GitCommit className="w-4 h-4 mr-2" />
                      Commit Changes
                    </Button>
                    <Button size="sm">
                      <GitPullRequest className="w-4 h-4 mr-2" />
                      Create PR
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Version History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  Version History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockVersions.map((version, index) => (
                    <div
                      key={version.id}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedVersion.id === version.id
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      onClick={() => setSelectedVersion(version)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant={version.status === 'current' ? 'default' : 'secondary'}>
                            {version.status === 'current' ? 'Current' : 'Previous'}
                          </Badge>
                          <span className="font-mono text-sm font-medium">{version.id}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <GitMerge className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="font-medium text-slate-900 mb-1">{version.message}</p>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {version.author}
                          </span>
                          <span>{version.timestamp}</span>
                        </div>
                        <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                          {version.branch}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Branches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GitBranch className="w-5 h-5 mr-2" />
                  Branches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockBranches.map((branch) => (
                    <div
                      key={branch.name}
                      className={`p-3 rounded-lg border transition-all ${
                        branch.isActive
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{branch.name}</p>
                          <p className="text-xs text-slate-500">{branch.lastCommit}</p>
                        </div>
                        {branch.isActive && (
                          <Badge variant="default" className="text-xs">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Collaboration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">SC</span>
                      </div>
                      <span className="text-sm font-medium">Sarah Chen</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Admin</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">MJ</span>
                      </div>
                      <span className="text-sm font-medium">Mike Johnson</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Editor</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">AR</span>
                      </div>
                      <span className="text-sm font-medium">Alex Rodriguez</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Viewer</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedVersion.comments.map((comment) => (
                    <div key={comment.id} className="p-3 rounded-lg bg-slate-50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{comment.author}</span>
                        <span className="text-xs text-slate-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-slate-700">{comment.content}</p>
                    </div>
                  ))}
                  <div className="flex space-x-2">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1"
                    />
                    <Button size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
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
