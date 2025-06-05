import { model, Schema } from "mongoose";

//schema
export const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    image: {
        secure_url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    }
}, { timestamps: true, toJSON: { virtuals: true } })
categorySchema.virtual('subcategories', {
    ref: "Subcategory",
    localField: "_id",
    foreignField: "category"
})
//model
export const Category = model("Category", categorySchema)

