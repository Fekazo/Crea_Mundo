import { Form, Head } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Mail, Send } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Recuperar contraseña" />

            <div className="card-kids border-0 p-8 space-y-5 animate-pop-in">

                {status && (
                    <div className="flex items-center gap-3 rounded-2xl bg-kids-green-light p-4">
                        <CheckCircle className="h-5 w-5 shrink-0 text-kids-green" strokeWidth={2.5} />
                        <p className="text-sm font-bold text-kids-green">{status}</p>
                    </div>
                )}

                <div className="rounded-2xl bg-kids-blue-light p-4 text-sm font-semibold text-slate-600">
                    Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
                </div>

                <Form {...email.form()} className="space-y-4">
                    {({ processing, errors }) => (
                        <>
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <Mail className="h-4 w-4 text-kids-blue" strokeWidth={2.5} />
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="tu.email@ejemplo.com"
                                    className="input-kids"
                                />
                                <InputError message={errors.email} className="text-xs font-bold text-kids-red" />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-kids w-full gradient-blue text-white shadow-lg disabled:opacity-60"
                                data-test="email-password-reset-link-button"
                            >
                                {processing ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" strokeWidth={2.5} />
                                        Enviar enlace
                                    </>
                                )}
                            </button>
                        </>
                    )}
                </Form>

                <div className="text-center">
                    <TextLink
                        href={login()}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-kids-purple hover:underline"
                    >
                        <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                        Volver al inicio de sesión
                    </TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: '¿Olvidaste tu contraseña?',
    description: 'Te enviaremos un enlace de recuperación',
};
