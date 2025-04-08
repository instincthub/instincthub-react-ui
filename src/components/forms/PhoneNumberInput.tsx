import React, { useState } from "react";

// Define types for country objects
interface CountryObject {
  name: string;
  phonecode: string;
  flag: string;
  [key: string]: any;
}

// Import country objects with proper type
import countryObjects from "../lib/json/countryObjects";

interface PhoneNumberInputProps {
  phoneCode?: string;
  defaultValues: {
    mobile?: string;
    [key: string]: any;
  };
  names?: string;
  inputEvent?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

/**
 * 
 * @component
 * @example
 * ```jsx
 * import { PhoneNumberInput } from "@instincthub/react-ui";
 * 
 * <PhoneNumberInput
 *   phoneCode="234"
 *   defaultValues={{ mobile: "1234567890" }}
 *   names="phoneNumber"
 *   inputEvent={(event) => {
 *     console.log(event);
 *   }}
 * />
 * ```
 * Props interface for the PhoneNumberInput component
 * @property {string} phoneCode - Default country code
 * @property {object} defaultValues - Default values for the input field
 * @property {string} names - Name of the input field
 * @property {(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void} inputEvent - Callback for input events
 */

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = (props) => {
  // Get default country
  const [selectedCountry, setSelectedCountry] = useState<CountryObject>(
    countryObjects.find((c) => c.phonecode === (props.phoneCode || "234")) ||
      countryObjects[0]
  );

  // Get default number
  const [phoneNumber, setPhoneNumber] = useState<string>(
    props.defaultValues.mobile || ""
  );

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryCode = event.target.value;
    const country = countryObjects.find(
      (country) => country.phonecode === selectedCountryCode
    );

    if (country) {
      setSelectedCountry(country);
    }

    if (props.inputEvent) {
      props.inputEvent(event);
    }
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
    if (props.inputEvent) {
      props.inputEvent(event);
    }
  };

  return (
    <div className="ihub-react-phone-input">
      <div className="ihub-target-phone">
        <select
          onChange={handleCountryChange}
          value={selectedCountry.phonecode}
          name="phone_code"
          className="ihub-country-select"
        >
          {countryObjects.map((country, index) => (
            <option key={index} value={country.phonecode}>
              {selectedCountry.phonecode !== country.phonecode ? (
                <span className="ihub-c-name">{country.name} </span>
              ) : (
                ""
              )}
              <span className="ihub-c-flag">{country.flag}</span>{" "}
              <span className="ihub-c-code">+{country.phonecode}</span>
            </option>
          ))}
        </select>

        <input
          type="tel"
          name={props.names}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter phone number"
          maxLength={11}
          className="ihub-phone-input"
        />
      </div>

      <p className="ihub-make-bold">
        +{selectedCountry.phonecode} {phoneNumber}
      </p>
    </div>
  );
};

export default PhoneNumberInput;
