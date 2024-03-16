import logo from "../../assets/Logo/Logo-Small-Dark.png";
import apiConnector from "../apiConnector";
import { toast } from "react-hot-toast";
import { payment } from "../apis";
import { clearCart } from "../../Redux/Slices/cartSlice";
import { setPaymentLoading } from "../../Redux/Slices/courseSlice";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const buyCourse = async (user, courses, navigate, dispatch, token) => {
  const toastId = toast.loading("Loading...");

  try {
    const load = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!load) {
      toast.error("Payment Failed");
      throw new Error("Razorpay sdk failed to execute");
    }

    const response = await apiConnector(
      "POST",
      payment.CAPTURE_PAYMENT,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("buy course response --->", response);
    if (!response.data.success) {
      toast.error(response?.data?.massage);
      throw new Error("Failed to capture payment");
    }

    const amount = response?.data?.data?.amount;

    const options = {
      key: process.env.REACT_APP_RAZOR_KEY_SECRET,
      currency: response?.data?.data?.currency,
      amount: amount,
      order_id: response?.data?.data?.id,
      name: "Study Notion",
      description: "Thanks for enrolling course",
      image: logo,
      prefill: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
      handler: async function (res) {
        await paymentSuccessfullEmail(res, amount, token);
        const bodyData = {
          ...res,
          courses,
        };

        await verifyPayment(bodyData, navigate, dispatch, token);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops, payment failed");
      console.log("error---->", response.error);
    });
  } catch (error) {
    console.log("Buy course error ---> ", error);
    toast.error("payment failed");
  }

  toast.dismiss(toastId);
};

const paymentSuccessfullEmail = async (res, amount, token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector(
      "POST",
      payment.PAYMENT_SUCCESS,
      {
        orderId: res.razorpay_order_id,
        paymentId: res.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("payment success Response --->", response);

    if (!response) {
      toast.error("Failed to send email");
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to send email");
  }

  toast.dismiss(toastId);
};

const verifyPayment = async (bodyData, navigate, dispatch, token) => {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector(
      "POST",
      payment.VERIFY_PAYMENT,
      bodyData,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("Payment Verify Response --->", response);

    if (!response) {
      toast.error("Payment Failed");
      throw new Error("Payment failed");
    }

    toast.success(
      "Payment Successfull , your course added in Enrolled coureses list"
    );

    navigate("/dashboard/enrolled-courses");
    dispatch(clearCart());
  } catch (error) {
    console.log(error);
  }

  dispatch(setPaymentLoading(false));
  toast.dismiss(toastId);
};

export { buyCourse, loadScript, paymentSuccessfullEmail, verifyPayment };
