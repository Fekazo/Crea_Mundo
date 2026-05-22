import { Head, router } from '@inertiajs/react';
import {
    BookOpen,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Edit2,
    FileText,
    Flame,
    HelpCircle,
    Image,
    Layers,
    Trash2,
    Trophy,
    TrendingUp,
    Users,
    Video,
} from 'lucide-react';
import { useState } from 'react';
import activities from '@/routes/activities';
import miniActivities from '@/routes/mini-activities';
import subjects from '@/routes/subjects';

type QuizQuestion = { text: string; options: string[]; correct: number };
type Flashcard = { front: string; back: string };

type MiniActivity = {
    id: number;
    title: string;
    type: 'video' | 'image' | 'quiz' | 'flashcard' | 'text';
    content: Record<string, unknown>;
    order: number;
};

type Activity = {
    id: number;
    title: string;
    description: string | null;
    is_published: boolean;
    subject: { id: number; name: string; color: string };
    mini_activities: MiniActivity[];
};

type StudentProgressItem = {
    student: { id: number; first_name: string; last_name: string };
    scores: Record<number, number>;
    completed: number;
    total: number;
    avg: number | null;
};

const TYPE_ICONS = {
    video: Video,
    image: Image,
    quiz: HelpCircle,
    flashcard: Layers,
    text: FileText,
} as const;

const TYPE_COLORS: Record<string, string> = {
    video: 'text-kids-red',
    image: 'text-kids-blue',
    quiz: 'text-kids-purple',
    flashcard: 'text-kids-green',
    text: 'text-kids-orange',
};

function getYoutubeEmbedUrl(url: string): string {
    const match = url.match(/(?:v=|youtu\.be\/)([^&?\s]+)/);
    return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : url;
}

function VideoPlayer({ content }: { content: { url: string; title?: string } }) {
    return (
        <div className="overflow-hidden rounded-2xl shadow-lg aspect-video">
            <iframe
                src={getYoutubeEmbedUrl(content.url)}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={content.title ?? 'Video'}
            />
        </div>
    );
}

function ImageViewer({ content }: { content: { url: string; caption?: string } }) {
    return (
        <div className="space-y-3 text-center">
            <img
                src={content.url}
                alt={content.caption ?? ''}
                className="mx-auto max-h-96 rounded-2xl shadow-lg object-contain"
            />
            {content.caption && (
                <p className="text-sm font-semibold text-slate-500 italic">{content.caption}</p>
            )}
        </div>
    );
}

function TextViewer({ content }: { content: { html?: string } }) {
    if (!content.html) return (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
            <FileText className="h-12 w-12 text-slate-300" />
            <p className="font-semibold text-slate-400">Sin contenido</p>
        </div>
    );
    return (
        <div
            className="prose prose-sm max-w-none text-slate-700 leading-relaxed
                [&_h2]:text-xl [&_h2]:font-black [&_h2]:text-slate-800 [&_h2]:mt-4 [&_h2]:mb-2
                [&_p]:mb-3 [&_p]:font-medium
                [&_strong]:font-black [&_strong]:text-slate-800
                [&_em]:italic
                [&_u]:underline
                [&_a]:text-kids-blue [&_a]:font-semibold [&_a]:underline [&_a]:hover:text-kids-purple
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:mb-3
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ol]:mb-3
                [&_li]:font-medium
                [&_hr]:border-slate-200 [&_hr]:my-4
                [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-3 [&_img]:max-w-full"
            dangerouslySetInnerHTML={{ __html: content.html }}
        />
    );
}

