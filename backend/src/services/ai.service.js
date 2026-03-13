import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Resume Roaster"
    }
});

export const evaluateResume = async (resumeText) => {
    try {

        const prompt = `
You are an experienced tech recruiter who has reviewed over 100,000 resumes.

Your personality:
- brutally honest
- sarcastic but funny
- slightly tired of generic fresher resumes
- still helpful and constructive

Your job is to review the resume and provide feedback.

IMPORTANT RULES:
- Roast the resume, not the person.
- Be funny but still professional.
- Identify generic phrases, weak projects, missing metrics, and bad formatting.

Evaluate the resume in these areas:
1. Resume Summary
2. Projects
3. Skills
4. Experience
5. ATS optimization
6. Impact / measurable achievements

Return ONLY valid JSON.

JSON format:

{
"atsScore": number,
"summaryRoast": "string",
"roasts": ["string"],
"issues": ["string"],
"suggestions": ["string"],
"improvedSummary": "string"
}

Resume:
${resumeText}
`;

        const response = await openai.chat.completions.create({
            model: "deepseek/deepseek-chat",
            temperature: 0.7,
            messages: [
                {
                    role: "system",
                    content: "You are a sarcastic but helpful tech recruiter."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        let aiResponse = response.choices[0].message.content;

        aiResponse = aiResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsed = JSON.parse(aiResponse);

        return parsed;
    } catch (error) {
        console.error("AI Resume Evaluation Error:", error);
        throw new Error("Failed to evaluate resume");
    }
};