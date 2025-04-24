"use client";
import React, { useEffect, useState } from "react";

interface Option {
  name: string;
  [key: string]: any;
}

interface InputSearchDropdownProps {
  options: Option[];
  onOptionSelected: (option: Option) => void;
  defaultValues?: string;
  names?: string;
  disableds?: boolean;
}

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
