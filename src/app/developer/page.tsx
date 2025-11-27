"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Code, Terminal, Heart } from "lucide-react";
import Link from "next/link";

export default function DeveloperPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden"
                >
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-32 -mb-32" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start">

                        {/* Profile Image Placeholder / Avatar */}
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-xl group-hover:scale-105 transition-transform duration-300">
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                                    {/* Using a generic avatar or initials since we don't have the actual image file hosted yet, 
                       but the structure is ready for the user's image */}
                                    <span className="text-4xl font-bold text-white">VP</span>
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                                    Vijaya Pardhu
                                </h1>
                                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium flex items-center justify-center md:justify-start gap-2">
                                    <Code className="w-5 h-5" />
                                    Student | Android & Web Developer | Firebase Enthusiast
                                </p>
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-600 dark:text-slate-400 text-sm">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    Kakinada, Andhra Pradesh
                                </div>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                I'm a <span className="font-semibold text-purple-600 dark:text-purple-400">vibe coder</span> who brings energy, creativity, and fun to every project. Passionate about Android, Firebase, and AI Automation. I love solving real-life problems through code and building apps for colleges, churches, and real-world use.
                            </p>

                            {/* Tech Stack Pills */}
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {["React", "Next.js", "TypeScript", "Android", "Firebase", "AI"].map((tech) => (
                                    <span key={tech} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-4 justify-center md:justify-start pt-4">
                                <Link
                                    href="https://github.com/vijayapardhu"
                                    target="_blank"
                                    className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-900 dark:text-white"
                                >
                                    <Github className="w-6 h-6" />
                                </Link>
                                <Link
                                    href="https://linkedin.com/in/vijayapardhu"
                                    target="_blank"
                                    className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-blue-600 dark:text-blue-400"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </Link>
                                <Link
                                    href="mailto:vijayapardhu17@gmail.com"
                                    className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors text-purple-600 dark:text-purple-400"
                                >
                                    <Mail className="w-6 h-6" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Footer Quote */}
                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700/50 text-center">
                        <p className="text-slate-500 dark:text-slate-400 italic flex items-center justify-center gap-2">
                            <Terminal className="w-4 h-4" />
                            "Building meaningful tech for society."
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
