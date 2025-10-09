import { NextResponse } from 'next/server';
import { EcoCashRefund } from 'ecocash-payment-sdk';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { reference, amount, phone } = await request.json();

    if (!process.env.ECOCASH_API_KEY) {
      throw new Error('ECOCASH_API_KEY is not set in .env.local');
    }

    const ecoCash = new EcoCashRefund({
      apiKey: process.env.ECOCASH_API_KEY,
      environment: 'sandbox',
    });

    const refundCorrelator = uuidv4();

    const result = await ecoCash.requestRefund({
      originalEcocashTransactionReference: reference,
      amount: Number(amount),
      sourceMobileNumber: phone,
      refundCorrelator,
      clientName: 'EcoCash Toolkit',
      currency: 'USD', // Assuming USD for now, could be dynamic
      reasonForRefund: 'User requested refund from toolkit',
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
