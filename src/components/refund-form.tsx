"use client";

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

import type { TransactionResult } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  phone: z.string().min(9, "Phone number is required.").regex(/^\d+$/, "Phone number must be digits only."),
  reference: z.string().min(5, "Transaction reference is required."),
  amount: z.coerce.number().positive("Amount must be positive."),
});

type RefundFormProps = {
  onResult: (result: TransactionResult) => void;
};

export function RefundForm({ onResult }: RefundFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      reference: '',
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      onResult({ ...result, type: 'Refund' });
      
      if(response.ok && result.success) {
        form.reset();
      } else {
        console.error("Refund API Error:", JSON.stringify(result, null, 2));
      }

    } catch (error) {
      console.error("Fetch Error:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown network error occurred.';
      toast({
        variant: 'destructive',
        title: 'API Error',
        description: errorMessage,
      });
      onResult({ success: false, error: errorMessage, type: 'Refund', timestamp: new Date().toISOString() });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Request a Refund</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
             <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Customer Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 263772123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Transaction Reference</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ET210106.1058.056220" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Refund Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="e.g., 10.50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Refunding...' : 'Process Refund'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  );
}
