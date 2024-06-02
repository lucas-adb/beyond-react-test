import { expect, test } from "vitest";
import {
  validateRequiredField,
  validateMinLength,
  validateMaxLength,
  validateTextInputLength,
  validatePhoneNumberFormat,
  validateFormFields,
} from "../validations/formValidation";

test("validateRequiredField", () => {
  expect(validateRequiredField(" ", "Test")).toBe("Test is required");
  expect(validateRequiredField("Hello", "Test")).toBe("");
});

test("validateMinLength", () => {
  expect(validateMinLength("Hi", 3, "Test")).toBe(
    "Test must have at least 3 characters",
  );
  expect(validateMinLength("Hello", 3, "Test")).toBe("");
});

test("validateMaxLength", () => {
  expect(validateMaxLength("Hello world", 5, "Test")).toBe(
    "Test must have at most 5 characters",
  );
  expect(validateMaxLength("Hello", 10, "Test")).toBe("");
});

test("validateTextInputLength", () => {
  expect(validateTextInputLength("Hi", 3, 5, "Test")).toBe(
    "Test must have at least 3 characters",
  );
  expect(validateTextInputLength("Hello world", 3, 5, "Test")).toBe(
    "Test must have at most 5 characters",
  );
  expect(validateTextInputLength("Hello", 3, 10, "Test")).toBe("");
});

test("validatePhoneNumberFormat", () => {
  expect(validatePhoneNumberFormat("123456")).toBe("Phone number is invalid");
  expect(validatePhoneNumberFormat("1234567890")).toBe("Phone number is invalid");
  expect(validatePhoneNumberFormat("123-456-7890")).toBe("Phone number is invalid");
  expect(validatePhoneNumberFormat("(123) 456-7890")).toBe("Phone number is invalid");
  expect(validatePhoneNumberFormat("Hello World")).toBe(
    "Phone number is invalid",
  );
  expect(validatePhoneNumberFormat("+1234567890")).toBe("");
});

test("validateFormFields", () => {
  const earthForm = {
    addressName: "Home",
    fullName: "Lucas Alves",
    phone: "+55992929292",
    addressLine: "Rua Jatai",
    planet: "Earth",
    country: "BR",
    state: "GO",
    city: "Goiânia",
    zipCode: "74675400",
    location: "",
  };

  const marsForm = {
    addressName: "Mars Base I",
    fullName: "Lucas Alves",
    phone: "+55992929292",
    addressLine: "Red street",
    planet: "Mars",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    location: "6666",
  };

  const invalidForm = {
    addressName: "Mars Base I",
    fullName: "Lucas Alves",
    phone: "+55992929292",
    addressLine: "",
    planet: "Mars",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    location: "6666",
  };

  expect(validateFormFields(earthForm)).toBe("");
  expect(validateFormFields(marsForm)).toBe("");
  expect(validateFormFields(invalidForm)).toBe("Address Line is required");
});
