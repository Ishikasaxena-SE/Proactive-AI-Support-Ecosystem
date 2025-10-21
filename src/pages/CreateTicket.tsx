import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";

const CreateTicket = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    title: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, categorize the ticket using AI
      console.log('Calling categorize-ticket function...');
      const { data: aiData, error: aiError } = await supabase.functions.invoke('categorize-ticket', {
        body: {
          title: formData.title,
          description: formData.description
        }
      });

      if (aiError) {
        console.error('AI categorization error:', aiError);
      }

      console.log('AI categorization result:', aiData);

      // Create the ticket with AI categorization
      const { data: ticketData, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          ...formData,
          category: aiData?.category || 'other',
          priority: aiData?.priority || 'medium',
          ai_summary: aiData?.summary || null,
          status: 'open'
        })
        .select()
        .single();

      if (ticketError) throw ticketError;

      // Add initial update
      await supabase.from('ticket_updates').insert({
        ticket_id: ticketData.id,
        update_type: 'created',
        content: 'Ticket created and automatically categorized by AI',
        created_by: formData.customer_name
      });

      toast({
        title: "Success!",
        description: `Ticket created and automatically categorized as ${aiData?.category || 'other'}`,
      });

      navigate(`/ticket/${ticketData.id}`);
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast({
        title: "Error",
        description: "Failed to create ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="container mx-auto max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/tickets')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tickets
        </Button>

        <Card className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Create Support Ticket</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <p>AI will automatically categorize and prioritize your ticket</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer_name">Full Name *</Label>
                <Input
                  id="customer_name"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer_email">Email *</Label>
                <Input
                  id="customer_email"
                  type="email"
                  required
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer_phone">Phone (Optional)</Label>
              <Input
                id="customer_phone"
                type="tel"
                value={formData.customer_phone}
                onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Briefly describe your issue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide detailed information about your issue..."
                className="min-h-[150px]"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Create Ticket
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/tickets')}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateTicket;
