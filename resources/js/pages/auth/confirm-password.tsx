import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />

            <div className="rounded-2xl bg-kids-yellow bg-opacity-10 p-8 border-4 border-kids-yellow shadow-lg max-w-md mx-auto">
                <div className="mb-8 text-center">
                    <div className="text-6xl mb-3">🔒</div>
                    <h1 className="text-3xl font-black text-kids-yellow">
                        Confirmar Contraseña
                    </h1>
                    <p className="text-lg font-bold text-slate-700 mt-2">
                        Esta es un área segura de la aplicación
                    </p>
                </div>

                <Form {...store.form()} resetOnSuccess={['password']} className="space-y-6">
                    {({ processing, errors }) => (
                        <div className="space-y-6">
                            <div className="grid gap-3">
                                <Label htmlFor="password" className="text-lg font-bold text-kids-yellow flex items-center gap-2">
                                    🔐 Contraseña
                                </Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    placeholder="Ingresa tu contraseña"
                                    autoComplete="current-password"
                                    autoFocus
                                    className="rounded-2xl border-3 border-kids-yellow p-4 text-lg font-bold"
                                />

                                <InputError message={errors.password} className="text-kids-red font-bold" />
                            </div>

                            <div className="flex items-center">
                                <Button
                                    className="w-full rounded-2xl bg-kids-blue px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl hover:animate-bounce active:shadow-md disabled:opacity-50"
                                    disabled={processing}
                                    data-test="confirm-password-button"
                                >
                                    {processing ? '⏳ Verificando...' : '✨ Confirmar contraseña'}
                                </Button>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Confirm your password',
    description:
        'This is a secure area of the application. Please confirm your password before continuing.',
};
