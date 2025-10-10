import { NextResponse } from 'next/server';
import { EcoCashPayment } from 'ecocash-payment-sdk';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { phone, amount, description, currency } = await request.json();

    if (!process.env.ECOCASH_API_KEY) {
      console.error('Payment API Error: ECOCASH_API_KEY is not set.');
      throw new Error('ECOCASH_API_KEY is not set on the server.');
    }

    const ecoCash = new EcoCashPayment({
      apiKey: process.env.ECOCASH_API_KEY,
      environment: 'sandbox',
    });

    const sourceReference = uuidv4();

    const result = await ecoCash.makePayment({
      customerEcocashPhoneNumber: phone,
      amount: Number(amount),
      description: description,
      currency,
      sourceReference,
    });
    
    if (!result.success) {
      console.error('Ecocash SDK Payment Error:', result);
    }

    // The SDK returns its own success/error object. We pass it along.
    return NextResponse.json(result);

  } catch (error) {
    console.error('Payment API Unhandled Error:', error);
    // If any error happens before or during the SDK call, return a structured JSON error
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown server error occurred.' },
      { status: 500 }
    );
  }
}
