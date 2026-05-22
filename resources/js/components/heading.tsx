export default function Heading({
    title,
    description,
    variant = 'default',
}: {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
}) {
    return (
        <header className={variant === 'small' ? '' : 'mb-8 space-y-0.5'}>
            <h2
                className={
                    variant === 'small'
                        ? 'mb-0.5 text-base font-semibold'
                        : 'text-xl font-bold tracking-tight'
                }
                style={{ fontFamily: 'Fredoka, Nunito, sans-serif' }}
            >
                {title}
            </h2>
            {description && (
                <p className="text-sm font-semibold text-slate-500">{description}</p>
            )}
        </header>
    );
}
