import { Head, router, useForm } from '@inertiajs/react';
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BookOpen, FileText, GripVertical, HelpCircle, Image, Layers, Loader2, Plus, Trash2, Video, X } from 'lucide-react';
import { useState } from 'react';
import RichTextEditor from '@/components/rich-text-editor';
import activities from '@/routes/activities';
import miniActivities from '@/routes/mini-activities';
import subjects from '@/routes/subjects';

type Subject = { id: number; name: string; color: string };

type ExistingMini = {
    id: number;
    title: string;
    type: string;
    content: Record<string, unknown>;
    order: number;
};

type QuizQuestion = { text: string; options: string[]; correct: number };
type Flashcard = { front: string; back: string };

type MiniDraft =
    | { type: 'video'; title: string; url: string }
    | { type: 'image'; title: string; url: string; caption: string }
    | { type: 'quiz'; title: string; questions: QuizQuestion[] }
    | { type: 'flashcard'; title: string; cards: Flashcard[] }
    | { type: 'text'; title: string; html: string };

type Activity = {
    id: number;
    title: string;
    description: string | null;
    is_published: boolean;
    subject: Subject;
    mini_activities: ExistingMini[];
};

const TYPE_CONFIG = {
    video:     { label: 'Video YouTube', icon: Video,      color: 'text-kids-red',    bg: 'bg-kids-red-light' },
    image:     { label: 'Imagen',        icon: Image,      color: 'text-kids-blue',   bg: 'bg-kids-blue-light' },
    quiz:      { label: 'Quiz',          icon: HelpCircle, color: 'text-kids-purple', bg: 'bg-kids-purple-light' },
    flashcard: { label: 'Flashcards',    icon: Layers,     color: 'text-kids-green',  bg: 'bg-kids-green-light' },
    text:      { label: 'Texto',         icon: FileText,   color: 'text-kids-orange', bg: 'bg-kids-orange-light' },
} as const;

type MiniType = keyof typeof TYPE_CONFIG;

function emptyDraft(type: MiniType): MiniDraft {
    if (type === 'video')     return { type, title: '', url: '' };
    if (type === 'image')     return { type, title: '', url: '', caption: '' };
    if (type === 'quiz')      return { type, title: '', questions: [{ text: '', options: ['', '', '', ''], correct: 0 }] };
    if (type === 'flashcard') return { type, title: '', cards: [{ front: '', back: '' }] };
    return { type, title: '', html: '' };
}

// ── Sortable item wrapper ────────────────────────────────────────────────────

