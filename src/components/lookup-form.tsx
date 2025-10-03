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
});

type LookupFormProps = {
  onResult: (result: TransactionResult) => void;
};

export function LookupForm({ onResult }: LookupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      reference: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const params = new URLSearchParams({ phone: values.phone, reference: values.reference });
      const response = await fetch(`/api/lookup?${params.toString()}`);
      
      const result = await response.json();
      onResult({ ...result, type: 'Lookup' });

      if (response.ok && result.success) {
        // Do not reset form on successful lookup
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown network error occurred.';
      toast({
        variant: 'destructive',
        title: 'API Error',
        description: errorMessage,
      });
      onResult({ success: false, error: errorMessage, type: 'Lookup', timestamp: new Date().toISOString() });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Lookup a Transaction</CardTitle>
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
                    <Input placeholder="e.g., 0772123456" {...field} />
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
                  <FormLabel>Transaction Reference</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., REF1678886400000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Searching...' : 'Lookup Transaction'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  );
}
