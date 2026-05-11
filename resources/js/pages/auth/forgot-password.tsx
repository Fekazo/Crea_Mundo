// Components
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            {status && (
                <div className="mb-6 p-6 text-center text-lg font-bold text-white bg-kids-green rounded-2xl shadow-lg border-4 border-green-600">
                    ✅ {status}
                </div>
            )}

            <div className="space-y-6 rounded-2xl bg-kids-blue bg-opacity-10 p-8 border-4 border-kids-blue shadow-lg">
                <div className="mb-6 text-center">
                    <div className="text-6xl mb-3">🔐</div>
                    <h1 className="text-3xl font-black text-kids-blue">
                        ¿Olvidaste tu Contraseña?
                    </h1>
                    <p className="text-lg font-bold text-slate-700 mt-2">
                        No te preocupes, te ayudaremos a recuperarla
                    </p>
                </div>

                <Form {...email.form()} className="space-y-6">
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-3">
                                <Label htmlFor="email" className="text-lg font-bold text-kids-blue flex items-center gap-2">
                                    📧 Correo electrónico
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="tu.email@ejemplo.com"
                                    className="rounded-2xl border-3 border-kids-blue p-4 text-lg font-bold focus:ring-2 focus:ring-kids-blue"
                                />

                                <InputError message={errors.email} className="text-kids-red font-bold" />
                            </div>

                            <div className="flex items-center justify-center">
                                <Button
                                    className="w-full rounded-2xl bg-kids-yellow px-6 py-4 text-lg font-bold text-slate-900 shadow-lg transition-all hover:shadow-xl hover:animate-bounce active:shadow-md disabled:opacity-50"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing ? '⏳ Enviando...' : '🚀 Enviar enlace de recuperación'}
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="space-y-2 text-center text-base font-bold text-slate-700">
                    <p>¿Recordaste tu contraseña?</p>
                    <TextLink href={login()} className="text-kids-blue hover:text-kids-green underline decoration-2 underline-offset-2">
                        👈 Vuelve al inicio de sesión
                    </TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Forgot password',
    description: 'Enter your email to receive a password reset link',
};
