import slugify from "slugify"
import { Brand } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"
import cloudinary from "../../utils/cloud.js"

export const addBrand = async (req, res, next) => {
    //get data form req
    let { name } = req.body
    name = name.LowerCase()
    //check existence
    const brandExist = await Brand.findOne({ name })
    if (brandExist) {
        return next(new AppError(messages.brand.alreadyExist, 409))
    }
    //upload image
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Route-NodeJs/brand'
    })
    //prepare object
    const slug = slugify(name)
    const brand = new Brand({
        name,
        slug,
        logo: { secure_url, public_id },
        createdBy: req.authUser._id
    })
    //add to db
    const createdBrand = await brand.save()
    if (!createdBrand) {
        //rollback
        req.failImage = { secure_url, public_id }
        return next(new AppError(messages.brand.failToCreate, 500))
    }
    //send response
    return res.status(201).json({
        message: messages.brand.createdSuccessfully,
        success: true,
        data: createdBrand
    })
}

export const updateBrand = async (req, res, next) => {
    //get data from req
    let { name } = req.body
    const { brandId } = req.params
    name = name.LowerCase()
    //check existence
    const brandExist = await Brand.findById(brandId)
    if (!brandExist) {
        return next(new AppError(messages.brand.notFound, 404))
    }
    //check name existence 
    const nameExist = await Brand.findOne({ name, _id: { $ne: brandId } })
    if (nameExist) {
        return next(new AppError(messages.brand.alreadyExist, 409))
    }
    //prepare data
    if (name) {
        const slug = slugify(name)
        brandExist.name = name
        brandExist.slug = slug
    }
    //upload logo
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            public_id: brandExist.logo.public_id
        })
        brandExist.logo = { secure_url, public_id }
        req.failImage = { secure_url, public_id }
    }
    //update to db
    const updatedBrand = await brandExist.save()
    if (!updateBrand) {
        return next(new AppError(messages.brand.failToUpdate, 500))
    }
    //send response
    return res.status(200).json({
        message: messages.brand.updatedSuccessfully,
        success: true,
        data: updatedBrand
    })
}