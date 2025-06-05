import { Router } from "express"
import { isAuthenticated } from "../../middleware/authentication.js"
import { isAuthorized } from "../../middleware/authorization.js"
import { roles } from "../../utils/constant/enums.js"
import { isValid } from "../../middleware/validation.js"

const couponRouter = Router()

//add coupon
couponRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    isValid(),
    
)

export default couponRouter