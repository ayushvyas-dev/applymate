'use client'

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
    ArrowRight,
    Sparkles,
    Target,
    FileText,
    BarChart3,
    BriefcaseBusiness,
    Zap,
    Shield,
    Star,
    CheckCircle2,
    ChevronRight,
    Users,
    TrendingUp,
    Clock,
} from 'lucide-react';



/* ─── animation helpers ─── */
const fade: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
};

const stagger: Variants = {
    visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── data ─── */
const features = [
    {
        icon: Target,
        title: 'Smart Job Board',
        description:
            'Aggregate listings across platforms. Filter, save, and track opportunities from a single unified dashboard.',
        gradient: 'from-violet-500/20 to-purple-500/20',
        iconColor: 'text-violet-500',
    },
    {
        icon: FileText,
        title: 'AI Resume Matcher',
        description:
            'Upload your resume and a job description — our AI scores compatibility and suggests targeted improvements.',
        gradient: 'from-blue-500/20 to-cyan-500/20',
        iconColor: 'text-blue-500',
    },
    {
        icon: Sparkles,
        title: 'Cover Letter Generator',
        description:
            'Generate tailored cover letters in seconds. Powered by AI that understands context and tone.',
        gradient: 'from-amber-500/20 to-orange-500/20',
        iconColor: 'text-amber-500',
    },
    {
        icon: BarChart3,
        title: 'Application Analytics',
        description:
            'Visualize your job search progress with real-time charts — response rates, interview funnel, and more.',
        gradient: 'from-emerald-500/20 to-green-500/20',
        iconColor: 'text-emerald-500',
    },
    {
        icon: BriefcaseBusiness,
        title: 'Pipeline Tracker',
        description:
            'Kanban-style pipeline to manage every application from "Applied" to "Offer". Never lose track again.',
        gradient: 'from-rose-500/20 to-pink-500/20',
        iconColor: 'text-rose-500',
    },
    {
        icon: Shield,
        title: 'Document Vault',
        description:
            'Store resumes, cover letters, and offer documents in one secure, organized space.',
        gradient: 'from-indigo-500/20 to-sky-500/20',
        iconColor: 'text-indigo-500',
    },
];

const stats = [
    { value: '10K+', label: 'Active Users', icon: Users },
    { value: '85%', label: 'Interview Rate', icon: TrendingUp },
    { value: '3×', label: 'Faster Applications', icon: Zap },
    { value: '24/7', label: 'AI Availability', icon: Clock },
];

const steps = [
    {
        step: '01',
        title: 'Create Your Profile',
        description:
            'Sign up and upload your resume to get started in under a minute.',
    },
    {
        step: '02',
        title: 'Discover & Match',
        description:
            'Browse jobs and let AI score how well your profile fits each role.',
    },
    {
        step: '03',
        title: 'Apply Smarter',
        description:
            'Generate tailored cover letters and track every application effortlessly.',
    },
];

const testimonials = [
    {
        name: 'Priya Sharma',
        role: 'Software Engineer at Google',
        quote:
            'ApplyMate cut my job search time in half. The resume matcher alone is worth it.',
        avatar: 'PS',
    },
    {
        name: 'Jake Reynolds',
        role: 'Product Designer at Stripe',
        quote:
            "I went from scattered spreadsheets to a clean pipeline. It's a game-changer.",
        avatar: 'JR',
    },
    {
        name: 'Maria Chen',
        role: 'Data Analyst at Meta',
        quote:
            'The AI cover letters were shockingly good. I landed 3 interviews in one week.',
        avatar: 'MC',
    },
];

/* ─── page ─── */
export default function MarketingClient() {

    return (
        <div className='min-h-screen overflow-hidden'>
            {/* ━━━ HERO ━━━ */}
            <section className='relative isolate pt-20 pb-28 sm:pt-28 sm:pb-36'>
                {/* background blobs */}
                <div
                    aria-hidden
                    className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
                >
                    <div className='absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl' />
                    <div className='absolute top-40 -right-40 h-[400px] w-[400px] rounded-full bg-chart-2/10 blur-3xl' />
                    <div className='absolute -bottom-20 -left-40 h-[350px] w-[350px] rounded-full bg-chart-3/8 blur-3xl' />
                </div>

                <div className='mx-auto max-w-4xl px-6 text-center'>
                    <motion.div initial='hidden' animate='visible' variants={stagger}>
                        {/* announcement badge */}
                        <motion.div variants={fade} custom={0} className='mb-6 inline-flex'>
                            <Badge
                                variant='outline'
                                className='gap-1.5 rounded-full px-3 py-1 text-xs font-medium'
                            >
                                <Zap className='size-3 text-primary' />
                                AI-Powered Job Search — Now in Beta
                                <ChevronRight className='size-3 text-muted-foreground' />
                            </Badge>
                        </motion.div>

                        {/* headline */}
                        <motion.h1
                            variants={fade}
                            custom={1}
                            className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'
                        >
                            Land Your Dream Job{' '}
                            <span className='bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent'>
                                Faster with AI
                            </span>
                        </motion.h1>

                        {/* subheading */}
                        <motion.p
                            variants={fade}
                            custom={2}
                            className='mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl'
                        >
                            Stop juggling spreadsheets. ApplyMate tracks every application,
                            matches your resume to jobs, and writes cover letters — so you can
                            focus on interviewing.
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div
                            variants={fade}
                            custom={3}
                            className='mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row'
                        >
                            <Button size='lg' className='h-11 px-6 text-base' asChild>
                                <Link href='/signup'>
                                    Get Started Free
                                    <ArrowRight className='ml-1.5 size-4' />
                                </Link>
                            </Button>
                            <Button
                                variant='outline'
                                size='lg'
                                className='h-11 px-6 text-base'
                                asChild
                            >
                                <Link href='/login'>Sign In</Link>
                            </Button>
                        </motion.div>

                        {/* social proof pill */}
                        <motion.div
                            variants={fade}
                            custom={4}
                            className='mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground'
                        >
                            <span className='flex -space-x-2'>
                                {['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4'].map(
                                    (bg, i) => (
                                        <span
                                            key={i}
                                            className={`inline-flex size-7 items-center justify-center rounded-full ${bg} ring-2 ring-background text-[10px] font-semibold text-white`}
                                        >
                                            {['A', 'B', 'C', 'D'][i]}
                                        </span>
                                    ),
                                )}
                            </span>
                            <span>
                                Joined by <strong className='text-foreground'>10,000+</strong>{' '}
                                job seekers
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Separator />

            {/* ━━━ STATS BAR ━━━ */}
            <section className='bg-muted/40 py-12'>
                <div className='mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 sm:grid-cols-4'>
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true, amount: 0.5 }}
                            variants={fade}
                            custom={i}
                            className='flex flex-col items-center text-center'
                        >
                            <s.icon className='mb-2 size-5 text-primary' />
                            <span className='text-2xl font-bold tracking-tight sm:text-3xl'>
                                {s.value}
                            </span>
                            <span className='text-xs text-muted-foreground'>{s.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Separator />

            {/* ━━━ FEATURES ━━━ */}
            <section className='py-24 sm:py-32'>
                <div className='mx-auto max-w-6xl px-6'>
                    <motion.div
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.3 }}
                        variants={stagger}
                        className='text-center'
                    >
                        <motion.div variants={fade} custom={0}>
                            <Badge variant='secondary' className='mb-4'>
                                <Star className='size-3' />
                                Features
                            </Badge>
                        </motion.div>
                        <motion.h2
                            variants={fade}
                            custom={1}
                            className='text-3xl font-bold tracking-tight sm:text-4xl'
                        >
                            Everything you need to{' '}
                            <span className='text-primary'>ace your job search</span>
                        </motion.h2>
                        <motion.p
                            variants={fade}
                            custom={2}
                            className='mx-auto mt-4 max-w-2xl text-muted-foreground'
                        >
                            From discovering roles to landing offers — ApplyMate gives you an
                            unfair advantage at every step.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.15 }}
                        variants={stagger}
                        className='mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
                    >
                        {features.map((f, i) => (
                            <motion.div key={f.title} variants={fade} custom={i}>
                                <Card className='group relative h-full transition-shadow hover:shadow-lg'>
                                    <CardHeader>
                                        <div
                                            className={`mb-2 inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${f.gradient}`}
                                        >
                                            <f.icon className={`size-5 ${f.iconColor}`} />
                                        </div>
                                        <CardTitle>{f.title}</CardTitle>
                                        <CardDescription>{f.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className='mt-auto'>
                                        <span className='inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100'>
                                            Learn more <ArrowRight className='size-3' />
                                        </span>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Separator />

            {/* ━━━ HOW IT WORKS ━━━ */}
            <section className='bg-muted/30 py-24 sm:py-32'>
                <div className='mx-auto max-w-4xl px-6'>
                    <motion.div
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.3 }}
                        variants={stagger}
                        className='text-center'
                    >
                        <motion.div variants={fade} custom={0}>
                            <Badge variant='secondary' className='mb-4'>
                                <Zap className='size-3' />
                                How It Works
                            </Badge>
                        </motion.div>
                        <motion.h2
                            variants={fade}
                            custom={1}
                            className='text-3xl font-bold tracking-tight sm:text-4xl'
                        >
                            Up and running in{' '}
                            <span className='text-primary'>three simple steps</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.2 }}
                        variants={stagger}
                        className='mt-16 grid gap-8 sm:grid-cols-3'
                    >
                        {steps.map((s, i) => (
                            <motion.div
                                key={s.step}
                                variants={fade}
                                custom={i}
                                className='relative flex flex-col items-center text-center'
                            >
                                <span className='mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-md'>
                                    {s.step}
                                </span>
                                <h3 className='text-lg font-semibold'>{s.title}</h3>
                                <p className='mt-2 text-sm text-muted-foreground'>
                                    {s.description}
                                </p>

                                {/* connector line */}
                                {i < steps.length - 1 && (
                                    <div
                                        aria-hidden
                                        className='absolute top-7 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] bg-border sm:block'
                                    />
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Separator />

            {/* ━━━ TESTIMONIALS ━━━ */}
            <section className='py-24 sm:py-32'>
                <div className='mx-auto max-w-6xl px-6'>
                    <motion.div
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.3 }}
                        variants={stagger}
                        className='text-center'
                    >
                        <motion.div variants={fade} custom={0}>
                            <Badge variant='secondary' className='mb-4'>
                                <Users className='size-3' />
                                Testimonials
                            </Badge>
                        </motion.div>
                        <motion.h2
                            variants={fade}
                            custom={1}
                            className='text-3xl font-bold tracking-tight sm:text-4xl'
                        >
                            Loved by{' '}
                            <span className='text-primary'>job seekers everywhere</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.15 }}
                        variants={stagger}
                        className='mt-16 grid gap-6 sm:grid-cols-3'
                    >
                        {testimonials.map((t, i) => (
                            <motion.div key={t.name} variants={fade} custom={i}>
                                <Card className='h-full'>
                                    <CardHeader>
                                        <div className='flex items-center gap-3'>
                                            <span className='inline-flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground'>
                                                {t.avatar}
                                            </span>
                                            <div>
                                                <CardTitle className='text-sm'>{t.name}</CardTitle>
                                                <CardDescription className='text-xs'>
                                                    {t.role}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className='mb-3 flex gap-0.5'>
                                            {Array.from({ length: 5 }).map((_, j) => (
                                                <Star
                                                    key={j}
                                                    className='size-3.5 fill-amber-400 text-amber-400'
                                                />
                                            ))}
                                        </div>
                                        <p className='text-sm text-muted-foreground leading-relaxed'>
                                            &ldquo;{t.quote}&rdquo;
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Separator />

            {/* ━━━ FINAL CTA ━━━ */}
            <section className='relative isolate py-24 sm:py-32'>
                <div
                    aria-hidden
                    className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
                >
                    <div className='absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl' />
                </div>

                <div className='mx-auto max-w-2xl px-6 text-center'>
                    <motion.div
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.4 }}
                        variants={stagger}
                    >
                        <motion.h2
                            variants={fade}
                            custom={0}
                            className='text-3xl font-bold tracking-tight sm:text-4xl'
                        >
                            Ready to supercharge your job search?
                        </motion.h2>
                        <motion.p
                            variants={fade}
                            custom={1}
                            className='mt-4 text-muted-foreground'
                        >
                            Join thousands of professionals who landed their dream roles with
                            ApplyMate. It&apos;s free to start — no credit card required.
                        </motion.p>
                        <motion.div
                            variants={fade}
                            custom={2}
                            className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'
                        >
                            <Button size='lg' className='h-11 px-6 text-base' asChild>
                                <Link href='/signup'>
                                    Get Started Free
                                    <ArrowRight className='ml-1.5 size-4' />
                                </Link>
                            </Button>
                            <Button
                                variant='ghost'
                                size='lg'
                                className='h-11 px-6 text-base'
                                asChild
                            >
                                <Link href='/login'>
                                    Already have an account?
                                    <ChevronRight className='ml-1 size-4' />
                                </Link>
                            </Button>
                        </motion.div>

                        {/* trust signals */}
                        <motion.div
                            variants={fade}
                            custom={3}
                            className='mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground'
                        >
                            {[
                                'No credit card required',
                                'Free forever plan',
                                'Cancel anytime',
                            ].map((t) => (
                                <span key={t} className='inline-flex items-center gap-1.5'>
                                    <CheckCircle2 className='size-3.5 text-emerald-500' />
                                    {t}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ━━━ FOOTER ━━━ */}
            <footer className='border-t bg-muted/30 py-8'>
                <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row'>
                    <span>
                        &copy; {new Date().getFullYear()} ApplyMate. All rights reserved.
                    </span>
                    <div className='flex gap-6'>
                        <Link href='#' className='hover:text-foreground transition-colors'>
                            Privacy
                        </Link>
                        <Link href='#' className='hover:text-foreground transition-colors'>
                            Terms
                        </Link>
                        <Link href='#' className='hover:text-foreground transition-colors'>
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
