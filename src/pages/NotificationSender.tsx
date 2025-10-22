import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Bell, CheckCircle, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NotificationPanel } from "@/components/NotificationPanel";
import iconNotification from "@/assets/icon-notification.png";

const NotificationSender = () => {
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
            <img src={iconNotification} alt="Proactive Notifications" className="h-24 w-24 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Proactive Notification Sender
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay ahead of issues before they impact your customers with AI-powered predictive alerts
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-gradient-card">
              <Zap className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Predictive Intelligence</h3>
              <p className="text-muted-foreground text-sm">
                AI analyzes patterns to predict potential issues before they escalate
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <Bell className="h-10 w-10 text-secondary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Summaries</h3>
              <p className="text-muted-foreground text-sm">
                Auto-generated clear, actionable summaries for every notification
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <Shield className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Proactive Prevention</h3>
              <p className="text-muted-foreground text-sm">
                Reduce support tickets by alerting customers before problems occur
              </p>
            </Card>
          </div>

          {/* Key Features */}
          <Card className="p-8 mb-12 bg-gradient-card">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="space-y-4">
              {[
                "AI-powered ticket analysis to identify emerging patterns",
                "Automatic severity classification (Low, Medium, High, Critical)",
                "Multi-category support (Billing, Technical, Network, Account)",
                "Real-time notification delivery with read/unread tracking",
                "Contextual linking to related support tickets",
                "One-click notification generation for immediate testing"
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Live Demo Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Live Demo</h2>
            <p className="text-muted-foreground mb-8">
              Try the notification system below - click "Generate Notification" to see AI in action
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Notification Panel */}
      <NotificationPanel />
    </div>
  );
};

export default NotificationSender;
