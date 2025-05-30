import { serve } from 'https://deno.land/std@0.210.0/http/server.ts'
import OpenAI from 'https://esm.sh/openai@4.29.1'
import { encode } from 'https://esm.sh/gpt-tokenizer@2.1.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', 
  'Access-Control-Max-Age': '86400',
}

// Reduced token limits to prevent overflows
const MAX_TOKENS = 4000
const MAX_TORAH_TOKENS = 1000
const MAX_RESPONSE_TOKENS = 1000

const logger = {
  info: (message: string, data?: any) => {
    console.log(JSON.stringify({
      level: 'info',
      timestamp: new Date().toISOString(),
      message,
      data
    }))
  },
  error: (message: string, error: any) => {
    console.error(JSON.stringify({
      level: 'error',
      timestamp: new Date().toISOString(), 
      message,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
    }))
  }
}

function countTokens(text: string): number {
  return encode(text).length
}

function truncateToTokenLimit(text: string, maxTokens: number): string {
  const tokens = encode(text)
  if (tokens.length <= maxTokens) return text
  
  const truncated = tokens.slice(0, maxTokens)
  return truncated.join(' ') + '...'
}

async function fetchTorahText(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch Torah text: ${response.statusText}`)
    }
    const text = await response.text()
    return truncateToTokenLimit(text, MAX_TORAH_TOKENS)
  } catch (error) {
    logger.error('Error fetching Torah text', error)
    throw error
  }
}

function truncateMessages(messages: any[]): any[] {
  let totalTokens = 0
  const truncatedMessages = []
  
  // Always keep the system message and last user message
  const systemMessage = messages.find(m => m.role === 'system')
  const lastUserMessage = messages[messages.length - 1]
  
  if (systemMessage) {
    let systemContent = systemMessage.content
    if (countTokens(systemContent) > 1000) {
      systemContent = truncateToTokenLimit(systemContent, 1000)
    }
    truncatedMessages.push({ ...systemMessage, content: systemContent })
    totalTokens += countTokens(systemContent)
  }
  
  if (lastUserMessage && lastUserMessage !== systemMessage) {
    let userContent = lastUserMessage.content
    if (countTokens(userContent) > 1000) {
      userContent = truncateToTokenLimit(userContent, 1000)
    }
    truncatedMessages.push({ ...lastUserMessage, content: userContent })
    totalTokens += countTokens(userContent)
  }
  
  // Add remaining messages if there's room
  const remainingTokens = MAX_TOKENS - totalTokens
  if (remainingTokens > 0) {
    const otherMessages = messages.filter(m => 
      m !== systemMessage && m !== lastUserMessage
    )
    
    for (const message of otherMessages) {
      const tokenCount = countTokens(message.content)
      if (totalTokens + tokenCount <= MAX_TOKENS) {
        truncatedMessages.push(message)
        totalTokens += tokenCount
      } else {
        break
      }
    }
  }
  
  return truncatedMessages
}

serve(async (req) => {
  
  const requestId = crypto.randomUUID()
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const openAiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const { messages, torahTextUrl } = await req.json()
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid messages format')
    }

    const openai = new OpenAI({ apiKey: openAiKey })
    
    // Fetch minimal Torah context if URL provided
    let enhancedMessages = [...messages]
    if (torahTextUrl && enhancedMessages[0]?.role === 'system') {
      const torahText = await fetchTorahText(torahTextUrl)
      const torahContext = `\n\nTorah Text Sample:\n${torahText}`
      enhancedMessages[0].content += torahContext
    }

    // Truncate messages to fit token limits
    enhancedMessages = truncateMessages(enhancedMessages)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: enhancedMessages,
      temperature: 0.7,
      max_tokens: MAX_RESPONSE_TOKENS
    })

    return new Response(
      JSON.stringify({
        message: completion.choices[0].message?.content,
        usage: completion.usage
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    logger.error(`Error processing request [${requestId}]`, error)
    
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
