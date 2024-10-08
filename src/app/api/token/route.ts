import { NextRequest } from 'next/server';
import { oauth2Client } from '../utils';
import { CLIENT_ERROR } from '@/shared/constants/httpCodes';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code)
    return Response.json(
      { message: "ERROR: Search query param 'code' is required" },
      { status: CLIENT_ERROR }
    );

  const { tokens } = await oauth2Client.getToken(code);

  return Response.json({ tokens });
}
