import React, { useState } from "react";
import countryObjects from "../lib/json/countryObjects";
import CloseIcon from "@mui/icons-material/Close";

// Define country object interface
interface CountryObject {
  isoCode: string;
  name: string;
  [key: string]: any; // For other potential properties
}

// Define props interface
interface CountryInputProps {
  defaultValues?: CountryObject;
  names?: string;
  requireds?: boolean;
  ids?: string;
  maxLengths?: number;
  widths?: string;
  disableds?: boolean;
  notes?: string;
  setFormData?: React.Dispatch<React.SetStateAction<any>>;
  setValues?: (value: string) => void;
}

const CountryInput: React.FC<CountryInputProps> = (props) => {
  const [activeCountry, setActiveCountry] = useState<CountryObject | {}>(
    props.defaultValues || {}
  );
  const [inputValue, setInputValue] = useState<string>(
    props.defaultValues?.name || ""
  );
  const [filteredCountries, setFilteredCountries] = useState<CountryObject[]>(
    []
  );
  const [inValid, setInValid] = useState<boolean>(
    props.defaultValues?.name ? false : true
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInValid(true);
    const searchValue = event.target.value;

    setInputValue(searchValue);

    // Set country state to null
    if (props.setFormData) {
      props.setFormData((prevFormData: any) => ({
        ...prevFormData,
        country_objects: "",
      }));
    }

    // Filter countries based on search value
    const filtered = countryObjects.filter((country: CountryObject) => {
      if (country.name === event.target.value) {
        setInValid(false);
        setActiveCountry(country);

        // Update country state.
        if (props.setFormData) {
          props.setFormData((prevFormData: any) => ({
            ...prevFormData,
            country_objects: country,
          }));
        }
        return false;
      }
      return country.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredCountries(filtered);
  };

  const handleClicks = (object: CountryObject) => {
    setInputValue(object.name);
    setActiveCountry(object);
    setInValid(false);
    setFilteredCountries([]);

    // Update formData state
    if (props.setFormData) {
      props.setFormData((prevFormData: any) => ({
        ...prevFormData,
        country_objects: object,
      }));
    }
    if (props.setValues) props.setValues(object.name);
  };

  return (
    <>
      <div className={`form-input ${props.names}`}>
        <div className="field">
          <div className={`wrapper ${inputValue ? "value" : ""}`}>
            <input
              type="text"
              value={inputValue}
              name="country"
              onChange={handleInputChange}
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
            <span className="text_label">Search country</span>
          </div>
          {props.notes && <span className="notes">{props.notes}</span>}
        </div>
        {/* Display filtered countries */}
        {filteredCountries.length > 0 && (
          <ul className="list-items">
            {filteredCountries.map((country, index) => (
              <li
                key={country.isoCode}
                onClick={() => handleClicks(country)}
                className={
                  index < filteredCountries.length - 1 ? "bottom_line" : ""
                }
              >
                {country.name}
              </li>
            ))}
            <div
              className="close_icon"
              onClick={() => setFilteredCountries([])}
            >
              <CloseIcon width="24" height="24" />
            </div>
          </ul>
        )}
      </div>
    </>
  );
};

export default CountryInput;
