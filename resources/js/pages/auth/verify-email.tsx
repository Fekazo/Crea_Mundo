import { Form, Head } from '@inertiajs/react';
import { CheckCircle, LogOut, Mail, Send } from 'lucide-react';
import TextLink from '@/components/text-link';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Verificar correo" />

            <div className="card-kids border-0 p-8 space-y-5 animate-pop-in">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl gradient-blue shadow-lg animate-float">
                        <Mail className="h-8 w-8 text-white" strokeWidth={2} />
                    </div>
                </div>

                {/* Message */}
                <div className="rounded-2xl bg-kids-blue-light p-4 text-sm font-semibold text-slate-600 text-center">
                    Hemos enviado un enlace de verificación a tu correo. Por favor, revisa tu bandeja de entrada.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="flex items-center gap-3 rounded-2xl bg-kids-green-light p-4">
                        <CheckCircle className="h-5 w-5 shrink-0 text-kids-green" strokeWidth={2.5} />
                        <p className="text-sm font-bold text-kids-green">
                            Nuevo enlace de verificación enviado.
                        </p>
                    </div>
                )}

                <Form {...send.form()} className="space-y-3">
                    {({ processing }) => (
                        <>
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-kids w-full gradient-blue text-white shadow-lg disabled:opacity-60"
                            >
                                {processing ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Reenviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" strokeWidth={2.5} />
                                        Reenviar correo de verificación
                                    </>
                                )}
                            </button>

                            <TextLink
                                href={logout()}
                                className="btn-kids flex w-full justify-center border-2 border-kids-red-light bg-white text-kids-red hover:bg-kids-red-light"
                            >
                                <LogOut className="h-4 w-4" strokeWidth={2.5} />
                                Cerrar sesión
                            </TextLink>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Verifica tu correo',
    description: '¡Ya casi estás listo para empezar!',
};