function QuizPlayer({
    content,
    onComplete,
}: {
    content: { questions: QuizQuestion[] };
    onComplete: (score: number) => void;
}) {
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [done, setDone] = useState(false);

    const questions = content.questions ?? [];
    const q = questions[currentQ];

    function confirm() {
        if (selected === null) return;
        const correct = selected === q.correct;
        const newAnswers = [...answers, correct];
        if (currentQ + 1 >= questions.length) {
            setAnswers(newAnswers);
            setDone(true);
            const score = Math.round((newAnswers.filter(Boolean).length / questions.length) * 100);
            onComplete(score);
        } else {
            setAnswers(newAnswers);
            setCurrentQ(c => c + 1);
            setSelected(null);
        }
    }

    if (done) {
        const score = Math.round((answers.filter(Boolean).length / questions.length) * 100);
        const great = score >= 70;
        return (
            <div className="flex flex-col items-center gap-5 py-8 text-center animate-bounce-in">
                <div className={`flex h-24 w-24 items-center justify-center rounded-3xl shadow-xl ${great ? 'gradient-yellow' : 'gradient-blue'}`}>
                    {great
                        ? <Trophy className="h-12 w-12 text-white" strokeWidth={1.5} />
                        : <Flame className="h-12 w-12 text-white" strokeWidth={1.5} />
                    }
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                        {great ? '¡Excelente!' : '¡Sigue practicando!'}
                    </h3>
                    <p className="mt-1 font-semibold text-slate-500">
                        {answers.filter(Boolean).length} de {questions.length} correctas
                    </p>
                </div>
                <div className={`flex h-20 w-20 items-center justify-center rounded-full shadow-lg ${great ? 'gradient-green' : 'gradient-purple'}`}>
                    <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Fredoka, sans-serif' }}>{score}%</span>
                </div>
            </div>
        );
    }

    const progress = (currentQ / questions.length) * 100;

    return (
        <div className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-between text-sm font-bold text-slate-500">
                <span>Pregunta {currentQ + 1} de {questions.length}</span>
                <span className="badge-kids bg-kids-green-light text-kids-green">
                    {answers.filter(Boolean).length} correctas
                </span>
            </div>

            {/* Progress bar */}
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                    className="absolute inset-y-0 left-0 gradient-blue rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Question */}
            <div className="rounded-2xl bg-kids-purple-light p-5">
                <p className="text-lg font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                    {q.text}
                </p>
            </div>

            {/* Options */}
            <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => (
                    <button
                        key={oi}
                        type="button"
                        onClick={() => setSelected(oi)}
                        className={`rounded-2xl border-2 p-4 text-left text-sm font-bold transition-all ${
                            selected === oi
                                ? 'border-kids-purple bg-kids-purple-light text-kids-purple shadow-md scale-[1.02]'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-kids-purple/40 hover:bg-kids-purple-light/50'
                        }`}
                    >
                        <span
                            className={`mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-black ${
                                selected === oi ? 'gradient-purple text-white' : 'bg-slate-100 text-slate-500'
                            }`}
                        >
                            {String.fromCharCode(65 + oi)}
                        </span>
                        {opt}
                    </button>
                ))}
            </div>

            <button
                type="button"
                onClick={confirm}
                disabled={selected === null}
                className="btn-kids w-full gradient-blue text-white shadow-lg disabled:opacity-50"
            >
                {currentQ + 1 < questions.length ? 'Siguiente →' : 'Terminar Quiz'}
            </button>
        </div>
    );
}

