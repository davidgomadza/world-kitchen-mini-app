
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { payload, action, signal } = await request.json();

  try {
    const response = await fetch('https://developer.worldcoin.org/api/v2/verify/app_staging_YOUR_APP_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nullifier_hash: payload.nullifier_hash,
        merkle_root: payload.merkle_root,
        proof: payload.proof,
        verification_level: payload.verification_level,
        action,
        signal,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ verified: true });
    } else {
      return NextResponse.json({ verified: false, error: data.detail }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ verified: false, error: 'Verification failed' }, { status: 500 });
  }
} 
