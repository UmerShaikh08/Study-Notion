import { Category } from "../model/Category";

const addCategory = async (req, res) => {
  try {
    // get data
    const { name, description } = req.body;

    // validate data
    if (!name || !description) {
      res.status(400).json({
        success: false,
        massage: "All fields are required",
      });
    }

    // create entry in db
    const createCategory = await Category.create({
      name,
      description,
    });
    console.log(createCategory);

    // return res
    res.status(200).json({
      success: true,
      massage: "category created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occuring while creating category",
    });
  }
};

const getAllTags = async (req, res) => {
  try {
    // get  all categories from db
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    ); // jo bhi data dere ho usme name hona chahiye or description hona chahiye
    console.log(allCategories);

    // return res
    res.status(200).json({
      success: true,
      massage: "all categories get successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occurs while getting all categories",
    });
  }
};

export { addCategory, getAllTags };
