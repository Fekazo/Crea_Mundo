import { Head, Link, useForm } from '@inertiajs/react';
import { BookOpen, GraduationCap, Loader2, Sparkles, User } from 'lucide-react';
import subjects from '@/routes/subjects';

const COLOR_OPTIONS = [
    { label: 'Azul', value: '#3B9EFF' },
    { label: 'Verde', value: '#06D6A0' },
    { label: 'Rojo', value: '#FF4D6D' },
    { label: 'Amarillo', value: '#F5C800' },
    { label: 'Morado', value: '#7C3AED' },
    { label: 'Naranja', value: '#FF6B35' },
    { label: 'Rosa', value: '#F72585' },
    { label: 'Aqua', value: '#00B4D8' },
];

type Grade = { id: number; name: string };
type Teacher = { id: number; name: string; email: string };
type Subject = {
    id: number;
    name: string;
    description: string | null;
    color: string;
    icon: string;
    grade_id: number | null;
    teacher_id: number;
};

export default function SubjectsEdit({
    subject,
    grades,
    teachers,
}: {
    subject: Subject;
    grades: Grade[];
    teachers: Teacher[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        name: subject.name,
        description: subject.description ?? '',
        color: subject.color,
        icon: subject.icon,
        grade_id: subject.grade_id?.toString() ?? '',
        teacher_id: subject.teacher_id.toString(),
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(subjects.update(subject.id).url);
    }

    return (
        <>
            <Head title={`Editar: ${subject.name}`} />
            <div className="mx-auto max-w-lg p-6">
                <div className="card-kids border-0 p-8 animate-pop-in">

                    <div className="mb-7 flex items-center gap-4">
                        <div
                            className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all duration-300"
                            style={{ background: `linear-gradient(135deg, ${data.color} 0%, ${data.color}99 100%)` }}
                        >
                            <BookOpen className="h-7 w-7 text-white" strokeWidth={2} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Editar Materia
                            </h1>
                            <p className="text-sm font-semibold text-slate-500">{subject.name}</p>
                        </div>
                        <Sparkles className="ml-auto h-6 w-6 text-kids-purple/40 animate-spin-slow" />
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
                            {errors.name && <p className="text-xs font-bold text-kids-red">{errors.name}</p>}
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
                            {errors.grade_id && <p className="text-xs font-bold text-kids-red">{errors.grade_id}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                <User className="h-4 w-4 text-kids-blue" strokeWidth={2.5} />
                                Docente asignado *
                            </label>
                            <select
                                value={data.teacher_id}
                                onChange={e => setData('teacher_id', e.target.value)}
                                className="input-kids"
                            >
                                <option value="">Selecciona un docente</option>
                                {teachers.map(t => (
                                    <option key={t.id} value={t.id}>{t.name} — {t.email}</option>
                                ))}
                            </select>
                            {errors.teacher_id && <p className="text-xs font-bold text-kids-red">{errors.teacher_id}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">Color</label>
                            <div className="flex flex-wrap gap-3">
                                {COLOR_OPTIONS.map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setData('color', opt.value)}
                                        className="relative h-10 w-10 rounded-2xl border-3 transition-all duration-200 hover:scale-110 active:scale-95"
                                        style={{
                                            background: opt.value,
                                            borderColor: data.color === opt.value ? '#1e1b4b' : 'transparent',
                                            boxShadow: data.color === opt.value
                                                ? `0 0 0 4px ${opt.value}40, 0 4px 12px ${opt.value}60`
                                                : `0 2px 8px ${opt.value}50`,
                                        }}
                                        title={opt.label}
                                    >
                                        {data.color === opt.value && (
                                            <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-black">
                                                ✓
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-1">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-kids flex-1 gradient-blue text-white shadow-lg disabled:opacity-60"
                            >
                                {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                Guardar Cambios
                            </button>
                            <Link
                                href={subjects.show(subject.id)}
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

SubjectsEdit.layout = {
    breadcrumbs: [{ title: 'Materias', href: subjects.index() }],
};
