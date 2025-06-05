import joi from "joi"
import { generalFields } from "../../middleware/validation.js"

export const addsubcategoryVal = joi.object({
    name:generalFields.name.required(),
    category:generalFields.objectId.required()
})