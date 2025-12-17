import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
    const { name, memory } = req.body;

    const prompt = `
Create a gentle, respectful memory profile for ${name}.
Based on this description: ${memory}
Write in a warm, reflective tone.
`;

    // Call AI API here
    const aiText = "Generated memory text..."; // placeholder

    res.json({ name, aiText });
});

app.listen(3000);
