import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Menu, Search } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { cn, toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, NavItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

const activeItemStyles =
    'text-neutral-900 text-neutral-100';

export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();
    const { isCurrentUrl, whenCurrentUrl } = useCurrentUrl();

    return (
        <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="flex h-14 items-center justify-between gap-4 px-4 lg:px-8">
                <div className="hidden lg:flex lg:items-center lg:gap-8">
                    <AppLogo />
                    <NavigationMenu>
                        <NavigationMenuList className="gap-1">
                            {mainNavItems.map(({ href, icon: Icon, title }) => (
                                <NavigationMenuItem key={href}>
                                    <Link
                                        href={href}
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            'h-9',
                                            whenCurrentUrl(href)
                                                ? 'bg-accent'
                                                : 'bg-transparent',
                                        )}
                                    >
                                        <Icon className="mr-2 h-4 w-4" />
                                        {title}
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-2 lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>
                                    <AppLogoIcon />
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 pt-4">
                                {mainNavItems.map(
                                    ({ href, icon: Icon, title }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-100"
                                        >
                                            <Icon className="h-4 w-4" />
                                            {title}
                                        </Link>
                                    ),
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <AppLogoIcon />
                </div>

                {breadcrumbs.length > 0 && (
                    <Breadcrumbs items={breadcrumbs} />
                )}

                <div className="flex items-center gap-4 lg:ml-auto">
                    <NavigationMenu className="hidden lg:flex">
                        <NavigationMenuList className="gap-1">
                            {rightNavItems.map(({ href, icon: Icon, title }) => (
                                <NavigationMenuItem key={href}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Icon className="mr-2 h-4 w-4" />
                                        {title}
                                    </a>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {auth.user ? (
                        <DropdownMenu>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DropdownMenuTrigger asChild>
                                        <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage
                                                    src={auth.user.avatar_url}
                                                    alt={auth.user.name}
                                                />
                                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black text-neutral-100">
                                                    {getInitials(auth.user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </button>
                                    </DropdownMenuTrigger>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    {auth.user.name}
                                </TooltipContent>
                            </Tooltip>
                            <DropdownMenuContent align="end" className="w-56">
                                <UserMenuContent />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : null}
                </div>
            </div>
        </header>
    );
}

