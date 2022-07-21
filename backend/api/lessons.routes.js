import express from "express"
import LessonsCrtl from "./lessons.controller.js"

const router = express.Router()

router.route("api/lesson/").get(LessonsCrtl.apiGetLessons)

export default router