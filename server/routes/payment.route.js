import express from "express"
import { createOrder, verifyPayment } from "../controller/payment.controller.js"
import isAuth from "../middlewares/isAuth.js"


const paymentRouter = express.Router()

paymentRouter.post("/order", isAuth, createOrder)
paymentRouter.post("/verify", isAuth, verifyPayment)


export default paymentRouter