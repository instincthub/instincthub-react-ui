// Export assets
export { Images } from './assets/images/Images';
export { openConfirmModal, openToast } from './assets/js/modals';
export { default as handleFormErrors } from './assets/js/formError';
export { 
  API_HOST_URL,
  fetchAPI,
  reqOptions,
  setCookie
} from './assets/js/helpFunction';

// Export components
export { default as ActionDropdown } from './components/forms/ActionDropdown';
export { default as TextField } from './components/forms/TextField';
export { default as FilterObjects } from './components/forms/FilterObjects';
export { default as PhoneNumberInput } from './components/forms/PhoneNumberInput';
export { default as DateInput } from './components/forms/DateInput';
export { default as NewSubmitBtn } from './components/forms/NewSubmitBtn';
export { default as FormError } from './components/forms/FormError';
export { default as PasswordField } from './components/forms/PasswordField';

// Import all CSS files
import './assets/css/main.css';
import './assets/css/darkmode.css';
import './assets/css/modals.css';
import './assets/css/material-ui.css';
import './assets/css/tooltip.css';
import './assets/css/react-video-player.css';
import './assets/css/primereact.css';
import './assets/js/modals/modals.css';

// Export types
export * from './types';