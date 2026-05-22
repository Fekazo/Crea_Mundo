import { Form, usePage } from '@inertiajs/react';
import { AlertTriangle, Lock, Trash2 } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
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
        <div className="card-kids border-0 p-6 animate-pop-in" style={{ animationDelay: '0.15s' }}>

            <div className="flex items-start gap-3 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-kids-red-light shadow-sm">
                    <AlertTriangle className="h-5 w-5 text-kids-red" strokeWidth={2.5} />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-kids-red" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                        Eliminar cuenta
                    </h2>
                    <p className="text-sm font-semibold text-slate-500 mt-0.5">
                        Esta acción es permanente y no se puede deshacer.
                    </p>
                </div>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <button className="btn-kids border-2 border-kids-red bg-white text-kids-red hover:bg-kids-red-light">
                        <Trash2 className="h-4 w-4" strokeWidth={2.5} />
                        Eliminar mi cuenta
                    </button>
                </DialogTrigger>

                <DialogContent className="rounded-3xl border-0 shadow-2xl">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-kids-red-light">
                                <Trash2 className="h-5 w-5 text-kids-red" strokeWidth={2.5} />
                            </div>
                            <DialogTitle className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Eliminar cuenta
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-sm font-semibold text-slate-500">
                            Ingresa tu contraseña para confirmar. Esta acción no se puede deshacer.
                        </DialogDescription>
                    </DialogHeader>

                    <Form method="delete" action={destroy.url()} className="space-y-4">
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                        <Lock className="h-4 w-4 text-kids-red" strokeWidth={2.5} />
                                        Contraseña
                                    </label>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        placeholder="Ingresa tu contraseña"
                                        required
                                        autoFocus
                                        className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition-all focus:border-kids-red focus:ring-2 focus:ring-kids-red/15 pr-10"
                                    />
                                    <InputError message={errors.password} className="text-xs font-bold text-kids-red" />
                                </div>

                                <DialogFooter>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-kids gradient-red text-white shadow-lg disabled:opacity-60"
                                    >
                                        {processing ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                Eliminando...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="h-4 w-4" strokeWidth={2.5} />
                                                Eliminar cuenta
                                            </>
                                        )}
                                    </button>
                                </DialogFooter>
                            </>
                        )}
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
