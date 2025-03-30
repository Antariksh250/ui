"use client";

// TextAnimation.tsx
import React, { useState, useEffect } from "react";

interface TextAnimationProps {
  words: string[];
  displayTime?: number; // Time each word is visible in milliseconds
  animationTime?: number; // Time for enter/exit animations in milliseconds
  className?: string;
}

interface AnimatedText {
  id: number;
  text: string;
  state: "entering" | "visible" | "exiting" | "exited";
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  words,
  displayTime = 3000,
  animationTime = 1000,
  className = "",
}) => {
  const [visibleTexts, setVisibleTexts] = useState<AnimatedText[]>([]);

  useEffect(() => {
    if (words.length === 0) return;

    // Initial text
    setVisibleTexts([{ id: 0, text: words[0], state: "entering" as const }]);
    let nextIndex = 1;
    let idCounter = 1;

    // After initial text enters, make it visible
    const initialTimeout = setTimeout(() => {
      setVisibleTexts((prev) =>
        prev.map((item) =>
          item.state === "entering"
            ? { ...item, state: "visible" as const }
            : item
        )
      );
    }, animationTime);

    // Main animation interval
    const interval = setInterval(() => {
      // Start exiting the current visible text and add the next text (entering)
      setVisibleTexts((prev) => [
        ...prev.map((item) =>
          item.state === "visible"
            ? { ...item, state: "exiting" as const }
            : item
        ),
        {
          id: idCounter,
          text: words[nextIndex],
          state: "entering" as const,
        },
      ]);

      // After entering/exiting animation completes, update states
      setTimeout(() => {
        setVisibleTexts((prev) =>
          prev.map((item) => {
            if (item.state === "entering") return { ...item, state: "visible" };
            if (item.state === "exiting") return { ...item, state: "exited" };
            return item;
          })
        );
      }, animationTime);

      // Clean up exited texts after they've moved completely out of view
      setTimeout(() => {
        setVisibleTexts((prev) =>
          prev.filter((item) => item.state !== "exited")
        );
      }, animationTime * 2);

      // Update counters
      idCounter++;
      nextIndex = (nextIndex + 1) % words.length;
    }, displayTime);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [words, displayTime, animationTime]);

  // Function to determine the transform value based on state
  const getTransform = (state: string): string => {
    switch (state) {
      case "entering":
        return "translateY(-100%)";
      case "visible":
        return "translateY(0)";
      case "exiting":
        return "translateY(100%)";
      case "exited":
        return "translateY(200%)";
      default:
        return "translateY(0)";
    }
  };

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      {visibleTexts.map((item) => (
        <div
          key={item.id}
          className={`text-3xl lg:text-5xl xl:text-6xl font-bold absolute w-full text-center ${className}`}
          style={{
            transform: getTransform(item.state),
            opacity: item.state === "exited" ? 0 : 1,
            transition: `transform ${animationTime}ms ease-in-out, opacity ${animationTime}ms ease-in-out`,
            willChange: "transform, opacity",
            left: 0,
            right: 0,
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default TextAnimation;
