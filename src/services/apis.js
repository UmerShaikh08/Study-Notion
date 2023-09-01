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
  CREATE_COURSE: BASE_URL + "/course/createCourse",
  GET_ENROLLED_COURSES: BASE_URL + "/course/getEnrolledCourse",
  EDIT_COURSE: BASE_URL + "/course/editCourse",
};

export const section = {
  CREATE_SECTION: BASE_URL + "/course/createSection",
  UPDATE_SECTION: BASE_URL + "/course/updateSection",
  DELETE_SECTION: BASE_URL + "/course/deleteSection",
};

export const subsection = {
  CREATE_SUBSECTION: BASE_URL + "/course/createSubSection",
  DELETE_SUBSECTION: BASE_URL + "/course/deleteSubSection",
  UPDATE_SUBSECTION: BASE_URL + "/course/updatSubSection",
};

export const category = {
  GET_ALL_CATEGORIES: BASE_URL + "/course/showAllCategories",
};
