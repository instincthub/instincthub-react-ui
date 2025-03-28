import React, { useState, useRef, useEffect, ChangeEvent } from "react";

interface DateTimeInputProps {
  labels: string;
  names: string;
  requireds?: boolean;
  defaultValues?: string;
}

interface DateState {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
}

/* 
  <DateTimeInput labels="Schedule Call Date" names='scheduled_date' requireds={true} defaultValues="2023-02-27T23:40:00+01:00"/>
*/

const DateTimeInput: React.FC<DateTimeInputProps> = (props) => {
  const [dateObject, setDateObject] = useState<string>("");
  const [defaultDateObjects, setDefaultDateObjects] = useState<Date | false>(
    props.defaultValues ? new Date(props.defaultValues) : false
  );
  const [date, setDate] = useState<DateState>({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
  });

  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);
  const hourInputRef = useRef<HTMLInputElement>(null);
  const minuteInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, "");
    setDate((prevDate) => ({
      ...prevDate,
      [name]: numericValue,
    }));

    if (name === "day" && numericValue.length === 2 && monthInputRef.current) {
      monthInputRef.current.focus();
    } else if (
      name === "month" &&
      numericValue.length === 2 &&
      yearInputRef.current
    ) {
      yearInputRef.current.focus();
    } else if (
      name === "year" &&
      numericValue.length === 4 &&
      hourInputRef.current
    ) {
      hourInputRef.current.focus();
    } else if (
      name === "hour" &&
      numericValue.length === 2 &&
      minuteInputRef.current
    ) {
      minuteInputRef.current.focus();
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
    setDate({
      day: lessThanTen(defaultDateObjects.getDate()),
      month: lessThanTen(defaultDateObjects.getMonth() + 1),
      year: defaultDateObjects.getFullYear().toString(),
      hour: lessThanTen(defaultDateObjects.getHours()),
      minute: lessThanTen(defaultDateObjects.getMinutes()),
    });

    setDefaultDateObjects(false);
  }

  const setToday = (add: number): void => {
    // add is used to add additional day for tomorrow
    const dateObjects = new Date();
    setDate({
      day: lessThanTen(dateObjects.getDate() + add),
      month: lessThanTen(dateObjects.getMonth() + 1),
      year: dateObjects.getFullYear().toString(),
      hour: lessThanTen(dateObjects.getHours()),
      minute: lessThanTen(dateObjects.getMinutes()),
    });
  };

  const clearDate = (): void => {
    setDate({
      day: "",
      month: "",
      year: "",
      hour: "",
      minute: "",
    });
  };

  useEffect(() => {
    setDateObject(
      `${date.year}-${date.month}-${date.day} ${date.hour}:${date.minute}:00.000000`
    );
  }, [date.year, date.month, date.day, date.hour, date.minute]);

  return (
    <div className={props.names}>
      <div className="field">
        <h5 className="mt-3">{props.labels}</h5>
        <input
          type="text"
          hidden
          defaultValue={dateObject && date.day ? dateObject : ""}
          name={props.names}
        />
        <div className="ihub-datetime-container">
          <div className="ihub-date-wrapper">
            <input
              type="text"
              name="day"
              value={date.day}
              onChange={handleChange}
              maxLength={2}
              placeholder="DD"
              ref={dayInputRef}
              required={props.requireds}
              className="ihub-date-input"
            />
            <input
              type="text"
              name="month"
              value={date.month}
              onChange={handleChange}
              maxLength={2}
              placeholder="MM"
              ref={monthInputRef}
              required={props.requireds}
              className="ihub-date-input"
            />
            <input
              type="text"
              name="year"
              value={date.year}
              onChange={handleChange}
              maxLength={4}
              placeholder="YYYY"
              ref={yearInputRef}
              className="ihub-date-input ihub-date-year"
              required={props.requireds}
            />
          </div>
          <div className="ihub-datetime-separator">-</div>
          <div className="ihub-time-wrapper">
            <input
              type="text"
              name="hour"
              value={date.hour}
              onChange={handleChange}
              maxLength={2}
              placeholder="HH"
              ref={hourInputRef}
              required={props.requireds}
              className="ihub-date-input"
            />
            <input
              type="text"
              name="minute"
              value={date.minute}
              onChange={handleChange}
              maxLength={2}
              placeholder="MM"
              ref={minuteInputRef}
              required={props.requireds}
              className="ihub-date-input"
            />
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default DateTimeInput;
