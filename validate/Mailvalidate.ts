const EmailValidator = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return true;
};

export default EmailValidator;
