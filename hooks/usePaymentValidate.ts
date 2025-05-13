// useFormValidation.ts
import { EmailValidator, Phonevalidator } from "@/validate";
import { useState } from "react";

export const useFormValidation = (initialState: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (
    Phonevalidator(initialState.phone) &&
    EmailValidator(initialState.email)
  ) {
    setIsSubmitting((pre) => true);
  }

  return {
    isSubmitting,
  };
};
export default useFormValidation;
