"use client";

import { TimePickerPropsType } from "@/types";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
} from "react";

/**
 * A comprehensive time input component with built-in time picker dropdown, time validation, and optional seconds.
 * Supports both 12-hour and 24-hour formats, keyboard navigation, accessibility features, and time range restrictions.
 * Can be used for time-only input scenarios with customizable step intervals.
 * @example
 * ```tsx
 * <TimePicker
 *   label="Select Time"
 *   value={selectedTime}
 *   onChange={handleTimeChange}
 *   use12Hour={true}
 *   includeSeconds={false}
 *   step={15}
 * />
 * ```
 * @prop {string} label - The label text for the input field
 * @prop {string} value - The current time value in HH:MM or HH:MM:SS format
 * @prop {function} onChange - Callback function called when time changes, receives the new time string
 * @prop {boolean} required - Whether the field is required for form validation
 * @prop {boolean} use12Hour - Whether to use 12-hour format with AM/PM (default: false for 24-hour)
 * @prop {boolean} includeSeconds - Whether to include seconds in time selection
 * @prop {number} step - Time step in minutes for quick selection (default: 1)
 * @prop {string} minTime - Minimum allowed time in HH:MM format
 * @prop {string} maxTime - Maximum allowed time in HH:MM format
 * @prop {string[]} disabledTimes - Array of disabled times in HH:MM format
 * @prop {string} errorMessage - Custom error message to display
 * @prop {string} className - Additional CSS classes to apply
 * @prop {string} name - Name attribute for form submission
 * @prop {string} id - Unique identifier for the input
 * @prop {string} placeholder - Placeholder text for the input
 * @prop {boolean} disabled - Whether the input is disabled
 * @prop {boolean} showTimePicker - Whether to show the time picker dropdown icon
 * @prop {boolean} showQuickActions - Whether to show Now/Clear quick action buttons
 * @prop {string} ariaLabel - Accessibility label for screen readers
 */
