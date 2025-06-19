const PhoneValidator = (value: string): boolean => {
  const phoneRegex = /^\d{10}$/; // Adjust regex as per your requirement

  return phoneRegex.test(value);
};
export default PhoneValidator;
