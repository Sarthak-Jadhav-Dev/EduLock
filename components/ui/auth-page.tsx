'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Input } from './input';
import { cn } from '@/lib/utils';
import { NavBarDemo } from './navbar-demo';
import {
    AtSign,
    ChevronLeft,
    Github,
    Grid2x2,
    Loader2,
} from 'lucide-react';
import { sendOtp, verifyOtp } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

export function AuthPage() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await sendOtp(email);
            setStep('otp');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await verifyOtp(email, otp);
            if (data.token) {
                // Existing user: login success
                localStorage.setItem('token', data.token);
                if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/dashboard');
            }
        } catch (err: any) {
            console.error(err);
            if (err.response?.data?.needProfile) {
                // New user: store email & otp so complete-profile page can register
                localStorage.setItem('pendingEmail', email);
                localStorage.setItem('pendingOtp', otp);
                router.push('/complete-profile');
            } else {
                setError(err.response?.data?.error || 'Invalid OTP');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
            <NavBarDemo/>
            <div className="bg-muted/60 relative hidden h-full flex-col border-r p-10 lg:flex">
                <div className="from-background absolute inset-0 z-10 bg-linear-to-t to-transparent" />
                <div className="z-10 flex items-center gap-2">
                    <p className="text-xl font-semibold">EduLock</p>
                </div>
                <div className="z-10 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-xl">
                            &ldquo;This Platform has helped me to save time and serve my
                            Student faster than ever before.&rdquo;
                        </p>
                        <footer className="font-mono text-sm font-semibold">
                            ~ Best Teacher
                        </footer>
                    </blockquote>
                </div>
                <div className="absolute inset-0">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>
            </div>
            <div className="relative flex min-h-screen flex-col justify-center p-4">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate contain-strict -z-10 opacity-60"
                >
                    <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 right-0 h-320 w-140 -translate-y-87.5 rounded-full" />
                    <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 right-0 h-320 w-60 [translate:5%_-50%] rounded-full" />
                    <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 right-0 h-320 w-60 -translate-y-87.5 rounded-full" />
                </div>
                <Button variant="ghost" className="absolute top-7 left-5" asChild>
                    <a href="#">
                        <ChevronLeft className='size-4 me-2' />
                        Home
                    </a>
                </Button>
                <div className="mx-auto space-y-4 sm:w-sm">
                    <div className="flex items-center gap-2 lg:hidden">
                        <Grid2x2 className="size-6" />
                        <p className="text-xl font-semibold">EduLock</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <h1 className="font-heading text-2xl font-bold tracking-wide">
                            {step === 'email' ? 'Sign In or Join Now!' : 'Enter OTP'}
                        </h1>
                        <p className="text-muted-foreground text-base">
                            {step === 'email'
                                ? 'login or create your EduLock account.'
                                : `We sent a code to ${email}`}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 text-sm p-2 rounded-md">
                            {error}
                        </div>
                    )}

                    {step === 'email' ? (
                        <>
                            <div className="space-y-2">
                                <Button type="button" size="lg" className="w-full">
                                    <GoogleIcon className='size-4 me-2' />
                                    Continue with Google
                                </Button>
                                <Button type="button" size="lg" className="w-full">
                                    <AppleIcon className='size-4 me-2' />
                                    Continue with Apple
                                </Button>
                                <Button type="button" size="lg" className="w-full">
                                    <Github className='size-4 me-2' />
                                    Continue with GitHub
                                </Button>
                            </div>

                            <AuthSeparator />

                            <form onSubmit={handleSendOtp} className="space-y-2">
                                <p className="text-muted-foreground text-start text-xs">
                                    Enter your email address to sign in or create an account
                                </p>
                                <div className="relative h-max">
                                    <Input
                                        placeholder="your.email@example.com"
                                        className="peer ps-9"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                    <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                        <AtSign className="size-4" aria-hidden="true" />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait
                                        </>
                                    ) : (
                                        <span>Continue With Email</span>
                                    )}
                                </Button>
                            </form>
                        </>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-2">
                            <div className="relative h-max">
                                <Input
                                    placeholder="Enter OTP"
                                    className="peer ps-9"
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        <span>Verify OTP</span>
                                    )}
                                </Button>
                                <Button variant="ghost" type="button" onClick={() => setStep('email')} disabled={loading} className="w-full">
                                    Back to Email
                                </Button>
                            </div>
                        </form>
                    )}

                    <p className="text-muted-foreground mt-8 text-sm">
                        By clicking continue, you agree to our{' '}
                        <a
                            href="#"
                            className="hover:text-primary underline underline-offset-4"
                        >
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                            href="#"
                            className="hover:text-primary underline underline-offset-4"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </main>
    );
}

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="pointer-events-none absolute inset-0">
            <svg
                className="h-full w-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'linear',
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <g>
            <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
        </g>
    </svg>
);

const AppleIcon = (props: React.ComponentProps<'svg'>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.37-1.62 1.5 0 2.92.83 3.66 2.05-.12.1-.25.19-.36.29-.02.02-.03.04-.05.06-.06.07-.12.13-.18.2-.53.59-.9 1.12-1.12 1.63-.64 1.48-.34 3.4 1 4.7 0 .01-.01.02-.01.03-.68 2.04-1.66 3.62-2.39 4.89zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
);

const AuthSeparator = () => {
    return (
        <div className="flex w-full items-center justify-center">
            <div className="bg-border h-px w-full" />
            <span className="text-muted-foreground px-2 text-xs">OR</span>
            <div className="bg-border h-px w-full" />
        </div>
    );
};
