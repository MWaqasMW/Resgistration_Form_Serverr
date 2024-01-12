import express from "express"
import dotenv from "dotenv"
import cors from "cors"
const app = express()
import studentRouter from "./src/routes/student.js"
import connectDb from "./src/db/index.js"
dotenv.config()

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    connectDb()
    console.log(`Server running on,${PORT}`)
})

app.use(cors())
app.use(express.json());
app.use("/api/v1",studentRouter)