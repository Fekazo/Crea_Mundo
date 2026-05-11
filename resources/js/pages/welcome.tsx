import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;
    const { canRegister } = usePage().props as { canRegister: boolean };

    const registerButton = canRegister ? (
        <Link
            href={register() as string}
            className="flex-1 rounded-2xl bg-kids-yellow hover:bg-opacity-90 border-4 border-yellow-400 px-6 py-4 font-bold text-slate-900 shadow-lg transform hover:scale-105 transition text-center text-lg"
        >
            ✨ Registrarse
        </Link>
    ) : (
        <></>
    );

    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-linear-to-b from-kids-blue via-kids-white to-kids-green p-6 relative overflow-hidden">
                {/* Decoraciones flotantes de fondo */}
                <div className="absolute top-10 left-5 text-8xl opacity-30 hover:animate-floating">🎈</div>
                <div className="absolute top-32 right-8 text-7xl opacity-30 hover:animate-floating" style={{ animationDelay: '0.2s' }}>🌈</div>
                <div className="absolute bottom-40 left-10 text-8xl opacity-30 hover:animate-floating" style={{ animationDelay: '0.4s' }}>🎪</div>
                <div className="absolute bottom-10 right-5 text-7xl opacity-30 hover:animate-floating" style={{ animationDelay: '0.6s' }}>🎉</div>

                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="inline-block mb-4 animate-bounce">
                            <span className="text-9xl drop-shadow-lg">🚀</span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black text-kids-white mb-4 drop-shadow-lg">
                            ¡Bienvenido a Crea Mundo!
                        </h1>
                        <p className="text-2xl font-bold text-slate-800 mb-2">
                            La plataforma de educación más divertida
                        </p>
                        <p className="text-lg font-semibold text-slate-700">
                            Para docentes, padres y familias
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-kids-white rounded-3xl shadow-2xl p-8 md:p-12 border-6 border-kids-blue mb-8">
                        {/* CTA Section */}
                        {auth.user ? (
                            <div className="text-center space-y-6 mb-12">
                                <div className="text-6xl">🎓</div>
                                <p className="text-2xl font-black text-kids-green">
                                    ✅ ¡Ya estás registrado!
                                </p>
                                <p className="text-lg font-bold text-slate-700">
                                    Accede a tu panel de control y continúa aprendiendo
                                </p>
                                <Link
                                    href={dashboard() as string}
                                    className="inline-block rounded-2xl bg-kids-green hover:bg-opacity-90 border-4 border-green-600 px-12 py-5 font-black text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition text-xl"
                                >
                                    🚀 Ir al Panel de Control
                                </Link>
                            </div>
                        ) : (
                            <div className="text-center space-y-8 mb-12">
                                <div>
                                    <div className="text-6xl mb-3">👋</div>
                                    <p className="text-2xl font-black text-kids-blue">
                                        Comienza tu aventura hoy
                                    </p>
                                    <p className="text-lg font-bold text-slate-700 mt-2">
                                        Elige cómo deseas continuar:
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href={login() as string}
                                        className="flex-1 rounded-2xl border-4 border-kids-blue bg-white hover:bg-kids-blue hover:bg-opacity-10 px-6 py-5 font-bold text-kids-blue shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition text-center text-lg"
                                    >
                                        🔐 Iniciar Sesión
                                    </Link>
                                    {registerButton}
                                </div>
                            </div>
                        )}

                        {/* Divider */}
                        <div className="border-t-4 border-kids-yellow my-8"></div>

                        {/* Features Grid */}
                        <div>
                            <h2 className="text-4xl font-black text-center mb-8 text-kids-blue">
                                🎯 ¿Por qué elegirnos?
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Feature 1 */}
                                <div className="rounded-2xl bg-linear-to-br from-kids-blue via-kids-blue/50 to-kids-blue/30 p-6 border-4 border-kids-blue text-center hover:shadow-xl transition transform hover:scale-105">
                                    <div className="text-6xl mb-3 block">👨‍🏫</div>
                                    <h3 className="text-2xl font-black text-white mb-2">Docentes</h3>
                                    <p className="text-base font-bold text-white">
                                        Gestiona tus clases y el progreso de tus estudiantes
                                    </p>
                                </div>

                                {/* Feature 2 */}
                                <div className="rounded-2xl bg-linear-to-br from-kids-red via-kids-red/50 to-kids-red/30 p-6 border-4 border-kids-red text-center hover:shadow-xl transition transform hover:scale-105">
                                    <div className="text-6xl mb-3 block">👨‍👩‍👧‍👦</div>
                                    <h3 className="text-2xl font-black text-white mb-2">Familias</h3>
                                    <p className="text-base font-bold text-white">
                                        Conecta y colabora con los educadores
                                    </p>
                                </div>

                                {/* Feature 3 */}
                                <div className="rounded-2xl bg-linear-to-br from-kids-green via-kids-green/50 to-kids-green/30 p-6 border-4 border-kids-green text-center hover:shadow-xl transition transform hover:scale-105">
                                    <div className="text-6xl mb-3 block">📊</div>
                                    <h3 className="text-2xl font-black text-white mb-2">Seguimiento</h3>
                                    <p className="text-base font-bold text-white">
                                        Visualiza el progreso en tiempo real
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Welcome.layout = false;
