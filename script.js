const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const historyList = document.getElementById("history");

async function getQuote() {
    const response = await fetch("http://localhost:5000/api/quote");
    const data = await response.json();

    quoteText.innerText = data.content;
    authorText.innerText = `- ${data.author}`;

    loadHistory();
}

async function loadHistory() {
    const response = await fetch("http://localhost:5000/api/history");
    const data = await response.json();

    historyList.innerHTML = "";

    data.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `"${item.content}" — ${item.author}`;
        historyList.appendChild(li);
    });
}

loadHistory();
