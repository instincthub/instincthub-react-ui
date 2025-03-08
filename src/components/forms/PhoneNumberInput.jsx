import countryObjects from "../../assets/json/countryObjects";
import React, { useState } from "react";
import styled from "styled-components";

const PhoneNumberInput = (props) => {
  // Get default country
  const [selectedCountry, setSelectedCountry] = useState(
    countryObjects.find((c) => c.phonecode === (props.phoneCode || "234"))
  );

  // Get default number
  const [phoneNumber, setPhoneNumber] = useState(
    props.defaultValues.mobile || ""
  );

  const handleCountryChange = (event) => {
    const selectedCountryCode = event.target.value;
    const country = countryObjects.find(
      (country) => country.phonecode === selectedCountryCode
    );
    setSelectedCountry(country);
    if (props.inputEvent) {
      props.inputEvent(event);
    }
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    if (props.inputEvent) {
      props.inputEvent(event);
    }
  };

  return (
    <ReactPhoneInput>
      <div className="target_phone">
        <select
          onChange={handleCountryChange}
          value={selectedCountry.phonecode}
          name="phone_code"
        >
          {countryObjects.map((country, index) => (
            <option key={index} value={country.phonecode}>
              {selectedCountry.phonecode !== country.phonecode ? (
                <span className="c_name">{country.name} </span>
              ) : (
                ""
              )}
              <span className="c_flag">{country.flag}</span>{" "}
              <span className="c_code">+{country.phonecode}</span>
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
        />
      </div>

      <p className="makeBold">
         +{selectedCountry.phonecode} {phoneNumber}
      </p>
    </ReactPhoneInput>
  );
};

export default PhoneNumberInput;

const ReactPhoneInput = styled.div`
  margin-top: 30px;
  .makeBold{
	font-weight: 800;
	font-style: italic;
  } .target_phone {
    display: flex;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    select {
      border: 0;
      display: inline-block;
      height: 50px;
      width: 20%;
      padding-left: 5px;
      border-radius: 5px;
    }
    input {
      border: 0;
      border-radius: 5px;
      padding-left: 10px;
    }
  }
`;
