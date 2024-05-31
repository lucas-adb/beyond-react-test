export const validateRequiredField = (string, fieldName) => {
  if (string.trim() === "") return `${fieldName} is required`;
  return "";
};

export const validateMinLength = (string, minLength, fieldName) => {
  if (string.length < minLength)
    return `${fieldName} must have at least ${minLength} characters`;
  return "";
};

export const validateMaxLength = (string, maxLength, fieldName) => {
  if (string.length > maxLength)
    return `${fieldName} must have at most ${maxLength} characters`;
  return "";
};

export const validateTextInputLength = (
  text,
  minLength,
  maxLength,
  fieldName,
) => {
  let error = validateRequiredField(text, fieldName);
  if (error) return error;

  error = validateMinLength(text, minLength, fieldName);
  if (error) return error;

  error = validateMaxLength(text, maxLength, fieldName);
  if (error) return error;

  return "";
};

export const validatePhoneNumberFormat = (phoneNumber) => {
  const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  if (!phoneRegex.test(phoneNumber)) return "Phone number is invalid";
  return "";
};

export const validateFormFields = (form) => {
  let error = validateTextInputLength(form.addressName, 3, 50, "Address Name");
  if (error) return error;

  error = validateTextInputLength(form.fullName, 3, 50, "Full Name");
  if (error) return error;

  error = validatePhoneNumberFormat(form.phone);
  if (error) return error;

  error = validateTextInputLength(form.addressLine, 3, 100, "Address Line");
  if (error) return error;

  if (form.planet === "Earth") {
    error = validateRequiredField(form.country, "Country");
    if (error) return error;

    error = validateRequiredField(form.state, "State");
    if (error) return error;

    error = validateRequiredField(form.city, "City");
    if (error) return error;

    error = validateRequiredField(form.zipCode, "Zip Code");
    if (error) return error;
  }

  if (form.planet === "Mars") {
    error = validateTextInputLength(form.location, 4, 4, "Location");
    if (error) return error;
  }

  return "";
};
