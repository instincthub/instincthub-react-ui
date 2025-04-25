"use client";
import { DateInputPickerPropsType } from "@/types";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import React, {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
} from "react";

/**
 * A reusable date input component with calendar picker
 */
const DateInputPicker: React.FC<DateInputPickerPropsType> = ({
  label,
  value = "",
  onChange,
  required = false,
  minDate,
  maxDate,
  disabledDates = [],
  errorMessage,
  className = "",
  displayFormat = "YYYY-MM-DD",
  locale = "en-US",
  includeTime = false,
  name,
  id,
  placeholder = "YYYY-MM-DD",
  disabled = false,
  showCalendarPicker = true,
  showQuickActions = true,
  ariaLabel,
}) => {
  // States
  const [inputValue, setInputValue] = useState<string>(value);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(errorMessage || null);
  const [year, setYear] = useState<string>(value ? value.split("-")[0] : "");
  const [month, setMonth] = useState<string>(value ? value.split("-")[1] : "");
  const [day, setDay] = useState<string>(value ? value.split("-")[2] : "");
  const [hours, setHours] = useState<string>(
    value && includeTime && value.includes("T")
      ? value.split("T")[1].split(":")[0]
      : "00"
  );
  const [minutes, setMinutes] = useState<string>(
    value && includeTime && value.includes("T")
      ? value.split("T")[1].split(":")[1]
      : "00"
  );

  // Refs
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);

  // Calendar navigation state
  const [currentMonth, setCurrentMonth] = useState<number>(
    selectedDate ? selectedDate.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()
  );

  // Initialize component with value if provided
  useEffect(() => {
    if (value) {
      const dateObj = new Date(value);
      if (!isNaN(dateObj.getTime())) {
        setSelectedDate(dateObj);
        setInputValue(value);

        if (value.includes("-")) {
          const [yearPart, monthPart, dayPart] = value.split("-");
          setYear(yearPart);
          setMonth(monthPart);
          setDay(dayPart.split("T")[0] || dayPart);

          if (includeTime && value.includes("T")) {
            const timePart = value.split("T")[1];
            if (timePart) {
              const [hoursPart, minutesPart] = timePart.split(":");
              setHours(hoursPart);
              setMinutes(minutesPart);
            }
          }
        }
      }
    }
  }, [value, includeTime]);

  // Handle outside click to close calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Date validation functions
  const isValidDate = (dateStr: string): boolean => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  };

  const isWithinRange = (dateStr: string): boolean => {
    if (!minDate && !maxDate) return true;

    const date = new Date(dateStr);
    const min = minDate ? new Date(minDate) : null;
    const max = maxDate ? new Date(maxDate) : null;

    if (min && date < min) return false;
    if (max && date > max) return false;

    return true;
  };

  const isDisabledDate = (dateStr: string): boolean => {
    return disabledDates.includes(dateStr);
  };

  const validateDate = (): boolean => {
    // Clear previous error
    setError(null);

    // Check if empty and required
    if (required && !inputValue) {
      setError("Date is required");
      return false;
    }

    // Skip validation if empty and not required
    if (!inputValue) return true;

    // Check if valid date
    if (!isValidDate(inputValue)) {
      setError("Please enter a valid date");
      return false;
    }

    // Check if within range
    if (!isWithinRange(inputValue)) {
      setError(
        `Date must be between ${minDate || "any"} and ${maxDate || "any"}`
      );
      return false;
    }

    // Check if disabled
    if (isDisabledDate(inputValue)) {
      setError("This date is not available");
      return false;
    }

    return true;
  };

  // Input change handlers
  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value.slice(0, 4);
    if (/^\d*$/.test(newYear)) {
      setYear(newYear);
      updateDate(newYear, month, day);
    }
  };

  const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMonth = e.target.value.slice(0, 2);
    if (/^\d*$/.test(newMonth) && parseInt(newMonth) <= 12) {
      setMonth(newMonth);
      updateDate(year, newMonth, day);

      // Auto-advance to day input if two digits entered
      if (newMonth.length === 2 && dayInputRef.current) {
        dayInputRef.current.focus();
      }
    }
  };

  const handleDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDay = e.target.value.slice(0, 2);
    if (/^\d*$/.test(newDay) && parseInt(newDay) <= 31) {
      setDay(newDay);
      updateDate(year, month, newDay);
    }
  };

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newHours = e.target.value.slice(0, 2);
    if (/^\d*$/.test(newHours) && parseInt(newHours) <= 23) {
      setHours(newHours);
      updateDateTime(year, month, day, newHours, minutes);
    }
  };

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMinutes = e.target.value.slice(0, 2);
    if (/^\d*$/.test(newMinutes) && parseInt(newMinutes) <= 59) {
      setMinutes(newMinutes);
      updateDateTime(year, month, day, hours, newMinutes);
    }
  };

  // Update date from individual fields
  const updateDate = (y: string, m: string, d: string) => {
    if (y.length === 4 && m.length === 2 && d.length === 2) {
      const paddedMonth = m.padStart(2, "0");
      const paddedDay = d.padStart(2, "0");
      const dateStr = `${y}-${paddedMonth}-${paddedDay}`;

      if (isValidDate(dateStr)) {
        const newDate = new Date(dateStr);
        setSelectedDate(newDate);
        setInputValue(dateStr);

        if (includeTime) {
          updateDateTime(y, m, d, hours, minutes);
          return;
        }

        if (onChange) {
          onChange(dateStr);
        }
      }
    }
  };

  // Update datetime from individual fields
  const updateDateTime = (
    y: string,
    m: string,
    d: string,
    h: string,
    min: string
  ) => {
    if (y.length === 4 && m.length === 2 && d.length === 2) {
      const paddedMonth = m.padStart(2, "0");
      const paddedDay = d.padStart(2, "0");
      const paddedHours = h.padStart(2, "0");
      const paddedMinutes = min.padStart(2, "0");

      const dateStr = `${y}-${paddedMonth}-${paddedDay}T${paddedHours}:${paddedMinutes}:00`;

      if (isValidDate(dateStr)) {
        const newDate = new Date(dateStr);
        setSelectedDate(newDate);
        setInputValue(dateStr);

        if (onChange) {
          onChange(dateStr);
        }
      }
    }
  };

  // Key event handlers for accessibility
  const handleKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
    inputType: "year" | "month" | "day"
  ) => {
    // Tab navigation logic
    if (e.key === "Tab") {
      // Allow normal tab behavior
      return;
    }

    // Enter or Space to toggle calendar
    if ((e.key === "Enter" || e.key === " ") && inputType === "day") {
      e.preventDefault();
      setShowCalendar(!showCalendar);
    }

    // Auto-advance on slash key
    if (e.key === "/") {
      e.preventDefault();
      if (inputType === "month" && dayInputRef.current) {
        dayInputRef.current.focus();
      } else if (inputType === "year" && monthInputRef.current) {
        monthInputRef.current.focus();
      }
    }

    // Escape to close calendar
    if (e.key === "Escape") {
      setShowCalendar(false);
    }
  };

  // Handle focus events
  const handleFocus = () => {
    // Add any focus logic here
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    // Validate on blur
    validateDate();
  };

  // Calendar helpers
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const prevYear = () => {
    setCurrentYear((prev) => prev - 1);
  };

  const nextYear = () => {
    setCurrentYear((prev) => prev + 1);
  };

  // Date selection from calendar
  const selectDate = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    const isoDate = newDate.toISOString().split("T")[0];

    setSelectedDate(newDate);
    setYear(isoDate.split("-")[0]);
    setMonth(isoDate.split("-")[1]);
    setDay(isoDate.split("-")[2]);

    if (includeTime) {
      const dateTimeStr = `${isoDate}T${hours.padStart(
        2,
        "0"
      )}:${minutes.padStart(2, "0")}:00`;
      setInputValue(dateTimeStr);
      if (onChange) onChange(dateTimeStr);
    } else {
      setInputValue(isoDate);
      if (onChange) onChange(isoDate);
    }

    setShowCalendar(false);
  };

  // Quick date setters
  const setToday = () => {
    const today = new Date();
    const isoDate = today.toISOString().split("T")[0];

    setSelectedDate(today);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setYear(isoDate.split("-")[0]);
    setMonth(isoDate.split("-")[1]);
    setDay(isoDate.split("-")[2]);

    if (includeTime) {
      const hours = today.getHours().toString().padStart(2, "0");
      const minutes = today.getMinutes().toString().padStart(2, "0");
      setHours(hours);
      setMinutes(minutes);

      const dateTimeStr = `${isoDate}T${hours}:${minutes}:00`;
      setInputValue(dateTimeStr);
      if (onChange) onChange(dateTimeStr);
    } else {
      setInputValue(isoDate);
      if (onChange) onChange(isoDate);
    }
  };

  const clearDate = () => {
    setSelectedDate(null);
    setInputValue("");
    setYear("");
    setMonth("");
    setDay("");
    setHours("00");
    setMinutes("00");
    if (onChange) onChange("");
  };

  // Format date for display
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return "";

    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;

      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: includeTime ? "2-digit" : undefined,
        minute: includeTime ? "2-digit" : undefined,
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };

  // Render calendar
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    const days = [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Header
    days.push(
      <div className="ihub-calendar-header" key="header">
        <button
          className="ihub-calendar-nav"
          onClick={prevYear}
          aria-label="Previous Year"
        >
          «
        </button>
        <button
          className="ihub-calendar-nav"
          onClick={prevMonth}
          aria-label="Previous Month"
        >
          ‹
        </button>
        <div className="ihub-calendar-title">
          <span>
            {monthNames[currentMonth]} {currentYear}
          </span>
        </div>
        <button
          className="ihub-calendar-nav"
          onClick={nextMonth}
          aria-label="Next Month"
        >
          ›
        </button>
        <button
          className="ihub-calendar-nav"
          onClick={nextYear}
          aria-label="Next Year"
        >
          »
        </button>
      </div>
    );

    // Days of week
    days.push(
      <div className="ihub-calendar-days" key="weekdays">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
    );

    // Date grid
    const dateGrid = [];
    let day = 1;

    // Create rows for the calendar
    for (let i = 0; i < 6; i++) {
      const cells = [];

      // Create cells for the row
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          // Empty cells before first day
          cells.push(
            <div key={`empty-${j}`} className="ihub-calendar-cell"></div>
          );
        } else if (day <= daysInMonth) {
          // Date cells
          const date = new Date(currentYear, currentMonth, day);
          const dateStr = date.toISOString().split("T")[0];
          const isSelected = selectedDate
            ? selectedDate.getDate() === day &&
              selectedDate.getMonth() === currentMonth &&
              selectedDate.getFullYear() === currentYear
            : false;
          const isToday =
            new Date().getDate() === day &&
            new Date().getMonth() === currentMonth &&
            new Date().getFullYear() === currentYear;
          const isDisabled =
            (minDate && date < new Date(minDate)) ||
            (maxDate && date > new Date(maxDate)) ||
            disabledDates.includes(dateStr);

          cells.push(
            <div
              key={`day-${day}`}
              className={`ihub-calendar-cell ${
                isSelected ? "ihub-selected" : ""
              } ${isToday ? "ihub-today" : ""} ${
                isDisabled ? "ihub-disabled" : ""
              }`}
              onClick={() => !isDisabled && selectDate(day)}
              aria-selected={isSelected}
              role="gridcell"
              tabIndex={isSelected ? 0 : -1}
            >
              {day}
            </div>
          );
          day++;
        } else {
          // Empty cells after last day
          cells.push(
            <div key={`empty-after-${j}`} className="ihub-calendar-cell"></div>
          );
        }
      }

      // Add row to grid
      dateGrid.push(
        <div className="ihub-calendar-row" key={`row-${i}`} role="row">
          {cells}
        </div>
      );

      // Break early if we've rendered all days
      if (day > daysInMonth) break;
    }

    days.push(
      <div className="ihub-calendar-grid" key="grid" role="grid">
        {dateGrid}
      </div>
    );

    // Quick action buttons
    if (showQuickActions) {
      days.push(
        <div className="ihub-calendar-actions" key="actions">
          <button
            className="ihub-calendar-action-btn"
            onClick={setToday}
            type="button"
          >
            Today
          </button>
          <button
            className="ihub-calendar-action-btn"
            onClick={clearDate}
            type="button"
          >
            Clear
          </button>
        </div>
      );
    }

    return days;
  };

  // Main render
  return (
    <div className="ihub-wrapper">
      <div
        className={`ihub-date-wrapper ${className} ${
          error ? "ihub-is_invalid" : ""
        }`}
      >
        <label className="ihub-text-label" htmlFor={id || name}>
          {label}
          {required && <span className="ihub-required">*</span>}
        </label>

        <div
          ref={inputRef}
          className={`ihub-date-input-container ${error ? "date-err" : ""}`}
          onClick={() =>
            !disabled && showCalendarPicker && setShowCalendar(true)
          }
        >
          {/* Year Input */}
          <input
            ref={yearInputRef}
            type="text"
            className="ihub-date-input ihub-date-year"
            value={year}
            onChange={handleYearChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "year")}
            placeholder="YYYY"
            maxLength={4}
            disabled={disabled}
            aria-label={`Year ${ariaLabel || label}`}
            aria-invalid={!!error}
          />
          <span className="ihub-date-separator">-</span>

          {/* Month Input */}
          <input
            ref={monthInputRef}
            type="text"
            className="ihub-date-input"
            value={month}
            onChange={handleMonthChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "month")}
            placeholder="MM"
            maxLength={2}
            disabled={disabled}
            aria-label={`Month ${ariaLabel || label}`}
            aria-invalid={!!error}
          />
          <span className="ihub-date-separator">-</span>

          {/* Day Input */}
          <input
            ref={dayInputRef}
            type="text"
            className="ihub-date-input"
            value={day}
            onChange={handleDayChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "day")}
            placeholder="DD"
            maxLength={2}
            disabled={disabled}
            aria-label={`Day ${ariaLabel || label}`}
            aria-invalid={!!error}
          />

          {/* Time inputs */}
          {includeTime && (
            <>
              <div className="ihub-datetime-separator">at</div>
              <div className="ihub-time-wrapper">
                <input
                  type="text"
                  className="ihub-date-input"
                  value={hours}
                  onChange={handleHoursChange}
                  onBlur={handleBlur}
                  placeholder="HH"
                  maxLength={2}
                  disabled={disabled}
                  aria-label={`Hours ${ariaLabel || label}`}
                />
                <span className="ihub-date-separator">:</span>
                <input
                  type="text"
                  className="ihub-date-input"
                  value={minutes}
                  onChange={handleMinutesChange}
                  onBlur={handleBlur}
                  placeholder="MM"
                  maxLength={2}
                  disabled={disabled}
                  aria-label={`Minutes ${ariaLabel || label}`}
                />
              </div>
            </>
          )}

          {/* Calendar icon */}
          {showCalendarPicker && (
            <button
              type="button"
              className="ihub-calendar-toggle"
              onClick={(e) => {
                e.stopPropagation();
                !disabled && setShowCalendar(!showCalendar);
              }}
              aria-label="Toggle calendar"
              disabled={disabled}
            >
              <CalendarMonthOutlinedIcon />
            </button>
          )}
        </div>

        {/* Error message */}
        {error && <div className="ihub-error-message">{error}</div>}

        {/* Calendar picker */}
        {showCalendar && showCalendarPicker && !disabled && (
          <div
            className="ihub-calendar-container"
            ref={calendarRef}
            role="dialog"
            aria-label="Choose date"
          >
            {renderCalendar()}
          </div>
        )}
      </div>
      {/* Quick action links */}
      {showQuickActions && !disabled && (
        <div className="ihub-auto-date ihub-date-picker-action">
          <span className="ihub-set-today ihub-fs-sm" onClick={setToday}>
            Today
          </span>
          <span className="ihub-separator ihub-fs-sm">|</span>
          <span className="ihub-clear-date ihub-fs-sm" onClick={clearDate}>
            Clear
          </span>
        </div>
      )}
    </div>
  );
};

export default DateInputPicker;
