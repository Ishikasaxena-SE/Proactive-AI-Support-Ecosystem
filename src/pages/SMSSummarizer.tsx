import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Sparkles, Copy, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SMSSummarizer = () => {
  const [smsText, setSmsText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSummarize = async () => {
    if (!smsText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter SMS text to summarize",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: [
            {
              role: "system",
              content: "You are an AI SMS summarizer. Your task is to create concise, clear summaries of SMS messages. Focus on key information, action items, and important details. Keep summaries brief but comprehensive.",
            },
            {
              role: "user",
              content: `Please summarize the following SMS message:\n\n${smsText}`,
            },
          ],
        },
      });

      if (error) throw error;

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") continue;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                fullText += content;
                setSummary(fullText);
              }
            } catch (e) {
              // Ignore parsing errors for partial chunks
            }
          }
        }
      }

      toast({
        title: "Summary Generated",
        description: "Your SMS has been summarized successfully",
      });
    } catch (error) {
      console.error("Error summarizing SMS:", error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    toast({
      title: "Copied!",
      description: "Summary copied to clipboard",
    });
  };

  const clearAll = () => {
    setSmsText("");
    setSummary("");
  };

  return (
    <div className="min-h-screen bg-gradient-mesh relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover-glow group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Button>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <MessageSquare className="w-12 h-12 text-primary animate-glow-pulse" />
              <Sparkles className="w-8 h-8 text-accent animate-spin-slow" />
            </div>
            <h1 className="text-5xl font-bold mb-4 gradient-text">
              AI SMS Summarizer
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Transform long SMS messages into clear, concise summaries using advanced AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card className="glass-strong p-6 border-white/10 hover-glow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold gradient-text">Original SMS</h2>
                <span className="text-sm text-foreground/50">
                  {smsText.length} characters
                </span>
              </div>
              <Textarea
                placeholder="Paste your SMS message here..."
                value={smsText}
                onChange={(e) => setSmsText(e.target.value)}
                className="min-h-[300px] bg-background/50 border-white/10 focus:border-primary/50 resize-none"
              />
              <div className="flex gap-3 mt-4">
                <Button
                  onClick={handleSummarize}
                  disabled={isLoading || !smsText.trim()}
                  className="flex-1 bg-gradient-primary hover-glow interactive-scale"
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Summarize
                    </>
                  )}
                </Button>
                <Button
                  onClick={clearAll}
                  variant="outline"
                  className="glass border-white/10 hover:border-white/20"
                >
                  Clear
                </Button>
              </div>
            </Card>

            {/* Output Section */}
            <Card className="glass-strong p-6 border-white/10 hover-glow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold gradient-text">AI Summary</h2>
                {summary && (
                  <Button
                    onClick={copyToClipboard}
                    variant="ghost"
                    size="sm"
                    className="hover-glow"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
              </div>
              <div className="min-h-[300px] bg-background/50 border border-white/10 rounded-lg p-4">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-sm text-foreground/50 animate-pulse">
                      Analyzing and generating summary...
                    </p>
                  </div>
                ) : summary ? (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                      {summary}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-foreground/40">
                    <MessageSquare className="w-16 h-16 mb-4 opacity-30" />
                    <p className="text-center">
                      Your AI-generated summary will appear here
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="glass p-6 border-white/5 hover-glow interactive-scale">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-foreground/60">
                Uses advanced language models to understand context and extract key information
              </p>
            </Card>

            <Card className="glass p-6 border-white/5 hover-glow interactive-scale">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-foreground/60">
                Get concise summaries in seconds with real-time streaming
              </p>
            </Card>

            <Card className="glass p-6 border-white/5 hover-glow interactive-scale">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                <Copy className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Easy to Use</h3>
              <p className="text-sm text-foreground/60">
                Simply paste, click summarize, and copy your results
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSSummarizer;
