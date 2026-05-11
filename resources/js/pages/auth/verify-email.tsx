// Components
import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Email verification" />

            <div className="rounded-2xl bg-kids-green bg-opacity-10 p-8 border-4 border-kids-green shadow-lg max-w-md mx-auto">
                <div className="mb-8 text-center">
                    <div className="text-6xl mb-3 animate-bounce">✉️</div>
                    <h1 className="text-3xl font-black text-kids-green">
                        Verificar Correo
                    </h1>
                    <p className="text-lg font-bold text-slate-700 mt-2">
                        ¡Casi listo! Verifica tu correo
                    </p>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-6 p-4 bg-kids-green bg-opacity-20 border-3 border-kids-green rounded-2xl text-center font-bold text-kids-green text-base">
                        ✅ Se ha enviado un nuevo enlace de verificación a tu correo.
                    </div>
                )}

                <Form {...send.form()} className="space-y-6 text-center">
                    {({ processing }) => (
                        <>
                            <Button
                                disabled={processing}
                                className="w-full rounded-2xl bg-kids-yellow px-6 py-4 text-lg font-bold text-slate-900 shadow-lg transition-all hover:shadow-xl hover:animate-bounce active:shadow-md disabled:opacity-50"
                            >
                                {processing ? '⏳ Reenviando...' : '🚀 Reenviar correo de verificación'}
                            </Button>

                            <TextLink
                                href={logout()}
                                className="block rounded-2xl bg-kids-red bg-opacity-20 border-3 border-kids-red p-4 text-base font-bold text-kids-red hover:bg-opacity-30 transition"
                            >
                                👋 Cerrar sesión
                            </TextLink>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Verify email',
    description:
        'Please verify your email address by clicking on the link we just emailed to you.',
};
