import { Head, Link, router } from '@inertiajs/react';
import { Edit2, GraduationCap, Plus, Trash2, User, Users } from 'lucide-react';
import students from '@/routes/students';

type Student = {
    id: number;
    first_name: string;
    last_name: string;
    age: number | null;
    grade: { id: number; name: string } | null;
    parent: { id: number; name: string; email: string } | null;
};

export default function StudentsIndex({ students: studentList }: { students: Student[] }) {
    function destroy(student: Student) {
        if (!confirm(`¿Eliminar a "${student.first_name} ${student.last_name}"?`)) return;
        router.delete(students.destroy(student.id).url);
    }

    return (
        <>
            <Head title="Estudiantes" />
            <div className="flex flex-1 flex-col gap-6 p-6">

                <div className="flex items-center justify-between animate-slide-up">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-blue shadow-md">
                            <Users className="h-6 w-6 text-white" strokeWidth={2} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Estudiantes
                            </h1>
                            <p className="text-sm font-semibold text-slate-500">
                                {studentList.length} estudiante{studentList.length !== 1 ? 's' : ''} registrados
                            </p>
                        </div>
                    </div>
                    <Link href={students.create().url} className="btn-kids gradient-blue text-white shadow-md">
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                        Nuevo estudiante
                    </Link>
                </div>

                {studentList.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16">
                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl gradient-blue shadow-lg animate-float">
                            <Users className="h-10 w-10 text-white" strokeWidth={1.5} />
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-slate-700" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Sin estudiantes aún
                            </h2>
                            <p className="mt-1 text-sm font-semibold text-slate-400">
                                Registra estudiantes y asígnalos a un padre de familia
                            </p>
                        </div>
                        <Link href={students.create().url} className="btn-kids gradient-blue text-white shadow-md">
                            <Plus className="h-4 w-4" strokeWidth={2.5} />
                            Registrar estudiante
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-slate-100">
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">Estudiante</th>
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">Grado</th>
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">Padre / Madre</th>
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">Edad</th>
                                    <th className="px-5 py-4" />
                                </tr>
                            </thead>
                            <tbody>
                                {studentList.map((student, i) => (
                                    <tr
                                        key={student.id}
                                        className="border-b border-slate-50 last:border-0 hover:bg-kids-blue-light/30 transition-colors"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-purple text-white text-sm font-bold shadow-sm">
                                                    {student.first_name.charAt(0)}{student.last_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800">
                                                        {student.first_name} {student.last_name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            {student.grade ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-xl bg-kids-green-light px-3 py-1 text-xs font-bold text-kids-green">
                                                    <GraduationCap className="h-3.5 w-3.5" strokeWidth={2.5} />
                                                    {student.grade.name}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-slate-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            {student.parent ? (
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-slate-400 shrink-0" strokeWidth={2} />
                                                    <span className="text-sm font-semibold text-slate-600">{student.parent.name}</span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400">Sin padre asignado</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-sm font-semibold text-slate-600">
                                                {student.age ? `${student.age} años` : '—'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={students.edit(student.id).url}
                                                    className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-500 transition hover:border-kids-blue hover:text-kids-blue"
                                                >
                                                    <Edit2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                                                </Link>
                                                <button
                                                    onClick={() => destroy(student)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-500 transition hover:border-kids-red hover:text-kids-red"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

StudentsIndex.layout = {
    breadcrumbs: [{ title: 'Estudiantes', href: students.index().url }],
};
