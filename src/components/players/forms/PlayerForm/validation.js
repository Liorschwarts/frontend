export const validatePlayerForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!formData.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  } else {
    const age = new Date().getFullYear() - formData.dateOfBirth.getFullYear();
    if (age < 16 || age > 50) {
      errors.dateOfBirth = "Age must be between 16 and 50";
    }
  }

  if (formData.countryIds.length === 0) {
    errors.countryIds = "At least one nationality is required";
  }

  if (formData.positionIds.length === 0) {
    errors.positionIds = "At least one position is required";
  }

  if (!formData.height || formData.height < 150 || formData.height > 220) {
    errors.height = "Height must be between 150-220 cm";
  }

  return errors;
};
