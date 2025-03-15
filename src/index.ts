/* Base Styles */
import "./assets/css/main.css";
import "./assets/css/forms.css";
import "./assets/css/modals.css";
import "./assets/css/tooltip.css";

/* UI Styles */
import "./assets/css/ui/parent-list-styles.css";
import "./assets/css/ui/list-styles.css";

/* Third-party Framework Styles */
import "./assets/css/material-ui.css";
import "./assets/css/primereact.css";

/* Overrides & Dark Mode: Last to ensure it overrides other styles */
import "./assets/css/darkmode.css";

// Export components
import ActionDropdown from "./components/forms/ActionDropdown";
import AnimatedBox from "./components/forms/AnimatedBox";
import TextField from "./components/forms/TextField";
// import FilterObjects from "./components/forms/FilterObjects";
// import PhoneNumberInput from "./components/forms/PhoneNumberInput";
// import DateInput from "./components/forms/DateInput";
import SubmitBtn from "./components/forms/SubmitBtn";
// import FormError from "./components/forms/FormError";
// import PasswordField from "./components/forms/PasswordField";

// UI
import CustomTextEditor from "./components/ui/editor/CustomTextEditor";
import ContentViewer from "./components/ui/viewer/ContentViewer";
import ContentViewOrEdit from "./components/ui/viewer/ContentViewOrEdit";

// import { Images } from "./assets/images/Images";
// import { openConfirmModal, openToast } from "./assets/js/modals";
// import handleFormErrors from "./assets/js/formError";
// import {
//   API_HOST_URL,
//   fetchAPI,
//   reqOptions,
//   setCookie,
// } from "./assets/js/helpFunction";

export {
  // Forms
  ActionDropdown,
  AnimatedBox,
  TextField,
  // FilterObjects,
  // PhoneNumberInput,
  // DateInput,
  SubmitBtn,
  // FormError,
  // PasswordField,

  // UI
  CustomTextEditor,
  ContentViewer,
  ContentViewOrEdit,

  // Utils
  // Images,
  // openConfirmModal,
  // openToast,
  // handleFormErrors,
  // API_HOST_URL,
  // fetchAPI,
  // reqOptions,
  // setCookie,
};

// export default components;
// export { components };
