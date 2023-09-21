//  auth apis
export const endpointes = {
  LOGIN_API: process.env.REACT_APP_BASE_URL + "/auth/login",
  RESETPASSTOKEN_API:
    process.env.REACT_APP_BASE_URL + "/profile/resetPasswordToken",
  RESET_PASSWORD_API: process.env.REACT_APP_BASE_URL + "/profile/resetPassword",
  SEND_OTP: process.env.REACT_APP_BASE_URL + "/auth/sendOtp",
  SIGN_UP: process.env.REACT_APP_BASE_URL + "/auth/signup",
};

// profile
export const profile = {
  GET_USER_DETAILS: process.env.REACT_APP_BASE_URL + "/profile/getUserData",
  UPDATE_USER_DETAILS:
    process.env.REACT_APP_BASE_URL + "/profile/updateProfile",
  UPDATE_PASSWORD: process.env.REACT_APP_BASE_URL + "/profile/updatePassword",
  UPALOAD_IMG: process.env.REACT_APP_BASE_URL + "/profile/updateProfileImg",
  DELETE_ACCOUNT: process.env.REACT_APP_BASE_URL + "/profile/deleteAccount",
};

// contact
export const contactUsEndPointes = {
  CONTACT_US: process.env.REACT_APP_BASE_URL + "/Contact/contact-us",
};

// course
export const course = {
  CREATE_COURSE: process.env.REACT_APP_BASE_URL + "/course/createCourse",
  GET_ENROLLED_COURSES:
    process.env.REACT_APP_BASE_URL + "/course/getEnrolledCourse",
  GET_INSTRUCTOR_COURSES:
    process.env.REACT_APP_BASE_URL + "/course/getInstructorCourses",
  EDIT_COURSE: process.env.REACT_APP_BASE_URL + "/course/editCourse",
  DELETE_COURSE: process.env.REACT_APP_BASE_URL + "/course/deleteCourse",
  GET_COURSE_DETAILS:
    process.env.REACT_APP_BASE_URL + "/course/getCoursesDetails",
  GET_COURSE_FULL_DETAILS:
    process.env.REACT_APP_BASE_URL + "/course/getCourseFullDetails",
  DELETE_COURSE_FROM_STUDENT:
    process.env.REACT_APP_BASE_URL + "/course/removed-enrolledcourse",
  GET_ALL_COURSES: process.env.REACT_APP_BASE_URL + "/course/getAllCourses",
};

//section
export const section = {
  CREATE_SECTION: process.env.REACT_APP_BASE_URL + "/course/createSection",
  UPDATE_SECTION: process.env.REACT_APP_BASE_URL + "/course/updateSection",
  DELETE_SECTION: process.env.REACT_APP_BASE_URL + "/course/deleteSection",
};

// subsectio
export const subsection = {
  CREATE_SUBSECTION:
    process.env.REACT_APP_BASE_URL + "/course/createSubSection",
  DELETE_SUBSECTION:
    process.env.REACT_APP_BASE_URL + "/course/deleteSubSection",
  UPDATE_SUBSECTION: process.env.REACT_APP_BASE_URL + "/course/updatSubSection",
};

export const category = {
  GET_ALL_CATEGORIES:
    process.env.REACT_APP_BASE_URL + "/course/showAllCategories",
  GET_CATEGORIES_PAGE_DETAILS:
    process.env.REACT_APP_BASE_URL + "/course/getCategoryPageDetails",
};

export const ratingAndReviews = {
  ADD_RATING_AND_REVIEWS:
    process.env.REACT_APP_BASE_URL + "/course/createRatingReviews",
  GET_AVERAGE_RATING:
    process.env.REACT_APP_BASE_URL + "/course/getAverageRating",
  GET_ALL_REVIEW: process.env.REACT_APP_BASE_URL + "/course/getAllReviews",
};

export const payment = {
  CAPTURE_PAYMENT: process.env.REACT_APP_BASE_URL + "/payment/capturePayment",
  VERIFY_PAYMENT:
    process.env.REACT_APP_BASE_URL + "/payment/verifyingSignature",
  PAYMENT_SUCCESS:
    process.env.REACT_APP_BASE_URL + "/payment/payment-successfull",
};

export const courseProgress = {
  GET_COURSE_PROGRESS:
    process.env.REACT_APP_BASE_URL + "/course/getCourseProgress",
  ADD_COURSE_PROGRESS:
    process.env.REACT_APP_BASE_URL + "/course/addCourseProgress",
};
