// A mock of the ecocash-payment-sdk-js library for prototyping purposes.

interface SdkConfig {
  apiKey: string;
  environment: 'sandbox' | 'production';
}

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

class EcoCashBase {
  protected apiKey: string;
  protected environment: 'sandbox' | 'production';

  constructor(config: SdkConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required.');
    }
    this.apiKey = config.apiKey;
    this.environment = config.environment || 'sandbox';
  }
}

export class EcoCashPayment extends EcoCashBase {
  async pay(params: { phone: string; amount: number; description: string; currency: string; callbackUrl?: string }) {
    await delay(Math.random() * 1000 + 500);

    // Simulate validation
    if (!params.phone || !params.amount) {
      return { success: false, error: 'Phone number and amount are required.' };
    }

    // Simulate a failure case
    if (params.phone.endsWith('000')) {
      return { success: false, error: 'Payment failed: Insufficient funds.' };
    }

    const reference = `REF${Date.now()}`;
    const transactionId = `ECP${Date.now()}`;

    // If a callback URL is provided, simulate the callback
    if (params.callbackUrl) {
      // Don't wait for the callback to complete
      fetch(params.callbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'SUCCESSFUL',
          reference,
          transactionId,
          message: 'Payment was successful.',
        }),
      }).catch(console.error);
    }
    
    return {
      success: true,
      data: {
        transactionId,
        reference,
        status: 'PENDING',
        message: 'Payment initiated. Customer needs to approve on their phone.',
        ...params,
      },
    };
  }
}

export class EcoCashTransaction extends EcoCashBase {
  async lookup(params: { phone: string; reference: string }) {
    await delay(Math.random() * 800 + 300);

    if (!params.reference) {
      return { success: false, error: 'Transaction reference is required.' };
    }

    // Simulate not found
    if (params.reference.toUpperCase().includes('FAIL')) {
      return { success: false, error: 'Transaction not found.' };
    }

    const statuses = ['SUCCESSFUL', 'FAILED', 'PENDING'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      success: true,
      data: {
        reference: params.reference,
        phone: params.phone,
        status: randomStatus,
        amount: (Math.random() * 100).toFixed(2),
        currency: 'USD',
        timestamp: new Date(Date.now() - Math.random() * 10000000).toISOString(),
      },
    };
  }
}

export class EcoCashRefund extends EcoCashBase {
  async refund(params: { reference: string; amount: number }) {
    await delay(Math.random() * 1200 + 600);

    if (!params.reference || !params.amount) {
      return { success: false, error: 'Reference and amount are required for a refund.' };
    }

    // Simulate failure
    if (params.reference.toUpperCase().includes('NOREFUND')) {
        return { success: false, error: 'Refund failed: Original transaction not eligible for refund.' };
    }

    return {
      success: true,
      data: {
        refundTransactionId: `ECR${Date.now()}`,
        originalReference: params.reference,
        status: 'PROCESSING',
        message: `Refund of ${params.amount} is being processed.`,
      },
    };
  }
}