import { Head, Link, useForm } from '@inertiajs/react';
import { BookOpen, Plus, Sparkles, Users, Zap } from 'lucide-react';
import activities from '@/routes/activities';
import subjects from '@/routes/subjects';

type Student = { id: number; first_name: string; last_name: string; age: number | null };
type MiniActivity = { id: number; title: string; type: string };
type Activity = {
    id: number;
    title: string;
    description: string | null;
    is_published: boolean;
    mini_activities: MiniActivity[];
};
type Subject = {
    id: number;
    name: string;
    description: string | null;
    color: string;
    activities: Activity[];
    students: Student[];
};

const TYPE_LABELS: Record<string, { label: string; bg: string; text: string }> = {
    video: { label: 'Video', bg: 'bg-kids-red-light', text: 'text-kids-red' },
    image: { label: 'Imagen', bg: 'bg-kids-blue-light', text: 'text-kids-blue' },
    quiz: { label: 'Quiz', bg: 'bg-kids-purple-light', text: 'text-kids-purple' },
    flashcard: { label: 'Tarjetas', bg: 'bg-kids-green-light', text: 'text-kids-green' },
    pdf: { label: 'PDF', bg: 'bg-kids-orange-light', text: 'text-kids-orange' },
};

export default function SubjectsShow({
    subject,
    gradeStudents,
    canManage,
}: {
    subject: Subject;
    gradeStudents: Student[];
    canManage: boolean;
}) {
    const enrolledIds = subject.students.map(s => s.id);
    const { data, setData, post, processing } = useForm({
        student_ids: enrolledIds,
    });

    function toggleStudent(id: number) {
        const ids = data.student_ids.includes(id)
            ? data.student_ids.filter(i => i !== id)
            : [...data.student_ids, id];
        setData('student_ids', ids);
    }

    function saveStudents(e: React.FormEvent) {
        e.preventDefault();
        post(subjects.students.sync(subject.id).url);
    }

    return (
        <>
            <Head title={subject.name} />
            <div className="flex flex-1 flex-col gap-6 p-6">

                {/* Header */}
                <div
                    className="relative overflow-hidden rounded-3xl p-8 text-white shadow-xl animate-pop-in"
                    style={{ background: `linear-gradient(135deg, ${subject.color} 0%, ${subject.color}BB 100%)` }}
                >
                    <div className="relative z-10">
                        <div className="mb-3 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm">
                                <BookOpen className="h-8 w-8 text-white" strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold leading-tight" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                    {subject.name}
                                </h1>
                                {subject.description && (
                                    <p className="mt-0.5 font-semibold text-white/80">{subject.description}</p>
                                )}
                            </div>
                        </div>
                        <div className="mt-2 flex gap-3">
                            <span className="badge-kids bg-white/20 text-white backdrop-blur-sm">
                                <Zap className="h-3 w-3" />
                                {subject.activities.length} actividades
                            </span>
                            <span className="badge-kids bg-white/20 text-white backdrop-blur-sm">
                                <Users className="h-3 w-3" />
                                {subject.students.length} estudiantes
                            </span>
                        </div>
                    </div>
                    <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/10 animate-float" />
                    <div className="absolute -bottom-10 right-20 h-24 w-24 rounded-full bg-white/10 animate-float" style={{ animationDelay: '1.5s' }} />
                    <Sparkles className="absolute right-10 top-6 h-7 w-7 text-white/25 animate-spin-slow" />
                </div>

                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Activities */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-blue shadow-sm">
                                    <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
                                </div>
                                Actividades
                            </h2>
                            {canManage && (
                                <Link
                                    href={subjects.activities.create(subject.id)}
                                    className="btn-kids gradient-blue text-white shadow-md"
                                >
                                    <Plus className="h-4 w-4" />
                                    Nueva Actividad
                                </Link>
                            )}
                        </div>

                        {subject.activities.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white/60 py-14 text-center">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-blue shadow-md animate-float">
                                    <Zap className="h-7 w-7 text-white" strokeWidth={2} />
                                </div>
                                <p className="font-bold text-slate-500">Sin actividades aún</p>
                                {canManage && (
                                    <Link
                                        href={subjects.activities.create(subject.id)}
                                        className="btn-kids mt-4 gradient-blue text-white shadow"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Crear Actividad
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {subject.activities.map((act, i) => (
                                    <Link
                                        key={act.id}
                                        href={activities.show(act.id)}
                                        className="card-kids flex items-center gap-4 border-0 p-4 animate-slide-up"
                                        style={{ animationDelay: `${i * 0.05}s` }}
                                    >
                                        <div
                                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl text-white font-bold text-sm shadow-md"
                                            style={{ background: `linear-gradient(135deg, ${subject.color} 0%, ${subject.color}99 100%)` }}
                                        >
                                            {i + 1}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-bold text-slate-800 truncate" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                                {act.title}
                                            </p>
                                            <div className="mt-1 flex flex-wrap gap-1">
                                                {act.mini_activities.map(ma => {
                                                    const cfg = TYPE_LABELS[ma.type] ?? { label: ma.type, bg: 'bg-slate-100', text: 'text-slate-500' };
                                                    return (
                                                        <span key={ma.id} className={`badge-kids ${cfg.bg} ${cfg.text} text-xs`}>
                                                            {cfg.label}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <span className={`badge-kids ${act.is_published ? 'gradient-green text-white shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                                            {act.is_published ? 'Publicada' : 'Borrador'}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Students panel */}
                    {canManage && (
                        <div>
                            <h2 className="mb-4 text-xl font-bold text-slate-800 flex items-center gap-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-green shadow-sm">
                                    <Users className="h-4 w-4 text-white" strokeWidth={2.5} />
                                </div>
                                Estudiantes
                            </h2>
                            <form onSubmit={saveStudents} className="card-kids border-0 p-5">
                                <p className="mb-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    Niños asignados
                                </p>
                                <div className="max-h-64 space-y-1.5 overflow-y-auto pr-1">
                                    {gradeStudents.length === 0 ? (
                                        <p className="py-4 text-center text-sm font-semibold text-slate-400">
                                            No hay estudiantes registrados
                                        </p>
                                    ) : (
                                        gradeStudents.map(student => (
                                            <label
                                                key={student.id}
                                                className="flex cursor-pointer items-center gap-3 rounded-2xl p-2.5 transition hover:bg-kids-purple-light"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={data.student_ids.includes(student.id)}
                                                    onChange={() => toggleStudent(student.id)}
                                                    className="h-4 w-4 rounded accent-kids-purple"
                                                />
                                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl gradient-purple text-white text-xs font-bold shadow-sm">
                                                    {student.first_name.charAt(0)}{student.last_name.charAt(0)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-slate-700 truncate">{student.first_name} {student.last_name}</p>
                                                </div>
                                            </label>
                                        ))
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-kids mt-4 w-full gradient-green text-white shadow-md disabled:opacity-60"
                                >
                                    Guardar Asignación
                                </button>
                            </form>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}

SubjectsShow.layout = {
    breadcrumbs: [{ title: 'Materias', href: subjects.index() }],
};
