"use client";

import { useState, useEffect } from "react";

export default function TypingEffect() {
  const messages = ["A smarter way to bet", "Understand the Game", "Uncover Past Insights", "Make predictions"];
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 200; // Speed of typing
  const deletingSpeed = 150; // Speed of deleting
  const pauseDuration = 2000; // Pause after typing and before deleting

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let currentText = isDeleting ? currentMessage.slice(0, -1) : currentMessage + messages[messageIndex].charAt(currentMessage.length);
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentMessage(currentText);
      }, deletingSpeed);
    } else if (currentMessage.length < messages[messageIndex].length) {
      timer = setTimeout(() => {
        setCurrentMessage(currentText);
      }, typingSpeed);
    } else if (currentMessage.length === messages[messageIndex].length) {
      // Pause after the message has been fully typed
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    }

    if (isDeleting && currentMessage.length === 0) {
      setMessageIndex((prev) => (prev + 1) % messages.length);
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [currentMessage, isDeleting, messageIndex]);

  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-96 h-20 flex items-center justify-center text-3xl font-semibold text-black-500">
        <span>{currentMessage}</span>
      </div>
    </div>
  );
}
