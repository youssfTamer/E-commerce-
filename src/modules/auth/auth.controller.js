import bcrypt from 'bcrypt'
import { User } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"
import { sendEmail } from "../../utils/email.js"
import { generateToken, verifyToken } from "../../utils/token.js"
import { status } from '../../utils/constant/enums.js'

export const signup = async (req, res, next) => {
    //get data from req
    let { name, email, password, phone } = req.body
    //check existence
    const userExist = await User.findOne({ $or: [{ email }, { phone }] })
    if (userExist) {
        return next(new AppError(messages.user.alreadyExist, 409))
    }
    //prepare data
    //hash password
    password = bcrypt.hashSync(password, 8)
    const user = new User({
        name,
        email,
        password,
        phone,
    })
    const createdUser = await user.save()
    if (!createdUser) {
        return next(new AppError(messages.user.failToCreate, 500))
    }
    //generate token
    const token = generateToken({ payload: { email } })
    //send email
    await sendEmail({ to: email, subject: 'verify your account', html: `<p>click on link to verify yout account <a href="${req.protocol}://${req.headers.host}/auth/verify/${token}">link</a> </p>` })
    //send response
    return res.status(201).json({
        message: messages.user.createdSuccessfully,
        success: true,
        data: createdUser
    })
}

export const verifyAccount = async (req, res, next) => {
    //get data from req
    const { token } = req.params
    const payload = verifyToken({ token })
    await User.findOneAndUpdate({ email: payload.email, status: status.PENDING }, { status: status.VERIFIED })
    return res.status(200).json({ message: messages.user.verified, success: true })
}

export const login = async (req, res, next) => {
    //get data from req
    const { email, password, phone } = req.body
    const userExist = await User.findOne({ $or: [{ email }, { phone }], status: status.VERIFIED })
    if (!userExist) {
        return next(new AppError(messages.user.invalidCredentails, 400))
    }
    //check password
    const match = bcrypt.compareSync(password, userExist.password)
    if (!match) {
        return next(new AppError(messages.user.invalidCredentails, 400))
    }
    //generate Token
    const token = generateToken({ payload: { _id: userExist._id, email } })

    //send response
    return res.status(200).json({
        message: messages.user.LoginSuccessfully,
        success: true,
        token
    })
}