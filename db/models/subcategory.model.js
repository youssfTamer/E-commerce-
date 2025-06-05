import { model, Schema } from "mongoose";

//schema
export const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true
    },
    image:{
        secure_url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: false
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required: true
    }
}, { timestamps: true })

//model
export const Subcategory = model("Subcategory",subcategorySchema)