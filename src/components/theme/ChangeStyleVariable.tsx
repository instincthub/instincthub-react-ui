import { useEffect, useState, FC } from "react";
import LoadingAnimate from "./LoadingAnimate";

interface ThemeChangerProps {
  primaryColor?: string;
  variables?: Record<string, string>;
  onComplete?: () => void;
}

/**
 * Changes CSS variables in the document root based on provided colors
 */
const ThemeChanger: FC<ThemeChangerProps> = ({
  primaryColor,
  variables = {},
  onComplete,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get the root element
    const root = document.querySelector(":root") as HTMLElement;

    if (!root) {
      console.error("Root element not found");
      return;
    }

    // Set the primary color variable
    if (primaryColor) {
      root.style.setProperty("--DarkCyan", primaryColor);
    }

    // Set any additional variables passed in
    Object.entries(variables).forEach(([name, value]) => {
      root.style.setProperty(`--${name}`, value);
    });

    // Mark as complete
    setIsLoading(false);

    // Notify parent component if needed
    onComplete?.();
  }, [primaryColor, variables, onComplete]);

  // Only render loading animation when loading
  return isLoading ? <LoadingAnimate /> : null;
};

export default ThemeChanger;
