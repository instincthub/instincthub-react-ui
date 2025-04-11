import React, { useState, useRef, useEffect, ChangeEvent } from "react";

interface DateInputProps {
  labels: string;
  names: string;
  name?: string;
  maxAge?: number;
  minAge?: number;
  defaultValues?: string;
  requireds?: boolean;
  controls?: boolean;
  inputEvent?: (name: string, value: string) => void;
}

/*
    <DateInput labels="Year Founded" names='founded' maxAge={17} minAge={10} />
*/

const DateInput: React.FC<DateInputProps> = (props) => {
  const [errMsg, setErrMsg] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [defaultDateObjects, setDefaultDateObjects] = useState<Date | false>(
    props.defaultValues ? new Date(props.defaultValues) : false
  );

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  // Calculate the maximum allowed year based on maxAge prop
  const maxAllowedYear = new Date().getFullYear() - (props.maxAge || 0);
  const minAllowedYear = new Date().getFullYear() - (props.minAge || 0);

  useEffect(() => {
    const strDate = `${year}-${month}-${day}`;
    setDate(strDate);
    if (props.inputEvent) props.inputEvent(props.names, strDate);
  }, [year, month, day, props.names, props.inputEvent]);

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

  if (defaultDateObjects && typeof defaultDateObjects === "object") {
    // Handle default date time.
    setDay(lessThanTen(defaultDateObjects.getDate() + 1));
    setMonth(lessThanTen(defaultDateObjects.getMonth() + 1));
    setYear(defaultDateObjects.getFullYear().toString());

    setDefaultDateObjects(false);
  }

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
        <h5 className="mt-3">{props.labels}</h5>
        <input type="text" hidden defaultValue={date} name={props.names} />
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
            required={props.requireds}
            className="ihub-date-input"
          />
          <input
            ref={monthRef}
            type="text"
            value={month}
            onChange={handleMonthChange}
            placeholder="MM"
            maxLength={2}
            required={props.requireds}
            className="ihub-date-input"
          />
          <input
            ref={yearRef}
            type="text"
            value={year}
            onChange={handleYearChange}
            placeholder="YYYY"
            maxLength={4}
            required={props.requireds}
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
