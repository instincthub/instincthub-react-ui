# Add Add JSDoc to Component

Add JSDoc to props or function params. This particular block is used to document a function, describing what it does, its parameters, and what it returns:

````tsx
/**
 * This component is a custom input field that allows users to enter a number with commas as thousands separators.
 * It also allows for optional plain display mode, where the value is displayed without formatting.
 * The component handles both comma-formatted and raw number inputs.
 * @example
 * ```tsx
 * <InputAmount
 *  label="Amount"
 *  value={amount}
 *  onChange={handleChange}
 * />
 * ```
 * @prop {string} label - The label of the input field.
 * @prop {number | string} value - The value of the input field.
 * @prop {function} onChange - The function to call when the input value changes.
 * @prop {boolean} plainDisplay - Whether to display the input value without formatting.
 */

const InputAmount: React.FC<InputAmountProps> = ({
  label,
  value,
  onChange,
  plainDisplay,
}) => {
  return <></>;
};
````
