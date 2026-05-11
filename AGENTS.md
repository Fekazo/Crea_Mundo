# AGENTS.md - AI Coding Agent Guide for Crea Mundo

This Laravel + React starter kit uses **Inertia.js** to couple frontend and backend, with a focus on modern authentication and user settings management. Understanding this full-stack integration is essential before making changes.

## Architecture Overview

### Full-Stack Integration Pattern
- **Backend**: Laravel 13 with Inertia.js adapter for server-side rendering
- **Frontend**: React 19 (TSX) with Tailwind CSS 4 and shadcn/ui components
- **Data Flow**: Controller → Inertia::render() → React Page Component → shared `withApp()` wrapper

**Key Understanding**: 
- Routes in `routes/web.php` and `routes/settings.php` directly render React components via `Inertia::render('path/to/page')`
- React pages live in `resources/js/pages/` and must match the route names exactly
- Layouts are resolved dynamically in `resources/js/app.tsx` based on page namespace (auth/, settings/, etc.)
- All shared props flow through Inertia's built-in `usePage()` hook, no separate API calls needed for page data

### Component Organization
```
resources/js/
  components/        # Reusable UI components (button, input, dialog, etc.)
  components/ui/     # Generated shadcn/ui components (don't edit directly)
  pages/            # Inertia page components matching route names
    auth/           # Authentication pages (login, register, etc.)
    settings/       # Settings pages (profile, security, appearance)
  layouts/          # Layout wrappers (app-layout, auth-layout, settings-layout)
  hooks/            # Custom React hooks (use-appearance, use-flash-toast, etc.)
  types/            # TypeScript type definitions (auth.ts, ui.ts, navigation.ts)
  lib/              # Utility functions and helpers
```

### Database & Authentication
- **Auth**: Laravel Fortify (two-factor auth built-in, see `User::TwoFactorAuthenticatable`)
- **DB**: SQLite with migrations in `database/migrations/`
- **Models**: Use PHP 8.3 attributes for fillable/hidden (e.g., `#[Fillable(['name', 'email'])]`)
- **Factories**: UserFactory in `database/factories/` - use for seeding tests

## Developer Workflows

### Development
```bash
# Start full-stack dev server (Laravel, Queue, Logs, Vite in parallel)
composer dev

# Run in separate terminals:
php artisan serve          # API server (port 8000)
npm run dev                # Vite dev server (port 5173)
php artisan queue:listen   # Background jobs
php artisan pail           # Log viewer
```

### Testing & Quality
```bash
composer test              # Run full CI check (lint, format, types, tests)
npm run lint               # Fix ESLint + Prettier
pint --parallel            # Fix PHP code style (Laravel preset)
npm run types:check        # TypeScript validation
```

**Testing Framework**: Pest (Laravel testing framework) with in-memory SQLite
- Test files: `tests/Feature/` and `tests/Unit/`
- RefreshDatabase trait commented out in `Pest.php` - uncomment if you need database reset between tests
- Write tests as functions using `test('description', fn() => { ... })`

### Build & Deploy
```bash
npm run build              # Production JS/CSS build
npm run build:ssr          # Build with server-side rendering
composer setup             # Full project initialization
```

## Code Style & Conventions

### TypeScript/React
- **Import Order**: builtin → external → internal → parent → sibling → index (enforced by ESLint)
- **Type Imports**: Use `import type { Foo } from '...'` for type-only imports (separate-type-imports)
- **Padding**: Blank lines required around control statements (if, return, for, etc.)
- **Formatting**: Prettier + Tailwind class ordering via prettier-plugin-tailwindcss
- **Component Patterns**:
  - Use React 19's automatic JSX transform (no React import needed)
  - Favor Radix UI + shadcn/ui for accessible components
  - Hook names: `use-kebab-case.tsx` for components, `.ts` for pure functions

### PHP
- **Standard**: PSR-4 autoloading, Laravel Pint preset
- **Model Attributes**: PHP 8.3 attributes over comments (e.g., `#[Fillable(...)]` instead of docblock)
- **Controllers**: Thin controllers that call FormRequest validation and return Inertia responses
- **FormRequests**: Located in `app/Http/Requests/` - use for validation and authorization
- **Helpers**: Global functions in `database/seeders/`, `database/factories/`

