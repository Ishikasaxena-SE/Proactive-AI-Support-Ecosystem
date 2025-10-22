import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Phone, Heart, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import iconCaller from "@/assets/icon-caller.png";

const AICaller = () => {
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
            <img src={iconCaller} alt="AI Caller" className="h-24 w-24 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              AI Caller System
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Empathetic voice AI that handles complex queries with human-like understanding
            </p>
            <div className="inline-block px-6 py-3 bg-accent/20 rounded-full">
              <p className="text-accent font-semibold">🚀 Coming Soon</p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-gradient-card">
              <Heart className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Empathetic AI</h3>
              <p className="text-muted-foreground text-sm">
                Natural voice interactions with emotional intelligence for sensitive situations
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <Phone className="h-10 w-10 text-secondary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Transfer</h3>
              <p className="text-muted-foreground text-sm">
                Seamlessly escalates to human agents only when truly necessary
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <TrendingUp className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Cost Efficiency</h3>
              <p className="text-muted-foreground text-sm">
                Handle 10x more calls while maintaining quality and empathy
              </p>
            </Card>
          </div>

          {/* Planned Features */}
          <Card className="p-8 mb-12 bg-gradient-card">
            <h2 className="text-2xl font-bold mb-6">Planned Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Voice AI Capabilities
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm ml-7">
                    <li>• Natural speech recognition & synthesis</li>
                    <li>• Multi-language support</li>
                    <li>• Accent understanding</li>
                    <li>• Emotion detection</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-secondary" />
                    Emotional Intelligence
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm ml-7">
                    <li>• Frustrated customer detection</li>
                    <li>• Empathetic response generation</li>
                    <li>• De-escalation strategies</li>
                    <li>• Sentiment analysis</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-accent" />
                    Smart Routing
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm ml-7">
                    <li>• Context preservation on transfer</li>
                    <li>• Priority-based agent matching</li>
                    <li>• Skill-based routing</li>
                    <li>• Wait time optimization</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Analytics & Insights
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm ml-7">
                    <li>• Call resolution tracking</li>
                    <li>• Customer satisfaction scoring</li>
                    <li>• Performance metrics</li>
                    <li>• Training recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Use Cases */}
          <Card className="p-8 mb-12 bg-gradient-card">
            <h2 className="text-2xl font-bold mb-6">Ideal Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Billing Disputes", desc: "Handle payment concerns with empathy and accuracy" },
                { title: "Service Outages", desc: "Manage frustrated customers during network issues" },
                { title: "Technical Support", desc: "Guide customers through complex troubleshooting steps" },
                { title: "Account Changes", desc: "Process plan upgrades, downgrades, and cancellations" },
                { title: "Complaint Resolution", desc: "De-escalate situations before escalation is needed" },
                { title: "After-Hours Support", desc: "Provide 24/7 coverage without human agents" }
              ].map((useCase, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold">{useCase.title}</p>
                    <p className="text-muted-foreground text-sm">{useCase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA Section */}
          <Card className="p-12 text-center bg-gradient-card">
            <h2 className="text-3xl font-bold mb-4">Interested in Early Access?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              The AI Caller System is under active development. Join our waitlist to be among the first to experience voice AI that truly understands your customers.
            </p>
            <Button size="lg" disabled>
              Join Waitlist (Coming Soon)
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AICaller;
