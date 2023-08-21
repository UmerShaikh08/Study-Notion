import { BASE_URL } from "../data";

export const endpointes = {
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/profile/resetPasswordToken",
  RESET_PASSWORD_API: BASE_URL + "/profile/resetPassword",
  SEND_OTP: BASE_URL + "/auth/sendOtp",
  SIGN_UP: BASE_URL + "/auth/signup",
};

export const profile = {
  GET_USER_DETAILS: BASE_URL + "/profile/getUserData",
  UPDATE_USER_DETAILS: BASE_URL + "/profile/updateProfile",
  UPDATE_PASSWORD: BASE_URL + "/profile/updatePassword",
  UPALOAD_IMG: BASE_URL + "/profile/updateProfileImg",
  DELETE_ACCOUNT: BASE_URL + "/profile/deleteAccount",
};

export const contactUsEndPointes = {
  CONTACT_US: BASE_URL + "/Contact/contact-us",
};

export const course = {
  GET_ENROLLED_COURSES: BASE_URL + "/course/getEnrolledCourse",
};
