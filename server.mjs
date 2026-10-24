
import express from "express";
import OpenAI from "openai";
import "dotenv/config";

const app = express();
const PORT = 3000;

if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY belum diatur di file .env");
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json({ limit: "10kb" }));
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body?.message;

        if (
            typeof message !== "string" ||
            message.trim().length === 0 ||
            message.length > 4000
        ) {
            return res.status(400).json({
                error: "Pertanyaan harus diisi dan maksimal 4000 karakter."
            });
        }

        const response = await openai.responses.create({
            model: "gpt-5.5",
            instructions:
                "Kamu adalah StudyMate AI, asisten belajar yang ramah. " +
                "Jawab dalam bahasa Indonesia dengan jelas dan mudah dipahami siswa. " +
                "Bantu menjelaskan konsep, memberikan contoh, dan membimbing proses belajar.",
            input: message.trim(),
            max_output_tokens: 500
        });

        res.json({
            reply: response.output_text
        });
    } catch (error) {
        console.error("Permintaan ke layanan AI gagal.");

        res.status(500).json({
            error: "Jawaban belum dapat dibuat. Silakan coba lagi."
        });
    }
});

app.listen(PORT, () => {
    console.log(`StudyMate AI aktif di http://localhost:${PORT}`);
});
