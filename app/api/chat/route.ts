import { openai } from '@ai-sdk/openai';
import { streamText, createUIMessageStreamResponse, convertToModelMessages, toUIMessageStream } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages: await convertToModelMessages(messages)
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream
    })
  })
}