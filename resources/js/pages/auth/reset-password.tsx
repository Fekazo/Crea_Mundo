import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        <>
            <Head title="Reset password" />

            <div className="rounded-2xl bg-kids-red bg-opacity-10 p-8 border-4 border-kids-red shadow-lg">
                <div className="mb-8 text-center">
                    <div className="text-6xl mb-3">🔑</div>
                    <h1 className="text-3xl font-black text-kids-red">
                        Restablecer Contraseña
                    </h1>
                    <p className="text-lg font-bold text-slate-700 mt-2">
                        Crea una nueva contraseña fuerte
                    </p>
                </div>

                <Form
                    {...update.form()}
                    transform={(data) => ({ ...data, token, email })}
                    resetOnSuccess={['password', 'password_confirmation']}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email" className="text-lg font-bold text-kids-red flex items-center gap-2">
                                    📧 Correo electrónico
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    className="rounded-2xl border-3 border-kids-red p-4 text-lg font-bold"
                                    readOnly
                                />
                                <InputError
                                    message={errors.email}
                                    className="text-kids-red font-bold"
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password" className="text-lg font-bold text-kids-red flex items-center gap-2">
                                    🔐 Nueva contraseña
                                </Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    autoComplete="new-password"
                                    className="rounded-2xl border-3 border-kids-red p-4 text-lg font-bold"
                                    autoFocus
                                    placeholder="Mínimo 8 caracteres"
                                />
                                <InputError message={errors.password} className="text-kids-red font-bold" />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password_confirmation" className="text-lg font-bold text-kids-red flex items-center gap-2">
                                    🔒 Confirmar contraseña
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    className="rounded-2xl border-3 border-kids-red p-4 text-lg font-bold"
                                    placeholder="Confirma tu nueva contraseña"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="text-kids-red font-bold mt-2"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full rounded-2xl bg-kids-yellow px-6 py-4 text-lg font-bold text-slate-900 shadow-lg transition-all hover:shadow-xl hover:animate-bounce active:shadow-md disabled:opacity-50"
                                disabled={processing}
                                data-test="reset-password-button"
                            >
                                {processing ? '⏳ Actualizando...' : '✨ Actualizar contraseña'}
                            </Button>
                        </div>
                    )}
                </Form>
            </div>
        </>
    );
}

ResetPassword.layout = {
    title: 'Reset password',
    description: 'Please enter your new password below',
};
