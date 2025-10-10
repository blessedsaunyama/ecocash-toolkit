import { NextResponse } from 'next/server';
import { EcoCashRefund } from 'ecocash-payment-sdk';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { reference, amount, phone } = await request.json();

    if (!process.env.ECOCASH_API_KEY) {
      throw new Error('ECOCASH_API_KEY is not set on the server.');
    }

    const ecoCash = new EcoCashRefund({
      apiKey: process.env.ECOCASH_API_KEY,
      environment: 'sandbox',
    });

    const refundCorrelator = uuidv4();

    // The SDK documentation has different parameter names than the raw API docs.
    // We will trust the SDK's parameter names.
    const result = await ecoCash.requestRefund({
      originalEcocashTransactionReference: reference,
      refundCorrelator: refundCorrelator,
      sourceMobileNumber: phone,
      amount: Number(amount),
      clientName: 'EcoCash Toolkit',
      currency: 'USD', 
      reasonForRefund: 'User requested refund from toolkit',
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('Refund API Unhandled Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown server error occurred' },
      { status: 500 }
    );
  }
}
