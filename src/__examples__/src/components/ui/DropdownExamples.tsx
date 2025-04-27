"use client";
import React, { useState } from "react";
import { Dropdown } from "../../../../index";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";

// Example custom option renderer
const CustomOption = (option) => (
  <div className="flex items-center">
    {option.icon && <span className="mr-2">{option.icon}</span>}
    <span className="font-medium">{option.label}</span>
    {option.description && (
      <span className="ml-2 text-xs text-gray-500">{option.description}</span>
    )}
  </div>
);

const DropdownExamples = () => {
  // Demo options
  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "mx", label: "Mexico" },
    { value: "uk", label: "United Kingdom" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "jp", label: "Japan" },
    { value: "cn", label: "China" },
    { value: "in", label: "India" },
    { value: "br", label: "Brazil" },
    { value: "au", label: "Australia" },
  ];

  const languages = [
    {
      value: "js",
      label: "JavaScript",
      icon: <CodeOutlinedIcon />,
      description: "Popular",
    },
    {
      value: "ts",
      label: "TypeScript",
      icon: <CodeOutlinedIcon />,
      description: "Typed",
    },
    {
      value: "py",
      label: "Python",
      icon: <CodeOutlinedIcon />,
      description: "Versatile",
    },
    {
      value: "java",
      label: "Java",
      icon: <CodeOutlinedIcon />,
      description: "Enterprise",
    },
    {
      value: "csharp",
      label: "C#",
      icon: <CodeOutlinedIcon />,
      description: ".NET",
    },
    {
      value: "go",
      label: "Go",
      icon: <CodeOutlinedIcon />,
      disabled: true,
      description: "Fast",
    },
  ];

  // State for dropdowns
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Dropdown Component Demo
      </h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Basic Dropdown
          </h2>

          <Dropdown
            options={countries}
            selectedValue={selectedCountry}
            onChange={setSelectedCountry}
            placeholder="Select a country"
          />
          <p className="mt-2 text-sm text-gray-600">
            Selected:{" "}
            {selectedCountry
              ? countries.find((c) => c.value === selectedCountry)?.label
              : "None"}
          </p>

          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Multi-Select with Search
          </h2>

          <Dropdown
            options={countries}
            selectedValue={selectedCountries}
            onChange={setSelectedCountries}
            placeholder="Select countries"
            isMulti
            isSearchable
          />
          <p className="mt-2 text-sm text-gray-600">
            Selected:{" "}
            {selectedCountries.length > 0
              ? countries
                  .filter((c) => selectedCountries.includes(c.value))
                  .map((c) => c.label)
                  .join(", ")
              : "None"}
          </p>

          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Custom Option Rendering
          </h2>
          <div className="max-w-md">
            <Dropdown
              label="Custom Option Rendering"
              name="custom-option-rendering"
              required
              options={languages}
              selectedValue={selectedLanguage}
              onChange={setSelectedLanguage}
              placeholder="Select a language"
              isSearchable
              renderOption={CustomOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownExamples;
