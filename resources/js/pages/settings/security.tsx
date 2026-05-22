import { Form, Head } from '@inertiajs/react';
import { KeyRound, Lock, Save, Shield, ShieldCheck, ShieldOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { Button } from '@/components/ui/button';
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

            <div className="space-y-6">

                {/* Change password */}
                <div className="card-kids border-0 p-6 space-y-5 animate-pop-in">

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl gradient-red shadow-md">
                            <Lock className="h-5 w-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Actualizar contraseña
                            </h2>
                            <p className="text-sm font-semibold text-slate-500">
                                Usa una contraseña larga y segura
                            </p>
                        </div>
                    </div>

                    <Form
                        {...SecurityController.update.form()}
                        options={{ preserveScroll: true }}
                        resetOnError={['password', 'password_confirmation', 'current_password']}
                        resetOnSuccess
                        onError={(errs) => {
                            if (errs.password) passwordInput.current?.focus();
                            if (errs.current_password) currentPasswordInput.current?.focus();
                        }}
                        className="space-y-4"
                    >
                        {({ errors: formErrors, processing }) => (
                            <div className="space-y-4">

                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                        <Lock className="h-4 w-4 text-kids-red" strokeWidth={2.5} />
                                        Contraseña actual
                                    </label>
                                    <PasswordInput
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        name="current_password"
                                        autoComplete="current-password"
                                        placeholder="Tu contraseña actual"
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition-all focus:border-kids-red focus:ring-2 focus:ring-kids-red/15 hover:border-slate-300 pr-10"
                                    />
                                    <InputError message={formErrors.current_password} className="text-xs font-bold text-kids-red" />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                        <KeyRound className="h-4 w-4 text-kids-red" strokeWidth={2.5} />
                                        Nueva contraseña
                                    </label>
                                    <PasswordInput
                                        id="password"
                                        ref={passwordInput}
                                        name="password"
                                        autoComplete="new-password"
                                        placeholder="Mínimo 8 caracteres"
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition-all focus:border-kids-red focus:ring-2 focus:ring-kids-red/15 hover:border-slate-300 pr-10"
                                    />
                                    <InputError message={formErrors.password} className="text-xs font-bold text-kids-red" />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                        <ShieldCheck className="h-4 w-4 text-kids-red" strokeWidth={2.5} />
                                        Confirmar contraseña
                                    </label>
                                    <PasswordInput
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        autoComplete="new-password"
                                        placeholder="Confirma tu nueva contraseña"
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition-all focus:border-kids-red focus:ring-2 focus:ring-kids-red/15 hover:border-slate-300 pr-10"
                                    />
                                    <InputError message={formErrors.password_confirmation} className="text-xs font-bold text-kids-red" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    data-test="update-password-button"
                                    className="btn-kids w-full gradient-red text-white shadow-lg disabled:opacity-60"
                                >
                                    {processing ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" strokeWidth={2.5} />
                                            Guardar contraseña
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </Form>
                </div>

                {/* Two-Factor Auth */}
                {canManageTwoFactor && (
                    <div className="card-kids border-0 p-6 space-y-5 animate-pop-in" style={{ animationDelay: '0.1s' }}>

                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl gradient-blue shadow-md">
                                <Shield className="h-5 w-5 text-white" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                    Autenticación de dos factores
                                </h2>
                                <p className="text-sm font-semibold text-slate-500">
                                    Seguridad adicional para tu cuenta
                                </p>
                            </div>
                        </div>

                        {twoFactorEnabled ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 rounded-2xl bg-kids-green-light border-2 border-kids-green p-4">
                                    <ShieldCheck className="h-5 w-5 shrink-0 text-kids-green" strokeWidth={2.5} />
                                    <div>
                                        <p className="text-sm font-bold text-kids-green">2FA activado</p>
                                        <p className="text-xs font-semibold text-slate-600">
                                            Se pedirá un código de 6 dígitos al iniciar sesión.
                                        </p>
                                    </div>
                                </div>

                                <Form {...disable.form()}>
                                    {({ processing: disabling }) => (
                                        <button
                                            type="submit"
                                            disabled={disabling}
                                            className="btn-kids border-2 border-kids-red bg-white text-kids-red hover:bg-kids-red-light disabled:opacity-60"
                                        >
                                            {disabling ? (
                                                <>
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-kids-red border-t-transparent" />
                                                    Desactivando...
                                                </>
                                            ) : (
                                                <>
                                                    <ShieldOff className="h-4 w-4" strokeWidth={2.5} />
                                                    Desactivar 2FA
                                                </>
                                            )}
                                        </button>
                                    )}
                                </Form>

                                <TwoFactorRecoveryCodes
                                    recoveryCodesList={recoveryCodesList}
                                    fetchRecoveryCodes={fetchRecoveryCodes}
                                    errors={errors}
                                />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 rounded-2xl bg-kids-yellow-light border-2 border-kids-yellow p-4">
                                    <Shield className="h-5 w-5 shrink-0 text-kids-yellow" strokeWidth={2.5} />
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">2FA desactivado</p>
                                        <p className="text-xs font-semibold text-slate-600">
                                            Actívalo para mayor seguridad en tu cuenta.
                                        </p>
                                    </div>
                                </div>

                                {hasSetupData ? (
                                    <Button
                                        onClick={() => setShowSetupModal(true)}
                                        className="btn-kids gradient-blue text-white shadow-md"
                                    >
                                        <ShieldCheck className="h-4 w-4" strokeWidth={2.5} />
                                        Continuar configuración
                                    </Button>
                                ) : (
                                    <Form
                                        {...enable.form()}
                                        onSuccess={() => setShowSetupModal(true)}
                                    >
                                        {({ processing: enabling }) => (
                                            <button
                                                type="submit"
                                                disabled={enabling}
                                                className="btn-kids gradient-blue text-white shadow-md disabled:opacity-60"
                                            >
                                                {enabling ? (
                                                    <>
                                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                        Activando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShieldCheck className="h-4 w-4" strokeWidth={2.5} />
                                                        Activar 2FA
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </Form>
                                )}
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
    breadcrumbs: [{ title: 'Seguridad', href: edit() }],
};
