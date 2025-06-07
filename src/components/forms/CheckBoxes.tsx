"use client";

import React, { useEffect, useState } from "react";

// Define interface for the option object
interface Option {
  id: string | number;
  title: string;
  status?: boolean;
  [key: string]: any;
}

// Define props interface
interface CheckBoxesProps {
  objects: Record<string, Option> | Option[];
  label: string;
  name: string;
  key_name?: string;
  selected: Option[];
  setSelected: (
    selected: Option[]
  ) => void | React.Dispatch<React.SetStateAction<Option[]>>;
}

/**
 * CheckBoxes component for rendering multiple checkbox inputs
 * @param {CheckBoxesProps} props - The component props
 * @param {Record<string, Option> | Option[]} props.objects - The objects to display in the checkboxes
 * @param {string} props.label - The label for the checkboxes
 * @param {string} props.name - The name of the checkboxes
 * @param {string} props.key_name - The key name to use for display text (optional, defaults to 'title')
 * @param {(selected: Option[]) => void | React.Dispatch<React.SetStateAction<Option[]>>} props.setSelected - The function to set the selected options
 * @param {(string | number)[]} props.defaultIDs - The default IDs of the checkboxes to be checked
 *
 * @example
 * ```tsx
 * <CheckBoxes
 *   objects={[
 *     { id: 1, title: "Option 1" },
 *     { id: 2, title: "Option 2" },
 *     { id: 3, title: "Option 3" },
 *   ]}
 *   label="Select Options"
 *   name="options"
 *   key_name="title"
 *   defaultIDs={[1, 2]}
 * />
 * ```
 */
function CheckBoxes(props: CheckBoxesProps) {
  const [objects, setObjects] = useState<Option[]>([]);

  /**
   * Converts objects to array format and filters out null/undefined values
   * @param objectsInput - Input objects (either array or object)
   * @returns Array of valid Option objects
   */
  const processObjects = (
    objectsInput: Record<string, Option> | Option[]
  ): Option[] => {
    if (Array.isArray(objectsInput)) {
      // Filter out null/undefined values and ensure each item has an id
      return objectsInput.filter(
        (item): item is Option =>
          item != null &&
          typeof item === "object" &&
          item.id !== undefined &&
          item.id !== null
      );
    } else {
      // Convert object to array and filter out null/undefined values
      const arrayFromObject: Option[] = [];
      for (const key in objectsInput) {
        const item = objectsInput[key];
        if (
          item != null &&
          typeof item === "object" &&
          item.id !== undefined &&
          item.id !== null
        ) {
          arrayFromObject.push(item);
        }
      }
      return arrayFromObject;
    }
  };

  const handleCheckboxChange = (option: Option, isChecked: boolean) => {
    // Update state based on controlled/uncontrolled mode
    if (props.setSelected && Array.isArray(props.selected)) {
      // Update selected state
      const newSelected =
        isChecked && !props.selected.find((i) => i.id === option.id)
          ? [...props.selected, option]
          : !isChecked && props.selected.find((i) => i.id === option.id)
          ? props.selected.filter((obj) => obj.id !== option.id)
          : props.selected;
      props.setSelected(newSelected);
    }
  };

  useEffect(() => {
    const processedObjects = processObjects(props.objects || []);
    setObjects(processedObjects);
  }, [props.objects]);

  /**
   * Gets the display text for an option
   * @param option - The option object
   * @returns The display text
   */
  const getDisplayText = (option: Option): string => {
    if (props.key_name && option[props.key_name]) {
      return String(option[props.key_name]);
    }
    return option.title || String(option.id);
  };

  /**
   * Checks if an option should be checked by default
   * @param optionId - The option ID to check
   * @returns Whether the option should be checked
   */
  const isDefaultChecked = (optionId: string | number): boolean => {
    if (!Array.isArray(props.selected)) {
      return false;
    }
    return props.selected.some((i) => String(i.id) === String(optionId));
  };

  // Early return if no valid objects
  if (!objects || objects.length === 0) {
    return (
      <section className="ihub-checkbox-section">
        <h3 className="ihub-checkbox-label">{props.label}</h3>
        <div className="ihub-checkbox-wrapper">
          <p className="ihub-no-options">No options available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="ihub-checkbox-section">
      <h3 className="ihub-checkbox-label">{props.label}</h3>
      <div className="ihub-checkbox-wrapper">
        {objects.map((option) => {
          // Additional safety check within map
          if (!option || option.id === undefined || option.id === null) {
            return null;
          }

          const optionId = String(option.id);
          const displayText = getDisplayText(option);

          return (
            <div className="ihub-checkbox-item" key={optionId}>
              <label htmlFor={`id_${optionId}`} className="label-cbx">
                <input
                  name={props.name}
                  id={`id_${optionId}`}
                  type="checkbox"
                  className="invisible"
                  data-id={optionId}
                  defaultValue={optionId}
                  checked={isDefaultChecked(option.id)}
                  onChange={(e) =>
                    handleCheckboxChange(option, e.target.checked)
                  }
                  hidden
                />
                <div className="checkbox">
                  <svg width="20px" height="20px" viewBox="0 0 20 20">
                    <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                    <polyline points="4 11 8 15 16 6"></polyline>
                  </svg>
                </div>
                <span>{displayText}</span>
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CheckBoxes;
