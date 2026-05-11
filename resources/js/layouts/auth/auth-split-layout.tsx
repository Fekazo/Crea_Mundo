import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="relative grid min-h-screen grid-cols-1 lg:grid-cols-2">
            {/* Left side - Colorful gradient */}
            <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-green-400 via-emerald-300 to-lime-300 p-10 text-white overflow-hidden">
                {/* Decorations */}
                <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-80">🌳</div>
                <div className="absolute bottom-20 right-10 text-6xl animate-pulse opacity-80" style={{ animationDelay: '0.5s' }}>🌻</div>

                <div className="relative z-20">
                    <Link
                        href={home()}
                        className="flex items-center text-2xl font-black"
                    >
                        <div className="mr-3 flex h-10 w-10 items-center justify-center bg-white rounded-full">
                            <AppLogoIcon className="size-6 fill-current text-green-600" />
                        </div>
                        <span className="text-white drop-shadow-lg">Crea Mundo</span>
                    </Link>
                </div>

                <div className="relative z-20 space-y-4">
                    <h2 className="text-3xl font-black drop-shadow-lg">¡Bienvenido!</h2>
                    <p className="text-lg font-bold drop-shadow-lg">
                        Tu plataforma de educación integral
                    </p>
                </div>
            </div>

            {/* Right side - Content */}
            <div className="w-full lg:p-8 bg-white lg:bg-gradient-to-br lg:from-orange-50 lg:to-yellow-50">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 px-6 py-8 sm:w-[350px] sm:px-0 lg:p-0">
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center lg:hidden"
                    >
                        <div className="flex h-12 w-12 items-center justify-center bg-gradient-to-br from-green-400 to-emerald-400 rounded-full shadow-lg">
                            <AppLogoIcon className="h-8 fill-current text-white" />
                        </div>
                    </Link>

                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {title}
                        </h1>
                        <p className="text-sm text-balance font-semibold text-green-700">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
