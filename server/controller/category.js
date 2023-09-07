import { Category } from "../model/Category.js";

const addCategory = async (req, res) => {
  try {
    // get data
    const { name, description } = req.body;

    // validate data
    if (!name || !description) {
      return res.status(400).json({
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
    return res.status(200).json({
      success: true,
      massage: "category created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      massage: "error occuring while creating category",
    });
  }
};

const showAllCategories = async (req, res) => {
  try {
    // get  all categories from db
    const allCategories = await Category.find(
      {},
      { name: true, description: true, course: true }
    ); // jo bhi data dere ho usme name hona chahiye or description hona chahiye
    console.log(allCategories);

    // return res
    return res.status(200).json({
      success: true,
      data: allCategories,
      massage: "all categories get successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      massage: "error occurs while getting all categories",
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log(categoryId);
    // get  one category  from db
    const category = await Category.findById(categoryId); // jo bhi data dere ho usme name hona chahiye or description hona chahiye
    console.log(category);

    if (!category) {
      return res.status(400).json({
        success: false,
        massage: "category not found",
      });
    }

    // return res
    return res.status(200).json({
      success: true,
      category,
      massage: "one category  get successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      massage: "error occurs while getting one category",
    });
  }
};

const categoryPageDetails = async (req, res) => {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  try {
    const { categoryId } = req.body;
    console.log("PRINTING CATEGORY ID: ", categoryId);
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "RatingAndReviews",
      })
      .exec();

    //console.log("SELECTED COURSE", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    // Handle the case when there are no courses
    if (selectedCategory.course.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "course",
        match: { status: "Published" },
      })
      .exec();
    //console.log("Different COURSE", differentCategory)
    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.course);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
    // console.log("mostSellingCourses COURSE", mostSellingCourses)
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { addCategory, showAllCategories, categoryPageDetails, getCategory };
