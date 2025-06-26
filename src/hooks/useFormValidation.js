import { useState, useCallback } from "react";

const useFormValidation = (validationRules = {}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validate a single field
  const validateField = useCallback(
    (fieldName, value, rules = validationRules[fieldName]) => {
      if (!rules) return null;

      // Required validation
      if (
        rules.required &&
        (!value || (Array.isArray(value) && value.length === 0))
      ) {
        return rules.required.message || `${fieldName} is required`;
      }

      // Min length validation
      if (rules.minLength && value && value.length < rules.minLength.value) {
        return (
          rules.minLength.message ||
          `${fieldName} must be at least ${rules.minLength.value} characters`
        );
      }

      // Max length validation
      if (rules.maxLength && value && value.length > rules.maxLength.value) {
        return (
          rules.maxLength.message ||
          `${fieldName} must be no more than ${rules.maxLength.value} characters`
        );
      }

      // Min value validation
      if (rules.min && value !== undefined && value < rules.min.value) {
        return (
          rules.min.message ||
          `${fieldName} must be at least ${rules.min.value}`
        );
      }

      // Max value validation
      if (rules.max && value !== undefined && value > rules.max.value) {
        return (
          rules.max.message ||
          `${fieldName} must be no more than ${rules.max.value}`
        );
      }

      // Custom validation
      if (rules.custom && typeof rules.custom === "function") {
        const customResult = rules.custom(value);
        if (customResult !== true) {
          return customResult;
        }
      }

      // Pattern validation
      if (rules.pattern && value && !rules.pattern.value.test(value)) {
        return rules.pattern.message || `${fieldName} format is invalid`;
      }

      return null;
    },
    [validationRules]
  );

  // Validate all fields
  const validateForm = useCallback(
    (formData) => {
      const newErrors = {};
      let isValid = true;

      Object.keys(validationRules).forEach((fieldName) => {
        const error = validateField(fieldName, formData[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);
      return isValid;
    },
    [validateField, validationRules]
  );

  // Mark field as touched
  const touchField = useCallback((fieldName) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  }, []);

  // Validate and update error for single field
  const validateAndSetError = useCallback(
    (fieldName, value) => {
      const error = validateField(fieldName, value);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
      return !error;
    },
    [validateField]
  );

  // Clear error for specific field
  const clearFieldError = useCallback((fieldName) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  // Get error for specific field
  const getFieldError = useCallback(
    (fieldName) => {
      return errors[fieldName] || null;
    },
    [errors]
  );

  // Check if field has error
  const hasFieldError = useCallback(
    (fieldName) => {
      return Boolean(errors[fieldName]);
    },
    [errors]
  );

  // Check if form has any errors
  const hasErrors = Object.keys(errors).length > 0;

  // Check if field is touched
  const isFieldTouched = useCallback(
    (fieldName) => {
      return Boolean(touched[fieldName]);
    },
    [touched]
  );

  return {
    // State
    errors,
    touched,
    hasErrors,

    // Validation methods
    validateField,
    validateForm,
    validateAndSetError,

    // Field management
    touchField,
    clearFieldError,
    clearErrors,
    getFieldError,
    hasFieldError,
    isFieldTouched,
  };
};

// Common validation rules for player forms
export const playerValidationRules = {
  firstName: {
    required: { message: "First name is required" },
    minLength: {
      value: 2,
      message: "First name must be at least 2 characters",
    },
    maxLength: {
      value: 50,
      message: "First name must be no more than 50 characters",
    },
  },
  lastName: {
    required: { message: "Last name is required" },
    minLength: { value: 2, message: "Last name must be at least 2 characters" },
    maxLength: {
      value: 50,
      message: "Last name must be no more than 50 characters",
    },
  },
  dateOfBirth: {
    required: { message: "Date of birth is required" },
    custom: (value) => {
      if (!value) return true;
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      if (age < 16) return "Player must be at least 16 years old";
      if (age > 50) return "Player must be no more than 50 years old";
      return true;
    },
  },
  height: {
    required: { message: "Height is required" },
    min: { value: 150, message: "Height must be at least 150 cm" },
    max: { value: 220, message: "Height must be no more than 220 cm" },
  },
  positions: {
    required: { message: "At least one position is required" },
  },
  nationalities: {
    required: { message: "At least one nationality is required" },
  },
};

export default useFormValidation;
