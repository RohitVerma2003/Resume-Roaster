import { evaluateResume } from "../services/ai.service.js";
import { parse_pdf } from "../services/pdf.service.js";

export const roast = async (req, res) => {
    try {
        const pdf_path = req.file.path;

        const pdf_text = await parse_pdf(pdf_path);
        // const ai_response = await evaluateResume(pdf_text.text);

        const ai_response = {
            atsScore: 65,
            summaryRoast: "Rohit Verma's resume is like a Bollywood movie—lots of action, but some scenes are just filler. Let's cut to the chase.",
            roasts: [
                "Education section is as exciting as a PowerPoint presentation on 'The History of Paperclips.' GPA? Meh. Where's the spice?",
                "Experience section: 'Developed and scaled a full-stack HealthTech platform'—cool, but did it cure cancer? Give us metrics or GTFO.",
                "Projects: 'PrepPilot 2' sounds like a rejected startup name from Shark Tank. Also, 'cheat-proof backend-only state'—bold claim. Prove it.",
                "Skills: 'C, C++, JavaScript, TypeScript'—so, you’re basically a walking programming language dictionary. But can you actually build something useful?",
                "Achievements: 'Top 22% problem solver on LeetCode'—so, 78% are better? Ouch."
            ],
            issues: [
                "No quantifiable impact in experience section (e.g., 'reduced manual ops by 40%' is vague—40% of what?).",
                "Projects lack real-world deployment links or user metrics (e.g., '100+ daily active users'—where’s the proof?).",
                "Skills section is a laundry list. Prioritize what’s relevant to the job you’re applying for.",
                "Formatting is inconsistent (e.g., 'Databases:MongoDB'—missing space, seriously?).",
                "No GitHub/Live links for projects. Are they real or just figments of your imagination?"
            ],
            suggestions: [
                "Add metrics everywhere. Did your HealthTech platform save lives or just lines of code?",
                "Trim the skills list. Nobody cares if you know HTML5 unless you’re applying to a 2005 web dev job.",
                "Include GitHub/Live project links. Show, don’t tell.",
                "Fix formatting. A missing space is the difference between 'Databases:MongoDB' and 'Databases: MongoDB' (and sanity).",
                "Rewrite the summary to highlight unique value. 'Full-stack dev who actually ships products' > 'I know C++.'"
            ],
            improvedSummary: "Full-stack developer with a knack for building (and scaling) real-world applications. Proven track record of reducing operational overhead by 40% and creating tools used by 100+ daily active users. LeetCode warrior (top 22%), but prefers shipping code over solving hypothetical problems. Let’s build something that doesn’t suck."
        }


        return res.status(200).json({
            success: true,
            data: ai_response
        })
    } catch (error) {
        console.log("Error in roast controller: ", error);
        return res.status(500).json({ success: false, error: error.message })
    }
}