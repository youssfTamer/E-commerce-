import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { addsubcategoryVal } from "./subcategory.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addsubcategory, getAllSubcategory } from "./subcategory.controller.js";
import { cloudUploads } from "../../utils/multer-cloud.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";

const subcategoryRouter = Router()


subcategoryRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.SELLER]),
    cloudUploads().single('image'),
    isValid(addsubcategoryVal),
    asyncHandler(addsubcategory)
)

subcategoryRouter.get('/', asyncHandler(getAllSubcategory))

export default subcategoryRouter