
"use client"

import React, { useState } from "react";
import { RadioButton, RadioGroup } from "../../../../index";

/**
 * Form data interface for the example form
 */
interface FormData {
  gender: string;
  notification: string;
  experience: string;
}

/**
 * Example component showing how to use the Radio components in a form
 */
const RadioButtonExample: React.FC = () => {
  // Form data state
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    notification: "",
    experience: "",
  });

  // Form validation errors
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Form submission state
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Handle input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if it exists
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const newErrors: Partial<FormData> = {};

    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    if (!formData.notification) {
      newErrors.notification = "Please select a notification preference";
    }

    if (!formData.experience) {
      newErrors.experience = "Please select your experience level";
    }

    // If there are errors, display them and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Form submission successful
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  return (
    <div className="ihub-radio-example">
      <h2>Radio Button Example Form</h2>

      {isSubmitted ? (
        <div className="ihub-form-success">
          <h3>Form Submitted Successfully!</h3>
          <p>Your preferences have been saved:</p>
          <ul>
            <li>
              <strong>Gender:</strong> {formData.gender}
            </li>
            <li>
              <strong>Notifications:</strong> {formData.notification}
            </li>
            <li>
              <strong>Experience:</strong> {formData.experience}
            </li>
          </ul>
          <button
            type="button"
            className="ihub-important-btn"
            onClick={() => setIsSubmitted(false)}
          >
            Edit Preferences
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Gender selection using RadioGroup */}
          <RadioGroup
            label="Gender"
            name="gender"
            options={[
              { id: "gender-male", value: "male", label: "Male" },
              { id: "gender-female", value: "female", label: "Female" },
              { id: "gender-other", value: "other", label: "Other" },
              {
                id: "gender-prefer-not",
                value: "prefer-not-to-say",
                label: "Prefer not to say",
              },
            ]}
            selectedValue={formData.gender}
            onChange={handleChange}
            required
            error={errors.gender}
            inline
            description="This information helps us personalize your experience"
          />

          {/* Notification preferences using individual RadioButtons */}
          <fieldset className="ihub-form-section ihub-p-5">
            <legend>Notification Preferences</legend>

            <RadioButton
              id="notification-all"
              name="notification"
              value="all"
              label="All notifications"
              checked={formData.notification === "all"}
              onChange={handleChange}
              required
              error={errors.notification}
              helpText="Receive updates about everything"
            />

            <RadioButton
              id="notification-important"
              name="notification"
              value="important"
              label="Important notifications only"
              checked={formData.notification === "important"}
              onChange={handleChange}
              required
              helpText="Only receive critical updates"
            />

            <RadioButton
              id="notification-none"
              name="notification"
              value="none"
              label="No notifications"
              checked={formData.notification === "none"}
              onChange={handleChange}
              required
              helpText="Opt out of all notifications"
            />
          </fieldset>

          {/* Experience level using RadioGroup with a disabled option */}
          <RadioGroup
            label="Experience Level"
            name="experience"
            options={[
              { id: "exp-beginner", value: "beginner", label: "Beginner" },
              {
                id: "exp-intermediate",
                value: "intermediate",
                label: "Intermediate",
              },
              { id: "exp-advanced", value: "advanced", label: "Advanced" },
              {
                id: "exp-expert",
                value: "expert",
                label: "Expert",
                disabled: true,
                helpText: "Coming soon",
              },
            ]}
            selectedValue={formData.experience}
            onChange={handleChange}
            required
            error={errors.experience}
          />

          <div className="ihub-form-actions">
            <button type="submit" className="ihub-important-btn">
              Save Preferences
            </button>

            <button
              type="button"
              className="ihub-outlined-btn"
              onClick={() => {
                setFormData({ gender: "", notification: "", experience: "" });
                setErrors({});
              }}
            >
              Reset Form
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RadioButtonExample;
