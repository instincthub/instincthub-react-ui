import React from "react";
import styled from "styled-components";

const RadioSimple = (props) => {
	const handleRadio = (e) => {
		if (props.inputEvent) props.inputEvent(e);
	};
	return (
		<RadioBtn>
			<label htmlFor={props.ids} className="radio-label">
				<input
					className="radio-input"
					type="radio"
					name={props.names}
					id={props.ids}
					value={props.values}
					onChange={handleRadio}
					defaultChecked={props.checked}
				/>
				<span className="custom-radio" />
				<p className="p-label">{props.labels}</p>
			</label>
		</RadioBtn>
	);
};

export default RadioSimple;

let RadioBtn = styled.section`
	.select-theme {
		margin-top: 20px;
	}

	.select-theme p {
		margin: 0 0 5px 0;
		padding: 0;
	}

	.radio-label {
		color: #303030;
		font-size: 14px;
		font-weight: 400;
		margin-right: 7px;
		-webkit-tap-highlight-color: transparent;
		cursor: pointer;
		position: absolute;
		transition: all 0.4s ease-in-out;
		bottom: 10px;
		right: 0;
	}

	.p-label {
		font-size: 14px;
		font-weight: 400;
		display: inline;
		bottom: 10px;
		right: 0;
	}

	.radio-input {
		margin: 0;
		transition: all 0.4s ease-in-out;
		visibility: hidden;
	}

	.radio-input:checked + span {
		border: 1px solid var(--DarkCyan);
		transition: all 0.4s ease-in-out;
	}

	.radio-input:checked + span:after {
		opacity: 1;
	}

	.custom-radio {
		left: -8px;
		top: 6px;
		transition: all 0.4s ease-in-out;
		cursor: pointer;
		width: 24px;
		height: 24px;
		border: 1px solid var(--DarkCyan);
		border-radius: 50%;
		display: inline-block;
		position: relative;
	}

	/* for inner filled circle */
	.custom-radio::after {
		content: "";
		width: 12px;
		height: 12px;
		background: var(--DarkCyan);
		position: absolute;
		border-radius: 50%;
		transition: all 0.4s ease-in-out;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
		transition: opacity 0.2s;
	}
`;