function SortableMiniRow({
    mini,
    onRemove,
}: {
    mini: ExistingMini;
    onRemove: (id: number) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: mini.id });

    const cfg = TYPE_CONFIG[mini.type as MiniType] ?? TYPE_CONFIG.video;
    const Icon = cfg.icon;

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className={`card-kids flex items-center gap-3 border p-3 select-none transition-shadow ${cfg.bg} ${
                isDragging ? 'shadow-xl opacity-90 z-50 scale-[1.02]' : ''
            }`}
        >
            {/* Drag handle */}
            <button
                type="button"
                {...listeners}
                {...attributes}
                className="flex-shrink-0 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 transition touch-none"
                title="Arrastrar para reordenar"
            >
                <GripVertical className="h-5 w-5" />
            </button>

            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/60">
                <Icon className={`h-5 w-5 ${cfg.color}`} />
            </div>

            <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm truncate ${cfg.color}`}>{mini.title}</p>
                <p className="text-xs font-semibold text-slate-400">{cfg.label}</p>
            </div>

            <button
                type="button"
                onClick={() => onRemove(mini.id)}
                className="text-slate-300 hover:text-kids-red transition flex-shrink-0"
                title="Eliminar"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function ActivitiesEdit({ activity }: { activity: Activity }) {
    const { data, setData, processing, errors } = useForm({
        title:        activity.title,
        description:  activity.description ?? '',
        is_published: activity.is_published,
    });

    const [existingMinis, setExistingMinis] = useState<ExistingMini[]>(
        [...activity.mini_activities].sort((a, b) => a.order - b.order),
    );
    const [newMinis, setNewMinis]     = useState<MiniDraft[]>([]);
    const [addingType, setAddingType] = useState<MiniType | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [reordering, setReordering] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIdx = existingMinis.findIndex(m => m.id === active.id);
        const newIdx = existingMinis.findIndex(m => m.id === over.id);
        const reordered = arrayMove(existingMinis, oldIdx, newIdx);
        setExistingMinis(reordered);

        // Persist new order
        setReordering(true);
        fetch(miniActivities.reorder(activity.id).url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.cookie.match(/XSRF-TOKEN=([^;]+)/) ?? [])[1]
                    ? decodeURIComponent((document.cookie.match(/XSRF-TOKEN=([^;]+)/) ?? [])[1])
                    : (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ ids: reordered.map(m => m.id) }),
        }).finally(() => setReordering(false));
    }

    function removeMiniExisting(id: number) {
        router.delete(`/mini-activities/${id}`, {
            preserveScroll: true,
            onSuccess: () => setExistingMinis(prev => prev.filter(m => m.id !== id)),
        });
    }

    function addNewMini() {
        if (!addingType) return;
        setNewMinis(prev => [...prev, emptyDraft(addingType)]);
        setAddingType(null);
    }

    function removeNewMini(idx: number) {
        setNewMinis(prev => prev.filter((_, i) => i !== idx));
    }

    function updateNewMini(idx: number, updated: MiniDraft) {
        setNewMinis(prev => prev.map((m, i) => (i === idx ? updated : m)));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);

        const fd = new FormData();
        fd.append('_method', 'PATCH');
        fd.append('title', data.title);
        fd.append('description', data.description);
        fd.append('is_published', data.is_published ? '1' : '0');

        newMinis.forEach((mini, idx) => {
            fd.append(`minis[${idx}][type]`, mini.type);
            fd.append(`minis[${idx}][title]`, mini.title);
            if (mini.type === 'video')
                fd.append(`minis[${idx}][content]`, JSON.stringify({ url: mini.url }));
            else if (mini.type === 'image')
                fd.append(`minis[${idx}][content]`, JSON.stringify({ url: mini.url, caption: mini.caption }));
            else if (mini.type === 'quiz')
                fd.append(`minis[${idx}][content]`, JSON.stringify({ questions: mini.questions }));
            else if (mini.type === 'flashcard')
                fd.append(`minis[${idx}][content]`, JSON.stringify({ cards: mini.cards }));
            else if (mini.type === 'text')
                fd.append(`minis[${idx}][content]`, JSON.stringify({ html: mini.html }));
        });

        router.post(activities.update(activity.id).url, fd, {
            onFinish: () => setSubmitting(false),
        });
    }

    return (
        <>
            <Head title={`Editar: ${activity.title}`} />
            <div className="mx-auto max-w-3xl p-6 space-y-6">

                {/* Header */}
                <div className="flex items-center gap-3 animate-pop-in">
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-md"
                        style={{ background: `linear-gradient(135deg, ${activity.subject.color} 0%, ${activity.subject.color}99 100%)` }}
                    >
                        <BookOpen className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                            Editar Actividad
                        </h1>
                        <p className="text-sm font-semibold text-slate-500">{activity.subject.name}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Meta */}
                    <div className="card-kids border border-slate-200 p-6 space-y-4">
                        <h2 className="font-black text-slate-700">Información General</h2>

                        <div>
                            <label className="mb-1.5 block text-sm font-bold text-slate-700">Título *</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-sm font-semibold outline-none transition focus:border-kids-blue focus:ring-2 focus:ring-kids-blue/20"
                            />
                            {errors.title && <p className="mt-1 text-xs text-kids-red font-bold">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-bold text-slate-700">Descripción</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={2}
                                className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 text-sm font-semibold outline-none transition focus:border-kids-blue focus:ring-2 focus:ring-kids-blue/20"
                            />
                        </div>

                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.is_published}
                                onChange={e => setData('is_published', e.target.checked)}
                                className="h-4 w-4 rounded accent-kids-green"
                            />
                            <span className="text-sm font-bold text-slate-700">Publicar actividad</span>
                        </label>
                    </div>

                    {/* Existing minis — sortable */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="font-black text-slate-700 flex items-center gap-2">
                                <Layers className="h-5 w-5 text-kids-blue" />
                                Mini Actividades ({existingMinis.length})
                            </h2>
                            {reordering && (
                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    Guardando orden…
                                </span>
                            )}
                        </div>

                        {existingMinis.length === 0 && (
                            <p className="text-sm font-semibold text-slate-400 italic">Sin mini-actividades.</p>
                        )}

                        {existingMinis.length > 1 && (
                            <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                                <GripVertical className="h-3.5 w-3.5" />
                                Arrastra para reordenar
                            </p>
                        )}

                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={existingMinis.map(m => m.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-2">
                                    {existingMinis.map(mini => (
                                        <SortableMiniRow
                                            key={mini.id}
                                            mini={mini}
                                            onRemove={removeMiniExisting}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </div>

                    {/* New minis to add */}
                    <div className="space-y-3">
                        <h2 className="font-black text-slate-700 flex items-center gap-2">
                            <Plus className="h-5 w-5 text-kids-green" />
                            Agregar nuevas ({newMinis.length})
                        </h2>

                        {newMinis.map((mini, idx) => (
                            <NewMiniEditor key={idx} mini={mini} idx={idx} onUpdate={updateNewMini} onRemove={removeNewMini} />
                        ))}

                        {addingType === null ? (
                            <div className="grid grid-cols-5 gap-2">
                                {(Object.keys(TYPE_CONFIG) as MiniType[]).map(type => {
                                    const cfg = TYPE_CONFIG[type];
                                    const Icon = cfg.icon;
                                    return (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setAddingType(type)}
                                            className={`card-kids flex flex-col items-center gap-1.5 border p-3 text-center transition hover:scale-105 ${cfg.bg}`}
                                        >
                                            <Icon className={`h-5 w-5 ${cfg.color}`} />
                                            <span className={`text-xs font-bold ${cfg.color}`}>{cfg.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <button type="button" onClick={addNewMini} className="btn-kids gradient-blue text-white shadow">
                                    <Plus className="h-4 w-4" />
                                    Añadir {TYPE_CONFIG[addingType].label}
                                </button>
                                <button type="button" onClick={() => setAddingType(null)} className="btn-kids border border-slate-200 bg-white text-slate-500">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing || submitting}
                            className="btn-kids flex-1 gradient-blue text-white shadow-lg disabled:opacity-60"
                        >
                            {(processing || submitting) && <Loader2 className="h-4 w-4 animate-spin" />}
                            Guardar Cambios
                        </button>
                        <a
                            href={activities.show(activity.id).url}
                            className="btn-kids border-2 border-slate-200 bg-white text-slate-600"
                        >
                            Cancelar
                        </a>
                    </div>
                </form>
            </div>
        </>
    );
}

// ── New mini editor (unchanged from before) ──────────────────────────────────

function NewMiniEditor({ mini, idx, onUpdate, onRemove }: {
    mini: MiniDraft;
    idx: number;
    onUpdate: (idx: number, m: MiniDraft) => void;
    onRemove: (idx: number) => void;
}) {
    const cfg = TYPE_CONFIG[mini.type];
    const Icon = cfg.icon;

    return (
        <div className={`card-kids border p-4 space-y-3 animate-slide-up ${cfg.bg}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${cfg.color}`} />
                    <span className={`font-black text-sm ${cfg.color}`}>{cfg.label}</span>
                </div>
                <button type="button" onClick={() => onRemove(idx)} className="text-slate-400 hover:text-kids-red transition">
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>

            <input
                type="text"
                value={mini.title}
                onChange={e => onUpdate(idx, { ...mini, title: e.target.value })}
                placeholder="Título de esta mini-actividad"
                className="w-full rounded-xl border-2 border-white/60 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-kids-blue"
            />

            {mini.type === 'video' && (
                <input type="url" value={mini.url}
                    onChange={e => onUpdate(idx, { ...mini, url: e.target.value })}
                    placeholder="URL de YouTube"
                    className="w-full rounded-xl border-2 border-white/60 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-kids-blue" />
            )}

            {mini.type === 'image' && (
                <>
                    <input type="url" value={mini.url}
                        onChange={e => onUpdate(idx, { ...mini, url: e.target.value })}
                        placeholder="URL de la imagen"
                        className="w-full rounded-xl border-2 border-white/60 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-kids-blue" />
                    <input type="text" value={mini.caption}
                        onChange={e => onUpdate(idx, { ...mini, caption: e.target.value })}
                        placeholder="Descripción (opcional)"
                        className="w-full rounded-xl border-2 border-white/60 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-kids-blue" />
                </>
            )}

            {mini.type === 'text' && (
                <RichTextEditor
                    content={mini.html}
                    onChange={html => onUpdate(idx, { ...mini, html })}
                    placeholder="Escribe el contenido aquí..."
                />
            )}

            {mini.type === 'quiz' && (
                <QuizEditor questions={mini.questions} onChange={questions => onUpdate(idx, { ...mini, questions })} />
            )}

            {mini.type === 'flashcard' && (
                <FlashcardEditor cards={mini.cards} onChange={cards => onUpdate(idx, { ...mini, cards })} />
            )}
        </div>
    );
}

function QuizEditor({ questions, onChange }: { questions: QuizQuestion[]; onChange: (q: QuizQuestion[]) => void }) {
    return (
        <div className="space-y-3">
            {questions.map((q, qi) => (
                <div key={qi} className="rounded-xl bg-white p-3 space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-kids-purple">Pregunta {qi + 1}</span>
                        {questions.length > 1 && (
                            <button type="button" onClick={() => onChange(questions.filter((_, i) => i !== qi))} className="ml-auto text-slate-300 hover:text-kids-red">
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>
                    <input type="text" value={q.text}
                        onChange={e => onChange(questions.map((qr, i) => i === qi ? { ...qr, text: e.target.value } : qr))}
                        placeholder="Escribe la pregunta..."
                        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold outline-none focus:border-kids-purple" />
                    {q.options.map((opt, oi) => (
                        <div key={oi} className="flex items-center gap-2">
                            <input type="radio" name={`q-${qi}-correct`} checked={q.correct === oi}
                                onChange={() => onChange(questions.map((qr, i) => i === qi ? { ...qr, correct: oi } : qr))}
                                className="accent-kids-green" />
                            <input type="text" value={opt}
                                onChange={e => onChange(questions.map((qr, i) => i === qi ? { ...qr, options: qr.options.map((o, ii) => ii === oi ? e.target.value : o) } : qr))}
                                placeholder={`Opción ${oi + 1}`}
                                className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold outline-none focus:border-kids-green" />
                        </div>
                    ))}
                </div>
            ))}
            <button type="button"
                onClick={() => onChange([...questions, { text: '', options: ['', '', '', ''], correct: 0 }])}
                className="btn-kids w-full border-2 border-dashed border-kids-purple/40 bg-transparent text-kids-purple hover:bg-kids-purple-light">
                <Plus className="h-4 w-4" />
                Añadir Pregunta
            </button>
        </div>
    );
}

function FlashcardEditor({ cards, onChange }: { cards: Flashcard[]; onChange: (c: Flashcard[]) => void }) {
    return (
        <div className="space-y-2">
            {cards.map((card, ci) => (
                <div key={ci} className="flex gap-2">
                    <input type="text" value={card.front}
                        onChange={e => onChange(cards.map((c, i) => i === ci ? { ...c, front: e.target.value } : c))}
                        placeholder="Frente"
                        className="flex-1 rounded-xl border-2 border-white/60 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-kids-green" />
                    <input type="text" value={card.back}
                        onChange={e => onChange(cards.map((c, i) => i === ci ? { ...c, back: e.target.value } : c))}
                        placeholder="Reverso"
                        className="flex-1 rounded-xl border-2 border-white/60 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-kids-green" />
                    {cards.length > 1 && (
                        <button type="button" onClick={() => onChange(cards.filter((_, i) => i !== ci))} className="text-slate-300 hover:text-kids-red">
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            ))}
            <button type="button"
                onClick={() => onChange([...cards, { front: '', back: '' }])}
                className="btn-kids w-full border-2 border-dashed border-kids-green/40 bg-transparent text-kids-green hover:bg-kids-green-light">
                <Plus className="h-4 w-4" />
                Añadir Tarjeta
            </button>
        </div>
    );
}

ActivitiesEdit.layout = {
    breadcrumbs: [{ title: 'Materias', href: subjects.index() }],
};
