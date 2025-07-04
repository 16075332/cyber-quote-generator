import React from "react";

function QuoteCard({ quote, author, onNewQuote }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${quote}" — ${author}`);
  };

  const tweetQuote = () => {
    const tweetText = encodeURIComponent(`"${quote}" — ${author}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank");
  };

  return (
    <div className="quote-card">
      <p className="quote">“{quote}”</p>
      <p className="author">— {author}</p>
      <div className="buttons">
        <button onClick={onNewQuote}>New Quote 🔁</button>
        
      </div>
    </div>
  );
}

export default QuoteCard;
