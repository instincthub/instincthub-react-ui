"use client";
import React, { useEffect, useState } from "react";

/**
 * Option interface for dropdown items
 * @interface Option
 * @prop {string} name - The display name of the option
 * @prop {any} [key: string] - Additional properties can be added dynamically
 */
interface Option {
  name: string;
  [key: string]: any;
}

/**
 * Props interface for InputSearchDropdown component
 * @interface InputSearchDropdownProps
 * @prop {Option[]} options - Array of options to display in the dropdown
 * @prop {function} onOptionSelected - Callback function triggered when an option is selected
 * @prop {string} [defaultValues] - Default value for the input field
 * @prop {string} [names] - Name attribute for the input field
 * @prop {boolean} [disableds] - Whether the input should be read-only
 */
interface InputSearchDropdownProps {
  options: Option[];
  onOptionSelected: (option: Option) => void;
  defaultValues?: string;
  names?: string;
  disableds?: boolean;
}

/**
 * A searchable dropdown component that filters options based on exact match of the input value.
 * It displays a dropdown list when the user types and there are matching results.
 * The dropdown auto-hides when an option is selected or the input loses focus.
 * 
 * @example
 * ```tsx
 * const organisations = [
 *   { name: "Company A", id: 1 },
 *   { name: "Company B", id: 2 }
 * ];
 * 
 * <InputSearchDropdown
 *   options={organisations}
 *   onOptionSelected={(option) => console.log(option)}
 *   defaultValues="Company A"
 *   names="organisation"
 * />
 * ```
 * 
 * @component
 * @param {InputSearchDropdownProps} props - The component props
 * @param {Option[]} props.options - Array of options to display in the dropdown
 * @param {function} props.onOptionSelected - Callback function triggered when an option is selected
 * @param {string} [props.defaultValues=""] - Default value for the input field
 * @param {string} [props.names] - Name attribute for the input field
 * @param {boolean} [props.disableds=false] - Whether the input should be read-only
 * @returns {JSX.Element} The rendered dropdown component
 */
const InputSearchDropdown: React.FC<InputSearchDropdownProps> = ({
  options,
  onOptionSelected,
  defaultValues = "",
  names,
  disableds = false,
}) => {
  const [searchTerm, setSearchTerm] = useState(defaultValues);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  /**
   * Handles the search input change event and filters options based on exact match
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredOptions(
      options.filter(
        (option) =>
          option.name.toLowerCase() === value.toLowerCase() &&
          option.name.length === value.length
      )
    );
  };

  useEffect(() => {
    if (searchTerm) {
      setFilteredOptions(
        options.filter(
          (option) =>
            option.name.toLowerCase() === searchTerm.toLowerCase() &&
            option.name.length === searchTerm.length
        )
      );
    }
  }, [searchTerm, options]);

  /**
   * Handles the selection of an option from the dropdown
   * Updates the search term with the selected option's name and closes the dropdown
   * @param {Option} option - The selected option object
   */
  const handleOptionSelected = (option: Option) => {
    setSearchTerm(option.name);
    setFilteredOptions(options);
    setShowDropdown(false);
    onOptionSelected(option);
  };

  return (
    <div className="ihub-react-search-dropdown">
      <h3 className="ihub-react-search-dropdown-title">Search Organisation:</h3>
      <div className="ihub-field">
        <input
          type="text"
          value={searchTerm}
          name={names}
          onChange={handleSearch}
          onFocus={() => filteredOptions.length > 0 && setShowDropdown(true)}
          onBlur={() => setShowDropdown(false)}
          readOnly={disableds}
          className="ihub-input"
        />

        {showDropdown && (
          <ul className="ihub-drop-down-list">
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => handleOptionSelected(option)}>
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InputSearchDropdown;
