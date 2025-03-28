import React, { useEffect, useState } from "react";

// Define the props interface for the FilterArray component
interface FilterArrayProps {
  options: string[];
  defaultValues?: string;
  notUpperCases?: boolean;
  names: string;
  labels?: string;
  setSelectedValue?: (value: string) => void;
  defaultWidth?: string;
  requireds?: boolean;
  errs?: boolean;
  setArrayProps?: (arrayProps: any[], option: string) => void;
  arrayProps?: any[];
  dataNames?: string;
}

const FilterArray: React.FC<FilterArrayProps> = ({
  options,
  defaultValues = "",
  notUpperCases = false,
  names,
  labels,
  setSelectedValue,
  defaultWidth,
  requireds,
  errs,
  setArrayProps,
  arrayProps,
  dataNames,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(defaultValues);

  const handleOptionClick = (option: string): void => {
    setSelected(option);
    setSelectedValue && setSelectedValue(option);
    setArrayProps && setArrayProps(arrayProps || [], option);
    setIsActive(false);
  };

  useEffect(() => {
    setSelected(defaultValues);
  }, [defaultValues]);

  return (
    <div 
      className={`ihub-select ${errs ? "ihub-form-err" : ""}`}
      style={{ width: defaultWidth || "300px" }}
      id={`id_${names}`}
    >
      <div className="ihub-select__btn" onClick={() => setIsActive(!isActive)}>
        <div>
          <input
            type="text"
            defaultValue={!notUpperCases ? selected?.toUpperCase() : selected}
            name={names}
            className="ihub-select__input"
            required={requireds}
            data-name={dataNames || names}
          />
          <p>{selected || "..."}</p>
        </div>
        {labels && <label className="ihub-select__label">{labels}</label>}
        <span className="material-symbols-outlined">expand_more</span>
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
  );
};

export default FilterArray;