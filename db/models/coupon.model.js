import { Schema, model } from "mongoose"
import { discountTypes } from "../../src/utils/constant/enums.js"

//schema
const couponSchema = new Schema({
    code: {
        type: String,
        required: true,

    },
    discountAmount: {
        type: Number,
        required: true
    },
    discountType: {
        type: String,
        enum: Object.values(discountTypes),
        default: discountTypes.FIXED_AMOUNT
    },
    toDate: {
        type: String,
        required: true
    },
    fromDate: {
        type: String,
        required: true
    },
    assignedUser: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            maxCount: {
                type: Number,
                max: 5
            },
            useCount: {
                type: Number,
                default: 0
            }
        }
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }


}, { timestamps: true })

//model
export const Coupon = model('Coupon', couponSchema)