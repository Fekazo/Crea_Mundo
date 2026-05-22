import { Form, Head } from '@inertiajs/react';
import { Lock, ShieldCheck } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirmar contraseña" />

            <div className="card-kids border-0 p-8 space-y-5 animate-pop-in">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl gradient-purple shadow-lg animate-float">
                        <Lock className="h-8 w-8 text-white" strokeWidth={2} />
                    </div>
                </div>

                {/* Info */}
                <div className="rounded-2xl bg-kids-blue-light p-4 text-sm font-semibold text-slate-600 text-center">
                    Esta es un área segura. Confirma tu contraseña para continuar.
                </div>

                <Form {...store.form()} resetOnSuccess={['password']} className="space-y-4">
                    {({ processing, errors }) => (
                        <div className="space-y-4">

                            <div className="space-y-1.5">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <Lock className="h-4 w-4 text-kids-purple" strokeWidth={2.5} />
                                    Contraseña
                                </label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    placeholder="Ingresa tu contraseña"
                                    autoComplete="current-password"
                                    autoFocus
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition-all focus:border-kids-purple focus:ring-2 focus:ring-kids-purple/15 hover:border-slate-300 pr-10"
                                />
                                <InputError message={errors.password} className="text-xs font-bold text-kids-red" />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                data-test="confirm-password-button"
                                className="btn-kids w-full gradient-purple text-white shadow-lg disabled:opacity-60"
                            >
                                {processing ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Verificando...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="h-4 w-4" strokeWidth={2.5} />
                                        Confirmar contraseña
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

ConfirmPassword.layout = {
    title: 'Confirmar contraseña',
    description: 'Área segura — confirma tu identidad para continuar',
};
