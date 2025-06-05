import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { addCategoryVal } from "./category.validation.js"
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addCategory, getAllCategory } from "./category.controller.js";
import { cloudUploads } from "../../utils/multer-cloud.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";

const categoryRouter = Router()

//add category 
categoryRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.SELLER]),
    cloudUploads().single('image'),
    isValid(addCategoryVal),
    asyncHandler(addCategory)
)

categoryRouter.get('/', asyncHandler(getAllCategory))

export default categoryRouter