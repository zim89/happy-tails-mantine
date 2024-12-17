import { API_URL } from '@/shared/constants/env.const';
import { BackendResponse, Product } from '@/shared/types/types';
import { Mistral } from '@mistralai/mistralai';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_MISTRAL_KEY;
const agentId = process.env.NEXT_PUBLIC_MISTRAL_AGENT!;

const client = new Mistral({ apiKey: apiKey });

type ChatParams = {
  messages: { role: 'user' | 'assistant' | 'tool'; content: string }[];
  message: string;
};

export const POST = async (params: NextRequest) => {
  try {
    const res = (await params.json()) as unknown as ChatParams;

    const products = (
      await axios.get<BackendResponse<Product[]>>(API_URL + '/products')
    ).data;

    const chatResponse = await client.agents.complete({
      agentId,
      messages: [
        ...res.messages,
        {
          role: 'user',
          content:
            res.message +
            `. Here is the JSON array of products for reference: ${JSON.stringify(products.content)}`,
        },
      ],
    });

    return NextResponse.json(
      chatResponse?.choices ? chatResponse?.choices[0]?.message.content : ''
    );
  } catch (err) {
    return NextResponse.json({
      error: err,
      status: 500,
    });
  }
};
