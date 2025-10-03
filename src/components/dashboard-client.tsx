"use client";

import { useState } from 'react';
import { CreditCard, Search, Undo2 } from 'lucide-react';

import type { TransactionResult } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { PaymentForm } from '@/components/payment-form';
import { LookupForm } from '@/components/lookup-form';
import { RefundForm } from '@/components/refund-form';
import { ResultsPanel } from '@/components/results-panel';
import { LogsPanel } from '@/components/logs-panel';

export function DashboardClient() {
  const [latestResult, setLatestResult] = useState<TransactionResult | null>(null);
  const [logs, setLogs] = useState<TransactionResult[]>([]);
  const [activeTab, setActiveTab] = useState('payment');

  const handleNewResult = (result: TransactionResult) => {
    const resultWithTimestamp = { ...result, timestamp: new Date().toISOString() };
    setLatestResult(resultWithTimestamp);
    setLogs(prevLogs => [resultWithTimestamp, ...prevLogs].slice(0, 5));
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payment">
              <CreditCard className="mr-2 h-4 w-4" />
              Make Payment
            </TabsTrigger>
            <TabsTrigger value="lookup">
              <Search className="mr-2 h-4 w-4" />
              Lookup
            </TabsTrigger>
            <TabsTrigger value="refund">
              <Undo2 className="mr-2 h-4 w-4" />
              Refund
            </TabsTrigger>
          </TabsList>
          <Card className="mt-4">
            <TabsContent value="payment" className="m-0">
              <PaymentForm onResult={handleNewResult} />
            </TabsContent>
            <TabsContent value="lookup" className="m-0">
              <LookupForm onResult={handleNewResult} />
            </TabsContent>
            <TabsContent value="refund" className="m-0">
              <RefundForm onResult={handleNewResult} />
            </TabsContent>
          </Card>
        </Tabs>
        
        <ResultsPanel key={latestResult?.timestamp} result={latestResult} />
      </div>

      <div className="lg:col-span-1">
        <LogsPanel logs={logs} />
      </div>
    </div>
  );
}
