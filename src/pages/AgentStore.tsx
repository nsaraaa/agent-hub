import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Bot, Star, Users, Zap, MessageCircle, Cloud, Database, Palette, Shield, Globe, BookOpen } from "lucide-react";

const yourAgents = [
  { id: 1, name: "Support Pro", icon: Bot },
  { id: 2, name: "Sales Guru", icon: Star },
  { id: 3, name: "Team Helper", icon: Users },
  { id: 4, name: "Insight Bot", icon: Zap },
  { id: 5, name: "Chat Buddy", icon: MessageCircle },
  { id: 6, name: "Weather AI", icon: Cloud },
  { id: 7, name: "DB Connect", icon: Database },
  { id: 8, name: "Design Genie", icon: Palette },
  { id: 9, name: "Security Bot", icon: Shield },
  { id: 10, name: "Global Guide", icon: Globe },
];

const builtByCompany = [
  {
    id: 1,
    title: "Knowledge Master",
    description: "Advanced RAG-powered knowledge assistant for enterprise docs.",
    gradient: "from-pink-100 via-pink-50 to-blue-100",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Compliance Copilot",
    description: "Automates compliance checks and reporting.",
    gradient: "from-green-100 via-green-50 to-blue-100",
    icon: Shield,
  },
  {
    id: 3,
    title: "Creative Studio",
    description: "AI-powered design and brainstorming assistant.",
    gradient: "from-yellow-100 via-pink-50 to-purple-100",
    icon: Palette,
  },
  {
    id: 4,
    title: "Global Translator",
    description: "Real-time translation for global teams.",
    gradient: "from-blue-100 via-cyan-50 to-green-100",
    icon: Globe,
  },
];

export default function AgentStore() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Page Title & Subtitle */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Agent Store</h1>
          <p className="text-lg text-slate-500 font-medium">Discover, deploy, and manage AI agents for your enterprise</p>
        </div>
        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <Input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search agents"
            className="w-full max-w-xl rounded-full px-6 py-3 text-base bg-slate-50 border border-slate-200 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        {/* Your Agents Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Your Agents</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {yourAgents.slice(0, 10).map(agent => (
              <div key={agent.id} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-2 shadow-sm">
                  <agent.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-sm font-medium text-slate-700 text-center truncate w-20">{agent.name}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Link to="/my-agents" className="text-primary text-sm font-medium hover:underline">See more</Link>
          </div>
        </section>
        {/* Built by [Your Company Name] Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Built by Acme Corp</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {builtByCompany.map(tile => (
              <div
                key={tile.id}
                className={`rounded-2xl p-6 shadow-md flex items-start space-x-4 bg-gradient-to-br ${tile.gradient}`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/60 shadow">
                  <tile.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 text-slate-900">{tile.title}</h3>
                  <p className="text-sm text-slate-600 mb-0.5">{tile.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 