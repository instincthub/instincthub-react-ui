// components/CountryStateInput.tsx
import React, { useEffect, useState } from "react";
import CloseIcon from "../svgs/CloseIcon";
import "./CountryStateInput.css"; // You'll need to create this CSS file separately

// Define the State object interface
interface StateObject {
  isoCode: string;
  name: string;
  countryCode: string;
  [key: string]: any; // For any other properties
}

// Define the Country object interface
interface CountryObject {
  isoCode: string;
  name: string;
  [key: string]: any;
}

// Define the props interface
interface CountryStateInputProps {
  defaultValues?: StateObject;
  names?: string;
  requireds?: boolean;
  ids?: string;
  maxLengths?: number;
  widths?: string;
  disableds?: boolean;
  notes?: string;
  country?: CountryObject;
  setFormData?: React.Dispatch<React.SetStateAction<any>>;
  setValues?: (value: string) => void;
}

const CountryStateInput: React.FC<CountryStateInputProps> = (props) => {
  const [activeState, setActiveState] = useState<StateObject | {}>(
    props.defaultValues || {}
  );
  const [states, setStates] = useState<StateObject[] | {}>({});
  const [inputValue, setInputValue] = useState<string>(
    props.defaultValues?.name || ""
  );
  const [filteredStates, setFilteredStates] = useState<StateObject[]>([]);
  const [inValid, setInValid] = useState<boolean>(
    props.defaultValues?.name ? false : true
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInValid(true);
    const searchValue = event.target.value;
    setInputValue(searchValue);

    // Filter states based on search value
    if (Array.isArray(states)) {
      const filtered = states.filter((state: StateObject) => {
        if (state.name === event.target.value) {
          setInValid(false);
          setActiveState(state);

          // Update state in form data
          props.setFormData &&
            props.setFormData((prevFormData: any) => ({
              ...prevFormData,
              state_objects: state,
            }));
          return false;
        }
        return state.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredStates(filtered);
    }
  };

  const handleClicks = (object: StateObject) => {
    setInputValue(object.name);
    setActiveState(object);
    setInValid(false);
    setFilteredStates([]);

    // Update state in form data
    if (props.setFormData) {
      props.setFormData((prevFormData: any) => ({
        ...prevFormData,
        state_objects: object,
      }));
    }
    if (props.setValues) props.setValues(object.name);
  };

  useEffect(() => {
    // Filter all states belonging to the selected country
    const getStateObj = async () => {
      try {
        const countryStatesObjects = await import(
          "../../assets/json/countryStatesObjects"
        );
        const filteredStates = countryStatesObjects.default.filter(
          (state: StateObject) => state.countryCode === props.country?.isoCode
        );
        if (filteredStates.length === 0) {
          setStates(countryStatesObjects.default);
        } else {
          setStates(filteredStates);
        }

        if (
          (activeState as StateObject).countryCode !== props.country?.isoCode
        ) {
          setInValid(true);
        }
      } catch (error) {
        console.error("Error loading state data:", error);
      }
    };
    getStateObj();
  }, [props.country?.isoCode, activeState]);

  return (
    <div className={`form-input ${props.names}`}>
      <div className="field">
        <div className={`wrapper ${inputValue ? "value" : ""}`}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            name="state"
            required={props.requireds}
            id={props.ids}
            maxLength={props.maxLengths}
            className={props.widths === "auto" ? "width_auto" : ""}
            readOnly={props.disableds ? props.disableds : false}
            style={
              inValid && inputValue
                ? { borderColor: "tomato" }
                : { borderColor: "rgba(44, 51, 58, 0.2)" }
            }
          />
          <span className="text_label">Search state *</span>
        </div>
        {props.notes && <span className="notes">{props.notes}</span>}
      </div>
      {/* Display filtered states */}
      {filteredStates.length > 0 && (
        <ul className="list-items">
          {filteredStates.map((state, index) => (
            <li
              key={state?.isoCode}
              onClick={() => handleClicks(state)}
              className={index < filteredStates.length - 1 ? "bottom_line" : ""}
            >
              {state?.name}
            </li>
          ))}
          <div className="close_icon" onClick={() => setFilteredStates([])}>
            <CloseIcon widths="24" heights="24" />
          </div>
        </ul>
      )}
    </div>
  );
};

export default CountryStateInput;
