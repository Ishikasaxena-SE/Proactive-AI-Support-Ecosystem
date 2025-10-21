-- Create enums for ticket management
CREATE TYPE ticket_category AS ENUM ('billing', 'technical', 'plans', 'roaming', 'network', 'other');
CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category ticket_category NOT NULL DEFAULT 'other',
  status ticket_status NOT NULL DEFAULT 'open',
  priority ticket_priority NOT NULL DEFAULT 'medium',
  assigned_to TEXT,
  ai_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ticket_updates table for tracking changes and comments
CREATE TABLE public.ticket_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  update_type TEXT NOT NULL,
  content TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_updates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tickets (public read, authenticated write)
CREATE POLICY "Anyone can view tickets"
  ON public.tickets FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create tickets"
  ON public.tickets FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tickets"
  ON public.tickets FOR UPDATE
  USING (auth.role() = 'authenticated');

-- RLS Policies for ticket_updates
CREATE POLICY "Anyone can view ticket updates"
  ON public.ticket_updates FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create ticket updates"
  ON public.ticket_updates FOR INSERT
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for automatic timestamp updates
CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better query performance
CREATE INDEX idx_tickets_status ON public.tickets(status);
CREATE INDEX idx_tickets_category ON public.tickets(category);
CREATE INDEX idx_tickets_priority ON public.tickets(priority);
CREATE INDEX idx_tickets_created_at ON public.tickets(created_at DESC);
CREATE INDEX idx_ticket_updates_ticket_id ON public.ticket_updates(ticket_id);

-- Enable realtime for tickets
ALTER PUBLICATION supabase_realtime ADD TABLE public.tickets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ticket_updates;