import joi from "joi"
import { generalFields } from "../../middleware/validation.js"


export const addProductVal = joi.object({
    name:generalFields.name.required(),
    description: generalFields.description.required(),
    stock:generalFields.stock,
    price:generalFields.price.required(),
    discount:generalFields.discount,
    discountType:generalFields.discountType,
    colors:generalFields.colors,
    sizes:generalFields.sizes,
    category:generalFields.objectId.required(),
    subcategory:generalFields.objectId,
    brand:generalFields.objectId.required()
})
