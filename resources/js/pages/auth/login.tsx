import { Form, Head } from '@inertiajs/react';
import { Lock, LogIn, Mail, UserCheck } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status, canResetPassword, canRegister }: Props) {
    return (
        <>
            <Head title="Iniciar sesión" />

            <div className="card-kids border-0 p-8 animate-pop-in">
                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="space-y-5"
                >
                    {({ processing, errors }) => (
                        <>
                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    <Mail className="h-4 w-4 text-kids-blue" strokeWidth={2.5} />
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="tu.email@ejemplo.com"
                                    className="input-kids"
                                />
                                <InputError message={errors.email} className="text-xs font-bold text-kids-red" />
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                        <Lock className="h-4 w-4 text-kids-blue" strokeWidth={2.5} />
                                        Contraseña
                                    </label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-xs font-bold text-kids-purple hover:underline"
                                            tabIndex={5}
                                        >
                                            ¿La olvidaste?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Tu contraseña"
                                    className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition-all duration-150 focus:border-kids-blue focus:ring-2 focus:ring-kids-blue/15 hover:border-slate-300 pr-10"
                                />
                                <InputError message={errors.password} className="text-xs font-bold text-kids-red" />
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center gap-3 rounded-2xl bg-kids-yellow-light p-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="h-5 w-5"
                                />
                                <Label htmlFor="remember" className="cursor-pointer text-sm font-bold text-slate-700">
                                    Recuérdame en este dispositivo
                                </Label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                tabIndex={4}
                                disabled={processing}
                                className="btn-kids w-full gradient-blue text-white shadow-lg disabled:opacity-60"
                                data-test="login-button"
                            >
                                {processing ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Iniciando...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="h-4 w-4" strokeWidth={2.5} />
                                        Iniciar sesión
                                    </>
                                )}
                            </button>

                            {/* Register link */}
                            {canRegister && (
                                <p className="text-center text-sm font-semibold text-slate-600">
                                    ¿No tienes una cuenta?{' '}
                                    <TextLink
                                        href={register()}
                                        tabIndex={5}
                                        className="font-bold text-kids-purple hover:underline"
                                    >
                                        ¡Regístrate aquí!
                                    </TextLink>
                                </p>
                            )}
                        </>
                    )}
                </Form>

                {status && (
                    <div className="mt-5 flex items-center gap-2 rounded-2xl bg-kids-green-light p-4">
                        <UserCheck className="h-5 w-5 flex-shrink-0 text-kids-green" strokeWidth={2.5} />
                        <p className="text-sm font-bold text-kids-green">{status}</p>
                    </div>
                )}
            </div>
        </>
    );
}

Login.layout = {
    title: '¡Hola de nuevo!',
    description: 'Accede a tu cuenta de Crea Mundo',
};
