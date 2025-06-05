import slugify from "slugify"
import { Brand, Product, Subcategory } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"
import cloudinary from "../../utils/cloud.js"
import { ApiFeature } from "../../utils/apiFeature.js"

//add product
export const addProduct = async (req, res, next) => {
    //get data from req
    const { name,
        description,
        stock,
        price,
        discount,
        discountType,
        colors,
        sizes,
        category,
        subcategory,
        brand } = req.body
    //check existence
    //brand
    const brandExist = await Brand.findById(brand)
    if (!brandExist) {
        return next(new AppError(messages.product.notFound, 404))
    }
    //subcategory
    const subcategoryExist = await Subcategory.findById(subcategory)
    if (!subcategoryExist) {
        return next(new AppError(messages.product.notFound, 404))
    }
    //upload images
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, { folder: 'Route-NodeJs/products/mainImage' })
    let mainImage = { secure_url, public_id }
    req.failImages = []
    failImages.push(public_id)
    let subImages = []
    for (const file of req.files.subImages) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: 'Route-NodeJs/products/subImages' })
        subImages.push({ secure_url, public_id })
        req.failImages.push(public_id)
    }
    //prepare object
    const slug = slugify(name)
    const product = new Product({
        name,
        slug,
        description,
        stock,
        price,
        discount,
        discountType,
        colors: JSON.parse(colors),
        sizes: JSON.parse(sizes),
        category,
        subcategory,
        brand,
        mainImage,
        subImages,
        createdBy: req.authUser._id,
        updatedBy: req.authUser._id
    })

    //req.files.subImages.forEach(async (file) => {
    //const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: 'Route-NodeJs/products/subImages' })
    //subImages.push({ secure_url, public_id })
    //});

    //add to db
    const createdProduct = await product.save()
    if (!createdProduct) {
        return next(new AppError(messages.product.failToCreate, 500))
    }
    //send response 
    return res.status(201).json({
        message: messages.product.createdSuccessfully,
        success: true,
        data: createdProduct
    })

}

//getAllProduct
export const getAllProduct = async (req, res, next) => {

    /*let { page, size, sort, select, ...filter } = req.query
    filter = JSON.parse(JSON.stringify(filter).replace(/'gte|gt|lte|lt'/g, match => `$${match}`))

    //let filter = JSON.parse(JSON.stringify(req.query))
    //let excludedFields = ['sort','select','page','size']
    //excludedFields.forEach(ele =>{
    // delete filter[ele]
    //})

    if (!page || page <= 0) {
        page = 1
    }
    if (!size || size <= 0) {
        size = 5
    }
    let skip = (page - 1) * size
    sort = sort?.replaceAll(',', ' ')
    select = select?.replaceAll(',', ' ')

    const products = await Product.find(filter).limit(size).skip(skip).sort(sort).select(select)*/
    const apiFeature = new ApiFeature(Product.find(), req.query).pagination().select().sort().filter()
    const products = await apiFeature.mongooseQuery
    return res.status(200).json({ success: true, data: products })
}