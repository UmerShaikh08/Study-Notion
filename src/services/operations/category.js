import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { category } from "../apis";

const getAllCategories = async () => {
  try {
    let result = [];
    const response = await apiConnector("GET", category.GET_ALL_CATEGORIES);

    if (!response.data.success) {
      throw new Error("category not found");
    }

    // result = response?.data?.allCategories;
    result = [...response?.data?.data];

    return result;
  } catch (error) {
    console.log(error);
  }
};

const getCategoriesPageDetails = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let response;
  try {
    response = await apiConnector(
      "POST",
      category.GET_CATEGORIES_PAGE_DETAILS,
      {
        categoryId,
      }
    );

    if (!response.data.success) {
      toast.error("category not found");
      throw new Error("category not found");
    }
  } catch (error) {
    toast.error("category not found");
    console.log(error);
  }

  toast.dismiss(toastId);
  return response?.data?.data;
};

export { getAllCategories, getCategoriesPageDetails };
