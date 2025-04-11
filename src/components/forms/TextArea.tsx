import React from "react";

interface TextAreaProps {
  name: string;
  label: string;
  rows?: number;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number | string;
  note?: string;
  setValue?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

/**
 * TextArea component
 * @example
 * ```tsx
 * <TextArea
 *   name="textArea"
 *   label="Text Area"
 *   rows={10}
 *   defaultValue="Default value"
 * />
 * ```
 * Props interface for the TextArea component
 * @property {string} name - The name of the TextArea
 * @property {string} label - The label of the TextArea
 * @property {number} rows - The number of rows of the TextArea
 * @property {string} defaultValue - The default value of the TextArea
 * @property {string} placeholder - The placeholder of the TextArea
 * @property {number | string} maxLength - The max length of the TextArea
 * @property {string} note - The note of the TextArea
 * @property {(value: string) => void} setValue - The function to set the value of the TextArea
 * @property {(e: React.ChangeEvent<HTMLTextAreaElement>) => void} onChange - The function to handle the change of the TextArea
 * @returns {React.ReactElement} The TextArea component
 */
const TextArea: React.FC<TextAreaProps> = (props) => {
  const showLabel = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (e.target.value) e.target.parentElement?.classList.add("ihub-value");
    else e.target.parentElement?.classList.remove("ihub-value");
  };
  
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (props.setValue) props.setValue(e.target.value);
    if (props.onChange) props.onChange(e);
    showLabel(e);
  };
  
  return (
    <div className={props.name}>
      <div className="ihub-field">
        <div className={`ihub-textarea-wrapper ${props.defaultValue ? "ihub-value" : ""}`}>
          <textarea
            name={props.name}
            rows={props.rows}
            defaultValue={props.defaultValue}
            onChange={handleInput}
            placeholder={props.placeholder}
            maxLength={props.maxLength !== undefined ? Number(props.maxLength) : undefined}
          ></textarea>
          <span className="ihub-textarea-label">{props.label}</span>
        </div>
      </div>
      {props.note && <p className="ihub-input-notes">{props.note}</p>}
    </div>
  );
};

export default TextArea;