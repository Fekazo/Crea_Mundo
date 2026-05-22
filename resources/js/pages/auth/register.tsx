import { Form, Head } from '@inertiajs/react';
import { Lock, Mail, User, UserPlus, Users } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Registrarse" />

            <div className="card-kids border-0 p-8 animate-pop-in">
                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="space-y-5"
                >
                    {({ processing, errors }) => (
                        <>
                            {/* Name */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <User className="h-4 w-4 text-kids-green" strokeWidth={2.5} />
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Tu nombre completo"
                                    className="input-kids"
                                />
                                <InputError message={errors.name} className="text-xs font-bold text-kids-red" />
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <Mail className="h-4 w-4 text-kids-green" strokeWidth={2.5} />
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="tu.email@ejemplo.com"
                                    className="input-kids"
                                />
                                <InputError message={errors.email} className="text-xs font-bold text-kids-red" />
                            </div>

                            {/* Role info banner */}
                            <div className="flex items-center gap-3 rounded-2xl bg-kids-green-light p-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-green shadow-sm">
                                    <Users className="h-4 w-4 text-white" strokeWidth={2} />
                                </div>
                                <p className="text-sm font-semibold text-slate-600">
                                    El registro público es <span className="font-bold text-kids-green">solo para padres de familia</span>. Los docentes son registrados por el administrador.
                                </p>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <Lock className="h-4 w-4 text-kids-blue" strokeWidth={2.5} />
                                    Contraseña
                                </label>
                                <PasswordInput
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Mínimo 8 caracteres"
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition-all focus:border-kids-blue focus:ring-2 focus:ring-kids-blue/15 hover:border-slate-300 pr-10"
                                />
                                <InputError message={errors.password} className="text-xs font-bold text-kids-red" />
                            </div>

                            {/* Confirm password */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <Lock className="h-4 w-4 text-kids-purple" strokeWidth={2.5} />
                                    Confirmar contraseña
                                </label>
                                <PasswordInput
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirma tu contraseña"
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition-all focus:border-kids-purple focus:ring-2 focus:ring-kids-purple/15 hover:border-slate-300 pr-10"
                                />
                                <InputError message={errors.password_confirmation} className="text-xs font-bold text-kids-red" />
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-3 rounded-2xl bg-kids-yellow-light p-3">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    required
                                    name="terms"
                                    tabIndex={6}
                                    className="mt-0.5 h-4 w-4 accent-kids-yellow cursor-pointer"
                                />
                                <label htmlFor="terms" className="cursor-pointer text-sm font-semibold text-slate-700">
                                    Acepto los{' '}
                                    <span className="font-bold text-kids-orange underline">términos y condiciones</span>
                                </label>
                            </div>
                            <InputError message={errors.terms} className="text-xs font-bold text-kids-red" />

                            {/* Submit */}
                            <button
                                type="submit"
                                tabIndex={7}
                                disabled={processing}
                                className="btn-kids w-full gradient-green text-white shadow-lg disabled:opacity-60"
                                data-test="register-user-button"
                            >
                                {processing ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Creando cuenta...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="h-4 w-4" strokeWidth={2.5} />
                                        Crear cuenta
                                    </>
                                )}
                            </button>

                            {/* Login link */}
                            <p className="text-center text-sm font-semibold text-slate-600">
                                ¿Ya tienes una cuenta?{' '}
                                <TextLink
                                    href={login()}
                                    tabIndex={8}
                                    className="font-bold text-kids-blue hover:underline"
                                >
                                    Inicia sesión aquí
                                </TextLink>
                            </p>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

Register.layout = {
    title: '¡Bienvenido!',
    description: 'Crea tu cuenta en Crea Mundo',
};
