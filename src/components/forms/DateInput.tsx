"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";

interface DateInputProps {
  label: string;
  name?: string;
  maxAge?: number;
  minAge?: number;
  defaultValue?: string;
  required?: boolean;
  controls?: boolean;
  inputEvent?: (name: string, value: string) => void;
}

/*
 * @example
 * <DateInput label="Year Founded" name='founded' maxAge={17} minAge={10} />
 * <DateInput label="Year Founded" name='founded' maxAge={17} minAge={10} defaultValue="2024-01-01" />
 * <DateInput label="Year Founded" name='founded' maxAge={17} minAge={10} required={true} />
 * <DateInput label="Year Founded" name='founded' maxAge={17} minAge={10} inputEvent={(name, value) => console.log(name, value)} />
 *
 * @props
 * @label: string
 * @name: string
 * @maxAge: number
 * @minAge: number
 * @defaultValue: string
 * @required: boolean
 * @controls: boolean
 * @inputEvent: (name: string, value: string) => void
 *
 */

const DateInput: React.FC<DateInputProps> = (props) => {
  const [errMsg, setErrMsg] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [defaultDateObjects, setDefaultDateObjects] = useState<Date | false>(
    props.defaultValue ? new Date(props.defaultValue) : false
  );

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  // Calculate the maximum allowed year based on maxAge prop
  const maxAllowedYear = new Date().getFullYear() - (props.maxAge || 0);
  const minAllowedYear = new Date().getFullYear() - (props.minAge || 0);

  // Handle default date initialization
  useEffect(() => {
    if (defaultDateObjects && typeof defaultDateObjects === "object") {
      setDay(lessThanTen(defaultDateObjects.getDate()));
      setMonth(lessThanTen(defaultDateObjects.getMonth() + 1));
      setYear(defaultDateObjects.getFullYear().toString());
      setDefaultDateObjects(false);
    }
  }, [defaultDateObjects]);

  useEffect(() => {
    const strDate = `${year}-${month}-${day}`;
    setDate(strDate);
    if (props.inputEvent && props.name) props.inputEvent(props.name, strDate);
  }, [year, month, day, props.name]);

  const handleDayChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Remove any non-numeric characters
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setDay(numericValue);
    if (event.target.value.length === 2 && monthRef.current)
      monthRef.current.focus();
    if (parseInt(event.target.value, 10) > 31) setDay("31");
  };

  const handleMonthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setMonth(numericValue);
    if (event.target.value.length === 2 && yearRef.current)
      yearRef.current.focus();
    if (parseInt(event.target.value, 10) > 12) setMonth("12");
  };

  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const lessThanTen = (num: number): string => {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num.toString();
    }
  };

  const setToday = (add: number): void => {
    // add is used to add additional day for tomorrow
    const dateObjects = new Date();
    setDay(lessThanTen(dateObjects.getDate() + add));
    setMonth(lessThanTen(dateObjects.getMonth() + 1));
    setYear(dateObjects.getFullYear().toString());
  };

  const clearDate = (): void => {
    setDay("");
    setMonth("");
    setYear("");
  };

  return (
    <div className={props.name}>
      <div className="field">
        <h5 className="ihub-mt-3 ihub-mb-1">{props.label}</h5>
        <input type="text" hidden defaultValue={date} name={props.name} />
        <div
          className={`ihub-date-input-container ${errMsg ? "date-err" : ""}`}
        >
          <input
            ref={dayRef}
            type="text"
            value={day}
            onChange={handleDayChange}
            placeholder="DD"
            maxLength={2}
            required={props.required}
            className="ihub-date-input"
          />
          <input
            ref={monthRef}
            type="text"
            value={month}
            onChange={handleMonthChange}
            placeholder="MM"
            maxLength={2}
            required={props.required}
            className="ihub-date-input"
          />
          <input
            ref={yearRef}
            type="text"
            value={year}
            onChange={handleYearChange}
            placeholder="YYYY"
            maxLength={4}
            required={props.required}
            className="ihub-date-input ihub-date-year"
          />
        </div>
        <p className="fs-1 fw-bold ihub-is_invalid">{errMsg}</p>

        {props.controls ? (
          <p className="ihub-auto-date">
            <span className="ihub-set-today" onClick={() => setToday(0)}>
              Today
            </span>
            <span className="ihub-separator">|</span>
            <span className="ihub-set-tomorrow" onClick={() => setToday(1)}>
              Tomorrow
            </span>
            <span className="ihub-separator">|</span>
            <span className="ihub-clear-date" onClick={clearDate}>
              Clear
            </span>
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DateInput;
