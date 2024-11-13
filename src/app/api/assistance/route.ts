import { Mistral } from '@mistralai/mistralai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_MISTRAL_KEY;
const agentId = process.env.NEXT_PUBLIC_MISTRAL_AGENT!;

const client = new Mistral({ apiKey: apiKey });

export const POST = async (params: NextRequest) => {
  const res = (await params.json()) as unknown as {
    messages: { sender: string; content: string }[];
    message: string;
  };

  const chatResponse = await client.agents.complete({
    agentId,
    messages: [
      {
        role: 'user',
        content: res.message
          ? res.message
          : 'Show me a list of all categories available.',
      },
    ],
  });

  return NextResponse.json(
    chatResponse?.choices ? chatResponse?.choices[0]?.message.content : []
  );
};
