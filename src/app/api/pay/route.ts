import { NextResponse } from 'next/server';
import { EcoCashPayment } from 'ecocash-payment-sdk';

export async function POST(request: Request) {
  try {
    const { phone, amount, description, currency, callbackUrl } = await request.json();

    if (!process.env.ECOCASH_API_KEY) {
      throw new Error('ECOCASH_API_KEY is not set in .env.local');
    }

    const ecoCash = new EcoCashPayment({
      apiKey: process.env.ECOCASH_API_KEY,
      environment: 'sandbox',
    });

    const result = await ecoCash.makePayment({
      customerEcocashPhoneNumber: phone,
      amount: Number(amount),
      description: description,
      currency,
      callbackUrl,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
