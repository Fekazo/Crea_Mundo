import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { home } from '@/routes';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-cyan-300 via-blue-200 to-teal-300 p-6 md:p-10 relative overflow-hidden">
            {/* Decoraciones flotantes */}
            <div className="absolute top-20 left-10 text-6xl animate-bounce">🌟</div>
            <div className="absolute top-40 right-20 text-5xl animate-pulse">🎪</div>
            <div className="absolute bottom-20 left-20 text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎸</div>
            <div className="absolute bottom-10 right-10 text-6xl animate-pulse" style={{ animationDelay: '0.7s' }}>🎮</div>

            <div className="flex w-full max-w-md flex-col gap-6 relative z-10">
                <Link
                    href={home()}
                    className="flex items-center justify-center gap-2 self-center font-medium"
                >
                    <div className="flex h-12 w-12 items-center justify-center bg-white rounded-full shadow-lg border-2 border-cyan-300">
                        <AppLogoIcon className="size-8 fill-current text-cyan-600" />
                    </div>
                </Link>

                <div className="flex flex-col gap-6">
                    <Card className="rounded-3xl border-4 border-cyan-200 shadow-2xl">
                        <CardHeader className="px-10 pt-8 pb-0 text-center">
                            <CardTitle className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                                {title}
                            </CardTitle>
                            <CardDescription className="text-base font-semibold text-cyan-700">
                                {description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-10 py-8">
                            {children}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
