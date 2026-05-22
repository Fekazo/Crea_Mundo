import { Head, Link, router } from '@inertiajs/react';
import { BookOpen, Edit2, GraduationCap, Plus, Trash2, Users } from 'lucide-react';
import grades from '@/routes/grades';

type Grade = {
    id: number;
    name: string;
    description: string | null;
    subjects_count: number;
    students_count: number;
};

export default function GradesIndex({ grades: gradeList }: { grades: Grade[] }) {
    function destroy(grade: Grade) {
        if (!confirm(`¿Eliminar el grado "${grade.name}"? Se eliminarán sus materias y estudiantes.`)) return;
        router.delete(grades.destroy(grade.id).url);
    }

    return (
        <>
            <Head title="Grados" />
            <div className="flex flex-1 flex-col gap-6 p-6">

                {/* Header */}
                <div className="flex items-center justify-between animate-slide-up">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-green shadow-md">
                            <GraduationCap className="h-6 w-6 text-white" strokeWidth={2} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Grados
                            </h1>
                            <p className="text-sm font-semibold text-slate-500">
                                {gradeList.length} grado{gradeList.length !== 1 ? 's' : ''} registrados
                            </p>
                        </div>
                    </div>
                    <Link href={grades.create().url} className="btn-kids gradient-green text-white shadow-md">
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                        Nuevo grado
                    </Link>
                </div>

                {gradeList.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16">
                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl gradient-green shadow-lg animate-float">
                            <GraduationCap className="h-10 w-10 text-white" strokeWidth={1.5} />
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-slate-700" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Sin grados aún
                            </h2>
                            <p className="mt-1 text-sm font-semibold text-slate-400">
                                Crea el primer grado para organizar materias y estudiantes
                            </p>
                        </div>
                        <Link href={grades.create().url} className="btn-kids gradient-green text-white shadow-md">
                            <Plus className="h-4 w-4" strokeWidth={2.5} />
                            Crear primer grado
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {gradeList.map((grade, i) => (
                            <div
                                key={grade.id}
                                className="card-kids border-0 overflow-hidden animate-pop-in"
                                style={{ animationDelay: `${i * 0.06}s` }}
                            >
                                <div className="gradient-green p-5">
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                                            <GraduationCap className="h-6 w-6 text-white" strokeWidth={2} />
                                        </div>
                                        <div className="flex gap-1.5">
                                            <Link
                                                href={grades.edit(grade.id).url}
                                                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30"
                                            >
                                                <Edit2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                                            </Link>
                                            <button
                                                onClick={() => destroy(grade)}
                                                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm transition hover:bg-red-400/60"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                        {grade.name}
                                    </h3>
                                    {grade.description && (
                                        <p className="mt-1 text-xs font-medium text-slate-500 line-clamp-2">{grade.description}</p>
                                    )}
                                    <div className="mt-3 flex gap-4">
                                        <div className="flex items-center gap-1.5">
                                            <BookOpen className="h-3.5 w-3.5 text-kids-blue" strokeWidth={2.5} />
                                            <span className="text-xs font-bold text-slate-600">
                                                {grade.subjects_count} materia{grade.subjects_count !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Users className="h-3.5 w-3.5 text-kids-green" strokeWidth={2.5} />
                                            <span className="text-xs font-bold text-slate-600">
                                                {grade.students_count} estudiante{grade.students_count !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

GradesIndex.layout = {
    breadcrumbs: [{ title: 'Grados', href: grades.index().url }],
};
