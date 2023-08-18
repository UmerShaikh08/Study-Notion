import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { contactUsEndPointes } from "../apis";

const contactUs = async (data, setLoading) => {
  try {
    setLoading(true);
    const response = await apiConnector(
      "POST",
      contactUsEndPointes.CONTACT_US,
      data
    );

    if (!response.data.success) {
      setLoading(false);
      throw new Error();
    }
    setLoading(false);
    toast.success("mail send successfully");
  } catch (error) {
    toast.error("failed to send mail");
    setLoading(false);

    console.log(error);
  }
};

export { contactUs };
