import { Globe } from 'lucide-react';

export default function AppLogo() {
    return (
        <div className="inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl gradient-blue shadow-md">
                <Globe className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span
                className="text-lg font-bold leading-none"
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
        </div>
    );
}
