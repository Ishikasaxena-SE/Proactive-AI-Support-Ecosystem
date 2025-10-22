import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Brain, Clock, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatBot } from "@/components/ChatBot";
import iconChatbot from "@/assets/icon-chatbot.png";

const ChatbotAssistant = () => {
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
            <img src={iconChatbot} alt="AI Chatbot" className="h-24 w-24 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              AI Chatbot Assistant
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Instant, intelligent support for billing, plans, and technical queries with deep contextual understanding
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-gradient-card">
              <Brain className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Contextual AI</h3>
              <p className="text-muted-foreground text-sm">
                Powered by Gemini 2.5 Flash for accurate, context-aware responses
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <Clock className="h-10 w-10 text-secondary mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Availability</h3>
              <p className="text-muted-foreground text-sm">
                Instant answers anytime, reducing wait times to zero
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <Target className="h-10 w-10 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Multi-Domain Expertise</h3>
              <p className="text-muted-foreground text-sm">
                Handles billing, technical support, and account queries seamlessly
              </p>
            </Card>
          </div>

          {/* Key Features */}
          <Card className="p-8 mb-12 bg-gradient-card">
            <h2 className="text-2xl font-bold mb-6">Key Capabilities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-primary">Customer Service</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Billing inquiries and payment issues</li>
                  <li>• Plan upgrades and downgrades</li>
                  <li>• Account management assistance</li>
                  <li>• Service availability checks</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-secondary">Technical Support</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Network troubleshooting guidance</li>
                  <li>• Device configuration help</li>
                  <li>• Connection issue diagnosis</li>
                  <li>• Feature usage instructions</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Technical Highlights */}
          <Card className="p-8 mb-12 bg-gradient-card">
            <h2 className="text-2xl font-bold mb-6">Technical Highlights</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="font-semibold">Streaming Responses</p>
                  <p className="text-muted-foreground text-sm">Real-time token-by-token response rendering for better UX</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                <div>
                  <p className="font-semibold">Conversation Memory</p>
                  <p className="text-muted-foreground text-sm">Full chat history stored for seamless multi-turn conversations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                <div>
                  <p className="font-semibold">Specialized Training</p>
                  <p className="text-muted-foreground text-sm">Fine-tuned system prompt for telecom customer service scenarios</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Live Demo Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Live Demo</h2>
            <p className="text-muted-foreground mb-8">
              Click the chat button below to start a conversation with our AI assistant
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Chat Button */}
      <ChatBot />
    </div>
  );
};

export default ChatbotAssistant;
