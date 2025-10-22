import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get recent tickets to analyze patterns
    const { data: tickets } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (!tickets || tickets.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No tickets to analyze' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call Lovable AI to generate proactive notification
    const systemPrompt = `You are a proactive customer service AI that predicts potential issues based on ticket patterns.
Analyze the recent tickets and identify potential problems that customers might face soon.
Generate a proactive notification that:
1. Identifies a pattern or potential issue
2. Provides a clear, actionable alert
3. Includes helpful context

Return ONLY valid JSON in this exact format:
{
  "title": "Brief alert title",
  "message": "Detailed explanation with actionable advice",
  "category": "network|billing|technical|account",
  "severity": "low|medium|high|critical"
}`;

    const ticketsSummary = tickets.map(t => 
      `[${t.priority}] ${t.category}: ${t.title}`
    ).join('\n');

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Recent tickets:\n${ticketsSummary}\n\nGenerate a proactive notification.` }
        ],
      }),
    });

    if (aiResponse.status === 429) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (aiResponse.status === 402) {
      return new Response(
        JSON.stringify({ error: 'Insufficient credits. Please add funds to your Lovable AI workspace.' }),
        { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices[0].message.content;
    
    // Parse AI response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }
    
    const notification = JSON.parse(jsonMatch[0]);

    // Insert notification into database
    const { data: newNotification, error: insertError } = await supabase
      .from('notifications')
      .insert({
        title: notification.title,
        message: notification.message,
        category: notification.category,
        severity: notification.severity,
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    console.log('Generated notification:', newNotification);

    return new Response(
      JSON.stringify(newNotification),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-notification:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});