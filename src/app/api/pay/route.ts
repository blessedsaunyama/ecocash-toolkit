import { NextResponse } from 'next/server';
import { EcoCashPayment } from 'ecocash-payment-sdk';

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

    // According to the SDK docs, sourceReference is auto-generated if not provided.
    // The callbackUrl should be configured on the EcoCash developer portal, not sent in the request body.
    const result = await ecoCash.makePayment({
      customerEcocashPhoneNumber: phone,
      amount: Number(amount),
      description: description,
      currency,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
