const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const prompts = JSON.parse(fs.readFileSync("./prompts_full.json", "utf-8"));

const {
    GoogleAIFileManager,
    FileState,
} = require("@google/generative-ai/server");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 8080;
const apiKey = "AIzaSyAYfu7QCOVvmv5mg5-qt2qTyvCxX5fdXA4";

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files (CSS, JS)

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configure Multer to store files on disk
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

app.get("/", (req, res) => {
    res.json("Hii! I'm a root");
});

// Route to render the EJS frontend
app.get("/index", (req, res) => {
    res.render("index", { summary: "" });
});

// Route to handle file upload and AI processing
app.post("/upload", upload.single("audio"), async (req, res) => {
    // user prompt for text generation
    let userPrompt = req.body.userPrompt;
    console.log(userPrompt);

    userPrompt =
        `Create an answer for the following prompt by formatting your response as a creative HTML snippet. Use various HTML tags such as <header>, <section>, and <article> to organize the content, and make sure not to include any <html>, <head>, or <body> tags. Prompt:` +
        userPrompt;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    if (!req.file) {
        if (userPrompt && userPrompt.trim() !== "") {
            try {
                // Pass the prompt directly to the AI
                const result = await model.generateContent([userPrompt]);
                // console.log(result);
                return res.render("index", {
                    summary: result.response.text(),
                });
            } catch (error) {
                console.error("Error processing prompt:", error);
                return res.render("index", {
                    summary: "Error processing prompt.",
                });
            }
        } else {
            return res.render("index", {
                summary: "No file uploaded and no prompt provided.",
            });
        }
    }

    const filePath = req.file.path; // Get the file path

    try {
        const fileManager = new GoogleAIFileManager(apiKey);
        const uploadResult = await fileManager.uploadFile(filePath, {
            mimeType: req.file.mimetype,
            displayName: req.file.originalname,
        });

        let file = await fileManager.getFile(uploadResult.file.name);
        while (file.state === FileState.PROCESSING) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 sec
            file = await fileManager.getFile(uploadResult.file.name);
        }

        if (file.state === FileState.FAILED) {
            return res.render("index", {
                summary: "Audio processing failed.",
            });
        }

        const result = await model.generateContent([
            prompts["1"],
            {
                fileData: {
                    fileUri: uploadResult.file.uri,
                    mimeType: uploadResult.file.mimeType,
                },
            },
        ]);

        // Delete the uploaded file after processing
        fs.unlinkSync(filePath);
        // console.log(result.response.text());
        res.render("index", { summary: result.response.text() });
    } catch (error) {
        console.error("Error processing file:", error);
        res.render("index", { summary: "Error processing the file." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// https://github.com/pArZiVaL-18/AI-Meet-Summarizer.git
