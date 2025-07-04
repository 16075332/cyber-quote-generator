import React, { useState } from "react";
import "./styles.css";
import logo from "./assets/bridgestone.png";

const quotes = [
  {
    quote: "Cybersecurity is much more than a matter of IT.",
    author: "Stéphane Nappo",
  },
  {
    quote: "Security is not a product, but a process.",
    author: "Bruce Schneier",
  },
  {
    quote: "Only amateurs attack machines; professionals target people.",
    author: "Bruce Schneier",
  },
  {
    quote: "The best defense against social engineering is education.",
    author: "Kevin Mitnick",
  },
  {
    quote: "Hackers don't break in — they log in.",
    author: "Anonymous",
  },
  {
    quote: "Think before you click. One mistake could cost everything.",
    author: "Cyber Awareness Reminder",
  },
];

export default function App() {
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());

  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  function handleNewQuote() {
    setCurrentQuote(getRandomQuote());
  }

  function copyToClipboard() {
    const text = `"${currentQuote.quote}" — ${currentQuote.author}`;
    navigator.clipboard.writeText(text);
    alert("Quote copied to clipboard!");
  }

  return (
    <div className="app">
      <img src={logo} alt="Bridgestone Logo" className="logo" />
      <h1>🔐 Cybersecurity Awareness</h1>
      <p className="slogan">B-SAFE! B-SECURE! Security Starts With You.</p>

      <div className="quote-card">
        <p className="quote">“{currentQuote.quote}”</p>
        <p className="author">— {currentQuote.author}</p>
        <div className="buttons">
          <button onClick={handleNewQuote}>New Quote</button>
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      </div>
    </div>
  );
}
