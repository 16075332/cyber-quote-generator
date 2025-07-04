import React, { useState } from "react";
import "./styles.css";
import logo from "./assets/bridgestone.png";

/* ─────────── Quotes ─────────── */
const quotes = [
  { quote: "Cybersecurity is much more than a matter of IT.", author: "Stéphane Nappo" },
  { quote: "Security is not a product, but a process.", author: "Bruce Schneier" },
  { quote: "Only amateurs attack machines; professionals target people.", author: "Bruce Schneier" },
  { quote: "The best defense against social engineering is education.", author: "Kevin Mitnick" },
  { quote: "Hackers don't break in — they log in.", author: "Anonymous" },
  { quote: "Think before you click. One mistake could cost everything.", author: "Cyber Awareness Reminder" },
];

/* ─────────── Quiz questions ─────────── */
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
      "Using multi‑factor authentication",
      "Using public Wi‑Fi for confidential work",
      "Clicking pop‑ups for updates",
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
  /* page can be 'quote', 'quiz', or 'result' */
  const [page, setPage] = useState("quote");

  /* Quote state */
  const [currentQuote, setCurrentQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );

  /* Quiz state */
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  /* helpers */
  const percentage = Math.round((correctCount / questions.length) * 100);
  const passed = percentage >= 80;

  /* ───────────────────────────── Quote page */
  if (page === "quote") {
    return (
      <div className="app">
        <img src={logo} alt="Bridgestone Logo" className="logo" />
        <h1>🔐 Cybersecurity Awareness</h1>
        <p className="slogan">B-SAFE! B-SECURE! Security Starts With You.</p>

        <div className="quote-card fixed-height">
          <p className="quote">“{currentQuote.quote}”</p>
          <p className="author">— {currentQuote.author}</p>

          <div className="buttons">
            <button
              className="buttons-button black-button"
              onClick={() =>
                setCurrentQuote(
                  quotes[Math.floor(Math.random() * quotes.length)]
                )
              }
            >
              New Quote
            </button>
          </div>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button
            className="buttons-button"
            style={{ padding: "0.75rem 2rem" }}
            onClick={() => setPage("quiz")}
          >
            Take the Cybersecurity Quiz →
          </button>
        </div>
      </div>
    );
  }

  /* ───────────────────────────── Result page */
  if (page === "result") {
    return (
      <div className="app">
        <img src={logo} alt="Bridgestone Logo" className="logo" />
        <h1>🔐 Quiz Results</h1>

        <div
          className={`result-banner ${
            passed ? "result-pass" : "result-fail"
          }`}
        >
          <p>
            You scored {correctCount} / {questions.length} ({percentage}%)
          </p>
          {passed ? (
            <p>🎉 Great job! You passed.</p>
          ) : (
            <>
              <p>🚦 Score below 80 %. Please try again.</p>
              <button
                className="buttons-button black-button"
                onClick={() => {
                  /* reset state */
                  setCurrentQ(0);
                  setCorrectCount(0);
                  setSelected(null);
                  setShowFeedback(false);
                  setPage("quiz");
                }}
              >
                Restart Quiz
              </button>
            </>
          )}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={() => setPage("quote")}
            className="buttons-button"
            style={{
              background: "transparent",
              color: "var(--bridgestone-red)",
              border: "1px solid var(--bridgestone-red)",
            }}
          >
            ← Back to Quotes
          </button>
        </div>
      </div>
    );
  }

  /* ───────────────────────────── Quiz page */
  const thisQ = questions[currentQ];
  const isCorrect = selected === thisQ.correct;

  return (
    <div className="app">
      <img src={logo} alt="Bridgestone Logo" className="logo" />
      <h1>🔐 Cybersecurity Quiz</h1>
      <p className="slogan">B-SAFE! B-SECURE! Security Starts With You.</p>

      <div className="quote-card quiz-card">
        <h2>
          Question {currentQ + 1} / {questions.length}
        </h2>
        <p className="quote question">{thisQ.question}</p>

        <div className="buttons options">
          {thisQ.options.map((opt, idx) => {
            /* decide class when feedback is shown */
            let extraClass = "";
            if (showFeedback && idx === selected) {
              extraClass = isCorrect ? "correct" : "incorrect";
            }
            return (
              <button
                key={idx}
                className={`buttons-button option-button ${extraClass}`}
                disabled={showFeedback}
                onClick={() => {
                  if (showFeedback) return;
                  setSelected(idx);
                  setShowFeedback(true);
                  if (idx === thisQ.correct) setCorrectCount((c) => c + 1);
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div style={{ marginTop: "1rem" }}>
            {isCorrect ? (
              <p className="correct-msg">✅ Correct!</p>
            ) : (
              <p className="incorrect-msg">❌ Incorrect.</p>
            )}

            <button
              className="buttons-button"
              style={{ marginTop: "1rem" }}
              onClick={() => {
                setSelected(null);
                setShowFeedback(false);
                /* next question or results */
                if (currentQ + 1 < questions.length) {
                  setCurrentQ((q) => q + 1);
                } else {
                  setPage("result");
                }
              }}
            >
              {currentQ + 1 < questions.length ? "Next Question" : "Show Results"}
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <button
          onClick={() => setPage("quote")}
          className="buttons-button"
          style={{
            background: "transparent",
            color: "var(--bridgestone-red)",
            border: "1px solid var(--bridgestone-red)",
          }}
        >
          ← Back to Quotes
        </button>
      </div>
    </div>
  );
}
