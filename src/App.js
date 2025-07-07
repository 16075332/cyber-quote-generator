import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import logo from "./assets/bridgestone.png";
import "./styles.css";

const quotes = [
  { quote: "Cybersecurity is much more than a matter of IT.", author: "Stéphane Nappo" },
  { quote: "Security is not a product, but a process.", author: "Bruce Schneier" },
  { quote: "Only amateurs attack machines; professionals target people.", author: "Bruce Schneier" },
  { quote: "The best defense against social engineering is education.", author: "Kevin Mitnick" },
  { quote: "Hackers don't break in — they log in.", author: "Anonymous" },
  { quote: "Think before you click. One mistake could cost everything.", author: "Cyber Awareness Reminder" },
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

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function App() {
  const [page, setPage] = useState("user");

  /* quote autoplay state */
  const [quoteIndex, setQuoteIndex] = useState(0);

  /* quiz state */
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  /* to prevent double scoring per question */
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  /* user info */
  const [user, setUser] = useState({ name: "", email: "" });

  /* percentage / pass */
  const percentage = Math.round((correctCount / questions.length) * 100);
  const passed = percentage >= 80;

  /* Email validation for .com or .co.za endings */
  const validEmail = /^[^\s@]+@[^\s@]+\.(com|co\.za)$/i.test(user.email.trim());

  /* Can continue only if name and valid email */
  const canContinue = user.name.trim() !== "" && validEmail;

  /* -------- Quote autoplay effect -------- */
  useEffect(() => {
    if (page === "quote") {
      const interval = setInterval(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [page]);

  /* -------- Prefill name/email via URL -------- */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "";
    const email = params.get("email") || "";
    setUser({ name, email });
  }, []);

  /* -------- Certificate -------- */
  const generateCertificate = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(24);
    doc.text("Bridgestone Cybersecurity Awareness Certificate", 15, 40);
    doc.setFontSize(16);
    doc.text(`Name: ${user.name || "________"}`, 15, 60);
    doc.text(`Email: ${user.email || "________"}`, 15, 70);
    doc.text(`Score: ${correctCount}/${questions.length} (${percentage}%)`, 15, 80);
    doc.text(`Status: ${passed ? "Passed" : "Failed"}`, 15, 90);
    doc.addImage(logo, "PNG", 220, 10, 60, 20);
    doc.save("Bridgestone-Cybersecurity-Certificate.pdf");
  };

  /* -------- Helpers -------- */
  const resetQuiz = () => {
    setCurrentQ(0);
    setCorrectCount(0);
    setSelected(null);
    setShowFeedback(false);
    setAnsweredQuestions(new Set());
    setPage("quiz");
  };

  const thisQ = questions[currentQ];
  const isCorrect = selected === thisQ?.correct;

  const handleOptionClick = (index) => {
    if (showFeedback) return; // prevent multiple clicks on same question
    if (answeredQuestions.has(currentQ)) return; // prevent double scoring

    setSelected(index);
    setShowFeedback(true);

    setAnsweredQuestions((prev) => new Set(prev).add(currentQ));

    if (index === thisQ.correct) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelected(null);
    setShowFeedback(false);
    if (currentQ + 1 < questions.length) {
      setCurrentQ((q) => q + 1);
    } else {
      setPage("results");
    }
  };

  return (
    <div className="app">
      <img src={logo} alt="Bridgestone logo" className="logo" />
      <h1>🔐 Cybersecurity Awareness</h1>
      <p className="slogan">B-SAFE! B-SECURE! Security Starts With You.</p>

      <AnimatePresence mode="wait">
        {page === "user" && (
          <motion.div
            key="user"
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.3 }}
          >
            <h2>Enter Your Details</h2>
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder="Your name"
                value={user.name}
                onChange={(e) => setUser((u) => ({ ...u, name: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                  marginBottom: "1rem",
                }}
              />
              <input
                type="email"
                placeholder="Your email"
                value={user.email}
                onChange={(e) => setUser((u) => ({ ...u, email: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem",
                  borderRadius: "8px",
                  border: validEmail || user.email === "" ? "1px solid #ccc" : "2px solid var(--bridgestone-red)",
                  fontSize: "1rem",
                }}
              />
              {user.email && !validEmail && (
                <p
                  style={{
                    color: "var(--bridgestone-red)",
                    fontStyle: "italic",
                    marginTop: "0.5rem",
                    fontSize: "0.85rem",
                    textAlign: "left",
                  }}
                >
                  Invalid email address — must end with <code>.com</code> or <code>.co.za</code>
                </p>
              )}
            </div>

            <div className="buttons">
              <button
                className="buttons-button"
                disabled={!canContinue}
                style={{ opacity: canContinue ? 1 : 0.5, cursor: canContinue ? "pointer" : "not-allowed" }}
                onClick={() => setPage("quote")}
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {page === "quote" && (
          <motion.div
            key="quote"
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.3 }}
            className="quote-card"
          >
            <p className="quote">“{quotes[quoteIndex].quote}”</p>
            <p className="author">— {quotes[quoteIndex].author}</p>
            <div className="buttons">
              <button className="buttons-button" onClick={() => setPage("quiz")}>
                Take the Cybersecurity Quiz →
              </button>
            </div>
          </motion.div>
        )}

        {page === "quiz" && (
          <motion.div
            key="quiz"
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.3 }}
            className="quiz-card"
          >
            <h2>
              Question {currentQ + 1} / {questions.length}
            </h2>
            <p className="question">{thisQ.question}</p>

            <div className="buttons" style={{ flexDirection: "column", gap: "0.75rem", marginTop: "1rem" }}>
              {thisQ.options.map((option, i) => {
                let className = "buttons-button option-button";
                if (showFeedback) {
                  if (i === thisQ.correct) className += " correct";
                  else if (i === selected) className += " incorrect";
                }
                return (
                  <button key={i} className={className} onClick={() => handleOptionClick(i)} disabled={showFeedback}>
                    {option}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                {isCorrect ? (
                  <p style={{ color: "var(--bridgestone-green)" }}>✔ Correct!</p>
                ) : (
                  <p style={{ color: "var(--bridgestone-red)" }}>
                    ✖ Incorrect — correct answer is: {thisQ.options[thisQ.correct]}
                  </p>
                )}

                <button className="buttons-button" onClick={handleNextQuestion} style={{ marginTop: "1rem" }}>
                  {currentQ + 1 < questions.length ? "Next Question →" : "See Results"}
                </button>
              </div>
            )}
          </motion.div>
        )}

        {page === "results" && (
          <motion.div
            key="results"
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.3 }}
            className="results-card"
          >
            <h2>Quiz Results</h2>
            <p>
              You scored {correctCount} out of {questions.length} ({percentage}%)
            </p>
            <p style={{ color: passed ? "var(--bridgestone-green)" : "var(--bridgestone-red)" }}>
              {passed ? "🎉 Congratulations, you passed!" : "😞 You did not pass, please try again."}
            </p>

            <div style={{ marginTop: "1rem" }}>
              <button className="buttons-button" onClick={generateCertificate} disabled={!passed}>
                Download Certificate
              </button>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <button className="buttons-button" onClick={resetQuiz}>
                Retake Quiz
              </button>
              <button
                className="buttons-button"
                onClick={() => {
                  setPage("user");
                  setUser({ name: "", email: "" });
                }}
                style={{ marginLeft: "1rem" }}
              >
                Enter New User
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
