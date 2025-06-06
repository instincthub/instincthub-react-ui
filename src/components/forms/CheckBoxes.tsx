"use client";

import React, { useEffect, useState } from "react";

// Define interface for the option object
interface Option {
  id: string | number;
  title?: string;
  status?: boolean;
  [key: string]: any;
}

// Define props interface
interface CheckBoxesProps {
  objects: Record<string, Option> | Option[];
  label: string;
  name: string;
  key_name?: string;
  defaultIDs?: string[] | number[];
}

/**
 * CheckBoxes component
 * @example
 * ```tsx
 * <CheckBoxes
 *   objects={[
 *     { id: 1, title: "Option 1" },
 *     { id: 2, title: "Option 2" },
 *     { id: 3, title: "Option 3" },
 *   ]}
 *   label="Select Label"
 *   name="selectName"
 *   key_name="id"
 *   defaultIDs={[1, 2]}
 * />
 * @param {CheckBoxesProps} props - The component props
 * @param {Record<string, Option> | Option[]} props.objects - The objects to display in the checkboxes
 * @param {string} props.label - The label for the checkboxes
 * @param {string} props.name - The name of the checkboxes
 * @param {string} props.key_name - The key name of the checkboxes (description, name key, etc)
 * @param {string[]} props.defaultIDs - The default IDs of the checkboxes
 */ 


function CheckBoxes(props: CheckBoxesProps) {
  const [objects, setObjects] = useState<Option[]>([]);

  /*
   * Objects throws error when you loop with map or forEach.
   * Solution: convert to array.
   */
  useEffect(() => {
    // Objects to array
    if (!Array.isArray(props.objects)) {
      let obj: Option[] = [];
      for (const i in props.objects) obj.push(props.objects[i]);
      setObjects(obj);
    } else {
      setObjects(props.objects || []);
    }
  }, [props.objects]);

  if (objects) {
    return (
      <section
        className="manipulateCheckboxes"
        style={{
          margin: "30px 0px",
        }}
      >
        <h3 style={{ fontSize: "1em", marginBottom: "0px" }}>{props.label}</h3>
        <div
          className="checkbox_wrapper"
          style={{
            maxHeight: "200px",
            overflow: "scroll",
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {objects.map((option) => {
            return (
              <div className="cntr" key={option.id}>
                <label htmlFor={`id_${option.id}`} className="label-cbx">
                  <input
                    name={props.name}
                    id={`id_${option.id}`}
                    type="checkbox"
                    className="invisible"
                    data-id={option.id}
                    defaultValue={String(option.id)}
                    defaultChecked={
                      props.defaultIDs
                        ? !!props.defaultIDs.find((id) => id === option.id)
                        : false
                    }
                    hidden
                  />
                  <div className="checkbox">
                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                      <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                      <polyline points="4 11 8 15 16 6"></polyline>
                    </svg>
                  </div>
                  <span>
                    {props.key_name
                      ? option[props.key_name as keyof Option]
                      : option?.title}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return null;
}

export default CheckBoxes;
