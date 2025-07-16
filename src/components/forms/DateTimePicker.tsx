"use client";

import { DateTimePickerPropsType } from "@/types";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
  useCallback,
} from "react";
import {
  format,
  parse,
  isValid,
  isBefore,
  isAfter,
  startOfDay,
  endOfDay,
  addMonths,
  subMonths,
  getDaysInMonth,
  startOfMonth,
  getDay,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isWithinInterval,
  isSameDay,
} from "date-fns";

/**
 * A modern date and time picker component that combines calendar-based date selection
 * with time input in a single unified interface. Supports various formats, locales,
 * validation, and accessibility features.
 * @example
 * ```tsx
 * <DateTimePicker
 *   label="Schedule Meeting"
 *   value={selectedDateTime}
 *   onChange={handleDateTimeChange}
 *   minDate="2024-01-01"
 *   maxDate="2024-12-31"
 *   use12Hour={true}
 * />
 * ```
 * @prop {string} label - The label text for the input field
 * @prop {string} value - The current datetime value in ISO format (YYYY-MM-DDTHH:mm:ss)
 * @prop {function} onChange - Callback function called when datetime changes
 * @prop {boolean} required - Whether the field is required for form validation
 * @prop {string} minDate - Minimum allowed date in ISO format
 * @prop {string} maxDate - Maximum allowed date in ISO format
 * @prop {string} minTime - Minimum allowed time in HH:mm format
 * @prop {string} maxTime - Maximum allowed time in HH:mm format
 * @prop {string[]} disabledDates - Array of disabled dates in ISO format
 * @prop {string[]} disabledTimes - Array of disabled times in HH:mm format
 * @prop {boolean} use12Hour - Whether to use 12-hour format (default: false)
 * @prop {boolean} includeSeconds - Whether to include seconds in time selection
 * @prop {number} timeStep - Time step in minutes for time selection (default: 30)
 * @prop {string} dateFormat - Date display format (default: "yyyy-MM-dd")
 * @prop {string} timeFormat - Time display format (default: "HH:mm")
 * @prop {string} locale - Locale for date formatting (default: "en-US")
 * @prop {string} placeholder - Placeholder text for the input
 * @prop {string} errorMessage - Custom error message to display
 * @prop {string} className - Additional CSS classes to apply
 * @prop {string} name - Name attribute for form submission
 * @prop {string} id - Unique identifier for the input
 * @prop {boolean} disabled - Whether the input is disabled
 * @prop {boolean} showCalendarIcon - Whether to show the calendar icon
 * @prop {boolean} showTimeIcon - Whether to show the time icon
 * @prop {boolean} showQuickActions - Whether to show quick action buttons
 * @prop {string} ariaLabel - Accessibility label for screen readers
 * @prop {boolean} autoFocus - Whether to focus the input on mount
 * @prop {function} onFocus - Focus event handler
 * @prop {function} onBlur - Blur event handler
 */
