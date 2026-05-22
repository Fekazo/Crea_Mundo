import { Head, Link, useForm } from '@inertiajs/react';
import { GraduationCap, Loader2, Lock, Mail, Shield, User } from 'lucide-react';
import PasswordInput from '@/components/password-input';
import InputError from '@/components/input-error';
import admin from '@/routes/admin';

export default function AdminUsersCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        user_type: 'docente' as 'admin' | 'docente',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(admin.users.store().url);
    }

    return (
        <>
            <Head title="Nuevo usuario" />
            <div className="mx-auto max-w-lg p-6">
                <div className="card-kids border-0 p-8 animate-pop-in">

                    <div className="mb-7 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-purple shadow-lg">
                            <Shield className="h-7 w-7 text-white" strokeWidth={2} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Nuevo usuario
                            </h1>
                            <p className="text-sm font-semibold text-slate-500">
                                Crea un administrador o docente
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-4">

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <User className="h-4 w-4 text-kids-purple" strokeWidth={2.5} />
                                Nombre completo *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Nombre del usuario"
                                autoFocus
                                className="input-kids"
                            />
                            <InputError message={errors.name} className="text-xs font-bold text-kids-red" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <Mail className="h-4 w-4 text-kids-purple" strokeWidth={2.5} />
                                Correo electrónico *
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="correo@ejemplo.com"
                                className="input-kids"
                            />
                            <InputError message={errors.email} className="text-xs font-bold text-kids-red" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <Lock className="h-4 w-4 text-kids-purple" strokeWidth={2.5} />
                                Contraseña *
                            </label>
                            <PasswordInput
                                name="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                placeholder="Mínimo 8 caracteres"
                                className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition-all focus:border-kids-purple focus:ring-2 focus:ring-kids-purple/15 hover:border-slate-300 pr-10"
                            />
                            <InputError message={errors.password} className="text-xs font-bold text-kids-red" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">Rol *</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-all ${data.user_type === 'docente' ? 'border-kids-blue bg-kids-blue-light' : 'border-slate-200 bg-white hover:border-kids-blue hover:bg-kids-blue-light'}`}>
                                    <input
                                        type="radio"
                                        name="user_type"
                                        value="docente"
                                        checked={data.user_type === 'docente'}
                                        onChange={() => setData('user_type', 'docente')}
                                        className="accent-kids-blue"
                                    />
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl gradient-blue shadow-sm">
                                            <GraduationCap className="h-4 w-4 text-white" strokeWidth={2} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">Docente</span>
                                    </div>
                                </label>
                                <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-all ${data.user_type === 'admin' ? 'border-kids-purple bg-kids-purple-light' : 'border-slate-200 bg-white hover:border-kids-purple hover:bg-kids-purple-light'}`}>
                                    <input
                                        type="radio"
                                        name="user_type"
                                        value="admin"
                                        checked={data.user_type === 'admin'}
                                        onChange={() => setData('user_type', 'admin')}
                                        className="accent-kids-purple"
                                    />
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl gradient-purple shadow-sm">
                                            <Shield className="h-4 w-4 text-white" strokeWidth={2} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">Admin</span>
                                    </div>
                                </label>
                            </div>
                            <InputError message={errors.user_type} className="text-xs font-bold text-kids-red" />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-kids flex-1 gradient-purple text-white shadow-lg disabled:opacity-60"
                            >
                                {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                Crear usuario
                            </button>
                            <Link
                                href={admin.users.index().url}
                                className="btn-kids border-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            >
                                Cancelar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

AdminUsersCreate.layout = {
    breadcrumbs: [
        { title: 'Usuarios', href: admin.users.index().url },
        { title: 'Nuevo', href: admin.users.create().url },
    ],
};
