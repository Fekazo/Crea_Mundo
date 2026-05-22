import { Head, Link, router } from '@inertiajs/react';
import { GraduationCap, Plus, Shield, Trash2 } from 'lucide-react';
import admin from '@/routes/admin';

type User = {
    id: number;
    name: string;
    email: string;
    user_type: 'admin' | 'docente';
    created_at: string;
};

export default function AdminUsersIndex({ users }: { users: User[] }) {
    function destroy(user: User) {
        if (!confirm(`¿Eliminar a "${user.name}"?`)) return;
        router.delete(admin.users.destroy(user.id).url);
    }

    const TYPE_CONFIG = {
        admin: { label: 'Administrador', bg: 'bg-kids-purple-light', text: 'text-kids-purple', icon: Shield },
        docente: { label: 'Docente', bg: 'bg-kids-blue-light', text: 'text-kids-blue', icon: GraduationCap },
    };

    return (
        <>
            <Head title="Usuarios del sistema" />
            <div className="flex flex-1 flex-col gap-6 p-6">

                <div className="flex items-center justify-between animate-slide-up">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-purple shadow-md">
                            <Shield className="h-6 w-6 text-white" strokeWidth={2} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Usuarios del sistema
                            </h1>
                            <p className="text-sm font-semibold text-slate-500">
                                Administradores y docentes
                            </p>
                        </div>
                    </div>
                    <Link href={admin.users.create().url} className="btn-kids gradient-purple text-white shadow-md">
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                        Nuevo usuario
                    </Link>
                </div>

                <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                    {users.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-sm font-semibold text-slate-400">No hay usuarios registrados</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-slate-100">
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">Usuario</th>
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">Correo</th>
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">Rol</th>
                                    <th className="px-5 py-4" />
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => {
                                    const cfg = TYPE_CONFIG[user.user_type];
                                    const Icon = cfg.icon;
                                    return (
                                        <tr key={user.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-purple text-white text-sm font-bold shadow-sm">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <p className="font-bold text-slate-800">{user.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="text-sm font-semibold text-slate-500">{user.email}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-flex items-center gap-1.5 rounded-xl ${cfg.bg} px-3 py-1 text-xs font-bold ${cfg.text}`}>
                                                    <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                                                    {cfg.label}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <button
                                                    onClick={() => destroy(user)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-500 transition hover:border-kids-red hover:text-kids-red ml-auto"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

AdminUsersIndex.layout = {
    breadcrumbs: [{ title: 'Usuarios del sistema', href: admin.users.index().url }],
};
