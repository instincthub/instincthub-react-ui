"use client";
import React, { useState } from "react";

interface FilterByProps {
  selected: string;
  setSelected: (value: string) => void;
}

const FilterBy: React.FC<FilterByProps> = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const options = ["Last 7days", "Last 14 days", "This month", "Last Month"];

  return (
    <div className="select_me">
      <div className="select-btn" onClick={() => setIsActive(!isActive)}>
        <input
          type="text"
          defaultValue={selected}
          readOnly
          className="input_drop"
          onChange={() => {}}
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isActive && (
        <div className="select_content">
          {options.map((option) => (
            <div
              key={option}
              className="select_items"
              onClick={() => {
                setSelected(option);
                setIsActive(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBy;
