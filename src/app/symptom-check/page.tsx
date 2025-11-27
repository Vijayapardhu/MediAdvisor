"use client";

import { useState } from "react";
import Link from "next/link";
import { SymptomWizard } from "@/components/SymptomWizard";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { analyzeSymptoms } from "@/app/actions";
import type { SymptomData, DiseasePrediction } from "@/types";
import { Loader2, ArrowLeft, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function SymptomCheckPage() {
    const [results, setResults] = useState<DiseasePrediction[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSymptomSubmit = async (data: SymptomData, language: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const predictions = await analyzeSymptoms(data, language);
            setResults(predictions);
        } catch (err) {
            setError("Failed to analyze symptoms. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen py-12 px-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 -z-20 transition-colors duration-300" />
            <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)] -z-10" />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -z-10" />
            <div className="fixed top-1/4 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl -z-10" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors mb-6 group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    {!results && (
                        <div className="text-center mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4"
                            >
                                <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight"
                            >
                                Symptom <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Checker</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed"
                            >
                                Describe your symptoms accurately for the best AI-powered analysis and personalized recommendations.
                            </motion.p>
                        </div>
                    )}
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-50/90 dark:bg-red-900/20 backdrop-blur-sm text-red-600 dark:text-red-400 p-4 rounded-2xl mb-8 border border-red-200 dark:border-red-800 text-center shadow-lg"
                    >
                        {error}
                    </motion.div>
                )}

                {isLoading ? (
                    <div className="glass-panel p-12 flex flex-col items-center justify-center min-h-[400px]">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
                            <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin relative z-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-2">Analyzing Symptoms</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">
                            Our AI is consulting its medical knowledge base to provide you with accurate insights...
                        </p>
                    </div>
                ) : results ? (
                    <ResultsDisplay results={results} onReset={() => setResults(null)} />
                ) : (
                    <SymptomWizard onSubmit={handleSymptomSubmit} isLoading={isLoading} />
                )}
            </div>
        </main>
    );
}
