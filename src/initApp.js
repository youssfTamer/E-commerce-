import { globalErrorHandling } from "./middleware/asyncHandler.js"
import { authRouter, brandRouter, categoryRouter, couponRouter, productRouter, reviewRouter, subcategoryRouter } from "./modules/index.js"


export const initApp = (app, express) => {
    //parse req
    app.use(express.json())
    app.use('/uploads', express.static('uploads'))

    //Routing
    app.use('/category', categoryRouter)
    app.use('/subcategory', subcategoryRouter)
    app.use('/brand', brandRouter)
    app.use('/product', productRouter)
    app.use('/auth', authRouter)
    app.use('/review', reviewRouter)
    app.use('/coupon', couponRouter)

    //globalErrorHandling
    app.use(globalErrorHandling)
}