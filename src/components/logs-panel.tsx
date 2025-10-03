"use client";

import { Check, History, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TransactionResult } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type LogsPanelProps = {
  logs: TransactionResult[];
};

export function LogsPanel({ logs }: LogsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <History size={24} />
          Transaction Logs
        </CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length > 0 ? (
          <TooltipProvider>
            <ul className="space-y-4">
              {logs.map((log) => (
                <li key={log.timestamp} className="flex items-center justify-between animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <div className="flex items-center gap-3">
                    <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", log.success ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900")}>
                      {log.success ? <Check className="h-5 w-5 text-green-600 dark:text-green-400" /> : <X className="h-5 w-5 text-red-600 dark:text-red-400" />}
                    </span>
                    <div>
                      <p className="font-semibold text-sm">{log.type}</p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                           <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}</p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{new Date(log.timestamp).toLocaleString()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <Badge variant={log.success ? 'secondary' : 'destructive'}>
                    {log.success ? 'Success' : 'Failed'}
                  </Badge>
                </li>
              ))}
            </ul>
          </TooltipProvider>
        ) : (
          <div className="text-center text-muted-foreground py-10">
            <p>No transactions yet.</p>
            <p className="text-sm">Your recent activity will be logged here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
