import FriendRequest from "../models/FriendRequest.js";
import User from "../models/user.model.js";

export async function recommendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedFriends = await User.find({
            $and: [
                { _id: { $ne: currentUserId}},
                { _id: { $in: currentUser.friends}},
                { isOnboarded: true}
            ]
        })
        res.status(200).json({success, recommendedFriends})
    } catch (error) {
        console.log("Error in recommendedUsers controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getMyFriends(req, res) {
    try {
        const user = User.findOne(req.user.id).select("friends").populate("friends", "name profilePic bio learningLanguage nativeLanguage location");
        res.status(200).json({success: true, friends: user.friends});
    } catch (error) {
        console.log("Error in getMyFriends controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function sendFriendRequest(req, res){
    try {
        const myId = req.user.id;
        const {id : recipitantId} = req.params;
        if(myId === recipitantId){
            return res.status(400).json({message: "A user cann't send friend request to himself"});
        }       
        const recipitantUser = await User.findById(recipitantId);
        if(!recipitantUser){
            return res.status(404).json({message: "recipitant user not found"});
        }
        if(recipitantUser.friends.includes(myId)){
            return res.status(400).json({message: "You are already friends"});
        }
        const existingRequest = await FriendRequest.findOne({
             $or: [
                {sender: myId, recipitant: recipitantId},
                {sender: recipitantId, recipitant: myId}
             ]
        });
        if(existingRequest){
            return res.status(400).json({message: "The friend request is already pending"});
        }

        const newFriendRequest = new FriendRequest({
            sender: myId,
            recipitant: recipitantId,
        });
        res.status(201).json({success: true, friendRequest: newFriendRequest});
    } catch (error) {
        console.log("Error in sendFrriendRequest controller", error);
        res.status(500).json({message: "Internal Sever Error"});
    }
}

export async function acceptFriendRequest(req, res){
    try {
        const  {id: requestId} = req.params;
        const friendRequest = await FriendRequest.findById(requestId);
        if(!friendRequest){
            return res.status(404).json({message: "Friend request not found"});
        }
        if(friendRequest.recipitant.toString() !== req.user.id){
            return res.status(403).json({message: "You are not authorized to accept this friend request"});
        }
        friendRequest.status = "accepted";
        await friendRequest.save();

        // add each other as friends
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: {friends: friendRequest.recipitant}
        });
        await User.findByIdAndUpdate(friendRequest.recipitant, {
            $addToSet: {friends: friendRequest.sender}
        });

        res.status(200).json({success: true, message: "Friend request accepted successfully"});
    } catch (error) {
        console.log("Error in acceptFriendRequest controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getFriendRequests(req, res){
    try {
        const incomingRequests = await FriendRequest.find({
            recipitant: req.user.id,
            status: "pending",
        }).populate("sender", "name profilePic learningLanguage nativeLanguage");

        const acceptedRequests = await FriendRequest.find({
            recipitant: req.user.id,
            status: "accepted",
        }).populate("recipitant", "name profilePic");

        res.status(200).json({ success: true, incomingRequests, acceptedRequests })
    } catch (error) {
        console.log("Error in getFriendRequests controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getOutGoingFriendRequests(req, res){
    try {
        const outgoingRequests =  await FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        }).populate("recipitant", "name profilePic learningLanguage nativeLanguage");
        res.status(200).json(outgoingRequests);
    } catch (error) {
        console.log("Error in getOutGoingFriendRequests controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}