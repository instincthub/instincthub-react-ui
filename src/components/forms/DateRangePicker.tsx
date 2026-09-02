"use client";

import { DateRangePickerPropsType } from "@/types";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  format,
  isValid,
  isBefore,
  isAfter,
  startOfDay,
  addMonths,
  subMonths,
  getDaysInMonth,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  subDays,
  getDay,
  isSameDay,
} from "date-fns";

/**
 * Parse a date string as a LOCAL calendar date.
 *
 * `new Date("2024-01-15")` is spec'd to parse as UTC midnight, which resolves to
 * the PREVIOUS day in any UTC-negative timezone (all of the Americas). Because
 * the component emits with `format(date, "yyyy-MM-dd")` (local), a naive parse
 * makes every controlled round-trip walk the range one day backwards.
 */
const parseDate = (val?: string): Date | null => {
  if (!val) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(val.trim());
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);
    const date = new Date(year, month, day);
    // Reject rollovers such as "2024-13-01" or "2024-02-31".
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return null;
    }
    return isValid(date) ? date : null;
  }
  // Fall back for other formats (ISO datetimes, etc.), which carry their own
  // timezone information and are safe to hand to the Date constructor.
  const date = new Date(val);
  return isValid(date) ? startOfDay(date) : null;
};

/**
 * A date range picker component for selecting a start and end date.
 * Features a shared calendar dropdown with two-click selection,
 * live range preview on hover, and quick action presets.
 *
 * @example
 * ```tsx
 * <DateRangePicker
 *   label="Filter by Date"
 *   value={{ startDate: "2024-01-01", endDate: "2024-01-31" }}
 *   onChange={(range) => console.log(range)}
 *   showQuickActions
 * />
 * ```
 */
