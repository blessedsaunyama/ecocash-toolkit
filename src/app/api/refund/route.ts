import { NextResponse } from 'next/server';
import { EcoCashRefund } from 'ecocash-payment-sdk';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { reference, amount, phone } = await request.json();

    if (!process.env.ECOCASH_API_KEY) {
      console.error('Refund API Error: ECOCASH_API_KEY is not set.');
      return NextResponse.json(
          { success: false, error: 'Server is not configured for refunds.' },
          { status: 500 }
      );
    }

    const ecoCash = new EcoCashRefund({
      apiKey: process.env.ECOCASH_API_KEY,
      environment: 'sandbox',
    });

    const refundRequest = {
      originalEcocashTransactionReference: reference, // Correct spelling as per SDK docs
      refundCorrelator: uuidv4(), // Correct spelling as per SDK docs
      sourceMobileNumber: phone,
      amount: Number(amount),
      clientName: 'EcoCash Toolkit',
      currency: 'USD', 
      reasonForRefund: 'User requested refund from toolkit',
    };
    
    console.log('Attempting EcoCash refund with data:', refundRequest);

    const result = await ecoCash.requestRefund(refundRequest);

    console.log('Ecocash SDK Refund Response:', result);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Refund API Unhandled Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown server error occurred' },
      { status: 500 }
    );
  }
}
