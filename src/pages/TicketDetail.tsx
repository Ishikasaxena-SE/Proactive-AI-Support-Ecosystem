import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, MessageSquare, Clock, User, Mail, Phone } from "lucide-react";

type Ticket = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  ai_summary: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
};

type TicketUpdate = {
  id: string;
  update_type: string;
  content: string;
  created_by: string;
  created_at: string;
};

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [updates, setUpdates] = useState<TicketUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTicket = async () => {
    try {
      const { data: ticketData, error: ticketError } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .single();

      if (ticketError) throw ticketError;
      setTicket(ticketData);

      const { data: updatesData, error: updatesError } = await supabase
        .from('ticket_updates')
        .select('*')
        .eq('ticket_id', id)
        .order('created_at', { ascending: true });

      if (updatesError) throw updatesError;
      setUpdates(updatesData || []);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      toast({
        title: "Error",
        description: "Failed to load ticket details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();

    const channel = supabase
      .channel(`ticket-${id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tickets',
          filter: `id=eq.${id}`
        },
        () => {
          fetchTicket();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ticket_updates',
          filter: `ticket_id=eq.${id}`
        },
        () => {
          fetchTicket();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const handleStatusChange = async (newStatus: 'open' | 'in_progress' | 'resolved' | 'closed') => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      await supabase.from('ticket_updates').insert({
        ticket_id: id,
        update_type: 'status_change',
        content: `Status changed to ${newStatus}`,
        created_by: 'System'
      });

      toast({
        title: "Success",
        description: "Ticket status updated",
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('ticket_updates').insert({
        ticket_id: id,
        update_type: 'comment',
        content: newComment,
        created_by: ticket?.customer_name || 'Customer'
      });

      if (error) throw error;

      setNewComment("");
      toast({
        title: "Success",
        description: "Comment added",
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ticket Not Found</h2>
          <Button onClick={() => navigate('/tickets')}>Back to Tickets</Button>
        </Card>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="container mx-auto max-w-5xl">
        <Button variant="ghost" onClick={() => navigate('/tickets')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tickets
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{ticket.title}</h1>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                    <Badge variant="outline">{ticket.category}</Badge>
                    <Badge>{ticket.status.replace('_', ' ')}</Badge>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{ticket.description}</p>
              </div>

              {ticket.ai_summary && (
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    AI Summary
                  </h3>
                  <p className="text-sm text-muted-foreground">{ticket.ai_summary}</p>
                </Card>
              )}
            </Card>

            {/* Updates & Comments */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Activity</h2>
              <div className="space-y-4 mb-6">
                {updates.map((update) => (
                  <div key={update.id} className="border-l-2 border-primary pl-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{update.created_by}</span>
                      <Badge variant="outline" className="text-xs">{update.update_type}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(update.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{update.content}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="space-y-4">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Add Comment
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Ticket Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-medium">{ticket.customer_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Email:</span>
                  <a href={`mailto:${ticket.customer_email}`} className="text-primary hover:underline">
                    {ticket.customer_email}
                  </a>
                </div>
                {ticket.customer_phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                    <a href={`tel:${ticket.customer_phone}`} className="text-primary hover:underline">
                      {ticket.customer_phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Created:</span>
                  <span>{new Date(ticket.created_at).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Updated:</span>
                  <span>{new Date(ticket.updated_at).toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Update Status</h3>
              <Select value={ticket.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
