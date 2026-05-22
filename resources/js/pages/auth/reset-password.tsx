import { Form, Head } from '@inertiajs/react';
import { KeyRound, Lock, Mail, ShieldCheck } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { update } from '@/routes/password';

type Props = { token: string; email: string };

export default function ResetPassword({ token, email }: Props) {
    return (
        <>
            <Head title="Nueva contraseña" />

            <div className="card-kids border-0 p-8 space-y-5 animate-pop-in">
                <Form
                    {...update.form()}
                    transform={(data) => ({ ...data, token, email })}
                    resetOnSuccess={['password', 'password_confirmation']}
                    className="space-y-4"
                >
                    {({ processing, errors }) => (
                        <div className="space-y-4">

                            {/* Email (readonly) */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <Mail className="h-4 w-4 text-kids-blue" strokeWidth={2.5} />
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    readOnly
                                    className="input-kids bg-slate-50 text-slate-500 cursor-not-allowed"
                                />
                                <InputError message={errors.email} className="text-xs font-bold text-kids-red" />
                            </div>

                            {/* New password */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <Lock className="h-4 w-4 text-kids-purple" strokeWidth={2.5} />
                                    Nueva contraseña
                                </label>
                                <PasswordInput
                                    name="password"
                                    autoComplete="new-password"
                                    autoFocus
                                    placeholder="Mínimo 8 caracteres"
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition-all focus:border-kids-purple focus:ring-2 focus:ring-kids-purple/15 hover:border-slate-300 pr-10"
                                />
                                <InputError message={errors.password} className="text-xs font-bold text-kids-red" />
                            </div>

                            {/* Confirm password */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <KeyRound className="h-4 w-4 text-kids-purple" strokeWidth={2.5} />
                                    Confirmar contraseña
                                </label>
                                <PasswordInput
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    placeholder="Confirma tu nueva contraseña"
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition-all focus:border-kids-purple focus:ring-2 focus:ring-kids-purple/15 hover:border-slate-300 pr-10"
                                />
                                <InputError message={errors.password_confirmation} className="text-xs font-bold text-kids-red" />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-kids w-full gradient-purple text-white shadow-lg disabled:opacity-60"
                                data-test="reset-password-button"
                            >
                                {processing ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Actualizando...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="h-4 w-4" strokeWidth={2.5} />
                                        Actualizar contraseña
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </Form>
            </div>
        </>
    );
}

ResetPassword.layout = {
    title: 'Nueva contraseña',
    description: 'Crea una contraseña segura para tu cuenta',
};
