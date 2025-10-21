import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Bell, MessageSquare, Phone, Ticket, CheckCircle2, Users, TrendingDown, Zap } from "lucide-react";
import heroImage from "@/assets/hero-ai-telecom.jpg";
import iconNotification from "@/assets/icon-notification.png";
import iconChatbot from "@/assets/icon-chatbot.png";
import iconCaller from "@/assets/icon-caller.png";
import iconTicketing from "@/assets/icon-ticketing.png";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Proactive AI Support
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#solution" className="text-muted-foreground hover:text-primary transition-colors">Solution</a>
            <a href="#impact" className="text-muted-foreground hover:text-primary transition-colors">Impact</a>
            <a href="#demo" className="text-muted-foreground hover:text-primary transition-colors">Demo</a>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Contact Us
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Revolutionizing Telecom Support with{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  AI
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Proactive, Intelligent, and Human-Centric customer support ecosystem that predicts issues before they arise.
              </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 group" onClick={() => window.location.href = '/tickets'}>
                Try Prototype
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => window.location.href = '/create-ticket'}>
                Create Ticket
              </Button>
            </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full"></div>
              <img
                src={heroImage}
                alt="AI-powered telecom support"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">The Telecom Support Challenge</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Traditional customer support struggles with reactive approaches, leading to frustrated customers and overwhelmed teams.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TrendingDown, title: "High Response Times", desc: "Customers wait hours for simple billing queries" },
              { icon: Users, title: "Overwhelming Volume", desc: "Support teams drowning in repetitive tickets" },
              { icon: Zap, title: "Reactive Approach", desc: "Issues discovered only after customer complaints" }
            ].map((problem, i) => (
              <Card key={i} className="p-6 bg-card hover:shadow-lg transition-all animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <problem.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section id="solution" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="bg-gradient-hero bg-clip-text text-transparent">4-Part AI Ecosystem</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive solution that combines proactive intelligence with human empathy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: iconNotification,
                title: "Proactive Notification Sender",
                desc: "Predicts and alerts customers before issues arise with AI-powered summaries for clarity",
                color: "text-primary"
              },
              {
                icon: iconChatbot,
                title: "AI Chatbot Assistant",
                desc: "Answers queries on billing, plans, and technical issues using contextual understanding",
                color: "text-secondary"
              },
              {
                icon: iconCaller,
                title: "AI Caller System",
                desc: "Handles complex or emotional queries empathetically, transferring only when needed",
                color: "text-accent"
              },
              {
                icon: iconTicketing,
                title: "Smart Ticketing System",
                desc: "Automatically creates, categorizes, and updates support tickets for unresolved cases",
                color: "text-primary"
              }
            ].map((feature, i) => (
              <Card
                key={i}
                className="p-6 bg-gradient-card hover:shadow-xl transition-all group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform">
                  <img src={feature.icon} alt={feature.title} className="h-20 w-20 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                <p className="text-muted-foreground text-center text-sm">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Human Collaboration */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-4xl font-bold">
                Perfect <span className="bg-gradient-hero bg-clip-text text-transparent">AI-Human</span> Balance
              </h2>
              <p className="text-xl text-muted-foreground">
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
      <section id="impact" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">Measurable Impact</h2>
            <p className="text-xl text-muted-foreground">
              Transform your support operations with quantifiable results
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { metric: "40%", label: "Cost Reduction", desc: "Lower operational expenses" },
              { metric: "3x", label: "Faster Resolution", desc: "Average response time" },
              { metric: "95%", label: "Customer Satisfaction", desc: "Improved trust scores" }
            ].map((stat, i) => (
              <Card
                key={i}
                className="p-8 text-center bg-gradient-card hover:shadow-xl transition-all animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
                  {stat.metric}
                </div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-muted-foreground">{stat.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section id="demo" className="py-20 px-6 bg-gradient-hero text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold">
              See It in Action
            </h2>
            <p className="text-xl opacity-90">
              Experience how our AI ecosystem can transform your telecom support operations. Try our live Smart Ticketing System demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" onClick={() => window.location.href = '/tickets'}>
                Try Live Demo
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => window.location.href = '/create-ticket'}>
                Create Sample Ticket
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <h2 className="text-4xl font-bold">Ready to Automate Your Support?</h2>
            <p className="text-xl text-muted-foreground">
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
      <footer className="border-t border-border py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
                Proactive AI Support Ecosystem
              </div>
              <p className="text-muted-foreground mb-4">
                Revolutionizing telecom customer support with intelligent, proactive AI solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#solution" className="hover:text-primary transition-colors">Solution</a></li>
                <li><a href="#impact" className="hover:text-primary transition-colors">Impact</a></li>
                <li><a href="#demo" className="hover:text-primary transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Proactive AI Support Ecosystem. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
