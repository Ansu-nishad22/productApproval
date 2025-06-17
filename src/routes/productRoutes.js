import express from "express"
import { addProduct, approveProduct, listProduct } from "../controllers/product.controller.js"
import auth from "../middleware/auth.js"
import isAdmin from "../middleware/isAdmin.js"

const productRouter = express.Router()

productRouter.post("/addProduct" ,auth , addProduct)
productRouter.put("/approve/:id" , auth , isAdmin , approveProduct )
productRouter.get("/list" , listProduct)


export default productRouter