const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const quotes = [
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { content: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { content: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { content: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { content: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { content: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { content: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" }
];

let history = [];

app.get("/api/quote", (req, res) => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    const savedQuote = {
        ...quote,
        createdAt: new Date()
    };

    history.unshift(savedQuote);
    history = history.slice(0, 20);

    res.json(savedQuote);
});

app.get("/api/history", (req, res) => {
    res.json(history);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

