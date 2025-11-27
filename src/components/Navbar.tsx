"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Activity, Home, Info, Moon, Sun, Code } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Navbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const links = [
        { href: "/", label: "Home", icon: Home },
        { href: "/about", label: "About", icon: Info },
        { href: "/developer", label: "Developer", icon: Code },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
        >
            <div className="glass px-6 py-3 rounded-full flex items-center gap-8 pointer-events-auto border border-white/40 dark:border-white/10 shadow-lg shadow-blue-500/5 backdrop-blur-xl">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white group">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <span className="hidden sm:block tracking-tight">MediAdvisor</span>
                </Link>

                <div className="flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-full border border-white/20 dark:border-white/5">
                    {links.map((link) => {
                        const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                                    isActive
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm border border-black/5 dark:border-white/5"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:rotate-12"
                    aria-label="Toggle theme"
                >
                    {mounted ? (
                        theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />
                    ) : (
                        <div className="w-5 h-5" />
                    )}
                </button>
            </div>
        </motion.nav>
    );
}
