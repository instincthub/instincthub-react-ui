import React from "react";

interface RadioSimpleProps {
  ids: string;
  names: string;
  values: string | number;
  labels: string;
  checked?: boolean;
  inputEvent?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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