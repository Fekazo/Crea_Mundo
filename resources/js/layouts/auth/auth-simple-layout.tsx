import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-kids-white p-6 md:p-10 relative overflow-hidden">
            {/* Decoraciones flotantes */}
            <div className="absolute top-20 left-10 text-6xl hover:animate-floating opacity-30">🎈</div>
            <div className="absolute top-40 right-20 text-5xl hover:animate-floating opacity-30" style={{ animationDelay: '0.2s' }}>⭐</div>
            <div className="absolute bottom-20 left-20 text-5xl hover:animate-floating opacity-30" style={{ animationDelay: '0.4s' }}>🎨</div>
            <div className="absolute bottom-10 right-10 text-6xl hover:animate-floating opacity-30" style={{ animationDelay: '0.6s' }}>🎭</div>

            <div className="w-full max-w-sm relative z-10">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-full bg-kids-blue shadow-lg border-4 border-kids-blue hover:scale-110 transition">
                                <AppLogoIcon className="size-8 fill-current text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-black text-kids-blue">
                                {title}
                            </h1>
                            <p className="text-center text-sm font-semibold text-slate-700">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
