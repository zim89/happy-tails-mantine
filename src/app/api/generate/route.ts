import { Mistral } from '@mistralai/mistralai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_MISTRAL_KEY;

const client = new Mistral({ apiKey: apiKey });

type ChatParams = {
  message: string;
};

export const POST = async (params: NextRequest) => {
  const res = (await params.json()) as unknown as ChatParams;

  const chatResponse = await client.chat.complete({
    model: 'open-mistral-nemo',
    messages: [
      {
        role: 'user',
        content: res.message,
      },
    ],
    safePrompt: true,
  });

  return NextResponse.json(
    chatResponse?.choices ? chatResponse?.choices[0]?.message.content : ''
  );
};
