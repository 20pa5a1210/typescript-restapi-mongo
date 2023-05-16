import express from "express"
import http from "http"
import bodyparser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(cors({
    credentials: true
}))
app.use(compression())
app.use(bodyparser.json())
app.use(cookieParser())

const server = http.createServer(app)
server.listen(8080, () => {
    console.log("Server  running on http://localhost:8080/");
})

const MONGO_URl = "mongodb+srv://admin:pass@cluster0.fdgzjrt.mongodb.net/?retryWrites=true&w=majority"
mongoose.Promise = Promise;
mongoose.connect(MONGO_URl).then(() => console.log("DB Running"))
mongoose.connection.on("error", (error: Error) => console.log(error))