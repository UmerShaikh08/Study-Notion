import { Tag } from "../model/tag";

const addTags = async (req, res) => {
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
    const createTag = await Tag.create({
      name,
      description,
    });
    console.log(createTag);

    // return res
    res.status(200).json({
      success: true,
      massage: "Tag created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occuring while creating tag",
    });
  }
};

const getAllTags = async (req, res) => {
  try {
    // get  all tags from db
    const allTag = await Tag.find({}, { name: true, description: true }); // jo bhi data dere ho usme name hona chahiye or description hona chahiye
    console.log(addTags);

    // return res
    res.status(200).json({
      success: true,
      massage: "all tag get successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occurs while getting all tag",
    });
  }
};
