import { NextResponse } from 'next/server';
import { EcoCashRefund } from '@/lib/ecocash-sdk';

export async function POST(request: Request) {
  try {
    const { reference, amount } = await request.json();

    if (!process.env.ECOCASH_API_KEY) {
      throw new Error('ECOCASH_API_KEY is not set in .env.local');
    }

    const ecoCash = new EcoCashRefund({
      apiKey: process.env.ECOCASH_API_KEY,
      environment: 'sandbox',
    });

    const result = await ecoCash.refund({ reference, amount: Number(amount) });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
