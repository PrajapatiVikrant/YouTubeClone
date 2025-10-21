import generatePrompt from "../utils/generatePrompt.js";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const videoTitleDescription = async (req, res) => {

    const { title, description, tags } = req.body;

    try {
        if (!title && !description) {
            return res.status(400).json({ error: "Provide at least title or description." });
        }

        const prompt = generatePrompt(title, description, tags);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);

        const output = result.response.text();
           res.json({ generated: output });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }

}


export const channelTitleDescription = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).josn({
            message: "Internal server error"
        })
    }
}