import React from "react";

interface RadioOption {
  id: string | number;
  title?: string;
  name?: string;
}

interface RadioFieldProps {
  options?: RadioOption[];
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string | number;
  setSelectedValue?: (value: string) => void;
  setNameIDValueIndex?: (
    name: string,
    id: string,
    value: string,
    index: number
  ) => void;
  note?: string;
}

/**
 *
 * @component
 * @example
 * ```tsx
 * import { RadioField } from "@instincthub/react-ui";
 *
 * <RadioField
 *   options={[
 *     { id: 1, title: "Option 1" },
 *     { id: 2, title: "Option 2" },
 *     { id: 3, title: "Option 3" },
 *   ]}
 *   names="radioField"
 *   labels="Radio Field"
 *   requireds={true}
 *   defaultValues={1}
 *   setSelectedValue={(value) => {
 *     console.log(value);
 *   }}
 * />
 * ```
 * Props interface for the RadioField component
 * @property {RadioOption[]} options - Array of options for the radio field
 * @property {string} names - Name of the input field
 * @property {string} labels - Label for the radio field
 * @property {boolean} requireds - Whether the field is required
 * @property {string | number} defaultValues - Default value for the radio field
 * @property {(name: string, id: string, value: string, index: number) => void} setNameIDValueIndex - Callback for setting name, id, value, and index
 * @property {(value: string) => void} setSelectedValue - Callback for setting the selected value
 */

const RadioField: React.FC<RadioFieldProps> = (props) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.setSelectedValue) {
      props.setSelectedValue(event.target.value);
    }
    if (props.setNameIDValueIndex) {
      props.setNameIDValueIndex(
        props.name,
        String(event.target.dataset.id),
        event.target.value,
        Number(event.target.dataset.index)
      );
    }
  };

  if (!props.options || props.options.length === 0) {
    return null;
  }

  return (
    <div className={props.name}>
      <h5 className="mt-3">{props.label}</h5>

      <div className="ihub-field">
        <div className="ihub-radio-wrapper">
          {props.options.map((option, index) => {
            return (
              <div className="ihub-radio-parent" key={index}>
                <label className="ihub-radio">
                  <input
                    type="radio"
                    name={props.name}
                    id={props.name + index}
                    data-id={option.id}
                    data-index={index}
                    value={option.id}
                    required={index === 0 ? props.required : false}
                    onChange={handleOptionChange}
                    defaultChecked={props.defaultValue === option.id}
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
      {props.note && <p className="ihub-input-notes">{props.note}</p>}
    </div>
  );
};

export default RadioField;
