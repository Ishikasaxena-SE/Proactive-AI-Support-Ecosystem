import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, description } = await req.json();
    console.log('Categorizing ticket:', { title, description });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Use AI to categorize and prioritize the ticket
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an AI assistant that categorizes telecom customer support tickets. Based on the ticket title and description, determine:
1. Category (one of: billing, technical, plans, roaming, network, other)
2. Priority (one of: low, medium, high, urgent)
3. A brief summary (max 100 words)

Respond ONLY with valid JSON in this exact format:
{
  "category": "billing",
  "priority": "medium",
  "summary": "Customer has a question about their bill"
}`
          },
          {
            role: 'user',
            content: `Title: ${title}\n\nDescription: ${description}`
          }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'categorize_ticket',
              description: 'Categorize and prioritize a support ticket',
              parameters: {
                type: 'object',
                properties: {
                  category: {
                    type: 'string',
                    enum: ['billing', 'technical', 'plans', 'roaming', 'network', 'other']
                  },
                  priority: {
                    type: 'string',
                    enum: ['low', 'medium', 'high', 'urgent']
                  },
                  summary: {
                    type: 'string',
                    description: 'Brief summary of the ticket'
                  }
                },
                required: ['category', 'priority', 'summary'],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'categorize_ticket' } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit exceeded. Please try again later.',
            category: 'other',
            priority: 'medium',
            summary: 'Unable to auto-categorize due to rate limit'
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: 'AI credits exhausted. Please add credits.',
            category: 'other',
            priority: 'medium',
            summary: 'Unable to auto-categorize due to insufficient credits'
          }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response:', JSON.stringify(data));

    // Extract the categorization from tool call
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      console.error('No tool call in response');
      return new Response(
        JSON.stringify({
          category: 'other',
          priority: 'medium',
          summary: 'Auto-categorization failed'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = JSON.parse(toolCall.function.arguments);
    console.log('Categorization result:', result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in categorize-ticket:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        category: 'other',
        priority: 'medium',
        summary: 'Error during categorization'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
