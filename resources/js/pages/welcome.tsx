import { Head, Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Globe,
    LayoutDashboard,
    LogIn,
    Rocket,
    Sparkles,
    Star,
    TrendingUp,
    UserPlus,
    Users,
    Zap,
} from 'lucide-react';
import { dashboard, login, register } from '@/routes';

type Auth = { user: { name: string } | null };

export default function Welcome() {
    const { auth, canRegister } = usePage().props as unknown as { auth: Auth; canRegister: boolean };

    return (
        <>
            <Head title="Crea Mundo — Plataforma Educativa" />

            <div
                className="min-h-screen"
                style={{
                    backgroundColor: '#FEFCF7',
                    backgroundImage: 'radial-gradient(circle, #D8CFC4 1.5px, transparent 1.5px)',
                    backgroundSize: '22px 22px',
                }}
            >
                {/* Gradient blobs */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #3B9EFF 0%, transparent 70%)', filter: 'blur(50px)' }} />
                    <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', filter: 'blur(50px)' }} />
                    <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #06D6A0 0%, transparent 70%)', filter: 'blur(60px)' }} />
                </div>

                <div className="relative z-10 flex min-h-screen flex-col">

                    {/* Nav */}
                    <nav className="flex items-center justify-between p-6">
                        <div className="inline-flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-blue shadow-md">
                                <Globe className="h-5 w-5 text-white" strokeWidth={2.5} />
                            </div>
                            <span
                                className="text-lg font-bold"
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

                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link href={dashboard().url} className="btn-kids gradient-blue text-white shadow-md">
                                    <LayoutDashboard className="h-4 w-4" strokeWidth={2.5} />
                                    Mi Panel
                                </Link>
                            ) : (
                                <>
                                    <Link href={login().url} className="btn-kids border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
                                        <LogIn className="h-4 w-4" strokeWidth={2.5} />
                                        Iniciar sesión
                                    </Link>
                                    {canRegister && (
                                        <Link href={register().url} className="btn-kids gradient-blue text-white shadow-md hidden sm:inline-flex">
                                            <UserPlus className="h-4 w-4" strokeWidth={2.5} />
                                            Registrarse
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>

                    {/* Hero */}
                    <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">

                        <div className="w-full max-w-5xl">

                            {/* Main hero card */}
                            <div className="overflow-hidden rounded-3xl gradient-blue shadow-2xl animate-pop-in">
                                <div className="grid md:grid-cols-2">

                                    {/* Left: Brand */}
                                    <div className="relative flex flex-col justify-center p-10 text-white">
                                        {/* Decorative */}
                                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 animate-float" />
                                        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/10 animate-float" style={{ animationDelay: '1.2s' }} />
                                        <Sparkles className="absolute right-8 bottom-8 h-8 w-8 text-white/20 animate-spin-slow" />

                                        <div className="relative z-10">
                                            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm animate-bounce-in">
                                                <Globe className="h-11 w-11 text-white" strokeWidth={1.5} />
                                            </div>

                                            <h1
                                                className="mb-2 text-4xl font-bold leading-tight md:text-5xl"
                                                style={{ fontFamily: 'Fredoka, Nunito, sans-serif' }}
                                            >
                                                Crea Mundo
                                            </h1>
                                            <p className="mb-6 text-lg font-semibold text-white/80">
                                                La plataforma educativa más divertida para niños
                                            </p>

                                            <div className="space-y-3">
                                                {[
                                                    { icon: BookOpen, text: 'Actividades interactivas' },
                                                    { icon: Zap, text: 'Quiz, videos y flashcards' },
                                                    { icon: TrendingUp, text: 'Seguimiento del progreso' },
                                                ].map(({ icon: Icon, text }) => (
                                                    <div key={text} className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                                            <Icon className="h-4 w-4 text-white" strokeWidth={2} />
                                                        </div>
                                                        <span className="text-sm font-semibold text-white/90">{text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: CTA card */}
                                    <div className="flex items-center justify-center p-8">
                                        <div className="w-full rounded-3xl bg-white p-8 shadow-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                            {auth.user ? (
                                                <div className="text-center space-y-5">
                                                    <div className="flex justify-center">
                                                        <div className="flex h-16 w-16 items-center justify-center rounded-3xl gradient-green shadow-lg animate-float">
                                                            <Star className="h-8 w-8 text-white" strokeWidth={2} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                                            ¡Ya estás dentro!
                                                        </h2>
                                                        <p className="mt-1 text-sm font-semibold text-slate-500">
                                                            Continúa tu aventura de aprendizaje
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href={dashboard().url}
                                                        className="btn-kids w-full justify-center gradient-blue text-white shadow-lg"
                                                    >
                                                        <Rocket className="h-4 w-4" strokeWidth={2.5} />
                                                        Ir al Panel
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="text-center mb-6">
                                                        <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                                            ¡Comienza hoy!
                                                        </h2>
                                                        <p className="mt-1 text-sm font-semibold text-slate-500">
                                                            Elige cómo deseas continuar
                                                        </p>
                                                    </div>

                                                    <Link
                                                        href={login().url}
                                                        className="btn-kids w-full justify-center gradient-blue text-white shadow-lg"
                                                    >
                                                        <LogIn className="h-4 w-4" strokeWidth={2.5} />
                                                        Iniciar sesión
                                                    </Link>

                                                    {canRegister && (
                                                        <Link
                                                            href={register().url}
                                                            className="btn-kids w-full justify-center border-2 border-kids-green bg-white text-kids-green hover:bg-kids-green-light"
                                                        >
                                                            <UserPlus className="h-4 w-4" strokeWidth={2.5} />
                                                            Crear cuenta gratis
                                                        </Link>
                                                    )}

                                                    <p className="text-center text-xs font-semibold text-slate-400">
                                                        Para docentes, padres y familias
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Feature cards */}
                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                {[
                                    {
                                        icon: BookOpen,
                                        title: 'Docentes',
                                        desc: 'Crea materias y actividades interactivas para tus estudiantes',
                                        gradient: 'gradient-blue',
                                        delay: '0.1s',
                                    },
                                    {
                                        icon: Users,
                                        title: 'Familias',
                                        desc: 'Conecta con los educadores y sigue el progreso de tus hijos',
                                        gradient: 'gradient-green',
                                        delay: '0.18s',
                                    },
                                    {
                                        icon: TrendingUp,
                                        title: 'Seguimiento',
                                        desc: 'Visualiza estadísticas y el progreso en tiempo real',
                                        gradient: 'gradient-purple',
                                        delay: '0.26s',
                                    },
                                ].map(({ icon: Icon, title, desc, gradient, delay }) => (
                                    <div
                                        key={title}
                                        className="card-kids border-0 overflow-hidden animate-pop-in"
                                        style={{ animationDelay: delay }}
                                    >
                                        <div className={`${gradient} p-5`}>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                                                <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                                {title}
                                            </h3>
                                            <p className="mt-1 text-sm font-medium text-slate-500">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="py-6 text-center text-xs font-semibold text-slate-400">
                        © {new Date().getFullYear()} Crea Mundo — Plataforma educativa para niños
                    </footer>
                </div>
            </div>
        </>
    );
}

Welcome.layout = false;
