import { NextResponse } from 'next/server';
import { EcoCashPayment } from 'ecocash-payment-sdk';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { phone, amount, description, currency } = await request.json();

    if (!process.env.ECOCASH_API_KEY) {
      throw new Error('ECOCASH_API_KEY is not set in .env.local');
    }

    const ecoCash = new EcoCashPayment({
      apiKey: process.env.ECOCASH_API_KEY,
      environment: 'sandbox',
    });

    const sourceReference = uuidv4();

    const result = await ecoCash.makePayment({
      customerEcocashPhoneNumber: phone,
      amount: Number(amount),
      description: description, // The SDK should map this to 'reason' if needed. The SDK docs use 'description'.
      currency,
      sourceReference, // Added this as it's required.
    });

    // The SDK's response object might be different from the raw API.
    // We adapt it to what our frontend expects.
    const success = result.status === 'SUCCESS' || result.success;

    return NextResponse.json({ ...result, success });
  } catch (error) {
    console.error('Payment API Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
