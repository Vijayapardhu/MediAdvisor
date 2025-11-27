export interface SymptomData {
    bodyPart: string;
    painType: string[];
    severity: number; // 1-10
    duration: string;
    description: string;
    answers: Record<string, string>; // Question ID -> Answer
    images: string[]; // Base64 strings
}

export interface Question {
    id: string;
    text: string;
    options?: string[]; // Multiple choice options
    type: "text" | "choice" | "yes_no";
}

export interface DiseasePrediction {
    disease: string;
    confidence: number;
    description: string;
    medicines: Medicine[];
    treatments: string[];
    precautions: string[];
}

export interface Medicine {
    name: string;
    dosage: string;
    sideEffects: string[];
    warnings: string[];
}
