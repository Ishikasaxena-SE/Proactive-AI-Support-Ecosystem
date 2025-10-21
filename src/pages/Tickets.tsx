import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type Ticket = {
  id: string;
  customer_name: string;
  customer_email: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
};

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
      setFilteredTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast({
        title: "Error",
        description: "Failed to load tickets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('tickets-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tickets'
        },
        () => {
          fetchTickets();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    let filtered = tickets;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.customer_email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTickets(filtered);
  }, [searchQuery, statusFilter, tickets]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'billing': return 'bg-primary/10 text-primary';
      case 'technical': return 'bg-accent/10 text-accent';
      case 'plans': return 'bg-secondary/10 text-secondary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusCounts = () => {
    return {
      all: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      in_progress: tickets.filter(t => t.status === 'in_progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length,
      closed: tickets.filter(t => t.status === 'closed').length,
    };
  };

  const counts = getStatusCounts();

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Smart Ticketing System</h1>
            <p className="text-muted-foreground">AI-powered ticket management and categorization</p>
          </div>
          <Button onClick={() => navigate('/create-ticket')} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Ticket
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={fetchTickets}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </Card>

        {/* Status Tabs */}
        <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="open">Open ({counts.open})</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress ({counts.in_progress})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({counts.resolved})</TabsTrigger>
            <TabsTrigger value="closed">Closed ({counts.closed})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Tickets List */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading tickets...</p>
          </div>
        ) : filteredTickets.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No tickets found</p>
            <Button onClick={() => navigate('/create-ticket')}>
              <Plus className="mr-2 h-4 w-4" />
              Create First Ticket
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="p-6 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate(`/ticket/${ticket.id}`)}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold">{ticket.title}</h3>
                      <Badge variant={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{ticket.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getCategoryColor(ticket.category)}>
                        {ticket.category}
                      </Badge>
                      <Badge variant="outline">
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {ticket.customer_name} • {ticket.customer_email}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Created: {new Date(ticket.created_at).toLocaleDateString()}</p>
                    <p>Updated: {new Date(ticket.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
