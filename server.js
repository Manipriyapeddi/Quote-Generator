const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const Quote = require("./models/Quote");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/api/quote", async (req, res) => {
    try {
        const response = await axios.get("https://api.quotable.io/random");

        const newQuote = new Quote({
            content: response.data.content,
            author: response.data.author
        });

        await newQuote.save();

        res.json(newQuote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/history", async (req, res) => {
    try {
        const quotes = await Quote.find().sort({ createdAt: -1 });
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
