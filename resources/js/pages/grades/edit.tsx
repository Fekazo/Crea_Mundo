import { Head, Link, useForm } from '@inertiajs/react';
import { GraduationCap, Loader2 } from 'lucide-react';
import grades from '@/routes/grades';

type Grade = { id: number; name: string; description: string | null };

export default function GradesEdit({ grade }: { grade: Grade }) {
    const { data, setData, put, processing, errors } = useForm({
        name: grade.name,
        description: grade.description ?? '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(grades.update(grade.id).url);
    }

    return (
        <>
            <Head title={`Editar: ${grade.name}`} />
            <div className="mx-auto max-w-lg p-6">
                <div className="card-kids border-0 p-8 animate-pop-in">

                    <div className="mb-7 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-green shadow-lg">
                            <GraduationCap className="h-7 w-7 text-white" strokeWidth={2} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Editar Grado
                            </h1>
                            <p className="text-sm font-semibold text-slate-500">{grade.name}</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">Nombre *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="input-kids"
                            />
                            {errors.name && (
                                <p className="text-xs font-bold text-kids-red">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">Descripción</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={3}
                                className="input-kids resize-none"
                            />
                        </div>

                        <div className="flex gap-3 pt-1">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-kids flex-1 gradient-green text-white shadow-lg disabled:opacity-60"
                            >
                                {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                Guardar Cambios
                            </button>
                            <Link
                                href={grades.index().url}
                                className="btn-kids border-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            >
                                Cancelar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

GradesEdit.layout = {
    breadcrumbs: [{ title: 'Grados', href: grades.index().url }],
};
