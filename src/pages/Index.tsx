import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Bell, MessageSquare, Phone, Ticket, CheckCircle2, Users, TrendingDown, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-ai-telecom.jpg";
import iconNotification from "@/assets/icon-notification.png";
import iconChatbot from "@/assets/icon-chatbot.png";
import iconCaller from "@/assets/icon-caller.png";
import iconTicketing from "@/assets/icon-ticketing.png";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";
import { NotificationPanel } from "@/components/NotificationPanel";
import { ChatBot } from "@/components/ChatBot";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <NotificationPanel />
      <ChatBot />
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-strong backdrop-blur-xl border-b border-white/10 z-50 neon-border">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-white animate-pulse-slow" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold gradient-text">TelecomAI</h1>
              <p className="text-xs text-foreground/50 hidden sm:block">Proactive AI Support</p>
            </div>
          </div>
          <div className="hidden md:flex gap-6 lg:gap-8">
            <a href="#solution" className="text-foreground/80 hover:text-primary transition-all hover:scale-105 transform duration-300 font-medium">Solution</a>
            <a href="#impact" className="text-foreground/80 hover:text-primary transition-all hover:scale-105 transform duration-300 font-medium">Impact</a>
            <a href="#demo" className="text-foreground/80 hover:text-primary transition-all hover:scale-105 transform duration-300 font-medium">Demo</a>
          </div>
          <Button className="bg-gradient-primary hover-glow interactive-scale neon-border group text-sm sm:text-base px-3 sm:px-4">
            <span className="relative z-10 hidden sm:inline">Contact Us</span>
            <span className="relative z-10 sm:hidden">Contact</span>
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform relative z-10" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden tech-grid">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float-slower" style={{ animationDelay: "2s" }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <div className="inline-block shimmer">
                <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/30 text-xs sm:text-sm font-medium">
                  ✨ Next-Gen Customer Support
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Revolutionizing Telecom Support with{" "}
                <span className="gradient-text animate-glow-pulse drop-shadow-glow">
                  Proactive AI
                </span>
              </h1>
              <p className="text-base sm:text-xl text-foreground/70 leading-relaxed">
                Transform customer support with an intelligent, proactive ecosystem that predicts and solves issues before they impact your customers.
              </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <Button size="lg" className="bg-gradient-primary hover-glow interactive-scale group neon-border relative overflow-hidden shadow-glow" onClick={() => navigate('/demo')}>
                <span className="relative z-10 font-semibold">Try Interactive Demo</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform relative z-10" />
              </Button>
              <Button size="lg" className="bg-gradient-secondary hover-glow interactive-scale group shimmer shadow-glow-secondary" onClick={() => navigate('/sms-summarizer')}>
                <MessageSquare className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                SMS Summarizer
              </Button>
              <Button size="lg" variant="outline" className="glass border-white/30 hover:bg-white/10 interactive-scale gradient-border" onClick={() => navigate('/tickets')}>
                <Ticket className="mr-2 h-4 w-4" />
                View Tickets
              </Button>
            </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-primary opacity-30 blur-3xl rounded-full animate-pulse"></div>
              <div className="relative neon-border rounded-3xl overflow-hidden">
                <img
                  src={heroImage}
                  alt="AI-powered telecom support"
                  className="relative rounded-3xl shadow-2xl border border-white/10 hover-glow transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 rounded-full glass border border-accent/30 text-sm font-medium text-accent">
                The Problem
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">The Telecom Support Challenge</h2>
            <p className="text-base sm:text-xl text-foreground/70 max-w-3xl mx-auto px-4 leading-relaxed">
              Traditional customer support struggles with reactive approaches, leading to frustrated customers and overwhelmed teams.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TrendingDown, title: "High Response Times", desc: "Customers wait hours for simple billing queries", color: "text-accent" },
              { icon: Users, title: "Overwhelming Volume", desc: "Support teams drowning in repetitive tickets", color: "text-secondary" },
              { icon: Zap, title: "Reactive Approach", desc: "Issues discovered only after customer complaints", color: "text-primary" }
            ].map((problem, i) => (
              <Card key={i} className="glass-strong p-8 hover-glow interactive-scale animate-slide-up border-white/10" style={{ animationDelay: `${i * 0.1}s` }}>
                <problem.icon className={`h-14 w-14 ${problem.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
                <p className="text-foreground/60">{problem.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section id="solution" className="py-12 sm:py-20 px-4 sm:px-6 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium shimmer">
                Our Solution
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text drop-shadow-glow">4-Part AI Ecosystem</span>
            </h2>
            <p className="text-base sm:text-xl text-foreground/70 max-w-3xl mx-auto px-4 leading-relaxed">
              A comprehensive solution that combines proactive intelligence with human empathy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: iconNotification,
                title: "Proactive Notification Sender",
                desc: "Predicts and alerts customers before issues arise with AI-powered summaries for clarity",
                gradient: "from-primary to-primary/80",
                cta: "Learn More",
                action: "notifications"
              },
              {
                icon: iconChatbot,
                title: "AI Chatbot Assistant",
                desc: "Answers queries on billing, plans, and technical issues using contextual understanding",
                gradient: "from-secondary to-secondary/80",
                cta: "Learn More",
                action: "chatbot"
              },
              {
                icon: iconCaller,
                title: "AI Caller System",
                desc: "Handles complex or emotional queries empathetically, transferring only when needed",
                gradient: "from-accent to-accent/80",
                cta: "Learn More",
                action: "ai-caller"
              },
              {
                icon: iconTicketing,
                title: "Smart Ticketing System",
                desc: "Automatically creates, categorizes, and updates support tickets for unresolved cases",
                gradient: "from-primary to-accent",
                cta: "Learn More",
                action: "smart-ticketing"
              }
            ].map((feature, i) => (
              <Card
                key={i}
                className="glass-strong p-6 hover-glow interactive-scale group animate-slide-up border-white/10 relative overflow-hidden shimmer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500 relative">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-primary opacity-50 blur-2xl group-hover:opacity-100 transition-opacity"></div>
                    <img src={feature.icon} alt={feature.title} className="h-20 w-20 mx-auto drop-shadow-glow relative z-10" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-foreground/60 text-center text-sm mb-4 flex-grow">{feature.desc}</p>
                <Button
                  className="w-full mt-auto bg-gradient-primary hover-glow group/btn neon-border"
                  onClick={() => navigate(`/${feature.action}`)}
                >
                  {feature.cta}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Human Collaboration */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Perfect <span className="bg-gradient-hero bg-clip-text text-transparent">AI-Human</span> Balance
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground">
                Our intelligent system resolves 80% of queries autonomously while seamlessly escalating complex cases to human experts.
              </p>
              <div className="space-y-4">
                {[
                  "AI handles routine queries instantly 24/7",
                  "Emotional intelligence detects when human touch is needed",
                  "Smooth handoff with full context to human agents",
                  "Continuous learning from human interactions"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-accent opacity-20 blur-3xl"></div>
              <img
                src={dashboardMockup}
                alt="Smart ticketing dashboard"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="inline-block px-4 py-2 rounded-full glass border border-secondary/30 text-sm font-medium text-secondary">
                Results That Matter
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text drop-shadow-glow">Measurable Impact</h2>
            <p className="text-base sm:text-xl text-foreground/70 px-4 leading-relaxed max-w-2xl mx-auto">
              Transform your support operations with quantifiable results that drive business growth
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { metric: "40%", label: "Cost Reduction", desc: "Lower operational expenses", gradient: "from-accent to-accent/50" },
              { metric: "3x", label: "Faster Resolution", desc: "Average response time", gradient: "from-primary to-primary/50" },
              { metric: "95%", label: "Customer Satisfaction", desc: "Improved trust scores", gradient: "from-secondary to-secondary/50" }
            ].map((stat, i) => (
              <Card
                key={i}
                className="glass-strong p-10 text-center hover-glow interactive-scale animate-slide-up border-white/10 group relative overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                <div className="text-6xl md:text-7xl font-bold gradient-text mb-3 animate-glow-pulse">
                  {stat.metric}
                </div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-foreground/60">{stat.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section id="demo" className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-fade-in-up px-4">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-glow">
              See It in Action
            </h2>
            <p className="text-base sm:text-xl text-white/90">
              Experience how our AI ecosystem can transform your telecom support operations. Try our live interactive demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover-glow interactive-scale" onClick={() => navigate('/demo')}>
                Try Interactive Demo
              </Button>
              <Button size="lg" className="glass border-white/30 text-white hover:bg-white/20 interactive-scale" onClick={() => navigate('/tickets')}>
                View Tickets Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to Automate Your Support?</h2>
            <p className="text-base sm:text-xl text-muted-foreground px-4">
              Join leading telecom companies in revolutionizing customer support with AI
            </p>
            <Card className="p-8 bg-gradient-card">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-left space-y-4">
                  <h3 className="text-2xl font-semibold">Partner with Us</h3>
                  <p className="text-muted-foreground">
                    Transform your customer support with cutting-edge AI technology. Our team will guide you through every step of the implementation.
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Seamless integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Dedicated support team</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Scalable solution</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline">
                    Contact Sales
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Or email us at <a href="mailto:hello@proactiveai.com" className="text-primary hover:underline">hello@proactiveai.com</a>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border py-8 sm:py-12 px-4 sm:px-6 glass-strong">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="col-span-full sm:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="text-xl sm:text-2xl font-bold gradient-text">
                  TelecomAI
                </div>
              </div>
              <p className="text-sm sm:text-base text-foreground/70 mb-4 max-w-md">
                Revolutionizing telecom customer support with intelligent, proactive AI solutions that predict and solve issues before they impact your customers.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 text-sm sm:text-base text-foreground/60">
                <li><a href="#solution" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Solution</a></li>
                <li><a href="#impact" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Impact</a></li>
                <li><a href="#demo" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Demo</a></li>
                <li><a href="/demo" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Try Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 text-sm sm:text-base text-foreground/60">
                <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm sm:text-base text-foreground/60">
                © 2025 <span className="gradient-text font-semibold">Ishika Saxena</span>. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-foreground/60">
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
