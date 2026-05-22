import { Link } from '@inertiajs/react';
import { Paintbrush, Settings, ShieldCheck, User } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';

const sidebarNavItems = [
    { title: 'Perfil', href: edit(), icon: User, color: 'text-kids-blue', gradient: 'gradient-blue' },
    { title: 'Seguridad', href: editSecurity(), icon: ShieldCheck, color: 'text-kids-red', gradient: 'gradient-red' },
    { title: 'Apariencia', href: editAppearance(), icon: Paintbrush, color: 'text-kids-purple', gradient: 'gradient-purple' },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className="flex flex-1 flex-col gap-6 p-6">

            {/* Header */}
            <div className="flex items-center gap-3 animate-slide-up">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-blue shadow-md">
                    <Settings className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                        Configuración
                    </h1>
                    <p className="text-sm font-semibold text-slate-500">
                        Administra tu perfil y cuenta
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">

                {/* Sidebar nav */}
                <aside className="w-full lg:w-52 shrink-0">
                    <nav className="flex flex-row gap-2 lg:flex-col">
                        {sidebarNavItems.map((item) => {
                            const active = isCurrentOrParentUrl(item.href);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={toUrl(item.href)}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-150 ${
                                        active
                                            ? `${item.gradient} text-white shadow-md`
                                            : 'bg-white text-slate-600 hover:bg-kids-purple-light hover:text-kids-purple'
                                    }`}
                                    style={active ? { boxShadow: '0 4px 14px rgba(124,58,237,0.25)' } : {}}
                                >
                                    <Icon className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="max-w-2xl space-y-6">
                        {children}
                    </div>
                </div>

            </div>
        </div>
    );
}
