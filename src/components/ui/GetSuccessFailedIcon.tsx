import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

/**
 * GetSuccessFailedIcon - A simple icon component that displays success or error icons based on a boolean value
 * 
 * @deprecated This component is deprecated. Please use the more flexible `StatusIcon` component instead,
 * which offers multiple status types, customization options, and better accessibility features.
 * 
 * @param success - Boolean value determining which icon to display
 * @returns JSX element containing either a success (CheckCircle) or error (Cancel) icon
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const successIcon = GetSuccessFailedIcon(true);   // Shows green check circle
 * const errorIcon = GetSuccessFailedIcon(false);    // Shows red cancel icon
 * 
 * // In a component
 * function StatusIndicator({ isValid }: { isValid: boolean }) {
 *   return (
 *     <div>
 *       Status: {GetSuccessFailedIcon(isValid)}
 *     </div>
 *   );
 * }
 * 
 * // Migration to StatusIcon (recommended)
 * import { StatusIcon } from '@instincthub/react-ui';
 * <StatusIcon status={success ? "success" : "error"} size="small" />
 * ```
 * 
 * @remarks
 * - Success icon: Green CheckCircleIcon with classes "text-green-600 ihub-text-success"
 * - Error icon: Red CancelIcon with classes "text-red-600 ihub-text-danger"
 * - Both icons use fontSize="small"
 * - No customization options available (use StatusIcon for customization)
 * 
 * @see {@link StatusIcon} - Modern replacement with more features
 */
const GetSuccessFailedIcon = (success: boolean): JSX.Element => {
  return success ? (
    <CheckCircleIcon
      className="text-green-600 ihub-text-success"
      fontSize="small"
    />
  ) : (
    <CancelIcon className="text-red-600 ihub-text-danger" fontSize="small" />
  );
};

export default GetSuccessFailedIcon;
