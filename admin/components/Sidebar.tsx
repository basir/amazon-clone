"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: Package },
    { name: "Orders", href: "/orders", icon: ShoppingCart },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
];

import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            router.push("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-white dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex h-16 items-center border-b px-6 dark:border-zinc-800">
                <span className="text-xl font-bold">Admin Panel</span>
            </div>
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={twMerge(
                                clsx(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                                        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                                )
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t p-4 dark:border-zinc-800">
                <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
