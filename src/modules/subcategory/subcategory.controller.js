import slugify from "slugify"
import { Category, Subcategory } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"
import cloudinary from "../../utils/cloud.js"

//add Subcategory
export const addsubcategory = async () => {
    //get data from req
    let { name, category } = req.body
    name = name.toLowerCase()
    //check existence 
    const categoryExist = await Category.findById(category)
    if (!categoryExist) {
        return next(new AppError(messages.category.notFound, 404))
    }
    const subcategoryExist = await Subcategory.findOne({ name })
    if (subcategoryExist) {
        return next(new AppError(messages.subcategory.alreadyExist, 409))
    }
    //upload image
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder: 'Route-NodeJs/subcategory'
    })
    //prepare data
    const slug = slugify(name)
    const subcategoryprep = new Subcategory({
        name,
        slug,
        image: {secure_url,public_id},
        createdBy: req.authUser._id 
    })
    const createdSubcategory = await subcategoryprep.save()
    if (!createdSubcategory) {
        return next(messages.subcategory.failToCreate, 500)
    }
    //send response
    return res.status(201).json({
        message: messages.subcategory.createdSuccessfully,
        success: true,
        data: createdSubcategory
    })
}


//get Subcategories
export const getAllSubcategory = async (req, res, next) => {
    const Subcategories = await Subcategory.find().populate([{path:"category"}])
    return res.status(200).json({ success: true, data: Subcategories })
}
