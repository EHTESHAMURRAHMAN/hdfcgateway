import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

const workingKey = "TEST1234WORKINGKEY"; // temporary testing key
const accessCode = "AVAB77DA28BY55ABYB"; // dummy test access code

app.post("/api/encrypt", (req, res) => {
    try {
        const text = JSON.stringify(req.body);
        const key = crypto.createHash("md5").update(workingKey).digest();
        const iv = key;
        const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
        let encrypted = cipher.update(text, "utf8", "base64");
        encrypted += cipher.final("base64");

        res.status(200).json({
            encRequest: encrypted,
            access_code: accessCode,
        });
    } catch (err) {
        console.error("Encryption failed:", err);
        res.status(500).json({ error: "Encryption failed" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
