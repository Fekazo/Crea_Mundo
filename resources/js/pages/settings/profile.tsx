import { Form, Head, Link, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Configuración de perfil" />

            <div className="min-h-screen bg-kids-white p-6">
                <h1 className="sr-only">Profile settings</h1>

                {/* Header del Perfil */}
                <div className="mb-8">
                    <div className="bg-kids-green bg-opacity-10 rounded-2xl shadow-lg p-8 border-4 border-kids-green">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-6xl hover:animate-bounce">👤</div>
                            <div>
                                <h1 className="text-4xl font-black text-kids-green">
                                    Mi Perfil
                                </h1>
                                <p className="text-lg font-bold text-slate-700">
                                    Actualiza tu información aquí ✨
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tarjeta de información */}
                <div className="space-y-8">
                    <div className="bg-kids-white rounded-2xl shadow-lg p-8 border-4 border-kids-blue">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="text-5xl hover:animate-bounce">📝</span>
                            <h2 className="text-3xl font-black text-kids-blue">
                                Información del perfil
                            </h2>
                        </div>
                        <p className="text-lg font-bold text-slate-700 mb-8">
                            Actualiza tu nombre, email y tipo de usuario
                        </p>

                        <Form
                            {...ProfileController.update.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            className="space-y-8"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label
                                                htmlFor="name"
                                                className="text-lg font-bold text-kids-blue flex items-center gap-2"
                                            >
                                                🎤 Nombre
                                            </Label>

                                            <Input
                                                id="name"
                                                className="rounded-2xl border-3 border-kids-blue p-4 text-lg font-bold focus:ring-2 focus:ring-kids-blue"
                                                defaultValue={auth.user.name}
                                                name="name"
                                                required
                                                autoComplete="name"
                                                placeholder="Tu nombre completo"
                                            />

                                            <InputError
                                                className="text-kids-red font-bold"
                                                message={errors.name}
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label
                                                htmlFor="email"
                                                className="text-lg font-bold text-kids-blue flex items-center gap-2"
                                            >
                                                📧 Correo electrónico
                                            </Label>

                                            <Input
                                                id="email"
                                                type="email"
                                                className="rounded-2xl border-3 border-kids-blue p-4 text-lg font-bold focus:ring-2 focus:ring-kids-blue"
                                                defaultValue={auth.user.email}
                                                name="email"
                                                required
                                                autoComplete="username"
                                                placeholder="tu.email@ejemplo.com"
                                            />

                                            <InputError
                                                className="text-kids-red font-bold"
                                                message={errors.email}
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label className="text-lg font-bold text-kids-green flex items-center gap-2">
                                                👨‍🏫 Tipo de usuario
                                            </Label>
                                            <RadioGroup
                                                name="user_type"
                                                defaultValue={auth.user.user_type || 'padre'}
                                                className="space-y-4"
                                            >
                                                <div className="flex items-center space-x-3 p-4 rounded-2xl border-4 border-kids-green hover:bg-kids-green hover:bg-opacity-10 cursor-pointer transition transform hover:scale-105">
                                                    <RadioGroupItem
                                                        value="padre"
                                                        id="padre"
                                                        className="w-6 h-6"
                                                    />
                                                    <Label
                                                        htmlFor="padre"
                                                        className="font-bold text-lg cursor-pointer flex items-center gap-2 text-kids-green"
                                                    >
                                                        👨‍👩‍👧 Padre de familia
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-3 p-4 rounded-2xl border-4 border-kids-yellow hover:bg-kids-yellow hover:bg-opacity-10 cursor-pointer transition transform hover:scale-105">
                                                    <RadioGroupItem
                                                        value="docente"
                                                        id="docente"
                                                        className="w-6 h-6"
                                                    />
                                                    <Label
                                                        htmlFor="docente"
                                                        className="font-bold text-lg cursor-pointer flex items-center gap-2 text-kids-yellow"
                                                    >
                                                        📚 Docente
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                            <InputError
                                                message={errors.user_type}
                                                className="text-kids-red font-bold"
                                            />
                                        </div>

                                        {mustVerifyEmail &&
                                            auth.user.email_verified_at === null && (
                                                <div className="p-6 bg-kids-yellow bg-opacity-10 rounded-2xl border-4 border-kids-yellow">
                                                    <p className="text-base font-bold text-slate-800">
                                                        ⚠️ Tu correo no está verificado.{' '}
                                                        <Link
                                                            href={send()}
                                                            as="button"
                                                            className="text-kids-yellow underline font-black hover:text-opacity-80"
                                                        >
                                                            Haz clic aquí para reenviar el correo de verificación.
                                                        </Link>
                                                    </p>

                                                    {status ===
                                                        'verification-link-sent' && (
                                                        <div className="mt-3 p-3 bg-kids-green bg-opacity-20 border-3 border-kids-green rounded-xl text-base font-bold text-kids-green">
                                                            ✅ Se ha enviado un nuevo enlace de verificación a tu correo.
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                        <Button
                                            disabled={processing}
                                            data-test="update-profile-button"
                                            className="mt-6 w-full rounded-2xl bg-kids-green hover:bg-opacity-90 text-white font-black text-lg py-4 shadow-lg hover:shadow-xl hover:animate-bounce transition-all active:shadow-md disabled:opacity-50"
                                        >
                                            {processing ? '⏳ Guardando...' : '💾 Guardar cambios'}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>

                    <DeleteUser />
                </div>
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Configuración de perfil',
            href: edit(),
        },
    ],
};
