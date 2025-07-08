import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import logo from "./assets/bridgestone.png";
import "./styles.css";

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
      "Because it's easier to remember",
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

/* ─────────── Topics for learning more ─────────── */
const topics = [
{
  id: "phishing",
  title: "Phishing Attacks",
  content: `Phishing is a cyberattack method that tricks individuals into providing sensitive information such as usernames, passwords, and credit card details. These attacks often come in the form of deceptive emails, websites, or messages that appear legitimate.

COMMON TYPES:
• Email Phishing: Fraudulent emails mimicking legitimate companies  
• Spear Phishing: Targeted attacks on specific individuals  
• Whaling: Attacks targeting executives  
• Smishing/Vishing: Scams via SMS or voice calls

HOW TO PROTECT YOURSELF:
• Verify sender email addresses  
• Hover over links before clicking  
• Never share credentials via email  
• Enable multi-factor authentication  
• Report suspicious messages to IT

Remember: When in doubt, don't click! Always verify unexpected requests through official channels.`,
},
{
  id: "passwords",
  title: "Creating Strong Passwords",
  content: `Strong passwords are your first line of defense against unauthorized access to accounts and sensitive data.

CHARACTERISTICS OF STRONG PASSWORDS:
• Minimum 12–16 characters  
• Mix of uppercase, lowercase, numbers, and symbols  
• No dictionary words or personal information  
• Unique for each account

PASSWORD BEST PRACTICES:
• Use a password manager (LastPass, 1Password)  
• Enable multi-factor authentication  
• Change passwords after a breach  
• Never reuse passwords across sites  
• Avoid writing passwords down

EXAMPLE:  
Weak: john1985  
Strong: J#8nL2$pK9!wQx

Remember: Your password is like a toothbrush – don’t share it and change it regularly!`,
},
{
  id: "social-engineering",
  title: "Social Engineering Explained",
  content: `Social engineering manipulates human psychology rather than exploiting technical vulnerabilities to gain access to systems or information.

COMMON TECHNIQUES:
• Pretexting: Creating fake scenarios to extract info  
• Baiting: Offering something enticing to install malware  
• Quid Pro Quo: Promising benefits for information  
• Tailgating: Following someone into secure areas

RED FLAGS TO WATCH FOR:
• Urgent requests threatening consequences  
• Requests bypassing normal procedures  
• Unusual payment or information requests  
• Impersonation of authority figures

PROTECTION STRATEGIES:
• Verify identities before sharing information  
• Follow company security procedures  
• Be skeptical of unsolicited requests  
• Report suspicious activity immediately  
• Conduct regular security training

Remember: If it seems too good to be true, it probably is!`,
},

];

