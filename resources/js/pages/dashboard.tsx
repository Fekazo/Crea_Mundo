import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    Edit2,
    Globe,
    Layers,
    Rocket,
    Sparkles,
    Star,
    TrendingUp,
    UserCog,
    Users,
    Zap,
} from 'lucide-react';
import { dashboard } from '@/routes';
import students from '@/routes/students';
import subjects from '@/routes/subjects';

type Stats = {
    subjects: number;
    activities: number;
    students: number;
    progress: number | null;
};

type Child = { id: number; first_name: string; last_name: string; age: number | null };

export default function Dashboard({
    stats,
    children = [],
    userType,
}: {
    stats: Stats;
    children?: Child[];
    userType: string;
}) {
    const isPadre   = userType === 'padre';
    const isTeacher = userType === 'docente';
    const isAdmin   = userType === 'admin';

    const statCards = [
        {
            icon: BookOpen,
            label: 'Materias',
            value: stats.subjects,
            gradient: 'gradient-blue',
            bg: 'bg-kids-blue-light',
            text: 'text-kids-blue',
            delay: '0s',
        },
        {
            icon: Zap,
            label: 'Actividades',
            value: stats.activities,
            gradient: 'gradient-green',
            bg: 'bg-kids-green-light',
            text: 'text-kids-green',
            delay: '0.07s',
        },
        {
            icon: isPadre ? Star : Users,
            label: isPadre ? 'Progreso' : 'Estudiantes',
            value: isPadre
                ? (stats.progress !== null ? `${stats.progress}%` : '0%')
                : stats.students,
            gradient: isPadre ? 'gradient-yellow' : 'gradient-purple',
            bg: isPadre ? 'bg-kids-yellow-light' : 'bg-kids-purple-light',
            text: isPadre ? 'text-kids-yellow' : 'text-kids-purple',
            delay: '0.14s',
        },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">

                {/* Hero */}
                <div className="relative overflow-hidden rounded-3xl p-8 text-white gradient-blue shadow-xl animate-pop-in">
                    <div className="relative z-10">
                        <div className="mb-2 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                                <Globe className="h-7 w-7 text-white" strokeWidth={2} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold leading-tight" style={{ fontFamily: 'Fredoka, Nunito, sans-serif' }}>
                                    ¡Bienvenido a Crea Mundo!
                                </h1>
                                <p className="text-sm font-semibold text-blue-100">
                                    {isAdmin && 'Panel de Administración'}
                                    {isTeacher && 'Panel del Docente'}
                                    {isPadre && 'Tu espacio de aprendizaje'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-6 -top-6 h-36 w-36 rounded-full bg-white/10 animate-float" />
                    <div className="absolute -bottom-10 right-24 h-24 w-24 rounded-full bg-white/10 animate-float" style={{ animationDelay: '1.2s' }} />
                    <Sparkles className="absolute bottom-6 right-6 h-8 w-8 text-white/30 animate-spin-slow" />
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                    {statCards.map(({ icon: Icon, label, value, gradient, bg, text, delay }) => (
                        <div key={label} className={`card-kids ${bg} p-5 animate-pop-in`} style={{ animationDelay: delay }}>
                            <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl ${gradient} shadow-md`}>
                                <Icon className="h-5 w-5 text-white" strokeWidth={2.5} />
                            </div>
                            <p className={`text-3xl font-bold ${text}`} style={{ fontFamily: 'Fredoka, sans-serif' }}>{value}</p>
                            <p className="mt-0.5 text-sm font-bold text-slate-500">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Padre: Mis Hijos */}
                {isPadre && children.length > 0 && (
                    <div className="space-y-3">
                        <h2 className="text-xl font-bold text-slate-700" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                            Mis Hijos
                        </h2>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {children.map((child, i) => (
                                <div
                                    key={child.id}
                                    className="card-kids flex items-center gap-3 border-0 p-4 animate-pop-in"
                                    style={{ animationDelay: `${i * 0.06}s` }}
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl gradient-purple shadow-md">
                                        <span className="text-sm font-black text-white">
                                            {child.first_name.charAt(0)}{child.last_name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-slate-800 truncate">{child.first_name} {child.last_name}</p>
                                        {child.age && (
                                            <p className="text-xs font-semibold text-slate-400">{child.age} años</p>
                                        )}
                                    </div>
                                    <div className="flex gap-1.5">
                                        <Link
                                            href={`/subjects?child_id=${child.id}`}
                                            className="flex h-8 w-8 items-center justify-center rounded-xl bg-kids-blue-light text-kids-blue transition hover:shadow-md"
                                            title="Ver materias"
                                        >
                                            <BookOpen className="h-4 w-4" />
                                        </Link>
                                        <Link
                                            href={`/students/${child.id}/edit`}
                                            className="flex h-8 w-8 items-center justify-center rounded-xl bg-kids-purple-light text-kids-purple transition hover:shadow-md"
                                            title="Editar información"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Módulos */}
                <div>
                    <h2 className="mb-4 text-xl font-bold text-slate-700" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                        Módulos
                    </h2>
                    <div className="grid gap-5 md:grid-cols-3">

                        <Link
                            href={subjects.index()}
                            className="card-kids group cursor-pointer overflow-hidden border-0 p-0 animate-pop-in"
                            style={{ animationDelay: '0.1s' }}
                        >
                            <div className="gradient-blue p-6 text-center">
                                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:rotate-3">
                                    <BookOpen className="h-9 w-9 text-white" strokeWidth={2} />
                                </div>
                            </div>
                            <div className="p-5 text-center">
                                <h3 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Materias</h3>
                                <p className="mt-1.5 text-sm font-semibold text-slate-500">
                                    {isPadre ? 'Ver materias de tus hijos' : 'Gestiona materias educativas'}
                                </p>
                                <span className="badge-kids mt-4 gradient-blue text-white shadow-md">Abrir →</span>
                            </div>
                        </Link>

                        {(isAdmin || isTeacher) && (
                            <Link
                                href={students.index()}
                                className="card-kids group cursor-pointer overflow-hidden border-0 p-0 animate-pop-in"
                                style={{ animationDelay: '0.17s' }}
                            >
                                <div className="gradient-green p-6 text-center">
                                    <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:rotate-3">
                                        <Users className="h-9 w-9 text-white" strokeWidth={2} />
                                    </div>
                                </div>
                                <div className="p-5 text-center">
                                    <h3 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Estudiantes</h3>
                                    <p className="mt-1.5 text-sm font-semibold text-slate-500">
                                        {isAdmin ? 'Todos los estudiantes' : 'Tus estudiantes'}
                                    </p>
                                    <span className="badge-kids mt-4 gradient-green text-white shadow-md">Abrir →</span>
                                </div>
                            </Link>
                        )}

                        {isAdmin && (
                            <Link
                                href="/admin/users"
                                className="card-kids group cursor-pointer overflow-hidden border-0 p-0 animate-pop-in"
                                style={{ animationDelay: '0.24s' }}
                            >
                                <div className="gradient-purple p-6 text-center">
                                    <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:rotate-3">
                                        <UserCog className="h-9 w-9 text-white" strokeWidth={2} />
                                    </div>
                                </div>
                                <div className="p-5 text-center">
                                    <h3 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Usuarios</h3>
                                    <p className="mt-1.5 text-sm font-semibold text-slate-500">Docentes y administradores</p>
                                    <span className="badge-kids mt-4 gradient-purple text-white shadow-md">Abrir →</span>
                                </div>
                            </Link>
                        )}

                        {isTeacher && (
                            <div className="card-kids overflow-hidden border-0 p-0 opacity-60 animate-pop-in" style={{ animationDelay: '0.24s' }}>
                                <div className="gradient-purple p-6 text-center">
                                    <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                                        <TrendingUp className="h-9 w-9 text-white" strokeWidth={2} />
                                    </div>
                                </div>
                                <div className="p-5 text-center">
                                    <h3 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Reportes</h3>
                                    <p className="mt-1.5 text-sm font-semibold text-slate-500">Progreso detallado</p>
                                    <span className="badge-kids mt-4 bg-kids-purple-light text-kids-purple">Próximamente</span>
                                </div>
                            </div>
                        )}

                        {isPadre && (
                            <div className="card-kids overflow-hidden border-0 p-0 animate-pop-in" style={{ animationDelay: '0.17s' }}>
                                <div className="gradient-purple p-6 text-center">
                                    <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                                        <Users className="h-9 w-9 text-white" strokeWidth={2} />
                                    </div>
                                </div>
                                <div className="p-5 text-center">
                                    <h3 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>Mis Hijos</h3>
                                    <p className="mt-1.5 text-sm font-semibold text-slate-500">
                                        {children.length} {children.length === 1 ? 'hijo registrado' : 'hijos registrados'}
                                    </p>
                                    <span className="badge-kids mt-4 gradient-purple text-white shadow-md">
                                        {children.length} →
                                    </span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* CTA */}
                <div className="relative overflow-hidden rounded-3xl gradient-warm p-8 text-center text-white shadow-xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="relative z-10">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                            <Rocket className="h-9 w-9 text-white animate-float" strokeWidth={2} />
                        </div>
                        <h3 className="text-2xl font-bold" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                            {isPadre ? '¡A aprender se ha dicho!' : '¡Empieza a enseñar!'}
                        </h3>
                        <p className="mt-2 font-semibold text-white/80">
                            {isPadre
                                ? 'Selecciona una materia y empieza las actividades'
                                : 'Añade actividades interactivas y asigna estudiantes'}
                        </p>
                        <Link href={subjects.index()} className="btn-kids mt-5 bg-white text-kids-orange shadow-lg hover:shadow-xl">
                            <BookOpen className="h-4 w-4" />
                            {isPadre ? 'Ver Materias' : 'Ir a Materias'}
                        </Link>
                    </div>
                    <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/10 animate-float-slow" />
                    <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-white/10 animate-float" style={{ animationDelay: '2s' }} />
                    <Layers className="absolute right-10 top-8 h-8 w-8 text-white/20 animate-spin-slow" />
                </div>

            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
};
