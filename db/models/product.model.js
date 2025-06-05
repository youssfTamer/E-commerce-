import { discountTypes } from "../../src/utils/constant/enums.js";

import { Schema, model } from "mongoose";

//schema
export const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        min: 0,
        default: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        min: 0,
    },
    discountType: {
        type: String,
        enum: Object.values(discountTypes),
        default: discountTypes.FIXED_AMOUNT
    },
    colors: [String],
    sizes: [String],
    mainImage: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true },
    },
    subImages: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rate: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    }
}, { timestamps: true })

//model
export const Product = model('Product', productSchema)