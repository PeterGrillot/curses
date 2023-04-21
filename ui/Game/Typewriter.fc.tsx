import React, { useEffect, useState } from "react";

const Typewriter = ({ text }: { text: string }) => {
  const [typewrite, setTypewrite] = useState("");
  const [currentText, setCurrentText] = useState(text);
  const speed = 4;

  // Type
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTypewrite(text.slice(0, typewrite.length + 1));
    }, speed + Math.floor(Math.random() * 50));
    return () => clearTimeout(timeout);
  }, [typewrite, text]);

  // Reset
  useEffect(() => {
    if (currentText !== text) {
      setTypewrite("");
      setCurrentText(text);
    }
  }, [currentText, text]);

  return (
    <p className="type-area">
      {typewrite}
      <span className="cursor blink">▓</span>
    </p>
  );
};

export default Typewriter;
