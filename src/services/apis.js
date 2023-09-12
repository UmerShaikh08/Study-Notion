import { BASE_URL } from "../data";

//  auth apis
export const endpointes = {
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/profile/resetPasswordToken",
  RESET_PASSWORD_API: BASE_URL + "/profile/resetPassword",
  SEND_OTP: BASE_URL + "/auth/sendOtp",
  SIGN_UP: BASE_URL + "/auth/signup",
};

// profile
export const profile = {
  GET_USER_DETAILS: BASE_URL + "/profile/getUserData",
  UPDATE_USER_DETAILS: BASE_URL + "/profile/updateProfile",
  UPDATE_PASSWORD: BASE_URL + "/profile/updatePassword",
  UPALOAD_IMG: BASE_URL + "/profile/updateProfileImg",
  DELETE_ACCOUNT: BASE_URL + "/profile/deleteAccount",
};

// contact
export const contactUsEndPointes = {
  CONTACT_US: BASE_URL + "/Contact/contact-us",
};

// course
export const course = {
  CREATE_COURSE: BASE_URL + "/course/createCourse",
  GET_ENROLLED_COURSES: BASE_URL + "/course/getEnrolledCourse",
  GET_INSTRUCTOR_COURSES: BASE_URL + "/course/getInstructorCourses",
  EDIT_COURSE: BASE_URL + "/course/editCourse",
  DELETE_COURSE: BASE_URL + "/course/deleteCourse",
  GET_COURSE_DETAILS: BASE_URL + "/course/getCoursesDetails",
  GET_COURSE_FULL_DETAILS: BASE_URL + "/course/getCourseFullDetails",
  DELETE_COURSE_FROM_STUDENT: BASE_URL + "/course/removed-enrolledcourse",
};

//section
export const section = {
  CREATE_SECTION: BASE_URL + "/course/createSection",
  UPDATE_SECTION: BASE_URL + "/course/updateSection",
  DELETE_SECTION: BASE_URL + "/course/deleteSection",
};

// subsectio
export const subsection = {
  CREATE_SUBSECTION: BASE_URL + "/course/createSubSection",
  DELETE_SUBSECTION: BASE_URL + "/course/deleteSubSection",
  UPDATE_SUBSECTION: BASE_URL + "/course/updatSubSection",
};

export const category = {
  GET_ALL_CATEGORIES: BASE_URL + "/course/showAllCategories",
  GET_CATEGORIES_PAGE_DETAILS: BASE_URL + "/course/getCategoryPageDetails",
};

export const ratingAndReviews = {
  ADD_RATING_AND_REVIEWS: BASE_URL + "/course/createRatingReviews",
  GET_AVERAGE_RATING: BASE_URL + "/course/getAverageRating",
};

export const payment = {
  CAPTURE_PAYMENT: BASE_URL + "/payment/capturePayment",
  VERIFY_PAYMENT: BASE_URL + "/payment/verifyingSignature",
  PAYMENT_SUCCESS: BASE_URL + "/payment/payment-successfull",
};
