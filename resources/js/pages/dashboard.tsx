import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-2xl p-6 bg-kids-white">
                {/* Header */}
                <div className="mb-4">
                    <div className="rounded-2xl bg-kids-blue bg-opacity-20 p-6 border-4 border-kids-blue">
                        <h1 className="text-5xl font-black text-kids-blue">
                            🎉 Panel de Control
                        </h1>
                        <p className="text-lg font-bold text-slate-700 mt-2">
                            Bienvenido a tu espacio de aprendizaje ✨
                        </p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border-4 border-kids-yellow bg-kids-yellow bg-opacity-10 shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105">
                        <div className="text-5xl mb-3">📚</div>
                        <p className="text-2xl font-black text-kids-yellow mb-1">125</p>
                        <p className="text-base font-bold text-slate-700">Recursos</p>
                    </div>
                    <div className="rounded-2xl border-4 border-kids-green bg-kids-green bg-opacity-10 shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105">
                        <div className="text-5xl mb-3">🎓</div>
                        <p className="text-2xl font-black text-kids-green mb-1">45</p>
                        <p className="text-base font-bold text-slate-700">Actividades</p>
                    </div>
                    <div className="rounded-2xl border-4 border-kids-red bg-kids-red bg-opacity-10 shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105">
                        <div className="text-5xl mb-3">⭐</div>
                        <p className="text-2xl font-black text-kids-red mb-1">89%</p>
                        <p className="text-base font-bold text-slate-700">Progreso</p>
                    </div>
                </div>

                {/* Modules */}
                <div>
                    <h2 className="text-3xl font-black text-kids-blue mb-6">📦 Módulos Disponibles</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Module 1 */}
                        <div className="rounded-2xl border-4 border-kids-blue bg-kids-blue bg-opacity-5 shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 text-center cursor-pointer">
                            <div className="text-6xl mb-4">👶</div>
                            <h3 className="text-2xl font-black text-kids-blue mb-3">
                                Gestión de Niños
                            </h3>
                            <p className="text-base font-bold text-slate-700 mb-6">
                                Administra los perfiles y datos de los niños
                            </p>
                            <button className="rounded-2xl bg-kids-blue hover:bg-opacity-90 border-3 border-blue-600 px-6 py-3 text-lg font-black text-white shadow-lg hover:shadow-xl transition-all">
                                🔄 Próximamente
                            </button>
                        </div>

                        {/* Module 2 */}
                        <div className="rounded-2xl border-4 border-kids-green bg-kids-green bg-opacity-5 shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 text-center cursor-pointer">
                            <div className="text-6xl mb-4">🎨</div>
                            <h3 className="text-2xl font-black text-kids-green mb-3">
                                Actividades Educativas
                            </h3>
                            <p className="text-base font-bold text-slate-700 mb-6">
                                Crea y asigna actividades divertidas
                            </p>
                            <button className="rounded-2xl bg-kids-green hover:bg-opacity-90 border-3 border-green-600 px-6 py-3 text-lg font-black text-white shadow-lg hover:shadow-xl transition-all">
                                🔄 Próximamente
                            </button>
                        </div>

                        {/* Module 3 */}
                        <div className="rounded-2xl border-4 border-kids-yellow bg-kids-yellow bg-opacity-5 shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 text-center cursor-pointer">
                            <div className="text-6xl mb-4">📊</div>
                            <h3 className="text-2xl font-black text-kids-yellow mb-3">
                                Progreso y Reportes
                            </h3>
                            <p className="text-base font-bold text-slate-700 mb-6">
                                Visualiza el progreso detallado
                            </p>
                            <button className="rounded-2xl bg-kids-yellow hover:bg-opacity-90 border-3 border-yellow-500 px-6 py-3 text-lg font-black text-slate-900 shadow-lg hover:shadow-xl transition-all">
                                🔄 Próximamente
                            </button>
                        </div>
                    </div>
                </div>

                {/* Featured Section */}
                <div className="rounded-2xl bg-kids-red bg-opacity-10 border-4 border-kids-red shadow-lg p-8 text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-3xl font-black text-kids-red mb-3">
                        ¡Más funcionalidades en camino!
                    </h3>
                    <p className="text-lg font-bold text-slate-700 mb-6">
                        Estamos desarrollando nuevas herramientas para mejorar tu experiencia educativa
                    </p>
                    <div className="inline-block rounded-2xl bg-kids-red hover:bg-opacity-90 border-3 border-red-600 px-8 py-4 text-lg font-black text-white shadow-lg hover:shadow-xl transition-all">
                        ⭐ Mantente Atento
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
