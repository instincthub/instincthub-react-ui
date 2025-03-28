import React from "react";

interface TextAreaProps {
  names: string;
  labels: string;
  rows?: number;
  defaultValues?: string;
  placeholder?: string;
  maxLengths?: number | string;
  setValues?: (value: string) => void;
  inputEvent?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const showLabel = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (e.target.value) e.target.parentElement?.classList.add("ihub-value");
    else e.target.parentElement?.classList.remove("ihub-value");
  };
  
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (props.setValues) props.setValues(e.target.value);
    if (props.inputEvent) props.inputEvent(e);
    showLabel(e);
  };
  
  return (
    <div className={props.names}>
      <div className="ihub-field">
        <div className={`ihub-textarea-wrapper ${props.defaultValues ? "ihub-value" : ""}`}>
          <textarea
            name={props.names}
            rows={props.rows}
            defaultValue={props.defaultValues}
            onChange={handleInput}
            placeholder={props.placeholder}
            maxLength={props.maxLengths !== undefined ? Number(props.maxLengths) : undefined}
          ></textarea>
          <span className="ihub-textarea-label">{props.labels}</span>
        </div>
      </div>
    </div>
  );
};

export default TextArea;