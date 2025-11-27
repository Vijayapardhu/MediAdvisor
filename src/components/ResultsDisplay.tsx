import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, Pill, Shield, RefreshCw, ChevronRight } from "lucide-react";
import type { DiseasePrediction } from "@/types";
import { cn } from "@/lib/utils";

interface ResultsDisplayProps {
    results: DiseasePrediction[];
    onReset: () => void;
}

export function ResultsDisplay({ results, onReset }: ResultsDisplayProps) {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 rounded-3xl text-center relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-3">
                    Analysis Complete
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
                    Based on your symptoms, we've identified potential conditions.
                    <br />
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                        Please consult a healthcare professional for an accurate diagnosis.
                    </span>
                </p>
            </motion.div>

            <div className="grid gap-8">
                {results.map((prediction, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className="glass-card rounded-3xl overflow-hidden group"
                    >
                        {/* Header Section */}
                        <div className="p-8 border-b border-slate-100 dark:border-slate-700/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/50 dark:bg-slate-800/50">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {prediction.disease}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                                    {prediction.description}
                                </p>
                            </div>

                            {/* Confidence Meter */}
                            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="relative w-16 h-16">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="32"
                                            cy="32"
                                            r="28"
                                            stroke="currentColor"
                                            strokeWidth="6"
                                            fill="transparent"
                                            className="text-slate-100 dark:text-slate-800"
                                        />
                                        <circle
                                            cx="32"
                                            cy="32"
                                            r="28"
                                            stroke="currentColor"
                                            strokeWidth="6"
                                            fill="transparent"
                                            strokeDasharray={175.93}
                                            strokeDashoffset={175.93 - (175.93 * prediction.confidence) / 100}
                                            className={cn(
                                                "transition-all duration-1000 ease-out",
                                                prediction.confidence > 80 ? "text-green-500" :
                                                    prediction.confidence > 50 ? "text-blue-500" : "text-orange-500"
                                            )}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                                            {prediction.confidence}%
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Match</span>
                                    <span className={cn(
                                        "text-sm font-bold",
                                        prediction.confidence > 80 ? "text-green-600 dark:text-green-400" :
                                            prediction.confidence > 50 ? "text-blue-600 dark:text-blue-400" : "text-orange-600 dark:text-orange-400"
                                    )}>
                                        {prediction.confidence > 80 ? "High" : prediction.confidence > 50 ? "Medium" : "Low"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 grid md:grid-cols-2 gap-8">
                            {/* Medicines Section */}
                            <div className="space-y-4">
                                <h4 className="flex items-center text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                                        <Pill className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    Recommended Medicines
                                </h4>
                                <div className="grid gap-3">
                                    {prediction.medicines.map((med, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + (i * 0.1) }}
                                            className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-bold text-slate-900 dark:text-white">{med.name}</span>
                                                <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md font-medium">
                                                    {med.dosage}
                                                </span>
                                            </div>
                                            {med.warnings.length > 0 && (
                                                <div className="flex items-start gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 p-2 rounded-lg mt-2">
                                                    <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                    <span>{med.warnings.join(", ")}</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Treatments & Precautions */}
                            <div className="space-y-8">
                                <div>
                                    <h4 className="flex items-center text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        Treatments
                                    </h4>
                                    <ul className="space-y-3">
                                        {prediction.treatments.map((t, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 + (i * 0.1) }}
                                                className="flex items-start text-sm text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-3 flex-shrink-0" />
                                                {t}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="flex items-center text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                                            <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        Precautions
                                    </h4>
                                    <ul className="space-y-3">
                                        {prediction.precautions.map((p, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 + (i * 0.1) }}
                                                className="flex items-start text-sm text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-3 flex-shrink-0" />
                                                {p}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex justify-center pt-8 pb-12"
            >
                <button
                    onClick={onReset}
                    className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        Check Another Symptom
                    </span>
                </button>
            </motion.div>
        </div>
    );
}
