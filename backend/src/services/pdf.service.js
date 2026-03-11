import fs from "fs";
import {PDFParse} from "pdf-parse"

export const parse_pdf = async (path) => {
    try {
        const dataBuffer = fs.readFileSync(path);
        const parser = new PDFParse({data: dataBuffer});

        const data = await parser.getText();

        return data;
    } catch (error) {
        console.error("Error parsing PDF:", error);
        throw error;
    }
};