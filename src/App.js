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

const questions = [
  {
    question: "What is phishing?",
    options: [
      "A technique to catch fish",
      "A cyberattack that tricks you into giving personal info",
      "An antivirus software",
      "A firewall setting",
    ],
    correct: 1,
  },
  {
    question: "What should you do when you receive a suspicious email?",
    options: [
      "Click all links to check them",
      "Ignore and delete it",
      "Report it to your IT department",
      "Forward to colleagues for advice",
    ],
    correct: 2,
  },
  {
    question: "Why should you use strong, unique passwords?",
    options: [
      "To make your accounts harder to hack",
      "Because it’s easier to remember",
      "To save time logging in",
      "No need, one password is enough",
    ],
    correct: 0,
  },
  {
    question: "Which of the following is a safe practice?",
    options: [
      "Sharing passwords with coworkers",
      "Using multi-factor authentication",
      "Using public Wi-Fi for confidential work",
      "Clicking pop-ups for updates",
    ],
    correct: 1,
  },
  {
    question: "What is social engineering?",
    options: [
      "A construction method",
      "Manipulating people to gain confidential info",
      "Software engineering term",
      "A type of encryption",
    ],
    correct: 1,
  },
];

export default function App() {
  const [page, setPage] = useState("quote");

  // Quote state
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswerResult, setShowAnswerResult] = useState(false);

  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  // Quote handlers
  function handleNewQuote() {
    setCurrentQuote(getRandomQuote());
  }

  function copyToClipboard() {
    const text = `"${currentQuote.quote}" — ${currentQuote.author}`;
    navigator.clipboard.writeText(text);
    alert("Quote copied to clipboard!");
  }

  // Quiz handlers
  function selectOption(index) {
    if (showAnswerResult) return;
    setSelectedOption(index);
    setShowAnswerResult(true);
  }

  function nextQuestion() {
    setSelectedOption(null);
    setShowAnswerResult(false);
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  }

  if (page === "quote") {
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
            
          </div>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={() => setPage("quiz")}
            className="buttons-button"
            style={{ padding: "0.75rem 2rem" }}
          >
            Take the Cybersecurity Quiz →
          </button>
        </div>
      </div>
    );
  }

  // Quiz page
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correct;

  return (
    <div className="app">
      <img src={logo} alt="Bridgestone Logo" className="logo" />
      <h1>🔐 Cybersecurity Awareness Quiz</h1>
      <p className="slogan">B-SAFE! B-SECURE! Security Starts With You.</p>

      <div className="quote-card quiz-card">
        <h2>Quick Quiz</h2>
        <p className="quote question">{currentQuestion.question}</p>
        <div className="buttons options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => selectOption(index)}
              className={`buttons-button option-button ${
                showAnswerResult
                  ? index === currentQuestion.correct
                    ? "correct"
                    : index === selectedOption
                    ? "incorrect"
                    : ""
                  : ""
              }`}
              disabled={showAnswerResult}
            >
              {option}
            </button>
          ))}
        </div>
        {showAnswerResult && (
          <div style={{ marginTop: "1rem" }}>
            {isCorrect ? (
              <p className="correct-msg">✅ Correct! Good job.</p>
            ) : (
              <p className="incorrect-msg">
                ❌ Incorrect. The right answer is:{" "}
                {currentQuestion.options[currentQuestion.correct]}
              </p>
            )}
            <button onClick={nextQuestion} className="buttons-button" style={{ marginTop: "1rem" }}>
              Next Question
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <button
          onClick={() => setPage("quote")}
          className="buttons-button"
          style={{ background: "transparent", color: "var(--bridgestone-red)", border: "1px solid var(--bridgestone-red)" }}
        >
          ← Back to Quotes
        </button>
      </div>
    </div>
  );
}
