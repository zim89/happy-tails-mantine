import { Mistral } from '@mistralai/mistralai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_MISTRAL_KEY;
const agentId = process.env.NEXT_PUBLIC_MISTRAL_AGENT!;

const client = new Mistral({ apiKey: apiKey });

type ChatParams = {
  messages: { role: 'user' | 'assistant' | 'tool'; content: string }[];
  message: string;
};

export const POST = async (params: NextRequest) => {
  const res = (await params.json()) as unknown as ChatParams;

  const chatResponse = await client.agents.complete({
    agentId,
    messages: [
      ...res.messages,
      {
        role: 'user',
        content: res.message,
      },
    ],
  });

  return NextResponse.json(
    chatResponse?.choices ? chatResponse?.choices[0]?.message.content : ''
  );
};
