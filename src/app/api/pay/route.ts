import { NextResponse } from 'next/server';
import { EcoCashPayment } from 'ecocash-payment-sdk';

export async function POST(request: Request) {
  try {
    const { phone, amount, description, currency } = await request.json();

    if (!process.env.ECOCASH_API_KEY) {
      console.error('Payment API Error: ECOCASH_API_KEY is not set.');
      // This error is for the developer, not the user.
      return NextResponse.json(
        { success: false, error: 'Server is not configured for payments.' },
        { status: 500 }
      );
    }

    const ecoCash = new EcoCashPayment({
      apiKey: process.env.ECOCASH_API_KEY,
      environment: 'sandbox',
      autoGenerateReference: true, // Let SDK handle reference
    });
    
    const paymentRequest = {
      customerEcocashPhoneNumber: phone,
      amount: Number(amount),
      description: description, // Using `description` as per SDK docs
      currency,
    };

    console.log('Attempting EcoCash payment with data:', paymentRequest);

    const result = await ecoCash.makePayment(paymentRequest);
    
    console.log('EcoCash SDK Payment Response:', result);

    // The SDK returns its own success/error object. We pass it along.
    // The result object from the SDK already contains the necessary details.
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
