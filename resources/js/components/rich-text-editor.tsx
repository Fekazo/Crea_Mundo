import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Bold, Italic, Underline as UnderlineIcon, Link2, Image as ImageIcon, List, ListOrdered, Heading2, Minus } from 'lucide-react';
import { useCallback, useState } from 'react';

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const [linkUrl, setLinkUrl] = useState('');
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [showImageInput, setShowImageInput] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-kids-blue underline font-semibold cursor-pointer hover:text-kids-purple transition-colors',
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-2xl max-w-full my-3 shadow-md',
                },
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none min-h-[180px] px-4 py-3 outline-none text-slate-700 font-medium leading-relaxed',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    const setLink = useCallback(() => {
        if (!editor) return;
        if (!linkUrl) {
            editor.chain().focus().unsetLink().run();
            setShowLinkInput(false);
            return;
        }
        const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
        editor.chain().focus().extendMarkToNextWord().setLink({ href: url }).run();
        setLinkUrl('');
        setShowLinkInput(false);
    }, [editor, linkUrl]);

    const insertImage = useCallback(() => {
        if (!editor || !imageUrl) return;
        const url = imageUrl.startsWith('http') ? imageUrl : `https://${imageUrl}`;
        editor.chain().focus().setImage({ src: url }).run();
        setImageUrl('');
        setShowImageInput(false);
    }, [editor, imageUrl]);

    if (!editor) return null;

    const btn = (active: boolean) =>
        `flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-all ${
            active
                ? 'gradient-blue text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
        }`;

    return (
        <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white transition-colors focus-within:border-kids-blue focus-within:ring-2 focus-within:ring-kids-blue/20">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-100 bg-slate-50 px-2 py-1.5">
                {/* Text style */}
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive('bold'))} title="Negrita (Ctrl+B)">
                    <Bold className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive('italic'))} title="Cursiva (Ctrl+I)">
                    <Italic className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn(editor.isActive('underline'))} title="Subrayado (Ctrl+U)">
                    <UnderlineIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>

                <div className="mx-1 h-5 w-px bg-slate-200" />

                {/* Headings & structure */}
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive('heading', { level: 2 }))} title="Título">
                    <Heading2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive('bulletList'))} title="Lista">
                    <List className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive('orderedList'))} title="Lista numerada">
                    <ListOrdered className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
                <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btn(false)} title="Separador">
                    <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>

                <div className="mx-1 h-5 w-px bg-slate-200" />

                {/* Link */}
                <button
                    type="button"
                    onClick={() => { setShowLinkInput(v => !v); setShowImageInput(false); }}
                    className={btn(editor.isActive('link') || showLinkInput)}
                    title="Hipervínculo"
                >
                    <Link2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>

                {/* Image */}
                <button
                    type="button"
                    onClick={() => { setShowImageInput(v => !v); setShowLinkInput(false); }}
                    className={btn(showImageInput)}
                    title="Insertar imagen"
                >
                    <ImageIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
            </div>

            {/* Link input */}
            {showLinkInput && (
                <div className="flex items-center gap-2 border-b border-slate-100 bg-kids-blue-light px-3 py-2">
                    <Link2 className="h-4 w-4 text-kids-blue flex-shrink-0" />
                    <input
                        type="url"
                        value={linkUrl}
                        onChange={e => setLinkUrl(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && setLink()}
                        placeholder="https://ejemplo.com"
                        className="flex-1 rounded-lg border-0 bg-white px-3 py-1.5 text-sm font-semibold outline-none ring-1 ring-kids-blue/30 focus:ring-kids-blue"
                        autoFocus
                    />
                    <button type="button" onClick={setLink} className="rounded-lg gradient-blue px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                        Insertar
                    </button>
                    <button type="button" onClick={() => setShowLinkInput(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600">
                        ✕
                    </button>
                </div>
            )}

            {/* Image URL input */}
            {showImageInput && (
                <div className="flex items-center gap-2 border-b border-slate-100 bg-kids-green-light px-3 py-2">
                    <ImageIcon className="h-4 w-4 text-kids-green flex-shrink-0" />
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && insertImage()}
                        placeholder="https://imagen.com/foto.jpg"
                        className="flex-1 rounded-lg border-0 bg-white px-3 py-1.5 text-sm font-semibold outline-none ring-1 ring-kids-green/30 focus:ring-kids-green"
                        autoFocus
                    />
                    <button type="button" onClick={insertImage} className="rounded-lg gradient-green px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                        Insertar
                    </button>
                    <button type="button" onClick={() => setShowImageInput(false)} className="text-xs font-bold text-slate-400 hover:text-slate-600">
                        ✕
                    </button>
                </div>
            )}

            {/* Editor area */}
            <div className="relative">
                {editor.isEmpty && placeholder && (
                    <p className="pointer-events-none absolute left-4 top-3 text-sm font-medium text-slate-300 select-none">
                        {placeholder}
                    </p>
                )}
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
