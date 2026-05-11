import { Form, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { destroy } from '@/routes/profile';

export default function DeleteUser() {
    usePage();

    return (
        <div className="space-y-6 rounded-2xl border-4 border-kids-red bg-kids-red bg-opacity-10 p-8">
            <div>
                <h3 className="text-2xl font-black text-kids-red">
                    ⚠️ Eliminar Cuenta
                </h3>
                <p className="text-base font-bold text-slate-700 mt-2">
                    Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, estar seguro.
                </p>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="rounded-2xl bg-kids-red hover:bg-opacity-90 border-3 border-red-600 px-6 py-3 text-lg font-black text-white shadow-lg hover:shadow-xl transition-all">
                        🗑️ Eliminar Cuenta
                    </Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-kids-red">
                            Eliminar Cuenta
                        </DialogTitle>
                        <DialogDescription className="text-base font-bold text-slate-700">
                            Ingresa tu contraseña para confirmar la eliminación de tu cuenta.
                        </DialogDescription>
                    </DialogHeader>

                    <Form
                        method="delete"
                        action={destroy.url()}
                        className="space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-3">
                                    <label className="text-lg font-bold text-kids-red">🔐 Contraseña</label>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        placeholder="Ingresa tu contraseña"
                                        required
                                        autoFocus
                                        className="rounded-2xl border-3 border-kids-red p-3 text-lg font-semibold"
                                    />
                                    <InputError message={errors.password} className="text-kids-red font-bold" />
                                </div>

                                <DialogFooter>
                                    <Button
                                        type="submit"
                                        className="rounded-2xl bg-kids-red hover:bg-opacity-90 border-3 border-red-600 px-6 py-3 text-lg font-black text-white shadow-lg"
                                        disabled={processing}
                                    >
                                        {processing ? '⏳ Eliminando...' : '🗑️ Eliminar Cuenta'}
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

