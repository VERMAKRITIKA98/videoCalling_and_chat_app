import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMyFriends, recommendedUsers } from "../controller/user.controller.js";
const router = express.Router();

router.use(protectRoute);

router.get("/", recommendedUsers);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);

export default router;