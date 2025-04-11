import React from "react";

interface RadioSimpleProps {
  id: string;
  name: string;
  value: string | number;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  note?: string;
}

/**
 *
 * @component
 * @example
 * ```tsx
 * import { RadioSimple } from "@instincthub/react-ui";
 *
 * <RadioSimple
 *   id="radio-simple"
 *   name="radio-simple"
 *   value="1"
 *   label="Radio Simple"
 *   checked={true}
 *   inputEvent={(e) => {
 *     console.log(e);
 *   }}
 * />
 * ```
 * Props interface for the RadioSimple component
 * @property {string} id - ID for the radio input
 * @property {string} name - Name for the radio input
 * @property {string | number} value - Value for the radio input
 * @property {string} label - Label for the radio input
 * @property {boolean} checked - Whether the radio input is checked
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} inputEvent - Callback for input events
 */

const RadioSimple: React.FC<RadioSimpleProps> = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
  note,
}) => {
  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };

  return (
    <section className="ihub-radio-btn">
      <label htmlFor={id} className="ihub-radio-label">
        <input
          className="ihub-radio-input"
          type="radio"
          name={name}
          id={id}
          value={value}
          onChange={handleRadio}
          defaultChecked={checked}
        />
        <span className="ihub-custom-radio" />
        <p className="ihub-p-label">{label}</p>
      </label>
      {note && <p className="ihub-input-notes">{note}</p>}
    </section>
  );
};

export default RadioSimple;
