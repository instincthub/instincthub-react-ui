/* Base Styles */
import "./assets/css/imports.css";
import "./assets/css/main.css";
import "./assets/css/forms.css";
import "./assets/css/modals.css";
import "./assets/css/tooltip.css";

/* UI Styles */
import "./assets/css/ui/parent-list-styles.css";
import "./assets/css/ui/list-styles.css";
import "./assets/css/ui/editor.css";
import "./assets/css/ui/content-viewer.css";
import "./assets/css/ui/code-display.css";

/* Third-party Framework Styles */
import "./assets/css/material-ui.css";
import "./assets/css/primereact.css";

/* Overrides & Dark Mode: Last to ensure it overrides other styles */
import "./assets/css/darkmode.css";

// Trick Rollup into keeping this file
export const __styles__ = true;