function FlashcardPlayer({ content }: { content: { cards: Flashcard[] } }) {
    const [idx, setIdx] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const cards = content.cards ?? [];
    const card = cards[idx];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">
                    Tarjeta {idx + 1} de {cards.length}
                </span>
                <span className="badge-kids bg-kids-blue-light text-kids-blue text-xs">
                    Toca para voltear
                </span>
            </div>

            <div
                className="relative h-52 cursor-pointer select-none"
                onClick={() => setFlipped(f => !f)}
                style={{ perspective: '1000px' }}
            >
                <div
                    className="relative h-full w-full transition-transform duration-500"
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                >
                    {/* Front */}
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl gradient-blue shadow-xl p-6 text-center"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                            {card?.front}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-white/60">Frente</p>
                    </div>
                    {/* Back */}
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl gradient-green shadow-xl p-6 text-center"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                            {card?.back}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-white/60">Respuesta</p>
                    </div>
                </div>
            </div>

            {/* Dot progress */}
            <div className="flex justify-center gap-1.5">
                {cards.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => { setIdx(i); setFlipped(false); }}
                        className={`h-2.5 rounded-full transition-all duration-200 ${i === idx ? 'w-6 gradient-blue' : 'w-2.5 bg-slate-200'}`}
                    />
                ))}
            </div>

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => { setIdx(i => Math.max(0, i - 1)); setFlipped(false); }}
                    disabled={idx === 0}
                    className="btn-kids flex-1 border-2 border-slate-200 bg-white text-slate-600 disabled:opacity-40"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                </button>
                <button
                    type="button"
                    onClick={() => { setIdx(i => Math.min(cards.length - 1, i + 1)); setFlipped(false); }}
                    disabled={idx === cards.length - 1}
                    className="btn-kids flex-1 gradient-blue text-white shadow disabled:opacity-40"
                >
                    Siguiente
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export default function ActivitiesShow({
    activity,
    progressMap,
    canManage,
    studentProgress = [],
}: {
    activity: Activity;
    progressMap: Record<number, number>;
    canManage: boolean;
    studentProgress?: StudentProgressItem[];
}) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const minis = activity.mini_activities;
    const current = minis[currentIdx];

    function saveProgress(score: number) {
        if (!current) return;
        router.post(
            miniActivities.progress(current.id),
            { score },
            { preserveScroll: true }
        );
    }

    function togglePublish() {
        router.patch(activities.update(activity.id).url, {
            title: activity.title,
            description: activity.description,
            is_published: !activity.is_published,
        }, { preserveScroll: true });
    }

    function deleteActivity() {
        router.delete(activities.destroy(activity.id).url);
    }

    const Icon = current ? TYPE_ICONS[current.type] : null;
    const iconColor = current ? TYPE_COLORS[current.type] : '';

    return (
        <>
            <Head title={activity.title} />
            <div className="mx-auto max-w-2xl p-6 space-y-5">

                {/* Header */}
                <div
                    className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl animate-pop-in"
                    style={{ background: `linear-gradient(135deg, ${activity.subject.color} 0%, ${activity.subject.color}BB 100%)` }}
                >
                    <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                            <BookOpen className="h-6 w-6 text-white" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl font-bold leading-tight" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                {activity.title}
                            </h1>
                            {activity.description && (
                                <p className="text-sm font-semibold text-white/75">{activity.description}</p>
                            )}
                            <div className="mt-1 flex items-center gap-2">
                                <p className="text-xs font-bold text-white/55">{activity.subject.name}</p>
                                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${activity.is_published ? 'bg-white/20' : 'bg-black/20'}`}>
                                    {activity.is_published ? 'Publicada' : 'Borrador'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Manage actions */}
                    {canManage && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            <a
                                href={activities.edit(activity.id).url}
                                className="flex items-center gap-1.5 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/30"
                            >
                                <Edit2 className="h-3.5 w-3.5" />
                                Editar
                            </a>
                            <button
                                type="button"
                                onClick={togglePublish}
                                className="flex items-center gap-1.5 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/30"
                            >
                                {activity.is_published ? 'Volver a borrador' : 'Publicar'}
                            </button>
                            {studentProgress.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setShowProgress(p => !p)}
                                    className="flex items-center gap-1.5 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/30"
                                >
                                    <TrendingUp className="h-3.5 w-3.5" />
                                    Progreso estudiantes
                                </button>
                            )}
                            {!confirmDelete ? (
                                <button
                                    type="button"
                                    onClick={() => setConfirmDelete(true)}
                                    className="flex items-center gap-1.5 rounded-xl bg-red-500/30 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-red-500/50"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Eliminar
                                </button>
                            ) : (
                                <div className="flex gap-1.5">
                                    <button
                                        type="button"
                                        onClick={deleteActivity}
                                        className="flex items-center gap-1 rounded-xl bg-red-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-600"
                                    >
                                        ¿Confirmar?
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setConfirmDelete(false)}
                                        className="rounded-xl bg-white/20 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/30"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 animate-float" />
                </div>

                {/* Student progress panel */}
                {canManage && showProgress && studentProgress.length > 0 && (
                    <div className="card-kids border border-slate-200 p-5 space-y-4 animate-slide-up">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-kids-purple" />
                            <h2 className="font-black text-slate-700">Progreso por Estudiante</h2>
                        </div>

                        {/* Quiz scores table — shown when activity has quizzes */}
                        {minis.some(m => m.type === 'quiz') && (
                            <div className="overflow-x-auto rounded-2xl border border-slate-100">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-kids-purple-light">
                                            <th className="py-2.5 pl-4 pr-3 text-left text-xs font-black text-kids-purple">Estudiante</th>
                                            {minis.filter(m => m.type === 'quiz').map(q => (
                                                <th key={q.id} className="px-3 py-2.5 text-center text-xs font-black text-kids-purple">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <HelpCircle className="h-3 w-3" />
                                                        <span className="max-w-[80px] truncate">{q.title}</span>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentProgress.map((item, idx) => (
                                            <tr key={item.student.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                                <td className="py-2.5 pl-4 pr-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg gradient-purple shadow-sm">
                                                            <span className="text-[10px] font-black text-white">
                                                                {item.student.first_name.charAt(0)}{item.student.last_name.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <span className="font-bold text-slate-700 whitespace-nowrap">
                                                            {item.student.first_name} {item.student.last_name}
                                                        </span>
                                                    </div>
                                                </td>
                                                {minis.filter(m => m.type === 'quiz').map(q => {
                                                    const score = item.scores[q.id];
                                                    return (
                                                        <td key={q.id} className="px-3 py-2.5 text-center">
                                                            {score !== undefined ? (
                                                                <span className={`inline-flex items-center justify-center rounded-xl px-2.5 py-1 text-sm font-black ${
                                                                    score >= 80
                                                                        ? 'bg-kids-green-light text-kids-green'
                                                                        : score >= 50
                                                                        ? 'bg-kids-blue-light text-kids-blue'
                                                                        : 'bg-kids-red-light text-kids-red'
                                                                }`}>
                                                                    {score}%
                                                                </span>
                                                            ) : (
                                                                <span className="text-xs font-bold text-slate-300">—</span>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Overall progress bars */}
                        <div className="space-y-2">
                            {studentProgress.map(item => {
                                const pct = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;
                                return (
                                    <div key={item.student.id} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl gradient-purple shadow-sm">
                                            <span className="text-xs font-black text-white">
                                                {item.student.first_name.charAt(0)}{item.student.last_name.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-slate-700 truncate">
                                                {item.student.first_name} {item.student.last_name}
                                            </p>
                                            <div className="mt-1 flex items-center gap-2">
                                                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                                                    <div
                                                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                                                        style={{
                                                            width: `${pct}%`,
                                                            background: pct >= 80 ? '#06D6A0' : pct >= 50 ? '#3B9EFF' : '#FF4D6D',
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-slate-500 w-10 text-right">{pct}%</span>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-xs font-bold text-slate-400">{item.completed}/{item.total}</p>
                                            {item.avg !== null && (
                                                <p className="text-xs font-bold text-kids-purple">{item.avg} pts</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Breadcrumb progress */}
                {minis.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {minis.map((mini, i) => {
                            const done = progressMap[mini.id] !== undefined;
                            return (
                                <button
                                    key={mini.id}
                                    type="button"
                                    onClick={() => setCurrentIdx(i)}
                                    className={`flex flex-shrink-0 items-center gap-1.5 rounded-2xl px-3 py-1.5 text-xs font-bold transition-all ${
                                        i === currentIdx
                                            ? 'gradient-blue text-white shadow-md'
                                            : done
                                            ? 'bg-kids-green-light text-kids-green'
                                            : 'bg-white text-slate-500 hover:bg-kids-purple-light hover:text-kids-purple shadow-sm'
                                    }`}
                                >
                                    {done && <CheckCircle className="h-3 w-3" />}
                                    {i + 1}. {mini.title}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Content */}
                {current && (
                    <div className="card-kids border-0 p-6 space-y-5 animate-slide-up" key={current.id}>
                        <div className="flex items-center gap-3">
                            {Icon && (
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">
                                    <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={2} />
                                </div>
                            )}
                            <h2 className="font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                {current.title}
                            </h2>
                            {progressMap[current.id] !== undefined && (
                                <span className="badge-kids ml-auto gradient-green text-white shadow-sm">
                                    <CheckCircle className="h-3 w-3" />
                                    {progressMap[current.id]}%
                                </span>
                            )}
                        </div>

                        {current.type === 'video' && <VideoPlayer content={current.content as { url: string; title?: string }} />}
                        {current.type === 'image' && <ImageViewer content={current.content as { url: string; caption?: string }} />}
                        {current.type === 'text' && <TextViewer content={current.content as { html?: string }} />}
                        {current.type === 'quiz' && (
                            <QuizPlayer content={current.content as { questions: QuizQuestion[] }} onComplete={saveProgress} />
                        )}
                        {current.type === 'flashcard' && (
                            <FlashcardPlayer content={current.content as { cards: Flashcard[] }} />
                        )}

                        {(current.type === 'video' || current.type === 'image' || current.type === 'text' || current.type === 'flashcard') && (
                            <button
                                type="button"
                                onClick={() => saveProgress(100)}
                                className="btn-kids w-full gradient-green text-white shadow-md"
                            >
                                <CheckCircle className="h-4 w-4" />
                                Marcar como completado
                            </button>
                        )}
                    </div>
                )}

                {minis.length === 0 && (
                    <div className="flex flex-col items-center gap-4 py-16 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100">
                            <Layers className="h-8 w-8 text-slate-300" />
                        </div>
                        <p className="font-bold text-slate-400">Esta actividad no tiene contenido aún.</p>
                    </div>
                )}

                {/* Navigation */}
                {minis.length > 1 && (
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
                            disabled={currentIdx === 0}
                            className="btn-kids flex-1 border-2 border-slate-200 bg-white text-slate-600 disabled:opacity-40"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Anterior
                        </button>
                        <button
                            type="button"
                            onClick={() => setCurrentIdx(i => Math.min(minis.length - 1, i + 1))}
                            disabled={currentIdx === minis.length - 1}
                            className="btn-kids flex-1 gradient-blue text-white shadow-md disabled:opacity-40"
                        >
                            Siguiente
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                )}

            </div>
        </>
    );
}

ActivitiesShow.layout = {
    breadcrumbs: [{ title: 'Materias', href: subjects.index() }],
};
