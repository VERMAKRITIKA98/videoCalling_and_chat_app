import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutGoingFriendRequests, recommendedUsers, sendFriendRequest } from "../controller/user.controller.js";
const router = express.Router();

router.use(protectRoute);

router.get("/", recommendedUsers);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutGoingFriendRequests);;


export default router;