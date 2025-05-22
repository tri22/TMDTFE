// useFormValidation.ts
import { EmailValidator, Phonevalidator } from "@/validate";

export const FormValidation = (initialState: any) => {
  if (
    Phonevalidator(initialState.phone) &&
    EmailValidator(initialState.email)
  ) {
    return true;
  }
  return false;
};
export default FormValidation;
