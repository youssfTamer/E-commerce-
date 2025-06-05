import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { isValid } from "../../middleware/validation.js";
import { roles } from "../../utils/constant/enums.js";
import { cloudUploads } from "../../utils/multer-cloud.js";
import { addBrand, updateBrand } from "./brand.controller.js";
import { addBrandVal, updateBrandVal } from "./brand.validation.js";
import {Router} from 'express'

const brandRouter = Router()


brandRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN,roles.SELLER]),
    cloudUploads().single('logo'),
    isValid(addBrandVal),
    asyncHandler(addBrand)
)

brandRouter.put('/:brandId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN,roles.SELLER]),
    cloudUploads().single('logo'),
    isValid(updateBrandVal),
    asyncHandler(updateBrand)
)

export default brandRouter