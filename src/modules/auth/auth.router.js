import { Router } from "express";
import { isValid } from "../../middleware/validation.js";
import { loginVal, signUpVal } from "./auth.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { login, signup, verifyAccount } from "./auth.controller.js";

const authRouter = Router()

//signUp
authRouter.post('/signup',
    isValid(signUpVal),
    asyncHandler(signup)
)

authRouter.get('/verify/:token',
    asyncHandler(verifyAccount)
)

//login
authRouter.post('/login',
    isValid(loginVal),
    asyncHandler(login)
)

export default authRouter