export interface TransactionResult {
  success: boolean;
  data?: Record<string, any>;
  error?: string;
  timestamp: string;
  type: 'Payment' | 'Lookup' | 'Refund' | 'Callback';
}