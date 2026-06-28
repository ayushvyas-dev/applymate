'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { MatchResult } from './ResumeMatcherClient';
import {
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Target,
} from 'lucide-react';

function getScoreColor(score: number) {
  if (score >= 75) return 'text-emerald-500';
  if (score >= 50) return 'text-amber-500';
  return 'text-destructive';
}

function getScoreRingColor(score: number) {
  if (score >= 75) return 'stroke-emerald-500';
  if (score >= 50) return 'stroke-amber-500';
  return 'stroke-destructive';
}

function getScoreLabel(score: number) {
  if (score >= 75) return 'Strong Match';
  if (score >= 50) return 'Moderate Match';
  return 'Needs Improvement';
}

function getScoreBadgeVariant(score: number): 'default' | 'secondary' | 'destructive' {
  if (score >= 75) return 'default';
  if (score >= 50) return 'secondary';
  return 'destructive';
}

function getProgressColor(score: number) {
  if (score >= 75) return '[&>[data-slot=progress-indicator]]:bg-emerald-500';
  if (score >= 50) return '[&>[data-slot=progress-indicator]]:bg-amber-500';
  return '[&>[data-slot=progress-indicator]]:bg-destructive';
}

interface ResumeMatcherResultProps {
  result: MatchResult | null;
  isLoading: boolean;
}

export default function ResumeMatcherResult({
  result,
  isLoading,
}: ResumeMatcherResultProps) {
  /* ── Loading state ── */
  if (isLoading) {
    return (
      <Card className='flex flex-col items-center justify-center py-20 shadow-lg'>
        <Spinner className='size-8 text-primary' />
        <p className='mt-4 text-sm font-medium text-muted-foreground animate-pulse'>
          Analysing your resume against the job description…
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
        <h3 className='text-lg font-semibold'>No analysis yet</h3>
        <p className='mt-1 max-w-sm text-sm text-muted-foreground'>
          Select a job and resume from the configuration panel, then click
          &quot;Match Resume&quot; to get your ATS score and improvement tips.
        </p>
      </div>
    );
  }

  /* ── Result display ── */
  const score = result.atsScore;

  // SVG ring gauge constants
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className='space-y-6'>
      {/* ── ATS Score Card ── */}
      <Card className='shadow-lg'>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <span className='inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
              <Target className='size-4 text-primary' />
            </span>
            <div>
              <CardTitle className='text-lg'>ATS Score</CardTitle>
              <CardDescription>
                How well your resume matches the job description
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className='flex flex-col items-center gap-6 sm:flex-row'>
            {/* Circular gauge */}
            <div className='relative flex shrink-0 items-center justify-center'>
              <svg
                width='140'
                height='140'
                viewBox='0 0 140 140'
                className='-rotate-90'
              >
                {/* Track */}
                <circle
                  cx='70'
                  cy='70'
                  r={radius}
                  fill='none'
                  strokeWidth='10'
                  className='stroke-muted'
                />
                {/* Progress arc */}
                <circle
                  cx='70'
                  cy='70'
                  r={radius}
                  fill='none'
                  strokeWidth='10'
                  strokeLinecap='round'
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  className={`${getScoreRingColor(score)} transition-all duration-700`}
                />
              </svg>
              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </span>
                <span className='text-xs text-muted-foreground'>/100</span>
              </div>
            </div>

            {/* Score details */}
            <div className='flex-1 space-y-3 w-full'>
              <div className='flex items-center gap-2'>
                <Badge variant={getScoreBadgeVariant(score)}>
                  {getScoreLabel(score)}
                </Badge>
              </div>
              <Progress
                value={score}
                className={`h-2 ${getProgressColor(score)}`}
              />
              <p className='text-sm text-muted-foreground'>
                Your resume scored <span className='font-semibold text-foreground'>{score}/100</span> against this job description.
                {score >= 75
                  ? ' Great match — your resume is well-aligned.'
                  : score >= 50
                    ? ' Decent foundation, but some gaps remain.'
                    : ' Consider tailoring your resume more closely.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Section cards grid ── */}
      <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-3'>
        {/* Missing Requirements */}
        <Card className='shadow-lg'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-3'>
              <span className='inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10'>
                <AlertTriangle className='size-4 text-destructive' />
              </span>
              <div>
                <CardTitle className='text-base'>What is Missing</CardTitle>
                <CardDescription className='text-xs'>
                  Requirements not found in your resume
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className='pt-4'>
            {result.missingRequirements.length === 0 ? (
              <p className='text-sm text-muted-foreground italic'>
                Nothing missing — well done!
              </p>
            ) : (
              <ul className='space-y-2'>
                {result.missingRequirements.map((item, index) => (
                  <li
                    key={index}
                    className='rounded-lg bg-destructive/5 p-3 text-sm leading-relaxed'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Improvements */}
        <Card className='shadow-lg'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-3'>
              <span className='inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10'>
                <Lightbulb className='size-4 text-amber-500' />
              </span>
              <div>
                <CardTitle className='text-base'>
                  What Could Be Improved
                </CardTitle>
                <CardDescription className='text-xs'>
                  Suggestions to strengthen your resume
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className='pt-4'>
            {result.improvements.length === 0 ? (
              <p className='text-sm text-muted-foreground italic'>
                No improvements suggested.
              </p>
            ) : (
              <ul className='space-y-2'>
                {result.improvements.map((item, index) => (
                  <li
                    key={index}
                    className='rounded-lg bg-amber-500/5 p-3 text-sm leading-relaxed'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Strengths */}
        <Card className='shadow-lg'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-3'>
              <span className='inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10'>
                <CheckCircle2 className='size-4 text-emerald-500' />
              </span>
              <div>
                <CardTitle className='text-base'>
                  What Fits the Job
                </CardTitle>
                <CardDescription className='text-xs'>
                  Strengths that align with requirements
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className='pt-4'>
            {result.strengths.length === 0 ? (
              <p className='text-sm text-muted-foreground italic'>
                No strengths identified.
              </p>
            ) : (
              <ul className='space-y-2'>
                {result.strengths.map((item, index) => (
                  <li
                    key={index}
                    className='rounded-lg bg-emerald-500/5 p-3 text-sm leading-relaxed'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
