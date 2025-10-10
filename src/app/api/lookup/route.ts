import { NextRequest, NextResponse } from 'next/server';
import { EcoCashTransaction } from 'ecocash-payment-sdk';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');
    const reference = searchParams.get('reference');

    if (!phone || !reference) {
      return NextResponse.json(
        { success: false, error: 'Phone and reference are required query parameters.' },
        { status: 400 }
      );
    }
    
    if (!process.env.ECOCASH_API_KEY) {
      throw new Error('ECOCASH_API_KEY is not set on the server.');
    }

    const ecoCash = new EcoCashTransaction({
      apiKey: process.env.ECOCASH_API_KEY,
      environment: 'sandbox',
    });

    const result = await ecoCash.lookupTransaction({
      sourceMobileNumber: phone,
      sourceReference: reference,
    });

    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Lookup API Unhandled Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown server error occurred.' },
      { status: 500 }
    );
  }
}
