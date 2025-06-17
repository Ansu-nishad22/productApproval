import express from "express";
import router from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express()

app.use(express.json())


app.use("/api/user" , router)
app.use("/api/product" , productRouter)


export default app