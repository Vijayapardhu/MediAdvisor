"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Activity, ArrowRight, ArrowLeft, Camera, Check,
    ChevronRight, Clock, MapPin, Thermometer, Upload, X, Globe, Sparkles,
    Brain, Heart, Utensils, Sun, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SymptomData, Question } from "@/types";
import { generateFollowUpQuestions } from "@/app/actions";
import { useLanguage, type Language } from "@/context/LanguageContext";

// Map categories to translation keys
const CATEGORIES = [
    { id: "head", key: "cat_head", icon: Brain },
    { id: "chest", key: "cat_chest", icon: Heart },
    { id: "stomach", key: "cat_stomach", icon: Utensils },
    { id: "limbs", key: "cat_limbs", icon: Activity },
    { id: "skin", key: "cat_skin", icon: Sun },
    { id: "general", key: "cat_general", icon: Zap },
];

// Map symptoms to translation keys, grouped by category
const SYMPTOMS_BY_CATEGORY: Record<string, string[]> = {
    head: ["sym_headache", "sym_dizziness", "sym_sore_throat", "sym_vision"],
    chest: ["sym_cough", "sym_short_breath", "sym_chest_pain", "sym_palpitations"],
    stomach: ["sym_nausea", "sym_stomach_pain", "sym_bloating", "sym_diarrhea"],
    limbs: ["sym_joint_pain", "sym_muscle_ache", "sym_swelling", "sym_weakness"],
    skin: ["sym_rash", "sym_itching", "sym_acne", "sym_burn"],
    general: ["sym_fever", "sym_fatigue", "sym_chills", "sym_sweating"],
};

const LANGUAGES: { code: Language; label: string }[] = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "te", label: "తెలుగు" },
];

interface SymptomWizardProps {
    onSubmit: (data: SymptomData, language: string) => void;
    isLoading: boolean;
}

