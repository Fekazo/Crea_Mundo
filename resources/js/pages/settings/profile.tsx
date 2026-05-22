import { Form, Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle, GraduationCap, Mail, Save, User, Users } from 'lucide-react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Configuración de perfil" />

            <div className="space-y-6">
                <div className="card-kids border-0 p-6 space-y-5 animate-pop-in">

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl gradient-blue shadow-md">
                            <User className="h-5 w-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Información del perfil
                            </h2>
                            <p className="text-sm font-semibold text-slate-500">
                                Actualiza tu nombre, email y tipo de usuario
                            </p>
                        </div>
                    </div>

                    <Form
                        {...ProfileController.update.form()}
                        options={{ preserveScroll: true }}
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <div className="space-y-4">

                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                        <User className="h-4 w-4 text-kids-blue" strokeWidth={2.5} />
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={auth.user.name}
                                        required
                                        autoComplete="name"
                                        placeholder="Tu nombre completo"
                                        className="input-kids"
                                    />
                                    <InputError message={errors.name} className="text-xs font-bold text-kids-red" />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                        <Mail className="h-4 w-4 text-kids-blue" strokeWidth={2.5} />
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={auth.user.email}
                                        required
                                        autoComplete="username"
                                        placeholder="tu.email@ejemplo.com"
                                        className="input-kids"
                                    />
                                    <InputError message={errors.email} className="text-xs font-bold text-kids-red" />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                        <Users className="h-4 w-4 text-kids-green" strokeWidth={2.5} />
                                        Tipo de usuario
                                    </label>
                                    <RadioGroup
                                        name="user_type"
                                        defaultValue={(auth.user as any).user_type || 'padre'}
                                        className="grid grid-cols-2 gap-3"
                                    >
                                        <label
                                            htmlFor="padre"
                                            className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white p-4 transition-all hover:border-kids-green hover:bg-kids-green-light"
                                        >
                                            <RadioGroupItem value="padre" id="padre" className="shrink-0" />
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl gradient-green shadow-sm">
                                                    <Users className="h-4 w-4 text-white" strokeWidth={2} />
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">Padre</span>
                                            </div>
                                        </label>
                                        <label
                                            htmlFor="docente"
                                            className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white p-4 transition-all hover:border-kids-blue hover:bg-kids-blue-light"
                                        >
                                            <RadioGroupItem value="docente" id="docente" className="shrink-0" />
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl gradient-blue shadow-sm">
                                                    <GraduationCap className="h-4 w-4 text-white" strokeWidth={2} />
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">Docente</span>
                                            </div>
                                        </label>
                                    </RadioGroup>
                                    <InputError message={(errors as any).user_type} className="text-xs font-bold text-kids-red" />
                                </div>

                                {mustVerifyEmail && auth.user.email_verified_at === null && (
                                    <div className="rounded-2xl border-2 border-kids-yellow bg-kids-yellow-light p-4">
                                        <p className="text-sm font-semibold text-slate-700">
                                            Tu correo no está verificado.{' '}
                                            <Link
                                                href={send()}
                                                as="button"
                                                className="font-bold text-kids-yellow underline"
                                            >
                                                Reenviar correo de verificación.
                                            </Link>
                                        </p>
                                        {status === 'verification-link-sent' && (
                                            <div className="mt-3 flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 shrink-0 text-kids-green" strokeWidth={2.5} />
                                                <p className="text-sm font-bold text-kids-green">
                                                    Enlace de verificación enviado.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    data-test="update-profile-button"
                                    className="btn-kids w-full gradient-blue text-white shadow-lg disabled:opacity-60"
                                >
                                    {processing ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" strokeWidth={2.5} />
                                            Guardar cambios
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </Form>
                </div>

                <DeleteUser />
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [{ title: 'Configuración de perfil', href: edit() }],
};
