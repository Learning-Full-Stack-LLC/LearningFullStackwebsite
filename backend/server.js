import express from "express"
import cors from "cors"
import lessons from "./api/lessons.routes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/lessons", lessons)
app.use("*", (res, req) => req.status(404).json({error:"not found"}))

export default app