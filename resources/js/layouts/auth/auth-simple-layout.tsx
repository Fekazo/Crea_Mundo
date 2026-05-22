import { Link } from '@inertiajs/react';
import { BookOpen, Globe, Sparkles, Star, Zap } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div
            className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center p-6"
            style={{
                backgroundColor: '#FEFCF7',
                backgroundImage: 'radial-gradient(circle, #D8CFC4 1.5px, transparent 1.5px)',
                backgroundSize: '22px 22px',
            }}
        >
            {/* Gradient blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className="absolute -left-32 -top-32 h-72 w-72 rounded-full opacity-15"
                    style={{ background: 'radial-gradient(circle, #3B9EFF 0%, transparent 70%)', filter: 'blur(40px)' }}
                />
                <div
                    className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full opacity-15"
                    style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', filter: 'blur(40px)' }}
                />
            </div>

            {/* Floating decorative shapes */}
            <div className="absolute top-10 left-10 flex h-12 w-12 items-center justify-center rounded-2xl gradient-blue shadow-md opacity-50 animate-float pointer-events-none">
                <Star className="h-6 w-6 text-white" strokeWidth={2} />
            </div>
            <div className="absolute top-10 right-10 flex h-10 w-10 items-center justify-center rounded-xl gradient-green shadow-md opacity-50 animate-float pointer-events-none" style={{ animationDelay: '0.9s' }}>
                <Zap className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <div className="absolute bottom-14 left-10 flex h-10 w-10 items-center justify-center rounded-xl gradient-purple shadow-md opacity-40 animate-float pointer-events-none" style={{ animationDelay: '1.6s' }}>
                <Sparkles className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <div className="absolute bottom-14 right-10 flex h-12 w-12 items-center justify-center rounded-2xl gradient-yellow shadow-md opacity-40 animate-float pointer-events-none" style={{ animationDelay: '2.2s' }}>
                <BookOpen className="h-6 w-6 text-white" strokeWidth={2} />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-sm space-y-6">

                {/* Logo */}
                <div className="flex justify-center">
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-blue shadow-md">
                            <Globe className="h-6 w-6 text-white" strokeWidth={2.5} />
                        </div>
                        <span
                            className="text-xl font-bold"
                            style={{
                                fontFamily: 'Fredoka, Nunito, sans-serif',
                                background: 'linear-gradient(135deg, #7C3AED 0%, #3B9EFF 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Crea Mundo
                        </span>
                    </Link>
                </div>

                {/* Title & description */}
                {(title || description) && (
                    <div className="text-center">
                        {title && (
                            <h1
                                className="text-2xl font-bold text-slate-800"
                                style={{ fontFamily: 'Fredoka, Nunito, sans-serif' }}
                            >
                                {title}
                            </h1>
                        )}
                        {description && (
                            <p className="mt-1 text-sm font-semibold text-slate-500">{description}</p>
                        )}
                    </div>
                )}

                {/* Page content */}
                {children}
            </div>
        </div>
    );
}
