import express from "express"
import LessonsCrtl from "../dao/LessonsDAO"

const router = express.Router()

router.route("/").get(LessonsCrtl.apiGetLessons)

export default router