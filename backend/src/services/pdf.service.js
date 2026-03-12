import fs from "fs";
import { PDFParse } from "pdf-parse"

export const parse_pdf = async (path) => {
    try {
        const dataBuffer = fs.readFileSync(path);
        const parser = new PDFParse({ data: dataBuffer, });

        const data = await parser.getInfo();
        console.log(data)

        if (data.total > 2) {
            throw new Error("Resume must not exceed 2 pages.");
        }

        const text = await parser.getText();

        return text;
    } catch (error) {
        console.error("Error parsing PDF:", error);
        throw error;
    }
};