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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const formSchema = z.object({
  phone: z.string().min(9, "Phone number is required.").regex(/^\d+$/, "Phone number must be digits only."),
  amount: z.coerce.number().positive("Amount must be positive."),
  description: z.string().min(3, "Description is required."),
  currency: z.string().default('USD'),
});

type PaymentFormProps = {
  onResult: (result: TransactionResult) => void;
};

export function PaymentForm({ onResult }: PaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      amount: 0,
      description: '',
      currency: 'USD',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const callbackUrl = `${window.location.origin}/api/callback`;
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...values, callbackUrl}),
      });

      const result = await response.json();
      onResult({ ...result, type: 'Payment' });

      if (response.ok && result.success) {
        form.reset();
        toast({
          title: 'Callback initiated',
          description: 'The transaction is processing and a callback will be sent.',
        });
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown network error occurred.';
      toast({
        variant: 'destructive',
        title: 'API Error',
        description: errorMessage,
      });
      onResult({ success: false, error: errorMessage, type: 'Payment', timestamp: new Date().toISOString() });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Initiate a C2B Payment</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 0772123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="e.g., 10.50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="ZWL">ZWL</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Payment for Order #123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDescription>A callback will be sent to /api/callback upon completion.</FormDescription>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Processing...' : 'Pay Now'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  );
}