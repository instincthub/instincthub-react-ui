/*
	1. If you need to manually retrieve event data, you can pass `arrayProps` as an argument 
	and use the `setArrayProps` callback. This callback will return both the `arrayProps` 
	and the selected value, allowing you to handle the event data as needed: 
	setArrayProps(arrayProps, option); (this feauture is mostly required for dropdowns)

	You can can have the following function to handle the changes.

	// Function to handle changes in a specific subject/grade within a list of objects
	const handleSubjectChange = (propsArray, value) => {
		// Destructure the propsArray to extract the index of the record, the index of the subject, and the property name ('subject')
		const [recordIndex, subIndex, name] = propsArray;

		// Create a copy of the objectsList (assuming objectsList is a state variable containing the list of records)
		const updatedSubjects = objectsList;

		// Retrieve the specific subject object that needs to be updated based on the provided indices
		const subject = updatedSubjects[recordIndex].subjects[subIndex];

		// Create a new subject object with the updated value for the specified property
		const newSubject = { ...subject, [name]: value };

		// Replace the old subject object with the new updated subject object in the list
		updatedSubjects[recordIndex].subjects[subIndex] = newSubject;

		// Update the state with the new list of objects that includes the modified subject
		setObjectsList(updatedSubjects);
	};

	2. To handle Error 
	a. Add the onInvalid event to the form tag. 
	<form 
		onSubmit={handleSubmit} 
		className={styles.learn_teach} 
		onInvalid={(e)=>handleInvalid(e, formError, setFormError)}
	></form>
	b. Ensure you declare the formError state.
	const [formError, setFormError] = useState([])




	<FilterArray 
		names={`subject`}
		labels={`Subject ${subIndex+1}`}
		options={SUBJECT_CHOICES}
		defaultValues={sub.subject}
		defaultWidth="220px"
		requireds={true}
		errs={formError.includes("subject")}
		arrayProps={[index, subIndex, 'subject']} ``
		setArrayProps={handleSubjectChange}
		dataNames="subject"
	/>

*/

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const FilterArray = ({
  options,
  defaultValues = "",
  notUpperCases = false,
  names,
  labels,
  setSelectedValue,
  defaultWidth,
  requireds,
  errs,
  setArrayProps,
  arrayProps,
  dataNames,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(defaultValues);

  const handleOptionClick = (option) => {
    setSelected(option);
    setSelectedValue && setSelectedValue(option);
    setArrayProps && setArrayProps(arrayProps, option);
    setIsActive(false);
  };

  useEffect(() => {
    setSelected(defaultValues);
  }, [defaultValues]);

  return (
    <StyledSelect
      className={`select ${errs ? "ih-form-err" : ""}`}
      width={defaultWidth || "300px"}
      id={`id_${names}`}
    >
      <div className="select__btn" onClick={() => setIsActive(!isActive)}>
        <div>
          <input
            type="text"
            defaultValue={!notUpperCases ? selected?.toUpperCase() : selected}
            name={names}
            className="select__input"
            required={requireds}
            data-name={dataNames || names}
          />
          <p>{selected || "..."}</p>
        </div>
        {labels && <label className="select__label">{labels}</label>}
        <span className="material-symbols-outlined">expand_more</span>
      </div>
      {isActive && (
        <div className="select__content">
          {options.map((option) => (
            <div
              key={option}
              className="select__item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </StyledSelect>
  );
};

const StyledSelect = styled.div`
  width: ${(props) => props.width};
  margin: 30px 0;
  position: relative;
  .select__btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    height: 47px;
    padding: 0 10px;
    border: var(--borderDefault);
    border-radius: 4px;
  }
  &.ih-form-err .select__btn {
    border-color: var(--Danger);
  }

  .select__btn:focus-within {
    outline: none;
    border-color: var(--DarkCyan);
  }

  .select__input {
    display: none;
  }

  .select__btn p {
    margin: 0;
  }

  .select__label {
    position: absolute;
    top: -15px;
    left: 15px;
    padding: 5px;
    color: var(--DarkCyan);
    font-size: 14px;
    background: var(--White);
    pointer-events: none;
  }

  .select__content {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    z-index: 1;
    font-family: Nunito;
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    background: var(--White);
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .select__item {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f2f2f2;
    }
  }
`;

export default FilterArray;
