'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { FileText, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

interface CoverLetterResultProps {
  result: string;
  isLoading: boolean;
}

export default function CoverLetterResult({
  result,
  isLoading,
}: CoverLetterResultProps) {
  const [copied, setCopied] = React.useState(false);

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  /* ── Loading state (no content yet) ── */
  if (isLoading && !result) {
    return (
      <Card className='flex flex-col items-center justify-center py-20 shadow-lg'>
        <Spinner className='size-8 text-primary' />
        <p className='mt-4 text-sm font-medium text-muted-foreground animate-pulse'>
          Generating your cover letter…
        </p>
      </Card>
    );
  }

  /* ── Empty / initial state ── */
  if (!result) {
    return (
      <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/30 px-6 py-20 text-center'>
        <span className='mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10'>
          <FileText className='size-6 text-primary' />
        </span>
        <h3 className='text-lg font-semibold'>No cover letter yet</h3>
        <p className='mt-1 max-w-sm text-sm text-muted-foreground'>
          Select a job and resume from the configuration panel, then click
          &quot;Generate Cover Letter&quot; to create a tailored cover letter.
        </p>
      </div>
    );
  }

  /* ── Result display (supports streaming) ── */
  return (
    <Card className='shadow-lg'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <span className='inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
              <FileText className='size-4 text-primary' />
            </span>
            <div>
              <CardTitle className='text-lg'>Generated Cover Letter</CardTitle>
              <CardDescription>
                {isLoading
                  ? 'Streaming response…'
                  : 'Your AI-generated cover letter is ready'}
              </CardDescription>
            </div>
          </div>

          {/* Copy button */}
          {!isLoading && (
            <Button
              variant='outline'
              size='sm'
              className='cursor-pointer gap-1.5'
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className='size-3.5 text-emerald-500' />
                  Copied
                </>
              ) : (
                <>
                  <Copy className='size-3.5' />
                  Copy
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      <Separator />

      <CardContent className='pt-6'>
        <div className='whitespace-pre-wrap text-sm leading-relaxed'>
          {result}
          {/* Blinking cursor while streaming */}
          {isLoading && (
            <span className='ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-primary align-text-bottom' />
          )}
        </div>
      </CardContent>
    </Card>
  );
}