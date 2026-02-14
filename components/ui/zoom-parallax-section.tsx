'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import Lenis from '@studio-freight/lenis'
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { Button } from './button';
import Link from 'next/link';
import { Typewriter } from "@/components/ui/typewriter-text";

export default function ZoomParallaxSection() {

    React.useEffect(() => {
        const lenis = new Lenis()

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])


    const images = [
        {
            src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Modern architecture building',
        },
        {
            src: 'https://images.unsplash.com/photo-1652172100914-c5b691730756?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Urban cityscape at sunset',
        },
        {
            src: 'https://images.unsplash.com/photo-1681908571122-97f349e1ace0?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Abstract geometric pattern',
        },
        {
            src: 'https://images.unsplash.com/photo-1617839625591-e5a789593135?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Mountain landscape',
        },
        {
            src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Minimalist design elements',
        },
        {
            src: 'https://images.unsplash.com/photo-1735744583234-ff1829001965?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            alt: 'Ocean waves and beach',
        },
        {
            src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Forest trees and sunlight',
        },
    ];

    return (
        <section className="min-h-screen w-full">
            <div className="relative flex h-[50vh] items-center justify-center">
                {/* Radial spotlight */}
                <div
                    aria-hidden="true"
                    className={cn(
                        'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
                        'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
                        'blur-[30px]',
                    )}
                />
                <div className="flex flex-col items-center">
                    <h1 className="text-center text-4xl font-bold">
                        See EduLock in Action
                    </h1>
                    <Link href='/login'><Button className="mt-4">Get Started</Button></Link>
                </div>
            </div>
            <ZoomParallax images={images} />
            <div className="flex h-[50vh] w-full items-center justify-center bg-white text-black">
                <Typewriter
                    text={["Welcome to EduLock", "Secure Content Distribution", "Prevent Piracy"]}
                    speed={100}
                    loop={true}
                    className="text-4xl font-bold"
                />
            </div>
        </section>
    );
}
