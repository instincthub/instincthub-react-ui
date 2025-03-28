/*
import loadScript from "./loadScript";
// Load paystack script
	const script = loadScript("https://js.paystack.co/v1/inline.js");
	script.onload = () => {
		// Your code here

	}

*/

const loadScript = (scriptSrc) => {
  // If no src return false
  if (!scriptSrc) return false;

  // Check if the script already exists in the DOM
  let script = document.querySelector(`script[src="${scriptSrc}"]`);
  if (document.querySelector(`script[src="${scriptSrc}"]`)) {
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

  // script.onload = () => {};
  return script;
};

export default loadScript;