### File Naming
- **React**: PascalCase for components (`.tsx`), kebab-case for hooks (`.ts/.tsx`)
- **PHP**: PascalCase for classes (Controllers, Models, Requests)
- **Routes**: snake_case in route names (e.g., `route('profile.edit')`)

## Integration Points & Data Flow

### Inertia Page Data
```php
// Backend (Controller)
return Inertia::render('settings/profile', [
    'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
    'status' => $request->session()->get('status'),
]);
```

```tsx
// Frontend (Page Component)
import { usePage } from '@inertiajs/react';

export default function Profile() {
    const { props } = usePage<{ mustVerifyEmail: boolean; status?: string }>();
    // props.auth.user is automatically available from shared data
}
```

### Flash Messages
- **Success Toast**: `Inertia::flash('toast', ['type' => 'success', 'message' => 'Updated!'])`
- **Consumed by**: `use-flash-toast.ts` hook, displays via `Sonner` toast component
- **Page redirect**: Use `to_route('name')` to redirect with flash data

### Two-Factor Authentication
- Enable/disable via `User::two_factor_confirmed_at` timestamp
- QR code generation in `SecurityController::edit()`
- Recovery codes in `two-factor-recovery-codes.tsx` component
- See `two-factor-setup-modal.tsx` for user-facing flow

### Theme/Appearance
- **Dark Mode**: Stored in localStorage, applied to `<html>` document element
- **Hook**: `use-appearance.tsx` initializes theme on app load
- **Page**: `settings/appearance` (static Inertia render, no controller logic)

## Guía de Estilo Infantil y Comportamiento UI

Este proyecto implementa la paleta de colores **"El Parque de Juegos"** para crear una interfaz amigable y segura para niños. Todas las nuevas páginas y componentes **deben** seguir estas directrices de diseño.

### Paleta de Colores del Parque de Juegos

| Color | Código HEX | Uso |
|-------|-----------|-----|
| **kids-yellow** | `#FFD700` | Acciones principales / CTA (Call-to-Action) |
| **kids-blue** | `#4AB3FF` | Fondos de sección / Navegación |
| **kids-red** | `#FF4B4B` | Alertas / Detalles visuales |
| **kids-green** | `#32CD32` | Éxito / Progreso |
| **kids-white** | `#FFFFFF` | Fondo base |

**Uso en Tailwind**: `bg-kids-yellow`, `text-kids-blue`, `border-kids-red`, etc.

### Reglas de Diseño Infantil

#### 1. Jerarquía de Color
- El **fondo debe ser mayoritariamente `kids-white`** para máxima limpieza visual
- **`kids-blue` se usa para separar bloques de contenido** y crear zonas de navegación
- Colores vibrantes (`kids-yellow`, `kids-red`, `kids-green`) **deben usarse con moderación** para mantener el enfoque
- Mantener alto contraste para facilitar lectura en cualquier pantalla

#### 2. Interactividad (Emojis y Elementos Dinámicos)
- **Emojis animados**: Usar clases `hover:animate-bounce` o `hover:animate-floating` para crear interactividad al pasar el mouse
- **Animaciones sutiles**: Las animaciones deben ser suaves con máximo 2 segundos de duración
- **Frecuencia**: Solo activar animaciones al hacer `:hover` o en intervalos de 5 segundos **para no distraer** al niño de la lectura
- **No autoplay**: Nunca reproducir animaciones automáticamente sin interacción del usuario

Ejemplos de código:
```tsx
<button className="hover:animate-bounce">Click me! 🎉</button>
<div className="hover:animate-floating text-kids-yellow">Sorpresa! 🎈</div>
```

#### 3. Bordes y Formas
- **Prohibido usar esquinas cuadradas** (`rounded-none`)
- **Obligatorio `rounded-2xl` o `rounded-full`** en todos:
  - Botones
  - Contenedores
  - Campos de input
  - Tarjetas
  - Modales
- Esto crea una interfaz amigable, suave y segura

#### 4. Legibilidad
- **Todo texto sobre fondos de color DEBE usar `font-bold`**
- **Tamaño mínimo de texto: `text-lg`** para todas las áreas de interacción
- Usar colores de texto con alto contraste (preferiblemente `text-slate-900` sobre `kids-yellow`)
- Evitar texto pequeño en colores claros

