import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const addReviewVal = joi.object({
    userId:generalFields.objectId.required(),
    productId:generalFields.objectId.required(),
    comment:generalFields.comment,
    rate:generalFields.rate.required()
})