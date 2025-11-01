import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Wifi, WifiOff, CheckCircle, MessageSquare, Phone, Ticket, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type DemoStep = "initial" | "detecting" | "notification" | "resolve-options" | "ai-chat" | "ai-call" | "ticket-creation" | "human-agent" | "completed";

const InteractiveDemo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<DemoStep>("initial");
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ticketId, setTicketId] = useState<string>("");
  const [notificationData, setNotificationData] = useState<{
    title: string;
    message: string;
    details: string;
  }>({
    title: "",
    message: "",
    details: ""
  });
  const [callTranscript, setCallTranscript] = useState<string[]>([]);

  const resetDemo = () => {
    setStep("initial");
    setChatMessages([]);
    setUserInput("");
    setTicketId("");
    setNotificationData({ title: "", message: "", details: "" });
    setCallTranscript([]);
  };

  const generateProactiveNotification = async () => {
    setIsLoading(true);
    try {
      const response = await supabase.functions.invoke("chat", {
        body: {
          messages: [
            {
              role: "system",
              content: "You are a telecom network monitoring system. Generate a proactive customer notification about a detected network issue. Return ONLY a JSON object with: title (short alert title), message (brief explanation 2-3 sentences), details (what actions are being taken, 1-2 sentences). Be professional and reassuring."
            },
            {
              role: "user",
              content: "Network outage detected in customer's area. Generate notification."
            }
          ],
        },
      });

      if (response.error) throw response.error;

      const reader = response.data.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                fullResponse += content;
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }

      // Parse JSON from response
      const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const notificationJson = JSON.parse(jsonMatch[0]);
        setNotificationData(notificationJson);
      }
    } catch (error) {
      console.error("Error generating notification:", error);
      // Fallback notification
      setNotificationData({
        title: "Network Outage Alert",
        message: "We've detected a network outage in your area. Our team is working on it. Expected resolution: 30 minutes.",
        details: "What we're doing: Rerouting traffic through backup servers. No action needed from you."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startDemo = async () => {
    setStep("detecting");
    await generateProactiveNotification();
    setTimeout(() => {
      setStep("notification");
    }, 2000);
  };

  const handleNotResolved = () => {
    setStep("resolve-options");
  };

  const handleAIChat = async () => {
    setStep("ai-chat");
    setIsLoading(true);
    
    try {
      const response = await supabase.functions.invoke("chat", {
        body: {
          messages: [
            {
              role: "system",
              content: "You are a helpful telecom customer service AI. The customer is experiencing network connectivity issues. Greet them warmly and ask a helpful diagnostic question. Keep it brief (2-3 sentences)."
            },
            {
              role: "user",
              content: "Start conversation about network issue"
            }
          ],
        },
      });

      if (response.error) throw response.error;

      const reader = response.data.getReader();
      const decoder = new TextDecoder();
      let aiMessage = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                aiMessage += content;
              }
            } catch (e) {
              // Ignore
            }
          }
        }
      }

      setChatMessages([{ role: "assistant", content: aiMessage }]);
    } catch (error) {
      console.error("Error starting chat:", error);
      setChatMessages([
        { role: "assistant", content: "Hello! I understand you're experiencing network connectivity issues. Let me help you troubleshoot this problem. Can you tell me what device you're using?" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateAICall = async () => {
    setIsLoading(true);
    const transcript: string[] = [];
    
    try {
      // Generate AI call conversation
      const response = await supabase.functions.invoke("chat", {
        body: {
          messages: [
            {
              role: "system",
              content: "Generate a realistic voice call transcript between an AI assistant and a customer with network issues. Format as alternating lines: 'AI: ...' and 'Customer: ...'. Include 4-6 exchanges total. Keep it natural and helpful. End with AI saying they'll create a ticket."
            },
            {
              role: "user",
              content: "Generate call transcript"
            }
          ],
        },
      });

      if (response.error) throw response.error;

      const reader = response.data.getReader();
      const decoder = new TextDecoder();
      let fullTranscript = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                fullTranscript += content;
              }
            } catch (e) {
              // Ignore
            }
          }
        }
      }

      const lines = fullTranscript.split("\n").filter(l => l.trim());
      setCallTranscript(lines);
    } catch (error) {
      console.error("Error simulating call:", error);
      setCallTranscript([
        "AI: Hello, this is your telecom AI assistant. I understand you're experiencing network connectivity issues. Can you describe what's happening?",
        "Customer: Yes, my internet keeps dropping every few minutes.",
        "AI: I see. Let me check your connection status. It looks like there's an outage in your area. We're working on it, but let me see if we can improve things for you.",
        "Customer: Okay, but I need internet for work right now.",
        "AI: I understand this is urgent. I'll create a priority ticket for you and escalate this to our technical team immediately.",
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAICall = async () => {
    setStep("ai-call");
    toast({
      title: "AI Voice Call Initiated",
      description: "Connecting you to our AI voice assistant...",
    });
    await simulateAICall();
    setTimeout(() => {
      setStep("ticket-creation");
    }, 3000);
  };

  const sendChatMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { role: "user", content: userInput };
    setChatMessages([...chatMessages, newMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke("chat", {
        body: {
          messages: [...chatMessages, newMessage],
        },
      });

      if (response.error) throw response.error;

      const reader = response.data.getReader();
      const decoder = new TextDecoder();
      let aiResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                aiResponse += content;
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }

      setChatMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatNotResolved = () => {
    setStep("ticket-creation");
  };

  const createTicket = async () => {
    setIsLoading(true);
    
    try {
      // Generate AI summary of the issue
      let conversationContext = "";
      if (chatMessages.length > 0) {
        conversationContext = chatMessages.map(m => `${m.role}: ${m.content}`).join("\n");
      } else if (callTranscript.length > 0) {
        conversationContext = callTranscript.join("\n");
      } else {
        conversationContext = "Customer received proactive notification about network outage but issue persists.";
      }

      const summaryResponse = await supabase.functions.invoke("chat", {
        body: {
          messages: [
            {
              role: "system",
              content: "You are a ticket summarization system. Create a concise technical summary (3-4 sentences) of this customer issue for a support ticket. Include key details and customer impact. Be professional and specific."
            },
            {
              role: "user",
              content: `Summarize this support interaction:\n\n${conversationContext}`
            }
          ],
        },
      });

      let aiSummary = "Network connectivity issues affecting customer's service. Requires technical investigation and resolution.";
      
      if (!summaryResponse.error) {
        const reader = summaryResponse.data.getReader();
        const decoder = new TextDecoder();
        let summary = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");
          
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  summary += content;
                }
              } catch (e) {
                // Ignore
              }
            }
          }
        }
        
        if (summary) aiSummary = summary;
      }

      const { data, error } = await supabase
        .from("tickets")
        .insert({
          customer_name: "Demo User",
          customer_email: "demo@example.com",
          customer_phone: "+1234567890",
          title: "Network Connectivity Issue - Priority Escalation",
          description: conversationContext,
          ai_summary: aiSummary,
          category: "technical",
          priority: "high",
          status: "open",
        })
        .select()
        .single();

      if (error) throw error;

      setTicketId(data.id);
      setStep("human-agent");
      
      toast({
        title: "Ticket Created",
        description: `Ticket #${data.id.slice(0, 8)} with AI-generated summary`,
      });
    } catch (error) {
      console.error("Ticket creation error:", error);
      toast({
        title: "Error",
        description: "Failed to create ticket",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (step === "ticket-creation") {
      createTicket();
    }
  }, [step]);

  const handleHumanEscalation = () => {
    setStep("completed");
    toast({
      title: "Escalated to Human Agent",
      description: "A senior support agent will contact you shortly",
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-white/10 interactive-scale"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
              Interactive Support Demo
            </h1>
            <p className="text-xl text-foreground/70">
              Experience the complete AI-powered support journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Phone Mockup */}
            <div className="flex justify-center items-start animate-scale-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
                <div className="w-[320px] h-[640px] bg-gradient-to-br from-gray-900 to-black border-8 border-foreground/20 rounded-[3rem] shadow-2xl overflow-hidden relative hover-glow">
                  {/* Phone Screen */}
                  <div className="h-full glass-strong p-6 overflow-y-auto">
                    {step === "initial" && (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Wifi className="h-20 w-20 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Network Status</h3>
                        <p className="text-muted-foreground text-center mb-6">All systems operational</p>
                        <Button onClick={startDemo} className="w-full">
                          Start Demo
                        </Button>
                      </div>
                    )}

                    {step === "detecting" && (
                      <div className="flex flex-col items-center justify-center h-full">
                        <WifiOff className="h-20 w-20 text-destructive mb-4 animate-pulse" />
                        <h3 className="text-xl font-semibold mb-2">Detecting Issue...</h3>
                        <p className="text-muted-foreground text-center">Analyzing network connectivity</p>
                      </div>
                    )}

                    {step === "notification" && (
                      <Card className="p-6 bg-gradient-card">
                        {isLoading ? (
                          <div className="text-center py-8">
                            <div className="animate-pulse">
                              <WifiOff className="h-12 w-12 text-destructive mx-auto mb-4" />
                              <p className="text-sm text-muted-foreground">Analyzing network status...</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start gap-3 mb-4">
                              <WifiOff className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                              <div>
                                <h3 className="font-semibold text-lg mb-2">
                                  {notificationData.title || "Network Outage Alert"}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {notificationData.message || "We've detected a network issue in your area."}
                                </p>
                                <p className="text-xs text-muted-foreground mb-4">
                                  <strong>What we're doing:</strong> {notificationData.details || "Working on resolution."}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1" onClick={() => setStep("completed")}>
                                OK, Thanks
                              </Button>
                              <Button size="sm" className="flex-1" onClick={handleNotResolved}>
                                Not Resolved
                              </Button>
                            </div>
                          </>
                        )}
                      </Card>
                    )}

                    {step === "resolve-options" && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold mb-4 text-center">How would you like help?</h3>
                        <Button
                          className="w-full h-auto py-6 flex-col gap-2"
                          onClick={handleAIChat}
                        >
                          <MessageSquare className="h-8 w-8" />
                          <span className="font-semibold">AI Chat Support</span>
                          <span className="text-xs opacity-80">Get instant text-based help</span>
                        </Button>
                        <Button
                          className="w-full h-auto py-6 flex-col gap-2"
                          onClick={handleAICall}
                        >
                          <Phone className="h-8 w-8" />
                          <span className="font-semibold">AI Voice Call</span>
                          <span className="text-xs opacity-80">Talk to our AI assistant</span>
                        </Button>
                      </div>
                    )}

                    {step === "ai-chat" && (
                      <div className="flex flex-col h-full">
                        <div className="flex-1 space-y-3 mb-4 overflow-y-auto">
                          {chatMessages.map((msg, i) => (
                            <div
                              key={i}
                              className={`p-3 rounded-lg ${
                                msg.role === "assistant"
                                  ? "bg-primary/10 text-foreground"
                                  : "bg-secondary/10 text-foreground ml-8"
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                            </div>
                          ))}
                          {isLoading && (
                            <div className="p-3 rounded-lg bg-primary/10">
                              <p className="text-sm text-muted-foreground">AI is typing...</p>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={userInput}
                              onChange={(e) => setUserInput(e.target.value)}
                              onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                              placeholder="Type your message..."
                              className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm"
                              disabled={isLoading}
                            />
                            <Button size="sm" onClick={sendChatMessage} disabled={isLoading}>
                              Send
                            </Button>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={handleChatNotResolved}
                          >
                            Issue Not Resolved
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === "ai-call" && (
                      <div className="flex flex-col h-full">
                        <div className="text-center mb-4">
                          <div className="bg-primary/20 rounded-full p-6 inline-block mb-3 animate-pulse">
                            <Phone className="h-12 w-12 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold mb-1">AI Voice Call Active</h3>
                          <p className="text-xs text-muted-foreground">Real-time conversation</p>
                        </div>
                        
                        {isLoading ? (
                          <div className="flex-1 flex items-center justify-center">
                            <p className="text-sm text-muted-foreground animate-pulse">Processing conversation...</p>
                          </div>
                        ) : (
                          <div className="flex-1 space-y-2 overflow-y-auto">
                            {callTranscript.map((line, i) => {
                              const isAI = line.startsWith("AI:");
                              return (
                                <div
                                  key={i}
                                  className={`p-2 rounded text-xs ${
                                    isAI 
                                      ? "bg-primary/10 text-left" 
                                      : "bg-secondary/10 text-right ml-8"
                                  }`}
                                >
                                  {line}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}

                    {(step === "ticket-creation" || step === "human-agent") && (
                      <div className="space-y-4">
                        <div className="bg-primary/10 rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <Ticket className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <h3 className="font-semibold mb-2">Ticket Created</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                Ticket #{ticketId.slice(0, 8)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Your issue has been documented with all chat history and will be reviewed by our team.
                              </p>
                            </div>
                          </div>
                        </div>

                        {step === "human-agent" && (
                          <Button
                            className="w-full h-auto py-6 flex-col gap-2"
                            onClick={handleHumanEscalation}
                          >
                            <UserCheck className="h-8 w-8" />
                            <span className="font-semibold">Escalate to Human Agent</span>
                            <span className="text-xs opacity-80">Speak with a senior support specialist</span>
                          </Button>
                        )}
                      </div>
                    )}

                    {step === "completed" && (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <CheckCircle className="h-20 w-20 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Demo Complete!</h3>
                        <p className="text-muted-foreground mb-6">
                          {ticketId 
                            ? "A human agent will contact you shortly to resolve your issue."
                            : "Thank you for trying our AI-powered support system!"}
                        </p>
                        <Button onClick={resetDemo} className="w-full">
                          Restart Demo
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Info Panel */}
            <div className="space-y-6 animate-slide-up">
              <Card className="glass-strong p-6 border-white/10 hover-glow">
                <h2 className="text-2xl font-bold mb-4 gradient-text">Current Step</h2>
                <div className="space-y-3">
                  {[
                    { step: "initial", label: "Network Monitoring", active: step === "initial", icon: "🔍" },
                    { step: "detecting", label: "Issue Detection", active: step === "detecting", icon: "⚠️" },
                    { step: "notification", label: "Proactive Alert", active: step === "notification", icon: "🔔" },
                    { step: "resolve-options", label: "Support Options", active: step === "resolve-options", icon: "🎯" },
                    { step: "ai-chat", label: "AI Chat", active: step === "ai-chat" || step === "ai-call", icon: "💬" },
                    { step: "ticket-creation", label: "Ticket Creation", active: step === "ticket-creation" || step === "human-agent", icon: "🎫" },
                    { step: "completed", label: "Resolution", active: step === "completed", icon: "✅" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all interactive-scale ${
                        item.active ? "bg-gradient-primary border border-white/20 shadow-glow" : "glass border-white/5"
                      }`}
                    >
                      <div className="text-2xl">{item.icon}</div>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          item.active ? "bg-white text-primary" : "glass"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span className={item.active ? "font-semibold text-white" : "text-foreground/60"}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass-strong p-6 border-white/10 hover-glow">
                <h3 className="font-semibold mb-3 gradient-text">What's Happening?</h3>
                <div className="space-y-2 text-sm text-foreground/70">
                  {step === "initial" && (
                    <p>The system is monitoring network connectivity in real-time, ready to detect and alert about any issues.</p>
                  )}
                  {step === "detecting" && (
                    <p>AI is analyzing network patterns and detecting a connectivity issue in your area.</p>
                  )}
                  {step === "notification" && (
                    <p>A proactive notification is sent before you even notice the issue, with clear information about what's happening and estimated resolution time.</p>
                  )}
                  {step === "resolve-options" && (
                    <p>The system offers multiple ways to get help - either through text chat or voice call with our AI assistant.</p>
                  )}
                  {step === "ai-chat" && (
                    <p>Our AI chatbot uses Gemini 2.5 Flash to understand your issue and provide real-time troubleshooting guidance.</p>
                  )}
                  {step === "ai-call" && (
                    <p>The AI voice assistant can handle complex conversations with natural language understanding and empathetic responses.</p>
                  )}
                  {(step === "ticket-creation" || step === "human-agent") && (
                    <p>If AI can't fully resolve the issue, a support ticket is automatically created with all conversation history for seamless handoff to human agents.</p>
                  )}
                  {step === "completed" && (
                    <p>The support journey is complete! The system successfully guided you through detection, AI assistance, ticket creation, and human escalation when needed.</p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