/* ─────────── Animation Variants ─────────── */
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function App() {
  const [page, setPage] = useState("user");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [user, setUser] = useState({ name: "", email: "" });
  const percentage = Math.round((correctCount / questions.length) * 100);
  const passed = percentage >= 80;
  const validEmail = /^[^\s@]+@[^\s@]+\.(com|co\.za)$/i.test(user.email.trim());
  const canContinue = user.name.trim() !== "" && validEmail;
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  useEffect(() => {
    if (page === "quote") {
      const interval = setInterval(() => {
        setQuoteIndex((i) => (i + 1) % quotes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [page]);

 const generateCertificate = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    
    // Add background color
    doc.setFillColor(200, 0, 0); // Bridgestone red
    doc.rect(0, 0, 297, 210, 'F');
    
    // White content area
    doc.setFillColor(255, 255, 255);
    doc.rect(15, 15, 267, 180, 'F');
    
    // Add logo
    doc.addImage(logo, "PNG", 30, 25, 60, 20);
    
    // Certificate title
    doc.setFontSize(28);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("CYBERSECURITY AWARENESS CERTIFICATE", 148, 60, null, null, "center");
    
    // Decorative line
    doc.setDrawColor(200, 0, 0);
    doc.setLineWidth(1);
    doc.line(60, 60, 247, 60);
    
    // Awarded to text
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("This certificate is awarded to:", 148, 80, null, null, "center");
    
    // Recipient name
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(user.name.toUpperCase(), 148, 100, null, null, "center");
    
    // Details section
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`For successfully completing the Bridgestone Cybersecurity Awareness Training`, 148, 120, null, null, "center");
    doc.text(`and demonstrating understanding of key security concepts.`, 148, 130, null, null, "center");
    
    // Score and date
    doc.setFont("helvetica", "bold");
    doc.text(`Score: ${correctCount}/${questions.length} (${percentage}%)`, 148, 150, null, null, "center");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 148, 160, null, null, "center");
    
    // Status badge
    doc.setFillColor(...(passed ? [0, 128, 0] : [200, 0, 0])); // Green for passed, red for failed
    doc.roundedRect(120, 170, 57, 15, 7, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text(passed ? "PASSED" : "FAILED", 148, 180, null, null, "center");
    
    // Footer
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text("Bridgestone | Security Starts With You", 148, 195, null, null, "center");
    
    doc.save(`Bridgestone-Cybersecurity-Certificate-${user.name}.pdf`);
  };

  const generateManualPDF = (topic) => {
    const doc = new jsPDF();
    doc.addImage(logo, "PNG", 150, 10, 45, 15);
    doc.setFontSize(22);
    doc.text(topic.title, 20, 30);
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(topic.content, 180);
    doc.text(splitText, 15, 45);
    doc.save(`${topic.title.replace(/\s/g, "-")}-Manual.pdf`);
  };

  const restartQuiz = () => {
  setCurrentQ(0);
  setSelected(null);
  setShowFeedback(false);
  setCorrectCount(0);
  setPage("quiz");
};

  const thisQ = questions[currentQ];
  const isCorrect = selected === thisQ?.correct;

  const handleOptionClick = (index) => {
    if (showFeedback) return;
    setSelected(index);
    setShowFeedback(true);
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

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

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
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="form-input"
              />
              <input
                type="email"
                placeholder="Your email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className={`form-input ${!validEmail && user.email ? "invalid" : ""}`}
              />
              {!validEmail && user.email && (
                <p className="error-message">
                  Invalid email address 
                </p>
              )}
            </div>

            <div className="buttons">
              <button
                className="btn-red"
                disabled={!canContinue}
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
            <p className="quote">"{quotes[quoteIndex].quote}"</p>
            <p className="author">— {quotes[quoteIndex].author}</p>
            <div className="buttons">
<button className="btn-red" onClick={restartQuiz}>
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

            <div className="options">
              {thisQ.options.map((option, i) => (
                <button
                  key={i}
                  className={`option-btn ${showFeedback ? 
                    i === thisQ.correct ? "correct" : 
                    i === selected ? "incorrect" : "" 
                    : ""}`}
                  onClick={() => handleOptionClick(i)}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className="feedback">
                {isCorrect ? (
                  <p className="correct-msg">Correct!</p>
                ) : (
                  <p className="incorrect-msg">
                    Incorrect. The correct answer is: <strong>{thisQ.options[thisQ.correct]}</strong>
                  </p>
                )}
                <button className="btn-red" onClick={handleNextQuestion}>
                  {currentQ + 1 < questions.length ? "Next Question" : "See Results"}
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
            className="results"
          >
            <h2>Your Results</h2>
            <p className="score">
              {correctCount}/{questions.length} ({percentage}%)
            </p>
            <p className={`status ${passed ? "passed" : "failed"}`}>
              {passed ? "Congratulations! You passed." : "Please review the materials and try again."}
            </p>

            <div className="buttons">
             <button 
    className="btn-red" 
    onClick={() => {
      // Reset quiz state before going back to quotes
      setCurrentQ(0);
      setSelected(null);
      setShowFeedback(false);
      setCorrectCount(0);
      setPage("quote");
    }}
  >
    Back to Quotes
  </button>
              <button className="btn-red" onClick={restartQuiz}>
                Retake Quiz
              </button>
              {passed && (
                <button className="btn-red" onClick={generateCertificate}>
                  Download Certificate
                </button>
              )}
              <button className="btn-red" onClick={() => setPage("feedback")}>
                Learn More
              </button>
            </div>
          </motion.div>
        )}

        {page === "feedback" && (
          <motion.div
            key="feedback"
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.3 }}
            className="topics"
          >
            <h2>What would you like to learn more about?</h2>
            <div className="topic-buttons">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  className="btn-red"
                  onClick={() => {
                    generateManualPDF(topic);
                  }}
                >
                  {topic.title} (Download PDF)
                </button>
              ))}
            </div>
            <button className="btn-red" onClick={() => setPage("quote")}>
              Back to Main Menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Bridgestone. All rights reserved.
      </footer>
    </div>
  );
}