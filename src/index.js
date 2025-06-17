import "dotenv/config"
import app from "./app.js"
import cors from "cors"
import { connectdb } from "./db/index.js"


app.use(
    cors({
        origin : process.env.CORS_ORIGIN,
        credentials: true

    })
)

let port = process.env.PORT

connectdb()
.then(()=>{
    app.listen(port , ()=>{
    console.log(`server is running ${port}`);
})
})
.catch((err) =>{
    console.log("mongodb connection error")
})