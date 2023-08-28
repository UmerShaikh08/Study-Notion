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

export { getAllCategories };