export function SymptomWizard({ onSubmit, isLoading }: SymptomWizardProps) {
    const { t, language, setLanguage } = useLanguage();
    const [step, setStep] = useState(1);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [formData, setFormData] = useState<SymptomData>({
        bodyPart: "",
        painType: [],
        severity: 5,
        duration: "",
        description: "",
        answers: {},
        images: []
    });
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);

    const nextStep = async () => {
        if (step === 3) {
            setIsGeneratingQuestions(true);
            try {
                const generatedQuestions = await generateFollowUpQuestions(formData, language);
                setQuestions(generatedQuestions);
                setStep(4);
            } catch (error) {
                console.error("Failed to generate questions", error);
                setStep(5);
            } finally {
                setIsGeneratingQuestions(false);
            }
        } else {
            setStep(step + 1);
        }
    };

    const prevStep = () => setStep(step - 1);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, reader.result as string]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleSymptom = (symptomKey: string) => {
        const symptomLabel = t(symptomKey);
        setFormData(prev => ({
            ...prev,
            painType: prev.painType.includes(symptomLabel)
                ? prev.painType.filter(t => t !== symptomLabel)
                : [...prev.painType, symptomLabel]
        }));
    };

    // Helper to get available symptoms based on selected category
    const getAvailableSymptoms = () => {
        // Find the category ID that matches the currently selected translated body part
        const category = CATEGORIES.find(c => t(c.key) === formData.bodyPart);
        return category ? SYMPTOMS_BY_CATEGORY[category.id] : [];
    };

    const availableSymptoms = getAvailableSymptoms();

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Language Selector */}
            <div className="flex justify-end mb-6">
                <div className="relative">
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/30 dark:border-slate-700 text-sm font-medium hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all shadow-sm"
                    >
                        <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-slate-700 dark:text-slate-200">{LANGUAGES.find(l => l.code === language)?.label}</span>
                    </button>

                    {isLangOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setIsLangOpen(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute right-0 mt-2 w-40 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-slate-700 overflow-hidden z-50 p-1"
                            >
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setIsLangOpen(false);
                                        }}
                                        className={cn(
                                            "w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all font-medium",
                                            language === lang.code
                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                        )}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </motion.div>
                        </>
                    )}
                </div>
            </div>

            {/* Main Container */}
            <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Progress Bar */}
                <div className="mb-12 relative">
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 5) * 100}%` }}
                            transition={{ duration: 0.7, ease: "circOut" }}
                        />
                    </div>
                    <div className="flex justify-between mt-4 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        <span className={cn("transition-colors duration-300", step >= 1 && "text-blue-600 dark:text-blue-400")}>{t("location")}</span>
                        <span className={cn("transition-colors duration-300", step >= 3 && "text-purple-600 dark:text-purple-400")}>{t("details")}</span>
                        <span className={cn("transition-colors duration-300", step >= 5 && "text-pink-600 dark:text-pink-400")}>{t("analysis")}</span>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3">
                                    <MapPin className="w-8 h-8 text-blue-500 animate-bounce" />
                                    {t("whereHurt")}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400">Select the area where you are experiencing symptoms</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {CATEGORIES.map((cat, idx) => (
                                    <motion.button
                                        key={cat.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => setFormData({ ...formData, bodyPart: t(cat.key), painType: [] })}
                                        className={cn(
                                            "glass-card p-6 rounded-2xl text-left transition-all group relative overflow-hidden flex flex-col items-center justify-center gap-4 hover:shadow-blue-500/20",
                                            formData.bodyPart === t(cat.key)
                                                ? "ring-2 ring-blue-500 bg-blue-50/80 dark:bg-blue-900/30 shadow-lg shadow-blue-500/20 scale-[1.02]"
                                                : "hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-500/10 to-purple-500/10",
                                            formData.bodyPart === t(cat.key) && "opacity-100"
                                        )} />

                                        <div className={cn(
                                            "p-4 rounded-full transition-colors duration-300",
                                            formData.bodyPart === t(cat.key)
                                                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                                                : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-slate-700 group-hover:text-blue-500"
                                        )}>
                                            <cat.icon className="w-8 h-8" />
                                        </div>

                                        <span className="relative z-10 text-lg font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {t(cat.key)}
                                        </span>
                                        {
                                            formData.bodyPart === t(cat.key) && (
                                                <motion.div
                                                    layoutId="check"
                                                    className="absolute top-3 right-3 text-blue-500"
                                                >
                                                    <Check className="w-5 h-5" />
                                                </motion.div>
                                            )
                                        }
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex justify-end pt-8">
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.bodyPart}
                                    className="btn-primary flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/20"
                                >
                                    {t("nextStep")} <ChevronRight className="ml-2 w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3">
                                    <Activity className="w-8 h-8 text-red-500 animate-pulse-slow" />
                                    {t("describePain")}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400">Select all symptoms that apply to you</p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-3">
                                {availableSymptoms.map((symKey, idx) => (
                                    <motion.button
                                        key={symKey}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.03 }}
                                        onClick={() => toggleSymptom(symKey)}
                                        className={cn(
                                            "px-6 py-3 rounded-full text-sm font-semibold transition-all border relative overflow-hidden group",
                                            formData.painType.includes(t(symKey))
                                                ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/30 scale-105"
                                                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-700 hover:shadow-md"
                                        )}
                                    >
                                        <span className="relative z-10">{t(symKey)}</span>
                                        {formData.painType.includes(t(symKey)) && (
                                            <motion.div
                                                layoutId="pulse"
                                                className="absolute inset-0 bg-white/20 animate-pulse"
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                            <div className="flex justify-between pt-8">
                                <button onClick={prevStep} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                    {t("back")}
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={formData.painType.length === 0}
                                    className="btn-primary flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/20"
                                >
                                    {t("nextStep")} <ChevronRight className="ml-2 w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {t("severity")} & {t("duration")}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400">Help us understand the intensity and timeline</p>
                            </div>

                            <div className="glass p-8 rounded-3xl space-y-8">
                                <div className="space-y-4">
                                    <label className="flex items-center justify-between text-lg font-semibold text-slate-900 dark:text-white">
                                        <div className="flex items-center gap-2">
                                            <Thermometer className="text-orange-500" />
                                            {t("severity")}
                                        </div>
                                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formData.severity}/10</span>
                                    </label>
                                    <div className="relative h-6 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 transition-all duration-300"
                                            style={{ width: `${formData.severity * 10}%` }}
                                        />
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={formData.severity}
                                            onChange={(e) => setFormData({ ...formData, severity: parseInt(e.target.value) })}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        {/* Tick marks */}
                                        <div className="absolute inset-0 flex justify-between px-2 pointer-events-none">
                                            {[...Array(10)].map((_, i) => (
                                                <div key={i} className="w-0.5 h-full bg-white/20" />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                                        <span>{t("mild")}</span>
                                        <span>{t("severe")}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="flex items-center text-lg font-semibold text-slate-900 dark:text-white gap-2">
                                        <Clock className="text-purple-500" />
                                        {t("duration")}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={t("durationPlaceholder")}
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full p-4 bg-white/50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl outline-none text-lg font-medium transition-all placeholder:text-slate-400 focus:shadow-lg focus:shadow-blue-500/10"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button onClick={prevStep} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                    {t("back")}
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.duration || isGeneratingQuestions}
                                    className="btn-primary flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold disabled:opacity-50 hover:scale-105 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/20"
                                >
                                    {isGeneratingQuestions ? (
                                        <span className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 animate-spin" /> {t("analyzing")}
                                        </span>
                                    ) : (
                                        <>
                                            {t("nextStep")} <ChevronRight className="ml-2 w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {t("followUp")}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400">A few specific questions to narrow it down</p>
                            </div>

                            <div className="space-y-6">
                                {questions.map((q, idx) => (
                                    <motion.div
                                        key={q.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="glass p-6 rounded-2xl space-y-4"
                                    >
                                        <p className="font-medium text-lg text-slate-800 dark:text-slate-200">{q.text}</p>
                                        {q.type === "yes_no" && (
                                            <div className="flex gap-4">
                                                {[t("yes"), t("no")].map((opt) => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(prev => ({
                                                            ...prev,
                                                            answers: { ...prev.answers, [q.id]: opt }
                                                        }))}
                                                        className={cn(
                                                            "px-6 py-3 rounded-xl border-2 transition-all font-semibold flex-1",
                                                            formData.answers[q.id] === opt
                                                                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30"
                                                                : "border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                        )}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {q.type === "choice" && q.options && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {q.options.map((opt) => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData(prev => ({
                                                            ...prev,
                                                            answers: { ...prev.answers, [q.id]: opt }
                                                        }))}
                                                        className={cn(
                                                            "p-4 rounded-xl border-2 text-left text-sm transition-all font-medium",
                                                            formData.answers[q.id] === opt
                                                                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30"
                                                                : "border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                        )}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {q.type === "text" && (
                                            <input
                                                type="text"
                                                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-blue-500 outline-none transition-all"
                                                placeholder={t("yourAnswer")}
                                                value={formData.answers[q.id] || ""}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    answers: { ...prev.answers, [q.id]: e.target.value }
                                                }))}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex justify-between pt-4">
                                <button onClick={prevStep} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                    {t("back")}
                                </button>
                                <button
                                    onClick={() => setStep(5)}
                                    className="btn-primary flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:scale-105 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/20"
                                >
                                    {t("nextStep")} <ChevronRight className="ml-2 w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 5 && (
                        <motion.div
                            key="step5"
                            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.4 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {t("finalDetails")}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400">Add an image or any extra notes</p>
                            </div>

                            <div className="glass p-8 rounded-3xl space-y-6">
                                <label className="flex items-center text-lg font-semibold text-slate-900 dark:text-white gap-2">
                                    <Camera className="text-blue-500" />
                                    {t("uploadImage")}
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-48 border-3 border-slate-200 dark:border-slate-700 border-dashed rounded-3xl cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-400 dark:hover:border-blue-500 transition-all group">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                                <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            </div>
                                            <p className="text-sm text-slate-500 font-medium">{t("clickUpload")}</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                </div>
                                {formData.images.length > 0 && (
                                    <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                                        {formData.images.map((img, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-md flex-shrink-0"
                                            >
                                                <Image
                                                    src={img}
                                                    alt="Uploaded symptom image"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="glass p-8 rounded-3xl space-y-4">
                                <label className="text-lg font-semibold text-slate-900 dark:text-white">
                                    {t("additionalNotes")}
                                </label>
                                <textarea
                                    className="w-full p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all placeholder:text-slate-400 focus:shadow-lg focus:shadow-blue-500/10 text-lg"
                                    rows={4}
                                    placeholder={t("notesPlaceholder")}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-between pt-4">
                                <button onClick={prevStep} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                    {t("back")}
                                </button>
                                <button
                                    onClick={() => onSubmit(formData, language)}
                                    disabled={isLoading}
                                    className="btn-primary flex items-center px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 animate-spin" /> {t("analyzing")}
                                        </span>
                                    ) : (
                                        <>
                                            {t("analyze")} <ArrowRight className="ml-2 w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
}
