import slugify from "slugify"
import { Category } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"
import cloudinary from "../../utils/cloud.js"

//add category
export const addCategory = async (req, res, next) => {
    //get data from req
    let { name } = req.body
    name = name.toLowerCase()
    //check existance 
    const categoryExist = await Category.findOne({ name })
    if (categoryExist) {
        return next(new AppError(messages.category.alreadyExist, 409))
    }
    //upload Image
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Route-NodeJs/category'
    })
    //prepare project
    const slug = slugify(name)
    const category = new Category({
        name,
        slug,
        image: { secure_url, public_id },
        createdBy: req.authUser._id
    })
    //add to db
    const createdCategory = await category.save()
    if (!createdCategory) {
        req.failImage = { secure_url, public_id }
        return next(new AppError(messages.category.failToCreate, 500))
    }
    //send response
    return res.status(201).json({
        message: messages.category.createdSuccessfully,
        success: true,
        data: createdCategory
    })
}

//get categories
export const getAllCategory = async (req, res, next) => {
    const categories = await Category.find().populate([{ path: "subcategories" }])
    return res.status(200).json({ success: true, data: categories })
}
