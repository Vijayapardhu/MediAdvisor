"use server";

import { ai } from "@/lib/gemini";
import type { SymptomData, DiseasePrediction, Question } from "@/types";

export async function generateFollowUpQuestions(data: SymptomData, language: string = "en"): Promise<Question[]> {
  const prompt = `
    Patient reports:
    - Body Part: ${data.bodyPart}
    - Pain Type: ${data.painType.join(", ")}
    - Severity: ${data.severity}/10
    - Duration: ${data.duration}

    Generate 3 relevant follow-up questions to help diagnose the condition.
    The questions MUST be in the following language: ${language}.
    
    Return ONLY a JSON array with this structure:
    [
      { "id": "q1", "text": "Question text?", "type": "yes_no" },
      { "id": "q2", "text": "Question text?", "type": "choice", "options": ["Option A", "Option B"] },
      { "id": "q3", "text": "Question text?", "type": "text" }
    ]
  `;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = result.text;
    if (!text) throw new Error("No response from AI");

    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error generating questions:", error);
    return [];
  }
}

export async function analyzeSymptoms(data: SymptomData, language: string = "en"): Promise<DiseasePrediction[]> {
  // Prepare contents for multimodal input
  const contents: any[] = [
    {
      role: "user",
      parts: [
        {
          text: `
            Act as an expert medical diagnostic AI. Analyze the following symptoms:
            - Body Part: ${data.bodyPart}
            - Pain Type: ${data.painType.join(", ")}
            - Severity: ${data.severity}/10
            - Duration: ${data.duration}
            - Additional Description: ${data.description}
            - Patient Answers to Follow-up Questions: ${JSON.stringify(data.answers)}
            
            Provide a list of 3 possible diseases/conditions.
            The response MUST be in the following language: ${language}.

            For each, include:
            1. Disease Name
            2. Confidence Score (0-100)
            3. Brief Description
            4. Recommended Medicines (Generic names, dosage, side effects) - DISCLAIMER: Informational only.
            5. Treatment Protocols (Home remedies, medical interventions)
            6. Precautions (What to avoid, lifestyle changes)

            Return the response ONLY as a valid JSON array matching this structure:
            [
              {
                "disease": "string",
                "confidence": number,
                "description": "string",
                "medicines": [
                  { "name": "string", "dosage": "string", "sideEffects": ["string"], "warnings": ["string"] }
                ],
                "treatments": ["string"],
                "precautions": ["string"]
              }
            ]
            Do not include markdown formatting or code blocks. Just the raw JSON.
          `
        }
      ]
    }
  ];

  // Add images if present
  if (data.images && data.images.length > 0) {
    data.images.forEach(imgBase64 => {
      // Extract mime type and base64 data
      // Format: "data:image/png;base64,iVBORw0KGgo..."
      const matches = imgBase64.match(/^data:(.+);base64,(.+)$/);

      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const base64Data = matches[2];

        contents[0].parts.push({
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        });
      }
    });
  }

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    const text = result.text;

    if (!text) {
      throw new Error("No response from AI");
    }

    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const predictions: DiseasePrediction[] = JSON.parse(jsonStr);
    return predictions;
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    throw new Error("Failed to analyze symptoms. Please try again.");
  }
}
