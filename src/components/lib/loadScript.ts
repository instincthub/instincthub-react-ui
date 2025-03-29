/**
 * Dynamically loads an external JavaScript file
 * @param scriptSrc - URL of the script to load
 * @returns The script element or false if no source provided
 */
const loadScript = (scriptSrc: string): HTMLScriptElement | false => {
  // If no src return false
  if (!scriptSrc) return false;

  // Check if the script already exists in the DOM
  let script = document.querySelector(`script[src="${scriptSrc}"]`) as HTMLScriptElement | null;
  if (script) {
    return script;
  }

  // If the script does not exist, create and load it
  script = document.createElement("script");
  script.src = scriptSrc;
  script.async = true;

  script.onerror = () => {
    console.error("Failed to load the script: ", scriptSrc);
    return false;
  };

  document.body.appendChild(script);

  return script;
};

export default loadScript;