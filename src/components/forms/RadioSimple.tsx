import React from "react";

interface RadioSimpleProps {
  ids: string;
  names: string;
  values: string | number;
  labels: string;
  checked?: boolean;
  inputEvent?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 
 * @component
 * @example
 * ```tsx
 * import { RadioSimple } from "@instincthub/react-ui";
 * 
 * <RadioSimple
 *   ids="radio-simple" 
 *   names="radio-simple" 
 *   values="1" 
 *   labels="Radio Simple" 
 *   checked={true} 
 *   inputEvent={(e) => {
 *     console.log(e);
 *   }}
 * />
 * ```
 * Props interface for the RadioSimple component
 * @property {string} ids - ID for the radio input
 * @property {string} names - Name for the radio input    
 * @property {string | number} values - Value for the radio input
 * @property {string} labels - Label for the radio input
 * @property {boolean} checked - Whether the radio input is checked
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} inputEvent - Callback for input events
 */

const RadioSimple: React.FC<RadioSimpleProps> = ({
  ids,
  names,
  values,
  labels,
  checked,
  inputEvent
}) => {
  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputEvent) inputEvent(e);
  };
  
  return (
    <section className="ihub-radio-btn">
      <label htmlFor={ids} className="ihub-radio-label">
        <input
          className="ihub-radio-input"
          type="radio"
          name={names}
          id={ids}
          value={values}
          onChange={handleRadio}
          defaultChecked={checked}
        />
        <span className="ihub-custom-radio" />
        <p className="ihub-p-label">{labels}</p>
      </label>
    </section>
  );
};

export default RadioSimple;