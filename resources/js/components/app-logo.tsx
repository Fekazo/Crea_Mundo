import { Link } from '@inertiajs/react';

export default function AppLogo() {
    return (
        <Link href="/" className="inline-flex items-center gap-2 font-black text-xl">
            <span className="text-3xl">📚</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Crea Mundo
            </span>
        </Link>
    );
}

