import { NextRequest } from 'next/server';
import { oauth2Client } from '../utils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code)
    return Response.json(
      { message: "ERROR: Search query param 'code' is required" },
      { status: 400 }
    );

  console.log('Before request', code);

  const { tokens } = await oauth2Client.getToken(code);

  console.log(tokens);

  return Response.json({ tokens });
}
