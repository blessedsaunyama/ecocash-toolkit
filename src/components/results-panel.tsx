"use client";

import { CheckCircle2, XCircle, Terminal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { TransactionResult } from '@/lib/types';
import { cn } from '@/lib/utils';

type ResultsPanelProps = {
  result: TransactionResult | null;
};

export function ResultsPanel({ result }: ResultsPanelProps) {
  const resultText = result ? JSON.stringify(result, null, 2) : '';

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-5 duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          {result ? (
            result.success ? (
              <CheckCircle2 className="text-green-500" />
            ) : (
              <XCircle className="text-red-500" />
            )
          ) : (
            <Terminal />
          )}
          Transaction Result
        </CardTitle>
      </CardHeader>
      <CardContent>
        {result ? (
          <div>
            <p
              className={cn(
                "mb-2 text-sm font-semibold",
                result.success ? "text-green-600" : "text-red-600"
              )}
            >
              {result.success ? 'SUCCESS' : 'FAILURE'}
            </p>
            <Textarea
              readOnly
              value={resultText}
              className="font-code text-xs h-64 resize-none bg-muted/50"
              aria-label="Transaction result JSON"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground bg-muted/30 rounded-md">
            <p>Your transaction results will appear here.</p>
            <p className="text-sm">Initiate a transaction to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
