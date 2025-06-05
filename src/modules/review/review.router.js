import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utils/constant/enums.js";
import { isValid } from "../../middleware/validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addReviewVal } from "./review.validation.js";
import { addReview } from "./review.controller.js";

const reviewRouter = Router()

//add & update review
reviewRouter.post('/:productId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN,roles.USER]),
    isValid(addReviewVal),
    asyncHandler(addReview)
)

export default reviewRouter