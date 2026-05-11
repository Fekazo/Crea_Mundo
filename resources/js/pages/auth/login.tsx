import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <>
            <Head title="Iniciar sesión" />

            <div className="min-h-screen bg-kids-white p-4 flex items-center justify-center relative overflow-hidden">
                {/* Decoraciones flotantes */}
                <div className="absolute top-10 left-10 text-6xl hover:animate-floating">🌟</div>
                <div className="absolute top-20 right-20 text-5xl hover:animate-floating" style={{ animationDelay: '0.2s' }}>🎪</div>
                <div className="absolute bottom-20 left-20 text-5xl hover:animate-floating" style={{ animationDelay: '0.4s' }}>🎸</div>
                <div className="absolute bottom-10 right-10 text-6xl hover:animate-floating" style={{ animationDelay: '0.6s' }}>🎮</div>

                <div className="max-w-md w-full relative z-10">
                    {/* Header colorido */}
                    <div className="text-center mb-8">
                        <div className="text-7xl mb-3 hover:animate-bounce">🎯</div>
                        <h1 className="text-4xl font-black text-kids-blue mb-2">
                            ¡Bienvenido de vuelta!
                        </h1>
                        <p className="text-xl font-bold text-slate-700">Accede a Crea Mundo</p>
                    </div>

                    {/* Tarjeta formulario */}
                    <div className="bg-kids-white rounded-2xl shadow-2xl p-8 border-4 border-kids-blue">
                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="email" className="text-lg font-bold text-kids-blue flex items-center gap-2">
                                                📧 Correo electrónico
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="tu.email@ejemplo.com"
                                                className="border-3 border-kids-blue rounded-2xl p-4 text-lg font-semibold focus:ring-2 focus:ring-kids-blue"
                                            />
                                            <InputError message={errors.email} className="text-kids-red font-bold" />
                                        </div>

                                        <div className="grid gap-3">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password" className="text-lg font-bold text-kids-blue flex items-center gap-2">
                                                    🔐 Contraseña
                                                </Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="text-base text-kids-red hover:text-opacity-80 underline font-bold"
                                                        tabIndex={5}
                                                    >
                                                        ¿La olvidaste? 🤔
                                                    </TextLink>
                                                )}
                                            </div>
                                            <PasswordInput
                                                id="password"
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="Tu contraseña"
                                                className="border-3 border-kids-blue rounded-2xl p-4 text-lg font-semibold focus:ring-2 focus:ring-kids-blue"
                                            />
                                            <InputError message={errors.password} className="text-kids-red font-bold" />
                                        </div>

                                        <div className="flex items-center space-x-3 p-4 bg-kids-yellow bg-opacity-20 rounded-2xl border-3 border-kids-yellow">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                                className="w-6 h-6"
                                            />
                                            <Label htmlFor="remember" className="font-bold text-lg cursor-pointer text-slate-800">
                                                💾 Recuérdame
                                            </Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mt-4 w-full rounded-2xl bg-kids-yellow hover:bg-opacity-90 text-slate-900 font-black text-xl py-4 shadow-lg hover:shadow-xl hover:animate-bounce transition-all active:shadow-md disabled:opacity-50"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing ? '⏳ Iniciando...' : '🚀 Iniciar sesión'}
                                        </Button>
                                    </div>

                                    {canRegister && (
                                        <div className="text-center text-lg font-bold text-slate-700 mt-4">
                                            ¿No tienes una cuenta?{' '}
                                            <TextLink href={register()} tabIndex={5} className="text-kids-green hover:text-opacity-80 underline font-bold">
                                                ¡Regístrate aquí! ✨
                                            </TextLink>
                                        </div>
                                    )}
                                </>
                            )}
                        </Form>
                    </div>

                    {status && (
                        <div className="mt-6 p-6 bg-kids-green bg-opacity-10 border-4 border-kids-green rounded-2xl text-center font-bold text-kids-green text-lg">
                            ✅ {status}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Login.layout = {
    title: '¡Inicia sesión en Crea Mundo!',
    description: 'Accede a tu cuenta',
};
