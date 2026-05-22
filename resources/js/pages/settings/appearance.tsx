import { Head } from '@inertiajs/react';
import { BookOpen, Palette, Sparkles, Sun, Type } from 'lucide-react';
import AppearanceTabs from '@/components/appearance-tabs';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
    return (
        <>
            <Head title="Apariencia" />

            <div className="space-y-6">

                {/* Info banner */}
                <div className="card-kids border-0 p-6 animate-pop-in">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl gradient-purple shadow-md">
                            <Palette className="h-5 w-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Apariencia
                            </h2>
                            <p className="text-sm font-semibold text-slate-500">
                                Crea Mundo usa modo claro para mejor experiencia visual
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-kids-blue-light p-4">
                        <div className="flex items-center gap-3">
                            <Sun className="h-5 w-5 shrink-0 text-kids-blue" strokeWidth={2.5} />
                            <p className="text-sm font-semibold text-slate-600">
                                <span className="font-bold text-kids-blue">Modo claro</span> — optimizado para niños y familias con colores vibrantes y alta legibilidad.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Theme selector */}
                <div className="card-kids border-0 p-6 animate-pop-in" style={{ animationDelay: '0.1s' }}>
                    <h3 className="mb-4 text-base font-bold text-slate-700" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                        Tema
                    </h3>
                    <AppearanceTabs />
                </div>

                {/* Design features */}
                <div className="card-kids border-0 p-6 animate-pop-in" style={{ animationDelay: '0.2s' }}>
                    <h3 className="mb-4 text-base font-bold text-slate-700" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                        Características de diseño
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { icon: Palette, label: 'Colores vibrantes', desc: 'Interfaz amigable para niños', gradient: 'gradient-blue' },
                            { icon: BookOpen, label: 'Fácil lectura', desc: 'Texto grande y legible', gradient: 'gradient-green' },
                            { icon: Sparkles, label: 'Bordes suaves', desc: 'Elementos redondeados', gradient: 'gradient-purple' },
                            { icon: Type, label: 'Tipografía clara', desc: 'Fredoka y Nunito', gradient: 'gradient-orange' },
                        ].map(({ icon: Icon, label, desc, gradient }) => (
                            <div key={label} className="flex items-start gap-3 rounded-2xl border-2 border-slate-100 bg-white p-4">
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${gradient} shadow-sm`}>
                                    <Icon className="h-4 w-4 text-white" strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-700">{label}</p>
                                    <p className="text-xs font-medium text-slate-500">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [{ title: 'Apariencia', href: editAppearance() }],
};
