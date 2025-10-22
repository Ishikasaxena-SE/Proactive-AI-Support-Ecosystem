import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bell, X, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Notification = {
  id: string;
  title: string;
  message: string;
  category: string;
  severity: string;
  created_at: string;
  read: boolean;
};

export const NotificationPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchNotifications();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications'
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async () => {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setNotifications(data);
    }
  };

  const generateNotification = async () => {
    setIsGenerating(true);
    try {
      const { error } = await supabase.functions.invoke('generate-notification');
      
      if (error) throw error;
      
      toast.success('Proactive notification generated!');
    } catch (error: any) {
      console.error('Error generating notification:', error);
      toast.error(error.message || 'Failed to generate notification');
    } finally {
      setIsGenerating(false);
    }
  };

  const markAsRead = async (id: string) => {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);
    
    fetchNotifications();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'default';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
        aria-label="notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute top-12 right-0 w-96 max-h-[600px] overflow-hidden shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Proactive alerts and updates</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={generateNotification}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? 'Analyzing...' : 'Generate Proactive Alert'}
            </Button>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No notifications yet
                </p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.read ? 'bg-background' : 'bg-accent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        {getSeverityIcon(notification.severity)}
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                      </div>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="h-6 text-xs"
                        >
                          Mark read
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={getSeverityColor(notification.severity) as any}>
                        {notification.severity}
                      </Badge>
                      <Badge variant="outline">{notification.category}</Badge>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};