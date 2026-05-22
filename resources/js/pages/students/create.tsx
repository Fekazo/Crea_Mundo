import { Head, Link, useForm } from '@inertiajs/react';
import { GraduationCap, Loader2, User, Users } from 'lucide-react';
import students from '@/routes/students';

type Grade = { id: number; name: string };
type Parent = { id: number; name: string; email: string };

export default function StudentsCreate({
    grades,
    parents,
}: {
    grades: Grade[];
    parents: Parent[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        age: '',
        grade_id: '',
        parent_id: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(students.store().url);
    }

    return (
        <>
            <Head title="Nuevo Estudiante" />
            <div className="mx-auto max-w-lg p-6">
                <div className="card-kids border-0 p-8 animate-pop-in">

                    <div className="mb-7 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-blue shadow-lg">
                            <Users className="h-7 w-7 text-white" strokeWidth={2} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Nuevo Estudiante
                            </h1>
                            <p className="text-sm font-semibold text-slate-500">
                                Registra un nuevo estudiante
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-4">

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700">Nombre *</label>
                                <input
                                    type="text"
                                    value={data.first_name}
                                    onChange={e => setData('first_name', e.target.value)}
                                    placeholder="Nombre"
                                    autoFocus
                                    className="input-kids"
                                />
                                {errors.first_name && (
                                    <p className="text-xs font-bold text-kids-red">{errors.first_name}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700">Apellido *</label>
                                <input
                                    type="text"
                                    value={data.last_name}
                                    onChange={e => setData('last_name', e.target.value)}
                                    placeholder="Apellido"
                                    className="input-kids"
                                />
                                {errors.last_name && (
                                    <p className="text-xs font-bold text-kids-red">{errors.last_name}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">Edad</label>
                            <input
                                type="number"
                                value={data.age}
                                onChange={e => setData('age', e.target.value)}
                                placeholder="ej. 8"
                                min={3}
                                max={20}
                                className="input-kids"
                            />
                            {errors.age && (
                                <p className="text-xs font-bold text-kids-red">{errors.age}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <GraduationCap className="h-4 w-4 text-kids-green" strokeWidth={2.5} />
                                Grado *
                            </label>
                            <select
                                value={data.grade_id}
                                onChange={e => setData('grade_id', e.target.value)}
                                className="input-kids"
                            >
                                <option value="">Selecciona un grado</option>
                                {grades.map(g => (
                                    <option key={g.id} value={g.id}>{g.name}</option>
                                ))}
                            </select>
                            {errors.grade_id && (
                                <p className="text-xs font-bold text-kids-red">{errors.grade_id}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <User className="h-4 w-4 text-kids-blue" strokeWidth={2.5} />
                                Padre / Madre de familia *
                            </label>
                            {parents.length === 0 ? (
                                <div className="rounded-2xl bg-kids-yellow-light border-2 border-kids-yellow p-3">
                                    <p className="text-xs font-bold text-slate-600">
                                        No hay padres registrados. Primero deben registrarse en la app.
                                    </p>
                                </div>
                            ) : (
                                <select
                                    value={data.parent_id}
                                    onChange={e => setData('parent_id', e.target.value)}
                                    className="input-kids"
                                >
                                    <option value="">Selecciona un padre</option>
                                    {parents.map(p => (
                                        <option key={p.id} value={p.id}>{p.name} — {p.email}</option>
                                    ))}
                                </select>
                            )}
                            {errors.parent_id && (
                                <p className="text-xs font-bold text-kids-red">{errors.parent_id}</p>
                            )}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-kids flex-1 gradient-blue text-white shadow-lg disabled:opacity-60"
                            >
                                {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                Registrar estudiante
                            </button>
                            <Link
                                href={students.index().url}
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

StudentsCreate.layout = {
    breadcrumbs: [
        { title: 'Estudiantes', href: students.index().url },
        { title: 'Nuevo', href: students.create().url },
    ],
};
