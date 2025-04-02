import React from "react";

interface RadioOption {
  id: string | number;
  title?: string;
  name?: string;
}

interface RadioFieldProps {
  options?: RadioOption[];
  names: string;
  labels: string;
  requireds?: boolean;
  defaultValues?: string | number;
  setSelectedValue?: (value: string) => void;
}

const RadioField: React.FC<RadioFieldProps> = (props) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.setSelectedValue) {
      props.setSelectedValue(event.target.value);
    }
  };

  if (!props.options || props.options.length === 0) {
    return null;
  }

  return (
    <div className={props.names}>
      <h5 className="mt-3">{props.labels}</h5>

      <div className="ihub-field">
        <div className="ihub-radio-wrapper">
          {props.options.map((option, index) => {
            return (
              <div className="ihub-radio-parent" key={index}>
                <label className="ihub-radio">
                  <input
                    type="radio"
                    name={props.names}
                    id={props.names + index}
                    value={option.id}
                    required={index === 0 ? props.requireds : false}
                    onChange={handleOptionChange}
                    defaultChecked={
                      props.defaultValues === option.id
                    }
                  />
                  <span className="ihub-label-title">
                    {option.title ? option.title : option.name}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RadioField;