"use client";

import React, { createContext, useContext, useState } from "react";

export type Language = "en" | "hi" | "te";

interface Translations {
    [key: string]: {
        [key: string]: string;
    };
}

const translations: Translations = {
    en: {
        title: "Symptom Checker",
        subtitle: "Describe your symptoms accurately for the best AI-powered analysis.",
        location: "Symptom Category",
        details: "Details",
        analysis: "Analysis",
        whereHurt: "What is the main issue?",
        nextStep: "Next Step",
        back: "Back",
        describePain: "Specific Symptoms",
        severity: "Severity",
        duration: "How long has it lasted?",
        durationPlaceholder: "e.g., 2 hours, 3 days",
        followUp: "Follow-up Questions",
        finalDetails: "Final Details",
        uploadImage: "Upload Image (Optional)",
        clickUpload: "Click to upload image",
        additionalNotes: "Additional Notes",
        notesPlaceholder: "Any other symptoms or context...",
        analyze: "Analyze Symptoms",
        analyzing: "Analyzing...",
        consulting: "Consulting medical knowledge base",
        mild: "Mild",
        severe: "Severe",
        yes: "Yes",
        no: "No",
        yourAnswer: "Your answer...",
        reset: "Start New Check",
        confidence: "Confidence",
        medicines: "Medicines",
        treatments: "Treatments",
        precautions: "Precautions",
        disclaimer: "Disclaimer: This is an AI analysis and not a substitute for professional medical advice.",
        // Categories
        cat_head: "Head & Neck",
        cat_chest: "Chest & Breathing",
        cat_stomach: "Stomach & Digestion",
        cat_limbs: "Muscles & Joints",
        cat_skin: "Skin & Outer",
        cat_general: "General / Whole Body",
        // Symptoms
        sym_headache: "Headache",
        sym_dizziness: "Dizziness",
        sym_sore_throat: "Sore Throat",
        sym_vision: "Vision Issues",
        sym_cough: "Cough",
        sym_short_breath: "Shortness of Breath",
        sym_chest_pain: "Chest Pain",
        sym_palpitations: "Heart Palpitations",
        sym_nausea: "Nausea/Vomiting",
        sym_stomach_pain: "Stomach Pain",
        sym_bloating: "Bloating",
        sym_diarrhea: "Diarrhea",
        sym_joint_pain: "Joint Pain",
        sym_muscle_ache: "Muscle Aches",
        sym_swelling: "Swelling",
        sym_weakness: "Weakness",
        sym_rash: "Rash/Redness",
        sym_itching: "Itching",
        sym_acne: "Acne/Boils",
        sym_burn: "Burn/Cut",
        sym_fever: "Fever",
        sym_fatigue: "Fatigue",
        sym_chills: "Chills",
        sym_sweating: "Excessive Sweating",
    },
    hi: {
        title: "लक्षण जांचकर्ता",
        subtitle: "सर्वोत्तम एआई विश्लेषण के लिए अपने लक्षणों का सटीक वर्णन करें।",
        location: "लक्षण श्रेणी",
        details: "विवरण",
        analysis: "विश्लेषण",
        whereHurt: "मुख्य समस्या क्या है?",
        nextStep: "अगला कदम",
        back: "वापस",
        describePain: "विशिष्ट लक्षण",
        severity: "तीव्रता",
        duration: "यह कब से है?",
        durationPlaceholder: "जैसे, 2 घंटे, 3 दिन",
        followUp: "अनुवर्ती प्रश्न",
        finalDetails: "अंतिम विवरण",
        uploadImage: "छवि अपलोड करें (वैकल्पिक)",
        clickUpload: "अपलोड करने के लिए क्लिक करें",
        additionalNotes: "अतिरिक्त नोट्स",
        notesPlaceholder: "कोई अन्य लक्षण या संदर्भ...",
        analyze: "लक्षणों का विश्लेषण करें",
        analyzing: "विश्लेषण कर रहा है...",
        consulting: "चिकित्सा ज्ञान आधार से परामर्श",
        mild: "हल्का",
        severe: "गंभीर",
        yes: "हाँ",
        no: "नहीं",
        yourAnswer: "आपका उत्तर...",
        reset: "नई जांच शुरू करें",
        confidence: "आत्मविश्वास",
        medicines: "दवाएं",
        treatments: "उपचार",
        precautions: "सावधानियां",
        disclaimer: "अस्वीकरण: यह एक एआई विश्लेषण है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है।",
        // Categories
        cat_head: "सिर और गर्दन",
        cat_chest: "छाती और श्वास",
        cat_stomach: "पेट और पाचन",
        cat_limbs: "मांसपेशियां और जोड़",
        cat_skin: "त्वचा",
        cat_general: "सामान्य / पूरा शरीर",
        // Symptoms
        sym_headache: "सिरदर्द",
        sym_dizziness: "चक्कर आना",
        sym_sore_throat: "गले में खराश",
        sym_vision: "दृष्टि समस्याएं",
        sym_cough: "खांसी",
        sym_short_breath: "सांस की तकलीफ",
        sym_chest_pain: "छाती में दर्द",
        sym_palpitations: "दिल की धड़कन",
        sym_nausea: "मतली/उल्टी",
        sym_stomach_pain: "पेट दर्द",
        sym_bloating: "सूजन/गैस",
        sym_diarrhea: "दस्त",
        sym_joint_pain: "जोड़ों का दर्द",
        sym_muscle_ache: "मांसपेशियों में दर्द",
        sym_swelling: "सूजन",
        sym_weakness: "कमजोरी",
        sym_rash: "दाने/लालिमा",
        sym_itching: "खुजली",
        sym_acne: "मुंहासे",
        sym_burn: "जलना/कट",
        sym_fever: "बुखार",
        sym_fatigue: "थकान",
        sym_chills: "ठंड लगना",
        sym_sweating: "अत्यधिक पसीना",
    },
    te: {
        title: "లక్షణాల పరిశీలన",
        subtitle: "ఉత్తమ AI విశ్లేషణ కోసం మీ లక్షణాలను ఖచ్చితంగా వివరించండి.",
        location: "లక్షణ వర్గం",
        details: "వివరాలు",
        analysis: "విశ్లేషణ",
        whereHurt: "ప్రధాన సమస్య ఏమిటి?",
        nextStep: "తరువాతి దశ",
        back: "వెనుకకు",
        describePain: "నిర్దిష్ట లక్షణాలు",
        severity: "తీవ్రత",
        duration: "ఎంత కాలం నుండి ఉంది?",
        durationPlaceholder: "ఉదా., 2 గంటలు, 3 రోజులు",
        followUp: "తదుపరి ప్రశ్నలు",
        finalDetails: "తుది వివరాలు",
        uploadImage: "చిత్రాన్ని అప్‌లోడ్ చేయండి (ఐచ్ఛికం)",
        clickUpload: "అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి",
        additionalNotes: "అదనపు గమనికలు",
        notesPlaceholder: "ఏవైనా ఇతర లక్షణాలు...",
        analyze: "లక్షణాలను విశ్లేషించండి",
        analyzing: "విశ్లేషిస్తోంది...",
        consulting: "వైద్య విజ్ఞానాన్ని సంప్రదిస్తోంది",
        mild: "స్వల్ప",
        severe: "తీవ్రమైన",
        yes: "అవును",
        no: "కాదు",
        yourAnswer: "మీ సమాధానం...",
        reset: "కొత్త తనిఖీని ప్రారంభించండి",
        confidence: "నమ్మకం",
        medicines: "మందులు",
        treatments: "చికిత్సలు",
        precautions: "జాగ్రత్తలు",
        disclaimer: "నిరాకరణ: ఇది AI విశ్లేషణ మరియు వృత్తిపరమైన వైద్య సలహాకు ప్రత్యామ్నాయం కాదు.",
        // Categories
        cat_head: "తల & మెడ",
        cat_chest: "ఛాతీ & శ్వాస",
        cat_stomach: "కడుపు & జీర్ణక్రియ",
        cat_limbs: "కండరాలు & కీళ్ళు",
        cat_skin: "చర్మం",
        cat_general: "సాధారణ / మొత్తం శరీరం",
        // Symptoms
        sym_headache: "తలనొప్పి",
        sym_dizziness: "తల తిరుగుట",
        sym_sore_throat: "గొంతు నొప్పి",
        sym_vision: "దృష్టి సమస్యలు",
        sym_cough: "దగ్గు",
        sym_short_breath: "శ్వాస ఆడకపోవుట",
        sym_chest_pain: "ఛాతీ నొప్పి",
        sym_palpitations: "గుండె దడ",
        sym_nausea: "వికారం/వాంతులు",
        sym_stomach_pain: "కడుపు నొప్పి",
        sym_bloating: "కడుపు ఉబ్బరం",
        sym_diarrhea: "విరేచనాలు",
        sym_joint_pain: "కీళ్ల నొప్పులు",
        sym_muscle_ache: "కండరాల నొప్పులు",
        sym_swelling: "వాపు",
        sym_weakness: "బలహీనత",
        sym_rash: "దద్దుర్లు",
        sym_itching: "దురద",
        sym_acne: "మొటిమలు",
        sym_burn: "కాలిన గాయాలు",
        sym_fever: "జ్వరం",
        sym_fatigue: "అలసట",
        sym_chills: "చలి",
        sym_sweating: "అధిక చెమట",
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
