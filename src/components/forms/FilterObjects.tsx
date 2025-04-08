import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setCookie } from "../lib/helpFunction";
import { FilterObjectsType } from "src/types";
import ContentViewer from "../ui/viewer/ContentViewer";

interface FilterObjectsProps {
  options: FilterObjectsType[];
  defaultValues?: FilterObjectsType | string | number;
  names: string;
  labels?: string;
  notes?: string;
  setSelectedValues?: (name: string, value: FilterObjectsType) => void;
  defaultWidth?: string;
  requireds?: boolean;
  errs?: boolean;
  setArrayProps?: (arrayProps: any[], option: FilterObjectsType) => void;
  arrayProps?: any[];
  dataNames?: string;
  setCookies?: string;
  setObjects?: (option: FilterObjectsType) => void;
  status?: number;
  upperCases?: boolean;
}

/**
 * FilterOnject dropdown
 * @component
 * @example
 * ```tsx
 *
 * <FilterObjects
 *   options={[
 *     { id: 1, title: "Option 1" },
 *     { id: 2, title: "Option 2" },
 *     { id: 3, title: "Option 3" },
 *   ]}
 *   defaultValues={1}
 *   names="filterObjects"
 *   labels="Filter Objects"
 *   setSelectedValues={setSelectedValues}
 *   setObjects={setObjects}
 *   setArrayProps={setArrayProps}
 *   arrayProps={arrayProps}
 *   dataNames="filterObjects"
 *   setCookies="filterObjects" // Optional
 * />
 * ```
 * Props interface for the FilterObjects component
 * @property {FilterObjectsType[]} options - Array of objects to filter
 * @property {string} defaultValues - Default value for the dropdown
 * @property {string} names - Name of the input field
 * @property {string} labels - Label for the dropdown
 * @property {(option: FilterObjectsType) => void} setSelectedValues - Callback for setting selected values
 * @property {(option: FilterObjectsType) => void} setObjects - Callback for setting objects
 * @property {any[]} arrayProps - Array of objects to set
 * @property {string} dataNames - Name of the data
 * @property {string} setCookies - Cookie name to set
 */

const FilterObjects: React.FC<FilterObjectsProps> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Choose...");
  const [objects, setObjects] = useState<FilterObjectsType[]>([]);
  const [id, setID] = useState<string | number>("");

  useEffect(() => {
    /* 
        Objects throws error when you loop with map or forEach.
        Solution: convert objects list to array.
    */
    let obj: FilterObjectsType[] = [];
    for (const i in props.options) {
      if (props.options[i].id === props.defaultValues) {
        setSelected(props.options[i].title);
        setID(props.options[i].id);
      }
      obj.push(props.options[i]);
    }
    setObjects(obj);
  }, [props.options, props.defaultValues]);

  useEffect(() => {
    // Update default ID and Selected states
    if (typeof props.defaultValues === "object" && props.defaultValues?.id) {
      // If objects was passed as a props
      setSelected(props.defaultValues.title);
      setID(props.defaultValues.id);
    } else if (props.defaultValues) {
      // If ID was passed as a props
      const obj = props.options.find((i) => i.id === props.defaultValues);
      if (obj?.id) {
        setSelected(obj.title);
        setID(obj.id);
      }
    } else {
      // if none default values
      setSelected("Choose...");
      setID("");
    }
  }, [props.defaultValues, props.options]);

  const handleOptionClick = (
    option: FilterObjectsType,
    title: string
  ): void => {
    setSelected(title);
    setID(option.id);
    setIsActive(false);
    props.setSelectedValues && props.setSelectedValues(props.names, option);
    props.setObjects && props.setObjects(option);
    props.setArrayProps && props.setArrayProps(props.arrayProps || [], option);
    if (props.setCookies) {
      setCookie(props.setCookies, JSON.stringify(option), 365);
    }
  };

  return (
    <>
      <div
        className={`ihub-select ${props.errs ? "ihub-form-err" : ""}`}
        style={{ width: props.defaultWidth || "300px" }}
      >
        <div
          className="ihub-select__btn"
          onClick={() => props.status !== 0 && setIsActive(!isActive)}
        >
          <div className={props.status === 0 ? "disabled" : ""}>
            <input
              type="text"
              className="ihub-select__input"
              value={props.upperCases ? String(id).toUpperCase() : id || ""}
              id={"id_" + props.names}
              name={props.names}
              required={props.requireds}
              data-name={props.dataNames || props.names}
              readOnly
            />
            <ContentViewer content={selected || "..."} showToolbar={false} />
          </div>
          {props.labels && (
            <label className="ihub-select__label">{props.labels}</label>
          )}

          <div className="search_btn">
            {props.status === 0 ? (
              <div className="ihub-select__loader"></div>
            ) : (
              <ExpandMoreIcon />
            )}
          </div>
        </div>
        {isActive && (
          <div className="ihub-select__content">
            {objects.map((option, index) => (
              <div
                className="ihub-select__item"
                onClick={() => handleOptionClick(option, option.title)}
                key={index}
              >
                {option.title}
              </div>
            ))}
          </div>
        )}
      </div>
      {props.notes && <p className="ihub-input-notes">{props.notes}</p>}
    </>
  );
};

export default FilterObjects;
