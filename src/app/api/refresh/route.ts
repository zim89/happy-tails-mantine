import { NextRequest } from 'next/server';
import { oauth2Client } from '../utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('refresh_token');

    if (!token)
      return Response.json(
        { message: "ERROR: Search query param 'refresh_token' is required" },
        { status: 400 }
      );

    oauth2Client.setCredentials({
      refresh_token: token,
    });

    // Explicitly asking for a new access token
    const { credentials } = await oauth2Client.refreshAccessToken();

    return Response.json({
      accessToken: credentials.access_token,
      expiryDate: credentials.expiry_date,
    });
  } catch (err) {
    if (err instanceof Error)
      return Response.json(
        { message: 'Error refreshing access token: ', err },
        { status: 500 }
      );
  }
}