const DateRangePicker: React.FC<DateRangePickerPropsType> = ({
  label,
  startLabel = "From",
  endLabel = "To",
  value,
  onChange,
  required = false,
  minDate,
  maxDate,
  disabledDates = [],
  dateFormat = "yyyy-MM-dd",
  placeholder,
  errorMessage,
  className = "",
  name,
  id,
  disabled = false,
  showCalendarIcon = true,
  showQuickActions = true,
  ariaLabel,
}) => {
  // Committed range. Only ever holds a complete, emitted selection.
  const [startDate, setStartDate] = useState<Date | null>(
    parseDate(value?.startDate)
  );
  const [endDate, setEndDate] = useState<Date | null>(
    parseDate(value?.endDate)
  );
  // In-progress first click. Kept separate from the committed range so that
  // abandoning a selection never destroys the value the parent still holds.
  const [pendingStart, setPendingStart] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    parseDate(value?.startDate) || new Date()
  );
  const [selectionPhase, setSelectionPhase] = useState<"start" | "end">(
    "start"
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);
  // Validation raised by this component. A parent-supplied `errorMessage`
  // always takes precedence over it.
  const [internalError, setInternalError] = useState<string | null>(null);
  const displayError = errorMessage || internalError;

  // Refs
  const pickerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  // Fall back to a generated id so the label and the error message are always
  // programmatically associated, even when the consumer passes no `id`.
  const generatedId = React.useId();
  const baseId = id || `ihub-daterange-${generatedId}`;
  const errorId = `${baseId}-error`;
  const startInputId = baseId;
  const endInputId = `${baseId}-end`;

  // Bounds, parsed once and in local time.
  const minBound = useMemo(() => parseDate(minDate), [minDate]);
  const maxBound = useMemo(() => parseDate(maxDate), [maxDate]);

  // Sync with controlled value. The `value !== undefined` guard preserves the
  // controlled/uncontrolled contract: an explicit `{startDate:"",endDate:""}`
  // clears, but omitting the prop entirely leaves the component uncontrolled.
  useEffect(() => {
    if (!value) return;
    const nextStart = parseDate(value.startDate);
    setStartDate(nextStart);
    setEndDate(parseDate(value.endDate));
    setPendingStart(null);
    if (nextStart && !showPicker) setCurrentMonth(nextStart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.startDate, value?.endDate]);

  // Keep a parent-supplied error message in sync after mount.
  useEffect(() => {
    if (errorMessage) setInternalError(null);
  }, [errorMessage]);

  // Abandon an in-progress selection without touching the committed range.
  const cancelSelection = useCallback(() => {
    setPendingStart(null);
    setHoverDate(null);
    setSelectionPhase("start");
    setShowPicker(false);
    setActiveInput(null);
  }, []);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        cancelSelection();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cancelSelection]);

  // Validation
  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      const dateStr = format(date, "yyyy-MM-dd");
      return disabledDates.includes(dateStr);
    },
    [disabledDates]
  );

  const isDateInRange = useCallback(
    (date: Date): boolean => {
      const day = startOfDay(date);
      if (minBound && isBefore(day, minBound)) return false;
      if (maxBound && isAfter(day, maxBound)) return false;
      return true;
    },
    [minBound, maxBound]
  );

  // Pull a date inside [minDate, maxDate]. Returns null if the bounds are
  // impossible to satisfy.
  const clampToBounds = useCallback(
    (date: Date): Date | null => {
      let day = startOfDay(date);
      if (minBound && isBefore(day, minBound)) day = minBound;
      if (maxBound && isAfter(day, maxBound)) day = maxBound;
      if (minBound && isBefore(day, minBound)) return null;
      return day;
    },
    [minBound, maxBound]
  );

  // Format a date for display
  const formatDate = useCallback(
    (date: Date | null): string => {
      if (!date) return "";
      try {
        return format(date, dateFormat);
      } catch {
        return "";
      }
    },
    [dateFormat]
  );

  // Emit onChange
  const emitChange = useCallback(
    (start: Date | null, end: Date | null) => {
      onChange?.({
        startDate: start ? format(start, "yyyy-MM-dd") : "",
        endDate: end ? format(end, "yyyy-MM-dd") : "",
      });
    },
    [onChange]
  );

  // Calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = startOfMonth(currentMonth);
    const startingDayOfWeek = getDay(firstDay);
    const totalDays = getDaysInMonth(currentMonth);

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= totalDays; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  }, [currentMonth]);

  // Handle date click (two-click selection)
  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date) || !isDateInRange(date)) return;

    if (selectionPhase === "start" || !pendingStart) {
      // First click: stage the start date. Nothing is committed or emitted yet,
      // so the parent keeps its existing range until the user finishes.
      setPendingStart(date);
      setSelectionPhase("end");
      setActiveInput("end");
      setInternalError(null);
      return;
    }

    // Second click: commit the range, auto-swapping if it was drawn backwards.
    let newStart = pendingStart;
    let newEnd = date;
    if (isBefore(newEnd, newStart)) {
      [newStart, newEnd] = [newEnd, newStart];
    }

    setStartDate(newStart);
    setEndDate(newEnd);
    setPendingStart(null);
    setHoverDate(null);
    setSelectionPhase("start");
    setInternalError(null);
    emitChange(newStart, newEnd);
    setShowPicker(false);
    setActiveInput(null);
  };

  // Determine if a day is in the preview range
  const getDayRangeClass = (date: Date): string => {
    const anchor = pendingStart ?? startDate;
    if (!anchor) return "";

    const other = pendingStart ? hoverDate : endDate;

    // Normalise BEFORE assigning edge classes, otherwise hovering backwards
    // paints `range-start` (left-rounded) on the right edge and vice versa.
    let rangeStart = anchor;
    let rangeEnd = other ?? anchor;
    if (isBefore(rangeEnd, rangeStart)) {
      [rangeStart, rangeEnd] = [rangeEnd, rangeStart];
    }

    const classes: string[] = [];
    if (isSameDay(date, rangeStart)) classes.push("range-start");
    if (other && isSameDay(date, rangeEnd)) classes.push("range-end");
    if (
      other &&
      isAfter(date, rangeStart) &&
      isBefore(date, rangeEnd) &&
      !isSameDay(date, rangeStart) &&
      !isSameDay(date, rangeEnd)
    ) {
      classes.push("in-range");
    }

    return classes.join(" ");
  };

  // Navigation
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Quick presets. These go through the same min/max/disabled checks as a
  // manual click — otherwise "Last 30 Days" happily emits out-of-bounds dates.
  const applyPreset = (rawStart: Date, rawEnd: Date) => {
    const start = clampToBounds(rawStart);
    const end = clampToBounds(rawEnd);

    if (!start || !end || isAfter(start, end)) {
      setInternalError("That preset falls outside the allowed date range.");
      return;
    }
    if (isDateDisabled(start) || isDateDisabled(end)) {
      setInternalError("That preset starts or ends on an unavailable date.");
      return;
    }

    setStartDate(start);
    setEndDate(end);
    setPendingStart(null);
    setHoverDate(null);
    setSelectionPhase("start");
    setInternalError(null);
    setCurrentMonth(start);
    emitChange(start, end);
    setShowPicker(false);
    setActiveInput(null);
  };

  const presetToday = () => {
    const today = startOfDay(new Date());
    applyPreset(today, today);
  };

  const presetThisWeek = () => {
    const today = new Date();
    applyPreset(startOfWeek(today), startOfDay(endOfWeek(today)));
  };

  const presetThisMonth = () => {
    const today = new Date();
    applyPreset(startOfMonth(today), startOfDay(endOfMonth(today)));
  };

  const presetLast7Days = () => {
    const today = startOfDay(new Date());
    applyPreset(subDays(today, 6), today);
  };

  const presetLast30Days = () => {
    const today = startOfDay(new Date());
    applyPreset(subDays(today, 29), today);
  };

  const clearRange = () => {
    setStartDate(null);
    setEndDate(null);
    setPendingStart(null);
    setHoverDate(null);
    setSelectionPhase("start");
    setActiveInput("start");
    setInternalError(
      required ? "Please select a date range." : null
    );
    emitChange(null, null);
  };

  const openPicker = (input: "start" | "end") => {
    if (disabled) return;
    setShowPicker(true);
    setActiveInput(input);

    if (input === "start") {
      setPendingStart(null);
      setSelectionPhase("start");
      if (startDate) setCurrentMonth(startDate);
      return;
    }

    // Opening on the "To" field with a committed start but no end lets the user
    // finish the range in one click.
    if (startDate && !endDate) {
      setPendingStart(startDate);
      setSelectionPhase("end");
    } else {
      setPendingStart(null);
      setSelectionPhase("start");
    }
    if (endDate) setCurrentMonth(endDate);
    else if (startDate) setCurrentMonth(startDate);
  };

  // Keyboard: the inputs are readOnly, so without this a keyboard user can
  // reach them but has no way to open the calendar.
  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    input: "start" | "end"
  ) => {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      openPicker(input);
    }
  };

  const handleWrapperKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape" || !showPicker) return;
    event.stopPropagation();
    const returnFocusTo = activeInput;
    cancelSelection();
    if (returnFocusTo === "end") endInputRef.current?.focus();
    else startInputRef.current?.focus();
  };

  // Displayed values: while a selection is in progress show the staged start
  // and a blank end, so the fields always describe what the next click does.
  const startFieldValue = formatDate(pendingStart ?? startDate);
  const endFieldValue = pendingStart ? "" : formatDate(endDate);

  return (
    <div
      ref={wrapperRef}
      className={`ihub-daterange-picker-wrapper ${className}`}
      onKeyDown={handleWrapperKeyDown}
    >
      {label && (
        <label className="ihub-datetime-label" htmlFor={startInputId}>
          {label}
          {required && <span className="ihub-required">*</span>}
        </label>
      )}

      {/* Two input fields */}
      <div className="ihub-daterange-inputs">
        <div
          className={`ihub-daterange-input-container ${activeInput === "start" ? "active" : ""}`}
          onClick={() => openPicker("start")}
        >
          <input
            ref={startInputRef}
            id={startInputId}
            type="text"
            className="ihub-datetime-input"
            value={startFieldValue}
            readOnly
            placeholder={placeholder?.start || startLabel}
            disabled={disabled}
            onKeyDown={(e) => handleInputKeyDown(e, "start")}
            aria-label={ariaLabel ? `${ariaLabel} start date` : `${startLabel}`}
            aria-invalid={displayError ? true : undefined}
            aria-describedby={displayError ? errorId : undefined}
          />
          {showCalendarIcon && (
            <div className="ihub-datetime-icons">
              <button
                type="button"
                className="ihub-datetime-icon-btn"
                disabled={disabled}
                aria-label="Open calendar for start date"
                aria-expanded={showPicker && activeInput === "start"}
                onClick={(e) => {
                  e.stopPropagation();
                  openPicker("start");
                }}
              >
                <CalendarMonthOutlinedIcon />
              </button>
            </div>
          )}
        </div>

        <span className="ihub-daterange-separator-arrow" aria-hidden="true">
          &rarr;
        </span>

        <div
          className={`ihub-daterange-input-container ${activeInput === "end" ? "active" : ""}`}
          onClick={() => openPicker("end")}
        >
          <input
            ref={endInputRef}
            id={endInputId}
            type="text"
            className="ihub-datetime-input"
            value={endFieldValue}
            readOnly
            placeholder={placeholder?.end || endLabel}
            disabled={disabled}
            onKeyDown={(e) => handleInputKeyDown(e, "end")}
            aria-label={ariaLabel ? `${ariaLabel} end date` : `${endLabel}`}
            aria-invalid={displayError ? true : undefined}
            aria-describedby={displayError ? errorId : undefined}
          />
          {showCalendarIcon && (
            <div className="ihub-datetime-icons">
              <button
                type="button"
                className="ihub-datetime-icon-btn"
                disabled={disabled}
                aria-label="Open calendar for end date"
                aria-expanded={showPicker && activeInput === "end"}
                onClick={(e) => {
                  e.stopPropagation();
                  openPicker("end");
                }}
              >
                <CalendarMonthOutlinedIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {displayError && (
        <div className="ihub-datetime-error" id={errorId} role="alert">
          {displayError}
        </div>
      )}

      {/* Calendar dropdown */}
      {showPicker && !disabled && (
        <div
          ref={pickerRef}
          className="ihub-datetime-picker-dropdown"
          role="dialog"
          aria-label="Date range picker"
        >
          {/* Phase indicator */}
          <div className="ihub-daterange-phase-indicator">
            {selectionPhase === "start"
              ? "Select start date"
              : "Select end date"}
          </div>

          {/* Calendar */}
          <div className="ihub-datetime-calendar">
            {/* Month navigation */}
            <div className="ihub-datetime-month-nav">
              <button
                type="button"
                onClick={goToPreviousMonth}
                className="ihub-datetime-nav-btn"
                aria-label="Previous month"
              >
                &#8249;
              </button>
              <span className="ihub-datetime-month-year" aria-live="polite">
                {format(currentMonth, "MMMM yyyy")}
              </span>
              <button
                type="button"
                onClick={goToNextMonth}
                className="ihub-datetime-nav-btn"
                aria-label="Next month"
              >
                &#8250;
              </button>
            </div>

            {/* Weekdays */}
            <div className="ihub-datetime-weekdays">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="ihub-datetime-weekday">
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="ihub-datetime-days">
              {calendarDays.map((date, index) => {
                if (!date) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="ihub-datetime-day-empty"
                    />
                  );
                }

                const isSelected = Boolean(
                  (pendingStart && isSameDay(date, pendingStart)) ||
                    (!pendingStart &&
                      ((startDate && isSameDay(date, startDate)) ||
                        (endDate && isSameDay(date, endDate))))
                );
                const isToday = isSameDay(date, new Date());
                const isDayDisabled =
                  isDateDisabled(date) || !isDateInRange(date);
                const rangeClass = getDayRangeClass(date);

                return (
                  <button
                    key={date.getTime()}
                    type="button"
                    className={`ihub-datetime-day ${isSelected ? "selected" : ""} ${isToday ? "today" : ""} ${isDayDisabled ? "disabled" : ""} ${rangeClass}`}
                    onClick={() => handleDateClick(date)}
                    onMouseEnter={() => {
                      if (pendingStart) setHoverDate(date);
                    }}
                    onMouseLeave={() => setHoverDate(null)}
                    onFocus={() => {
                      if (pendingStart) setHoverDate(date);
                    }}
                    disabled={isDayDisabled}
                    aria-label={format(date, "MMMM d, yyyy")}
                    aria-pressed={isSelected}
                    aria-current={isToday ? "date" : undefined}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick presets */}
          {showQuickActions && (
            <div className="ihub-daterange-presets">
              <button
                type="button"
                className="ihub-datetime-action-btn"
                onClick={presetToday}
              >
                Today
              </button>
              <button
                type="button"
                className="ihub-datetime-action-btn"
                onClick={presetThisWeek}
              >
                This Week
              </button>
              <button
                type="button"
                className="ihub-datetime-action-btn"
                onClick={presetThisMonth}
              >
                This Month
              </button>
              <button
                type="button"
                className="ihub-datetime-action-btn"
                onClick={presetLast7Days}
              >
                Last 7 Days
              </button>
              <button
                type="button"
                className="ihub-datetime-action-btn"
                onClick={presetLast30Days}
              >
                Last 30 Days
              </button>
              <button
                type="button"
                className="ihub-datetime-action-btn"
                onClick={clearRange}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hidden inputs for form submission */}
      {name?.start && (
        <input
          type="hidden"
          name={name.start}
          value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
        />
      )}
      {name?.end && (
        <input
          type="hidden"
          name={name.end}
          value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
        />
      )}
    </div>
  );
};

export default DateRangePicker;
