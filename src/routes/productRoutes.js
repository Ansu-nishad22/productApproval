import express from "express"
import { addProduct, approveProduct, getProductUser, listProduct } from "../controllers/product.controller.js"
import auth from "../middleware/auth.js"
import isAdmin from "../middleware/isAdmin.js"
// import { getProductUser } from "../controllers/user.controller.js"

const productRouter = express.Router()

productRouter.post("/addProduct" ,auth , addProduct)
productRouter.put("/approve/:id" , auth , isAdmin , approveProduct )
productRouter.get("/list" , listProduct)
// productRouter.get("/my", auth, getProductUser);
productRouter.get("/my" , auth , getProductUser)

export default productRouter