const DateTimePicker: React.FC<DateTimePickerPropsType> = ({
  label,
  value = "",
  onChange,
  required = false,
  minDate,
  maxDate,
  minTime,
  maxTime,
  disabledDates = [],
  disabledTimes = [],
  use12Hour = false,
  includeSeconds = false,
  timeStep = 30,
  dateFormat = "yyyy-MM-dd",
  timeFormat = use12Hour ? "hh:mm a" : "HH:mm",
  locale = "en-US",
  placeholder,
  errorMessage,
  className = "",
  name,
  id,
  disabled = false,
  showCalendarIcon = true,
  showTimeIcon = true,
  showQuickActions = true,
  ariaLabel,
  autoFocus = false,
  onFocus,
  onBlur,
}) => {
  // Parse initial value
  const parseInitialValue = (val: string): Date | null => {
    if (!val) return null;
    try {
      const date = new Date(val);
      return isValid(date) ? date : null;
    } catch {
      return null;
    }
  };

  // States
  const [selectedDate, setSelectedDate] = useState<Date | null>(parseInitialValue(value));
  const [inputValue, setInputValue] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<"calendar" | "time">("calendar");
  const [error, setError] = useState<string | null>(errorMessage || null);
  
  // Calendar states
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate || new Date()
  );
  
  // Time states
  const [tempHours, setTempHours] = useState<string>(
    selectedDate ? format(selectedDate, "HH") : "00"
  );
  const [tempMinutes, setTempMinutes] = useState<string>(
    selectedDate ? format(selectedDate, "mm") : "00"
  );
  const [tempSeconds, setTempSeconds] = useState<string>(
    selectedDate ? format(selectedDate, "ss") : "00"
  );
  const [tempAmPm, setTempAmPm] = useState<"AM" | "PM">(
    selectedDate && selectedDate.getHours() >= 12 ? "PM" : "AM"
  );

  // Refs
  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update time states when selected date changes
  useEffect(() => {
    if (selectedDate) {
      setTempHours(format(selectedDate, "HH"));
      setTempMinutes(format(selectedDate, "mm"));
      setTempSeconds(format(selectedDate, "ss"));
      setTempAmPm(selectedDate.getHours() >= 12 ? "PM" : "AM");
    }
  }, [selectedDate]);

  // Update input value when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      const parsedDate = parseInitialValue(value);
      setSelectedDate(parsedDate);
      if (!isInputFocused) {
        setInputValue(parsedDate ? formatDisplayValue(parsedDate) : "");
      }
    }
  }, [value, isInputFocused]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Format display value
  const formatDisplayValue = (date?: Date): string => {
    const dateToFormat = date || selectedDate;
    if (!dateToFormat) return "";
    
    try {
      const dateStr = format(dateToFormat, dateFormat);
      const timeStr = includeSeconds
        ? format(dateToFormat, timeFormat)
        : format(dateToFormat, timeFormat.replace(":ss", ""));
      
      return `${dateStr} ${timeStr}`;
    } catch {
      return "";
    }
  };

  // Validation functions
  const isDateDisabled = (date: Date): boolean => {
    const dateStr = format(date, "yyyy-MM-dd");
    return disabledDates.includes(dateStr);
  };

  const isDateInRange = (date: Date): boolean => {
    if (minDate && isBefore(date, startOfDay(new Date(minDate)))) return false;
    if (maxDate && isAfter(date, endOfDay(new Date(maxDate)))) return false;
    return true;
  };

  const isTimeInRange = (hours: number, minutes: number): boolean => {
    if (!minTime && !maxTime) return true;
    
    const timeMinutes = hours * 60 + minutes;
    
    if (minTime) {
      const [minH, minM] = minTime.split(":").map(Number);
      if (timeMinutes < minH * 60 + minM) return false;
    }
    
    if (maxTime) {
      const [maxH, maxM] = maxTime.split(":").map(Number);
      if (timeMinutes > maxH * 60 + maxM) return false;
    }
    
    return true;
  };

  const isTimeDisabled = (hours: number, minutes: number): boolean => {
    const timeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    return disabledTimes.includes(timeStr);
  };

  // Validate complete datetime
  const validateDateTime = useCallback((): boolean => {
    setError(null);

    if (required && !selectedDate) {
      setError("Date and time are required");
      return false;
    }

    if (!selectedDate) return true;

    if (!isDateInRange(selectedDate)) {
      setError("Selected date is outside allowed range");
      return false;
    }

    if (isDateDisabled(selectedDate)) {
      setError("Selected date is not available");
      return false;
    }

    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();

    if (!isTimeInRange(hours, minutes)) {
      setError("Selected time is outside allowed range");
      return false;
    }

    if (isTimeDisabled(hours, minutes)) {
      setError("Selected time is not available");
      return false;
    }

    return true;
  }, [selectedDate, required, minDate, maxDate, minTime, maxTime, disabledDates, disabledTimes]);

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date) || !isDateInRange(date)) return;

    let newDateTime = date;
    
    // Preserve time if already selected
    if (selectedDate) {
      newDateTime = setHours(date, selectedDate.getHours());
      newDateTime = setMinutes(newDateTime, selectedDate.getMinutes());
      newDateTime = setSeconds(newDateTime, selectedDate.getSeconds());
    } else {
      // Set to current time if no time selected
      const now = new Date();
      newDateTime = setHours(date, now.getHours());
      newDateTime = setMinutes(newDateTime, now.getMinutes());
      newDateTime = setSeconds(newDateTime, 0);
    }

    setSelectedDate(newDateTime);
    setCurrentMonth(newDateTime);
    
    // Switch to time view after date selection
    setActiveView("time");
  };

  // Handle time selection
  const handleTimeSelect = () => {
    if (!selectedDate) {
      // If no date selected, use today
      const today = new Date();
      handleDateSelect(today);
      return;
    }

    let hours = parseInt(tempHours);
    const minutes = parseInt(tempMinutes);
    const seconds = includeSeconds ? parseInt(tempSeconds) : 0;

    // Convert to 24-hour format if needed
    if (use12Hour) {
      if (tempAmPm === "PM" && hours !== 12) {
        hours += 12;
      } else if (tempAmPm === "AM" && hours === 12) {
        hours = 0;
      }
    }

    if (isTimeDisabled(hours, minutes) || !isTimeInRange(hours, minutes)) {
      setError("Selected time is not available");
      return;
    }

    let newDateTime = setHours(selectedDate, hours);
    newDateTime = setMinutes(newDateTime, minutes);
    newDateTime = setSeconds(newDateTime, seconds);

    setSelectedDate(newDateTime);
    
    // Update parent component
    const isoString = newDateTime.toISOString();
    onChange?.(isoString);
    
    // Close picker after time selection
    setShowPicker(false);
    setError(null);
  };

  // Calendar navigation
  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = startOfMonth(currentMonth);
    const startingDayOfWeek = getDay(firstDay);
    const daysInMonth = getDaysInMonth(currentMonth);

    const days: (Date | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Generate time options
  const generateTimeOptions = () => {
    const options: { hours: number; minutes: number; display: string }[] = [];
    
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += timeStep) {
        if (!isTimeDisabled(h, m) && isTimeInRange(h, m)) {
          let displayHour = h;
          let suffix = "";
          
          if (use12Hour) {
            suffix = h < 12 ? " AM" : " PM";
            displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
          }
          
          const display = `${displayHour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}${suffix}`;
          options.push({ hours: h, minutes: m, display });
        }
      }
    }
    
    return options;
  };

  // Parse input with multiple format attempts
  const parseInput = (input: string): Date | null => {
    if (!input.trim()) return null;

    // Common formats to try
    const formats = [
      // Standard formats
      `${dateFormat} ${timeFormat}`,
      `${dateFormat} ${timeFormat.replace(":ss", "")}`,
      // ISO formats
      "yyyy-MM-dd HH:mm:ss",
      "yyyy-MM-dd HH:mm",
      "yyyy-MM-dd'T'HH:mm:ss",
      "yyyy-MM-dd'T'HH:mm",
      // Common US formats
      "MM/dd/yyyy HH:mm",
      "MM/dd/yyyy hh:mm a",
      "MM-dd-yyyy HH:mm",
      "MM-dd-yyyy hh:mm a",
      // European formats
      "dd/MM/yyyy HH:mm",
      "dd/MM/yyyy hh:mm a",
      "dd-MM-yyyy HH:mm",
      "dd-MM-yyyy hh:mm a",
      // Date only formats (will use current time)
      "yyyy-MM-dd",
      "MM/dd/yyyy",
      "dd/MM/yyyy",
      "MM-dd-yyyy",
      "dd-MM-yyyy",
    ];

    // Try parsing with each format
    for (const fmt of formats) {
      try {
        const parsed = parse(input, fmt, new Date());
        if (isValid(parsed)) {
          return parsed;
        }
      } catch {
        // Continue to next format
      }
    }

    // Try native Date parsing as fallback
    try {
      const parsed = new Date(input);
      if (isValid(parsed)) {
        return parsed;
      }
    } catch {
      // Fall through to return null
    }

    return null;
  };

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    
    if (!newInputValue.trim()) {
      setSelectedDate(null);
      onChange?.("");
      setError(null);
      return;
    }

    // Try to parse the input (but don't show errors while typing)
    const parsed = parseInput(newInputValue);
    if (parsed) {
      setSelectedDate(parsed);
      onChange?.(parsed.toISOString());
      setError(null);
    }
    // Don't set error while typing - only on blur
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setShowPicker(!showPicker);
    }

    if (e.key === "Escape") {
      setShowPicker(false);
    }

    if (e.key === "Tab" && showPicker) {
      // Allow tab navigation within picker
      e.stopPropagation();
    }
  };

  // Quick actions
  const setToday = () => {
    const now = new Date();
    setSelectedDate(now);
    setCurrentMonth(now);
    onChange?.(now.toISOString());
    setError(null);
  };

  const clearDateTime = () => {
    setSelectedDate(null);
    setTempHours("00");
    setTempMinutes("00");
    setTempSeconds("00");
    setTempAmPm("AM");
    onChange?.("");
    setError(null);
  };

  // Focus handlers
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsInputFocused(true);
    // Show raw value for editing
    if (selectedDate && !inputValue) {
      setInputValue(formatDisplayValue());
    }
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsInputFocused(false);
    
    // Validate input on blur
    if (inputValue.trim()) {
      const parsed = parseInput(inputValue);
      if (parsed) {
        setSelectedDate(parsed);
        onChange?.(parsed.toISOString());
        setInputValue(formatDisplayValue(parsed));
        setError(null);
      } else {
        setError("Invalid date/time format");
      }
    } else if (required) {
      setError("Date and time are required");
    } else {
      setError(null);
    }
    
    validateDateTime();
    onBlur?.(e);
  };

  return (
    <div className={`ihub-datetime-picker-wrapper ${className}`}>
      <div className={`ihub-datetime-picker ${error ? "ihub-error" : ""}`}>
        <label
          className="ihub-datetime-label"
          htmlFor={id || name}
        >
          {label}
          {required && <span className="ihub-required">*</span>}
        </label>

        <div className="ihub-datetime-input-container">
          <input
            ref={inputRef}
            type="text"
            className="ihub-datetime-input"
            value={isInputFocused ? inputValue : formatDisplayValue()}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || `${dateFormat} ${timeFormat}`}
            disabled={disabled}
            required={required}
            name={name}
            id={id}
            aria-label={ariaLabel || label}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            autoFocus={autoFocus}
          />

          <div className="ihub-datetime-icons">
            {showCalendarIcon && (
              <button
                type="button"
                className="ihub-datetime-icon-btn"
                onClick={() => {
                  if (!disabled) {
                    setShowPicker(true);
                    setActiveView("calendar");
                  }
                }}
                disabled={disabled}
                aria-label="Open calendar"
              >
                <CalendarMonthOutlinedIcon />
              </button>
            )}

            {showTimeIcon && (
              <button
                type="button"
                className="ihub-datetime-icon-btn"
                onClick={() => {
                  if (!disabled) {
                    setShowPicker(true);
                    setActiveView("time");
                  }
                }}
                disabled={disabled}
                aria-label="Open time picker"
              >
                <AccessTimeIcon />
              </button>
            )}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div id={`${id}-error`} className="ihub-datetime-error">
            {error}
          </div>
        )}

        {/* Picker dropdown */}
        {showPicker && !disabled && (
          <div
            ref={pickerRef}
            className="ihub-datetime-picker-dropdown"
            role="dialog"
            aria-label="Date and time picker"
          >
            {/* View tabs */}
            <div className="ihub-datetime-tabs">
              <button
                className={`ihub-datetime-tab ${activeView === "calendar" ? "active" : ""}`}
                onClick={() => setActiveView("calendar")}
                type="button"
              >
                Date
              </button>
              <button
                className={`ihub-datetime-tab ${activeView === "time" ? "active" : ""}`}
                onClick={() => setActiveView("time")}
                type="button"
              >
                Time
              </button>
            </div>

            {/* Calendar view */}
            {activeView === "calendar" && (
              <div className="ihub-datetime-calendar">
                {/* Month navigation */}
                <div className="ihub-datetime-month-nav">
                  <button
                    type="button"
                    onClick={goToPreviousMonth}
                    className="ihub-datetime-nav-btn"
                    aria-label="Previous month"
                  >
                    ‹
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
                    ›
                  </button>
                </div>

                {/* Weekday headers */}
                <div className="ihub-datetime-weekdays">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="ihub-datetime-weekday">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="ihub-datetime-days">
                  {generateCalendarDays().map((date, index) => {
                    if (!date) {
                      return <div key={`empty-${index}`} className="ihub-datetime-day-empty" />;
                    }

                    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
                    const isToday = isSameDay(date, new Date());
                    const isDisabled = isDateDisabled(date) || !isDateInRange(date);

                    return (
                      <button
                        key={date.getTime()}
                        type="button"
                        className={`ihub-datetime-day ${isSelected ? "selected" : ""} ${
                          isToday ? "today" : ""
                        } ${isDisabled ? "disabled" : ""}`}
                        onClick={() => handleDateSelect(date)}
                        disabled={isDisabled}
                        aria-label={format(date, "MMMM d, yyyy")}
                        aria-selected={isSelected ? true : undefined}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Time view */}
            {activeView === "time" && (
              <div className="ihub-datetime-time">
                <div className="ihub-datetime-time-inputs">
                  {/* Hours */}
                  <div className="ihub-datetime-time-group">
                    <label>Hours</label>
                    <input
                      type="text"
                      className="ihub-datetime-time-input"
                      value={use12Hour ? (parseInt(tempHours) % 12 || 12).toString().padStart(2, "0") : tempHours}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (use12Hour && parseInt(val) <= 12) {
                          setTempHours(val);
                        } else if (!use12Hour && parseInt(val) < 24) {
                          setTempHours(val);
                        }
                      }}
                      maxLength={2}
                      placeholder="HH"
                    />
                  </div>

                  <span className="ihub-datetime-time-separator">:</span>

                  {/* Minutes */}
                  <div className="ihub-datetime-time-group">
                    <label>Minutes</label>
                    <input
                      type="text"
                      className="ihub-datetime-time-input"
                      value={tempMinutes}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (parseInt(val) < 60) {
                          setTempMinutes(val);
                        }
                      }}
                      maxLength={2}
                      placeholder="MM"
                    />
                  </div>

                  {/* Seconds */}
                  {includeSeconds && (
                    <>
                      <span className="ihub-datetime-time-separator">:</span>
                      <div className="ihub-datetime-time-group">
                        <label>Seconds</label>
                        <input
                          type="text"
                          className="ihub-datetime-time-input"
                          value={tempSeconds}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            if (parseInt(val) < 60) {
                              setTempSeconds(val);
                            }
                          }}
                          maxLength={2}
                          placeholder="SS"
                        />
                      </div>
                    </>
                  )}

                  {/* AM/PM */}
                  {use12Hour && (
                    <div className="ihub-datetime-ampm">
                      <button
                        type="button"
                        className={`ihub-datetime-ampm-btn ${tempAmPm === "AM" ? "active" : ""}`}
                        onClick={() => setTempAmPm("AM")}
                      >
                        AM
                      </button>
                      <button
                        type="button"
                        className={`ihub-datetime-ampm-btn ${tempAmPm === "PM" ? "active" : ""}`}
                        onClick={() => setTempAmPm("PM")}
                      >
                        PM
                      </button>
                    </div>
                  )}
                </div>

                {/* Time options list */}
                <div className="ihub-datetime-time-list">
                  <div className="ihub-datetime-time-list-header">Quick select:</div>
                  <div className="ihub-datetime-time-options">
                    {generateTimeOptions().map((option, index) => {
                      const isSelected = 
                        selectedDate &&
                        selectedDate.getHours() === option.hours &&
                        selectedDate.getMinutes() === option.minutes;

                      return (
                        <button
                          key={index}
                          type="button"
                          className={`ihub-datetime-time-option ${isSelected ? "selected" : ""}`}
                          onClick={() => {
                            setTempHours(option.hours.toString().padStart(2, "0"));
                            setTempMinutes(option.minutes.toString().padStart(2, "0"));
                            if (use12Hour) {
                              setTempAmPm(option.hours >= 12 ? "PM" : "AM");
                            }
                          }}
                        >
                          {option.display}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Apply time button */}
                <div className="ihub-datetime-time-actions">
                  <button
                    type="button"
                    className="ihub-datetime-apply-btn"
                    onClick={handleTimeSelect}
                  >
                    Apply Time
                  </button>
                </div>
              </div>
            )}

            {/* Quick actions */}
            {showQuickActions && (
              <div className="ihub-datetime-actions">
                <button
                  type="button"
                  className="ihub-datetime-action-btn"
                  onClick={setToday}
                >
                  Now
                </button>
                <button
                  type="button"
                  className="ihub-datetime-action-btn"
                  onClick={clearDateTime}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick action links */}
      {showQuickActions && !disabled && !showPicker && (
        <div className="ihub-datetime-quick-links">
          <span className="ihub-datetime-link" onClick={setToday}>
            Now
          </span>
          <span className="ihub-datetime-separator">|</span>
          <span className="ihub-datetime-link" onClick={clearDateTime}>
            Clear
          </span>
        </div>
      )}

      {/* Hidden input for form submission */}
      {name && <input type="hidden" name={name} value={selectedDate?.toISOString() || ""} />}
    </div>
  );
};

export default DateTimePicker;