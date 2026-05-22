import { Head, Link, router } from '@inertiajs/react';
import { BookOpen, ChevronRight, Plus, Sparkles, Users, Zap } from 'lucide-react';
import subjects from '@/routes/subjects';

type Subject = {
    id: number;
    name: string;
    description: string | null;
    color: string;
    icon: string;
    students_count: number;
    activities_count: number;
};

type Child = { id: number; first_name: string; last_name: string };

export default function SubjectsIndex({
    subjects: subjectList,
    canCreate,
    children = [],
    selectedChildId = null,
}: {
    subjects: Subject[];
    canCreate: boolean;
    children?: Child[];
    selectedChildId?: number | null;
}) {
    const isPadre = children.length > 0 || selectedChildId !== null;
    const needsChildSelect = isPadre && children.length > 1 && !selectedChildId;

    function selectChild(id: number) {
        router.get(subjects.index().url, { child_id: id }, { preserveState: false });
    }

    return (
        <>
            <Head title="Materias" />
            <div className="flex flex-1 flex-col gap-6 p-6">

                {/* Header */}
                <div className="flex items-center justify-between animate-slide-up">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                            Materias
                        </h1>
                        {!needsChildSelect && (
                            <p className="mt-0.5 text-sm font-semibold text-slate-500">
                                {subjectList.length} {subjectList.length === 1 ? 'materia' : 'materias'} disponibles
                            </p>
                        )}
                    </div>
                    {canCreate && (
                        <Link href={subjects.create()} className="btn-kids gradient-blue text-white shadow-lg">
                            <Plus className="h-4 w-4" />
                            Nueva Materia
                        </Link>
                    )}
                </div>

                {/* Child selector (padre with multiple children) */}
                {isPadre && children.length > 1 && (
                    <div className="card-kids border border-slate-200 p-5 space-y-3 animate-pop-in">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-kids-purple" />
                            <h2 className="font-bold text-slate-700">
                                {needsChildSelect ? 'Selecciona un hijo para ver sus materias' : 'Cambiar hijo'}
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {children.map(child => (
                                <button
                                    key={child.id}
                                    type="button"
                                    onClick={() => selectChild(child.id)}
                                    className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition-all ${
                                        selectedChildId === child.id
                                            ? 'gradient-purple text-white shadow-md'
                                            : 'bg-kids-purple-light text-kids-purple hover:shadow-md'
                                    }`}
                                >
                                    <div className={`flex h-7 w-7 items-center justify-center rounded-xl text-xs font-black ${
                                        selectedChildId === child.id ? 'bg-white/20' : 'bg-kids-purple/20'
                                    }`}>
                                        {child.first_name.charAt(0)}{child.last_name.charAt(0)}
                                    </div>
                                    {child.first_name} {child.last_name}
                                    {selectedChildId === child.id && <ChevronRight className="h-3.5 w-3.5" />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main content */}
                {needsChildSelect ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-purple-200 bg-white/60 py-20 text-center animate-pop-in">
                        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl gradient-purple shadow-lg animate-float">
                            <Users className="h-10 w-10 text-white" strokeWidth={2} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-700" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                            ¿De qué hijo quieres ver las materias?
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-slate-400">
                            Selecciona un hijo en el panel de arriba
                        </p>
                    </div>
                ) : subjectList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-purple-200 bg-white/60 py-20 text-center animate-pop-in">
                        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl gradient-blue shadow-lg animate-float">
                            <BookOpen className="h-10 w-10 text-white" strokeWidth={2} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-700" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                            Sin materias aún
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-slate-400">
                            {canCreate ? 'Crea tu primera materia para empezar' : 'No hay materias asignadas'}
                        </p>
                        {canCreate && (
                            <Link href={subjects.create()} className="btn-kids mt-6 gradient-blue text-white shadow-lg">
                                <Plus className="h-4 w-4" />
                                Crear primera materia
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {subjectList.map((subject, i) => (
                            <Link
                                key={subject.id}
                                href={subjects.show(subject.id)}
                                className="card-kids group cursor-pointer overflow-hidden border-0 animate-pop-in"
                                style={{ animationDelay: `${i * 0.05}s` }}
                            >
                                <div
                                    className="relative h-28 overflow-hidden"
                                    style={{ background: `linear-gradient(135deg, ${subject.color} 0%, ${subject.color}BB 100%)` }}
                                >
                                    <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/15" />
                                    <div className="absolute -bottom-6 right-8 h-14 w-14 rounded-full bg-white/10" />
                                    <div className="absolute bottom-4 left-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/25 backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:rotate-3">
                                        <BookOpen className="h-6 w-6 text-white" strokeWidth={2.5} />
                                    </div>
                                    <Sparkles className="absolute right-4 top-4 h-5 w-5 text-white/50" />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-kids-purple transition-colors" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                        {subject.name}
                                    </h3>
                                    {subject.description && (
                                        <p className="mt-1 line-clamp-2 text-sm font-medium text-slate-500">{subject.description}</p>
                                    )}
                                    <div className="mt-4 flex gap-2">
                                        <span className="badge-kids bg-kids-blue-light text-kids-blue">
                                            <Zap className="h-3 w-3" />
                                            {subject.activities_count} actividades
                                        </span>
                                        {subject.students_count !== undefined && (
                                            <span className="badge-kids bg-kids-green-light text-kids-green">
                                                <Users className="h-3 w-3" />
                                                {subject.students_count} niños
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

SubjectsIndex.layout = {
    breadcrumbs: [{ title: 'Materias', href: subjects.index() }],
};
