import { toast } from "react-hot-toast";

export const isStrongPassword = (password) => {
  // Check for at least one uppercase letter
  const uppercaseRegex = /[A-Z]/;

  if (!uppercaseRegex.test(password)) {
    toast.error("Enter atleast one uppercase");
    return false;
  }

  // Check for at least one lowercase letter
  const lowercaseRegex = /[a-z]/;
  if (!lowercaseRegex.test(password)) {
    toast.error("Enter atleast one lowercase");
    return false;
  }

  // Check for at least one special character (non-alphanumeric)
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  if (!specialCharRegex.test(password)) {
    toast.error("Enter atleast one special character");
    return false;
  }

  // Check for at least one digit
  const digitRegex = /\d/;
  if (!uppercaseRegex.test(password)) {
    toast.error("Enter atleast one number");
    return false;
  }

  if (password.length < 8) {
    toast.error("Enter atlest 8 characters");
    return false;
  }

  return true;
};
