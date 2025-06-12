"use client";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Define the props interface for the FilterArray component
interface FilterArrayProps {
  options: string[] | [];
  defaultValue?: string;
  notUpperCase?: boolean;
  name: string;
  label?: string;
  setValue?: (value: string) => void;
  setNameValue?: (name: string | null, value: string) => void;
  defaultWidth?: string;
  required?: boolean;
  err?: boolean;
  setArrayProps?: (arrayProps: any[], option: string) => void;
  arrayProps?: any[];
  dataName?: string;
  notes?: string | null;
  error?: string;
}

/**
 * FilterArray component
 * @example
 * ```tsx
 * <FilterArray
 *   options={["Option 1", "Option 2", "Option 3"]}
 *   names="selectName"
 *   label="Select Label"
 * />
 * @param {FilterArrayProps} props - The component props
 * @param {string[]} props.options - The options to display in the dropdown
 * @param {string} props.defaultValue - The default value of the dropdown
 * @param {boolean} props.notUpperCase - Whether to convert the selected value to uppercase
 * @param {string} props.name - The name of the dropdown
 * @param {string} props.label - The label of the dropdown
 * @param {string} props.notes - The notes of the dropdown
 * @param {(value: string) => void} props.setValue - The callback function to set the selected value
 * @param {(name: string | null, value: string) => void} props.setNameValue - The callback function to set the name and value
 * @param {any[]} props.arrayProps - The array of props to set
 * @param {string} props.dataName - The name of the data
 * @param {string} props.defaultWidth - The default width of the dropdown
 * @param {boolean} props.required - Whether the dropdown is required
 * @param {boolean} props.err - Whether the dropdown has an error
 * @param {(arrayProps: any[], option: string) => void} props.setArrayProps - The callback function to set the array props
 * @param {string} props.error - The error message to display
 * @returns {React.ReactElement} The FilterArray component
 */
const FilterArray: React.FC<FilterArrayProps> = ({
  options,
  defaultValue = "",
  notUpperCase = false,
  name,
  label,
  setValue,
  setNameValue,
  defaultWidth,
  required,
  err,
  setArrayProps,
  arrayProps,
  dataName,
  notes,
  error,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>();

  const handleOptionClick = (option: string): void => {
    setSelected(option);
    setValue && setValue(option);
    setNameValue && setNameValue(name, option);
    setArrayProps && setArrayProps(arrayProps || [], option);
    setIsActive(false);
  };

  useEffect(() => {
    setSelected(defaultValue);
  }, []);

  return (
    <div>
      <div
        className={`ihub-select ${err ? "ihub-form-err" : ""}`}
        style={{ width: defaultWidth || "300px" }}
        id={`id_${name}`}
      >
        <div
          className="ihub-select__btn"
          onClick={() => setIsActive(!isActive)}
        >
          <div>
            <input
              type="text"
              defaultValue={!notUpperCase ? selected?.toUpperCase() : selected}
              name={name}
              className="ihub-select__input"
              required={required}
              data-name={dataName || name}
            />
            <p>{selected || "..."}</p>
          </div>
          {label && <label className="ihub-select__label">{label}</label>}
          <ExpandMoreIcon />
        </div>
        {isActive && (
          <div className="ihub-select__content">
            {options.map((option) => (
              <div
                key={option}
                className="ihub-select__item"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      {notes && <p className="ihub-input-notes">{notes}</p>}
      {error && <span className="ihub-error-text">{error}</span>}
    </div>
  );
};

export default FilterArray;
