"use client";

import { motion } from "framer-motion";
import { Activity, Brain, Shield, Stethoscope, Users, Zap } from "lucide-react";

export default function AboutPage() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto space-y-20">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-4">
                        <Activity className="w-4 h-4" />
                        <span>Revolutionizing Healthcare Access</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        <span className="block text-slate-900 dark:text-white mb-2">Empowering Your</span>
                        <span className="gradient-text">Health Decisions</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        MediAdvisor combines advanced AI technology with medical knowledge to provide instant, accurate, and accessible symptom analysis for everyone.
                    </p>
                </motion.div>

                {/* How it Works - Visual Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Users,
                            title: "Describe Symptoms",
                            desc: "Tell us how you feel in your own words, or simply point to where it hurts.",
                            color: "blue"
                        },
                        {
                            icon: Brain,
                            title: "AI Analysis",
                            desc: "Our advanced AI cross-references your symptoms with a vast medical database.",
                            color: "purple"
                        },
                        {
                            icon: Stethoscope,
                            title: "Get Insights",
                            desc: "Receive potential causes, treatment options, and advice on when to see a doctor.",
                            color: "pink"
                        }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="glass-card p-8 rounded-3xl relative group overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-${feature.color}-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700`} />

                            <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-100 dark:bg-${feature.color}-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className={`w-7 h-7 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass p-12 rounded-3xl text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Our Mission
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            We believe that everyone deserves access to reliable health information. By bridging the gap between complex medical data and user-friendly technology, we empower individuals to make informed decisions about their well-being.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                            {[
                                { label: "Accessible", icon: Users },
                                { label: "Secure", icon: Shield },
                                { label: "Fast", icon: Zap },
                                { label: "Reliable", icon: Activity }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-3">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                        <item.icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                                    </div>
                                    <span className="font-semibold text-slate-900 dark:text-white">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
