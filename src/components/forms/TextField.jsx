"use client";
/*
	<TextField
		// names="school_name"
		names={`school_name`}
		types="text"
		labels="High School Name *"
		requireds={true}
		defaultValues={option?.school_name}
		arrayProps={[index, 'school_name']}
		setArrayProps={handleChange}

	/>
	example of setArrayProps callback
	const handleChange = (propsArray, value) => {
		// Updated record object key based on passed index and name.
		const [recordIndex, name] = propsArray;
		const updatedList = objectsList.map((item, i) => 
			i === recordIndex ? {  ...item, [name]: value } : item
		);
		setObjectsList(updatedList);
	};
*/

import React, { useRef } from "react";
import styled from "styled-components";

// <TextField type="text" name="title" labels="Blog Title" required={true}/>

const TextField = (props) => {
  const inputRef = useRef(null);

  const showLabel = (e) => {
    if (e.target.value) {
      e.target.parentElement.classList.add("value");
    } else e.target.parentElement.classList.remove("value");
  };
  const toLowerCase = () => {
    if (inputRef.current && props.TextTransform === "lowercase") {
      inputRef.current.value = inputRef.current.value.toLowerCase();
    }
  };
  const handleInput = (e) => {
    toLowerCase();
    let inputValue = e.target.value;

    // Ensure no letters if type is tel
    if (props.types === "tel") {
      // Remove all characters that are not digits or the plus sign
      inputValue = inputValue.replace(/[^0-9+]/g, "");

      // Ensure that only one + is allowed, and it must be at the beginning
      if (inputValue.includes("+")) {
        inputValue = "+" + inputValue.replace(/[^0-9]/g, "");
      }

      // Limit the length to 15 characters
      if (inputValue.length > 15) {
        inputValue = inputValue.slice(0, 15);
      }

      e.target.value = inputValue;
    }

    if (props.setValues) props.setValues(inputValue);
    if (props.onChange) props.onChange(e);
    if (props.inputTarget) props.inputTarget(e.target);
    if (props.setNameValue) props.setNameValue(props.names, inputValue);
    if (props.setArrayProps) props.setArrayProps(props.arrayProps, inputValue);
    showLabel(e);
  };
  return (
    <div className={props.names}>
      <div className="field">
        <Wrapper
          className={
            props.defaultValues ||
            props.defaultValues === false ||
            props.actives ||
            props.types === "file"
              ? "value"
              : ""
          }
          TextTransform={props.TextTransform || "none"}
        >
          <input
            ref={inputRef}
            type={props.types}
            name={props.names}
            required={props.requireds}
            defaultValue={props.defaultValues}
            id={props.ids}
            maxLength={props.maxLengths}
            onChange={handleInput}
            onLoad={showLabel}
            className={props.widths === "auto" ? "width_auto" : ""}
            readOnly={props.disableds ? props.disableds : false}
          />
          <span className="text_label">{props.labels}</span>
        </Wrapper>
        {props.notes && <Notes>{props.notes}</Notes>}
      </div>
    </div>
  );
};

export default TextField;

const Wrapper = styled.div`
  position: relative;
  margin-top: 25px;

  span {
    position: absolute;
    top: 13px;
    left: 15px;
    transition: all 0.3s ease;
    pointer-events: none;
    font-size: 16px;
    color: var(--Gunmetal);
    font-family: var(--Nunito);
  }
  input {
    border: var(--borderDefault);
    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
      font-family: var(--Nunito);
    }

    /* Firefox */
    &[type="number"] {
      -moz-appearance: textfield;
    }

    :disabled,
    :readonly {
      background: #f4f4f4;
    }
    text-transform: ${(props) => props.TextTransform};
  }
  input:focus + span,
  &.value span {
    background: var(--White);
    top: -10px;
    height: 20px;
    padding: 5px;
    margin: 0;
    color: var(--DarkCyan);
    font-size: 14px;
    pointer-events: initial;
    left: 15px;
    line-height: 10px;
    width: auto;
    font-family: var(--Nunito);
  }
  input.width_auto {
    width: auto;
  }
`;

const Notes = styled.p`
  font-size: 12px;
`;
