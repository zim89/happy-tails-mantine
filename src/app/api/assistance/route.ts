import { Mistral } from '@mistralai/mistralai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_MISTRAL_KEY;
const agentId = process.env.NEXT_PUBLIC_MISTRAL_AGENT!;

const client = new Mistral({ apiKey: apiKey });

export const GET = async (params: NextRequest) => {
  const message = params.url.match(/message=([^&]*)/);

  const chatResponse = await client.agents.complete({
    agentId,
    messages: [
      {
        role: 'user',
        content: message
          ? message[1]
          : 'Show me a list of all categories available.',
      },
    ],
  });

  return NextResponse.json(
    chatResponse?.choices ? chatResponse?.choices[0]?.message.content : []
  );
};
