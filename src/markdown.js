import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const Markdown = () => {
  const [markDown, setMarkDown] = useState(
    localStorage.getItem("markdown") ||
      "# Welcome to Markdown\n\nWrite some markdown here."
  );
  const [isPreview, setIsPreview] = useState(true);

  useEffect(() => {
    localStorage.setItem("markdown", markDown);
  }, [markDown]);

  const handleTextChange = (e) => {
    setMarkDown(e.target.value);
  };

  const clearMarkdown = () => {
    setMarkDown("");
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  const insertMarkdown = (syntax) => {
    const textarea = document.getElementById("markdown-textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.slice(start, end);

    let formattedText = "";
    switch (syntax) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "header":
        formattedText = `# ${selectedText}`;
        break;
      default:
        break;
    }

    setMarkDown(markDown.slice(0, start) + formattedText + markDown.slice(end));
  };

  return (
    <div className="center-div">
      <div className="left-side">
        <div className="format-buttons">
          <button onClick={() => insertMarkdown("bold")}>Bold</button>
          <button onClick={() => insertMarkdown("italic")}>Italic</button>
          <button onClick={() => insertMarkdown("header")}>Header</button>
          <button onClick={clearMarkdown}>Clear</button>
          <button onClick={togglePreview}>
            {isPreview ? "Show Raw" : "Show Preview"}
          </button>
        </div>

        <textarea
          id="markdown-textarea"
          className="markdown-textarea"
          value={markDown}
          onChange={handleTextChange}
          placeholder="Start typing markdown here..."
        />
      </div>

      <div className="right-side">
        {isPreview ? (
          <ReactMarkdown>{markDown}</ReactMarkdown>
        ) : (
          <pre>{markDown}</pre>
        )}
      </div>
    </div>
  );
};

export default Markdown;
