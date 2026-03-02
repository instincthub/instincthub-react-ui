"use client";

import { DateRangePickerPropsType, DateRange } from "@/types";
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
  endOfDay,
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
  const parseDate = (val?: string): Date | null => {
    if (!val) return null;
    try {
      const date = new Date(val);
      return isValid(date) ? startOfDay(date) : null;
    } catch {
      return null;
    }
  };

  // State
  const [startDate, setStartDate] = useState<Date | null>(
    parseDate(value?.startDate)
  );
  const [endDate, setEndDate] = useState<Date | null>(
    parseDate(value?.endDate)
  );
  const [showPicker, setShowPicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startDate || new Date()
  );
  const [selectionPhase, setSelectionPhase] = useState<"start" | "end">(
    "start"
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);
  const [error, setError] = useState<string | null>(errorMessage || null);

  // Refs
  const pickerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync with controlled value
  useEffect(() => {
    if (value) {
      setStartDate(parseDate(value.startDate));
      setEndDate(parseDate(value.endDate));
    }
  }, [value?.startDate, value?.endDate]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
        setActiveInput(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      if (minDate && isBefore(date, startOfDay(new Date(minDate)))) return false;
      if (maxDate && isAfter(date, endOfDay(new Date(maxDate)))) return false;
      return true;
    },
    [minDate, maxDate]
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

    if (selectionPhase === "start") {
      setStartDate(date);
      setEndDate(null);
      setSelectionPhase("end");
      setActiveInput("end");
      setError(null);
    } else {
      // Second click: set end date
      let newStart = startDate;
      let newEnd = date;

      // Auto-swap if end is before start
      if (newStart && isBefore(date, newStart)) {
        newEnd = newStart;
        newStart = date;
        setStartDate(newStart);
      }

      setEndDate(newEnd);
      setSelectionPhase("start");
      setError(null);
      emitChange(newStart, newEnd);
      setShowPicker(false);
      setActiveInput(null);
    }
  };

  // Determine if a day is in the preview range
  const getDayRangeClass = (date: Date): string => {
    const classes: string[] = [];

    const effectiveEnd =
      selectionPhase === "end" && hoverDate ? hoverDate : endDate;
    const effectiveStart = startDate;

    if (!effectiveStart) return "";

    if (isSameDay(date, effectiveStart)) {
      classes.push("range-start");
    }

    if (effectiveEnd && isSameDay(date, effectiveEnd)) {
      classes.push("range-end");
    }

    // In-range: between start and end
    if (effectiveEnd) {
      let rangeStart = effectiveStart;
      let rangeEnd = effectiveEnd;
      if (isBefore(rangeEnd, rangeStart)) {
        rangeStart = effectiveEnd;
        rangeEnd = effectiveStart;
      }
      if (
        isAfter(date, rangeStart) &&
        isBefore(date, rangeEnd) &&
        !isSameDay(date, rangeStart) &&
        !isSameDay(date, rangeEnd)
      ) {
        classes.push("in-range");
      }
    }

    return classes.join(" ");
  };

  // Navigation
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Quick presets
  const applyPreset = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    setSelectionPhase("start");
    setError(null);
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
    applyPreset(startOfWeek(today), endOfWeek(today));
  };

  const presetThisMonth = () => {
    const today = new Date();
    applyPreset(startOfMonth(today), endOfMonth(today));
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
    setSelectionPhase("start");
    setError(null);
    emitChange(null, null);
  };

  const openPicker = (input: "start" | "end") => {
    if (disabled) return;
    setShowPicker(true);
    setActiveInput(input);
    if (input === "start") {
      setSelectionPhase("start");
      if (startDate) setCurrentMonth(startDate);
    } else {
      if (startDate && !endDate) {
        setSelectionPhase("end");
      } else {
        setSelectionPhase("start");
      }
      if (endDate) setCurrentMonth(endDate);
      else if (startDate) setCurrentMonth(startDate);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`ihub-daterange-picker-wrapper ${className}`}
    >
      {label && (
        <label className="ihub-datetime-label" htmlFor={id}>
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
            type="text"
            className="ihub-datetime-input"
            value={formatDate(startDate)}
            readOnly
            placeholder={placeholder?.start || startLabel}
            disabled={disabled}
            aria-label={ariaLabel ? `${ariaLabel} start date` : `${startLabel}`}
          />
          {showCalendarIcon && (
            <div className="ihub-datetime-icons">
              <button
                type="button"
                className="ihub-datetime-icon-btn"
                disabled={disabled}
                aria-label="Open calendar for start date"
                tabIndex={-1}
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
            type="text"
            className="ihub-datetime-input"
            value={formatDate(endDate)}
            readOnly
            placeholder={placeholder?.end || endLabel}
            disabled={disabled}
            aria-label={ariaLabel ? `${ariaLabel} end date` : `${endLabel}`}
          />
          {showCalendarIcon && (
            <div className="ihub-datetime-icons">
              <button
                type="button"
                className="ihub-datetime-icon-btn"
                disabled={disabled}
                aria-label="Open calendar for end date"
                tabIndex={-1}
              >
                <CalendarMonthOutlinedIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="ihub-datetime-error" id={id ? `${id}-error` : undefined}>
          {error}
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
              <span className="ihub-datetime-month-year">
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

                const isSelected =
                  (startDate && isSameDay(date, startDate)) ||
                  (endDate && isSameDay(date, endDate));
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
                      if (selectionPhase === "end") setHoverDate(date);
                    }}
                    onMouseLeave={() => setHoverDate(null)}
                    disabled={isDayDisabled}
                    aria-label={format(date, "MMMM d, yyyy")}
                    aria-selected={isSelected || undefined}
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
