"use client";

import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, Brain, Sparkles, HeartPulse, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-white/50 dark:bg-slate-800/50 border border-blue-200 dark:border-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-8 backdrop-blur-md shadow-sm hover:shadow-md transition-all cursor-default"
          >
            <Sparkles className="w-4 h-4 mr-2 text-blue-500 animate-pulse" />
            <span className="text-sm font-bold tracking-wide uppercase">AI-Powered Health Analysis</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight leading-tight">
            Your Personal <br />
            <span className="gradient-text relative inline-block">
              AI Health Assistant
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-500/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Analyze symptoms instantly with advanced AI. Get personalized disease predictions,
            medicine recommendations, and treatment guidance in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/symptom-check"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center">
                Start Symptom Check
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/about"
              className="glass-button px-8 py-4 text-lg"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "AI Diagnosis",
              desc: "Powered by Gemini 3.0 to analyze complex symptom patterns with medical-grade accuracy.",
              color: "blue",
              delay: 0
            },
            {
              icon: ShieldCheck,
              title: "Verified Data",
              desc: "Medical recommendations cross-referenced with trusted global health databases for safety.",
              color: "green",
              delay: 0.2
            },
            {
              icon: HeartPulse,
              title: "Instant Care",
              desc: "Get immediate insights, treatment protocols, and precaution advice in real-time.",
              color: "purple",
              delay: 0.4
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: feature.delay, duration: 0.6 }}
              className="glass-card p-10 rounded-[2rem] relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${feature.color}-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-${feature.color}-500/10`} />

              <div className={`w-16 h-16 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm`}>
                <feature.icon className={`w-8 h-8 text-${feature.color}-600 dark:text-${feature.color}-400`} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
