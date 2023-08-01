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
      { name: true, description: true }
    ); // jo bhi data dere ho usme name hona chahiye or description hona chahiye
    console.log(allCategories);

    // return res
    return res.status(200).json({
      success: true,
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
  try {
    const { categoryId } = req.body;

    // get courses from specified category
    const selectCategory = await Category.findById(categoryId)
      .populate("course")
      .exec();
    console.log(selectCategory);

    // handle case where category not found
    if (!selectCategory) {
      console.log("Category not found");
      return res.status(404).json({
        success: false,
        massage: "category not found",
      });
    }

    // handle the case their are no course
    if (selectCategory.course.length === 0) {
      console.log("no course found for the selected category");
      return res.status(404).json({
        success: false,
        massage: "no course found for the selected category",
      });
    }

    const selectedCourses = selectCategory.course;

    // get course for other category
    const diffrentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("course")
      .exec();

    let differentCourses = [];

    for (const category of diffrentCategories) {
      differentCourses.push(...category.course);
    }

    // get top selling courses across categories
    const allCategories = await Category.find().populate("course");
    const allCourses = allCategories.flatMap((category) => category.course);

    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    return res.status(200).json({
      selectedCourses,
      differentCourses,
      mostSellingCourses,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      massage: "internal server error in category page",
    });
  }
};

export { addCategory, showAllCategories, categoryPageDetails, getCategory };
