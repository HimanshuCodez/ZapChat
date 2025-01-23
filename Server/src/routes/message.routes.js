import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
const router = express.Router()


router.get("/users",protectRoute,getUsersForSidebar)
router.put("/:id",protectRoute,getMessages)
router.put("/send/:id",protectRoute,sendMessage)

 

export default router