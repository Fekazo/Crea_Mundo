import { Form, Head } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { edit } from '@/routes/security';
import { disable, enable } from '@/routes/two-factor';

type Props = {
    canManageTwoFactor?: boolean;
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
};

export default function Security({
    canManageTwoFactor = false,
    requiresConfirmation = false,
    twoFactorEnabled = false,
}: Props) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {
        qrCodeSvg,
        hasSetupData,
        manualSetupKey,
        clearSetupData,
        clearTwoFactorAuthData,
        fetchSetupData,
        recoveryCodesList,
        fetchRecoveryCodes,
        errors,
    } = useTwoFactorAuth();
    const [showSetupModal, setShowSetupModal] = useState<boolean>(false);
    const prevTwoFactorEnabled = useRef(twoFactorEnabled);

    useEffect(() => {
        if (prevTwoFactorEnabled.current && !twoFactorEnabled) {
            clearTwoFactorAuthData();
        }

        prevTwoFactorEnabled.current = twoFactorEnabled;
    }, [twoFactorEnabled, clearTwoFactorAuthData]);

    return (
        <>
            <Head title="Configuración de seguridad" />

            <h1 className="sr-only">Configuración de seguridad</h1>

            <div className="space-y-8">
                {/* Update Password Section */}
                <div className="rounded-2xl bg-kids-red bg-opacity-10 border-4 border-kids-red p-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-4xl">🔐</span>
                        <div>
                            <h2 className="text-2xl font-black text-kids-red">
                                Actualizar Contraseña
                            </h2>
                            <p className="text-base font-bold text-slate-700">
                                Asegúrate de usar una contraseña larga y segura
                            </p>
                        </div>
                    </div>

                    <Form
                        {...SecurityController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        resetOnError={[
                            'password',
                            'password_confirmation',
                            'current_password',
                        ]}
                        resetOnSuccess
                        onError={(errors) => {
                            if (errors.password) {
                                passwordInput.current?.focus();
                            }

                            if (errors.current_password) {
                                currentPasswordInput.current?.focus();
                            }
                        }}
                        className="space-y-6"
                    >
                        {({ errors, processing }) => (
                            <>
                                <div className="grid gap-3">
                                    <Label htmlFor="current_password" className="text-lg font-bold text-kids-red flex items-center gap-2">
                                        🔑 Contraseña actual
                                    </Label>

                                    <PasswordInput
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        name="current_password"
                                        className="rounded-2xl border-3 border-kids-red p-3 text-lg font-semibold"
                                        autoComplete="current-password"
                                        placeholder="Tu contraseña actual"
                                    />

                                    <InputError message={errors.current_password} className="text-kids-red font-bold" />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="password" className="text-lg font-bold text-kids-red flex items-center gap-2">
                                        🆕 Nueva contraseña
                                    </Label>

                                    <PasswordInput
                                        id="password"
                                        ref={passwordInput}
                                        name="password"
                                        className="rounded-2xl border-3 border-kids-red p-3 text-lg font-semibold"
                                        autoComplete="new-password"
                                        placeholder="Tu nueva contraseña"
                                    />

                                    <InputError message={errors.password} className="text-kids-red font-bold" />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="password_confirmation" className="text-lg font-bold text-kids-red flex items-center gap-2">
                                        ✓ Confirmar contraseña
                                    </Label>

                                    <PasswordInput
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        className="rounded-2xl border-3 border-kids-red p-3 text-lg font-semibold"
                                        autoComplete="new-password"
                                        placeholder="Confirma tu nueva contraseña"
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="text-kids-red font-bold"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        className="rounded-2xl bg-kids-yellow px-6 py-3 text-lg font-bold text-slate-900 shadow-lg hover:shadow-xl hover:animate-bounce active:shadow-md disabled:opacity-50 transition-all"
                                        data-test="update-password-button"
                                    >
                                        {processing ? '⏳ Guardando...' : '💾 Guardar contraseña'}
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>

                {/* Two-Factor Authentication Section */}
                {canManageTwoFactor && (
                    <div className="rounded-2xl bg-kids-blue bg-opacity-10 border-4 border-kids-blue p-8 shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl">🛡️</span>
                            <div>
                                <h2 className="text-2xl font-black text-kids-blue">
                                    Autenticación de Dos Factores
                                </h2>
                                <p className="text-base font-bold text-slate-700">
                                    Gestiona tu seguridad adicional
                                </p>
                            </div>
                        </div>

                        {twoFactorEnabled ? (
                            <div className="flex flex-col items-start justify-start space-y-6">
                                <div className="p-6 bg-kids-green bg-opacity-10 border-3 border-kids-green rounded-2xl">
                                    <p className="text-base font-bold text-slate-700">
                                        ✅ La autenticación de dos factores está <span className="text-kids-green">activada</span>.
                                    </p>
                                    <p className="text-sm text-slate-600 font-semibold mt-2">
                                        Se te pedirá un código de 6 dígitos durante el inicio de sesión.
                                    </p>
                                </div>

                                <div className="relative inline">
                                    <Form {...disable.form()}>
                                        {({ processing }) => (
                                            <Button
                                                variant="destructive"
                                                type="submit"
                                                disabled={processing}
                                                className="rounded-2xl bg-kids-red hover:bg-opacity-90 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all"
                                            >
                                                {processing ? '⏳ Desactivando...' : '🔓 Desactivar 2FA'}
                                            </Button>
                                        )}
                                    </Form>
                                </div>

                                <TwoFactorRecoveryCodes
                                    recoveryCodesList={recoveryCodesList}
                                    fetchRecoveryCodes={fetchRecoveryCodes}
                                    errors={errors}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-start justify-start space-y-6">
                                <div className="p-6 bg-kids-yellow bg-opacity-20 border-3 border-kids-yellow rounded-2xl">
                                    <p className="text-base font-bold text-slate-700">
                                        ⚠️ La autenticación de dos factores está <span className="text-kids-yellow font-black">desactivada</span>.
                                    </p>
                                    <p className="text-sm text-slate-600 font-semibold mt-2">
                                        Actívala para mayor seguridad en tu cuenta.
                                    </p>
                                </div>

                                <div>
                                    {hasSetupData ? (
                                        <Button
                                            onClick={() => setShowSetupModal(true)}
                                            className="rounded-2xl bg-kids-green hover:bg-opacity-90 px-6 py-3 text-lg font-bold text-white shadow-lg hover:animate-bounce transition-all"
                                        >
                                            <ShieldCheck className="mr-2" />
                                            Continuar configuración
                                        </Button>
                                    ) : (
                                        <Form
                                            {...enable.form()}
                                            onSuccess={() =>
                                                setShowSetupModal(true)
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="rounded-2xl bg-kids-blue hover:bg-opacity-90 px-6 py-3 text-lg font-bold text-white shadow-lg hover:animate-bounce transition-all"
                                                >
                                                    {processing ? '⏳ Activando...' : '🔐 Activar 2FA'}
                                                </Button>
                                            )}
                                        </Form>
                                    )}
                                </div>
                            </div>
                        )}

                        <TwoFactorSetupModal
                            isOpen={showSetupModal}
                            onClose={() => setShowSetupModal(false)}
                            requiresConfirmation={requiresConfirmation}
                            twoFactorEnabled={twoFactorEnabled}
                            qrCodeSvg={qrCodeSvg}
                            manualSetupKey={manualSetupKey}
                            clearSetupData={clearSetupData}
                            fetchSetupData={fetchSetupData}
                            errors={errors}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

Security.layout = {
    breadcrumbs: [
        {
            title: 'Security settings',
            href: edit(),
        },
    ],
};