const TimePicker: React.FC<TimePickerPropsType> = ({
  label,
  value = "",
  onChange,
  required = false,
  use12Hour = false,
  includeSeconds = false,
  step = 1,
  minTime,
  maxTime,
  disabledTimes = [],
  errorMessage,
  className = "",
  name,
  id,
  placeholder,
  disabled = false,
  showTimePicker = true,
  showQuickActions = true,
  ariaLabel,
}) => {
  // States
  const [inputValue, setInputValue] = useState<string>(value);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(errorMessage || null);
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("00");
  const [ampm, setAmpm] = useState<string>("AM");

  // Refs
  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const hoursInputRef = useRef<HTMLInputElement>(null);
  const minutesInputRef = useRef<HTMLInputElement>(null);
  const secondsInputRef = useRef<HTMLInputElement>(null);

  // Initialize component with value if provided
  useEffect(() => {
    if (value) {
      parseTimeValue(value);
    }
  }, [value, use12Hour]);

  // Handle outside click to close picker
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

  // Parse time value into component parts
  const parseTimeValue = (timeStr: string) => {
    if (!timeStr) return;

    try {
      let timeParts = timeStr.split(":");
      let hourValue = parseInt(timeParts[0]);
      let minuteValue = parseInt(timeParts[1]);
      let secondValue = timeParts[2] ? parseInt(timeParts[2]) : 0;

      if (use12Hour) {
        if (hourValue === 0) {
          setHours("12");
          setAmpm("AM");
        } else if (hourValue < 12) {
          setHours(hourValue.toString().padStart(2, "0"));
          setAmpm("AM");
        } else if (hourValue === 12) {
          setHours("12");
          setAmpm("PM");
        } else {
          setHours((hourValue - 12).toString().padStart(2, "0"));
          setAmpm("PM");
        }
      } else {
        setHours(hourValue.toString().padStart(2, "0"));
      }

      setMinutes(minuteValue.toString().padStart(2, "0"));
      setSeconds(secondValue.toString().padStart(2, "0"));
      setInputValue(timeStr);
    } catch (e) {
      console.warn("Failed to parse time value:", timeStr);
    }
  };

  // Time validation functions
  const isValidTime = (timeStr: string): boolean => {
    const timeRegex = includeSeconds
      ? /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/
      : /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(timeStr);
  };

  const isWithinRange = (timeStr: string): boolean => {
    if (!minTime && !maxTime) return true;

    const timeToMinutes = (time: string): number => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    const inputMinutes = timeToMinutes(timeStr);
    
    if (minTime && inputMinutes < timeToMinutes(minTime)) return false;
    if (maxTime && inputMinutes > timeToMinutes(maxTime)) return false;

    return true;
  };

  const isDisabledTime = (timeStr: string): boolean => {
    return disabledTimes.includes(timeStr);
  };

  const validateTime = (): boolean => {
    setError(null);

    if (required && !inputValue) {
      setError("Time is required");
      return false;
    }

    if (!inputValue) return true;

    if (!isValidTime(inputValue)) {
      setError("Please enter a valid time");
      return false;
    }

    if (!isWithinRange(inputValue)) {
      setError(
        `Time must be between ${minTime || "any"} and ${maxTime || "any"}`
      );
      return false;
    }

    if (isDisabledTime(inputValue)) {
      setError("This time is not available");
      return false;
    }

    return true;
  };

  // Input change handlers
  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newHours = e.target.value.slice(0, 2);
    const maxHour = use12Hour ? 12 : 23;
    
    if (/^\d*$/.test(newHours)) {
      const hourNum = parseInt(newHours);
      if (newHours === "" || (hourNum >= 1 && hourNum <= maxHour) || (newHours === "0" && !use12Hour)) {
        setHours(newHours);
        updateTime(newHours, minutes, seconds, ampm);
        
        if (newHours.length === 2 && minutesInputRef.current) {
          minutesInputRef.current.focus();
        }
      }
    }
  };

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newMinutes = e.target.value.slice(0, 2);
    if (/^\d*$/.test(newMinutes) && (newMinutes === "" || parseInt(newMinutes) <= 59)) {
      setMinutes(newMinutes);
      updateTime(hours, newMinutes, seconds, ampm);
      
      if (newMinutes.length === 2 && includeSeconds && secondsInputRef.current) {
        secondsInputRef.current.focus();
      }
    }
  };

  const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSeconds = e.target.value.slice(0, 2);
    if (/^\d*$/.test(newSeconds) && (newSeconds === "" || parseInt(newSeconds) <= 59)) {
      setSeconds(newSeconds);
      updateTime(hours, minutes, newSeconds, ampm);
    }
  };

  const handleAmPmChange = (newAmPm: string) => {
    setAmpm(newAmPm);
    updateTime(hours, minutes, seconds, newAmPm);
  };

  // Update time from individual fields
  const updateTime = (h: string, m: string, s: string, ap: string) => {
    if (h.length >= 1 && m.length >= 1) {
      let hour24 = parseInt(h.padStart(2, "0"));
      
      if (use12Hour) {
        if (ap === "AM" && hour24 === 12) {
          hour24 = 0;
        } else if (ap === "PM" && hour24 !== 12) {
          hour24 += 12;
        }
      }

      const paddedHours = hour24.toString().padStart(2, "0");
      const paddedMinutes = m.padStart(2, "0");
      const paddedSeconds = s.padStart(2, "0");

      const timeStr = includeSeconds
        ? `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
        : `${paddedHours}:${paddedMinutes}`;

      setInputValue(timeStr);

      if (onChange) {
        onChange(timeStr);
      }
    }
  };

  // Key event handlers
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setShowPicker(!showPicker);
    }

    if (e.key === "Escape") {
      setShowPicker(false);
    }
  };

  // Handle focus/blur events
  const handleFocus = () => {
    // Add any focus logic here
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    validateTime();
  };

  // Quick time setters
  const setCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    const timeStr = includeSeconds
      ? `${hours}:${minutes}:${seconds}`
      : `${hours}:${minutes}`;

    parseTimeValue(timeStr);
    if (onChange) onChange(timeStr);
  };

  const clearTime = () => {
    setHours("");
    setMinutes("");
    setSeconds("00");
    setAmpm("AM");
    setInputValue("");
    if (onChange) onChange("");
  };

  // Generate time options for picker
  const generateTimeOptions = () => {
    const options = [];
    const stepMinutes = step || 1;

    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += stepMinutes) {
        const hour24 = h;
        const minute = m;
        
        let displayHour = hour24;
        let suffix = "";
        
        if (use12Hour) {
          suffix = hour24 < 12 ? " AM" : " PM";
          displayHour = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
        }

        const timeValue = `${hour24.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        const displayTime = `${displayHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}${suffix}`;

        if (!isDisabledTime(timeValue) && isWithinRange(timeValue)) {
          options.push({
            value: timeValue,
            display: displayTime,
          });
        }
      }
    }

    return options;
  };

  const selectTime = (timeValue: string) => {
    parseTimeValue(timeValue);
    if (onChange) onChange(timeValue);
    validateTime();
    setShowPicker(false);
  };

  // Format display time
  const formatDisplayTime = (timeStr: string): string => {
    if (!timeStr) return "";

    try {
      const [h, m, s] = timeStr.split(":");
      const hour24 = parseInt(h);
      
      if (use12Hour) {
        const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
        const suffix = hour24 < 12 ? " AM" : " PM";
        return includeSeconds
          ? `${hour12.toString().padStart(2, "0")}:${m}:${s}${suffix}`
          : `${hour12.toString().padStart(2, "0")}:${m}${suffix}`;
      }
      
      return includeSeconds ? `${h}:${m}:${s}` : `${h}:${m}`;
    } catch (e) {
      return timeStr;
    }
  };

  return (
    <div className="ihub-wrapper">
      <div
        className={`ihub-time-wrapper ihub-value ${className} ${
          error ? "ihub-is_invalid" : ""
        }`}
      >
        <label className="ihub-text-label ihub-fs-sm ihub-text-gunmetal" htmlFor={id || name}>
          {label}
          {required && <span className="ihub-required">*</span>}
        </label>

        <div
          ref={inputRef}
          className={`ihub-time-input-container ${error ? "time-err" : ""}`}
          onClick={() => !disabled && showTimePicker && setShowPicker(true)}
        >
          {/* Hours Input */}
          <input
            ref={hoursInputRef}
            type="text"
            className="ihub-time-input ihub-time-hours"
            value={hours}
            onChange={handleHoursChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="HH"
            maxLength={2}
            disabled={disabled}
            aria-label={`Hours ${ariaLabel || label}`}
            aria-invalid={!!error}
          />
          <span className="ihub-time-separator">:</span>

          {/* Minutes Input */}
          <input
            ref={minutesInputRef}
            type="text"
            className="ihub-time-input"
            value={minutes}
            onChange={handleMinutesChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="MM"
            maxLength={2}
            disabled={disabled}
            aria-label={`Minutes ${ariaLabel || label}`}
            aria-invalid={!!error}
          />

          {/* Seconds Input */}
          {includeSeconds && (
            <>
              <span className="ihub-time-separator">:</span>
              <input
                ref={secondsInputRef}
                type="text"
                className="ihub-time-input"
                value={seconds}
                onChange={handleSecondsChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="SS"
                maxLength={2}
                disabled={disabled}
                aria-label={`Seconds ${ariaLabel || label}`}
              />
            </>
          )}

          {/* AM/PM Toggle */}
          {use12Hour && (
            <div className="ihub-ampm-wrapper">
              <button
                type="button"
                className={`ihub-ampm-btn ${ampm === "AM" ? "active" : ""}`}
                onClick={() => handleAmPmChange("AM")}
                disabled={disabled}
              >
                AM
              </button>
              <button
                type="button"
                className={`ihub-ampm-btn ${ampm === "PM" ? "active" : ""}`}
                onClick={() => handleAmPmChange("PM")}
                disabled={disabled}
              >
                PM
              </button>
            </div>
          )}

          {/* Time picker icon */}
          {showTimePicker && (
            <button
              type="button"
              className="ihub-time-picker-toggle"
              onClick={(e) => {
                e.stopPropagation();
                !disabled && setShowPicker(!showPicker);
              }}
              aria-label="Toggle time picker"
              disabled={disabled}
            >
              <AccessTimeIcon />
            </button>
          )}
        </div>

        {/* Error message */}
        {error && <div className="ihub-error-message">{error}</div>}

        {/* Time picker dropdown */}
        {showPicker && showTimePicker && !disabled && (
          <div
            className="ihub-time-picker-container"
            ref={pickerRef}
            role="listbox"
            aria-label="Choose time"
          >
            <div className="ihub-time-picker-header">
              <span>Select Time</span>
            </div>
            <div className="ihub-time-options-container">
              {generateTimeOptions().map((option, index) => (
                <div
                  key={index}
                  className={`ihub-time-option ${
                    option.value === inputValue ? "selected" : ""
                  }`}
                  onClick={() => selectTime(option.value)}
                  role="option"
                  aria-selected={option.value === inputValue}
                >
                  {option.display}
                </div>
              ))}
            </div>
            
            {/* Quick actions in picker */}
            {showQuickActions && (
              <div className="ihub-time-picker-actions">
                <button
                  className="ihub-time-action-btn"
                  onClick={setCurrentTime}
                  type="button"
                >
                  Now
                </button>
                <button
                  className="ihub-time-action-btn"
                  onClick={clearTime}
                  type="button"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick action links */}
      {showQuickActions && !disabled && (
        <div className="ihub-auto-time ihub-time-picker-action">
          <span className="ihub-set-now ihub-fs-sm" onClick={setCurrentTime}>
            Now
          </span>
          <span className="ihub-separator ihub-fs-sm">|</span>
          <span className="ihub-clear-time ihub-fs-sm" onClick={clearTime}>
            Clear
          </span>
        </div>
      )}

      {/* Hidden input */}
      {name && <input type="hidden" name={name} value={inputValue} />}
    </div>
  );
};

export default TimePicker;