import React from "react";
import { useState, useEffect } from "react";

// Define component as a Functional Component (FC)
function AnimatedBox() {
  const [animationClass, setAnimationClass] = useState<string>("");

  // Add animation class when the component mounts
  useEffect(() => {
    setAnimationClass("animate");
  }, []);

  return (
    <div
      className={`empty-box ${animationClass}`}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100px",
        backgroundColor: "var(--DarkCyan)",
        borderRadius: "8px",
        opacity: animationClass
          ? 1
          : 0 /* Initially hide, then show when animated */,
        transition: "opacity 0.5s ease-in-out",
      }}
    ></div>
  );
}

export default AnimatedBox;
