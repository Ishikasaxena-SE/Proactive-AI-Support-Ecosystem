import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Ticket, Zap, BarChart, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import iconTicketing from "@/assets/icon-ticketing.png";

const SmartTicketing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-main">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <img src={iconTicketing} alt="Smart Ticketing" className="h-24 w-24 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Smart Ticketing System
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered ticket creation, categorization, and management for streamlined support operations
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-gradient-card">
              <Zap className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Auto-Categorization</h3>
              <p className="text-muted-foreground text-sm">
                AI instantly categorizes and prioritizes tickets based on content analysis
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <Ticket className="h-10 w-10 text-secondary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Updates</h3>
              <p className="text-muted-foreground text-sm">
                Automatic status tracking and update history for full transparency
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <BarChart className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Analytics Ready</h3>
              <p className="text-muted-foreground text-sm">
                Built-in insights for ticket trends, resolution times, and team performance
              </p>
            </Card>
          </div>

          {/* Key Features */}
          <Card className="p-8 mb-12 bg-gradient-card">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">AI-Powered Categorization</p>
                    <p className="text-muted-foreground text-sm">Gemini 2.5 Flash analyzes tickets for accurate category & priority assignment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Multi-Category Support</p>
                    <p className="text-muted-foreground text-sm">Billing, Technical, Network, Account, Service, and Other categories</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Priority Intelligence</p>
                    <p className="text-muted-foreground text-sm">Low, Medium, High, and Critical priority auto-detection</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Status Workflow</p>
                    <p className="text-muted-foreground text-sm">Open → In Progress → Resolved → Closed lifecycle management</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Update Tracking</p>
                    <p className="text-muted-foreground text-sm">Full audit trail with comments, status changes, and timestamps</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">AI Summaries</p>
                    <p className="text-muted-foreground text-sm">Automatic generation of concise ticket summaries for quick triage</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Workflow Visualization */}
          <Card className="p-8 mb-12 bg-gradient-card">
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: "1", title: "Submit", desc: "Customer submits issue via form or chat" },
                { step: "2", title: "Analyze", desc: "AI categorizes & prioritizes instantly" },
                { step: "3", title: "Route", desc: "Ticket assigned to right team/agent" },
                { step: "4", title: "Resolve", desc: "Track progress until successful closure" }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Stats Preview */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "95%", label: "Accuracy Rate", desc: "AI categorization precision" },
              { value: "3s", label: "Avg Process Time", desc: "From submission to routing" },
              { value: "60%", label: "Faster Resolution", desc: "With AI-powered triage" },
              { value: "24/7", label: "Availability", desc: "Always-on automation" }
            ].map((stat, i) => (
              <Card key={i} className="p-6 text-center bg-gradient-card">
                <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="font-semibold mb-1">{stat.label}</p>
                <p className="text-muted-foreground text-xs">{stat.desc}</p>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <Card className="p-12 text-center bg-gradient-card">
            <h2 className="text-3xl font-bold mb-4">Try the Live Demo</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore the full ticket management dashboard with sample data or create your own ticket to see AI categorization in action.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={() => navigate("/tickets")}>
                View Ticket Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/create-ticket")}>
                Create New Ticket
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmartTicketing;
