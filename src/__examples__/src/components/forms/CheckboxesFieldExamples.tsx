"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { CheckboxesField } from "../../../../index";

// Example categories data
const categoriesData = {
  "1": { id: "1", title: "Web Development", status: false },
  "2": { id: "2", title: "Mobile Development", status: true },
  "3": { id: "3", title: "UI/UX Design", status: false },
  "4": { id: "4", title: "Data Science", status: false },
  "5": { id: "5", title: "Machine Learning", status: false },
  "6": { id: "6", title: "DevOps", status: false },
};

// Example permissions data
const permissionsData = {
  view: { id: "view", title: "View content", status: true },
  edit: { id: "edit", title: "Edit content", status: false },
  delete: { id: "delete", title: "Delete content", status: false },
  publish: { id: "publish", title: "Publish content", status: false },
};

interface FormData {
  categories: Record<string, boolean>;
  permissions: Record<string, boolean>;
}

interface FormErrors {
  categories?: string;
  permissions?: string;
}

const CheckboxesFieldExample: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    categories: {},
    permissions: {},
  });

  // Form validation state
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initialize form data
  useEffect(() => {
    // Set initial values from the data
    const initialCategories = Object.values(categoriesData).reduce(
      (acc, option) => ({ ...acc, [option.id]: option.status || false }),
      {}
    );

    const initialPermissions = Object.values(permissionsData).reduce(
      (acc, option) => ({ ...acc, [option.id]: option.status || false }),
      {}
    );

    setFormData({
      categories: initialCategories,
      permissions: initialPermissions,
    });
  }, []);

  // Form change handlers
  const handleCategoriesChange = (values: Record<string, boolean>) => {
    setFormData((prev) => ({
      ...prev,
      categories: values,
    }));

    // Clear error when user makes changes
    if (errors.categories) {
      setErrors((prev) => ({ ...prev, categories: undefined }));
    }
  };

  const handlePermissionsChange = (values: Record<string, boolean>) => {
    setFormData((prev) => ({
      ...prev,
      permissions: values,
    }));
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate categories (at least one must be selected)
    if (Object.values(formData.categories).every((value) => !value)) {
      newErrors.categories = "Please select at least one category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted with data:", formData);

      // Get selected options for easier processing
      const selectedCategories = Object.entries(formData.categories)
        .filter(([_, selected]) => selected)
        .map(([id]) => id);

      const selectedPermissions = Object.entries(formData.permissions)
        .filter(([_, selected]) => selected)
        .map(([id]) => id);

      console.log("Selected categories:", selectedCategories);
      console.log("Selected permissions:", selectedPermissions);

      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset the form
  const handleReset = () => {
    // Reset to initial values
    const initialCategories = Object.values(categoriesData).reduce(
      (acc, option) => ({ ...acc, [option.id]: option.status || false }),
      {}
    );

    const initialPermissions = Object.values(permissionsData).reduce(
      (acc, option) => ({ ...acc, [option.id]: option.status || false }),
      {}
    );

    setFormData({
      categories: initialCategories,
      permissions: initialPermissions,
    });

    setErrors({});
    setSubmitted(false);
    setSubmitSuccess(false);
  };

  return (
    <form onSubmit={handleSubmit} className="ihub-example-form">
      <h2 className="ihub-form-title">Course Settings</h2>

      <CheckboxesField
        name="categories"
        label="Course Categories"
        options={categoriesData}
        defaultValues={true}
        required={true}
        error={submitted ? errors.categories : undefined}
        onChange={handleCategoriesChange}
      />

      <CheckboxesField
        name="permissions"
        label="User Permissions"
        options={permissionsData}
        defaultValues={true}
        onChange={handlePermissionsChange}
      />

      <div className="ihub-form-actions">
        <button type="button" className="outlined-btn" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" className="important-btn" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {submitSuccess && (
        <div className="ihub-form-success">Settings saved successfully!</div>
      )}
    </form>
  );
};

export default CheckboxesFieldExample;
