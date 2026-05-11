import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen bg-kids-white p-4 flex items-center justify-center relative overflow-hidden">
                {/* Decoraciones flotantes */}
                <div className="absolute top-10 left-10 text-6xl hover:animate-floating">🎈</div>
                <div className="absolute top-20 right-20 text-5xl hover:animate-floating" style={{ animationDelay: '0.2s' }}>⭐</div>
                <div className="absolute bottom-20 left-20 text-5xl hover:animate-floating" style={{ animationDelay: '0.4s' }}>🎨</div>
                <div className="absolute bottom-10 right-10 text-6xl hover:animate-floating" style={{ animationDelay: '0.6s' }}>🎭</div>

                <div className="max-w-md w-full relative z-10">
                    {/* Header colorido */}
                    <div className="text-center mb-8">
                        <div className="text-7xl mb-3 hover:animate-bounce">🎓</div>
                        <h1 className="text-4xl font-black text-kids-green mb-2">
                            ¡Bienvenido!
                        </h1>
                        <p className="text-xl font-bold text-slate-700">Crea tu cuenta en Crea Mundo</p>
                    </div>

                    {/* Tarjeta formulario */}
                    <div className="bg-kids-white rounded-2xl shadow-2xl p-8 border-4 border-kids-green">
                        <Form
                            {...store.form()}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name" className="text-lg font-bold text-kids-green flex items-center gap-2">
                                                👤 Nombre completo
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="name"
                                                name="name"
                                                placeholder="Tu nombre completo"
                                                className="border-3 border-kids-green rounded-2xl p-4 text-lg font-semibold focus:ring-2 focus:ring-kids-green"
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="text-kids-red font-bold"
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="email" className="text-lg font-bold text-kids-green flex items-center gap-2">
                                                📧 Correo electrónico
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                tabIndex={2}
                                                autoComplete="email"
                                                name="email"
                                                placeholder="tu.email@ejemplo.com"
                                                className="border-3 border-kids-green rounded-2xl p-4 text-lg font-semibold focus:ring-2 focus:ring-kids-green"
                                            />
                                            <InputError message={errors.email} className="text-kids-red font-bold" />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label className="text-lg font-bold text-kids-blue flex items-center gap-2">
                                                👨‍🏫 Tipo de usuario
                                            </Label>
                                            <RadioGroup name="user_type" defaultValue="padre" className="space-y-3">
                                                <div className="flex items-center space-x-3 p-4 rounded-2xl border-3 border-kids-green hover:bg-kids-green hover:bg-opacity-10 cursor-pointer transition transform hover:scale-105">
                                                    <RadioGroupItem
                                                        value="padre"
                                                        id="padre"
                                                        tabIndex={3}
                                                        className="w-6 h-6 border-2"
                                                    />
                                                    <Label htmlFor="padre" className="font-bold text-lg cursor-pointer flex items-center gap-2 text-slate-800">
                                                        👨‍👩‍👧 Padre de familia
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-3 p-4 rounded-2xl border-3 border-kids-blue hover:bg-kids-blue hover:bg-opacity-10 cursor-pointer transition transform hover:scale-105">
                                                    <RadioGroupItem
                                                        value="docente"
                                                        id="docente"
                                                        tabIndex={3}
                                                        className="w-6 h-6 border-2"
                                                    />
                                                    <Label htmlFor="docente" className="font-bold text-lg cursor-pointer flex items-center gap-2 text-slate-800">
                                                        📚 Docente
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                            <InputError message={errors.user_type} className="text-kids-red font-bold" />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="password" className="text-lg font-bold text-kids-blue flex items-center gap-2">
                                                🔐 Contraseña
                                            </Label>
                                            <PasswordInput
                                                id="password"
                                                required
                                                tabIndex={4}
                                                autoComplete="new-password"
                                                name="password"
                                                placeholder="Mínimo 8 caracteres"
                                                className="border-3 border-kids-blue rounded-2xl p-4 text-lg font-semibold focus:ring-2 focus:ring-kids-blue"
                                            />
                                            <InputError message={errors.password} className="text-kids-red font-bold" />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="password_confirmation" className="text-lg font-bold text-kids-blue flex items-center gap-2">
                                                🔒 Confirmar contraseña
                                            </Label>
                                            <PasswordInput
                                                id="password_confirmation"
                                                required
                                                tabIndex={5}
                                                autoComplete="new-password"
                                                name="password_confirmation"
                                                placeholder="Confirma tu contraseña"
                                                className="border-3 border-kids-blue rounded-2xl p-4 text-lg font-semibold focus:ring-2 focus:ring-kids-blue"
                                            />
                                            <InputError
                                                message={errors.password_confirmation}
                                                className="text-kids-red font-bold"
                                            />
                                        </div>

                                        <div className="flex items-start space-x-3 p-4 bg-kids-yellow bg-opacity-20 rounded-2xl border-3 border-kids-yellow">
                                            <input
                                                id="terms"
                                                type="checkbox"
                                                required
                                                name="terms"
                                                tabIndex={6}
                                                className="w-6 h-6 accent-kids-yellow cursor-pointer mt-1"
                                            />
                                            <Label htmlFor="terms" className="font-bold text-base cursor-pointer text-slate-800">
                                                ✅ Aceptar términos y condiciones
                                            </Label>
                                        </div>
                                        <InputError message={errors.terms} className="text-kids-red font-bold" />

                                        <Button
                                            type="submit"
                                            className="mt-4 w-full rounded-2xl bg-kids-yellow hover:bg-opacity-90 text-slate-900 font-black text-xl py-4 shadow-lg hover:shadow-xl hover:animate-bounce transition-all active:shadow-md disabled:opacity-50"
                                            tabIndex={7}
                                            data-test="register-user-button"
                                            disabled={processing}
                                        >
                                            {processing ? '⏳ Creando...' : '🎉 Crear cuenta'}
                                        </Button>
                                    </div>

                                    <div className="text-center text-lg font-bold text-slate-700 mt-4">
                                        ¿Ya tienes una cuenta?{' '}
                                        <TextLink href={login()} tabIndex={8} className="text-kids-green hover:text-opacity-80 underline font-bold">
                                            ¡Inicia sesión aquí! 👉
                                        </TextLink>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

Register.layout = {
    title: '¡Crea tu cuenta!',
    description: 'Únete a Crea Mundo',
};