#### 5. Espaciado
- **Padding mínimo: `p-6`** para botones, contenedores y tarjetas
- Mantener espacios amplios entre elementos (`gap-4` mínimo)
- Evitar amontonamiento para reducir sobrecarga cognitiva
- Usar `space-y-4` o `space-x-4` entre elementos hermanos

### Ejemplo de Componente Infantil

```tsx
export default function KidsButton({ children, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="rounded-2xl bg-kids-yellow px-6 py-4 text-lg font-bold text-slate-900 shadow-lg transition-shadow hover:shadow-xl hover:animate-bounce active:shadow-md"
        >
            {children}
        </button>
    );
}
```

### Checklist de Cumplimiento de Estilo

Antes de completar cualquier página o componente:
- [ ] ¿Usa el fondo `kids-white` como base?
- [ ] ¿Todos los botones tienen `rounded-2xl`?
- [ ] ¿El texto interactivo usa `font-bold` y mínimo `text-lg`?
- [ ] ¿Las animaciones solo ocurren en `:hover` o con ciclos de 5s+?
- [ ] ¿El espaciado es generoso (`p-6` mínimo)?
- [ ] ¿Los colores de alerta/éxito son `kids-red` y `kids-green`?

## Command Reference

### Artisan (PHP)
```bash
php artisan make:controller ControllerName       # Create controller
php artisan make:model ModelName -m              # Create model + migration
php artisan make:request FormRequestName         # Create form request
php artisan migrate                              # Run migrations
php artisan tinker                               # REPL for testing code
```

### npm/Node
```bash
npm run format                                   # Auto-format JS with Prettier
npm run lint:check                               # Check for lint errors
npm run types:check                              # TypeScript validation
npx shadcn-ui@latest add <component>             # Add new UI component
```

## Critical Files Reference

| File | Purpose |
|------|---------|
| `routes/web.php` | Main routes - define all page endpoints here |
| `routes/settings.php` | Settings routes - user profile, security pages |
| `app/Providers/AppServiceProvider.php` | Global app config (password rules, DB safety) |
| `config/inertia.php` | Inertia SSR settings and page discovery |
| `resources/js/app.tsx` | App entry point - layout routing logic |
| `resources/js/layouts/app-layout.tsx` | Main authenticated layout with sidebar |
| `resources/js/hooks/use-flash-toast.ts` | Toast notification system |
| `phpunit.xml` | Test configuration (SQLite in-memory DB) |
| `eslint.config.js` | Frontend linting rules (type imports, padding, imports order) |
| `tsconfig.json` | TypeScript config with `@/*` path alias to `resources/js/*` |

## Common Tasks

### Adding a New Settings Page
1. Create route in `routes/settings.php`: `Route::inertia('settings/new-page', 'settings/new-page')`
2. Create React component: `resources/js/pages/settings/new-page.tsx`
3. Wrap with `SettingsLayout` automatically (layout routing checks `startsWith('settings/')`)
4. Add navigation link in `resources/js/components/nav-main.tsx`

### Adding a Form with Validation
1. Create `FormRequest` in `app/Http/Requests/SettingsYourFormRequest.php`
2. Add validation rules in `rules()` method
3. In controller, inject form request: `public function update(YourFormRequest $request)`
4. Call `$request->validated()` to get clean data
5. Use Inertia flash for success messages

### Styling Components
- Use Tailwind CSS 4 (class-based, no `@apply` needed in most cases)
- Import from shadcn/ui when available (`@/components/ui/button`)
- Compose classes with `clsx()` and `tailwind-merge` for dynamic styling
- Prettier auto-sorts Tailwind classes

## Known Patterns to Preserve

- **Single responsibility**: Controllers handle HTTP, FormRequests handle validation, Models handle data
- **Inertia over APIs**: No separate REST API for pages - use Inertia's data flow
- **Shared authentication**: `usePage().props.auth.user` available everywhere
- **Type safety**: Strict TypeScript mode enabled - no implicit `any`
- **Production safety**: Destructive DB commands disabled in production, password rules enforced in prod

## ⚠️ DO NOT GENERATE

### Prohibited Documentation Files
**⛔ NEVER create these files:**
- `IMPLEMENTATION.md`
- `RESUMEN_IMPLEMENTACION.md`
- `PRUEBAS_MANUAL.md`
- `README_NUEVO.md`
- `RESUMEN_FINAL.md`

Use the existing `README.md` instead. If documentation is needed, update existing files or ask the user first before creating new ones.

