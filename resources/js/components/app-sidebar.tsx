import { Link, usePage } from '@inertiajs/react';
import { BookOpen, GraduationCap, LayoutDashboard, Shield, Users } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import admin from '@/routes/admin';
import { dashboard } from '@/routes';
import grades from '@/routes/grades';
import students from '@/routes/students';
import subjects from '@/routes/subjects';
import type { NavItem } from '@/types';

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const userType: string = auth?.user?.user_type ?? '';

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutDashboard,
        },
    ];

    if (userType === 'admin') {
        mainNavItems.push(
            { title: 'Grados', href: grades.index().url, icon: GraduationCap },
            { title: 'Materias', href: subjects.index(), icon: BookOpen },
            { title: 'Estudiantes', href: students.index().url, icon: Users },
            { title: 'Usuarios', href: admin.users.index().url, icon: Shield },
        );
    } else if (userType === 'docente') {
        mainNavItems.push(
            { title: 'Mis Materias', href: subjects.index(), icon: BookOpen },
            { title: 'Estudiantes', href: students.index().url, icon: Users },
        );
    } else if (userType === 'padre') {
        mainNavItems.push(
            { title: 'Materias', href: subjects.index(), icon: BookOpen },
        );
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
