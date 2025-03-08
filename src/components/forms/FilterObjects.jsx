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




	<FilterObjects 
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

import { setCookie } from "../../assets/js/helpFunction";
import { ExpandMoreOutlined } from "@mui/icons-material";
import { React, useState, useEffect } from "react";
import styled from "styled-components";
// import { toTitleCase } from "../../assets/js/help_func";

const FilterObjects = (props) => {
	const [isActive, setIsActive] = useState(false);
	const [selected, setSelected] = useState("Choose...");
	const [objects, setObjects] = useState([]);
	const [id, setID] = useState("");

	useEffect(() => {
		/* 
        Objects trows error when you loop with map or forEach.
        Solution: convert objects list to array.
    */
		let obj = [];
		for (const i in props.options) {
			if (props.options[i].id == props.defaultValues) {
				setSelected(props.options[i].title);
				setID(props.options[i].id);
			}
			obj.push(props.options[i]);
		}
		setObjects(obj);
	}, [props.options]);

	useEffect(() => {
		// Update default ID and Selected states
		if (props.defaultValues?.id) {
			// If objects was passed as a props.
			setSelected(props.defaultValues.title);
			setID(props.defaultValues.id);
		} else if (props.defaultValues) {
			// If ID was passed as a props
			let obj = props.options.find((i) => i.id === props.defaultValues);
			if (obj?.id) {
				setSelected(obj.title);
				setID(obj.id);
			}
		} else {
			// if none default values
			setSelected("Choose...");
			setID("");
		}
		console.log(props.defaultValues);
	}, [props.defaultValues]);

	const handleOptionClick = (option, title) => {
		setSelected(title);
		setID(option.id);
		setIsActive(false);
		props.setSelectedValues && props.setSelectedValues(props.names, option);
		props.setObjects && props.setObjects(option);
		props.setArrayProps && props.setArrayProps(props.arrayProps, option);
		if (props.setCookies) {
			setCookie(props.setCookies, JSON.stringify(option), 365);
		}
	};

	return (
		<StyledSelect
			className={`select ${props.errs ? "ih-form-err" : ""}`}
			width={props.defaultWidth || "300px"}
		>
			<div
				className={`select__btn`}
				onClick={(e) => props.status !== 0 && setIsActive(!isActive)}
			>
				<div className={props.status === 0 && "disabled"}>
					<input
						type="text"
						className="select__input"
						value={props.upperCases ? id.toUpperCase() : id || ""}
						id={"id_" + props.names}
						name={props.names}
						required={props.requireds}
						data-name={props.dataNames || props.names}
					/>
					<p>{selected || "..."}</p>
				</div>
				{props.labels && (
					<label className="select__label">{props.labels}</label>
				)}
				{/* {selected} */}

				<div className="search_btn">
					{props.status === 0 ? (
						<div className="loader"></div>
					) : (
						<ExpandMoreOutlined />
					)}
				</div>
			</div>
			{isActive && (
				<div className="select__content">
					{objects.map((option, index) => {
						return (
							<div
								className="select__item"
								onClick={(e) => handleOptionClick(option, option.title)}
								key={index}
							>
								{option.title}
							</div>
						);
					})}
				</div>
			)}
			{/* {getFormErrorMessage(props.names)} */}
		</StyledSelect>
	);
};

export default FilterObjects;

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
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	&.ih-form-err .select__btn {
		border-color: var(--Danger);
	}
	.p-error {
		text-transform: capitalize;
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
	.disabled {
		opacity: 0.7;
	}
	.loader {
		border: 3px solid #f3f3f3; /* Light grey */
		border-top: 3px solid var(--DarkCyan); /* Blue */
		border-radius: 50%;
		width: 24px;
		height: 24px;
		animation: spin 2s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
