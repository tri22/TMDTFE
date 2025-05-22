function CardValidate(cardNumber: string): boolean {
  // Remove spaces and dashes
  const sanitizedCardNumber = cardNumber.replace(/[\s-]/g, "");

  // Check if the card number is numeric and has a valid length
  const isNumeric = /^\d+$/.test(sanitizedCardNumber);
  const isValidLength =
    sanitizedCardNumber.length >= 13 && sanitizedCardNumber.length <= 19;

  return isNumeric && isValidLength;
}
export default CardValidate;
