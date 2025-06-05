import { Product, Review } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"

export const addReview = async (req, res, next) => {
    //get data from req
    const { comment, rate } = req.body
    const { product } = req.params
    const user = req.authUser._id

    //check product exist
    const productExist = await Product.findById(product)
    if (!productExist) {
        return next(new AppError(messages.product.notFound, 404))
    }
    //check if user make review before
    const reviewExist = await Review.findOneAndUpdate({ user, product }, { rate, comment }, { new: true })
    let data = reviewExist
    if (!reviewExist) {
        //todo order
        //prepare data
        const review = new Review({
            user,
            product,
            comment,
            rate,
            isVerified: false
        })

        //add to db
        const createdReview = await review.save()
        if (!createdReview) {
            return next(new AppError(messages.review.failToCreate, 500))
        }
        data = createdReview
    }

    // update product rate
    const reviews = await Review.find({ product })
    let finalRate = reviews.reduce((acc, cur) => {
        return acc += cur.rate
    }, 0)
    finalRate /= reviews.length
    await Product.findByIdAndUpdate(product, { rate: finalRate })

    //send response
    return res.status(201).json({
        message: messages.review.createdSuccessfully,
        success: true,
        data
    })


}



