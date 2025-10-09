import { NextResponse } from 'next/server';
import { EcoCashPayment } from 'ecocash-payment-sdk-js';
import { v4 as uuidv4 } from 'uuid';


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

    const sourceReference = uuidv4();

    const result = await ecoCash.pay({ 
        customerMsisdn: phone, 
        amount: Number(amount), 
        reason: description, 
        currency, 
        callbackUrl,
        sourceReference
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
