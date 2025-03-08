import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

/*
    <DateInput labels="Year Founded" names='founded' maxAge={17} minAge={10} />
*/

const DateInput = (props) => {
	const [errMsg, setErrMsg] = useState("");
	const [date, setDate] = useState("");
	const [day, setDay] = useState("");
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [defaultDateObjects, setDefaultDateObjects] = useState(
		props.defaultValues ? new Date(props.defaultValues) : false
	);

	const dayRef = useRef(null);
	const monthRef = useRef(null);
	const yearRef = useRef(null);

	// Calculate the maximum allowed year based on maxAge prop
	const maxAllowedYear = new Date().getFullYear() - (props.maxAge || 0);
	const minAllowedYear = new Date().getFullYear() - (props.minAge || 0);

	useEffect(() => {
		const strDate = `${year}-${month}-${day}`;
		setDate(strDate);
		if (props.inputEvent) props.inputEvent(props.names, strDate);
	}, [year, month, day]);

	const handleDayChange = (event) => {
		// Remove any non-numeric characters
		const numericValue = event.target.value.replace(/[^0-9]/g, "");
		setDay(numericValue);
		if (event.target.value.length === 2) monthRef.current.focus();
		if (event.target.value > 31) setDay(31);
	};

	const handleMonthChange = (event) => {
		const numericValue = event.target.value.replace(/[^0-9]/g, "");
		setMonth(numericValue);
		if (event.target.value.length === 2) yearRef.current.focus();
		if (event.target.value > 12) setMonth(12);
	};

	const handleYearChange = (event) => {
		// Remove any non-numeric characters
		const numericValue = event.target.value.replace(/[^0-9]/g, "");
		const yearInput = numericValue;
		const fourDigits = yearInput.length === 4;
		const inputYear = parseInt(yearInput, 10);

		if (fourDigits && props.maxAge && inputYear < maxAllowedYear) {
			setErrMsg(`Only from ${props.maxAge} years and below are allowed.`);
		} else if (fourDigits && props.minAge && inputYear > minAllowedYear) {
			setErrMsg(`Only from ${props.minAge} years and above are allowed.`);
		} else {
			setYear(yearInput);
			setErrMsg("");
		}
	};

	const lessThanTen = (num) => {
		if (num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	};

	if (defaultDateObjects && typeof defaultDateObjects === "object") {
		// Handle default date time.
		setDay(lessThanTen(defaultDateObjects.getDate() + 1)),
			setMonth(lessThanTen(defaultDateObjects.getMonth() + 1));
		setYear(defaultDateObjects.getFullYear());

		setDefaultDateObjects(false);
	}

	const setToday = (add) => {
		// add is used to add additional day for tomorrow
		const dateObjects = new Date();
		setDay(lessThanTen(dateObjects.getDate() + add)),
			setMonth(lessThanTen(dateObjects.getMonth() + 1));
		setYear(dateObjects.getFullYear());
	};

	const clearDate = () => {
		setDay(""), setMonth("");
		setYear("");
	};

	return (
		<div className={props.name}>
			<div className="field">
				<h5 className="mt-3">{props.labels}</h5>
				<input type="text" hidden defaultValue={date} name={props.names} />
				<DateInputContainer className={errMsg ? "date-err" : ""}>
					<input
						ref={dayRef}
						type="text"
						value={day}
						onChange={handleDayChange}
						placeholder="DD"
						maxLength="2"
						required={props.requireds}
					/>
					<input
						ref={monthRef}
						type="text"
						value={month}
						onChange={handleMonthChange}
						placeholder="MM"
						maxLength="2"
						required={props.requireds}
					/>
					<input
						className="date_year"
						ref={yearRef}
						type="text"
						value={year}
						onChange={handleYearChange}
						placeholder="YYYY"
						maxLength="4"
						required={props.requireds}
					/>
				</DateInputContainer>
				<p className="fs-1 fw-bold">{errMsg}</p>

				{props.controls ? (
					<ReactAutoDate className="auto_date">
						<span className="set_today" onClick={() => setToday(0)}>
							Today
						</span>
						<span className="separator">|</span>
						<span className="set_tomorrow" onClick={() => setToday(1)}>
							Tomorrow
						</span>
						<span className="separator">|</span>
						<span className="clear_date" onClick={clearDate}>
							Clear
						</span>
					</ReactAutoDate>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default DateInput;

const DateInputContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 200px;
	position: relative;
	margin-top: 25px;
	input {
		width: 60px;
		height: 50px;
		text-align: center;
		border: var(--borderDefault);
		border-radius: 5px;
		margin: 0 5px;
		outline: none;
		&:focus {
			border-color: var(--ViridianGreen);
		}
	}
	input.date_year {
		width: 70px;
	}
	&.date-err {
		input {
			border-color: var(--Danger);
		}
	}
`;

const ReactAutoDate = styled.p`
	span {
		display: inline-block !important;
		color: var(--ViridianGreen);
		&.separator {
			color: grey;
			margin-right: 10px;
			margin-left: 10px;
		}
	}
	span.set_today,
	span.set_tomorrow,
	span.clear_date {
		cursor: pointer;
	}
`;
