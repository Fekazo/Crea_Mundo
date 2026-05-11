import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
    return (
        <>
            <Head title="Configuración de Apariencia" />

            <h1 className="sr-only">Configuración de apariencia</h1>

            <div className="space-y-8">
                <div className="rounded-2xl bg-kids-blue bg-opacity-10 p-8 border-4 border-kids-blue shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-5xl hover:animate-bounce">🌞</span>
                        <div>
                            <h1 className="text-3xl font-black text-kids-blue">
                                ✨ Configuración de Apariencia
                            </h1>
                            <p className="text-base font-bold text-slate-700 mt-1">
                                Crea Mundo utiliza Light Mode para una mejor experiencia visual
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl bg-kids-yellow bg-opacity-10 p-8 border-4 border-kids-yellow shadow-lg">
                    <h2 className="text-3xl font-black text-kids-yellow mb-6 flex items-center gap-2">
                        💡 Tema Actual
                    </h2>
                    <p className="text-lg font-bold text-slate-700 mb-8">
                        El sistema está configurado en <span className="text-kids-yellow font-black">Light Mode</span> para garantizar claridad y facilidad de uso, especialmente para niños y familias. 🎨
                    </p>
                    <div className="rounded-2xl bg-kids-white p-8 border-4 border-kids-yellow shadow-lg">
                        <AppearanceTabs />
                    </div>
                </div>

                <div className="rounded-2xl bg-kids-green bg-opacity-10 p-8 border-4 border-kids-green shadow-lg">
                    <h3 className="text-3xl font-black text-kids-green mb-6 flex items-center gap-2">
                        🎯 Características de Diseño
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="rounded-2xl p-6 bg-kids-green bg-opacity-20 border-4 border-kids-green shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                            <p className="text-2xl font-black text-kids-green mb-2">🎨</p>
                            <p className="font-bold text-lg text-kids-green mb-1">Colores Vibrantes</p>
                            <p className="text-base font-bold text-slate-700">Interfaz amigable y segura para niños</p>
                        </div>
                        <div className="rounded-2xl p-6 bg-kids-green bg-opacity-20 border-4 border-kids-green shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                            <p className="text-2xl font-black text-kids-green mb-2">📖</p>
                            <p className="font-bold text-lg text-kids-green mb-1">Fácil Lectura</p>
                            <p className="text-base font-bold text-slate-700">Texto grande y legible para todos</p>
                        </div>
                        <div className="rounded-2xl p-6 bg-kids-green bg-opacity-20 border-4 border-kids-green shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                            <p className="text-2xl font-black text-kids-green mb-2">⭐</p>
                            <p className="font-bold text-lg text-kids-green mb-1">Bordes Suaves</p>
                            <p className="text-base font-bold text-slate-700">Elementos redondeados y seguros</p>
                        </div>
                        <div className="rounded-2xl p-6 bg-kids-green bg-opacity-20 border-4 border-kids-green shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                            <p className="text-2xl font-black text-kids-green mb-2">🎪</p>
                            <p className="font-bold text-lg text-kids-green mb-1">Espaciado Generoso</p>
                            <p className="text-base font-bold text-slate-700">Interfaz clara sin amontonamiento</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [
        {
            title: 'Configuración de Apariencia',
            href: editAppearance(),
        },
    ],
};
